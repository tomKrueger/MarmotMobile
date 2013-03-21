//
// Global knockoutJs
//
(function() {
	'use strict';

	var ENTER_KEY = 13;

    //
	// A custom binding to handle the enter key (could go in a separate library)
    //
	ko.bindingHandlers.enterKey = {
		init: function( element, valueAccessor, allBindingsAccessor, data ) {
			var wrappedHandler, newValueAccessor;

			// wrap the handler with a check for the enter key
			wrappedHandler = function( data, event ) {
				if ( event.keyCode === ENTER_KEY ) {
					valueAccessor().call( this, data, event );
				}
			};

			// create a valueAccessor with the options that we would want to pass to the event binding
			newValueAccessor = function() {
				return {
					keyup: wrappedHandler
				};
			};

			// call the real event binding's init function
			ko.bindingHandlers.event.init( element, newValueAccessor, allBindingsAccessor, data );
		}
	};

    //
	// Wrapper to hasfocus that also selects text and applies focus async
    //
	ko.bindingHandlers.selectAndFocus = {
		init: function( element, valueAccessor, allBindingsAccessor ) {
			ko.bindingHandlers.hasfocus.init( element, valueAccessor, allBindingsAccessor );
			ko.utils.registerEventHandler( element, 'focus', function() {
				element.focus();
			});
		},
		update: function( element, valueAccessor ) {
			ko.utils.unwrapObservable( valueAccessor() ); // for dependency
			// ensure that element is visible before trying to focus
			setTimeout(function() {
				ko.bindingHandlers.hasfocus.update( element, valueAccessor );
			}, 0);
		}
	};
    
    //
    // Here's a custom Knockout binding that makes elements shown/hidden via jQuery's fadeIn()/fadeOut() methods
    // Usage: 
    // <p data-bind='fadeVisible: displayXyz'>
    // where dispalyXyz is an observable like displayXyz = ko.observable(false);
    //
    ko.bindingHandlers.fadeVisible = {
        init: function(element, valueAccessor) {
            // Initially set the element to be instantly visible/hidden depending on the value
            var value = valueAccessor();
            $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
        },
        update: function(element, valueAccessor) {
            // Whenever the value subsequently changes, slowly fade the element in or out
            var value = valueAccessor();
            ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
        }
    };
    
    //
    // Function to push multiple items into an observableArray and only notify dependancies
    // one time.
    // This can significantly reduce the recalculation of all dependancies when adding multiple items.
    //
    // In addition, passing true for shouldRemoveAll will remove all items from the array first.  Removing 
    // and adding will only fire a single notification.
    //
    ko.observableArray.fn.pushAll = function(valuesToPush, shouldRemoveAll) {
        var underlyingArray = this();
        this.valueWillMutate();
        
        if (shouldRemoveAll) {
            underlyingArray.splice(0, underlyingArray.length);
        }
        
        ko.utils.arrayPushAll(underlyingArray, valuesToPush);
        
        this.valueHasMutated();
        return this;
    };
    
    // http://knockoutjs.com/documentation/extenders.html
    // Example: this.firstName = ko.observable("Bob").extend({logChange: "first name"});
    ko.extenders.logChange = function(target, option) {
        target.subscribe(function(newValue) {
           console.log(option + ": " + newValue);
        });
        return target;
    };
    
}());