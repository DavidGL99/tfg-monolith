package ual.tfg.monolith.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ual.tfg.monolith.dto.CartRequestDto;
import ual.tfg.monolith.entity.Cart;
import ual.tfg.monolith.service.CartService;
import ual.tfg.monolith.service.UserService;


import java.util.List;

@Controller
@RequestMapping("/cart")
public class CartController {
    @Autowired
    CartService cartService;

    @Autowired
    UserService userService;

    @PostMapping("/save")
    private ResponseEntity<Cart> saveCart(@RequestBody CartRequestDto cart, @RequestHeader("Authorization") String token) {
        if (!userService.validate(token.split("Bearer")[1])) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(cartService.save(cart));
    }

    @GetMapping("/id/{id}")
    private ResponseEntity<List> getCart(@PathVariable("id") String id, @RequestHeader("Authorization") String token) {
        if (!userService.validate(token.split("Bearer")[1])) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(cartService.getAllById(id));
    }

    @DeleteMapping("/remove/user/{id}")
    private ResponseEntity deleteByUser (@PathVariable("id") String id){
        cartService.deleteByUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/remove/product/{id}")
    private ResponseEntity deleteByProduct (@PathVariable("id") String id){
        cartService.deleteByProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
