package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roles")
@Getter @Setter
@NoArgsConstructor
public class Role {

    @Id @GeneratedValue
    @Column(name = "role_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private List<Member> members = new ArrayList<>();
}
