package ual.tfg.monolith.entity;


import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "carrito")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial4")
    Long cartId;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "producto_id")
    private Long productId;
    @Column(name = "cantidad")
    private Long cantidad;

    public Cart(String userId, Long productId, Long cantidad) {
        this.userId = userId;
        this.productId = productId;
        this.cantidad = cantidad;
    }
}
