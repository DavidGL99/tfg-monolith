package ual.tfg.monolith.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserDto {

    private String email;
    private String password;
    private String name;
    private String lastnames;

    private String token;
}
