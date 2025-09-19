# Sistema Automotivo

CRUD completo para gerenciamento de veículos, desenvolvido em **Spring Boot** (backend) e **HTML/CSS/JS** (frontend).

## ⚙️ Tecnologias
- Java 17 + Spring Boot 3
- Spring Data JPA + MySQL/H2
- HTML, CSS, JavaScript (Fetch API)
- Lombok

## Funcionalidades
- Cadastro, listagem, edição e exclusão de veículos
- Tela de login simples
- Integração front-back via API REST

## Endpoints
- `GET /veiculos` → lista veículos
- `POST /veiculos` → cadastra veículo
- `PUT /veiculos/{id}` → atualiza veículo
- `DELETE /veiculos/{id}` → exclui veículo

## ▶Como rodar
```bash
# Backend
cd automotivo
mvn spring-boot:run

# Acesse em:
http://localhost:8080

## 🧪 Testes com Postman
A collection do Postman está disponível em:
[postman/Sistema_Automotivo.postman_collection.json](postman/Sistema_Automotivo.postman_collection.json)

