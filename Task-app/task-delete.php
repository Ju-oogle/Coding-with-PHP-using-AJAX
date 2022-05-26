<?php

include('database.php'); //conecto con la DB

if(isset($_POST['id'])) { 
  $id = $_POST['id']; //guardo el valor id que me fue enviado por metodo post en la var $id
  $query = "DELETE FROM task WHERE id = $id"; 
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "Task Deleted Successfully";  

}

?>
