package prism.damseol.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import prism.damseol.dto.*;
import prism.damseol.service.ReportService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    private final ReportService reportService;


    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @Operation(summary = "발음 점수 기록 조회", description = "사용자의 발음 분석 결과를 기반으로 평균 정확도 및 점수를 포함한 리포트 데이터를 조회합니다.")
    @GetMapping("/scores")
    public ResponseEntity<ReportDTO> getReportForMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = customUserDetails.getUsername();

        ReportDTO report = reportService.getReportByMember(memberName);
        return ResponseEntity.ok(report);
    }

    @Operation(summary = "주간 학습 리포트 조회", description = "사용자의 최근 몇 주 동안의 주차별 발음 정확도 변화 추이를 제공합니다.")
    @GetMapping("/weekly")
    public ResponseEntity<ReportListDTO> getWeeklyReport() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = userDetails.getUsername();

        ReportListDTO reportList = reportService.getWeeklyReportByMember(memberName);
        return ResponseEntity.ok(reportList);
    }

    @Operation(summary = "주간 학습 개수 조회", description = "이번 주에 사용자가 학습한 단어와 문장의 개수를 반환합니다.")
    @GetMapping("/count")
    public ResponseEntity<WeeklyLearningCountDTO> getWeeklyLearningCount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = userDetails.getUsername();

        WeeklyLearningCountDTO weeklyLearningCountDTO = reportService.getWeekLearningCountByMember(memberName);
        return ResponseEntity.ok(weeklyLearningCountDTO);
    }

    @Operation(summary = "잘못 발음한 음운 조회", description = "사용자가 누적 학습 중 틀린 자음 및 모음(음운)의 목록을 반환합니다.")
    @GetMapping("/wrongPhons")
    public ResponseEntity<Set<String>> getWrongPhons() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String memberName = userDetails.getUsername();

        Set<String> wrongPhons = reportService.getAllWrongPhons(memberName);
        return ResponseEntity.ok(wrongPhons);
    }
}