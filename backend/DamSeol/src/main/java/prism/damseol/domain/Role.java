package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Role {

    @Id @GeneratedValue
    @Column(name = "role_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;
}
