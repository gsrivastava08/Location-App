/**
 * Appusers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	id  		  : { type: 'string', unique: true },
  	email     	  : { type: 'email',  unique: true },
  	displayName	  : { type: 'string'},
  	gender	  	  : { type: 'string'},
  	lastLoc	 	  : { type: 'string'}
  }
};

