
var app = app || {};

//(function() {
	'use strict';

    // our main view model
	app.HomeViewModel = function() {
		var nearByCommunities = ko.observableArray(),
            nearByOffers = ko.observableArray();
        
        // Behaviours.
        var load = function(zipCode) {
            
            app.Services.Community.getNearByCommunities(
                zipCode,
                function(communitiesDto) {
                    nearByCommunities.removeAll();
            
                    for(var i = 0; i < communitiesDto.length; i++) {
                      var communityDto = communitiesDto[i];
                    
                        var model = new app.Models.Community();
                        model.name = communityDto.name;
                        model.imageUrl = communityDto.imageUrl;
                        
                        nearByCommunities.push(model);  
                    }            
                });
            
            app.Services.Offer.getNearByOffers(
                zipCode,
                function(offersDto) {
                    nearByOffers.removeAll();
            
                    for(var i = 0; i < offersDto.length; i++) {
                      var offerDto = offersDto[i];
                    
                        var model = new app.Models.Offer();
                        model.name = offerDto.name;
                        model.imageUrl = offerDto.imageUrl;
                        model.distance = offerDto.dist;
                        
                        nearByOffers.push(model);  
                    }
                    
                    $("#offersSection ul").listview("refresh");
                });
        };       
        
        return {
            communities: nearByCommunities,
            offers: nearByOffers,
            load: load  
        };
    };
    
//}());