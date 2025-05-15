package prism.damseol.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import prism.damseol.domain.SentenceRecord;
import prism.damseol.domain.WordRecord;
import prism.damseol.dto.CustomUserDetails;
import prism.damseol.dto.SentenceRecordDTO;
import prism.damseol.dto.WordRecordDTO;
import prism.damseol.repository.WordRepository;
import prism.damseol.service.PracticeService;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class PracticeController {

    private final PracticeService practiceService;

    public PracticeController(PracticeService practiceService, WordRepository wordRepository) {
        this.practiceService = practiceService;
    }

    @Operation(summary = "단어 발음 음성 파일 업로드", description = "지정된 단어에 대한 사용자의 발음 오디오를 업로드하여 분석하고 연습 정보를 저장합니다.")
    @PostMapping("/upload/word/{wordId}")
    public ResponseEntity<WordRecordDTO> uploadWordAudio(@PathVariable("wordId") Long wordId,
                                                     @RequestParam("audio") MultipartFile audioFile) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = customUserDetails.getUsername();

        try {
            String fileName = practiceService.uploadAudioFile(audioFile); //파일 업로드

            WordRecord wordRecord = practiceService.createWordRecord(wordId, memberName, audioFile); // WordRecord 생성

            String wrongPhonsIndices = practiceService.setWrongWordPhon(wordId, wordRecord); // 틀린 발음 설정 및 인덱스 반환

            WordRecordDTO wordRecordDTO = new WordRecordDTO(wordRecord); // WordRecordDTO로 변환 후 반환
            wordRecordDTO.setWrongPhonIndices(wrongPhonsIndices);

            return ResponseEntity.ok(wordRecordDTO);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            System.out.println("파일 업로드 실패");
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "문장 발음 음성 파일 업로드", description = "지정된 문장에 대한 사용자의 발음 오디오를 업로드하여 분석하고 연습 정보를 저장합니다.")
    @PostMapping("/upload/sentence/{sentenceId}")
    public ResponseEntity<SentenceRecordDTO> uploadSentenceAudio(@PathVariable("sentenceId") Long sentenceId,
                                                                 @RequestParam("audio") MultipartFile audioFile) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = customUserDetails.getUsername();

        try {
            String fileName = practiceService.uploadAudioFile(audioFile);

            SentenceRecord sentenceRecord = practiceService.createSentenceRecord(sentenceId, memberName, audioFile);

            SentenceRecordDTO sentenceRecordDTO = new SentenceRecordDTO(sentenceRecord);

            sentenceRecordDTO.setWaveformFileName(fileName.replace("_audio.wav", "_waveform.png"));
            sentenceRecordDTO.setPitchFileName(fileName.replace("_audio.wav", "_pitch.png"));

            return ResponseEntity.ok(sentenceRecordDTO);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            System.out.println("파일 업로드 실패");
            return ResponseEntity.internalServerError().build();
        }
    }
}