package prism.damseol.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import prism.damseol.domain.GameScenario;
import prism.damseol.repository.GameScenarioRepository;

import java.util.List;

@RestController
@RequestMapping("/api/scenarios")
@RequiredArgsConstructor
public class GameController {

    private final GameScenarioRepository gameScenarioRepository;

    @Operation(summary = "게임 시나리오 목록 조회", description = "게임 콘텐츠를 위한 시나리오 목록을 조회합니다.")
    @GetMapping
    public List<GameScenario> getAllScenarios() {
        return gameScenarioRepository.findAll();
    }
}