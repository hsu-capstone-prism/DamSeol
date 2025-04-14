package prism.damseol.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SentenceScoreDTO {
    private int correction;
    private int pitchScore;
    private int rhythmScore;
}
