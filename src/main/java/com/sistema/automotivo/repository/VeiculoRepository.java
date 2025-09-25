package com.sistema.automotivo.repository;

import com.sistema.automotivo.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    List<Veiculo> findByMarca(String marca);

    List<Veiculo> findByAno(int ano);

    List<Veiculo> findByStatus(String status);

    // Filtros combinados com JPQL
    @Query("SELECT v FROM Veiculo v WHERE " +
            "(:marca IS NULL OR v.marca = :marca) AND " +
            "(:anoMin IS NULL OR v.ano >= :anoMin) AND " +
            "(:anoMax IS NULL OR v.ano <= :anoMax) AND " +
            "(:precoMin IS NULL OR v.preco >= :precoMin) AND " +
            "(:precoMax IS NULL OR v.preco <= :precoMax) AND " +
            "(:status IS NULL OR v.status = :status)")
    List<Veiculo> filtrarVeiculos(
            @Param("marca") String marca,
            @Param("anoMin") Integer anoMin,
            @Param("anoMax") Integer anoMax,
            @Param("precoMin") Double precoMin,
            @Param("precoMax") Double precoMax,
            @Param("status") String status
    );
}
