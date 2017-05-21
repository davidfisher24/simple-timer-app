<?php

$operation = $_POST["operation"];
$DB = new Database();
if ($operation === "READ") echo json_encode($DB->read());
if ($operation === "SAVE-TIME") $DB->save_time($_POST["taskId"],$_POST["timeUpdate"]);
if ($operation === "ADD-TASK") echo($DB->add_task($_POST["task"]));
exit();


class Database{
 
    private $host = "sql11.freesqldatabase.com";
    private $db_name = "sql11175678";
    private $username = "sql11175678";
    private $password = "r9mkD8izLA";
    private $table_name = "tasks";
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

    public function read(){
        $query = "SELECT id, title, time FROM $this->table_name";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $data_return = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
	        $data_return[] = array(
		    	'id' => $row["id"],
		    	'title' => $row["title"],
		    	'time' => $row["time"],
		    );
	    }
	    $this->conn = null;
        return $data_return;
    }

    public function save_time($id,$time){
    	$find_query = "SELECT time FROM $this->table_name WHERE id = $id LIMIT 1";
    	$find = $this->conn->prepare($find_query);
        $find->execute();
        $current_time = $find->fetchcolumn();

 		$query = "UPDATE $this->table_name SET time = $current_time + $time WHERE id = $id";
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
    	$query = "INSERT INTO $this->table_name (title) VALUES('$task')";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
            return $this->conn->lastInsertId();
        }else{
            return null;
        }
    }


}



?>