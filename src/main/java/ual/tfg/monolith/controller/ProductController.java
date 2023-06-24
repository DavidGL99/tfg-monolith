package ual.tfg.monolith.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ual.tfg.monolith.entity.Product;
import ual.tfg.monolith.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(allowedHeaders = "*")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("")
    public ResponseEntity<Product> getById(@RequestParam("id") Long id){
        return ResponseEntity.ok(productService.findById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchByName(@RequestParam("name") String name){
        return ResponseEntity.ok(productService.searchByName(name));
    }

   @GetMapping("/all")
    public  ResponseEntity<List<Product>> getAll(){
       return ResponseEntity.ok(productService.findAll());
   }

    @GetMapping("/category/{categoria}")
    public ResponseEntity<List<Product>> getAllByCategory(@PathVariable("categoria") String category){
        return ResponseEntity.ok(productService.findAllByCategoria(category));
    }



}
