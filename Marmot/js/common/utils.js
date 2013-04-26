var app = app || {};
var utils = utils || {};

//
// Show native alert box when running on device otherwise fall back to 
// default browser alerts.
//
function showAlert(message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}

//
// Centers an image inside of a container.  The main use is 
// when the image is bigger than the container size.
//
// Currently this function looks to it's parents to find a parent container that 
// has a width, to find the width.  This is done because not all container elements have 
// width so we keep looking until one is found.  This may not work in all cases though.
// 
//    img.center { display: block; margin-left: auto; margin-right: auto; }
//
// Example Usage:
//    centerImage($("#mapId"));

function centerImage(jqImg) {

    app.logger.traceStart("centerImage()");
    
    // Find width of parent container.
    var width = 0;
    var elm = jqImg;
    while(width === 0) {
        
        elm = elm.parent()
        width = elm.width();
    }    
    
    app.logger.verbose("width: " + width);
    app.logger.verbose("imageWidth: " + jqImg.width());
    app.logger.verbose("left: " + ((width - jqImg.width()) / 2));
    
    // Only center the image if valid values have been found for width and image width.
    if (width > 0 && jqImg.width() > 0)
    {
        jqImg.css({
            position: "relative",
            left: (width - jqImg.width()) / 2
        });
    }
    
    app.logger.traceEnd("centerImage()");
}

//
// Make columns in the group the same height.
// http://www.cssnewbie.com/equal-height-columns-with-jquery/
//
function equalHeight(group) {
	var tallest = 0;
	group.each(function() {
		var thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
}

function createQueryString(values) {
    
    if( typeof values != 'Array' ) {
      values = [values];
    }
    
    return '?' + values.join('&');
}

function getQueryStringParmByName(url, paramName) { 
	var strGET = url.substr(url.indexOf('?') + 1, url.length - url.indexOf('?')); 
	var arrGET = strGET.split("&"); 
	
    var paramValue = '';
	for(i = 0; i < arrGET.length; i++){ 
	    var aux = arrGET[i].split("="); 
	    if (aux[0] == paramName){
	        paramValue = decodeURIComponent(aux[1]);
	    }
	}
    
	return paramValue;
}

function getQueryStringParms(url) { 
	var strGET = url.substr(url.indexOf('?') + 1, url.length - url.indexOf('?')); 
	var parameters = strGET.split("&"); 
	var data = { };
    
    for (var i = 0, j = parameters.length; i < j; i++) {
        var parameter = parameters[i].split("=");
        var parameterName = decodeURIComponent(parameter[0]);
        var parameterValue = typeof parameter[1] === "undefined" ? parameter[1] : decodeURIComponent(parameter[1]);
        
        // Hack to remove plus signs.  This may not always be correct.
        parameterValue = parameterValue.replaceAll('+', ' ');
        
        var dataType = typeof data[parameterName];
        if (dataType === "undefined") {
            data[parameterName] = parameterValue;
        } else if (dataType === "array") {
            data[parameterName].push(parameterValue);
        } else {
            data[parameterName] = [data[parameterName]];
            data[parameterName].push(parameterValue);
        }
    }
    return data;
}

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

// http://gotochriswest.com/blog/2011/07/25/javascript-string-prototype-replaceall/
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

Array.prototype.pushAll = function(arr) {
    this.push.apply(this, arr);
};

//
// Observer Pattern Object
//
// Example Usage:
//    var fn = function(data) {};
//
//    var o = new utils.Observer;
//    o.subscribe(fn);
//    o.fire('here is my data');
//    o.unsubscribe(fn);
//
(function () {
    'use strict';
    
    utils.Observer = function() {
        this.fns = [];
    }
    
    utils.Observer.prototype = {
        subscribe : function(fn) {
            this.fns.push(fn);
            app.logger.info("subscriber count: " + this.fns.length);
        },
    
        unsubscribe : function(fn) {
            this.fns = this.fns.filter(
                function(el) {
                    if ( el !== fn ) {
                        return el;
                    }
                }
            );
        },
    
        fire : function(o, thisObj) {
            var scope = thisObj || window;
            this.fns.forEach(
                function(el) {
                    el.call(scope, o);
                }
            );
        },
        
        subscriberCount : function() {
            return this.fns.length;
        }
    };
}());    
    

//
// Logger is a wrapper around console object. To allow for turning logging on and off based on the log level.
//
// Logger is implemented using the Module Revealing Pattern.
// It is essentially static and doesn't get instantiated using 'new'.
// Example Usage:
//    app.logger.setLogLevel(app.logger.logLevelType.Trace);
//
//    app.logger.traceStart("pageInit-homePage");
//    app.logger.traceEnd("pageInit-homePage");
//
(function () {
    'use strict';

    app.logger = (function () {
        
        var LogLevelType = {
            Off: 1,
            Critical: 2,
            Error: 3,
            Warning: 4,
            Info: 5,
            Verbose: 6,
            Trace: 7
        }
        
        var _logLevel = LogLevelType.Off; // Don't log anything by default.
        var _perfDictionary = {};

        var init = (function() {
            // Clear out console functions if the browser doesn't support it to avoid error dialogs from popping up.
            // Commenting out until an issue: http://stackoverflow.com/questions/1215392/how-to-quickly-and-conveniently-disable-all-console-log-statements-in-my-code
            //if(typeof(console) === 'undefined') {
            //    alert('init');
            //    var console = {};
            //    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
            //}
       }());
        
        var setLogLevel = function (logLevelType) {
            if (!(logLevelType >= 1 && logLevelType <= 7)) {
                // Use zero as log level to force it to be logged even if logging is off.    
                log(0, "Invalid log level type.");
            }
            
            _logLevel = logLevelType;            
        }
        
        var critical = function (message) {
            log(LogLevelType.Critical, message, function(message) { console.error(message); });
        };
        
        var error = function (message) {
            log(LogLevelType.Error, message, function(message) { console.error(message); });
        };
        
        var warning = function (message) {
            log(LogLevelType.Warning, message, function(message) { console.warn(message); });
        };
        
        var info = function (message) {
            log(LogLevelType.Info, message, function(message) { console.info(message); });
        };
        
        var verbose = function (message) {
            log(LogLevelType.Verbose, message, function(message) { console.debug(message); });
        };

        var traceStart = function (message) {
            log(LogLevelType.Trace, '+ ' + message, function(message) { console.log(message); });
        };
        
        var traceEnd = function (message) {
            log(LogLevelType.Trace, '- ' + message, function(message) { console.log(message); });
        };
        
        var log = function (logLevel, message, consoleFunc) {
            if (_logLevel >= logLevel) {
                consoleFunc((new Date()).toJSON() + "    " + message);
            }
        };
        
        var tracePerfClear = function(key) {
            if (_perfDictionary[key])
                _perfDictionary[key] = null;
        }
        
        var tracePerfStart = function(key, message) {
            
            tracePerfClear(key);
            
            tracePerf(key, message);
        }
        
        var tracePerf = function(key, message) {
          
            var curDate = new Date();
            
            var dates = _perfDictionary[key];
            var msg;
            
            if (dates) {
                
                var startDate = dates[0];
                var lastDate = dates[1];
                
                var elapsedSinceStart = curDate - startDate;
                var elapsedSinceLast = curDate - lastDate;
                
                // Set last date for next time.
                dates[1] = curDate;
                
                //msg = key + " - " + message + " Elapsed Total: '" + elapsedSinceStart + "'ms Elapsed Since Last: '" + elapsedSinceLast + "ms'";
                msg = key + " - " + message + " - Elapsed Total/Since Last: '" + elapsedSinceStart + "ms/" + elapsedSinceLast + "ms'";
                
            } else {
                dates = [];
                dates.push(curDate); // Start Date.
                dates.push(curDate); // Last Date.
                
                _perfDictionary[key] = dates;
                
                msg = key + " - " + message + " Start";
            }
            
            log(0, msg, function(message) { console.log(message); });
        };
        
        
        return {
            logLevelType: LogLevelType,
            setLogLevel: setLogLevel,
            critical: critical,
            error: error,
            warning: warning,
            info: info,
            verbose: verbose,
            tracePerfClear: tracePerfClear,
            traceStart: traceStart,
            traceEnd: traceEnd,
            tracePerfStart: tracePerfStart,
            tracePerf: tracePerf
            
        };

    }());
}());

//
// GeoManager is a wrapper around geo location utils  is a wrapper around console object. To allow for turning logging on and off based on the log level.
//
// Example Usage:
//    var geoManager = new utils.GeoManager();
//    var fn = function(position) { alert (position.coords.latitude); }
//    geoManager.subscribeRefresh(fn);
//    geoManager.refresh();
//
//    -- After refresh has completed getCurrentPosition will have the value.
//    -- it is better to rely on subscribeRefresh.
//    alert(geoManager.getCurrentPosition());
//    geoManager.unsubscribeRefresh(fn);
//
(function () {
    'use strict';

    utils.GeoManager = function () {
        
        var _currentPosition;
        var _currentPositionChangedObserver = new utils.Observer;
        var _getPositionErrorObserver = new utils.Observer;
        var _timeout;
        
        var startAutoRefresh = function (interval) {
            stopAutoRefresh();
            _timeout = setInterval(refresh, interval);
        };
        
        var stopAutoRefresh = function () {
            clearInterval(_timeout);
        };
        
        var refresh = function () {
            navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);         
        };

        var subscribe = function(fn, errFunc) {
            _currentPositionChangedObserver.subscribe(fn);
            _getPositionErrorObserver.subscribe(errFunc);
        };
        
        var unsubscribe = function(fn, errFunc) {
            _currentPositionChangedObserver.unsubscribe(fn);
            _getPositionErrorObserver.unsubscribe(errFunc);
            
            // Stop refreshing if there are not any subscribers.
            // NOTE: Commented out because it may not be the right choice to stopAutoRefresh.  Waiting
            // to comment back in until there is a need.
            //if (_currentPositionChangedObserver.subscriberCount === 0) {
            //    stopAutoRefresh();
            //}
        };
        
        var getCurrentPosition = function () {
            return _currentPosition;
        };
        
        var setCurrentPosition = function (position) {
            _currentPosition = position;
        };
        
        function onGeolocationSuccess(position) {
            _currentPosition = position;
            _currentPositionChangedObserver.fire(_currentPosition);
            
        };
        
        function onGeolocationError(error) {
            app.logger.error(error.message);
            _getPositionErrorObserver.fire(error);
        };
        
        return {
            getCurrentPosition: getCurrentPosition,
            setCurrentPosition: setCurrentPosition,
            startAutoRefresh: startAutoRefresh,
            stopAutoRefresh: stopAutoRefresh,
            refresh: refresh,
            subscribeRefresh: subscribe,
            unsubscribeRefresh: unsubscribe
        };

    };
    
    utils.Geo = (function () {
        
        var _deg2RadMultiplier = Math.PI / 180;
        
        function calculateDistanceInKM(lat1, long1, lat2, long2) {
            return calculateDistance(6367, lat1, long1, lat2, long2);
        };

        function calculateDistanceInMiles(lat1, long1, lat2, long2) { 
            return calculateDistance(3956, lat1, long1, lat2, long2);
        };
        
        // Calculate distance using Haversine method.
        function calculateDistance(earthRadius, lat1, long1, lat2, long2) {
            var dlat = degreesToRadians(lat2 - lat1);
            var dlong = degreesToRadians(long2 - long1);
            var a = 
                Math.pow(Math.sin(dlat/2.0), 2) + 
                Math.cos(degreesToRadians(lat1)) * 
                Math.cos(degreesToRadians(lat2)) * 
                Math.pow(Math.sin(dlong/2.0), 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = earthRadius * c; 
        
            return d;
        };
        
        function degreesToRadians(degrees) {
          return degrees * _deg2RadMultiplier;
        };
      
         return {
            calculateDistanceInKM: calculateDistanceInKM,
            calculateDistanceInMiles: calculateDistanceInMiles
        };
    }());    
}());    

(function () {
    'use strict';
    
    // https://developers.google.com/maps/documentation/javascript/reference#Map
    // https://developers.google.com/maps/articles/toomanymarkers
    // https://developers.google.com/maps/documentation/javascript/reference#Map
    // http://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker
    utils.GoogleMap = function() {
 
        var _mapElementId;
        var _map;
        var _getMarkersFunc;
        var _getInfoWindowFunc;
        var _lastMarkers = [];
        var _currentPositionMarkerImage;
        var _communityMarkerImage;
        var _locationMarkerImage;
        var _infowindow = new google.maps.InfoWindow();
        var _lastMarkerWithInfoWindow;
        
        var initialize = function(mapElementId, lat, lng, getMarkersFunc, getInfoWindowFunc) {
            _mapElementId = mapElementId;
            _getMarkersFunc = getMarkersFunc;
            _getInfoWindowFunc = getInfoWindowFunc;
            
            _currentPositionMarkerImage = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                new google.maps.Size(24, 34),
                new google.maps.Point(0,0),
                new google.maps.Point(10, 34));
            
            _communityMarkerImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "4A708B",
                new google.maps.Size(21, 34),
                new google.maps.Point(0,0),
                new google.maps.Point(10, 34));
            
            _locationMarkerImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "FFFDD0",
                new google.maps.Size(21, 34),
                new google.maps.Point(0,0),
                new google.maps.Point(10, 34));
            
            //var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            //    new google.maps.Size(40, 37),
            //    new google.maps.Point(0, 0),
            //    new google.maps.Point(12, 35));
            
            
            _map = showMap(lat,lng);
            
            google.maps.event.addListener(_map, 'idle', showMarkers);
        };
     
        var showMap = function(lat,lng) {
            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(lat, lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
     
            var map = new google.maps.Map(document.getElementById(_mapElementId), mapOptions);
     
            return map;
        };
        
        var showMarkers = function() {
            var bounds = _map.getBounds();
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();
            
            _getMarkersFunc(sw.lat(), sw.lng(), ne.lat(), ne.lng(), function(markers) {
                
                // Remove the existing markers from the map so that performance does not degrade.
                deleteMarkers(_lastMarkers);
                _lastMarkers = [];                
                
                addMarkersToMap(_map, markers);                
            });
            
        };
        
        var deleteMarkers = function(markers) {
            
            if (markers) {            
                for(var i = 0; i < markers.length; i++) {
                    var marker = markers[i];
                    if (marker && marker !== _lastMarkerWithInfoWindow) {
                        marker.setMap(null);
                        console.log("deleted marker.");
                    }
                }
            }            
        };
        
        var addMarkersToMap = function(map, markers) {
                        
            if(markers) {
                for(var i = 0; i < markers.length; i++) {
                    var marker = markers[i];
                    var iconUrl = null;
                    var iconImage;
                    
                    switch(marker.type)
                    {
                        case 1:
                            iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';    
                            iconImage = _communityMarkerImage;
                            break;
                        case 2:
                            iconImage = _locationMarkerImage;
                            iconUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';    
                            //var pinColor = "FFFFFF";
                            //iconUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + pinColor
                            break; 
                        case 3:
                            iconImage = _currentPositionMarkerImage;
                            break; 
                    }
                    
                    if (marker.geoPosition) {
                        addMarkerToMap(map, marker.code, marker.geoPosition.lat, marker.geoPosition.long, iconImage);
                    } else {
                        app.logger.warning("Missing geoPosition for marker code {0}".format(marker.code));
                    }
                    
                }
            }
            
        };
        
        var addMarkerToMap = function(map, code, lat, lng, iconUrl) {
            var latLng = new google.maps.LatLng(lat, lng);
 
            var marker = new google.maps.Marker({
                position: latLng,
                icon: iconUrl,
                map: map,
                code: code
            });
            
            google.maps.event.addListener(marker, 'click', showInfoWindow);
            
            _lastMarkers.push(marker);
        };
        
        var showInfoWindow = function() {
            
            var marker = this;
            
            _getInfoWindowFunc(marker.code, function(htmlContent) {
                _infowindow.setContent(htmlContent);
                _infowindow.open(_map, marker);
                
                // Keep reference so this marker won't be deleted so that the info window won't go away.
                _lastMarkerWithInfoWindow = marker;
            });            
        };
        
        return {
            initialize: initialize
        };
    };
    
}());    