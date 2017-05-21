var TaskManagerModel = Backbone.Model.extend({

	defaults: {
		tasks: [],
		currentTask:null,
		timerrunning: false,
		currenttimer: 0,
	},

	initialize:function(){

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
				self.set("tasks",data);
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


});