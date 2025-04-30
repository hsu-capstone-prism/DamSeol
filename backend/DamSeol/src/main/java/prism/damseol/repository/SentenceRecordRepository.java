package prism.damseol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prism.damseol.domain.Member;
import prism.damseol.domain.SentenceRecord;

import java.util.List;

public interface SentenceRecordRepository extends JpaRepository<SentenceRecord, Long> {

    List<SentenceRecord> findAllByMember(Member member);
}