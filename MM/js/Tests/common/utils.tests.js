module( "common/utils" );

test( "getQueryStringParms", function() {    
  //deepEqual(getQueryStringParms("domain.com"), {});
  deepEqual(getQueryStringParms("domain.com?id=1"), { id: "1"});
  deepEqual(getQueryStringParms("domain.com?id=1&name=Something Else"), { id: "1", name: "Something Else" });
});
