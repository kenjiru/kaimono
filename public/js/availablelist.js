(function($, undefined) {
$.widget("kaimono.availablelist", $.mobile.widget, {
    options: {
        initSelector: ":jqmData(role='availablelist')"
    },
    
    _create: function() {
        var that = this;
        
        this.element.addClass("ui-listview ui-listview-inset ui-corner-all ui-shadow");
        this._state_restore();
        this.refresh();
        
        $(window).unload(function(){ 
            that._state_save();
        });
    },
    
    refresh: function() {
        var li = this.element.children("li"),
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
        var li = this.element.children("li"),
            strItems = "";
        
        $.each(li, function(index, value){
            if (index !== 0)
                strItems += ",";
            strItems += $(value).text();
        });
        
        $.localStorage.set(this.element.attr("id") + "av", strItems);
    },
    
    _state_restore: function() {
        var strItems = $.localStorage.get(this.element.attr("id") + "av"),
            that = this,
            li;
        
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
    $($.kaimono.availablelist.prototype.options.initSelector, e.target).availablelist();
});

})(jQuery);