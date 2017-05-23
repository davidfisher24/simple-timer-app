

// ROUTER INITIALIZE

routerSetupConfig.initialize = function() {
    this.status.currentPage = this.status.lastPage = this.status.currentRoute = null;

    // the following views will self render on init
    this.headerView = new HeaderView();
    this.navView = new NavView();

    this.taskManagerModel = new TaskManagerModel();

    this.taskSummaryView = new TaskSummaryView({model:this.taskManagerModel});
    this.taskManagerView = new TaskManagerView({model:this.taskManagerModel});
    this.taskAdminView = new TaskAdminView({model:this.taskManagerModel});



};




// ROUTER ROUTES

routerSetupConfig.routes =  {
    '(?*path)': function(f, q){ this.routeTunnel('taskmanager', this.taskManagerView, f, q) },
    'taskmanager(/*path)': function(f, q){ this.routeTunnel('taskmanager', this.taskManagerView, f, q) },
    'tasksummary(/*path)': function(f, q){ this.routeTunnel('tasksummary', this.taskSummaryView, f, q) },
    'taskadmin(/*path)': function(f, q){ this.routeTunnel('taskadmin', this.taskAdminView, f, q) },
    '*badroute': function(){ this.navigate('#', {trigger: true}); }
};




routerSetupConfig.prePageChange =  function(){
    if(this.status.currentPage === "tasksummary") {
        this.taskSummaryView.render();
    }
};


routerSetupConfig.appStatusNowReady =  function(){


};


