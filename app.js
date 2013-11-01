
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var stylus = require('stylus');
var fluidity = require('fluidity');


var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', routes.index);

app.get('/home', routes.home);

app.get('/contact', routes.contact);

app.get('/shop', routes.shop);

app.get('/projects', routes.projects);

app.get('/projects/instillation', routes.instillation);

app.get('/projects/inspiration', routes.inspiration);

app.get('/projects/process', routes.process);

app.get('/admin/shop', routes.admin_shop);

/*
app.get('/projects/jessicamazza/2', function(req, res){
	fs.readdir('public/images/gallery/jessicamazza', function(err, data){
		res.render('projects/projectgallery.jade', {
			pageData: {
				title: 'Jessica Mazza',
				files	: appendArray('/images/gallery/jessicamazza/', data),
				link: 'jessicamazza',
				page : 1,
				pagelen: 6,
			}
		});
	});
});*/


app.use(function(req, res, next) {
  if (req.path.split('/')[0] === "downloads")
    res.attachment(); //short for res.set('Content-Disposition', 'attachment')
  next();
});

app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

 
app.configure(function () {
  // ... your middleware here
  app.use(stylus.middleware({
    src: __dirname + '/views', // .styl files are located in `views/stylesheets`
    dest: __dirname + '/public', // .styl resources are compiled `/stylesheets/*.css`
    compile: function (str, path) { // optional, but recommended
      stylus(str)
      .set('filename', path)
      .set('compress', true)
			.use(fluidity());
    }
  }));
  app.use(express.static(__dirname + '/public'));
});



var print = function(o){
    var str='';

    for(var p in o){
        if(typeof o[p] == 'string'){
            str+= p + ': ' + o[p]+'; </br>';
        }else{
            str+= p + ': { </br>' + print(o[p]) + '}';
        }
    }

    return str;
}
