package ual.tfg.monolith;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info=@Info(title="Market-tech"))
public class MonolithApplication {
	public static void main(String[] args) {
		SpringApplication.run(MonolithApplication.class, args);
	}

}
