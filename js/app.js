var noItems = 0;

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
        var id = noItems++;
        
        addItem(id, label, true);
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
    var itemsStr = "Paine,Apa,Branza,Fructe,Sapun,Pasta de dinti";
    var itemsArr = itemsStr.split(",").sort();
    
    for(i=0; i<itemsArr.length; i++) {
        addItem(i, itemsArr[i]);
    }
}

function addItem(id, label, refresh) {
    id = "item" + id;
    var li = $(document.createElement("li")).text(label);
    
    $("#availableList").append(li);
    
    if (refresh !== null && refresh === true) {
        $("#availableList").listview('refresh');
    }
        
    noItems++;
}