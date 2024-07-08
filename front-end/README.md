# Instruções para rodar o projeto

Atualizar a branch main para o ultimo commit

## Instalçao dos pacotes

Use o comando npm install para instalar as dependências do projeto.

```bash
npm install
```
O projeto rodará no 
```bash
http://127.0.0.1:5173/
```
se esta porta estiver ocupava, deve se olhar no terminal qual outra porta disponível o vite usou para rodar o projeto.

## Banco de dados

Para conseguir visualizar os dados é necessário para o banco local.

```bash
npx json-server db.json
```

existe um arquivo db.json na raiz do projeto, é daí onde ele pega os dados.