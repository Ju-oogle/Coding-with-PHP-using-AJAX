<?php

echo 'Hello world!';

if(isset($_POST)){
    echo "received" . $_POST['username'];
}

?>