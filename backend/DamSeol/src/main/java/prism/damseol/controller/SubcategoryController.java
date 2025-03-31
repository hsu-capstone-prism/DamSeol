package prism.damseol.controller;

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

    // 서브카테고리 목록 가져오기
    @GetMapping
    public List<SubcategoryDTO> getAllSubcategories() {
        
        return subcategoryService.getAllSubcategories();

    }
}
