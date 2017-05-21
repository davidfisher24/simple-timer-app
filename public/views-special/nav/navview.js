
var NavView = Backbone.View.extend({

    el : '#navcontainer',

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(htmlpartials.nav); 

    },


    updateNavActive : function(){
        var tempStr = '[navid="' + app.status.currentPage + '"]';
        this.$el.find(tempStr).addClass('active').siblings().removeClass('active');
    }


});