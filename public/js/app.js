$(document).ready(function() {
    $("#addItemButton").click(function(e){
        var label = $("#newItemInput").val();
        addItem(label, true);
        $("#newItemInput").val("");
        
        $("#availableListNew").availablelist("persist");
    });
    
     $("#newItemInput").live('keypress', function(e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $("#addItemButton").click();
        }
     });
});

$('#home').live('pagecreate', function(e){
    // register a swipe left event
    $('body').bind('swipeleft', null);
    $('body').bind('swiperight', null);
    
    $.mobile.changePage('#availableListPage');
});

$('#availableListPage').live('pagecreate', function(e){
    // register a swipe left event
    $('body').bind('swipeleft', function(e) {
        // transition to shopping list page
        $.mobile.changePage('#shoppingListPage');
    });
});

$('#availableListPage').live('pagebeforeshow', function(e){
    $("#availableListNew").availablelist("restoreState", true);
});

$('#availableListPage').live('pagebeforehide', function(e){
    $('#availableListNew').availablelist("saveState");
});

$('#shoppingListPage').live('pagecreate', function(e){
    // register a swipe left event
    $('body').bind('swiperight', function(e) {
        // transition to available list page
        $.mobile.changePage('#availableListPage', { transition: 'slide', reverse: true});
    });
});

$('#shoppingListPage').live('pagebeforeshow', function(e){
    $("#shoppingList").shoppinglist("restoreState");
    $("#shoppingList").shoppinglist("refresh");
});

$('#shoppingListPage').live('pagebeforehide', function(e){
    $("#shoppingList").shoppinglist("saveState");
});

function addItem(label, refresh) {
    var li = $(document.createElement("li")).text(label);
     
    $("#availableListNew").append(li);
    
    if (refresh !== null && refresh === true) {
        $("#availableListNew").availablelist("refresh");
    }
}
