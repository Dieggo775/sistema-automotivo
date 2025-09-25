# Sistema Automotivo

##  Sobre o Projeto
O **Sistema Automotivo** foi desenvolvido para auxiliar concessionárias e empresas na **gestão de estoque de veículos**.  
Ele permite **cadastrar, listar, editar e excluir** veículos, facilitando o controle de informações como modelo, ano, marca, preço, quilometragem e status.

Este projeto foi construído como parte de um estudo acadêmico, aplicando conceitos de **POO**, **APIs REST com Spring Boot** e **integração com front-end em HTML + JavaScript**.

---

##  Funcionalidades
- ✅ Cadastro de veículos  
- ✅ Listagem de veículos  
- ✅ Edição de informações (modelo, marca, ano, cor, preço, quilometragem, status, foto)  
- ✅ Exclusão de veículos  
- ✅ Integração front-end e back-end (REST API)  
- ✅ Testado via Postman e front-end próprio  

---

## 🛠️ Tecnologias Utilizadas
- **Java 17**  
- **Spring Boot 3**  
- **Maven**  
- **JPA / Hibernate**  
- **Banco de Dados MySQL**  
- **HTML5, CSS3, JavaScript (fetch API)**  
- **Postman (testes de API)**  

---

## Estrutura do Projeto

automotivo/
├── src/main/java/com/sistema/automotivo
│ ├── controller/ # Controllers REST
│ ├── model/ # Entidades JPA
│ ├── repository/ # Repositórios
│ ├── service/ # Lógica de negócio
│ └── AutomotivoApp.java # Classe principal
├── src/main/resources
│ └── application.properties
├── frontend/ # HTML, CSS, JS do sistema
└── README.md

##  Como Rodar o Projeto

### Back-end (Spring Boot)
1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/automotivo.git
   
2.Configure o banco MySQL no arquivo:
  src/main/resources/application.properties
exemplo:
  spring.datasource.url=jdbc:mysql://localhost:3306/automotivo
  spring.datasource.username=root
  spring.datasource.password=1234
  spring.jpa.hibernate.ddl-auto=update

3.Rode o projeto no IntelliJ ou via terminal:
  mvn spring-boot:run

Front-end

Entre na pasta frontend/

Abra o arquivo index.html no navegador

📬 Endpoints da API

GET /api/veiculos → Lista todos os veículos

POST /api/veiculos → Cadastra um veículo

PUT /api/veiculos/{id} → Atualiza um veículo

DELETE /api/veiculos/{id} → Remove um veículo

Testes com Postman

O projeto possui uma collection do Postman já pronta na pasta /postman/

Basta importar no Postman e executar os testes dos endpoints

Demonstração

Um vídeo de até 4 minutos será gravado mostrando:

Introdução ao sistema

Estrutura do código

Teste prático do CRUD no front-end e no Postman

Autor
Desenvolvido por Diego do Monte Araujo
2025
