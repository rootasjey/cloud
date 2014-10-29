<?php

namespace PCloud\PlatformBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

//$directory = "../../Resources/stylesheets";
//require "scsshp/scss.inc.php";
//scss_server::serveFrom($directory);
// SassCompiler::run("scss/", "css/");

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
}
