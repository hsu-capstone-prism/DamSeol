package prism.damseol.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Choice {
    private String text;
    private boolean isCorrect;
}