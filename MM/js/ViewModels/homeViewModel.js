'use strict';

app.HomeViewModel = function() {
    var nearByCommunities = ko.observableArray(),
        nearByOffers = ko.observableArray(),
        mapUrl = ko.observable();
    
    // Behaviours.
    var load = function() {
        app.geoManager.subscribeRefresh(refresh);
        app.geoManager.refresh();
        app.geoManager.startAutoRefresh(2 * 60 * 1000);
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
                
                loadCarousel();
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
    
    function loadCarousel()
    {
        if (nearByCommunities().length === 0) return;
        
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
    };
    
    return {
        communities: nearByCommunities,
        offers: nearByOffers,
        mapUrl: mapUrl,
        load: load  
    };    
};