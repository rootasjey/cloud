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

	// Inscription à la base de données
	public function signupAction() {
		$login 		= $_POST["login"];
		$password 	= $_POST["password"];
		$email 		= $_POST["email"];

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO users(name, password, email)
			      VALUES( '$login', '$password', '$email')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'name' => $login,
					'email'=> $email
				));

				return $response;
			}
				return new Response("FAIL");
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}

	// Connexion à la base de données
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

	// Supprime un utilisateur de la base de données
	public function deleteuserAction($id) {
		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "DELETE FROM users WHERE id='" . $id . "'";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				return new Response("OK");
			}
				return new Response("FAIL");
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			return new Response("FAIL");
		}
	}

	// Récupère les utilisateurs dans la base de données
	public function viewusersAction() {
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

	// Récupères les groupes d'utilisateurs dans la base de données
	public function viewusersgroupsAction() {
		try {
			$bdd = new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request = $bdd->query('SELECT * FROM usersgroups');

			$usersgroups = Array();

			while ($v = $request->fetch()) {
				array_push($usersgroups, $v);
			}

			$json = new JsonResponse();
			$json->setData($usersgroups);
			$request->closeCursor(); // Termine le traitement de la requête

			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}

	// Récupères la liste des fichiers dans la base de données
	public function viewfilesAction() {
		try {
			$bdd = new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request = $bdd->query('SELECT * FROM files');

			$files = Array();

			while ($v = $request->fetch()) {
				array_push($files, $v);
			}

			$json = new JsonResponse();
			$json->setData($files);
			$request->closeCursor(); // Termine le traitement de la requête

			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}

	// Récupères les groupes de fichiers dans la base de données
	public function viewfilesgroupsAction() {
		try {
			$bdd = new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request = $bdd->query('SELECT * FROM filesgroups');

			$filesgroups = Array();

			while ($v = $request->fetch()) {
				array_push($filesgroups, $v);
			}

			$json = new JsonResponse();
			$json->setData($filesgroups);
			$request->closeCursor(); // Termine le traitement de la requête

			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}
}
