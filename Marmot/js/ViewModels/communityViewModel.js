'use strict';

app.CommunityViewModel = function() {
    var id = ko.observable(),
        name = ko.observable(),
        locations = ko.observableArray(),
        nearByOffers = ko.observableArray(),
        mapUrl = ko.observable(),
        community = ko.observable(),
        communitiesLoaded,
        locationsLoaded;
    
    // Behaviours.
    var load = function() {

        app.geoManager.subscribeRefresh(refresh);
        app.geoManager.refresh();
        
        $(window).bind('orientationchange', onOrientationChanged);
    };
    
    var dispose = function() {
      
        app.geoManager.unsubscribeRefresh(refresh);
        $(window).unbind('orientationchange', onOrientationChanged);
    };
    
    var refresh = function(position) {
        
        app.logger.traceStart("CommunityViewModel-refresh()");
        communitiesLoaded = $.Deferred();
        locationsLoaded = $.Deferred();
        
        app.Services.Community.get(
            id(),
            function(communityDto) {
                
                var model = new app.Models.Community();
                model.id(communityDto.id);
                model.name(communityDto.name);
                model.imageUrl(communityDto.imageUrl);
                model.geoPosition(communityDto.geoPosition);
                
                community(model);
                communitiesLoaded.resolve();
            });
        
        app.Services.Location.getByCommunityId(
            id(),
            function(locationsDto) {
                
                var tmpArray = [];
        
                locationsDto.forEach(function(locationDto) {
                   
                    var model = new app.Models.Location();
                    model.id(locationDto.id);
                    model.name(locationDto.name);
                    model.imageUrl(locationDto.imageUrl);
                    model.geoPosition(locationDto.geoPosition);
                    
                    tmpArray.push(model);
                    
                });
                
                // Remove all existing and push the new.
                locations.pushAll(tmpArray, true);
                locationsLoaded.resolve();    
                
                loadCarousel();
            });
        
        app.Services.Offer.getByCommunityId (
            id(),
            function(offersDto) {
                nearByOffers.removeAll();
        
                offersDto.forEach(function(offerDto) {
                                    
                    var model = new app.Models.Offer();
                    model.id(offerDto.id);
                    model.name(offerDto.name);
                    model.imageUrl(offerDto.imageUrl);
                    model.locationGeoPosition(offerDto.geoPosition);
                    
                    nearByOffers.push(model);  
                });
                
                $("#communityPage .offersSection ul").listview("refresh");
            });
        
        $.when(communitiesLoaded, locationsLoaded).then(function () {            
            app.Services.Map.getStaticMapUrlByZipcode(
                community().geoPosition(),
                position,
                null,
                locations(),            
                function(url) {
                    mapUrl(url);
                    
                    fixHeights();
                });            
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
        if (locations().length === 0) return;
        
        $("#locationsCarousel").touchCarousel({					
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
        
        if ($("#communityPage .staticMap").left > 20) {
            debugger;
        }
        
    }
    
    function onOrientationChanged() {
        
        fixHeights();
        
        //if($.event.special.orientationchange.orientation() === 'portrait') {
        //    // Do portrait specific stuff. 
        //} else {
        //    // Do landscape specific stuff.
        //}
    };
    
    var onLocationClick = function(location) {
        $.mobile.changePage("locationPage.html", { data: { id: location.id(), name: location.name() } });
    };
    
    var onOfferClick = function(offer) {
        var onOfferDoneNav = function() { navigateToCommunityPage(id(), name()); };
        navigateToOfferPage(offer.id(), offer.name(), onOfferDoneNav);
    };
    
    return {
        locations: locations,
        offers: nearByOffers,
        id: id,
        name: name,
        mapUrl: mapUrl,
        load: load,
        pagebeforeshow: onPageBeforeShow,
        pageshow: onPageShow,
        dispose: dispose,
        onLocationClick: onLocationClick,
        onOfferClick: onOfferClick
    };    
};