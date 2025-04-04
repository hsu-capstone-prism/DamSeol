package prism.damseol.dto;

import lombok.Getter;
import prism.damseol.domain.SentenceRecord;

import java.time.LocalDateTime;

@Getter
public class SentenceRecordDTO {

    private Long id;
    private String name;
    private int score;
//    private String wrongPhonIndices;
    private String pron;
    private String details;
    private String waveformFileName;
    private String pitchFileName;
    private LocalDateTime date;

    public SentenceRecordDTO(SentenceRecord sentenceRecord) {
        this.id = sentenceRecord.getId();
        this.name = sentenceRecord.getMember().getName();
        this.score = sentenceRecord.getScore();
        this.pron = sentenceRecord.getPron();
        this.details = sentenceRecord.getDetails();
        this.date = sentenceRecord.getDate();
    }

//    public void setWrongPhonIndices(String wrongPhonIndices) {
//        this.wrongPhonIndices = wrongPhonIndices;
//    }

    public void setPitchFileName(String pitchFileName) {
        this.pitchFileName = pitchFileName;
    }

    public void setWaveformFileName(String waveformFileName) {
        this.waveformFileName = waveformFileName;
    }
}
