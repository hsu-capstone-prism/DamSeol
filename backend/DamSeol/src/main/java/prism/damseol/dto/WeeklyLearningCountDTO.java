package prism.damseol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WeeklyLearningCountDTO {
    private long wordCount;
    private long sentenceCount;
}
