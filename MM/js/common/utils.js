var app = app || {};

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
// Logger is a wrapper around console object. To allow for turning logging on and off based on the log level.
//
// Services are implemented using the Module Revealing Pattern.
// They are essentially static and don't get instantiated using 'new'.
// Example Usage:
//    var nearbyCommunities = app.Services.Community.getNearByCommunities(zipCode);
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
    