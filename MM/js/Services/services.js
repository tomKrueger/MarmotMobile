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
            if (position.coords.latitude < 88) {
                communities = [
                    { id: 1, name: "Lake Country", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.465187, long: -80.522 } },
                    { id: 2, name: "Wauwatosa", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_3-07.png", geoPosition: { lat: 43.059911, long: -88.4139 } },
                    { id: 3, name: "Galena", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_1-07.png", geoPosition: { lat: 44, long: 87 } },
                    { id: 4, name: "Door County", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_1-07.png", geoPosition: { lat: 44, long: 87 } }
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
    
    app.Services.Location = (function () {
    
        var locations = [
            //{ id: 1, name: "Coffee Hut", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 44, long: 87 } },
            //{ id: 3, name: "Main Place", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_1-07.png", geoPosition: { lat: 44, long: 86 } },
            { communityId: 1, id: 2, name: "Revere's Wells St. Tavern", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060544, long: -88.405606 } },
            { communityId: 1, id: 3, name: "Mazatlan", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.071679, long: -88.420738 } },
            { communityId: 1, id: 4, name: "Great Harvest Bread", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060152, long: -88.404399 } },
            { communityId: 1, id: 5, name: "Tony & Mia's", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060434, long: -88.405279 } },
            { communityId: 2, id: 6, name: "Cafe Hollander", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.049287, long: -88.007504 } },
            { communityId: 2, id: 7, name: "Leff's Lucky Town", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.048111, long: -88.002376 } },
            { communityId: 2, id: 8, name: "Locker's Floral", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060577, long: -88.023231 } },
            //{ communityId: 2, id: 9, name: "", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 0, long: 0 } },
            { communityId: 3, id: 0, name: "Galena Brewing Company", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 42.421705, long: -90.43896 } },
            { communityId: 3, id: 11, name: "DeSoto House Hotel", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 42.415266, long: -90.42991 } }
        ];
        
        //
        // Retrieves location.
        //
        var get = function (locationId) {
            
            locations.forEach(function(location) {
                if (location.id === parseInt(locationId))
                    return location;        
            });
            
            //return { name: "Coffee Hut", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png" };
        };
        
        //
        // Retrieves locations in a community.
        //
        var getByCommunityId = function (communityId, successCallback) {
            
            var locationsToReturn = [];
            
            locations.forEach(function(location) {
                if (location.communityId === parseInt(communityId))
                    locationsToReturn.push(location);
            });
                
            successCallback(locationsToReturn);
        };
        
        return {
            get: get,
            getByCommunityId: getByCommunityId
        };
        
    }());
    
    app.Services.Offer = (function () {
        
        var offers = [
                { id: 1, dist: '55 ft', name: "Buy 1 Get 1 Free @ Stone Creek", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_3-08.png", type: "BarCode" },
                { id: 2, dist: '4 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "Discount" },
                { id: 3, dist: '5 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "CouponCode" },
                { id: 4, dist: '5 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "BarCode" },
                { id: 5, dist: '5 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "BarCode" }
            ];
        
        //
        // Retrieves offer.
        //
        var get = function (offerId, successCallback) {
            
            offers.forEach(function(offer) {
                if (offer.id === parseInt(offerId))
                    successCallback(offer);
            });
            
            //return { name: "Delafield", imageUrl: "http://www.cityofdelafield.com/assets/southentrance-122h.jpg" };
        };    

        var getNearByOffers = function (zipCode, successCallback) {

            successCallback(offers);
        };
        
        var getByCommunityId = function (communityId, successCallback) {

            var offers = [
                { id: 1, dist: '55 ft', name: "Buy 1 Get 1 Free @ Stone Creek", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_3-08.png" },
                { id: 2, dist: '4 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png" }                
            ];

            successCallback(offers);
        };

        var getByLocationId = function (locationId, successCallback) {

            var offers = [
                { id: 1, dist: '55 ft', name: "Buy 1 Get 1 Free @ Stone Creek", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_3-08.png" },
                { id: 2, dist: '4 mi', name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png" }                
            ];

            successCallback(offers);
        };
        
        return {
            get: get,
            getNearByOffers: getNearByOffers,
            getByCommunityId: getByCommunityId,
            getByLocationId: getByLocationId
        };

    }());
    
    app.Services.Map = (function () {

        var getStaticMapUrlByZipcode = function(zipCode, successCallback) {
            
            var url = "http://maps.googleapis.com/maps/api/staticmap?center=Delafield,WI&zoom=13&size=300x200&maptype=roadmap&markers=color:blue%7Clabel:1%7C43.059911,-88.403900&markers=color:green%7Clabel:3%7C43.069911,-88.407900&markers=color:red%7Ccolor:red%7Clabel:2%7C43.057911,-88.400900&sensor=false";            
            
            successCallback(url);
        };
        
        return {
          getStaticMapUrlByZipcode: getStaticMapUrlByZipcode  
        };
        
    }());
}());