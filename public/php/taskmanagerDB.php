<?php

$operation = $_POST["operation"];
$DB = new Database();
if ($operation === "READ") echo json_encode($DB->read(null));
if ($operation === "READ-PREVIOUS") echo json_encode($DB->read($_POST['date']));
if ($operation === "SAVE-TIME") $DB->save_time($_POST["taskId"],$_POST["timeUpdate"]);
if ($operation === "ADD-TASK") echo($DB->add_task($_POST["task"]));
if ($operation === "GET-DATES") echo json_encode($DB->get_days_list());
exit();


class Database{
 
    private $host = "sql11.freesqldatabase.com";
    private $db_name = "sql11175678";
    private $username = "sql11175678";
    private $password = "r9mkD8izLA";
    private $tasks_table = "tasks";
    private $times_table = "timetracker";
    private $date;
    private $conn;

    function __construct(){
    	$this->conn = $this->getConnection();
        $this->date = date('Y-m-d');
    }
 
    public function getConnection(){
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }

    public function read($date_var){
        $query_tasks = "SELECT id, title, time FROM $this->tasks_table";
        if($date_var) $query_time = "SELECT * FROM $this->times_table WHERE datestring = '$date_var'";
        else $query_time = "SELECT * FROM $this->times_table WHERE datestring = '$this->date'";
        

        $stmt = $this->conn->prepare($query_tasks);
        $stmt->execute();
        $stmt2 = $this->conn->prepare($query_time);
        $stmt2->execute();

        $data_return = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
	        $data_return[$row['id']] = array(
		    	'id' => $row["id"],
		    	'title' => $row["title"],
		    	'time' => 0,
		    );
	    }
	    while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
	        $data_return[$row2['taskid']]["time"] =  $row2['time'];
	    }
	    $this->conn = null;
        return $data_return;
    }

    public function save_time($id,$time){
    	$find_query = "SELECT time FROM $this->times_table WHERE taskid = $id AND datestring = '$this->date'";
    	$find = $this->conn->prepare($find_query);
        $find->execute();
        $current_time = $find->fetchcolumn();

        if (!$current_time) $query = "INSERT INTO $this->times_table (taskid, datestring, time) VALUES ($id,'$this->date',$time)";  
       	else $query = "UPDATE $this->times_table SET time = $current_time + $time WHERE taskid = $id and datestring = '$this->date'";
 		
	    $stmt = $this->conn->prepare($query);

	    if($stmt->execute()){
	    	$this->conn = null;
	        return true;
	    }
	 
	 	$this->conn = null;
	    return false;
    }

    public function add_task($task){
    	$task = htmlspecialchars(strip_tags($task));
    	$query = "INSERT INTO $this->tasks_table (title) VALUES('$task')";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
            return $this->conn->lastInsertId();
        }else{
            return null;
        }
    }

    public function get_days_list(){
    	$query = "SELECT DISTINCT datestring FROM $this->times_table ORDER BY datestring DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $dates = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
	        $dates[] = $row['datestring'];
	    }
	    return $dates;
    }


}



?>