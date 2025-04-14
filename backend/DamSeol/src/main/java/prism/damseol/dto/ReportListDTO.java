package prism.damseol.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReportListDTO {
    private List<WeeklyReportDTO> weeklyReports;
}
