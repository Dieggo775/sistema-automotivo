package com.sistema.automotivo.controller;

import com.sistema.automotivo.model.Veiculo;
import com.sistema.automotivo.service.VeiculoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    // Criar veículo
    @PostMapping
    public ResponseEntity<Veiculo> criar(@RequestBody Veiculo veiculo) {
        return ResponseEntity.ok(veiculoService.salvar(veiculo));
    }

    // Listar todos veículos
    @GetMapping
    public ResponseEntity<List<Veiculo>> listar(@RequestParam(required = false) String marca,
                                                @RequestParam(required = false) Integer ano,
                                                @RequestParam(required = false) String status) {
        List<Veiculo> veiculos = veiculoService.listarTodos();

        if (marca != null) {
            veiculos.removeIf(v -> !v.getMarca().equalsIgnoreCase(marca));
        }
        if (ano != null) {
            veiculos.removeIf(v -> v.getAno() != ano);
        }
        if (status != null) {
            veiculos.removeIf(v -> !v.getStatus().equalsIgnoreCase(status));
        }

        return ResponseEntity.ok(veiculos);
    }

    // Buscar veículo por ID
    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscar(@PathVariable Long id) {
        return veiculoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Veículo com ID " + id + " não encontrado."));
    }

    // Visualizar veículo com foto no Postman
    @GetMapping("/{id}/visualizar")
    public ResponseEntity<String> visualizarVeiculo(@PathVariable Long id) {
        return veiculoService.buscarPorId(id)
                .map(veiculo -> {
                    String html = "<h1>" + veiculo.getMarca() + " " + veiculo.getModelo() + "</h1>" +
                            "<p>Ano: " + veiculo.getAno() + "</p>" +
                            "<p>Cor: " + veiculo.getCor() + "</p>" +
                            "<p>Preço: R$ " + veiculo.getPreco() + "</p>" +
                            "<p>Quilometragem: " + veiculo.getQuilometragem() + " km</p>" +
                            "<p>Status: " + veiculo.getStatus() + "</p>" +
                            "<img src='" + veiculo.getFotoUrl() + "' alt='Foto do Veículo' width='400'/>";
                    return ResponseEntity.ok().header("Content-Type", "text/html").body(html);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // Atualizar veículo
    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable Long id, @RequestBody Veiculo veiculo) {
        return ResponseEntity.ok(veiculoService.atualizar(id, veiculo));
    }

    // Deletar veículo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        veiculoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
