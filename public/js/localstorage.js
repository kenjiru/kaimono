(function($, undefined){
    var storageEngine,
        backend,
        localStorage = {
            set: function(key, value) {
                storageEngine[key] = value;
            },
            
            get: function(key) {
                var value = storageEngine[key];
                
                if (typeof (value) === "undefined")
                    value = null;
                    
                return value;
            }
        };
    
    /**
     * Determine the storage engine
     */
    function _init() {
        // Firefox fails when touching localStorage and cookies are disabled
        
        // Check if browser supports localStorage */
        if("localStorage" in window){
            try {
                if(window.localStorage) {
                    storageEngine = window.localStorage;
                    backend = "localStorage";
                }
            } catch(e) {}
        }
        // Check if browser supports globalStorage 
        else if("globalStorage" in window){
            try {
                if(window.globalStorage) {
                    storageEngine = window.globalStorage[window.location.hostname];
                    backend = "globalStorage";
                }
            } catch(e) {}
        }
    }

    $.localStorage = localStorage;

    // initialize the library
    _init();
})(jQuery);