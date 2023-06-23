package ual.tfg.monolith.entity;


import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial4")
    Long reviewId;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "producto_id")
    private Long productId;
    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "nota")
    private int nota;

    public Review(String userId, Long productId, String titulo, String descripcion, int nota) {
        this.userId = userId;
        this.productId = productId;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.nota = nota;
    }
}
