package prism.damseol.dto;

import prism.damseol.domain.SentenceRecord;
import prism.damseol.domain.WordRecord;

import java.time.LocalDateTime;

public class SentenceRecordDTO {

    private Long id;
    private String name;
    private int score;
    private String wrongPhonIndices;
    private String pron;
    private String details;
    private LocalDateTime date;

    public SentenceRecordDTO(SentenceRecord sentenceRecord) {
        this.id = sentenceRecord.getId();
        this.name = sentenceRecord.getMember().getName();
        this.score = sentenceRecord.getScore();
        this.pron = sentenceRecord.getPron();
        this.details = sentenceRecord.getDetails();
        this.date = sentenceRecord.getDate();
    }

    public void setWrongPhonIndices(String wrongPhonIndices) {
        this.wrongPhonIndices = wrongPhonIndices;
    }
}
