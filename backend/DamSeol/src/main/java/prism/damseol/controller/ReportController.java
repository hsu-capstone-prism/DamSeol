package prism.damseol.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import prism.damseol.dto.SentenceRecordDTO;
import prism.damseol.dto.WordRecordDTO;
import prism.damseol.dto.CustomUserDetails;
import prism.damseol.service.ReportService;

import java.util.List;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

//    @GetMapping("/words")
//    public ResponseEntity<List<WordRecordDTO>> getWordRecordsByMember() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
//        String memberName = customUserDetails.getUsername();
//
//        List<WordRecordDTO> wordRecords = reportService.getWordRecordsByMember(memberName);
//        return ResponseEntity.ok(wordRecords);
//    }
//
//    @GetMapping("/sentences")
//    public ResponseEntity<List<SentenceRecordDTO>> getSentenceRecordsByMember() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
//        String memberName = customUserDetails.getUsername();
//
//        List<SentenceRecordDTO> sentenceRecords = reportService.getSentenceRecordsByMember(memberName);
//        return ResponseEntity.ok(sentenceRecords);
//    }
}