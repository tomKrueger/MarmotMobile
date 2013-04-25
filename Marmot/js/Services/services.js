var app = app || {};
app.Services = app.Services || {};

//
// Services are a proxy to the backend REST APi's.
//
// Services are implemented using the Module Revealing Pattern.
// The TestServicesProxy is instantiated in app.js.
// Example Usage:
//    var nearbyCommunities = app.Services.Community.getNearByCommunities(zipCode);
//
(function () {
    'use strict';

    app.Services.TestServicesProxy = function() {
            
        var Community = (function () {
            
            var _communities = [
                { id: 1, name: "Lake Country", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/LakeCountry.png", geoPosition: { lat: 43.060544, long: -88.405606 } },
                { id: 2, name: "Wauwatosa", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/Wauwatosa.png", geoPosition: { lat: 43.048111, long: -88.002376 } },
                { id: 3, name: "Galena", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/Galena.png", geoPosition: { lat: 42.421705, long: -90.43896 } },
                { id: 4, name: "Door County", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/DoorCounty.png", geoPosition: { lat: 45.12732, long: -87.244449 } }
            ];
            
            //
            // Retrieves community.
            //
            var get = function (communityId, successCallback) {
                
                var found = internalGet(communityId);
                
                successCallback(found);
            };    
    
            var internalGet = function(communityId) {
                var found;
    
                for(var i = 0; i < _communities.length; i++) {
                    if (_communities[i].id === parseInt(communityId)) {
                        found = _communities[i];    
                        break;
                    }                
                }
                
                return found;            
            };
            
            var getNearByCommunities = function (position, successCallback) {
                successCallback(_communities);
            };
    
            return {
                get: get,
                getNearByCommunities: getNearByCommunities,
                internalGet: internalGet,
                internalCommunities: function() { return _communities; }
            };
    
        }());
        
        var Location = (function () {
        
            var locations = [
                //{ id: 1, name: "Coffee Hut", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 44, long: 87 } },
                //{ id: 3, name: "Main Place", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_1-07.png", geoPosition: { lat: 44, long: 86 } },
                { communityId: 1, id: 2, name: "Revere's Wells St. Tavern", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/Reveres.png", geoPosition: { lat: 43.060544, long: -88.405606 }, address: "111 Main St.<br />Delafield, WI" },
                { communityId: 1, id: 3, name: "Mazatlan", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.071679, long: -88.420738 } },
                { communityId: 1, id: 4, name: "Great Harvest Bread", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060152, long: -88.404399 } },
                { communityId: 1, id: 5, name: "Tony & Mia's", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/TonyMias.png", geoPosition: { lat: 43.060434, long: -88.405279 } },
                { communityId: 2, id: 6, name: "Cafe Hollander", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.049287, long: -88.007504 } },
                { communityId: 2, id: 7, name: "Leff's Lucky Town", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.048611, long: -88.002441 } },
                { communityId: 2, id: 8, name: "Locker's Floral", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060577, long: -88.023231 } },
                //{ communityId: 2, id: 9, name: "", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 0, long: 0 } },
                { communityId: 3, id: 0, name: "Galena Brewing Company", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 42.421705, long: -90.43796 } },
                { communityId: 3, id: 11, name: "DeSoto House Hotel", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 42.415266, long: -90.42991 } },
                { communityId: 4, id: 15, name: "The Cookery", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.127388, long: -87.244578 } },
                { communityId: 4, id: 16, name: "Door County Lighthouse Inn", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.12732, long: -87.244449 } },
                { communityId: 4, id: 17, name: "Village Cafe", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.055591, long: -87.280283 } }
            ];
            
            //
            // Retrieves location.
            //
            var get = function (locationId) {
                return internalGet(locationId);
            };
            
            var internalGet = function(locationId) {
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
                internalGet: internalGet,
                getByCommunityId: getByCommunityId,
                internalLocations: function() { return locations; }
            };
            
        }());
        
        var Offer = (function () {
            
            var offers = [
                    { id: 1, locationId: 2, name: "Buy 1 Get 1 Free", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_3-08.png", type: "BarCode", usedCount: 1077, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." },
                    { id: 2, locationId: 3, name: "10% Off Your Entire Meal", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "Discount", usedCount: 9, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." },
                    { id: 3, locationId: 2, name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "CouponCode" , usedCount: 11099, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." },
                    { id: 4, locationId: 7, name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "BarCode", usedCount: 108, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." },
                    { id: 5, locationId: 2, name: "Some other offer", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/offer_1-08.png", type: "BarCode", usedCount: 10, disclaimer: "Offer valid per customer that checks in. Not valid on Party Round or Traveling Sunday Factory Orders." }
                ];
            
            var load = function(locationService) {
                offers.forEach(function(offer) {
                    var location = locationService.get(offer.locationId);                
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
            
            return {
                internalLoad: load,
                get: get,
                getNearByOffers: getNearByOffers,
                getByCommunityId: getByCommunityId,
                getByLocationId: getByLocationId
            };
    
        }());
        
        var Map = (function () {
            
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
            
            var getMarkers = function(swLat, swLng, neLat, neLng, successCallback) {
                
                var markers = [];
                
                var communities = app.Services.Community.internalCommunities();
                var locations = app.Services.Location.internalLocations();
                
                if (communities) {
                    for (var i = 0; i < communities.length - 1; i++) {
                        var marker = new Object();
                        marker.code = "C" + communities[i].id;
                        marker.lat = communities[i].geoPosition.lat
                        marker.lng = communities[i].geoPosition.long
                        marker.type = 1
                        markers.push(marker);
                    }
                }
                
                if (locations) {
                    for (i = 0; i < locations.length - 1; i++) {
                        
                        var locMarker = new Object();
                        locMarker.code = "L" + locations[i].id;
                        locMarker.lat = locations[i].geoPosition.lat
                        locMarker.lng = locations[i].geoPosition.long
                        locMarker.type = 2
                        markers.push(locMarker);
                    }
                }
                
                // Simulate load taking time.
                setTimeout(function() { successCallback(markers) }, 1000);
            };
            
            var getMarkerDetails = function(code, successCallback) {
            
                
                if(code && code.length > 1) {
                
                    var details = new Object();
                    
                    switch(code[0]) {
                        case "C":
                            var community = app.Services.Community.internalGet(code.substring(1));
                            details.id = community.id;
                            details.entityCode = "C";
                            details.title = community.name;
                            details.address = community.address;
                            break;
                        case "L":
                            var location = app.Services.Location.internalGet(code.substring(1));
                            details.id = location.id;
                            details.entityCode = "L";
                            details.title = location.name;
                            details.address = location.address;
                            break;
                    }
                }
                
                setTimeout(function() { successCallback(details) }, 1000);
            };
            
            return {
              getStaticMapUrlByZipcode: getStaticMapUrlByZipcode,
              getMarkers: getMarkers,
              getMarkerDetails: getMarkerDetails
            };
            
        }());
        
        Offer.internalLoad(Location);
        
        return {
            Community: Community,
            Location: Location,
            Offer: Offer,
            Map: Map
        };
        
    }; /* End app.Services.TestServicesProxy */

}());

(function () {
    'use strict';
    
    app.Services.LiveServicesProxy = function() {
        
        //var _baseUrl = Request.Url.GetLeftPart(UriPartial.Authority) + "/api";
        //var _baseUrl = "http://localhost:2741/api";
        var _baseUrl = "http://marmotmobileapi.azurewebsites.net/api";       
            
        var Community = (function () {
            
            var _communities = [
                { id: 1, name: "Lake Country", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/LakeCountry.png", geoPosition: { lat: 43.060544, long: -88.405606 } },
                { id: 2, name: "Wauwatosa", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/Wauwatosa.png", geoPosition: { lat: 43.048111, long: -88.002376 } },
                { id: 3, name: "Galena", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/Galena.png", geoPosition: { lat: 42.421705, long: -90.43896 } },
                { id: 4, name: "Door County", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/DoorCounty.png", geoPosition: { lat: 45.12732, long: -87.244449 } }
            ];
            
            //
            // Retrieves community.
            //
            var get = function (communityId, successCallback) {
                
                var client = new JsonServiceClient(_baseUrl);
                client.getFromService("communities/" + communityId, null,
                    function(e) {
                        var found = e.result[0];
                        successCallback(found);
                    },
                    function(e) {
                        app.logger.error("Services.Community.get({0})".format(communityId));
                    }
                );
                
            };    
    
            var internalGet = function(communityId) {
                var found;
    
                for(var i = 0; i < _communities.length; i++) {
                    if (_communities[i].id === parseInt(communityId)) {
                        found = _communities[i];    
                        break;
                    }                
                }
                
                return found;            
            };
            
            var getNearByCommunities = function (position, successCallback) {
                
                var lat = 0;
                var long = 0;
                
                // If position isn't passed, let the server decide what is near by, by passing zeros.
                if (position && position.coords) {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                }
                
                var client = new JsonServiceClient(_baseUrl);
                client.getFromService("communities?lat={0}&long={1}".format(lat, long), null,
                    function(e) {
                        var found = e.result;
                        successCallback(found);
                    },
                    function(e) {
                        app.logger.error("Services.Community.getNearByCommunities()");
                    }
                );
            };
    
            return {
                get: get,
                getNearByCommunities: getNearByCommunities,
                internalGet: internalGet,
                internalCommunities: function() { return _communities; }
            };
    
        }());
        
        var Location = (function () {
        
            var locations = [
                //{ id: 1, name: "Coffee Hut", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 44, long: 87 } },
                //{ id: 3, name: "Main Place", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_1-07.png", geoPosition: { lat: 44, long: 86 } },
                { communityId: 1, id: 2, name: "Revere's Wells St. Tavern", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/Reveres.png", geoPosition: { lat: 43.060544, long: -88.405606 }, address: "111 Main St.<br />Delafield, WI" },
                { communityId: 1, id: 3, name: "Mazatlan", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.071679, long: -88.420738 } },
                { communityId: 1, id: 4, name: "Great Harvest Bread", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060152, long: -88.404399 } },
                { communityId: 1, id: 5, name: "Tony & Mia's", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/TonyMias.png", geoPosition: { lat: 43.060434, long: -88.405279 } },
                { communityId: 2, id: 6, name: "Cafe Hollander", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.049287, long: -88.007504 } },
                { communityId: 2, id: 7, name: "Leff's Lucky Town", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.048611, long: -88.002441 } },
                { communityId: 2, id: 8, name: "Locker's Floral", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 43.060577, long: -88.023231 } },
                //{ communityId: 2, id: 9, name: "", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 0, long: 0 } },
                { communityId: 3, id: 0, name: "Galena Brewing Company", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 42.421705, long: -90.43796 } },
                { communityId: 3, id: 11, name: "DeSoto House Hotel", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 42.415266, long: -90.42991 } },
                { communityId: 4, id: 15, name: "The Cookery", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.127388, long: -87.244578 } },
                { communityId: 4, id: 16, name: "Door County Lighthouse Inn", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.12732, long: -87.244449 } },
                { communityId: 4, id: 17, name: "Village Cafe", imageUrl: "https://dl.dropbox.com/u/3153188/MM/Graphics/AppContentImages/home_nearby_2-07.png", geoPosition: { lat: 45.055591, long: -87.280283 } }
            ];
            
            //
            // Retrieves location.
            //
            var get = function (locationId) {
                return internalGet(locationId);
            };
            
            var internalGet = function(locationId) {
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
                
                var client = new JsonServiceClient(_baseUrl);
                client.getFromService("locations?communityId=" + communityId, null,
                    function(e) {
                        var found = e.result;
                        successCallback(found);
                    },
                    function(e) {
                        app.logger.error("Services.Location.getByCommunityId({0})".format(communityId));
                    }
                );
                
            };
            
            return {
                get: get,
                internalGet: internalGet,
                getByCommunityId: getByCommunityId,
                internalLocations: function() { return locations; }
            };
            
        }());
        
        var Offer = (function () {
            
            var load = function(locationService) {
            };
            
            //
            // Retrieves offer.
            //
            var get = function (offerId, successCallback) {
                
                var client = new JsonServiceClient(_baseUrl);
                client.getFromService("offers/" + offerId, null,
                    function(e) {
                        var found = e.result[0];
                        successCallback(found);
                    },
                    function(e) {
                        app.logger.error("Services.Offer.get({0})".format(offerId));
                    }
                );
                
            };    
    
            var getNearByOffers = function (position, successCallback) {
    
                var lat = 0;
                var long = 0;
                
                // If position isn't passed, let the server decide what is near by, by passing zeros.
                if (position && position.coords) {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                }
                
                var client = new JsonServiceClient(_baseUrl);
                client.getFromService("offers?lat={0}&long={1}".format(lat, long), null,
                    function(e) {
                        var found = e.result;
                        successCallback(found);
                    },
                    function(e) {
                        app.logger.error("Services.Offer.getNearByOffers()");
                    }
                );
                
            };
            
            var getByCommunityId = function (communityId, successCallback) {
    
                var client = new JsonServiceClient(_baseUrl);
                client.getFromService("offers?communityId=" + communityId, null,
                    function(e) {
                        var found = e.result;
                        successCallback(found);
                    },
                    function(e) {
                        app.logger.error("Services.Offer.getByCommunityId({0})".format(communityId));
                    }
                );
                
            };
    
            var getByLocationId = function (locationId, successCallback) {
    
                var client = new JsonServiceClient(_baseUrl);
                client.getFromService("offers?locationId=" + locationId, null,
                    function(e) {
                        var found = e.result;
                        successCallback(found);
                    },
                    function(e) {
                        app.logger.error("Services.Offer.getByLocationId({0})".format(locationId));
                    }
                );
                
            };
            
            return {
                get: get,
                getNearByOffers: getNearByOffers,
                getByCommunityId: getByCommunityId,
                getByLocationId: getByLocationId
            };
    
        }());
        
        var Map = (function () {
            
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
            
            var getMarkers = function(swLat, swLng, neLat, neLng, successCallback) {
                
                var markers = [];
                
                var communities = app.Services.Community.internalCommunities();
                var locations = app.Services.Location.internalLocations();
                
                if (communities) {
                    for (var i = 0; i < communities.length - 1; i++) {
                        var marker = new Object();
                        marker.code = "C" + communities[i].id;
                        marker.lat = communities[i].geoPosition.lat
                        marker.lng = communities[i].geoPosition.long
                        marker.type = 1
                        markers.push(marker);
                    }
                }
                
                if (locations) {
                    for (i = 0; i < locations.length - 1; i++) {
                        
                        var locMarker = new Object();
                        locMarker.code = "L" + locations[i].id;
                        locMarker.lat = locations[i].geoPosition.lat
                        locMarker.lng = locations[i].geoPosition.long
                        locMarker.type = 2
                        markers.push(locMarker);
                    }
                }
                
                // Simulate load taking time.
                setTimeout(function() { successCallback(markers) }, 1000);
            };
            
            var getMarkerDetails = function(code, successCallback) {
            
                
                if(code && code.length > 1) {
                
                    var details = new Object();
                    
                    switch(code[0]) {
                        case "C":
                            var community = app.Services.Community.internalGet(code.substring(1));
                            details.id = community.id;
                            details.entityCode = "C";
                            details.title = community.name;
                            details.address = community.address;
                            break;
                        case "L":
                            var location = app.Services.Location.internalGet(code.substring(1));
                            details.id = location.id;
                            details.entityCode = "L";
                            details.title = location.name;
                            details.address = location.address;
                            break;
                    }
                }
                
                setTimeout(function() { successCallback(details) }, 1000);
            };
            
            return {
              getStaticMapUrlByZipcode: getStaticMapUrlByZipcode,
              getMarkers: getMarkers,
              getMarkerDetails: getMarkerDetails
            };
            
        }());
        
        return {
            Community: Community,
            Location: Location,
            Offer: Offer,
            Map: Map
        };
        
    }; /* End app.Services.LiveServicesProxy */
    
}());

