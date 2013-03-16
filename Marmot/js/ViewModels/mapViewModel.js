'use strict';

app.MapViewModel = function() {
    var temp = ko.observable();
    
    // Behaviours.
    var load = function() {
        
    };
    
    var dispose = function() {
      
    };
    
    function onOrientationChanged() {
    };
    
    return {
        load: load,
        orientationChanged: onOrientationChanged,
        dispose: dispose
    };    
};