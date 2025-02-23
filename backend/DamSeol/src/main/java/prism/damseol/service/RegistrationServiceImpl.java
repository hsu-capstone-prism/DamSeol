package prism.damseol.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import prism.damseol.domain.Member;
import prism.damseol.domain.Role;
import prism.damseol.repository.MemberRepository;
import prism.damseol.repository.RoleRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Member createMember(Member member, List<Role> memberRoles) {

        for (Role ur : memberRoles) {
            if (roleRepository.findByName(ur.getName()).isEmpty()) {
                roleRepository.save(ur);
            }
        }

        // generate new Bcrypt hash
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        member.setRoles(memberRoles);
        Member newMember = memberRepository.save(member);
        return newMember;
    }

    public boolean checkEmailExists(String email) {
        if (memberRepository.findByEmail(email).isPresent())
            return true;

        return false;
    }

    public Role findByName(String name) {
        Optional<Role> role = roleRepository.findByName(name);
        return role.orElseGet(() -> new Role(name));
    }
}
