(function($, undefined) {
$.widget("kaimono.availablelist", $.mobile.widget, {
    options: {
        persistenceLocation: "kaimono",
        initSelector: ":jqmData(role='availablelist')"
    },
    
    _create: function() {
        var that = this;
        
        this.element.addClass("ui-listview ui-listview-inset ui-corner-all ui-shadow");
        this.restoreState();
        this.refresh();
/*        
        $(window).unload(function(){ 
            that.saveState();
        });
*/
    },
    
    /**
     * Applies the graphical elements specific to this widget.
     * No business login here.
     */
    refresh: function() {
        var that = this,
            li = this.element.children("li"),
            itemClass = "ui-li ui-li-static ui-body-c ui-li-has-icon",
            iconClass = "ui-li-icon ui-icon ui-icon-checkbox-off ui-li-thumb",
            item, icon;
        
        for (var i=0, l = li.length; i < l; i++ ) {
            item = li.eq(i);
            
            // we use the class "ui-li" to mark the item as part of the list
            if (!item.hasClass("ui-li")) {
                item.addClass(itemClass);
                
                item.click(function(e){
                    $("img", this).toggleClass("ui-icon-checkbox-on");
                });
                
                item.bind("taphold", function(e) {
                    $(e.currentTarget).remove();
                    that._refreshCorners();
                });
            }
            
            icon = item.children("img");
            if (icon.length) {
                icon.addClass(iconClass);
            } else {
                // if the item has no icon, create one
                icon = $("<img />").addClass(iconClass);
                item.append(icon);
            }
        }
        this._refreshCorners();
    },
    
    /**
     * Refreshes corners when an item is added or removed.
     */
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
    
    /**
     * Saves the state of both available items and shopping items lists.
     */
    saveState: function() {
        var liArr = this.element.children("li"),
            strAvailable = "",
            strShopping = "";
        
        $.each(liArr, function(index, li){
            li = $(li);
            if (strAvailable.length > 0)
                strAvailable += ",";
            strAvailable += li.text();
            
            if ($("img", li).hasClass("ui-icon-checkbox-on")) {
                if (strShopping.length > 0)
                    strShopping += ",";
                strShopping += li.text();
            }
        });
        
        $.localStorage.set(this.options.persistenceLocation + "av", strAvailable);
        $.localStorage.set(this.options.persistenceLocation + "sh", strShopping);
    },
    
    /**
     * Restores the state of both available items and shopping items lists.
     */
    restoreState: function(onlyShopping) {
        var that = this,
            strAvailable = $.localStorage.get(this.options.persistenceLocation + "av"),
            strShopping = $.localStorage.get(this.options.persistenceLocation + "sh"),
            li, img,
            regExp;
            
        if (strAvailable === null || strAvailable.length <= 0)
            return;
        
        if (onlyShopping !== null && onlyShopping === true) {
            // restore only shopping state
            var liArr = this.element.children("li");
            
            $.each(liArr, function(index, li){
                regExp = new RegExp("(^|,)" + $(li).text() + "(,|$)");
                
                if (regExp.test(strShopping)) {
                    $("img", li).addClass("ui-icon-checkbox-on");
                } else {
                    $("img", li).removeClass("ui-icon-checkbox-on");
                }
            });
        } else {
            // restore everything
            $.each(strAvailable.split(","), function(index, item){
                li = $("<li/>").text(item);
                
                regExp = new RegExp("(^|,)" + $(li).text() + "(,|$)");
                if (regExp.test(strShopping)) {
                    img = $("<img/>").addClass("ui-icon-checkbox-on");
                    li.append(img);
                }
                
                $(that.element).append(li);
            });
        }
    }
});

//auto self-init widgets
$(document).bind( "pagecreate create", function(e){
    $($.kaimono.availablelist.prototype.options.initSelector, e.target).availablelist();
});

})(jQuery);