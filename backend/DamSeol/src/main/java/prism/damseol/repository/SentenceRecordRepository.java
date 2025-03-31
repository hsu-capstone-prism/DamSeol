package prism.damseol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prism.damseol.domain.SentenceRecord;

public interface SentenceRecordRepository extends JpaRepository<SentenceRecord, Long> {
}