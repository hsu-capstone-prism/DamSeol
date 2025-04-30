package prism.damseol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prism.damseol.domain.Word;
import prism.damseol.domain.Subcategory;
import java.util.List;

public interface WordRepository extends JpaRepository<Word, Long> {
    List<Word> findBySubcategory(Subcategory subcategory);
}