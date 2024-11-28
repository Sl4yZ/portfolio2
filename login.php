<?php
// Activer les erreurs PHP
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();
$message = ''; // Variable pour stocker les messages d'erreur ou de succès

try {
    $bdd = new PDO('mysql:host=localhost;dbname=users;charset=utf8;', 'root', '');
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

if (isset($_POST['submit'])) {
    if (!empty($_POST['identifiant']) && !empty($_POST['mots_de_passe'])) {
        $pseudo = htmlspecialchars($_POST['identifiant']);
        $mpd = sha1($_POST['mots_de_passe']);

        $recupuser = $bdd->prepare('SELECT * FROM user WHERE username = ? AND password = ?');
        $recupuser->execute(array($pseudo, $mpd));

        if ($recupuser->rowCount() > 0) {
            $_SESSION['pseudo'] = $pseudo;
            $_SESSION['password'] = $mpd;
            $_SESSION['id'] = $recupuser->fetch()['id'];
            header('Location: index.html');

        } else {
            $message = "Votre mot de passe ou pseudo est incorrect.";
        }
    } else {
        $message = "Veuillez compléter tous les champs.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="static/css/styl_login.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/boxicon@2.1.4/css/boxicons.min.css" rel="stylesheet">
    <title>Login</title>
</head>
<body>
<div class="enveloppe">
    <form action="" method="post">
        <h1>Connexion</h1>
        <?php if (!empty($message)): ?>
            <p style="color: red;"><?php echo $message; ?></p>
        <?php endif; ?>
        <div class="input-box">
            <input type="text" name="identifiant" placeholder="Identifiant" required>
        </div>
        <div class="input-box">
            <input type="password" name="mots_de_passe" placeholder="Mot de passe" required>
        </div>
        <div class="se-souvenir-de-moi">
            <label><input type="checkbox">Se souvenir de moi</label>
            <a href="#">Mot de passe oublié ?</a>
        </div>
        <button type="submit" name="submit" class="btn">Login</button>
        <div class="lien-inscription">
            <p>Vous n'avez pas de compte ? <a href="inscription.php">Inscription</a></p>
        </div>
    </form>
</div>
</body>
</html>
