var app = app || {};
var jqmReady = $.Deferred(),
    pgReady = $.Deferred(),
    homeLoaded = $.Deferred();

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
    
    // Hook up all pages to ensure that dispose gets called on 
    // them all.  Every view model should expose a dispose function
    // to clean up memory and all event subscriptions that were registered in the view model.
    $('.ui-page').live('pageremove', function (event, ui) {
        var vm = getViewModel(this.id);
        vm.dispose();
    });
    
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
                
                homeLoaded.resolve();
            }
        });
        
        app.logger.traceEnd("pageInit-homePage");
    });
    
    $('#homePage').live('pagebeforeshow', function (event, ui) {
        
        $.when(homeLoaded).then(function () {
            var viewElem = document.getElementById('homePage');
            var vm = ko.dataFor(viewElem);
            vm.pagebeforeshow();
        });
    });
    
    $('#homePage').live('pageshow', function (event, ui) {
        
        $.when(homeLoaded).then(function () {
            var viewElem = document.getElementById('homePage');
            var vm = ko.dataFor(viewElem);
            vm.pageshow();
        });
    
    });
    
    $('#communityPage').live('pageinit', function (event, data) {
        app.logger.traceStart("pageInit-communityPage");
        var viewElem = document.getElementById('communityPage');
        if (viewElem) {           
            var queryString = parseQueryString($(this));
            
            var vm = new app.CommunityViewModel();
            vm.id(queryString.id);
            vm.name(queryString.name);
            
            ko.applyBindings(vm, viewElem);
            vm.load();
        }
        app.logger.traceEnd("pageInit-communityPage");
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
    
    function getViewModel(id) {
        var viewElem = document.getElementById(id);
        var vm = ko.dataFor(viewElem);
        return vm;        
    }
    
    function parseQueryString(jqPage) {
        var url = jqPage.attr("data-url");            
        var qsParms = getQueryStringParms(url); 
        return qsParms;        
    }
    
    app.logger.traceEnd("app.mobileInit");
};