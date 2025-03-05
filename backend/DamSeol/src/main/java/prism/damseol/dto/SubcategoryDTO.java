package prism.damseol.dto;

import lombok.Getter;
import prism.damseol.domain.Subcategory;

@Getter
public class SubcategoryDTO {
    private Long id;
    private String name;
    private String categoryName; // 카테고리 이름 포함

    public SubcategoryDTO(Subcategory subcategory) {
        this.id = subcategory.getId();
        this.name = subcategory.getName();
        this.categoryName = subcategory.getCategory().getName();
    }

    public static SubcategoryDTO fromEntity(Subcategory subcategory) {
        return new SubcategoryDTO(subcategory);
    }
}
