$(document).ready(function() {
    $("#addItemButton").click(function(e) {
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
        $.mobile.changePage('#shoppingListPage', { transition: 'slide' });
    });
});

$('#availableListPage').live('pageshow', function(e){
//    $("#availableListNew").availablelist("stateRestore");
//    $("#availableListNew").availablelist("refresh");
});

$('#availableListPage').live('pagebeforehide', function(e){
    $('#availableListNew').availablelist("stateSave");
});

$('#shoppingListPage').live('pagecreate', function(e){
    // register a swipe left event
    $('body').bind('swiperight', function(e) {
        // transition to available list page
        $.mobile.changePage('#availableListPage', { transition: 'slide', reverse: true });
    });
});

$('#shoppingListPage').live('pagebeforeshow', function(e){
    $("#shoppingList").shoppinglist("stateRestore");
    $("#shoppingList").shoppinglist("refresh");
});

function addItem(label, refresh) {
    var li = $(document.createElement("li")).text(label);
     
    $("#availableListNew").append(li);
    
    if (refresh !== null && refresh === true) {
        $("#availableListNew").availablelist("refresh");
    }
}
