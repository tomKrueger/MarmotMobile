'use strict';

app.MapViewModel = function() {
    var temp = ko.observable();
    
    // Behaviours.
    var load = function() {
        var map = new utils.GoogleMap();
        map.initialize("mapCanvas", -48, 151);
        
        onResize(); // Ensure Resize fires.
        $(window).bind('resize', onResize);
    };
    
    var dispose = function() {
       $(window).unbind('resize', onResize);
    };
    
    var pageshow = function() {
         
    };
    
    function onResize() {
        
        // Resize map to fit screen.
        var height = $(window).height() - $("#header").height() + $("#footer").height()
       $('#mapCanvas').height(height);
    }    
    
    function onOrientationChanged() {
    };
    
    return {
        load: load,
        orientationChanged: onOrientationChanged,
        dispose: dispose,
        pageshow: pageshow
    };    
};