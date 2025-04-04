package prism.damseol.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import prism.damseol.domain.*;
import prism.damseol.repository.*;

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
    public WordRecord createWordRecord(Long wordId, String memberName) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new IllegalArgumentException("Word not found with id " + wordId));

        Member member = memberRepository.findByName(memberName);

        /*
        하드코딩 - 추후에 개발 예정
         */

        WordRecord wordRecord = new WordRecord();
        wordRecord.setWord(word);
        wordRecord.setMember(member);
        wordRecord.setScore(75);
        wordRecord.setPron("낭루"); // correctPron: 날로

        wordRecord.setDetails("발화 속도 정보가 없어 평가가 어렵지만, 발화 중단 비율이 0.448%로 적절해요 ✅");
        wordRecord.setDate(LocalDateTime.now());

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
        sb.deleteCharAt(sb.length() - 1);
        wordRecord.setWrongPhon(sb.toString());

        // 틀린 발음이 포함된 인덱스 반환
        List<Integer> incorrectPronIndices = KoreanPronChecker.getIncorrectPronIndices(word.getWordPron(), wordRecord.getPron());
        sb = new StringBuilder();
        for (Integer incorrectPronIndex : incorrectPronIndices) {
            sb.append(incorrectPronIndex);
            sb.append(",");
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    // SentenceRecord 생성 및 저장
    public SentenceRecord createSentenceRecord(Long sentenceId, String memberName) {
        Sentence sentence = sentenceRepository.findById(sentenceId)
                .orElseThrow(() -> new IllegalArgumentException("Sentence not found with id " + sentenceId));

        Member member = memberRepository.findByName(memberName);

        /*
        하드코딩 - 추후에 개발 예정
         */

        SentenceRecord sentenceRecord = new SentenceRecord();
        sentenceRecord.setSentence(sentence);
        sentenceRecord.setMember(member);
        sentenceRecord.setScore(75);
        sentenceRecord.setPron("강아자가 공을부 얼왔다");
        sentenceRecord.setDetails("발화 속도 정보가 없어 평가가 어렵지만, 발화 중단 비율이 0.448%로 적절해요 ✅");
        sentenceRecord.setDate(LocalDateTime.now());

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
}