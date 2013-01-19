var app = app || {};
var models = models || {};

(function() {
	'use strict';

    // our main view model
	app.HomeViewModel = function() {
		var self = this;
        
        self.nearByCommunities = ko.observableArray();
        
        // Behaviours.
        self.load = function() {
            
            var s = new app.Services.Community();
            
            var communities = s.getNearByCommunities();
            
            //self.nearByCommunities.clear();
            self.nearByCommunities.push(new app.Models.Community());
        };       
        
        
        self.load();
        
    };
    
}());