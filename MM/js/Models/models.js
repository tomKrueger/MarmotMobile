app.Models = app.Models || {};

app.Models.Community = function() {
	'use strict';
    var self = this;
    
    self.id = ko.observable();
    self.name = ko.observable();
    self.imageUrl = ko.observable();
    
    //self.pageUrl = ko.computed(function() {
    //    return "community.html" + createQueryString(self.id(), self.name());
    //});  
       
}; /* End Model */

app.Models.Location = function() {
	'use strict';
    var self = this;
    
    self.id = ko.observable();
    self.name = ko.observable();
    self.imageUrl = ko.observable();
       
}; /* End Model */

app.Models.Offer = function() {
	'use strict';

    var name = ko.observable(),
        imageUrl = ko.observable(),
        distance = ko.observable();   
    
       
}; /* End Model */