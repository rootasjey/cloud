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

			// $sql2 = "GRANT ALL ON cloud.* TO 'admin'@'localhost' IDENTIFIED BY 'admin'
			// 		WITH GRANT OPTION;";
			// $request2 = mysql_query($sql2, $bdd) or die(mysql_error());

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

		$response 	= new JsonResponse();

		try {
			// Connexion à la bdd puis récupère l'utilisateur grâce au login
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query("SELECT * FROM users WHERE name ='" . $login . "'");

			$user = Array();
			array_push($user, $request->fetch());
			$request->closeCursor(); // Termine le traitement de la requête

			// Vérifie que les mots de passe coïncident
			if ($user[0]["password"] == $password) {
				$response->setData($user);
			} 	return $response;
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			$response->setData(array(
				'error' 	=> "true",
				'message' 	=> $e->getMessage()
			)); return $response;
		}
	}

	public function getusergrantAction($groupid) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT user
									   FROM mysql.user u
									   WHERE u.user = (SELECT title
														FROM usersgroups
														WHERE id = ' . $groupid .')');

			// $request2 	= $bdd->query("GRANT ALL PRIVILEGES ON cloud.v_hiver_2014
			// 							TO 'NouvelleGen'@'localhost'");


			// Récupération des valeurs
			$userAccess = Array();

			while ($v = $request->fetch()) {
				array_push($userAccess, $v);
			}

			$json = new JsonResponse();
			$json->setData($userAccess);
			$request->closeCursor(); // Termine le traitement de la requête

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
	public function viewfilesAction($grant, $view) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', $grant, $grant);
			$request 	= $bdd->query('SELECT * FROM ' . $view); // faire en fonction de la table

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
	public function viewsingleuserAction($id) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT * FROM users WHERE id='. $id);
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
	public function viewsinglefileAction($id) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT * FROM files WHERE id=' . $id);
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

	// Récupère UN SEUL group d'utilisateur
	public function viewsingleusergroupAction($id) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT * FROM usersgroups WHERE id=' . $id);
			$usergroup 		= Array();

			while ($v = $request->fetch()) {
				array_push($usergroup, $v);
			}

			$json = new JsonResponse();
			$json->setData($usergroup);
			$request->closeCursor(); // Termine le traitement de la requête

			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}

	// Récupère UN SEUL groupe de fichiers
	public function viewsinglefilegroupAction($id) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT * FROM filesgroups WHERE id=' . $id);
			$filegroup 		= Array();

			while ($v = $request->fetch()) {
				array_push($filegroup, $v);
			}

			$json = new JsonResponse();
			$json->setData($filegroup);
			$request->closeCursor(); // Termine le traitement de la requête

			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
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

			// $request=$bd->prepare("CREATE user ?@localhost IDENTIFIED BY ?;");
			// $request->execute(array($login,$password));

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
	public function addfileAction($grant) {
		$groupid	= $_POST["group"];
		$owner 		= $_POST["owner"];
		$path 		= $_POST["path"];
		$name 		= $_POST["name"];
		$type 		= $_POST["type"];
		$tags 		= $_POST["tags"];

		$today	 	= date("Y-m-d");

		$path = addslashes($path);

		// --------------------
		if ($groupid === '') {
			$groupid = "1"; // groupe par défaut
		}
		// --------------------
		if ($owner === "") {
			$owner = "bob";
		}

		try {
			$bdd  = mysql_connect("localhost", $grant, $grant);
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO files(groupid, owner, path, name, type, pubDate, tags)
			VALUES('$groupid', '$owner', '$path', '$name', '$type', '$today', '$tags')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());


			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'name' 		=> $name,
					'groupid'	=> $groupid
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
		// $access 	= $_POST["access"];
		$response 	= new JsonResponse();

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO usersgroups(title)
					 VALUES('$title')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());
			$id = mysql_insert_id();


			if($request) {
				$response->setData(array(
					'title' 		=> $title,
					'usersgroupsid' => $id,
					// 'filesgroupsid' => $access,
					'error'			=> 'false'
				));
				return $response;
			}
			else {
				$response->setData(array(
					'title' 		=> $title,
					// 'filesgroupsid' => $access,
					'error'			=> 'true'
				));
				return $response;
			}
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			$response->setData(array(
				'title' 		=> $title,
				// 'filesgroupsid' => $access,
				'error'			=> 'true',
				'content'		=> $e->getMessage()
			));
			return $response;
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

			$request = mysql_query($sql, $bdd) or die(mysql_error());
			$id = mysql_insert_id();

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'id' => $id,
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

			$response = new JsonResponse();

			if($request) {
				// Si tout s'est bien passé
				$response->setData(array(
					'id' => $id,
					'error' => "false"
				));

				return $response;
			}
			else {
				// Sinon
				$response->setData(array(
					'id' => $id,
					'error' => "true"
				));

				return $response;
			}
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			return new Response("FAIL");
		}
	}

	// Suppression d'un fichier de la base de données
	public function deletefileAction($grant, $view, $id) {
		try {
			$bdd  = mysql_connect("localhost", $grant, $grant);
			$db   = mysql_select_db("cloud");
			$sql  = "DELETE FROM " . $view . " WHERE id='" . $id . "'";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			$response = new JsonResponse();

			if($request) {
				// Si tout s'est bien passé
				$response->setData(array(
					'id' => $id,
					'error' => "false"
				));

				return $response;
			}
			else {
				// Sinon
				$response->setData(array(
					'id' => $id,
					'error' => "true"
				));

				return $response;
			}
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			return new Response("FAIL");
		}
	}

	// Suppression d'un groupe d'utilisateurs de la base de données
	public function deleteusergroupAction($id) {
		$response = new JsonResponse();

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");

			// Appelle d'une procédure stockée
			$sql  = "CALL delete_usergroup(" . $id . ");";
			$request = mysql_query($sql, $bdd) or die(mysql_error());


			if($request) {
				// Si tout s'est bien passé
				$response->setData(array(
					'id' 	=> $id,
					'error' => "false"
				)); return $response;
			}
			else {
				// Sinon
				$response->setData(array(
					'id' 	=> $id,
					'error' => "true"
				)); return $response;
			}
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			$response->setData(array(
				'id' 		=> $id,
				'error' 	=> "true",
				'message' 	=> $e->getMessage()
			)); return $response;
		}
	}

	// Suppression d'un groupe de fichiers de la base de données
	public function deletefilegroupAction($id, $title) {
		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "DELETE FROM filesgroups WHERE id='" . $id . "'";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			$response = new JsonResponse();

			if($request) {
				// Si tout s'est bien passé
				$response->setData(array(
					'id' => $id,
					'title' => $title,
					'error' => "false"
				));

				return $response;
			}
			else {
				// Sinon
				$response->setData(array(
					'id' => $id,
					'title' => $title,
					'error' => "true"
				));

				return $response;
			}
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			return new Response("FAIL");
		}
	}


	// -----------------------------------
	// METHODES DE MODIFICATION DE DONNEES
	// -----------------------------------
	// Modification des données d'un utilisateur
	public function edituserAction() {
		$id			= $_POST["id"];
		$groupid	= $_POST["group"];
		$login 		= $_POST["login"];
		$password 	= $_POST["password"];
		$email 		= $_POST["email"];


		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "UPDATE users
					 SET name='". $login ."',
						 groupid=". $groupid .",
						 password='". $password ."',
						 email='". $email . "'
					 WHERE id=" . $id;

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

	// Modification des données d'un groupe d'utilisateurs
	public function editusergroupAction() {
		$id			= $_POST["id"];
		$title		= $_POST["title"];
		$access		= $_POST["access"];


		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "UPDATE usersgroups
					 SET title='". $title ."'
					 WHERE id=" . $id;

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'id' 	=> $id,
					'title'	=> $title,
					'access'=> $access
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


	// Modification des données d'un fichier
	public function editfileAction($grant) {
		$id			= $_POST["id"];
		$groupid	= $_POST["group"];
		$name 		= $_POST["name"];
		$path 		= $_POST["path"];
		$tags 		= $_POST["tags"];
		$type 		= $_POST["type"];


		try {
			$bdd  = mysql_connect("localhost", $grant, $grant);
			$db   = mysql_select_db("cloud");
			$sql  = "UPDATE files
					 SET groupid=". $groupid .",
					 name='". $name ."',
					 path='". $path . "',
					 tags='". $tags . "',
					 type='". $type . "'
					 WHERE id=" . $id;

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'name' => $id,
					'email'=> $name
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

	// Modification des données d'un groupe de fichiers
	public function editfilegroupAction() {
		$id			= $_POST["id"];
		$title		= $_POST["title"];


		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "UPDATE filesgroups
					 SET title='". $title ."'
					 WHERE id=" . $id;

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) {
				$response = new JsonResponse();
				$response->setData(array(
					'id' 	=> $id,
					'title'	=> $title
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



	// --------------------------
	// GESTION DES DROITS D'ACCES
	// --------------------------

	// Création d'une vue
	// On est obligé de créer la vue à part car
	// on ne peut exécuter une requête pour créer une vue contenant des var
	public function addviewAction($id, $title) {
		$_title = "v_" . $title;

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");


			$sql = "CREATE OR REPLACE
					ALGORITHM = UNDEFINED
					SQL SECURITY DEFINER
					VIEW " . htmlentities($_title) . "
					AS SELECT * FROM `files`
					WHERE groupid=". $id;

			// Exécution de la requête
			$request = mysql_query($sql, $bdd) or die(mysql_error());

			// Constitue la réponse renvoyée par le serveur
			$response = new JsonResponse();

			if($request) {
				// Si tout s'est bien passé
				$response->setData(array(
					'id' => $id,
					'title' => $_title,
					'error' => "false"
				));

				return $response;
			}
			else {
				// S'il y a eu une erreur
				$response->setData(array(
					'error' => "true"
				));
				return $response;
			}

		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			return new Response("FAIL");
		}
	}

	public function deleteviewAction($title) {
		// Constitue la réponse renvoyée par le serveur
		$response = new JsonResponse();

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");

			$sql = "DROP VIEW ". $title;
			// Exécution de la requête
			$request = mysql_query($sql, $bdd) or die(mysql_error());


			if($request) {
				// Si tout s'est bien passé
				$response->setData(array(
					'title' => $title,
					'error' => "false"
				));

				return $response;
			}
			else {
				// S'il y a eu une erreur
				$response->setData(array(
					'title' => $title,
					'error' => "true"
				));
				return $response;
			}

		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			// S'il y a eu une erreur
			$response->setData(array(
				'title' => $title,
				'error' 	=> "true",
				'message' 	=> $e->getMessage()
			));
			return $response;
		}
	}

	public function addgrantAction($user) {
		$response = new JsonResponse();

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "GRANT USAGE ON cloud.* TO '" . $user . "'@'localhost' IDENTIFIED BY '" . $user . "';";

			$request = mysql_query($sql, $bdd) or die(mysql_error());


			if($request) {
				$response->setData(array(
					'error'			=> 'false'
				));
				return $response;
			}
			else {
				$response->setData(array(
					'error'			=> 'true'
				));
				return $response;
			}
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			$response->setData(array(
			'error'			=> 'true',
			'content'		=> $e->getMessage()
			));
			return $response;
		}
	}

	public function addgrantonviewAction($user, $view) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query("GRANT SELECT, INSERT, DELETE, UPDATE ON cloud." . $view ."
			 							TO '" . $user ."'@'localhost'");

			// $request 	= $bdd->query("GRANT ALL PRIVILEGES ON cloud.*
			// 							TO '" . $user ."'@'localhost' WITH GRANT OPTION");

			// Récupération des valeurs
			if (request) {
				$response = new JsonResponse();
				$response->setData(array(
					'error'			=> 'false'
				));
				return $response;
			}
			else {
				if (request) {
					$response = new JsonResponse();
					$response->setData(array(
						'error'			=> 'true'
					));
					return $response;
				}
			}
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			if (request) {
				$response = new JsonResponse();
				$response->setData(array(
					'error'		=> 'true',
					'message'	=> $e->getMessage()
				));
				return $response;
			}
		}
	}

	public function deletegrantfromviewAction($user, $view) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query("REVOKE ALL PRIVILEGES ON cloud." . $view ."
									   FROM '" . $user ."'@'localhost'");


			// Récupération des valeurs
			if (request) {
				$response = new JsonResponse();
				$response->setData(array(
					'error'			=> 'false'
				));
				return $response;
			}
			else {
				if (request) {
					$response = new JsonResponse();
					$response->setData(array(
						'error'			=> 'true'
					));
					return $response;
				}
			}
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			if (request) {
				$response = new JsonResponse();
				$response->setData(array(
					'error'		=> 'true',
					'message'	=> $e->getMessage()
				));
				return $response;
			}
		}
	}

	// Ajout des droits d'accès
	public function addaccessAction($usersgroupsid, $filesgroupsid, $write) {
		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");

			$sql  = "INSERT INTO access(usersgroupsid, filesgroupsid)
			VALUES('$usersgroupsid', '$filesgroupsid')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());


			if($request) {
				return new Response("OK");
			}

			return new Response("fail");
		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			return new Response("fail");
		}
	}

	// Ajout des droits d'accès
	public function deleteaccessAction($usersgroupsid, $filesgroupsid) {
		$response = new JsonResponse();
		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");

			$sql  = "DELETE FROM cloud.access
			WHERE usersgroupsid=" . $usersgroupsid . "
			AND filesgroupsid =" . $filesgroupsid;

			$request = mysql_query($sql, $bdd) or die(mysql_error());


			if($request) {
				$response->setData(array(
					'usersgroupsid' => $usersgroupsid,
					'filesgroupsid'	=> $filesgroupsid,
					'error'			=> 'false'
				));
				return $response;
			}
			else {
				$response->setData(array(
					'usersgroupsid' => $usersgroupsid,
					'filesgroupsid'	=> $filesgroupsid,
					'error'			=> 'true'
				));
				return $response;
			}

		}

		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
			$response->setData(array(
				'usersgroupsid' => $usersgroupsid,
				'filesgroupsid'	=> $filesgroupsid,
				'error'		=> 'true',
				'message'	=> $e->getMessage()
			));
			return $response;
		}
	}


	public function getaccessAction($usersgroupsid) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
			$request 	= $bdd->query('SELECT * FROM access WHERE usersgroupsid='. $usersgroupsid);

			$access 	= Array();

			while ($v = $request->fetch()) {
				array_push($access, $v);
			}

			$json = new JsonResponse();
			$json->setData($access);
			$request->closeCursor(); // Termine le traitement de la requête

			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}

	public function searchAction($view, $grant, $terms) {
		try {
			$bdd 		= new \PDO('mysql:host=localhost;dbname=cloud', $grant, $grant);
			$request 	= $bdd->query("SELECT * FROM " . $view ."
									   WHERE CONTAINS(name, '". $terms) . "');";

			$access 	= Array();

			while ($v = $request->fetch()) {
				array_push($access, $v);
			}

			$json = new JsonResponse();
			$json->setData($access);
			$request->closeCursor(); // Termine le traitement de la requête

			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}

}
