package prism.damseol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prism.damseol.domain.WordRecord;

public interface WordRecordRepository extends JpaRepository<WordRecord, Long> {
}