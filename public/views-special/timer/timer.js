
var TimerView = Backbone.View.extend({


    initialize: function() {
    },

    

    render: function( cssselector ) {
        this.$el = $(cssselector);
        this.$el.empty();

        this.$el.append(htmlpartials['timer']);

        this.$elOptions = $('<div class="options"></div>').appendTo(this.$el);

        var task = this.model.get("currentTask");
        $('.timercontainer').show();
        $('.currenttasktitle').html(task.title);


        var timeObject = this.model.secondsToTimeObject(task.time).split(":");
        timeObject.forEach(function(part,i){
            $('.timepart').eq(i).html(part);
        })
    },

    

    controlTaskTimerButtons : function(){
        if (this.model.get("timerrunning")){
            $('#timecounterbutton').html('Stop Work').removeClass('btn-green').addClass('btn-red');
            $('#timerexitbutton').hide();
        } else {
            $('#timecounterbutton').html('Start Work').removeClass('btn-red').addClass('btn-green');
            $('#timerexitbutton').show();
            this.model.saveTimeToDB();
        }
    },

    controlTaskTimer : function(){ 
        var self = this;
        var timerInterval = setInterval(
            function(){
                if (self.model.get("timerrunning")){
                    var task = self.model.get("currentTask");
                    var timer = self.model.get("currenttimer");
                    task.time++;
                    timer++;
                    self.model.set("currentTask",task);
                    self.model.set("currenttimer",timer);
                    self.render();
                }else{
                    clearInterval(timerInterval);
                }
            }, 1000);
    },



    emptyTimer: function(){
        $('.timercontainer').hide();
    },

});