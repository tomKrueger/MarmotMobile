'use strict';

app.HomeViewModel = function() {
    var nearByCommunities = ko.observableArray(),
        nearByOffers = ko.observableArray(),
        mapUrl = ko.observable(),
        communitiesLoaded;
    
    // Computed property used to sort communities.
    var nearByCommunitiesSorted = ko.computed(function() {       
        
        app.logger.traceStart("HomeViewModel-nearByCommunitiesSorted()");
        
        if (nearByCommunities().length == 0) return []; 
        
        nearByCommunities().sort(sortFunction);
        
        app.logger.traceEnd("HomeViewModel-nearByCommunitiesSorted()");
        
        return nearByCommunities();
        
    }); // Removed throttle for now because we need the value calculated so that the map can use it.  There is talk about this issue at https://github.com/SteveSanderson/knockout/pull/582.  A solution may be coming to be able to ignore the throttle on a read. .extend({ throttle: 100 }); // Throttle so sort doesn't happen for every change to distance on each community.
    
    var sortFunction = function(a, b) {
        return a.distance() < b.distance() ? -1 : 1;
    };
    
    // Behaviours.
    var load = function() {
                
        app.geoManager.subscribeRefresh(refresh, onGeoError);
        app.geoManager.refresh();
        
        $(window).bind('orientationchange', onOrientationChanged);
    };
    
    var dispose = function() {
      
        app.geoManager.unsubscribeRefresh(refresh);
        $(window).unbind('orientationchange', onOrientationChanged);
    };
    
    var refresh = function(position) {
        app.logger.traceStart("HomeViewModel-refresh()");
        
        communitiesLoaded = $.Deferred();
        
        app.Services.Community.getNearByCommunities(
            position,
            function(communitiesDto) {
        
                var tmpArray = [];
                
                communitiesDto.forEach(function(communityDto) {
                    
                    var model = new app.Models.Community();
                    model.id(communityDto.id);
                    model.name(communityDto.name);
                    model.imageUrl(communityDto.imageUrl);
                    model.geoPosition(communityDto.geoPosition);
                    
                    tmpArray.push(model);
                    
                });
                
                // Remove all existing and push the new.
                nearByCommunities.pushAll(tmpArray, true);
                communitiesLoaded.resolve();
                
                loadCarousel();
            });
        
        app.Services.Offer.getNearByOffers(
            position,
            function(offersDto) {
                
                var tmpArray = [];
                
                offersDto.forEach(function(offerDto) {
                                    
                    var model = new app.Models.Offer();
                    model.id(offerDto.id);
                    model.name(offerDto.name);
                    model.imageUrl(offerDto.imageUrl);
                    model.locationGeoPosition(offerDto.geoPosition);
                    
                    tmpArray.push(model);  
                });
                
                // Remove all existing and push the new.
                nearByOffers.pushAll(tmpArray, true);
                
                $("#homePage .offersSection ul").listview("refresh");
            });
        
        $.when(communitiesLoaded).then(function () {
            
            app.Services.Map.getStaticMapUrlByZipcode(
                nearByCommunitiesSorted()[0].geoPosition(),
                position,
                nearByCommunitiesSorted(),
                null,            
                function(url) {
                    mapUrl(url);
                    
                    fixHeights();
                }); 
        });
        
        app.logger.traceEnd("HomeViewModel-refresh()");
    };       
    
    var onGeoError = function(error) {
        
        // Force refresh using current position.  So that if geo is off,
        // the screen will still load.
        refresh(app.geoManager.getCurrentPosition());
        
        switch(error.code) {
            case PositionError.PERMISSION_DENIED:
                showAlert("Please enable location services to view what's happening nearby.", "GPS");
                break;
            case PositionError.POSITION_UNAVAILABLE:
            case PositionError.TIMEOUT:
                showAlert("Your device was unable to retrieve your GPS location at this time.", "GPS");
                break;
        }
    }
    var onPageBeforeShow = function () {
        app.logger.traceStart("HomeViewModel-onPageBeforeShow()");
        app.logger.traceEnd("HomeViewModel-onPageBeforeShow()");
    };
    
    var onPageShow = function () {
        app.logger.traceStart("HomeViewModel-onPageShow()");
        app.logger.traceEnd("HomeViewModel-onPageShow()");
    };
    
    function loadCarousel()
    {
        // We are using setTimeout so that nearByCommunitiesSorted has time to compute before attempting to load carousel.
        // TODO: make this more robust.  Should not depend on time.
        // Note: we likely will want to use setTimeout in anycase so that load carousel does not block the UI thread from loading.
        // Ultimately we may want the timeout to be zero to simulate async.  Need to test it though.
        setTimeout(function() {
        
            if (nearByCommunitiesSorted().length === 0) return;
            
            $("#communitiesCarousel").touchCarousel({					
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
        }
        , 1000);
        
    };
    
    function fixHeights() {
        
        // Fire center right away just for when screen is loaded and orientation is changed.
        centerImage($("#mapId"));
        
        // Delay fixing heights for 1000ms to give the screen time to load for the first.
        // Using the time deplay is likely not the best way to handle this.  
        // We should try to find the proper event that fires.
        setTimeout(function() {
                centerImage($("#mapId"))
            }
            , 1000);
    }
    
    function onOrientationChanged() {
        
        fixHeights();
        
        //if($.event.special.orientationchange.orientation() === 'portrait') {
        //    // Do portrait specific stuff. 
        //} else {
        //    // Do landscape specific stuff.
        //}
    };
    
    var isMenuClosed = true; 
    
    var onMenuClick = function() {
        
        if(isMenuClosed === true) {
            $("#menu").show();
            
            $(".ui-page-active").animate(
                { marginLeft: "165px" }, 
                300, 
                function() {
                    isMenuClosed = false 
                });
            
        } else {
            
            $(".ui-page-active").animate(
                { marginLeft: "0px"}, 
                300, 
                function() {
                    isMenuClosed = true;
                    $("#menu").hide();
                });
        }
        
        return false;
    };
    
    var onCommunityClick = function(community) {
        navigateToCommunityPage(community.id(), community.name());
    };
    
    var onOfferClick = function(offer) {
        var onOfferDoneNav = function() { navigateToHome(); };
        navigateToOfferPage(offer.id(), offer.name(), onOfferDoneNav);
    };
    
    return {
        communities: nearByCommunitiesSorted,
        offers: nearByOffers,
        mapUrl: mapUrl,
        load: load,
        pagebeforeshow: onPageBeforeShow,
        pageshow: onPageShow,
        dispose: dispose,
        onCommunityClick: onCommunityClick,
        onOfferClick: onOfferClick,
        onMenuClick: onMenuClick
    };    
};