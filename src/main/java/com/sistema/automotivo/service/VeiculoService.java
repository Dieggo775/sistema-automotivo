package com.sistema.automotivo.service;

import com.sistema.automotivo.model.Veiculo;
import com.sistema.automotivo.repository.VeiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Veiculo salvar(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }

    public Optional<Veiculo> buscarPorId(Long id) {
        return veiculoRepository.findById(id);
    }

    public Veiculo atualizar(Long id, Veiculo novoVeiculo) {
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Veículo com ID " + id + " não encontrado."));

        veiculo.setModelo(novoVeiculo.getModelo());
        veiculo.setMarca(novoVeiculo.getMarca());
        veiculo.setAno(novoVeiculo.getAno());
        veiculo.setCor(novoVeiculo.getCor());
        veiculo.setPreco(novoVeiculo.getPreco());
        veiculo.setQuilometragem(novoVeiculo.getQuilometragem());
        veiculo.setStatus(novoVeiculo.getStatus());
        veiculo.setFotoUrl(novoVeiculo.getFotoUrl());

        return veiculoRepository.save(veiculo);
    }

    public void deletar(Long id) {
        if (!veiculoRepository.existsById(id)) {
            throw new EntityNotFoundException("Veículo com ID " + id + " não encontrado para exclusão.");
        }
        veiculoRepository.deleteById(id);
    }
}
