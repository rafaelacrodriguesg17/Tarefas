const express = require('express');
const app = express();

// Inicio - MySQL

    const Sequelize = require('sequelize')
    const conexao = new Sequelize('bd_tarefas', 'root', '', {

        hostname: "localhost:3306",
        dialect: "mysql"

    });

// Fim - MySQL

// Inicio - Importação do "Body-Parser"

    const BodyParser = require('body-parser');
    app.use(BodyParser.urlencoded({ extended : false }));
    app.use(BodyParser.json());

// Fim - Importação do "Body-Parser"

// Inicio - Tabela "Tarefas"

    const Tarefa = conexao.define('Tarefas', {
        tarefa: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.DATE
        },
    })

    // Tarefa.sync({ force : true }) → Criar a tabela "Tarefas".

// Fim - Tabela "Tarefas"


// Inicio - Rota "Cadastrar Tarefas"

    app.get('/', function(req, res){

        res.sendFile(__dirname + '/form.html')

    });

    // Inicio - Rota "Adicionar Tarefa"

        app.post ('/add', function(req, res){

            Tarefa.create({
                tarefa: req.body.tarefa,
                data: req.body.data,
            }).then(
                res.send("Tarefa inserida com sucesso!")
            ).catch(
                res.send("Erro ao inserir tarefa!")
            )
        });

    // Fim - Rota "Adicionar Tarefa"

// Fim - Rota "Cadastrar Tarefas"

//-----------------------------------------------------------------------

    // Inicio - Servidor

    app.listen(3000, function(){

        console.log("Servidor iniciado!")

    })

// Fim - Servidor 

//-----------------------------------------------------------------------