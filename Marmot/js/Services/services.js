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
        
        var _communities = [
            { id: 1, name: "Lake Country", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060544, long: -88.405606 } },
            { id: 2, name: "Wauwatosa", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_3-07.png", geoPosition: { lat: 43.048111, long: -88.002376 } },
            { id: 3, name: "Galena", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_1-07.png", geoPosition: { lat: 42.421705, long: -90.43896 } },
            { id: 4, name: "Door County", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_1-07.png", geoPosition: { lat: 45.12732, long: -87.244449 } }
        ];
        
        //
        // Retrieves community.
        //
        var get = function (communityId, successCallback) {
            
            var found;

            for(var i = 0; i < _communities.length; i++) {
                if (_communities[i].id === parseInt(communityId)) {
                    found = _communities[i];    
                    break;
                }                
            }
            
            successCallback(found);
        };    

        var getNearByCommunities = function (position, successCallback) {
            successCallback(_communities);
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
            { communityId: 1, id: 2, name: "Revere's Wells St. Tavern", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060544, long: -88.405606 }, address: "111 Main St.<br />Delafield, WI" },
            { communityId: 1, id: 3, name: "Mazatlan", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.071679, long: -88.420738 } },
            { communityId: 1, id: 4, name: "Great Harvest Bread", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060152, long: -88.404399 } },
            { communityId: 1, id: 5, name: "Tony & Mia's", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060434, long: -88.405279 } },
            { communityId: 2, id: 6, name: "Cafe Hollander", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.049287, long: -88.007504 } },
            { communityId: 2, id: 7, name: "Leff's Lucky Town", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.048611, long: -88.002441 } },
            { communityId: 2, id: 8, name: "Locker's Floral", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060577, long: -88.023231 } },
            //{ communityId: 2, id: 9, name: "", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 0, long: 0 } },
            { communityId: 3, id: 0, name: "Galena Brewing Company", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 42.421705, long: -90.43896 } },
            { communityId: 3, id: 11, name: "DeSoto House Hotel", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 42.415266, long: -90.42991 } },
            { communityId: 4, id: 15, name: "The Cookery", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.127388, long: -87.244578 } },
            { communityId: 4, id: 16, name: "Door County Lighthouse Inn", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.12732, long: -87.244449 } },
            { communityId: 4, id: 17, name: "Village Cafe", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.055591, long: -87.280283 } }
        ];
        
        //
        // Retrieves location.
        //
        var get = function (locationId) {
            for(var i = 0; i < locations.length; i++) {
                                
                if (locations[i].id === parseInt(locationId)) {
                    return locations[i];
                }                
            }
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
                { id: 1, locationId: 2, name: "Buy 1 Get 1 Free @ Stone Creek", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_3-08.png", type: "BarCode", usedCount: 1077, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." },
                { id: 2, locationId: 3, name: "10% Off Your Entire Meal", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "Discount", usedCount: 9, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." },
                { id: 3, locationId: 2, name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "CouponCode" , usedCount: 11099, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." },
                { id: 4, locationId: 2, name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "BarCode", usedCount: 108, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." },
                { id: 5, locationId: 2, name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "BarCode", usedCount: 10, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." }
            ];
        
        var load = function() {
            offers.forEach(function(offer) {
                var location = app.Services.Location.get(offer.locationId);                
                if (location) {
                    offer.locationName = location.name;
                    offer.geoPosition = location.geoPosition;
                    offer.address = location.address;
                }
            });
        };
        
        //
        // Retrieves offer.
        //
        var get = function (offerId, successCallback) {
            offers.forEach(function(offer) {
                if (offer.id === parseInt(offerId))
                    successCallback(offer);
            });
        };    

        var getNearByOffers = function (zipCode, successCallback) {

            successCallback(offers);
        };
        
        var getByCommunityId = function (communityId, successCallback) {

            app.Services.Location.getByCommunityId(communityId, function(locationsDto) {
            
                var offers = [];
            
                locationsDto.forEach(function(locationDto) {
                    var locationOffers = getByLocationId(locationDto.id, function(offersDto) {
                        offers.pushAll(offersDto);    
                    });                    
                });
    
                successCallback(offers);
                
            });
        };

        var getByLocationId = function (locationId, successCallback) {

            var arr = [];
            
            offers.forEach(function(offerDto) {
                
                if (offerDto.locationId === parseInt(locationId))
                    arr.push(offerDto);                
            });

            successCallback(arr);
        };
        
        load();
        
        return {
            get: get,
            getNearByOffers: getNearByOffers,
            getByCommunityId: getByCommunityId,
            getByLocationId: getByLocationId
        };

    }());
    
    app.Services.Map = (function () {
        
        var getStaticMapUrlByZipcode = function(centerCoords, userLocation, communities, locations, successCallback) {
            
            var center;
            if (centerCoords.coords) {
                center = "&center={0},{1}".format(centerCoords.coords.latitude, centerCoords.coords.longitude);    
            } else {
                center = "&center={0},{1}".format(centerCoords.lat, centerCoords.long);    
            }
            
            var markers = "&markers=color:green%7Clabel:%7C{0},{1}".format(userLocation.coords.latitude, userLocation.coords.longitude);
            
            if (communities) {
                for (var i = 0; i < communities.length - 1; i++) {
                   markers = markers + "&markers=size:mid%7Ccolor:blue%7Clabel:{0}%7C{1},{2}".format(i + 1, communities[i].geoPosition().lat, communities[i].geoPosition().long);                
                }
            }
            
            if (locations) {
                for (i = 0; i < locations.length - 1; i++) {
                    markers = markers + "&markers=size:tiny%7Ccolor:yellow%7Clabel:{0}%7C{1},{2}".format(i + 1, locations[i].geoPosition().lat + 0.1, locations[i].geoPosition().long);                
                }
            }
            
            // Calculate Zoom.
            var zoom = 6;
            if (locations && locations.length > 0) { zoom = 10; }
            
            var url = "http://maps.googleapis.com/maps/api/staticmap?zoom={0}&size=600x200&maptype=roadmap&sensor=false".format(zoom) + center + markers;            
            
            app.logger.verbose("MapUrl: " + url);
            
            successCallback(url);
        };
        
        return {
          getStaticMapUrlByZipcode: getStaticMapUrlByZipcode  
        };
        
    }());
}());