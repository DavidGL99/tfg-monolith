package ual.tfg.monolith.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ual.tfg.monolith.entity.Product;
import ual.tfg.monolith.repository.ProductRepository;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> findAll(){
        return productRepository.findAll();
    }

    public List<Product> findAllByCategoria( String categoria){
        return productRepository.findAllByCategoria(categoria);
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
}
