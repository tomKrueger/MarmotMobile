var app = app || {};

"use strict";

// JavaScript Document
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    
    app.logger.traceStart("onDeviceReady");
    
    app.Globals = new app.Models.Globals();
    
    // Initialize GeoManger with a default location in case geo isn't enabled on phone.
    // We want something to show up on the screen.
    app.geoManager = new utils.GeoManager();
    app.geoManager.subscribeRefresh(onGeoRefresh, onGeoError);
    app.geoManager.startAutoRefresh(2 * 60 * 1000);
    
    pgReady.resolve();
    
    app.logger.traceEnd("onDeviceReady");
}

function onGeoRefresh() {

    app.Globals.currentGeoPosition(app.geoManager.getCurrentPosition());
}

function onGeoError(error) {
    
    //app.geoManager.setCurrentPosition({ coords: { latitude: 43.059911, longitude: -88.403900 }});   
}

function refreshPages() {
    
    // Force geo manager to refresh so current position is updated
    // before refreshing pages.
    app.geoManager.refresh();
    
    // Leaving here in case needed in future but calling geoManager refresh already forces a refresh to the
    // subscribed pages such as Home & Community.
    //$(".ui-page").each(function() {
    //    var vm = getViewModel(this.id);
    //    if (vm && vm.refresh) {
    //        vm.refresh();
    //    }
    //});
}

function calculateDistanceFromCurrent(position) {
    
    var curPos = app.Globals.currentGeoPosition();  
    
    var dist = utils.Geo.calculateDistanceInMiles(curPos.coords.latitude, curPos.coords.longitude, position.lat, position.long);
    
    return dist;
}

function formatDistance(dist) {
    if (dist >= 10)
        return dist.toFixed() + ' mi';
    else if (dist >= 0.1)
        return dist.toFixed(1) + ' mi';
    else
        return (dist * 5280.0).toFixed() + ' ft';
}

function navigateToHome() {
    $.mobile.changePage($("#homePage"));
}

function navigateToCommunityPage(communityId, communityName) {
    $.mobile.changePage("communityPage.html", { data: { id: communityId, name: communityName } });
}

function navigateToLocationPage(locationId, locationName) {
    $.mobile.changePage("locationPage.html", { data: { id: locationId, name: locationName } });
}

var _onOfferDoneNav;

function navigateToOfferPage(offerId, offerName, onOfferDoneNav) {
    
    _onOfferDoneNav = onOfferDoneNav;
    
    $.mobile.changePage("offerPage.html", { data: { id: offerId, name: offerName } });
}

function navigateToOfferThankYouPage() {    
    $.mobile.changePage("offerThankYouPage.html");
}

function navigateToOnOfferDonePage() {
    _onOfferDoneNav();
}

function getLocation() {
    myNewFunction();
}
  
function myNewFunction(){
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
}
  
//=======================Say Hello (Page 1) Operations=======================//
function sayHello() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');
    
    sayHelloTextElem.innerHTML = 'Hello, ' + inputText.value + '!';
    sayHelloTextElem.style.display = 'block';
    sayHelloInputElem.style.display = 'none';
}

function sayHelloReset() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');
    
    inputText.value = '';
    sayHelloTextElem.style.display = 'none';
    sayHelloInputElem.style.display = 'block';
}

//=======================Geolocation Operations=======================//
// onGeolocationSuccess Geolocation
function onGeolocationSuccess(position) {
    // Use Google API to get the location data for the current coordinates
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({ "latLng": latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if ((results.length > 1) && results[1]) {
                $("#myLocation").html(results[1].formatted_address);
            }
        }
    });
    
    // Use Google API to get a map of the current location
    // http://maps.googleapis.com/maps/api/staticmap?size=280x300&maptype=hybrid&zoom=16&markers=size:mid%7Ccolor:red%7C42.375022,-71.273729&sensor=true
    var googleApis_map_Url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&zoom=16&sensor=true&markers=size:mid%7Ccolor:red%7C' + latlng;
    var mapImg = '<img src="' + googleApis_map_Url + '" />';
    $("#map_canvas").html(mapImg);
}

// onGeolocationError Callback receives a PositionError object
function onGeolocationError(error) {
    $("#myLocation").html("<span class='err'>" + error.message + "</span>");
}