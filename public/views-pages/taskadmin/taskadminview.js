

var TaskAdminView = Backbone.View.extend({

    el : '#pagecontainer',

    events: {
        'click .delete-task' : "deleteTask",
    },

    initialize: function() {
    },

    render: function() {
        this.$el.html(htmlpartials.taskadmin); 
        this.$table = $('.admin-table-body');
        this.buildTable();
    },


    buildTable: function(e){
    	var self = this;
    	this.$table.empty();
        var tasks = this.model.get("tasks");

    	if (tasks.length === 0) return;
    	tasks.forEach(function(t,i){
    		var temp = $(htmlpartials.admintablerow);
            temp.find('td.adrow-task').append(t.title);
            temp.find('td.adrow-controls').append('<button class="btn btn-blue delete-task" id="delete-'+t.id+'">Delete</button>');
            self.$table.append(temp);
    	});
    },

    deleteTask: function(e){
        var self = this;
        $.when(this.model.deleteTaskFromDB(e.target.id.replace('delete-',''))).then(function(){
            self.buildTable();
        });
    },


    processRouteChange : function() {
    }

});