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

  public function viewAction($id)
  {
	  try {
		  $bdd = new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');

		  $response = $bdd->query('SELECT * FROM users');
		  $data = $response->fetch();

		  $content = $this->get('templating')->render('PCloudPlatformBundle:Advert:index.html.twig', array('users' => $data));
		  return new Response($content);
	  }
	  catch (Exception $e) {
		  die('Erreur : ' . $e->getMessage());
	  }

	  return new Response("Affichage de l'annonce d'id : ".$id);
  }

  public function adduserAction()
  {
    $login = $_POST["login"];
    $password = $_POST["password"];

    try {
      // $bdd = new \PDO('mysql:host=localhost;dbname=cloud', 'root', '');
      $bdd  = mysql_connect("localhost", "root", "");
      $db   = mysql_select_db("cloud");
      $sql  = "INSERT INTO users(Nom_user, Prenom_user)
              VALUES( '$login', '$password')";

      $request = mysql_query($sql, $bdd) or die(mysql_error());

      if($request) echo("Insertion succès!");

    }
    catch (Exception $e) {
      die('Erreur : ' . $e->getMessage());
    }
  }
}
