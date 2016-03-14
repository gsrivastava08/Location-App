/**
 * AppusersController
 *
 * @description :: Server-side logic for managing appusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'Master' : function(req, res){
		if(req.session.authenticated && req.user.email == 'gaurav.fgiet08@gmail.com')
		{

			res.view('masteradmin', {layout : 'adminlayout'});
		}else{

			res.redirect('/');
		}
	},

	'List' : function(req, res){
	
		if(req.session.authenticated && req.user.email == 'gaurav.fgiet08@gmail.com')
		{

			Appusers.find().exec(function(err, data){
				res.send(data);
			});
		
		}else{

			res.redirect('/');
		}	
	
	}
};

