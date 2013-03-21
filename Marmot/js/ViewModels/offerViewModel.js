'use strict';

app.OfferViewModel = function() {
    var id = ko.observable(),
        name = ko.observable(),
        description = ko.observable(),
        locationName = ko.observable(),
        usedCount = ko.observable(),
        address = ko.observable(),
        disclaimer = ko.observable();
            
    // Behaviours.
    var load = function() {

        app.Services.Offer.get(
            id(),
            function(offerDto) {
                description(offerDto.name);
                locationName(offerDto.locationName);
                usedCount(offerDto.usedCount);
                address(offerDto.address);
                disclaimer(offerDto.disclaimer);
            });
    };
    
    var dispose = function() {
      
    };
    
    function onOrientationChanged() {
    };
    
    function onClick() {
        $.mobile.changePage("offerApplyPage.html", { data: { id: id() } });        
    };
    
    return {
        load: load,
        dispose: dispose,
        id: id,
        name: name,
        description: description,
        locationName: locationName,
        usedCount: usedCount,
        address: address,
        disclaimer: disclaimer,
        onClick: onClick        
    };    
};