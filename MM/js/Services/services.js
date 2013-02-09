var app = app || {};
app.Services = app.Services || {};

//
// Services are a proxy to the backend REST APi's.
//
// Services are implemented using the Module Revealing Pattern.
// They are essentially static and don't get instantiated using 'new'.
// Example Usage:
//    var nearbyCommunities = app.Services.Community.getNearByCommunities(zipCode);
//
(function () {
    'use strict';

    app.Services.Community = (function () {
        
        var _tempSwitchFlag = true;
        
        //
        // Retrieves community.
        //
        var get = function (communityId) {
            return { name: "Delafield", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png" };
        };    

        var getNearByCommunities = function (position, successCallback) {

            var communities;
            
            //_tempSwitchFlag = !swi_tempSwitchFlagtchFlag;
            //if (_tempSwitchFlag) {
            if (position.coords.latitude > 88) {
                communities = [
                    { name: "Delafield", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png" },
                    { name: "Something else", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_3-07.png" },
                    { name: "Something else2", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_1-07.png" },
                    { name: "Something else3", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_1-07.png" }
                ];
            } else {
            
                communities = [
                    { name: "Delafield", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png" },
                    { name: "Something else", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_3-07.png" }
                ];
            }

            successCallback(communities);
        };

        return {
            get: get,
            getNearByCommunities: getNearByCommunities
        };

    }());
    
    app.Services.Offer = (function () {
        
        //
        // Retrieves offer.
        //
        var get = function (offerId) {
            return { name: "Delafield", imageUrl: "http://www.cityofdelafield.com/assets/southentrance-122h.jpg" };
        };    

        var getNearByOffers = function (zipCode, successCallback) {

            var offers = [
                { id: 1, dist: '55 ft', name: "Buy 1 Get 1 Free @ Stone Creek", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_3-08.png" },
                { id: 2, dist: '4 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png" },
                { id: 3, dist: '5 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png" },
                { id: 4, dist: '5 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png" },
                { id: 5, dist: '5 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png" }
            ];

            successCallback(offers);
        };

        return {
            get: get,
            getNearByOffers: getNearByOffers
        };

    }());
    
    app.Services.Map = (function () {

        var getStaticMapUrlByZipcode = function(zipCode, successCallback) {
            
            var url = "http://maps.googleapis.com/maps/api/staticmap?center=Delafield,WI&zoom=13&size=200x200&maptype=roadmap&markers=color:blue%7Clabel:1%7C43.059911,-88.403900&markers=color:green%7Clabel:3%7C43.069911,-88.407900&markers=color:red%7Ccolor:red%7Clabel:2%7C43.057911,-88.400900&sensor=false";            
            
            successCallback(url);
        };
        
        return {
          getStaticMapUrlByZipcode: getStaticMapUrlByZipcode  
        };
        
    }());
}());