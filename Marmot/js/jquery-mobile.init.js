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
    
    $(document).on("pagebeforeshow", ".ui-page", function (event, ui) {
        var self = this;
        $.when(homeLoaded).then(function () {
            var vm = getViewModel(self.id);
            if(vm && vm.pagebeforeshow)
                vm.pagebeforeshow();
        });
    });
    
    $(document).on("pageshow", ".ui-page", function (event, ui) {
        var self = this;
        $.when(homeLoaded).then(function () {
            var vm = getViewModel(self.id);
            if (vm && vm.pageshow)
                vm.pageshow();
        });
    });
    
    // Hook up all pages to ensure that dispose gets called on 
    // them all.  Every view model should expose a dispose function
    // to clean up memory and all event subscriptions that were registered in the view model.
    $(document).on("pageremove", ".ui-page", function (event, ui) {
        var vm = getViewModel(this.id);
        if (vm)
            vm.dispose();
    });
    
    $(document).on("pageinit", "#homePage", function (event, ui) {
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
    
    $(document).on("pageinit", "#communityPage", function (event, data) {
        app.logger.traceStart("pageInit-communityPage");
        var viewElem = document.getElementById(this.id);
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
    
    $(document).on("pageinit", "#locationPage", function (event, data) {
        app.logger.traceStart("pageInit-locationPage");
        var viewElem = document.getElementById(this.id);
        if (viewElem) {           
            var queryString = parseQueryString($(this));
            
            var vm = new app.LocationViewModel();
            vm.id(queryString.id);
            vm.name(queryString.name);
            
            ko.applyBindings(vm, viewElem);
            vm.load();
        }
        app.logger.traceEnd("pageInit-locationPage");
    });
    
    $(document).on("pageinit", "#mapPage", function (event, data) {
        app.logger.traceStart("pageInit-mapPage");
        var viewElem = document.getElementById(this.id);
        if (viewElem) {            
            var vm = new app.MapViewModel();            
            ko.applyBindings(vm, viewElem);
            vm.load();
        }
        app.logger.traceEnd("pageInit-mapPage");
    });
    
    $(document).on("pageinit", "#offerPage", function (event, data) {
        app.logger.traceStart("pageInit-offerPage");
        var viewElem = document.getElementById(this.id);
        if (viewElem) {            
            var queryString = parseQueryString($(this));
            
            var vm = new app.OfferViewModel();
            vm.id(queryString.id);
            vm.name(queryString.name);
            
            ko.applyBindings(vm, viewElem);
            vm.load();
        }
        app.logger.traceEnd("pageInit-offerPage");
    });
    
    $(document).on("pageinit", "#offerApplyPage", function (event, data) {
        app.logger.traceStart("pageInit-offerApplyPage");
        var viewElem = document.getElementById(this.id);
        if (viewElem) {            
            var queryString = parseQueryString($(this));
            
            var vm = new app.OfferApplyViewModel();
            vm.id(queryString.id);
            //vm.name(queryString.name);
            
            ko.applyBindings(vm, viewElem);
            vm.load();
        }
        app.logger.traceEnd("pageInit-offerApplyPage");
    });
    
    $(document).on("pageinit", "#searchPage", function (event, ui) {
        app.logger.traceStart("pageInit-searchPage");
        var viewElem = document.getElementById(this.id);
        if (viewElem) {
            var vm = new app.SearchViewModel();
            ko.applyBindings(vm, viewElem);
            vm.load();
        }
        app.logger.traceEnd("pageInit-searchPage");
    });
    
    $(document).on("pageinit", "#socialPage", function (event, data) {        
        app.logger.traceStart("pageInit-socialPage");
        var viewElem = document.getElementById(this.id);
        if (viewElem) {            
            var vm = new app.SocialViewModel();            
            ko.applyBindings(vm, viewElem);
            vm.load();
        }
        app.logger.traceEnd("pageInit-socialPage");
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