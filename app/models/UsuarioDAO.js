function UsuarioDAO(connection){
    //console.log('Carregou a função da Model!');
    this._connection = connection();
}

UsuarioDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            mongoclient.close();
        });
    });
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(err, result){
                // console.log(result);

                if(result[0] != undefined){
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.senha = result[0].senha;
                } 
                if(req.session.autorizado){
                    // res.send('Usuario, se encontra na base de dados!');
                    res.redirect('jogo');
                }
                else {
                    // res.send('Usuário não existe!');
                    res.render('index', {validacao : {}})
                }
            });
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return UsuarioDAO;
}