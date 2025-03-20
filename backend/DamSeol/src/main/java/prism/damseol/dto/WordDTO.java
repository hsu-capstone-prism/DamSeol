package prism.damseol.dto;

import lombok.Getter;
import prism.damseol.domain.Word;

@Getter
public class WordDTO {

    private Long id;
    private String text;
    private String wordPron;

    public WordDTO(Word word) {
        this.id = word.getId();
        this.text = word.getText();
        this.wordPron = word.getWordPron();
    }
}
