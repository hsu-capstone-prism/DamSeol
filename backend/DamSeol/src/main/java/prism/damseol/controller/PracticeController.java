package prism.damseol.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import prism.damseol.domain.WordRecord;
import prism.damseol.service.PracticeService;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PracticeController {

    private final PracticeService practiceService;

    public PracticeController(PracticeService practiceService) {
        this.practiceService = practiceService;
    }

    @PostMapping("/upload/word/{wordId}")
    public ResponseEntity<Map<String, Object>> uploadAudio(@PathVariable("wordId") Long wordId,
                                                           @RequestParam("audio") MultipartFile audioFile) {

        try {
            // 파일 업로드
            String fileName = practiceService.uploadAudioFile(audioFile);

            // WordRecord 생성 및 저장
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            WordRecord wordRecord = practiceService.createWordRecord(wordId, authentication);

            // 응답 데이터 구성
            Map<String, Object> response = Map.of(
                    "message", "WordRecord 생성 성공!",
                    "fileName", fileName,
                    "wordRecord", wordRecord
            );
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (IOException e) {
            System.out.println("파일 업로드 실패");
            return ResponseEntity.internalServerError().body(Map.of("message", "파일 저장 실패"));
        }
    }

    /*
    @PostMapping("/upload/sentence/{sentenceId}")
    public ResponseEntity<Map<String, Object>> uploadSentence(@PathVariable("sentenceId") Long sentenceId,
                                                              @RequestParam("audio") MultipartFile audioFile) {
    }
    */
}