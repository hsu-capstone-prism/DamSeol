package prism.damseol.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import prism.damseol.dto.SubcategoryDTO;
import prism.damseol.service.SubcategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/subcategories")
public class SubcategoryController {

    private final SubcategoryService subcategoryService;

    @Autowired
    public SubcategoryController(SubcategoryService subcategoryService) {
        this.subcategoryService = subcategoryService;
    }

    @Operation(summary = "서브카테고리 목록 조회", description = "단어 및 문장 연습을 위한 서브카테고리 목록을 조회합니다.")
    @GetMapping
    public List<SubcategoryDTO> getAllSubcategories() {
        
        return subcategoryService.getAllSubcategories();
    }
}
