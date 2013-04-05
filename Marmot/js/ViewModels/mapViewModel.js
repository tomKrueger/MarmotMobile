'use strict';

app.MapViewModel = function() {
    var temp = ko.observable();
    
    // Behaviours.
    var load = function() {
        var map = new utils.GoogleMap();
        map.initialize("mapCanvas", 43.644026, -88.945312, lookupMapMarkers);
        
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
    
    function lookupMapMarkers(swLat, swLng, neLat, neLng, successCallback) {
        app.Services.Map.getMarkers(swLat, swLng, neLat, neLng, function(markers) {
        
            var curPos = app.Globals.currentGeoPosition();
            var currentLocMarker = new Object();        
            currentLocMarker.lat = curPos.coords.latitude;
            currentLocMarker.lng = curPos.coords.longitude;
            currentLocMarker.type = 3;
            
            markers.push(currentLocMarker);
            
            successCallback(markers);
        });
    }
    
    return {
        load: load,
        orientationChanged: onOrientationChanged,
        dispose: dispose,
        pageshow: pageshow
    };    
};