/**
 * PlacesController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
module.exports = {
	List : function(req, res){
		
		if(req.session.authenticated)
		{
			var data = new Buffer((req.param('place')), 'base64');
			data = JSON.parse(data);

			Appusers.find({id:req.user.username}).exec(function (err, qresult){
			if(err) {
			    return res.negotiate(err);
			  }

			  if(qresult.length == 0){
			  	var userData = {};
			  	userData.id = req.user.username;
			  	userData.email = req.user.email;
			  	userData.lastLoc = data.latitude+':'+data.longitude;
			  	userData.displayName = req.user.displayName;
			  	userData.gender = req.user.gender;
			  	Appusers.create(userData).exec(function createCB(err, created){
				 // console.log('New user created with name ' + created.displayName);
				});
			  }else{
			  	Appusers.update({id:req.user.username},{lastLoc:data.latitude+':'+data.longitude}).exec(function afterwards(err, updated){});
			  }
			});

			request.get({
			        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+data.latitude+','+data.longitude+'&radius=1000&type='+data.type+'&key=AIzaSyB7DSEcRRSS9xomKmyuG4Ubgz-qd2yhUpw'
			    }, function(error, response, body) {
			        if (error) {
			            sails.log.error(error);
			        	res.send({error : 'something went wrong'});
			        }
			        else {
			            res.send(body);
			        }
			    });

		}else{
			res.send({error: 'Not authenticated.'});
		}
	}
};

