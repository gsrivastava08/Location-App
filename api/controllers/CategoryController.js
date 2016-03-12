/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'List' : function(req, res){
		var category_list = [{slug : 'restaurant', name : 'Restaurant'}, 
							  {slug : 'atm', name : 'ATM'},
							  {slug : 'bakery', name : 'Bakery'},
							  {slug : 'beauty_salon', name : 'Beauty Salon'},
							  {slug : 'bar', name : 'Bar'},
							  {slug : 'hospital', name : 'Hospital'},
							  {slug : 'gym', name : 'Gym'},
							  {slug : 'meal_delivery', name : 'Meal Delivery'},
							  {slug : 'pharmacy', name : 'Pharmacy'},
							  {slug : 'shopping_mall', name : 'Shopping Mall'},
							  {slug : 'bus_station', name : 'Bus Station'},
							  {slug : 'cafe', name : 'Cafe'},
							  {slug : 'florist', name : 'Florist'},
							  {slug : 'home_goods_store', name : 'Home Goods Store'},];

	  res.send({content : category_list});
	}
	
};

