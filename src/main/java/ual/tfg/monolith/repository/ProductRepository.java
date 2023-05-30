package ual.tfg.monolith.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ual.tfg.monolith.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAll();
    List<Product> findAllByCategoria(String categoria);
    List<Product> findByNameContainingIgnoreCase(String name);
}
