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
        
        return {
            logLevelType: LogLevelType,
            setLogLevel: setLogLevel,
            critical: critical,
            error: error,
            warning: warning,
            info: info,
            verbose: verbose,
            traceStart: traceStart,
            traceEnd: traceEnd
            
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
        var _currentPositionObserver = new utils.Observer;
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

        var subscribe = function(fn) {
            _currentPositionObserver.subscribe(fn);    
        };
        
        var unsubscribe = function(fn) {
            _currentPositionObserver.unsubscribe(fn);
            
            // Stop refreshing if there are not any subscribers.
            // NOTE: Commented out because it may not be the right choice to stopAutoRefresh.  Waiting
            // to comment back in until there is a need.
            //if (_currentPositionObserver.subscriberCount === 0) {
            //    stopAutoRefresh();
            //}
        };
        
        var getCurrentPosition = function () {
            return _currentPosition;
        };
        
        function onGeolocationSuccess(position) {
            _currentPosition = position;
            _currentPositionObserver.fire(_currentPosition);
            
        };
        
        function onGeolocationError(error) {
            app.logger.error(error.message);
        };
        
        return {
            getCurrentPosition: getCurrentPosition,
            startAutoRefresh: startAutoRefresh,
            stopAutoRefresh: stopAutoRefresh,
            refresh: refresh,
            subscribeRefresh: subscribe,
            unsubscribeRefresh: unsubscribe
        };

    };
}());    