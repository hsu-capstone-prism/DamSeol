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

    // 평균 정확도, 평균 점수 표시(삼각형)
    @GetMapping("/scores")
    public ResponseEntity<ReportDTO> getReportForMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = customUserDetails.getUsername();

        ReportDTO report = reportService.getReportByMember(memberName);
        return ResponseEntity.ok(report);
    }

    // 주차별 정확도 추이
    @GetMapping("/weekly")
    public ResponseEntity<ReportListDTO> getWeeklyReport() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = userDetails.getUsername();

        ReportListDTO reportList = reportService.getWeeklyReportByMember(memberName);
        return ResponseEntity.ok(reportList);
    }

    // 이번 주에 학습한 단어, 문장
    @GetMapping("/count")
    public ResponseEntity<WeeklyLearningCountDTO> getWeeklyLearningCount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = userDetails.getUsername();

        WeeklyLearningCountDTO weeklyLearningCountDTO = reportService.getWeekLearningCountByMember(memberName);
        return ResponseEntity.ok(weeklyLearningCountDTO);
    }
}