(function($, undefined) {
$.widget("kaimono.shoppinglist", $.mobile.widget, {
    options: {
        persistenceLocation: "kaimono",
        initSelector: ":jqmData(role='shoppinglist')"
    },
    
    _create: function() {
        var that = this;
        
        this.element.addClass("ui-listview ui-listview-inset ui-corner-all ui-shadow");
        this.restoreState();
        this.refresh();
       
        $(window).unload(function(){
            that.saveState();
        });
    },
    
    refresh: function() {
        var that = this,
            li = this.element.children("li"),
            itemClass = "ui-li ui-li-static ui-body-c",
            item;
        
        for (var i=0, l = li.length; i < l; i++ ) {
            item = li.eq(i);
            
            // we use the class "ui-li" to mark the item as part of the list
            if (!item.hasClass("ui-li")) {
                item.addClass(itemClass);
                
                item.bind("taphold", function(e) {
                    $(e.currentTarget).remove();
                    that._refreshCorners();
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
    
    saveState: function() {
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
    
    restoreState: function() {
        var strShopping = $.localStorage.get(this.options.persistenceLocation + "sh"),
            that = this,
            li;
        
        if (strShopping === null || strShopping === undefined)
            return;
        
        $(that.element).empty();
        
        $.each(strShopping.split(","), function(index, value){
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