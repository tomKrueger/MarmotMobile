'use strict';

app.LocationViewModel = function() {
    var id = ko.observable(),
        name = ko.observable();
    
    // Behaviours.
    var load = function() {
        $(window).bind('orientationchange', onOrientationChanged);
    };
    
    var dispose = function() {
      
        $(window).unbind('orientationchange', onOrientationChanged);
    };
    
    function onOrientationChanged() {
    };
    
    return {
        load: load,
        dispose: dispose,
        id: id,
        name: name
        
    };    
};