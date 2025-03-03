package prism.damseol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prism.damseol.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Boolean existsByName(String username);

    Member findByName(String username);
}
