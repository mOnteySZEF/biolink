<?php
$viewsFile = 'views.json';

if (!isset($_COOKIE['viewed'])) {
    setcookie('viewed', uniqid(), time() + 365 * 24 * 60 * 60, '/', '', false, true);
    
    if (file_exists($viewsFile)) {
        $data = json_decode(file_get_contents($viewsFile), true);
        $data['views']++;
        file_put_contents($viewsFile, json_encode($data));
    } else {
        $data = ['views' => 1];
        file_put_contents($viewsFile, json_encode($data));
    }
} else {
    if (file_exists($viewsFile)) {
        $data = json_decode(file_get_contents($viewsFile), true);
    } else {
        $data = ['views' => 1];
    }
}

echo json_encode($data);
?>