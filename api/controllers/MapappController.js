/**
 * MapappController
 *
 * @description :: Server-side logic for managing mapapps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'Render' : function(req, res){
		if(req.session.authenticated)
		{
			res.view('homepage');
		}else{
			res.redirect('/');
		}
	}
};

