'use strict';

app.OfferViewModel = function() {
    var id = ko.observable(),
        name = ko.observable();
    
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
        onClick: onClick        
    };    
};