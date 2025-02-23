package prism.damseol.service;

import prism.damseol.domain.Member;
import prism.damseol.domain.Role;

import java.util.List;

public interface RegistrationService {

    Member createMember(Member member, List<Role> userRoles);
    boolean checkEmailExists(String email);
    Role findByName(String name);
}