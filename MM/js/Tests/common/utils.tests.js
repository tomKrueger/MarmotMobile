module( "common/utils" );

test( "getQueryStringParms", function() {    
  //deepEqual(getQueryStringParms("domain.com"), {});
  deepEqual(getQueryStringParms("domain.com?id=1"), { id: "1"});
  deepEqual(getQueryStringParms("domain.com?id=1&name=Something Else"), { id: "1", name: "Something Else" });
});

test("calculateDistance", function() {
    
    // Expected values matched with calculator on http://www.nhc.noaa.gov/gccalc.shtml
    // The calculation may not be exact.  The earth is slightly wider than tall, but not represented here.
    
    equal(utils.Geo.calculateDistanceInMiles(0, 0, 0, 0), 0, "Zero Distance");
    equal(utils.Geo.calculateDistanceInMiles(-90, 0, 90, 0).toFixed(), 12428, "Max Latitude Distance.  South Pole to North Pole.  Half the circumference of the earth.");
    equal(utils.Geo.calculateDistanceInMiles(0, 0, 0, 180).toFixed(), 12428, "Max Longituded Distance.  Half the circumference of earth.");
    
});