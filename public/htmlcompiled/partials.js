var htmlpartials = {};

htmlpartials["header"] = "<h2>Simple work timer application</h2>";

htmlpartials["nav"] = "\n" +
   "<!--\n" +
   "    make sure each nav item has an attribute navid where the value of navid matches the route for that page\n" +
   "    updateNavActive()  in navview.js   uses navid to identify the correct item to add a selected state to\n" +
   "-->\n" +
   "\n" +
   "\n" +
   "<a class=\"navitem\" navid=\"taskmanager\"  href=\"#/taskmanager\">Task Manager</a>\n" +
   "<a class=\"navitem\" navid=\"tasksummary\"  href=\"#/tasksummary\">Task Summary</a>\n" +
   "";

htmlpartials["structure"] = "<div id=\"appContainer\">\n" +
   "    <div id=\"headercontainer\"></div>\n" +
   "    <div id=\"navcontainer\"></div>\n" +
   "    <div id=\"pagecontainer\"></div>\n" +
   "    <div id=\"footercontainer\"></div>\n" +
   "    <div id=\"modalcontainer\"></div>\n" +
   "    <div id=\"loadercontainer\"></div>\n" +
   "</div>";

htmlpartials["taskheader"] = "<div class=\"taskheader\">\n" +
   "    <span class=\"tasktitle\">My current Tasks</span>\n" +
   "    <br>\n" +
   "    <span class=\"emptytasklist\">No tasks found</span>\n" +
   "</div>";

htmlpartials["taskitem"] = "<tr class=\"task-list-item\">\n" +
   "    <td class=\"task-title\"></td>\n" +
   "    <td class=\"task-time\"></td>\n" +
   "</tr>\n" +
   "";

htmlpartials["timer"] = "<div class=\"timer\">\n" +
   "	<span class=\"tasktimertitle\">Work On This Task</span>\n" +
   "	<br>\n" +
   "	<span class=\"currenttasktitle\"></span>\n" +
   "	<div id=\"timecounter\">\n" +
   "		<span class=\"timepart\"></span>\n" +
   "		<span class=\"seperator\">:</span>\n" +
   "		<span class=\"timepart\"></span>\n" +
   "		<span class=\"seperator\">:</span>\n" +
   "		<span class=\"timepart\"></span>\n" +
   "	</div>\n" +
   "	<button id=\"timecounterbutton\" class=\"btn btn-green\">Start Work</button>\n" +
   "	<button id=\"timerexitbutton\" class=\"btn btn-blue\">Close Timer</button>\n" +
   "</div>";

htmlpartials["taskmanager"] = "<div id=\"taskmanagerpage\">\n" +
   "\n" +
   "    <div class=\"imagecontainer\">\n" +
   "    	<img src=\"randomDirectory/images/taskspage/tasks.jpg\">\n" +
   "    </div>\n" +
   "\n" +
   "    <div class=\"classcontrolcontainer\">\n" +
   "	    <p> Welcome to your task manager</p>\n" +
   "	    <label for=\"selecttask\">Find a task</label>\n" +
   "	    <input type=\"text\" id=\"selecttask\" />\n" +
   "	    <button id=\"clearselecttasktext\" class=\"btn btn-blue\">Clear</button>\n" +
   "	    <br>\n" +
   "	    <p> Or select from the list of tasks below</p>\n" +
   "	    <label for=\"newtask\">Add a new task </label>\n" +
   "	    <input type=\"text\" id=\"newtask\" />\n" +
   "	    <button id=\"addanewtask\" class=\"btn btn-blue\">Add</button>\n" +
   "	    <div class=\"taskmanagercontainer\"></div>\n" +
   "	</div>\n" +
   "\n" +
   "\n" +
   "    <div class=\"timercontainer\"></div>\n" +
   "    \n" +
   "\n" +
   "</div>";

htmlpartials["tasksummary"] = "<div class=\"tasksumamrypage\">\n" +
   "\n" +
   "	<div class=\"summary-table\">\n" +
   "	</div>\n" +
   "\n" +
   "</div>";
