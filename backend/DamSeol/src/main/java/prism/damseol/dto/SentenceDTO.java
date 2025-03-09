package prism.damseol.dto;

import lombok.Getter;
import prism.damseol.domain.Sentence;

@Getter
public class SentenceDTO {

    private Long id;
    private String text;

    public SentenceDTO(Sentence sentence) {
        this.id = sentence.getId();
        this.text = sentence.getText();
    }
}
