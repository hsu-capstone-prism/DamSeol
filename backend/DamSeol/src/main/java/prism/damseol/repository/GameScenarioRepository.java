package prism.damseol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prism.damseol.domain.GameScenario;

public interface GameScenarioRepository extends JpaRepository<GameScenario, Long> {
}
