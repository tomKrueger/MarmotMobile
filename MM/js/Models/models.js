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
       
    self.distance = ko.computed(function() {
        
        if (!self.geoPosition()) { return; }
        
        return calculateDistanceFromCurrent(self.geoPosition());       
        
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
    
    self.distance = ko.computed(function() {
        
        if (!self.locationGeoPosition()) { return; }
        
        return calculateDistanceFromCurrent(self.locationGeoPosition());       
        
    });
    
       
}; /* End Model */