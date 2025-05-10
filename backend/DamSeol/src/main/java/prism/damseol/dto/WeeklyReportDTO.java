package prism.damseol.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WeeklyReportDTO {
    private int weekOffset; // 0: 이번주, 1: 1주 전, ...
    private double avgAccuracy;
    private double avgPitchScore;
    private double avgRhythmScore;
}
