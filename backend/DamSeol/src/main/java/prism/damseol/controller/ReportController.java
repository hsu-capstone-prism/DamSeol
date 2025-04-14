package prism.damseol.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import prism.damseol.dto.*;
import prism.damseol.service.ReportService;

import java.util.List;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    private final ReportService reportService;


    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/scores")
    public ResponseEntity<ReportDTO> getReportForMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = customUserDetails.getUsername();

        ReportDTO report = reportService.getReportByMember(memberName);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/weekly")
    public ResponseEntity<ReportListDTO> getWeeklyReport() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = userDetails.getUsername();

        ReportListDTO reportList = reportService.getWeeklyReportByMember(memberName);
        return ResponseEntity.ok(reportList);
    }
}