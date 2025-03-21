package prism.damseol.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import prism.damseol.domain.Member;
import prism.damseol.domain.Word;
import prism.damseol.domain.WordRecord;
import prism.damseol.dto.CustomUserDetails;
import prism.damseol.repository.MemberRepository;
import prism.damseol.repository.WordRecordRepository;
import prism.damseol.repository.WordRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class PracticeService {

    private final WordRepository wordRepository;
    private final MemberRepository memberRepository;
    private final WordRecordRepository wordRecordRepository;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    // 1. 파일 업로드 처리
    public String uploadAudioFile(MultipartFile audioFile) throws IOException {
        if (audioFile == null || audioFile.isEmpty()) {
            throw new IllegalArgumentException("파일이 없습니다.");
        }

        String fileName = audioFile.getOriginalFilename();
        if (fileName == null || fileName.trim().isEmpty()) {
            throw new IllegalArgumentException("파일 이름이 유효하지 않습니다.");
        }

        // Windows에서도 동작하도록 절대 경로 사용
        Path uploadPath = Paths.get(UPLOAD_DIR);
        Path filePath = uploadPath.resolve(fileName);

        try {
            // 디렉토리가 없으면 생성
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            // 파일 저장
            Files.write(filePath, audioFile.getBytes());
            System.out.println("uploadAudioFile: 파일 업로드 성공! 경로: " + filePath.toString());
        } catch (IOException e) {
            throw new IOException("파일 업로드 실패: " + e.getMessage(), e);
        }
        return fileName;
    }

    // 2. WordRecord 생성 및 저장
    public WordRecord createWordRecord(Long wordId, Authentication authentication) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new IllegalArgumentException("Word not found with id " + wordId));

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String name = customUserDetails.getUsername();
        Member member = memberRepository.findByName(name);

        /*
        하드코딩 - 추후에 개발 예정
         */
        WordRecord wordRecord = new WordRecord();
        wordRecord.setWord(word);
        wordRecord.setMember(member);
        wordRecord.setScore(75);
        wordRecord.setWrongPhon("ㄱ,ㄷ");
        wordRecord.setPron("낭로");
        wordRecord.setDetails("발화 속도 정보가 없어 평가가 어렵지만, 발화 중단 비율이 0.448%로 적절해요 ✅");
        wordRecord.setDate(LocalDateTime.now());

        return wordRecordRepository.save(wordRecord);
    }

    // 3. SentenceRecord 생성 및 저장
    //public SentenceRecord createSentenceRecord(Long sentenceeId, Authentication authentication) {
}
