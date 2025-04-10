package prism.damseol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import prism.damseol.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Member findByName(String name);

    Boolean existsByName(String username);

    //Member findByName(String username);
    @Query("SELECT m FROM Member m JOIN FETCH m.roles WHERE m.name = :name")
    Member findByNameWithRoles(@Param("name") String name);
}
