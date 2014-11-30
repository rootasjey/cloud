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
		$groupid 	= "3"; // groupe par défaut
		$login 		= $_POST["login"];
		$password 	= $_POST["password"];
		$email 		= $_POST["email"];

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO users(groupid, name, password, email)
			      VALUES('$groupid', '$login', '$password', '$email')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'name' => $login,
					'email'=> $email
				));

				return $response;
			}

			return new Response("fail");
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			return new Response("fail");
		}
	}

	// Connexion à la base de données
	public function loginAction() {
		// Récupère les champs du formulaire
		$login 		= $_POST["login"];
		$password 	= $_POST["password"];

		try {
			// Connexion à la bdd puis récupère l'utilisateur grâce au login
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query("SELECT * FROM users WHERE name ='" . $login . "'");

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
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT * FROM users');

			$users 		= Array();

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
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT * FROM usersgroups');

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
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT * FROM files');

			$files 		= Array();

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
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT * FROM filesgroups');

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

	//creation des utilisateurs
	public function creatuserAction() {

		try
		{
			// On se connecte � MySQL
			//$bdd = new PDO('mysql:host=localhost;', 'root', '');
		$bdd = new \PDO('mysql:host=localhost;', 'mot', 'user');
		}
		catch(Exception $e)
		{
			// En cas d'erreur, on affiche un message et on arr�te tout
				die('Erreur : '.$e->getMessage());
		}
		// GRANT SELECT ON cloud.users TO 'tt4'@localhost;

		// $requestgrant=$bdd->prepare("GRANT INSERT ON cloud.users TO 'mot'@localhost;");
		// $requestgrant->execute();

		$test1='mot';
		$test2='localhost';
		$test3='user';
		$request=$bdd->prepare("insert into cloud.users(`id`,`groupid`,`name`,`password`,`email`,`subscriptiondate`)
		value (?,?,?,?,?,?);");
		$request->execute(array(26,1,$test3,'2','1','1'));

		/*en premier*/
		$request=$bdd->prepare("CREATE user ?@? IDENTIFIED BY ?;");
		$request->execute(array($test1,$test2,$test3));
		echo "reussi";
		//$responce=$bdd->query('select * from cloud.vue1 ');
		/* while($test=$responce->fetch()){
		echo $test['name'];
		}*/


	}

	public function adduserAction() {
		$groupid 	= "3"; // groupe par défaut
		$login 		= $_POST["login"];
		$password 	= $_POST["password"];
		$email 		= $_POST["email"];

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO users(groupid, name, password, email)
			VALUES('$groupid', '$login', '$password', '$email')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'name' => $login,
					'email'=> $email
				));

				return $response;
			}

			return new Response("fail");
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			return new Response("fail");
		}
	}

	public function addfileAction() {
		$groupid 	= "1"; // groupe par défaut
		$owner 		= $_POST["owner"];
		$path 		= $_POST["path"];
		$name 		= $_POST["name"];
		$type 		= $_POST["type"];
		$tags 		= $_POST["tags"];

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO files(groupid, owner, path, name, type, tags)
			VALUES('$groupid', '$owner', '$path', '$name', '$type', '$tags')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'name' => $login,
					'email'=> $email
				));

				return $response;
			}

			return new Response("fail");
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			return new Response("fail");
		}
	}

}
