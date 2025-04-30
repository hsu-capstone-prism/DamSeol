package prism.damseol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prism.damseol.domain.Subcategory;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
}