(function(pt) {
    "use strict";
    
    // =======================
    // = Main app controller =
    // =======================
    function AppController() {
        
        function construct() {
            
        }
        
        
        construct.apply(this, arguments); // call constructor function to set up object.
    }
    pt.AppController = AppController;
    
    
    
    // =================================
    // = Control the RESTful resources =
    // =================================
    function ResourceController() {
        
        // private
        function construct() {
            
        }
        
        // public
        
        
        // call constructor function to set up object.
        construct.apply(this, arguments);
    }
    pt.ResourceController = ResourceController;
        
}(pt = window.pt || {}));