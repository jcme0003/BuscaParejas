<?php
$dir = __DIR__ . '/src/share/ranking.json';
$datos_json = json_decode(file_get_contents($dir));

$user = array(
    "nombre" => $_POST["nombre"],
    "puntos" => intval($_POST["puntos"])
);
array_push($datos_json -> ranking, $user);

file_put_contents($dir, json_encode($datos_json));
$datos_json = json_decode(file_get_contents($dir));
$newJson = [];

usort($datos_json -> ranking, function($a, $b) {
    return $a->puntos > $b->puntos ? -1 : 1;
});
array_pop($datos_json -> ranking);
$newJson = json_encode($datos_json);
echo $newJson;

file_put_contents($dir, $newJson);
?>