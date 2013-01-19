var app = app || {};
app.Services = app.Services || {};

(function () {
    'use strict';

    app.Services.Community = function () {
        var self = this;

        self.getNearByCommunities = function () {

            var communities = [
                { name: "Delafield" },
                { name: "Something else" }
            ];

            return communities;
        };

    }; /* End */

}());