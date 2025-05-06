package prism.damseol.service;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import prism.damseol.domain.*;
import prism.damseol.repository.*;
import prism.damseol.service.ai.AiAnalysisService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class PracticeService {

    private final WordRepository wordRepository;
    private final SentenceRepository sentenceRepository;
    private final MemberRepository memberRepository;
    private final WordRecordRepository wordRecordRepository;
    private final SentenceRecordRepository sentenceRecordRepository;
    private AiAnalysisService aiAnalysisService;

    // 음성 파일 업로드 처리
    public String uploadAudioFile(MultipartFile audioFile) throws IOException {
        if (audioFile.isEmpty()) throw new IllegalArgumentException("파일이 없습니다.");

        String fileName = audioFile.getOriginalFilename();
        if (fileName.trim().isEmpty()) throw new IllegalArgumentException("파일명이 유효하지 않습니다.");

        int dotIndex = fileName.lastIndexOf(".");
        String extension = (dotIndex != -1) ? fileName.substring(dotIndex) : "";
        String baseName = (dotIndex != -1) ? fileName.substring(0, dotIndex) : fileName;
        fileName = baseName + "_audio" + extension;

        String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/audio/";
        Path uploadPath = Paths.get(UPLOAD_DIR);
        Path filePath = uploadPath.resolve(fileName);

        try {
            if (!Files.exists(uploadPath))
                Files.createDirectories(uploadPath);

            Files.write(filePath, audioFile.getBytes());
            System.out.println("파일 업로드 성공!");
        } catch (IOException e) {
            throw new IOException("파일 업로드 실패: " + e.getMessage(), e);
        }
        return fileName;
    }

    // WordRecord 생성 및 저장
    public WordRecord createWordRecord(Long wordId, String memberName, MultipartFile audioFile) throws IOException {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new IllegalArgumentException("Word not found with id " + wordId));

        Member member = memberRepository.findByName(memberName);

        // AI 분석
        JsonNode aiResponse = aiAnalysisService.analyzeWord(audioFile, word.getWordPron());

        String userPronun = aiResponse.get("user_pronun").asText();
        String advice = aiResponse.get("pronun").get("advice").asText();
        String reason = aiResponse.get("pronun").get("reason").asText();
        int correction = aiResponse.get("pronun").get("correction").asInt();

        WordRecord wordRecord = WordRecord.builder()
                .word(word)
                .member(member)
                .pron(userPronun)
                .evaluation(advice)
                .analysis(reason)
                .score(correction)
                .date(LocalDateTime.now())
                .build();

        return wordRecordRepository.save(wordRecord);
    }


    // 틀린 단어 발음 설정 및 인덱스 반환
    public String setWrongWordPhon(Long wordId, WordRecord wordRecord) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new IllegalArgumentException("Word not found with id " + wordId));

        // wordRecord에 틀린 발음 설정
        List<String> wrongProns = KoreanPronChecker.checkPronunciation(word.getWordPron(), wordRecord.getPron());
        StringBuilder sb = new StringBuilder();
        for (String wrongPron : wrongProns) {
            sb.append(wrongPron);
            sb.append(",");
        }
        if (!sb.isEmpty())
            sb.deleteCharAt(sb.length() - 1);
        wordRecord.setWrongPhon(sb.toString());
        wordRecordRepository.save(wordRecord);

        // 틀린 발음이 포함된 인덱스 반환
        List<Integer> incorrectPronIndices = KoreanPronChecker.getIncorrectPronIndices(word.getWordPron(), wordRecord.getPron());
        sb = new StringBuilder();
        for (Integer incorrectPronIndex : incorrectPronIndices) {
            sb.append(incorrectPronIndex);
            sb.append(",");
        }
        if (!sb.isEmpty())
            sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    // SentenceRecord 생성 및 저장
    public SentenceRecord createSentenceRecord(Long sentenceId, String memberName, MultipartFile audioFile) throws IOException {
        Sentence sentence = sentenceRepository.findById(sentenceId)
                .orElseThrow(() -> new IllegalArgumentException("Sentence not found with id " + sentenceId));

        Member member = memberRepository.findByName(memberName);

        //AI
        JsonNode aiResponse = aiAnalysisService.analyzeSentence(audioFile, sentence.getText());

        String userPronun = aiResponse.get("user_pronun").asText();

        String advice = aiResponse.get("pronun").get("advice").asText();
        String pitchReason = aiResponse.get("pitch").get("pitch_reason").asText();
        String rhythmReason = aiResponse.get("rhythm").get("rhythm_reason").asText();

        String reason = aiResponse.get("pronun").get("reason").asText();

        int correction = aiResponse.get("pronun").get("correction").asInt();
        String pitchScoreStr = aiResponse.get("pitch").get("pitch_score").asText();   // 예: "2/5점"
        String rhythmScoreStr = aiResponse.get("rhythm").get("rhythm_score").asText(); // 예: "1/5점"

        // 숫자 부분만 추출 (예: "2/5점" → 2, 5)
        int pitch_score = parseScorePercentage(pitchScoreStr);
        int rhythm_score = parseScorePercentage(rhythmScoreStr);

        SentenceRecord sentenceRecord = SentenceRecord.builder()
                .sentence(sentence)
                .member(member)
                .pron(userPronun)
                .evaluation(advice + " " + pitchReason + " " + rhythmReason)
                .analysis(reason)
                .correction(correction)
                .pitch_score(pitch_score)
                .rhythm_score(rhythm_score)
                .date(LocalDateTime.now())
                .build();

        return sentenceRecordRepository.save(sentenceRecord);
    }

    // 틀린 문장 발음 인덱스 반환
    public String setWrongSentencePhon(Long sentenceId, SentenceRecord sentenceRecord) {
        Sentence sentence = sentenceRepository.findById(sentenceId)
                .orElseThrow(() -> new IllegalArgumentException("Sentence not found with id " + sentenceId));

        // 틀린 발음이 포함된 인덱스 반환
        // sentence의 마지막 문자('.', '?') 제거
        List<Integer> incorrectPronIndices = KoreanPronChecker
                .getIncorrectPronIndices(sentence.getText().substring(0, sentence.getText().length() - 1), sentenceRecord.getPron());
        StringBuilder sb = new StringBuilder();
        for (Integer incorrectPronIndex : incorrectPronIndices) {
            sb.append(incorrectPronIndex);
            sb.append(",");
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    private static int parseScorePercentage(String scoreStr) {
        try {
            // 점수 문자열에서 숫자 부분만 분리
            String[] parts = scoreStr.replace("점", "").split("/");
            if (parts.length == 2) {
                int numerator = Integer.parseInt(parts[0].trim());
                int denominator = Integer.parseInt(parts[1].trim());
                if (denominator != 0) {
                    return (int) ((numerator * 100.0) / denominator);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // 디버깅용
        }
        return 0; // 파싱 실패 시 0점 반환
    }
}