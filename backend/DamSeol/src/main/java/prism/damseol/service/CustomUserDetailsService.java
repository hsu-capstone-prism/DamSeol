package prism.damseol.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import prism.damseol.domain.Member;
import prism.damseol.dto.CustomUserDetails;
import prism.damseol.repository.MemberRepository;

import java.util.Collection;

@Service
@Transactional
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //DB에서 조회
        Member memberData = memberRepository.findByNameWithRoles(username);

        if (memberData != null) {
            //UserDetails에 담아서 return하면 AutneticationManager가 검증한다.
            return new CustomUserDetails(memberData);
        }

        return null;
    }
}
