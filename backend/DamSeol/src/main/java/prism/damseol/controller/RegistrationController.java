package prism.damseol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import prism.damseol.domain.Member;
import prism.damseol.domain.Role;
import prism.damseol.service.RegistrationService;

import java.util.ArrayList;
import java.util.List;

public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String signup(Model model) {
        Member member = new Member();

        model.addAttribute("member", member);
        return "signup";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String signupPost(@ModelAttribute("member") Member member, Model model) {

        if (registrationService.checkEmailExists(member.getEmail())) {
            model.addAttribute("emailExists", true);
            return "signup";
        } else {
            List<Role> memberRoles = new ArrayList<>();
            Role role = registrationService.findByName("ROLE_USER");
            memberRoles.add(role);

            // 특정 이메일 주소인 경우 ADMIN 역할 추가
            if ("admin@google.co.kr" .equals(member.getEmail())) {
                Role roleAdmin = registrationService.findByName("ROLE_ADMIN");
                memberRoles.add(roleAdmin);
            }
            registrationService.createMember(member, memberRoles);

            return "redirect:/";
        }
    }
}
