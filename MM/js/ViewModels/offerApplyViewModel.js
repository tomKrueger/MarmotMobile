'use strict';

app.OfferApplyViewModel = function() {
    var id = ko.observable(),
        name = ko.observable(),
        offerApplyType = ko.observable(),
        offer = new app.Models.Offer();
    
    // Behaviours.
    var load = function() {
        debugger;
        app.Services.Offer.get(
            id(),
            function(offerDto) {
                
                offer.id(offerDto.id);
                offer.name(offerDto.name);
                offer.imageUrl(offerDto.imageUrl);
                offer.distance(offerDto.dist);
                offerApplyType(offerDto.type);
            });
        
    };
    
    var dispose = function() {
    };
    
    function onOrientationChanged() {
    };
    
    function onClick() {
        
        var bw = new BWIPJS;
        bw.bitmap(new Bitmap);
        
        alert('dd');
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