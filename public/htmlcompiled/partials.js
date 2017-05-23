var htmlpartials = {};

htmlpartials["header"] = "<h2>Simple work timer application</h2>";

htmlpartials["nav"] = "\n" +
   "<a class=\"navitem\" navid=\"taskmanager\"  href=\"#/taskmanager\">Task Manager</a>\n" +
   "<a class=\"navitem\" navid=\"tasksummary\"  href=\"#/tasksummary\">Task Summary</a>\n" +
   "<a class=\"navitem\" navid=\"taskadmin\"  href=\"#/taskadmin\">Delete Old Tasks</a>\n" +
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

htmlpartials["admintablerow"] = "<tr>\n" +
   "    <td class=\"adrow-task\"></td> \n" +
   "    <td class=\"adrow-controls\"></td>\n" +
   " </tr>\n" +
   "";

htmlpartials["taskadmin"] = "<div class=\"taskadminpage\">\n" +
   "\n" +
   "	Here you can remove your old finished tasks or change their name.\n" +
   "\n" +
   "	<div class=\"taskadmintable\">\n" +
   "\n" +
   "\n" +
   "		<table class=\"admin-table-body\">\n" +
   "		</table>\n" +
   "	</div>\n" +
   "\n" +
   "</div>";

htmlpartials["taskmanager"] = "<div id=\"taskmanagerpage\">\n" +
   "\n" +
   "    <div class=\"imagecontainer\">\n" +
   "    	<img src=\"randomDirectory/images/taskspage/tasks.jpg\">\n" +
   "    </div>\n" +
   "\n" +
   "    <div class=\"classcontrolcontainer\">\n" +
   "	    <p> Welcome to your task manager.</p>\n" +
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

htmlpartials["summarytablerow"] = "<tr>\n" +
   "    <td class=\"strow-ranking\"></th>\n" +
   "    <td class=\"strow-task\"></th> \n" +
   "    <td class=\"strow-time\"></th>\n" +
   " </tr>\n" +
   "";

htmlpartials["tasksummary"] = "<div class=\"tasksumamrypage\">\n" +
   "\n" +
   "	<div class=\"summary-table\">\n" +
   "\n" +
   "		<label for=\"selectday\">Select a different day</label>\n" +
   "		<select id=\"selectday\">\n" +
   "		</select>\n" +
   "\n" +
   "\n" +
   "		<table class=\"summary-table-body\">\n" +
   "			<tr>\n" +
   "			    <th>Ranking</th>\n" +
   "			    <th>Task</th> \n" +
   "			    <th>Time</th>\n" +
   "			 </tr>\n" +
   "		</table>\n" +
   "	</div>\n" +
   "\n" +
   "</div>";
