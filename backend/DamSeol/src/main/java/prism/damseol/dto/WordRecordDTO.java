package prism.damseol.dto;

import lombok.Getter;
import prism.damseol.domain.WordRecord;

import java.time.LocalDateTime;

@Getter
public class WordRecordDTO {

    private Long id;
    private String name;
    private int score;
    private String wrongPhon;
    private String wrongPhonIndices;
    private String pron;
    private String evaluation;
    private String analysis;
    private LocalDateTime date;

    public WordRecordDTO(WordRecord wordRecord) {
        this.id = wordRecord.getId();
        this.name = wordRecord.getMember().getName();
        this.score = wordRecord.getScore();
        this.wrongPhon = wordRecord.getWrongPhon();
        this.pron = wordRecord.getPron();
        this.evaluation = wordRecord.getEvaluation();
        this.analysis = wordRecord.getAnalysis();
        this.date = wordRecord.getDate();
    }

    public void setWrongPhonIndices(String wrongPhonIndices) {
        this.wrongPhonIndices = wrongPhonIndices;
    }
}
