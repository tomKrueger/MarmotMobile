'use strict';

app.CommunityViewModel = function() {
    var name = ko.observable(),
        nearByLocations = ko.observableArray(),
        nearByOffers = ko.observableArray(),
        mapUrl = ko.observable();
    
    // Behaviours.
    var load = function() {
        refresh();
        app.geoManager.subscribeRefresh(refresh);
        
        $(window).bind('orientationchange', onOrientationChanged);
    };
    
    var dispose = function() {
      
        app.geoManager.unsubscribeRefresh(refresh);
        $(window).unbind('orientationchange', onOrientationChanged);
    };
    
    var refresh = function(position) {
        
        app.logger.traceStart("CommunityViewModel-refresh()");
        
        /*
        app.Services.Location.getNearByLocations(
            position,
            function(locationsDto) {
                nearByLocations.removeAll();
        
                locationsDto.forEach(function(locationDto) {
                   
                    var model = new app.Models.Location();
                    model.name = locationDto.name;
                    model.imageUrl = locationDto.imageUrl;
                    
                    nearByLocations.push(model);
                    
                });
                
                loadCarousel();
            });
        */
        /*app.Services.Offer.getNearByOffers(
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
        */
        
        app.Services.Map.getStaticMapUrlByZipcode(
            position,
            function(url) {
                mapUrl(url);
                
                fixHeights();
            });
        
        app.logger.traceEnd("CommunityViewModel-refresh()");
    };       
    
    var onPageBeforeShow = function () {
        app.logger.traceStart("CommunityViewModel-onPageBeforeShow()");
        app.logger.traceEnd("CommunityViewModel-onPageBeforeShow()");
    };
    
    var onPageShow = function () {
        app.logger.traceStart("CommunityViewModel-onPageShow()");
        app.logger.traceEnd("CommunityViewModel-onPageShow()");
    };
    
    function loadCarousel()
    {
        if (nearByLocations().length === 0) return;
        
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
    
    function fixHeights() {
        
        // Fire center right away just for when screen is loaded and orientation is changed.
        centerImage($("#communityPage .staticMap"));
        
        // Delay fixing heights to give the screen time to load for the first.
        // Using the time deplay is likely not the best way to handle this.  
        // We should try to find the proper event that fires.
        setTimeout(function() {
                centerImage($("#communityPage .staticMap"))
            }
            , 500);
    }
    
    function onOrientationChanged() {
        
        fixHeights();
        
        //if($.event.special.orientationchange.orientation() === 'portrait') {
        //    // Do portrait specific stuff. 
        //} else {
        //    // Do landscape specific stuff.
        //}
    };
    
    return {
        locations: nearByLocations,
        offers: nearByOffers,
        mapUrl: mapUrl,
        load: load,
        pagebeforeshow: onPageBeforeShow,
        pageshow: onPageShow,
        dispose: dispose
    };    
};