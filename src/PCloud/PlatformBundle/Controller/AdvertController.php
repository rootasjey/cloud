<?php

namespace PCloud\PlatformBundle\Controller;

use Symfony\Component\HttpFoundation\Response;

class AdvertController {
  public function indexAction() {
    return new Response("Hello World!");
  }
}
