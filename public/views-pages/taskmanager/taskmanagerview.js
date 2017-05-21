/* The task manager view builds the page layout for the task manager and timer */

var TaskManagerView = Backbone.View.extend({

    el : '#pagecontainer',

    events: {
        "keyup #selecttask" : "selectTaskByText",
        "click .task-list-item" : "selectTaskFromList",
        "click #clearselecttasktext" : "clearSelectTaskText",
        "click #addanewtask" : "addNewTask",
        // Time functions
        "click #timecounterbutton" : "controlTaskTimer",
        "click #timerexitbutton" : "closeTaskTimer",
    },

    initialize: function() {
        this.taskView = new TaskView({model: this.model}); 
        this.timerView = new TimerView({model: this.model}); 
    },

    processRouteChange : function() {
    },

    /* 
    Initial render of the task list 
    - Render the HTML partial
    - Pass the full list of tasks from the model
    */
    render: function() {
        var self = this;
        $.when(this.model.loadTasksFromDB()).then(function(){
            self.$el.html(htmlpartials.taskmanager);
            self.taskView.render('.taskmanagercontainer',  self.model.get("tasks"));
        });
    },

    selectTaskByText: _.debounce(function(){
        $('.emptytasklist').hide();
        var input = $('#selecttask').val();
        var filteredTasks = this.model.get("tasks").filter(function(value,i){
            return value.title.toLowerCase().includes(input.toLowerCase())
        });

        if (filteredTasks.length === 1 && filteredTasks[0].title === input) {
            this.model.set("currentTask",filteredTasks[0]);
            this.taskView.emptyTheTaskList();
            this.timerView.render('.timercontainer');
            $('.classcontrolcontainer').hide();
        } else if (filteredTasks.length === 0) {
            $('.emptytasklist').show();
            this.model.set("currentTask",null);
            this.taskView.buildTheTaskList([]);
            this.timerView.emptyTimer();
            $('.classcontrolcontainer').show();
        }  else {
            this.taskView.buildTheTaskList(filteredTasks);
            this.timerView.emptyTimer();
            $('.classcontrolcontainer').show();
        }

    }, 500),

    selectTaskFromList: function(e){
        console.log(this);
        var idTag = $(e.target).hasClass('task-list-item') ? $(e.target).attr('id') : $(e.target).parent().attr('id');
        var id = parseInt(idTag.replace("task-id-",""));
        var task = this.model.get("tasks").filter(function(value,i){
            return parseInt(value.id) === id;
        });
        this.model.set("currentTask",task[0]);
        this.timerView.render('.timercontainer');
        this.taskView.emptyTheTaskList();
        $('.classcontrolcontainer').hide()
    },

    addNewTask: function(){
        var self = this;
        var newTask = $('#newtask').val();

        $.when(this.model.addNewTaskToDB(newTask)).then(function(){
            self.render();
        });
        
    },



    /* Clears the inputted text and resets the task list */

    clearSelectTaskText : function(){
        $('#selecttask').val('');
        $('.emptytasklist').hide();
        this.taskView.buildTheTaskList(this.model.get("tasks"));
        this.timerView.emptyTimer();
    },

    /* External timer events */

    controlTaskTimer: function(){
        this.model.set("timerrunning",!this.model.get("timerrunning"));
        this.timerView.controlTaskTimerButtons();
        this.timerView.controlTaskTimer();
        $('.classcontrolcontainer').hide()
    },

    closeTaskTimer: function(){
        $('#selecttask').val('');
        this.taskView.buildTheTaskList(this.model.get("tasks"));
        this.timerView.emptyTimer();
        $('.classcontrolcontainer').show();
    },


});