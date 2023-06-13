package ual.tfg.monolith.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class linkListDto {
    @JsonProperty("href")
    private String href;
    @JsonProperty("rel")
    private String rel;
    @JsonProperty("method")
    private String method;
}
