<?php

include('database.php');

// si recibe el dato enviado en el metodo ajax de app.js
$search = $_POST['search']; //almacena el valor recibido de la peticion ajax
if(!empty($search)) { // si la consulta no llegó vacía 
  $query = "SELECT * FROM task WHERE name LIKE '$search%'"; // no solo nombre exacto sino los que se le parezcan
  $result = mysqli_query($connection, $query);
  
  if(!$result) { //si no consigo rta de la DB
    die('Query Error' . mysqli_error($connection)); //error de consulta
  }
  
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'name' => $row['name'],
      'description' => $row['description'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}

?>