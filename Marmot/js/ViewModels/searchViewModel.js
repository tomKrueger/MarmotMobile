'use strict';

var app = app || {};

app.SearchViewModel = function() {
	           
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