'use strict';

app.HomeViewModel = function() {
    var nearByCommunities = ko.observableArray(),
        nearByOffers = ko.observableArray(),
        mapUrl = ko.observable();
    
    // Behaviours.
    var load = function() {
           
        // TODO: Remove this refresh as the geoManager will do it.
        // It is only here until we figure out how to get touchCarousel to be wired up without any items.
        // It likely could get put into the refresh but that is tightly coupling to the UI so don't really want to do that.
        refresh();
        
        $("#carousel-image-and-text").touchCarousel({					
            pagingNav: false,
            scrollbarAutoHide: true,
            snapToItems: false,
            itemsPerMove: 2,				
            scrollToLast: true,
            loopItems: false,
            scrollbar: false,
            useWebkit3d: true,
            directionNav:true,            // Direction (arrow) navigation (true or false).
            directionNavAutoHide:false,   // Direction (arrow) navigation auto hide on hover. 
            dragUsingMouse:true
        });
        
        app.geoManager.subscribeRefresh(refresh);  
        app.geoManager.refresh();
    };
    
    var refresh = function(position) {
        
        app.logger.traceStart("HomeViewModel-refresh()");
        
        app.Services.Community.getNearByCommunities(
            position,
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
            position,
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
            position,
            function(url) {
                mapUrl(url);
            });
        
        app.logger.traceEnd("HomeViewModel-refresh()");
    };       
    
    return {
        communities: nearByCommunities,
        offers: nearByOffers,
        mapUrl: mapUrl,
        load: load  
    };    
};