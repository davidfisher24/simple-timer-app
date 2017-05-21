

var TaskSummaryView = Backbone.View.extend({

    el : '#pagecontainer',

    initialize: function() {
    },

    render: function() {
        this.$el.html(htmlpartials.tasksummary); 
    },

    processRouteChange : function() {
    }

});