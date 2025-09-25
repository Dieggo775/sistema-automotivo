package com.sistema.automotivo.controller;

import com.sistema.automotivo.model.Veiculo;
import com.sistema.automotivo.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/veiculos")
@CrossOrigin(origins = "*") // 🔥 Libera acesso para qualquer origem (front)
public class VeiculoController {

    @Autowired
    private VeiculoRepository veiculoRepository;

    // Listar todos os veículos
    @GetMapping
    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }

    // Buscar veículo por ID
    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable Long id) {
        Optional<Veiculo> veiculo = veiculoRepository.findById(id);
        return veiculo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar veículo
    @PostMapping
    public ResponseEntity<Veiculo> criar(@RequestBody Veiculo veiculo) {
        Veiculo novoVeiculo = veiculoRepository.save(veiculo);
        return ResponseEntity.ok(novoVeiculo);
    }

    // Atualizar veículo
    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable Long id, @RequestBody Veiculo veiculoAtualizado) {
        Optional<Veiculo> veiculoOpt = veiculoRepository.findById(id);
        if (veiculoOpt.isPresent()) {
            Veiculo veiculo = veiculoOpt.get();
            // Atualiza apenas os campos que vieram no corpo da requisição
            if (veiculoAtualizado.getModelo() != null) veiculo.setModelo(veiculoAtualizado.getModelo());
            if (veiculoAtualizado.getMarca() != null) veiculo.setMarca(veiculoAtualizado.getMarca());
            if (veiculoAtualizado.getAno() != 0) veiculo.setAno(veiculoAtualizado.getAno());
            if (veiculoAtualizado.getCor() != null) veiculo.setCor(veiculoAtualizado.getCor());
            if (veiculoAtualizado.getPreco() != 0) veiculo.setPreco(veiculoAtualizado.getPreco());
            if (veiculoAtualizado.getQuilometragem() != 0) veiculo.setQuilometragem(veiculoAtualizado.getQuilometragem());
            if (veiculoAtualizado.getStatus() != null) veiculo.setStatus(veiculoAtualizado.getStatus());
            if (veiculoAtualizado.getFotoUrl() != null) veiculo.setFotoUrl(veiculoAtualizado.getFotoUrl());

            Veiculo atualizado = veiculoRepository.save(veiculo);
            return ResponseEntity.ok(atualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar veículo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Optional<Veiculo> veiculoOpt = veiculoRepository.findById(id);
        if (veiculoOpt.isPresent()) {
            veiculoRepository.delete(veiculoOpt.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
