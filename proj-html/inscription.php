<?php
session_start();
$bdd = new PDO('mysql:host=localhost;dbname=users;charset=utf8','root','root');

if(isset($_POST['envoi'])){
    if(!empty($_POST['pseudo']) AND !empty($_POST['mdp'])){
        $pseudo = htmlspecialchars($_POST['pseudo']);
        $mdp = sha1($_POST['mdp']);

        // Vérifier si le pseudo existe déjà
        $checkUser = $bdd->prepare('SELECT * FROM users WHERE pseudo = ?');
        $checkUser->execute(array($pseudo));

        if($checkUser->rowCount() > 0){
            echo 'Ce pseudo existe déjà. Veuillez vous reconnecter ou choisir un autre pseudo.';
        } else {
            // Insérer le nouvel utilisateur
            $insertUser = $bdd->prepare('INSERT INTO users(pseudo, mdp) VALUES(?, ?)');
            $insertUser->execute(array($pseudo, $mdp));

            // Récupérer les informations de l'utilisateur nouvellement inséré
            $recupUser = $bdd->prepare('SELECT * FROM users WHERE pseudo = ? AND mdp = ?');
            $recupUser->execute(array($pseudo, $mdp));

            echo 'Compte créé avec succès.';
        }
    } else {
        echo 'Veuillez compléter tous les champs...';
    }
}
?>


<!DOCTYPE html>
<html>
<head>
    <title>Inscription</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="static/css/style_inscription.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">
</head>    
<body>
    <a href="index.html">acceuil</a>
    <form method="POST" action="" align="center">
        <input type="text" name="pseudo" autocomplete="off">
        </br>
        <input type="password" name="mdp" autocomplete="off">
        
        <br/><br/>

        <input type="submit" name="envoi">


    </form>
</body>
</html>