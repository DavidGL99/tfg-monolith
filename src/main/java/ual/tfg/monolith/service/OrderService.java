package ual.tfg.monolith.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ual.tfg.monolith.config.PaypalConfig;
import ual.tfg.monolith.dto.*;
import ual.tfg.monolith.entity.Order;
import ual.tfg.monolith.entity.Product;
import ual.tfg.monolith.repository.OrderRepository;
import ual.tfg.monolith.utility.Mapper;

import java.net.http.HttpClient;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductService productService;

    public boolean save(OrderRequestDto order) {
        for (Long o : order.getProductId()) {
            orderRepository.save(new Order(order.getUserId(), o));
        }
        return true;
    }

    public List<OrderResponseDto> getAllById(String id) {
        List<Order> cartList = orderRepository.findAllByUserId(id);
        List<OrderResponseDto> response = new ArrayList<>();
        for (Order cart : cartList) {
            response.add(new OrderResponseDto(cart.getUserId(), getProduct(cart.getProductId())));
        }
        return response;
    }

    public ProductDto getProduct(Long productId) {
        Product response = productService.findById(productId);
        return Mapper.modelMapper().map(response, ProductDto.class);
    }


}
