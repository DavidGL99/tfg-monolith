package ual.tfg.monolith.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ual.tfg.monolith.dto.TokenDto;
import ual.tfg.monolith.dto.UserDto;
import ual.tfg.monolith.entity.User;
import ual.tfg.monolith.security.SecurityConfig;
import ual.tfg.monolith.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(allowedHeaders = "*")
public class AuthUserController {

    @Autowired
    UserService userService;


    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto dto){
        TokenDto tokenDto = userService.login(dto);
        if(tokenDto == null)
            return ResponseEntity.badRequest().build();

        User user = userService.findByEmail(dto.getEmail());

        return ResponseEntity.ok(UserDto.builder()
                        .email(user.getEmail())
                        .name(user.getName())
                        .lastnames(user.getLastnames())
                        .token(tokenDto.getToken())
                .build());
    }

    @PostMapping("/validate")
    public ResponseEntity validate(@RequestBody TokenDto token){
        boolean response = userService.validate(token.getToken());
        if(!response)
            return new ResponseEntity<>(new TokenDto(null), HttpStatus.UNAUTHORIZED);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<UserDto> create(@RequestBody UserDto dto){
        User user = userService.save(dto);
        if(user == null)
            return ResponseEntity.badRequest().build();
        TokenDto tokenDto =userService.login(dto);

        return ResponseEntity.ok(UserDto.builder()
                .email(user.getEmail())
                .name(user.getName())
                .lastnames(user.getLastnames())
                .token(tokenDto.getToken())
                .build());
    }
}
