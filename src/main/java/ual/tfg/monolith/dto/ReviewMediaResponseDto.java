package ual.tfg.monolith.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewMediaResponseDto {
    private ProductDto producto;
    private int media;
    private int numberOfReviews;
}
