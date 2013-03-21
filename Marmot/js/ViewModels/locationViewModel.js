'use strict';

app.LocationViewModel = function() {
    var id = ko.observable(),
        name = ko.observable(),
        imageUrl = ko.observable(),
        offers = ko.observableArray();
    
    // Behaviours.
    var load = function() {
        
        imageUrl('https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_3-07.png');
        refresh();
        
    };
    
    var dispose = function() {
    };
    
    function onOrientationChanged() {
    };
    
    var refresh = function(position) {
        
        app.logger.traceStart("LocationViewModel-refresh()");
        
        app.Services.Offer.getByLocationId (
            id(),
            function(offersDto) {
                offers.removeAll();

                offersDto.forEach(function(offerDto) {
                                    
                    var model = new app.Models.Offer();
                    model.id(offerDto.id);
                    model.name(offerDto.name);
                    model.locationName(offerDto.locationName);
                    model.imageUrl(offerDto.imageUrl);
                    model.locationGeoPosition(offerDto.geoPosition);
                    
                    offers.push(model);  
                });
                
                $("#locationPage .offersSection ul").listview("refresh");
            });
        
        app.logger.traceEnd("LocationViewModel-refresh()");
    };
        
    var onOfferClick = function(offer) {
        var onOfferDoneNav = function() { navigateToHome(); };
        navigateToOfferPage(offer.id(), offer.name(), onOfferDoneNav);
    };
    
    return {
        load: load,
        dispose: dispose,
        id: id,
        name: name,
        imageUrl: imageUrl,
        offers: offers,
        orientationChanged: onOrientationChanged,
        onOfferClick: onOfferClick        
    };    
};