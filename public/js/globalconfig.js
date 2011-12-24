/**
 * Global configuration file.
 * It should be linked between "jquery.js" and "custom-scripting.js".
 */

$(document).bind("mobileinit", function() {
    // disable page transition as they are buggy on Android
    $.mobile.defaultPageTransition = 'none';
    $.mobile.page.prototype.options.addBackBtn = true;
    $.mobile.useFastClick = false;
});