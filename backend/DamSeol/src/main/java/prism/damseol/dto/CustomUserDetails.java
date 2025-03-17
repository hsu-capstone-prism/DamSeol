package prism.damseol.dto;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import prism.damseol.domain.Member;
import prism.damseol.domain.Role;

import java.util.ArrayList;
import java.util.Collection;

@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final Member member;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 권한 목록을 담을 컬렉션
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        // member의 roles에서 각 role의 name을 권한으로 추가
        for (Role role : member.getRoles()) {
            authorities.add(role::getName);  // Role의 name을 반환하는 람다식
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
