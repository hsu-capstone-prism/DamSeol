package prism.damseol.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import prism.damseol.dto.JoinDTO;
import prism.damseol.service.JoinService;

@Controller
@ResponseBody
@AllArgsConstructor
public class JoinController {

    private final JoinService joinService;

    @Operation(summary = "회원가입", description = "사용자 계정을 생성하고 회원가입을 처리합니다.")
    @PostMapping("/api/join")
    public String joinProcess(JoinDTO joinDTO) {

        System.out.println(joinDTO.getUsername());
        joinService.joinProcess(joinDTO);

        return "ok";
    }
}
