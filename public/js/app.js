$('#home').live('pagecreate', function(e){
    // register a swipe left event
    $('body').bind('swipeleft', null);
    $('body').bind('swiperight', null);
    
    $.mobile.changePage('#availableListPage');
});

$('#availableListPage').live('pagecreate', function(e){
    // initialize the list
    initList();
    
    // register a swipe left event
    $('body').bind('swipeleft', function(e) {
        // transition to shopping list page
        $.mobile.changePage('#shoppingListPage');
    });
    
    $("#addItemButton").click(function(e){
        var label = $("#newItemInput").val();
    
        addItem(label, true);
    });
});

$('#shoppingListPage').live('pagecreate', function(e){
    // register a swipe left event
    $('body').bind('swiperight', function(e) {
        // transition to available list page
        $.mobile.changePage('#availableListPage', { transition: 'slide', reverse: true});
    });
});

function initList() {
    var itemsStr = "Paine,Apa,Branza,Fructe",
        itemsArr = itemsStr.split(",").sort(),
        availableList = $("#availableListNew");
    
    for(i=0; i<itemsArr.length; i++) {
        addItem(itemsArr[i]);
    }
}

function addItem(label, refresh) {
    var li = $(document.createElement("li")).append(label);
     
    $("#availableListNew").append(li);
    
    if (refresh !== null && refresh === true) {
        $("#availableListNew").availablelist('refresh');
    }
}
