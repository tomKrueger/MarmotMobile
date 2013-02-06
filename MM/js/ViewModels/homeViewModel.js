'use strict';

var app = app || {};


app.HomeViewModel = function() {
    var nearByCommunities = ko.observableArray(),
        nearByOffers = ko.observableArray(),
        mapUrl = ko.observable();
    
    // Behaviours.
    var load = function(zipCode) {
        
        app.Services.Community.getNearByCommunities(
            zipCode,
            function(communitiesDto) {
                nearByCommunities.removeAll();
        
                communitiesDto.forEach(function(communityDto) {
                   
                    var model = new app.Models.Community();
                    model.name = communityDto.name;
                    model.imageUrl = communityDto.imageUrl;
                    
                    nearByCommunities.push(model); 
                    
                });           
            });
        
        app.Services.Offer.getNearByOffers(
            zipCode,
            function(offersDto) {
                nearByOffers.removeAll();
        
                offersDto.forEach(function(offerDto) {
                                    
                    var model = new app.Models.Offer();
                    model.name = offerDto.name;
                    model.imageUrl = offerDto.imageUrl;
                    model.distance = offerDto.dist;
                    
                    nearByOffers.push(model);  
                });
                
                $("#offersSection ul").listview("refresh");
            });
        
        app.Services.Map.getStaticMapUrlByZipcode(
            zipCode,
            function(url) {
                mapUrl(url);
            });
    };       
    
    return {
        communities: nearByCommunities,
        offers: nearByOffers,
        mapUrl: mapUrl,
        load: load  
    };    
};