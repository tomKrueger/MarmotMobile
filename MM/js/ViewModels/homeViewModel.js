'use strict';

app.HomeViewModel = function() {
    var nearByCommunities = ko.observableArray(),
        nearByOffers = ko.observableArray(),
        mapUrl = ko.observable();
    
    // Behaviours.
    var load = function() {
                
        app.geoManager.subscribeRefresh(refresh, onGeoError);
        app.geoManager.refresh();
        app.geoManager.startAutoRefresh(2 * 60 * 1000); // TODO: This is not the right spot for this.
        
        $(window).bind('orientationchange', onOrientationChanged);
    };
    
    var dispose = function() {
      
        app.geoManager.unsubscribeRefresh(refresh);
        $(window).unbind('orientationchange', onOrientationChanged);
    };
    
    var refresh = function(position) {
        
        app.logger.traceStart("HomeViewModel-refresh()");
        
        app.Services.Community.getNearByCommunities(
            position,
            function(communitiesDto) {
                nearByCommunities.removeAll();
        
                communitiesDto.forEach(function(communityDto) {
                   
                    var model = new app.Models.Community();
                    model.id(communityDto.id);
                    model.name(communityDto.name);
                    model.imageUrl(communityDto.imageUrl);
                    
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
                    model.id(offerDto.id);
                    model.name(offerDto.name);
                    model.imageUrl(offerDto.imageUrl);
                    model.distance(offerDto.dist);
                    
                    nearByOffers.push(model);  
                });
                
                $("#homePage .offersSection ul").listview("refresh");
            });
        
        app.Services.Map.getStaticMapUrlByZipcode(
            position,
            function(url) {
                mapUrl(url);
                
                fixHeights();
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
        if (nearByCommunities().length === 0) return;
        
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
        communities: nearByCommunities,
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