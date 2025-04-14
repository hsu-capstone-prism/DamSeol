package prism.damseol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import prism.damseol.domain.*;
import prism.damseol.dto.ReportDTO;
import prism.damseol.dto.SentenceScoreDTO;
import prism.damseol.dto.WordScoreDTO;
import prism.damseol.repository.*;

import java.util.List;

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

        // 단어 정확도 평균
        List<WordRecord> wordRecords = wordRecordRepository.findAllByMember(member);
        double avgWordAccuracy = wordRecords.stream()
                .mapToInt(WordRecord::getScore)
                .average()
                .orElse(0.0);

        // 문장 레코드들
        List<SentenceRecord> sentenceRecords = sentenceRecordRepository.findAllByMember(member);

        double avgSentenceAccuracy = sentenceRecords.stream()
                .mapToInt(SentenceRecord::getCorrection)
                .average()
                .orElse(0.0);

        double avgPitchScore = sentenceRecords.stream()
                .mapToInt(SentenceRecord::getPitch_score)
                .average()
                .orElse(0.0);

        double avgRhythmScore = sentenceRecords.stream()
                .mapToInt(SentenceRecord::getRhythm_score)
                .average()
                .orElse(0.0);

        return ReportDTO.builder()
                .avgWordAccuracy(avgWordAccuracy)
                .avgSentenceAccuracy(avgSentenceAccuracy)
                .avgPitchScore(avgPitchScore)
                .avgRhythmScore(avgRhythmScore)
                .build();
    }
}