package ual.tfg.monolith.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CartResponseDto {
    private String userId;
    private ProductDto product;
    private Long cantidad;
}
