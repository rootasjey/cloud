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
				return new Response($request);
			}
			return new Response($request);
    }
    catch (Exception $e) {
      die('Erreur : ' . $e->getMessage());
    }
  }

	public function loginAction() {
		$login = $_POST["login"];
		$password = $_POST["password"];

		$response = new Response('DONE', Response::HTTP_OK);
		return new Response($response);
		// try {
		// 	$bdd  = mysql_connect("localhost", "root", "");
		// 	$db   = mysql_select_db("cloud");
		// 	$sql  = "INSERT INTO users(name, password)
		// 					VALUES( '$login', '$password')";
		//
		// 	$request = mysql_query($sql, $bdd) or die(mysql_error());
		//
		// 	if($request) {
		//
		// 	}
		// 	return new Response(true);
		// }
		// catch (Exception $e) {
		// 	die('Erreur : ' . $e->getMessage());
		// }
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

			// $json = new JsonResponse();
			// $json->setData($users);
			$json = new Response();
			// $json->setContent(json_encode(array(
			// 	'data' => 123,
			// )));
			$json->setContent(json_encode($users));
			$json->headers->set('Content-Type', 'application/json');

			$request->closeCursor(); // Termine le traitement de la requête
			// return new Response($json, Response::HTTP_OK);
			return $json;
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}
}
