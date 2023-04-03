package ual.tfg.monolith.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewRequestDto {
    private String userId;
    private Long productId;
    private String titulo;

    private String descripcion;

    private int nota;
}
