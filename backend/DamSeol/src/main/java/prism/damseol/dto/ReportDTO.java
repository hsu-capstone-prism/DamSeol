package prism.damseol.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDTO {
    private double avgWordAccuracy;     // 단어 정확도 평균
    private double avgSentenceAccuracy; // 문장 정확도 평균
    private double avgPitchScore;       // 피치 점수 평균
    private double avgRhythmScore;      // 리듬 점수 평균
}