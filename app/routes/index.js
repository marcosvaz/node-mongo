module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index.index(application, req, res);
	});

	application.post('/autenticar', function(req, res){
		// res.send('AEEE entramos!');
		application.app.controllers.index.autenticar(application, req, res);
	});
}