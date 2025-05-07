package prism.damseol.controller;

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

    @GetMapping
    public List<GameScenario> getAllScenarios() {
        return gameScenarioRepository.findAll();
    }
}