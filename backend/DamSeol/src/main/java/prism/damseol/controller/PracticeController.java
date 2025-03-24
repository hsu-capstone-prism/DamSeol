package prism.damseol.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import prism.damseol.domain.Member;
import prism.damseol.domain.Word;
import prism.damseol.domain.WordRecord;
import prism.damseol.dto.CustomUserDetails;
import prism.damseol.dto.WordRecordDTO;
import prism.damseol.repository.WordRepository;
import prism.damseol.service.KoreanPronChecker;
import prism.damseol.service.PracticeService;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PracticeController {

    private final PracticeService practiceService;
    private final WordRepository wordRepository;

    public PracticeController(PracticeService practiceService, WordRepository wordRepository) {
        this.practiceService = practiceService;
        this.wordRepository = wordRepository;
    }

    @PostMapping("/upload/word/{wordId}")
    public ResponseEntity<WordRecordDTO> uploadAudio(@PathVariable("wordId") Long wordId,
                                                     @RequestParam("audio") MultipartFile audioFile) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = customUserDetails.getUsername();

        try {
            // 1. 파일 업로드 (fileName은 사용하지 않음)
            String fileName = practiceService.uploadAudioFile(audioFile, memberName);

            // 2. WordRecord 생성 및 저장
            WordRecord wordRecord = practiceService.createWordRecord(wordId, memberName);

            // 3. 틀린 발음 설정 및 인덱스 반환
            String wrongPhonsIndices = practiceService.setWrongPhon(wordId, wordRecord);

            // WordRecordDTO로 변환 후 반환
            WordRecordDTO wordRecordDTO = new WordRecordDTO(wordRecord);
            wordRecordDTO.setWrongPhonIndices(wrongPhonsIndices);

            return ResponseEntity.ok(wordRecordDTO);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            System.out.println("파일 업로드 실패");
            return ResponseEntity.internalServerError().build();
        }
    }

    /*
    @PostMapping("/upload/sentence/{sentenceId}")
    public ResponseEntity<Map<String, Object>> uploadSentence(@PathVariable("sentenceId") Long sentenceId,
                                                              @RequestParam("audio") MultipartFile audioFile) {
    }
    */
}