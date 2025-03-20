package prism.damseol.dto;

import lombok.Getter;
import prism.damseol.domain.WordRecord;

import java.time.LocalDateTime;

@Getter
public class WordRecordDTO {

    private Long id;
    private int score;
    private String wrongPhon;
    private String pron;
    private String details;
    private LocalDateTime date;

    public WordRecordDTO(WordRecord wordRecord) {
        this.id = wordRecord.getId();
        this.score = wordRecord.getScore();
        this.wrongPhon = wordRecord.getWrongPhon();
        this.pron = wordRecord.getPron();
        this.details = wordRecord.getDetails();
        this.date = wordRecord.getDate();
    }
}
