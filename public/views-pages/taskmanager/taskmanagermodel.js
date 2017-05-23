var TaskManagerModel = Backbone.Model.extend({

	defaults: {
		tasks: [],
		currentTask:null,
		timerrunning: false,
		currenttimer: 0,
		date: null,
		// For the table in summary
		dayOptions: [],
		// For the delete task contol
		selectedDelete: null,
	},

	initialize:function(){
		this.set("date",new Date().toJSON().slice(0,10));
		this.getDaysOptions();
	},

	getRankedTasks: function(tasks){
	
		function compare(a,b) {
			if (parseInt(a.time) < parseInt(b.time))
				return 1;
			if (parseInt(a.time) > parseInt(b.time))
				return -1;
			return 0;
		}

		rankedTasks = tasks.sort(compare);
		return rankedTasks;
	},

	secondsToTimeObject: function(totalSeconds) {
		var hours   = Math.floor(totalSeconds / 3600);
		var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
		var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

		seconds = Math.round(seconds * 100) / 100

		var result = (hours < 10 ? "0" + hours : hours);
		result += ":" + (minutes < 10 ? "0" + minutes : minutes);
		result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
		return result;
	},

	// DATABASE AJAX CALLS //

	loadTasksFromDB: function() {
		var self = this;
		var url = SiteConfig.phpUrl + "taskmanagerDB.php";
		console.log(url);
		return $.ajax(url,{
			method: "POST",
			dataType: "json",
			data: {
				operation: "READ",
			},
			success: function(data){
				var tasks = [];
				for (var key in data) tasks.push(data[key]); 
				self.set("tasks",tasks);
			},
			error:function(){
			}
		});
	},

	loadTasksFromPreviousDay: function(date) {
		var self = this;
		var url = SiteConfig.phpUrl + "taskmanagerDB.php";
		return $.ajax(url,{
			method: "POST",
			dataType: "json",
			data: {
				operation: "READ-PREVIOUS",
				date: date,
			},
			success: function(data){ 
			},
			error:function(){
			}
		});
	},

	saveTimeToDB: function() {
		var url = SiteConfig.phpUrl + "taskmanagerDB.php";

		var data = {
			operation: "SAVE-TIME",
			taskId: this.get("currentTask").id,
			timeUpdate: this.get("currenttimer"),
		};
		this.set("currenttimer",0);

		$.ajax(url,{
			method: "POST",
			data: data,
			success: function(){
			},
			error:function(){
			}
		});
	},

	addNewTaskToDB: function(newTask) {
		var self = this;
		var url = SiteConfig.phpUrl + "taskmanagerDB.php";

		var data = {
			operation: "ADD-TASK",
			task: newTask,
		};

		return $.ajax(url,{
			method: "POST",
			data: data,
			success: function(id){
				var tasks = self.get("tasks");
				tasks.push({
					id: id,
					time: 0,
					title: newTask,
				})
			},
			error:function(){
			}
		});
	},

	deleteTaskFromDB: function(id){
		var self = this;
		var url = SiteConfig.phpUrl + "taskmanagerDB.php";

		var data = {
			operation: "ERASE-TASK",
			task: id,
		};

		return $.ajax(url,{
			method: "POST",
			data: data,
			success: function(){
				var tasks = self.get("tasks");
				tasksRearranged = tasks.filter(function(t){
					console.log(t.id);
					console.log(id);
					return t.id != id;
				});
				self.set("tasks",tasksRearranged);
			},
			error:function(){
			}
		});
	},

	getDaysOptions: function(){
		var self = this;
		var url = SiteConfig.phpUrl + "taskmanagerDB.php";

		var data = {
			operation: "GET-DATES",
		};


		return $.ajax(url,{
			method: "POST",
			data: data,
			dataType: "json",
			success: function(data){
				if (data.indexOf(self.get("date")) === -1) data.unshift(self.get("date"));
				self.set("dayOptions",data);
			},
			error:function(){
			}
		});
	},


});