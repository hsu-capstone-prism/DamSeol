package prism.damseol.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import prism.damseol.domain.Role;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@ResponseBody
public class MainController {

    @GetMapping("/")
    public String mainP() {
        //세션 사용자 이름 확인
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        //세션 사용자 role 확인
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return "Main Controller : " + name;
    }
}
