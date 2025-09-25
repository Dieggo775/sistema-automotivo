package com.sistema.automotivo.controller;

import com.sistema.automotivo.model.Usuario;
import com.sistema.automotivo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") // Permite que o front-end acesse os endpoints
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // ===================== CADASTRAR USUÁRIO =====================
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.salvar(usuario);
        return ResponseEntity.ok(novoUsuario);
    }

    // ===================== LISTAR TODOS =====================
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    // ===================== BUSCAR POR EMAIL =====================
    @GetMapping("/buscar")
    public ResponseEntity<List<Usuario>> buscarPorEmail(@RequestParam String email) {
        List<Usuario> usuarios = usuarioService.buscarPorEmail(email);
        return ResponseEntity.ok(usuarios);
    }

    // ===================== BUSCAR POR ID =====================
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ===================== ATUALIZAR =====================
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario atualizado = usuarioService.atualizar(id, usuario);
        return ResponseEntity.ok(atualizado);
    }

    // ===================== DELETAR =====================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
