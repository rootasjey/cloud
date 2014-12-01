<?php

namespace PCloud\PlatformBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;


class AdvertController extends Controller
{

	// -------------------
	// FONCTION PAR DEFAUT
	// -------------------
	// Accueil
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

		$today	 	= date("Y-m-d");

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO users(groupid, name, password, email, subscriptiondate)
			      	 VALUES('$groupid', '$login', '$password', '$email', '$today')";

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



	// ------------------------------------
	// METHODES DE VISUALISATION DE DONNEES
	// ------------------------------------
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

	// Récupère UN SEUL utilisateur
	public function viewuserAction($id) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query("SELECT FROM users WHERE id='" . $id . "'");
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

	// Récupère UN SEUL fichier
	public function viewfileAction($id) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query("SELECT FROM files WHERE id='" . $id . "'");
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


	// ---------------------------
	// METHODES D'AJOUT DE DONNEES
	// ---------------------------
	// Ajout d'un utilisateur dans la base de données
	public function adduserAction() {
		$groupid	= $_POST["group"];
		$login 		= $_POST["login"];
		$password 	= $_POST["password"];
		$email 		= $_POST["email"];

		$today	 	= date("Y-m-d");

		// --------------------
		if ($groupid === '') {
			$groupid = 3;
		}
		// --------------------

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO users(groupid, name, password, email, subscriptiondate)
			VALUES('$groupid', '$login', '$password', '$email', '$today')";

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

	// Ajout d'un fichier dans la base de données
	public function addfileAction() {
		$groupid	= $_POST["group"];
		$owner 		= $_POST["owner"];
		$path 		= $_POST["path"];
		$name 		= $_POST["name"];
		$type 		= $_POST["type"];
		$tags 		= $_POST["tags"];

		$today	 	= date("Y-m-d");

		// --------------------
		if ($groupid === '') {
			$groupid = "1"; // groupe par défaut
		}
		// --------------------

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO files(groupid, owner, path, name, type, pubDate, tags)
			VALUES('$groupid', '$owner', '$path', '$name', '$type', '$today', '$tags')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'name' => $name
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

	// Ajout d'un groupe d'utilisateurs dans la base de données
	public function addusergroupAction() {
		$title 		= $_POST["title"];

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO usersgroups(title)
					 VALUES('$title')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'title' => $title
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

	// Ajout d'un groupe de fichiers dans la base de données
	public function addfilegroupAction() {
		$title 		= $_POST["title"];

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO filesgroups(title)
					 VALUES('$title')";

     //pour créer la vue
			$sq  = "CREATE VIEW cloud. $title  . AS
			SELECT f.* FROM cloud.files f,cloud.filesgroups fg
			WHERE f.groupid=fg.id AND fg.title= '" . $title . "'";

			$request = mysql_query($sql, $bdd) or die(mysql_error());
			$request1 = mysql_query($sq, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'title' => $title
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


	// ----------------------------------
	// METHODES DE SUPPRESSION DE DONNEES
	// ----------------------------------
	// Suppression d'un utilisateur de la base de données
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

	// Suppression d'un fichier de la base de données
	public function deletefileAction($id) {
		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "DELETE FROM files WHERE id='" . $id . "'";

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

	// Suppression d'un groupe d'utilisateurs de la base de données
	public function deleteusergroupAction($id) {
		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "DELETE FROM usersgroups WHERE id='" . $id . "'";

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

	// Suppression d'un groupe de fichiers de la base de données
	public function deletefilegroupAction($id) {
		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "DELETE FROM filesgroups WHERE id='" . $id . "'";

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


	// -----------------------------------
	// METHODES DE MODIFICATION DE DONNEES
	// -----------------------------------
	public function edituser()
	{

	}


}
