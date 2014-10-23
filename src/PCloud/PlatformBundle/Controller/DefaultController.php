<?php

namespace PCloud\PlatformBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('PCloudPlatformBundle:Default:index.html.twig', array('name' => $name));
    }
}
