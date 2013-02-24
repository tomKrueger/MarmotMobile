'use strict';

app.OfferApplyViewModel = function() {
    var id = ko.observable(),
        name = ko.observable(),
        offerApplyType = ko.observable('BarCode');
    
    // Behaviours.
    var load = function() {
        
        
    };
    
    var dispose = function() {
    };
    
    function onOrientationChanged() {
    };
    
    function onClick() {
    };
    
    return {
        load: load,
        dispose: dispose,
        id: id,
        name: name,
        offerApplyType: offerApplyType,
        onClick: onClick
        
    };    
};