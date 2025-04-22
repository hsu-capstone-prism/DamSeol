package prism.damseol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import prism.damseol.domain.*;
import prism.damseol.dto.*;
import prism.damseol.repository.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final MemberRepository memberRepository;
    private final WordRecordRepository wordRecordRepository;
    private final SentenceRecordRepository sentenceRecordRepository;

    public ReportDTO getReportByMember(String memberName) {
        Member member = memberRepository.findByName(memberName);
        if (member == null)
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");

        // 단어 정확도 점수 목록
        List<WordRecord> wordRecords = wordRecordRepository.findAllByMember(member);
        List<Integer> wordScores = wordRecords.stream()
                .map(WordRecord::getScore)
                .toList();

        // 문장 정확도 점수 목록
        List<SentenceRecord> sentenceRecords = sentenceRecordRepository.findAllByMember(member);
        List<Integer> sentenceScores = sentenceRecords.stream()
                .map(SentenceRecord::getCorrection)
                .toList();

        // 단어 평균
        double avgWordAccuracy = wordScores.stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);

        // 문장 평균
        double avgSentenceAccuracy = sentenceScores.stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);

        // 전체 정확도 평균
        int totalCount = wordScores.size() + sentenceScores.size();
        double avgAccuracy = totalCount == 0 ? 0.0 :
                (wordScores.stream().mapToInt(Integer::intValue).sum()
                        + sentenceScores.stream().mapToInt(Integer::intValue).sum()) / (double) totalCount;

        // 피치, 리듬 평균
        double avgPitchScore = sentenceRecords.stream()
                .mapToInt(SentenceRecord::getPitch_score)
                .average()
                .orElse(0.0);

        double avgRhythmScore = sentenceRecords.stream()
                .mapToInt(SentenceRecord::getRhythm_score)
                .average()
                .orElse(0.0);

        return ReportDTO.builder()
                .avgAccuracy(avgAccuracy)
                .avgWordAccuracy(avgWordAccuracy)
                .avgSentenceAccuracy(avgSentenceAccuracy)
                .avgPitchScore(avgPitchScore)
                .avgRhythmScore(avgRhythmScore)
                .build();
    }

    public ReportListDTO getWeeklyReportByMember(String memberName) {
        Member member = memberRepository.findByName(memberName);
        if (member == null)
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");

        List<WordRecord> wordRecords = wordRecordRepository.findAllByMember(member);
        List<SentenceRecord> sentenceRecords = sentenceRecordRepository.findAllByMember(member);

        List<WeeklyReportDTO> weeklyReports = List.of(0, 1, 2, 3).stream()
                .map(weekOffset -> {
                    LocalDateTime startOfWeek = getStartOfWeek(weekOffset);
                    LocalDateTime endOfWeek = getEndOfWeek(weekOffset);

                    List<WordRecord> wordsInWeek = wordRecords.stream()
                            .filter(w -> w.getDate().isAfter(startOfWeek) && w.getDate().isBefore(endOfWeek))
                            .toList();

                    List<SentenceRecord> sentencesInWeek = sentenceRecords.stream()
                            .filter(s -> s.getDate().isAfter(startOfWeek) && s.getDate().isBefore(endOfWeek))
                            .toList();

                    // avgAccuracy 계산
                    int totalWordScoreSum = wordsInWeek.stream().mapToInt(WordRecord::getScore).sum();
                    int totalSentenceCorrectionSum = sentencesInWeek.stream().mapToInt(SentenceRecord::getCorrection).sum();
                    int totalCount = wordsInWeek.size() + sentencesInWeek.size();

                    double avgAccuracy = totalCount > 0
                            ? (totalWordScoreSum + totalSentenceCorrectionSum) / (double) totalCount
                            : 0.0;

                    double avgSentenceAccuracy = sentencesInWeek.stream()
                            .mapToInt(SentenceRecord::getCorrection)
                            .average()
                            .orElse(0.0);

                    double avgPitchScore = sentencesInWeek.stream()
                            .mapToInt(SentenceRecord::getPitch_score)
                            .average()
                            .orElse(0.0);

                    double avgRhythmScore = sentencesInWeek.stream()
                            .mapToInt(SentenceRecord::getRhythm_score)
                            .average()
                            .orElse(0.0);

                    return WeeklyReportDTO.builder()
                            .weekOffset(weekOffset)
                            .avgAccuracy(avgAccuracy)
                            .avgSentenceAccuracy(avgSentenceAccuracy)
                            .avgPitchScore(avgPitchScore)
                            .avgRhythmScore(avgRhythmScore)
                            .build();
                })
                .collect(Collectors.toList());

        return ReportListDTO.builder()
                .weeklyReports(weeklyReports)
                .build();
    }

    public WeeklyLearningCountDTO getWeekLearningCountByMember(String memberName) {
        Member member = memberRepository.findByName(memberName);
        if (member == null)
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");

        LocalDateTime startOfWeek = getStartOfWeek(0);
        LocalDateTime endOfWeek = getEndOfWeek(0);

        long wordCount = wordRecordRepository.findAllByMember(member).stream()
                .filter(w -> w.getDate().isAfter(startOfWeek) && w.getDate().isBefore(endOfWeek))
                .count();

        long sentenceCount = sentenceRecordRepository.findAllByMember(member).stream()
                .filter(s -> s.getDate().isAfter(startOfWeek) && s.getDate().isBefore(endOfWeek))
                .count();

        return new WeeklyLearningCountDTO(wordCount, sentenceCount);
    }

    private LocalDateTime getStartOfWeek(int weeksAgo) {
        return LocalDate.now()
                .minusWeeks(weeksAgo)
                .with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY))
                .atStartOfDay();
    }

    private LocalDateTime getEndOfWeek(int weeksAgo) {
        return LocalDate.now()
                .minusWeeks(weeksAgo)
                .with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY))
                .atTime(23, 59, 59);
    }
}