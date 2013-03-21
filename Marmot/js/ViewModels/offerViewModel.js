'use strict';

app.OfferViewModel = function() {
    var id = ko.observable(),
        name = ko.observable(),
        description = ko.observable("10% Off Your Entire Meal1"),
        locationName = ko.observable("Water Street Brewery1"),
        usedCount = ko.observable(10),
        address = ko.observable("111 Main St.<br />Delafield, WI1"),
        disclaimer = ko.observable("Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders1.");
            
    // Behaviours.
    var load = function() {

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