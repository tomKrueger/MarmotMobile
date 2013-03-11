app.Models = app.Models || {};


app.Models.Globals = function() {
    'use strict';
    var self = this;
    
    self.currentGeoPosition = ko.observable(); 
    
};

app.Models.Community = function() {
	'use strict';
    var self = this;
    
    self.id = ko.observable();
    self.name = ko.observable();
    self.imageUrl = ko.observable();
    self.geoPosition = ko.observable();
    
    //self.pageUrl = ko.computed(function() {
    //    return "community.html" + createQueryString(self.id(), self.name());
    //});  
       
    self.distance = ko.observable();
    
    // TODO: Figure out how to only report changes to dependancies without this internalDistance.
    // One options is to prevent the dependancies from triggering this to recompute.  When setting global current position only set it if it has changed.
    self.internalDistance = ko.computed(function() {
        
        if (!self.geoPosition()) { return; }
        
        var dist = calculateDistanceFromCurrent(self.geoPosition());       
        console.log("Dist-Community (" + self.name() + "): " + dist);
    
        if (self.distance() != dist)
            self.distance(dist);
        
        return dist;
    });
    
    self.distanceDisplay = ko.computed(function() {
        
        if (!self.distance) return;
        
        return formatDistance(self.distance());   
    });
    
}; /* End Model */

app.Models.Location = function() {
	'use strict';
    var self = this;
    
    self.id = ko.observable();
    self.name = ko.observable();
    self.imageUrl = ko.observable();
    self.geoPosition = ko.observable();
    
    self.distance = ko.computed(function() {
        
        if (!self.geoPosition()) { return; }
        
        return calculateDistanceFromCurrent(self.geoPosition());       
        
    });
       
}; /* End Model */

app.Models.Offer = function() {
	'use strict';

    var self = this;
    
    self.id = ko.observable();
    self.name = ko.observable();
    self.imageUrl = ko.observable();
    self.locationGeoPosition = ko.observable();
    
    self.distance = ko.observable();
    
    // TODO: Figure out how to only report changes to dependancies without this internalDistance.
    // One options is to prevent the dependancies from triggering this to recompute.  When setting global current position only set it if it has changed.
    self.internalDistance = ko.computed(function() {
        
        if (!self.locationGeoPosition()) { return; }
        
        var dist = calculateDistanceFromCurrent(self.locationGeoPosition());       
        console.log("Dist-Offer (" + self.name() + "): " + dist);
    
        if (self.distance() != dist)
            self.distance(dist);
        
        return dist;
    });
    
    self.distanceDisplay = ko.computed(function() {
        
        if (!self.distance) return;
        
        return formatDistance(self.distance());   
    });
    
       
}; /* End Model */