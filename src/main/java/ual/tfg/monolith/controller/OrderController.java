package ual.tfg.monolith.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ual.tfg.monolith.dto.OrderRequestDto;
import ual.tfg.monolith.entity.Order;
import ual.tfg.monolith.service.OrderService;
import ual.tfg.monolith.service.UserService;

import java.util.List;

@Controller
@RequestMapping("/order")
@CrossOrigin(allowedHeaders = "*")
public class OrderController {
    @Autowired
    OrderService orderService;

    @Autowired
    UserService userService;

    @PostMapping("/save")
    private ResponseEntity<Order> saveCart(@RequestBody OrderRequestDto order, @RequestHeader("Authorization") String token) {
        if (!userService.validate(token.split("Bearer")[1])) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        orderService.save(order);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    private ResponseEntity<List> getCart(@PathVariable("id") String id, @RequestHeader("Authorization") String token) {
        if (!userService.validate(token.split("Bearer")[1])) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(orderService.getAllById(id));
    }

}
