'use strict';

app.MapViewModel = function() {
    var temp = ko.observable();
    
    var infoWindowId = ko.observable();
    var infoWindowEntityCode = ko.observable();
    var infoWindowTitle = ko.observable();
    var infoWindowAddress = ko.observable();
    var infoWindowNavFunc = ko.computed(function() {
        
        switch(infoWindowEntityCode())
        {
            case "C":
                return "navigateToCommunityPage({0}, '{1}');".format(infoWindowId(), infoWindowTitle());
            case "L":
                return "navigateToLocationPage({0}, '{1}');".format(infoWindowId(), infoWindowTitle());
        }
        
    });
    
    // Behaviours.
    var load = function() {
        var map = new utils.GoogleMap();
        map.initialize("mapCanvas", 43.644026, -88.945312, lookupMapMarkers, lookupInfoWindow);
        
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
    };
    
    function lookupInfoWindow(code, successCallback) {
        
        successCallback("Loading");
        
        app.Services.Map.getMarkerDetails(code, function(details) {
        
            infoWindowId(details.id);
            infoWindowEntityCode(details.entityCode);
            infoWindowTitle(details.title);
            infoWindowAddress(details.address);
            
            //var content = ''
            //    + '<div style="">'
            //    //+ '    <div style="width: 15px; height: 15px; overflow: hidden; position: absolute; opacity: 0.7; right: 12px; top: 12px; z-index: 10000;">'
            //    //+ '        <img style="position: absolute; left: -27px; top: -66px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px; -webkit-user-drag: none; width: 102px; height: 100.5px;" src="http://maps.gstatic.com/mapfiles/mv/imgs8.png" draggable="false">'
            //    //+ '    </div>'
            //    //+ '    <img style="-webkit-user-select: none; border: 0px; padding: 0px; margin: 0px; position: absolute; right: 4px; top: 4px; z-index: 10001; cursor: pointer; width: 31px; height: 31px;" src="http://maps.gstatic.com/mapfiles/transparent.png" draggable="false">'
            //    //+ '    <div style="cursor: default; position: absolute; left: 18px; top: 18px; z-index: 2; width: 263px; height: 54px;">'
            //    + '    <div class="gm-iw" jstcache="0">'
            //    + '        <div><span class="gm-title">Glacial Blue Hills Recreation Area</span></div>'
            //    + '        <div class="gm-rev">'
            //	+ '			<span style="display: none;">'
            //	+ '			    <div class="gm-stars" style="background-position: 0 0; width: 65px;">'
            //	+ '			        <div class="gm-stars" style=""></div>'
            //	+ '				</div>'
            //	+ '			</span>'
            //	+ '			<span jsdisplay="(i.result.rating&amp;&amp;i.result.url)" jstcache="3" style="display: none;">&nbsp;-&nbsp;</span>'
            //	+ '			<span jstcache="0"><a target="_blank" href="https://plus.google.com/100440572524389226413/about">more info »</a></span>'
            //	+ '		</div>'
            //    + '        <div class="gm-basicinfo" jstcache="0">'
            //    + '            <div style="">West Bend, WI, United States</div>'
            //    + '            <div style="display: none;"></div>'
            //    + '        </div>'
            //    + '    </div>'
            //    //+ '</div>'
            //    + '</div>'
            
            var content = $('#infoWindowContainer').html();
            
            successCallback(content);
        
        });
    };
    
    var onInfoWindowMoreClick = function() {
        debugger;
        navigateToCommunityPage(infoWindowId(), "");
    };
    
    return {
        infoWindowTitle: infoWindowTitle,
        infoWindowAddress: infoWindowAddress,
        infoWindowNavFunc: infoWindowNavFunc,
        onInfoWindowMoreClick: onInfoWindowMoreClick,
        load: load,
        orientationChanged: onOrientationChanged,
        dispose: dispose,
        pageshow: pageshow
    };    
};