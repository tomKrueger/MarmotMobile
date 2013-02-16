'use strict';

app.LocationViewModel = function() {
    var id = ko.observable(),
        name = ko.observable(),
        offers = ko.observableArray();
    
    // Behaviours.
    var load = function() {
        
        refresh();
        
        $(window).bind('orientationchange', onOrientationChanged);
    };
    
    var dispose = function() {
      
        $(window).unbind('orientationchange', onOrientationChanged);
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
                    model.imageUrl(offerDto.imageUrl);
                    model.distance(offerDto.dist);
                    
                    offers.push(model);  
                });
                
                $("#locationPage #offersSection ul").listview("refresh");
            });
        
        app.logger.traceEnd("LocationViewModel-refresh()");
    };
    
    var onOfferClick = function(offer) {
        console.log('dd');
        $.mobile.changePage("offerPage.html", { data: { id: offer.id(), name: offer.name() } });
    };
    
    return {
        load: load,
        dispose: dispose,
        id: id,
        name: name,
        offers: offers,
        onOfferClick: onOfferClick        
    };    
};