package ual.tfg.monolith.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ual.tfg.monolith.entity.Cart;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {
    List<Cart> findAll();

    List<Cart> findAllByUserId(String id);

    Optional<Cart> findByUserIdAndProductId(String userId, Long productId);

    @Transactional
    @Modifying
    void deleteAllByUserId(String userId);
    @Transactional
    @Modifying
    void deleteAllByProductId(String productId);
}
