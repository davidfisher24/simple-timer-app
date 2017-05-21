
var TaskView = Backbone.View.extend({

    initialize: function() {
    },

    render: function( cssselector, tasks) {
        this.$el = $(cssselector);
        if (this.$el.length != 1) {
            return;
        }

        this.$el.empty();

        this.$el.append(htmlpartials['taskheader']);

        this.$elOptions = $('<table class="options"></table>').appendTo(this.$el);

        this.buildTheTaskList(tasks);

    },

    buildTheTaskList : function(tasks){
        this.$el.find('.taskheader').show();
        this.$elOptions.empty();
        var self = this;
        _.each(tasks, function(value, i){
            var temp = $(htmlpartials.taskitem);
            temp.attr('id','task-id-'+value.id);
            temp.find('td.task-title').append(value.title);
            temp.find('td.task-time').append(self.model.secondsToTimeObject(value.time));
            self.$elOptions.append(temp);
        });

    },

    emptyTheTaskList: function() {
        this.$el.find('.taskheader').hide();
        this.$elOptions.empty();
    },

    

});