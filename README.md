### Next Pizza App

<p>Fiz este projeto com a ajuda de um tutorial, porém, adicionei alguns conhecimentos que aprendi em cursos posteriores em react, tais como editar o produto dinamicamente e também paginação de resultados, além de adicionar loadings e fazer algumas otimizações no código e na estrutura. Aprendi também a me conectar com um serviço do mongo na nuvem, o MongoDB Atlas, vi também um pouco do Redux toolkit. Aprendi a usar o getServerSideProps, onde posso retornar dados que vão ser recebidos direto no componente através das próprias props.</p>

<img src="https://github.com/d8web/Pizza-System-Next-JS/blob/master/public/img/pizza.gif"/>

### Features

- [x] Lista de pizzas
- [x] Página da pizza dinâmica
- [x] Sistema de Login
- [x] Adicionar ao carrinho
- [x] Sistema adminstrativo
- [x] Adicionar/editar/excluir novas pizzas

### Pré requisitos
Antes de iniciar você precisa ter o [Node](https://nodejs.org/en/) instalado na sua máquina. É bom também ter um editor de código como [VSCode](https://code.visualstudio.com/).

```bash
    # Clone o repositório
    $ git clone <https://github.com/d8web/Pizza-System-Next-JS/>

    # Acesse a pasta do projeto que acabou de clonar
    $ cd Pizza-System-Next-JS

    # Instale as dependências
    $ npm install ou yarn

    # Executar o projeto
    $ npm run dev ou yarn dev

    # O servidor vai iniciar no endereço http://localhost:3000
```

### Configurações do projeto

Para o projeto rodar você precisa configurar sua url de conexão com o serviço de banco de dados na nuvem, o MongoDB Atlas, configurar um usuário uma senha e um token para o sistema administrativo.

<ul style="list-style: none">
    <li>MONGODB_URI=Sua url do MongoDB Atlas aqui</li>
    <li>ADMIN_USERNAME=Nome do seu usuário admnistrativo</li>
    <li>ADMIN_PASSWORD=Sua senha, recomendamos usar senhas fortes</li>
    <li>TOKEN=Gere uma sequencia de caractéres misturados</li>
</ul>

### Tecnologias

Neste projeto foram usadas as seguintes tecnologias

- [Next JS](https://nextjs.org/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [MongoDB](https://www.mongodb.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

<hr/>
Criado com dedicação por [Daniel](https://github.com/d8web/).
