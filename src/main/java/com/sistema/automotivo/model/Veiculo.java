package com.sistema.automotivo.model;

import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String modelo;

    @NotBlank
    private String marca;

    @Min(value = 1900, message = "Ano mínimo 1900")
    @Max(value = 2100, message = "Ano máximo 2100")
    private int ano;

    @NotBlank
    private String cor;

    @Min(value = 0, message = "Preço deve ser positivo")
    private double preco;

    @Min(value = 0, message = "Quilometragem deve ser positiva")
    private int quilometragem;

    @NotBlank
    private String status; // disponivel, vendido, etc

    @NotBlank
    @URL
    private String fotoUrl;
}
