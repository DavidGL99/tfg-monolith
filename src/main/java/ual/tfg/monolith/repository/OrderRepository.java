package ual.tfg.monolith.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ual.tfg.monolith.entity.Order;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {
    List<Order> findAll();

    List<Order> findAllByUserId(String id);

}
