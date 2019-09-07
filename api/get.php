<?php
    $name =  htmlspecialchars($_GET["name"]);

    header("Access-Control-Allow-Origin: *");
    if( $name == 'words'){
        include 'words.json';
    }
    exit();
?>