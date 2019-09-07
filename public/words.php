<?php
$last_mod = isset($_GET['last_mod'])
 ?  htmlspecialchars($_GET['last_mod'])
 : '0';
 echo $last_mod;
 exit;
 ?>