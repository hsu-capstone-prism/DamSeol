package prism.damseol.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import prism.damseol.dto.ReportDTO;
import prism.damseol.dto.SentenceRecordDTO;
import prism.damseol.dto.WordRecordDTO;
import prism.damseol.dto.CustomUserDetails;
import prism.damseol.service.ReportService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReportController {

    private final ReportService reportService;


    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/report")
    public ResponseEntity<ReportDTO> getReportForMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = customUserDetails.getUsername();

        ReportDTO report = reportService.getReportByMember(memberName);
        return ResponseEntity.ok(report);
    }
}