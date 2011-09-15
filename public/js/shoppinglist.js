(function($, undefined) {
$.widget("kaimono.shoppinglist", $.mobile.widget, {
    options: {
        persistenceLocation: "kaimono",
        initSelector: ":jqmData(role='shoppinglist')"
    },
    
    _create: function() {
        var that = this;
        
        this.element.addClass("ui-listview ui-listview-inset ui-corner-all ui-shadow");
        this._state_restore();
        this.refresh();
/*        
        $(window).unload(function(){ 
            that._state_save();
        });
*/
    },
    
    refresh: function() {
        var that = this,
            li = this.element.children("li"),
            itemClass = "ui-li ui-li-static ui-body-c ui-li-has-icon",
            iconClass = "ui-li-icon ui-icon ui-icon-checkbox-off ui-li-thumb",
            item;
        
        for (var i=0, l = li.length; i < l; i++ ) {
            item = li.eq(i);
            
            // we use the class "ui-li" to mark the item as part of the list
            if (!item.hasClass("ui-li")) {
                item.addClass(itemClass);
                
                item.bind("taphold", function(e) {
                    $(e.currentTarget).remove();
                });
            }
        }
        this._refreshCorners();
    },
    
    _refreshCorners: function() {
        var li = this.element.children("li");
        
        li.removeClass("ui-corner-top");
        li.removeClass("ui-corner-bottom");
        
        li.first().addClass("ui-corner-top");    
        li.last().addClass("ui-corner-bottom");
    },
    
    appendItem: function(label, refresh) {
        this.element.children("li").last()
            .removeClass("ui-corner-bottom");
        
        var li = $(document.createElement("li")).text(label)
            .addClass("ui-corner-bottom");
    
        this.element.append(li);
    },
    
    _state_save: function() {
        var liArr = this.element.children("li"),
            strShopping = "";
        
        $.each(liArr, function(index, li){
            li = $(li);
            if (strShopping.length > 0)
                strShopping += ",";
            strShopping += li.text();
        });
        
        $.localStorage.set(this.options.persistenceLocation + "sh", strShopping);
    },
    
    _state_restore: function() {
        var strItems = $.localStorage.get(this.options.persistenceLocation + "sh"),
            that = this,
            li;
        
        alert(strItems);
        
        if (strItems == null || strItems.length <= 0)
            return;
            
        $.each(strItems.split(","), function(index, value){
            li = $("<li>").text(value);
            $(that.element).append(li);
        });
    }
});

//auto self-init widgets
$(document).bind( "pagecreate create", function(e){
    $($.kaimono.shoppinglist.prototype.options.initSelector, e.target).shoppinglist();
});

})(jQuery);