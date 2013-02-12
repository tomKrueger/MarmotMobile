'use strict';

app.SocialViewModel = function() {
    var temp = ko.observable();
    
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
        dispose: dispose
    };    
};