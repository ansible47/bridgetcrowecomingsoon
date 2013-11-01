
/*
 * GET functions
 */

var fs = require('fs');



var defaultScripts = ['/javascripts/jquery-ui-1.8.23.custom.min.js' ];
var projectScripts = ['/javascripts/jquery-ui-1.8.23.custom.min.js' ];



exports.index = function (req, res) {
	res.render('index', {
		title: 'Bridget Crowe',
		scripts:  defaultScripts
	});
};

exports.home = function (req, res) {
	res.render('home', {
		title: 'Bridget Crowe - Home',
		scripts:  defaultScripts
	});
};

exports.contact = function (req, res) {
	res.render('contact', {
		title: 'Bridget Crowe - Contact',
		scripts:  defaultScripts
	});
};

exports.shop = function (req, res) {
	res.render('shop', {
		title: 'Bridget Crowe - Shop',
		scripts:  defaultScripts
	});
};



exports.instillation = function (req, res) {
	fs.readdir('public/images/gallery/jessicamazza', function(err, data){
		res.render('projects/projectgallery.jade', {
			pageData: {
				files	: appendArray('/images/gallery/jessicamazza/', data),
				link: 'jessicamazza',
				page : 0,
				pagelen: 8,
			},
			title: "Bridget Crowe Instillation Gallery",
			scripts:  projectScripts
		});
	});
};

exports.projects = exports.instillation;

exports.inspiration = function (req, res) {
	fs.readdir('public/images/gallery/cauleensmith', function(err, data){
		res.render('projects/projectgallery.jade', {
			pageData: {
				files	: appendArray('/images/gallery/cauleensmith/', data),
				link: 'cauleensmith',
				page : 1,
				pagelen: 6,
			},
			title: "Bridget Crowe Inspiration Gallery",
			scripts:  projectScripts
		});
	});
};

exports.process = function (req, res) {
	fs.readdir('public/images/gallery/alexandraastor', function(err, data){
		res.render('projects/projectgallery.jade', {
			pageData: {
				files	: appendArray('/images/gallery/alexandraastor/', data),
				link: 'alexandraastor',
				page : 1,
				pagelen: 6,
			},
			title: "Bridget Crowe Process Gallery",
			scripts:  projectScripts
		});
	});
};

exports.admin_shop = function (req, res) {
	res.render('admin/adminshop.jade', {
		title: 'Admin - Bridget Crowe - Shop',
		test: "test sql",
		simpletext: testAnyDB()
	});
};





/////////////////////////////////////////////////////////////////////////////////

function testAnyDB(){

		var conn = anyDB.createConnection(dbURL) 
		
		var query = conn.query('SELECT * FROM users');
	
		query.on('error',  function(err) {console.log(err+"error!")})
		query.on('row', function(row) {console.log(row)})
		query.on('end', function () { console.log('All done!') });
	
		conn.end();
		
}

function testsql(){

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			var test = client.query('SELECT * from users', function(err, result) {
						if(err) {
							return console.error('error running query', err);
						}
						else{
						//output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
						client.end();
						console.log(result.rows)
		
					}
			});
			return test;
			
		});		
}

function getText(){

		dbWrapper = new DBWrapper( 'pg', dbConnectionConfig );
		dbWrapper.connect();
		console.log("dbWrapper connected");

			// ** fetchAll
		
		dbWrapper.fetchAll('SELECT * FROM users', function(err, result) {
				if( ! result ){
						console.log(result);
					console.log("Good db read");
				}
				else{
					console.log("Error, bad db request!");
					
				}
				// "result" is an Array with a hash for every returned row
		} );

		return "this is the function getText"
}

function testdb(input){
		return input;
		console.log("testdb triggered");
		dbWrapper = new DBWrapper( 'pg', dbConnectionConfig );
		dbWrapper.connect();
	
 		if (!dbWrapper.isConnected()){
				console.log("error, database not connected!")
			
		}
		
		dbWrapper.fetchOne('SELECT fist_name FROM user ORDER BY rank DESC LIMIT 1', [], function(err, result) {
				if( ! err )
						console.log(result);
				// "result" is the first_name of our best user
		} );

	
		// When you have finished working with the database, you can close the connection
		
		dbWrapper.close( function(err) {console.log('Connection closed !');} );
	
	 		if (dbWrapper.isConnected()){
				console.log("error, database still connected!")
			
		}
		
	return "Hello!"
	
}




function appendArray(path, input){
	var str = input.toString();
	var tempArray = str.split(",");
	for ( var i = 0; i < tempArray.length; i++ ) {
			tempArray[i] = path + tempArray[i];
	}
	str = tempArray.join(",");
	return str
}

		
