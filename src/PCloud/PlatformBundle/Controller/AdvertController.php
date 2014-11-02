<?php

namespace PCloud\PlatformBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;


class AdvertController extends Controller
{
	public function indexAction() {
		$content = $this->get('templating')->render('PCloudPlatformBundle:Advert:index.html.twig');
		return new Response($content);
  }

  public function signupAction()
  {
    $login = $_POST["login"];
    $password = $_POST["password"];

    try {
      // $bdd = new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
      $bdd  = mysql_connect("localhost", "root", "");
      $db   = mysql_select_db("cloud");
      $sql  = "INSERT INTO users(name, password)
              VALUES( '$login', '$password')";

      $request = mysql_query($sql, $bdd) or die(mysql_error());

      if($request) echo("Insertion succès!");
			return new Response(true);

    }
    catch (Exception $e) {
      die('Erreur : ' . $e->getMessage());
    }
  }

	public function loginAction()
	{
		$login = $_POST["login"];
		$password = $_POST["password"];

		try {
			$bdd  = mysql_connect("localhost", "root", "");
			$db   = mysql_select_db("cloud");
			$sql  = "INSERT INTO users(name, password)
							VALUES( '$login', '$password')";

			$request = mysql_query($sql, $bdd) or die(mysql_error());

			if($request) echo("Insertion succès!");
			return new Response(true);
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
	}
}
