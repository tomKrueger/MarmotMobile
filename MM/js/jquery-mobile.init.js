var app = app || {};
var jqmReady = $.Deferred(),
    pgReady = $.Deferred();

'use strict';

// Jquery Mobile Global Initialization.
// http://jquerymobile.com/demos/1.2.0/docs/api/globalconfig.html
$(document).bind('mobileinit', function () {
    jqmReady.resolve();
    $.mobile.defaultPageTransition = "slide";
    
    app.logger.setLogLevel(app.logger.logLevelType.Trace);
    
    app.mobileInit(); 
})

app.mobileInit = function () {
    app.logger.traceStart("*************************************");
    app.logger.traceStart("app.mobileInit");
    
    $('#homePage').live('pageinit', function (event, ui) {
        
        app.logger.traceStart("pageInit-homePage");
        
        // Wait until both jqueryMobile and the Page is ready to be loaded.
        // The page won't be ready to load until onDeviceReady is fired in app.js
        // because we need application level resources initialized such as GeoManager before
        // filling in the page.
        $.when(jqmReady, pgReady).then(function () {    
            var viewElem = document.getElementById('homePage');
            if (viewElem) {
                var vm = new app.HomeViewModel();
                ko.applyBindings(vm, viewElem);
                vm.load();
                
                //equalHeight($("#homeMiddle"));
            }
        });
        
        app.logger.traceEnd("pageInit-homePage");
    });
    
    $('#searchPage').live('pageinit', function (event, ui) {
        app.logger.traceStart("pageInit-searchPage");
        var viewElem = document.getElementById('searchPage');
        //alert(viewElem);
        if (viewElem) {
            var vm = new app.SearchViewModel();
          //  ko.applyBindings(vm, viewElem);
          //  vm.load();
        }
        app.logger.traceEnd("pageInit-searchPage");
    });
    
    app.logger.traceEnd("app.mobileInit");
};