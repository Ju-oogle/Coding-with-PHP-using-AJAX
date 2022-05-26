<?php

  include('database.php');

if(isset($_POST['name'])) { // si existe una variable que viene atraves del metodo post con una prop. llamada 'name'
  # echo $_POST['name'] . ', ' . $_POST['description'];
  $task_name = $_POST['name']; // var que almacena el valor del post
  $task_description = $_POST['description'];
  $query = "INSERT into task (name, description) VALUES ('$task_name', '$task_description')"; //insertar en los campos, los valores
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }

  echo "Task Added Successfully";  

}

?>