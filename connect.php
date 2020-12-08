<?php
    $type       = $_POST['type'];
    $servername = "localhost";
    $username   = "root";
    $password   = "";
    $dbname     = "synerry";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    if($type == "insert"){
        $domain     = $_POST['domain'];
        $shortURL   = $_POST['shortURL'];

        $sql = "INSERT INTO linkurl (domain_name, short_name)
        VALUES ('".$domain."', '".$shortURL."')";

        if (mysqli_query($conn, $sql)) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
    }
    if($type == "getData"){
        $sql = "SELECT * FROM linkurl";
        $result = mysqli_query($conn, $sql);

        $resultArray = array();
        while($data = mysqli_fetch_array($result,MYSQLI_ASSOC)){
            array_push($resultArray,$data);
        }
        echo json_encode($resultArray);
    }

    mysqli_close($conn);
?>