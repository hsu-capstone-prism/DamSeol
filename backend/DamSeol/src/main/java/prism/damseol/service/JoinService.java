package prism.damseol.service;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import prism.damseol.domain.Member;
import prism.damseol.domain.Role;
import prism.damseol.dto.JoinDTO;
import prism.damseol.repository.MemberRepository;
import prism.damseol.repository.RoleRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class JoinService {

    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void joinProcess(JoinDTO joinDTO) {

        String username = joinDTO.getUsername();
        String password = joinDTO.getPassword();
        String email = joinDTO.getEmail();

        Boolean isExist = memberRepository.existsByName(username);

        if (isExist)
            return;

        Member data = new Member();

        data.setName(username);
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setEmail(email);

        Optional<Role> optionalRole = roleRepository.findByName("ROLE_ADMIN");
        Role role = optionalRole.orElseGet(() -> {
            Role newRole = new Role();
            newRole.setName("ROLE_ADMIN");
            return roleRepository.save(newRole);
        });

        data.getRoles().add(role); // 역할을 Member에 추가

        memberRepository.save(data);
    }
}
