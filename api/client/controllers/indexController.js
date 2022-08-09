module.exports = function(app){
    try {
        app.get('/', function(req, res){
            res.render('index');
        });
    
        app.get('/contact', function(req, res){
            res.render('contact');
        });
    
        app.get('/about', function(req, res){
            res.render('about');
        });
    } catch (error) {
        console.log("Something crashed."+ error.log)
    }
    
}