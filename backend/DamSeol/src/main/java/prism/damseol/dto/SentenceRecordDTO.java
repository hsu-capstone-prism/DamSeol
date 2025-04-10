package prism.damseol.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import prism.damseol.domain.SentenceRecord;

import java.time.LocalDateTime;

@Getter
public class SentenceRecordDTO {

    private Long id;
    private String name;
    private int correction;
    private int pitch_score;
    private int rhythm_score;
//    private String wrongPhonIndices;
    private String pron;        //사용자 발음
    private String details;     //평가
    private String waveformFileName;
    private String pitchFileName;
    private LocalDateTime date;

    public SentenceRecordDTO(SentenceRecord sentenceRecord) {
        this.id = sentenceRecord.getId();
        this.name = sentenceRecord.getMember().getName();
        this.correction = sentenceRecord.getCorrection();
        this.pitch_score = sentenceRecord.getPitch_score();
        this.rhythm_score = sentenceRecord.getRhythm_score();
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
