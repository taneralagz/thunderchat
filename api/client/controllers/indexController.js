module.exports = function(app){

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/contact', function(req, res){
        res.render('contact');
    });

    app.get('/about', function(req, res){
        res.render('about');
    });
}