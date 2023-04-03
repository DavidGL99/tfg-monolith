package ual.tfg.monolith.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ual.tfg.monolith.dto.TokenDto;
import ual.tfg.monolith.dto.UserDto;
import ual.tfg.monolith.entity.User;
import ual.tfg.monolith.repository.UserRepository;
import ual.tfg.monolith.security.JwtProvider;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtProvider jwtProvider;

    public User save(UserDto dto) {
        Optional<User> user = userRepository.findByEmail(dto.getEmail());
        if(user.isPresent())
            return null;
        String password = passwordEncoder.encode(dto.getPassword());
        User authUser = new User(
                dto.getName(),
                dto.getLastnames(),
                dto.getEmail(),
                dto.getPassword());
        return userRepository.save(authUser);
    }

    public TokenDto login(UserDto dto) {
        Optional<User> user = userRepository.findByEmail(dto.getEmail());
        if(!user.isPresent())
            return null;
        if(passwordEncoder.matches(dto.getPassword(), passwordEncoder.encode(user.get().getPassword())))
            return new TokenDto(jwtProvider.createToken(user.get()));
        return null;
    }

    public Boolean validate(String token) {
        if(!jwtProvider.validate(token))
            return false;
        String username = jwtProvider.getUserNameFromToken(token);
        if(!userRepository.findByEmail(username).isPresent())
            return false;
        return true;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
