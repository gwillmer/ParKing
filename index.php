<?php

	
	if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
		$uri = 'https://';
	} else {
		$uri = 'http://';
	}
	$uri .= $_SERVER['HTTP_HOST'];
	header('Location: '.$uri.'/dashboard/');
	//exit;
	

	// ----- original php above ------ //


	header('Access-Control-Allow-Origin: *');
	header('Allow: GET, POST, OPTIONS')
	$servername = "localhost";
	$username   = "root";
	$password   = "password";
	$dbname     = "parKingV2";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	
	//echo "Connected successfully";
	$sql = "SELECT * FROM user";
	$result = mysqli_query($conn,$sql);
	$myArray = array();
	if ($result->num_rows > 0) {
	// output data of each row
		while($row = $result->fetch_assoc()) {
			$myArray[] = $row;
		}
		print json_encode($myArray);
	} 
	else 
	{
		echo "0 results";
	}
?>

