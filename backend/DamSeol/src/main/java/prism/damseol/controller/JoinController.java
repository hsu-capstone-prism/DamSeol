package prism.damseol.controller;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import prism.damseol.dto.JoinDTO;
import prism.damseol.service.JoinService;

@Controller
@ResponseBody
@AllArgsConstructor
public class JoinController {

    private final JoinService joinService;

    @PostMapping("/api/join")
    public String joinProcess(JoinDTO joinDTO) {

        System.out.println(joinDTO.getUsername());
        joinService.joinProcess(joinDTO);

        return "ok";
    }
}
