var app = app || {};
app.Services = app.Services || {};


// Call by:
// var x = new myClosure2();
// x.foo();

myClosure2 = function () {
   var date = new Date();
   var myNestedFunc = function () {
       return date.getMilliseconds();    
   };
   return {
       foo: myNestedFunc  
   }  
    
};


(function () {
    'use strict';
   
    // Call by: 
    // var d = new app.myNamespace();
    // d.myPublicFunction("ddddd");
     app.myNamespace = function () {

      var myPrivateVar, myPrivateMethod;
    
      // A private counter variable
      myPrivateVar = 0;
    
      // A private function which logs any arguments
      myPrivateMethod = function( foo ) {
          console.log( foo );
      };
    
      return {
    
        // A public variable
        myPublicVar: "foo",
    
        // A public function utilizing privates
        myPublicFunction: function( bar ) {
            //alert('dd');
          // Increment our private counter
          myPrivateVar++;
    
          // Call our private method using bar
          myPrivateMethod( bar );
    
        }
      };
    
    }

}());