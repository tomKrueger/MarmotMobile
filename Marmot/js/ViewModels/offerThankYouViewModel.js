'use strict';

app.OfferThankYouViewModel = function() {
    
    // Behaviours.
    var load = function() {        
    };
    
    var dispose = function() {
    };
    
    function onOrientationChanged() {
    };
    
    function onClick() {
        navigateToOnOfferDonePage();
    };
    
    return {
        load: load,
        dispose: dispose,
        onClick: onClick        
    };    
};