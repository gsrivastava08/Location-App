/**
 * PlacesController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
module.exports = {
	List : function(req, res){
		var data = new Buffer((req.param('place')), 'base64');
		data = JSON.parse(data);
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
	}
};

