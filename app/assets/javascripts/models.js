(function(pt) {
    
    function Resource() {
        
        var this.url = '';
        var this.data = {};
        
        // private
        function construct(url) {
            this.url = url;
        }
        
        // public
        
        
        // call constructor function to set up object.
        construct.apply(this, arguments);
    }
    
}(pt = window.pt || {}));