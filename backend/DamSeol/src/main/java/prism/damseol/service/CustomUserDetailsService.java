package prism.damseol.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import prism.damseol.domain.Member;
import prism.damseol.repository.MemberRepository;

import java.util.Collection;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(username)  // email을 username으로 사용
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return new org.springframework.security.core.userdetails.User(member.getEmail(), member.getPassword(), getAuthorities(member));
    }

    private static Collection<? extends GrantedAuthority> getAuthorities(Member member) {
        String[] memberRoles = member.getRoles()
                .stream()
                .map((role) -> role.getName()) .toArray(String[]::new);

        Collection<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(memberRoles);

        return authorities;
    }
}
