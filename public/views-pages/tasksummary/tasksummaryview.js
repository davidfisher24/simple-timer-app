

var TaskSummaryView = Backbone.View.extend({

    el : '#pagecontainer',

    events: {
    	"change #selectday" : "changeDaySelect",
    },

    initialize: function() {
    },

    render: function(dayChange) {
        this.$el.html(htmlpartials.tasksummary); 
        this.$table = $('.summary-table-body');
        this.buildTable();
        this.model.get("dayOptions").forEach(function(opt){
			$('#selectday').append('<option value="'+opt+'">'+opt+'</option>')
		});
    },


    buildTable: function(dayChange){
    	var self = this;
    	this.$table.empty();
    	var tasks = !dayChange ? this.model.getRankedTasks(this.model.get("tasks")) : this.model.getRankedTasks(dayChange);
    	var date = !dayChange ? this.model.get("date") : $('#selectday').val();

    	if (tasks.length === 0) return;
    	var totalTimeToday = 0;
    	tasks.forEach(function(t,i){
    		if (parseInt(t.time) !== 0) {
	    		var temp = $(htmlpartials.summarytablerow);
	    		temp.find('td.strow-ranking').append(i + 1);
	            temp.find('td.strow-task').append(t.title);
	            temp.find('td.strow-time').append(self.model.secondsToTimeObject(t.time));
	            self.$table.append(temp);
	            totalTimeToday = totalTimeToday + parseInt(t.time);
	        }
    	});

    	var finalTemp = $(htmlpartials.summarytablerow);
    	finalTemp.find('td.strow-task').append('TOTAL FOR ' + date);
        finalTemp.find('td.strow-time').append(self.model.secondsToTimeObject(totalTimeToday));
        self.$table.append(finalTemp);

    },

    changeDaySelect:function(){
    	var self = this;
    	var day = $('#selectday').val();
    	$.when(this.model.loadTasksFromPreviousDay(day)).then(function(response){
    		var tasks = [];
			for (var key in response) tasks.push(response[key]); 
			self.buildTable(tasks);
    	})
    },

    processRouteChange : function() {
    }

});