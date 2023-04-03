package ual.tfg.monolith.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ual.tfg.monolith.dto.CartRequestDto;
import ual.tfg.monolith.dto.CartResponseDto;
import ual.tfg.monolith.dto.ProductDto;
import ual.tfg.monolith.entity.Cart;
import ual.tfg.monolith.entity.Product;
import ual.tfg.monolith.repository.CartRepository;
import ual.tfg.monolith.utility.Mapper;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductService productService;


    public Cart save(CartRequestDto dto) {
        Cart cart = Mapper.modelMapper().map(dto, Cart.class);
        Cart old = cartRepository.findByUserIdAndProductId(dto.getUserId(), dto.getProductId()).orElse(null);
        if (old != null) {
            old.setCantidad(cart.getCantidad() + old.getCantidad());
            return cartRepository.save(old);
        }
        return cartRepository.save(cart);
    }

    public List<CartResponseDto> getAllById(String id) {
        List<Cart> cartList = cartRepository.findAllByUserId(id);
        List<CartResponseDto> response = new ArrayList<>();
        for (Cart cart : cartList) {
            response.add(new CartResponseDto(cart.getUserId(), getProduct(cart.getProductId()), cart.getCantidad()));
        }
        return response;
    }


    public ProductDto getProduct(Long productId) {

        Product response = productService.findById(productId);
        return Mapper.modelMapper().map(response, ProductDto.class);
    }


    public void deleteByUser(String userId) {
        cartRepository.deleteAllByUserId(userId);
    }

    public void deleteByProduct(String productId) {
        cartRepository.deleteAllByProductId(productId);
    }

}
