package prism.damseol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prism.damseol.domain.Member;
import prism.damseol.domain.WordRecord;

import java.util.List;

public interface WordRecordRepository extends JpaRepository<WordRecord, Long> {

    List<WordRecord> findAllByMember(Member member);
}