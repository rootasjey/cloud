<?php

namespace PCloud\PlatformBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;


class AdvertController extends Controller
{
	public function indexAction() {
		$content = $this->get('templating')->render('PCloudPlatformBundle:Advert:index.html.twig');
		return new Response($content);
  	}

	public function signupAction() {
		$login 		= $_POST["login"];
		$password = $_POST["password"];
			$email 		= $_POST["email"];

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO users(name, password, email)
			      VALUES( '$login', '$password', '$email')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				return new Response("OK");
			}
				return new Response("FAIL");
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}

	public function loginAction() {
		// Récupère les champs du formulaire
		$login = $_POST["login"];
		$password = $_POST["password"];

		try {
			// Connexion à la bdd puis récupère l'utilisateur grâce au login
			$bdd = new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request = $bdd->query("SELECT * FROM users WHERE name ='" . $login . "'");

			$user = Array();
			array_push($user, $request->fetch());
			$request->closeCursor(); // Termine le traitement de la requête

			$json = new JsonResponse();

			// Vérifie que les mots de passe coïncident
			if ($user[0]["password"] == $password) {
				$json->setData($user);
			}

			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}

	//viewusers
	public function viewusersAction(){
		try {
			$bdd = new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request = $bdd->query('SELECT * FROM users');

			$users = Array();

			while ($v = $request->fetch()) {
				array_push($users, $v);
			}

			$json = new JsonResponse();
			$json->setData($users);
			$request->closeCursor(); // Termine le traitement de la requête

			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}
}
