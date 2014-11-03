<?php

/* PCloudPlatformBundle:Advert:index.html.twig */
class __TwigTemplate_1b45d33a1085d8fa53ed75458174904bdc8c096539d2cd5ac85b2a3714157e39 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>
<html>
\t<head>
\t\t<title>Cloud</title>
\t\t<script src=\"";
        // line 5
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/js/jquery-2.1.1.min.js"), "html", null, true);
        echo "\"></script>
\t\t<script src=\"";
        // line 6
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/js/main.js"), "html", null, true);
        echo "\"></script>
\t\t<link href=\"";
        // line 7
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/css/style.css"), "html", null, true);
        echo "\" rel=\"stylesheet\" />
\t\t<link href=\"";
        // line 8
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/css/index.css"), "html", null, true);
        echo "\" rel=\"stylesheet\" />
\t\t<link rel=\"icon\" type=\"icon/ico\" href=\"";
        // line 9
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("favicon.ico"), "html", null, true);
        echo "\">
\t</head>

\t<body>
\t\t<div class=\"main-ui\">
\t\t\t<div class=\"header\">
\t\t\t\t<div class=\"menu\">
\t\t\t\t\t<img class=\"menu-item\" func=\"search\" src=\"";
        // line 16
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/icon/search.png"), "html", null, true);
        echo "\" alt=\"search\" />
\t\t\t\t\t<img class=\"menu-item\" func=\"help\" src=\"";
        // line 17
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/icon/help-filled.png"), "html", null, true);
        echo "\" alt=\"help\" />
\t\t\t\t</div>

\t\t\t\t<div class=\"title\">CLOUD</div>
\t\t\t\t<div class=\"subtitle\">A more personal one</div>
\t\t\t</div>

\t\t\t<div class=\"middle\">
\t\t\t\t<!-- MESSAGE PANEL -->
\t\t\t\t<div class=\"message-panel\">
\t\t\t\t\t<!-- Close icon -->
\t\t\t\t\t<!-- <img class=\"icon\" src=\"";
        // line 28
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/icon/cancel-white.png"), "html", null, true);
        echo "\" alt=\"cancel\" /> -->

\t\t\t\t\t<div class=\"message-panel-content\">
\t\t\t\t\t\t<!-- Message pane's content goes there -->
\t\t\t\t\t</div>
\t\t\t\t</div>

\t\t\t\t<!-- SEARCH PANEL\t -->
\t\t\t\t<div class=\"search-panel\">
\t\t\t\t\t<form id=\"searchform\" action=\"/\" method=\"post\">
\t\t\t\t\t\t<div class=\"form-title\">Search files and folders</div>
\t\t\t\t\t\t<img class=\"icon-button\" func=\"closepanel\" src=\"";
        // line 39
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/icon/cancel-white.png"), "html", null, true);
        echo "\" alt=\"cancel\" />
\t\t\t\t\t\t<input type=\"text\" name=\"searchquery\">
\t\t\t\t\t\t<input type=\"submit\" name=\"valid\" value=\"SEARCH\">
\t\t\t\t\t</form>
\t\t\t\t</div>


\t\t\t\t<!-- CONNECTION FORM -->
\t\t\t\t<form id=\"userform\" action=\"/cloud/web/app_dev.php/signup/\" method=\"post\">
\t\t\t\t\t<img src=\"";
        // line 48
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/icon/lock.png"), "html", null, true);
        echo "\" alt=\"search\" class=\"icon\"/>

\t\t\t\t\t<!-- LOGIN INPUT -->
\t\t\t\t\t<span class=\"title\">login</span>
\t\t\t\t\t<input type=\"text\" name=\"login\" placeholder=\"John\">

\t\t\t\t\t<!-- PASSWORD INPUT -->
\t\t\t\t\t<span class=\"title\">password</span>
\t\t\t\t\t<input type=\"password\" name=\"password\" placeholder=\"superpassword\">

\t\t\t\t\t<!-- EMAIL INPUT -->
\t\t\t\t\t<div class=\"signup-section\">
\t\t\t\t\t\t<span class=\"title\">email</span>
\t\t\t\t\t\t<input type=\"email\" name=\"email\" placeholder=\"johnreese@mail.com\">
\t\t\t\t\t</div>

\t\t\t\t\t<!-- SUBMIT BUTTON -->
\t\t\t\t\t<input type=\"submit\" name=\"valid\" value=\"OKAY\">
\t\t\t\t\t<div class=\"button-function\" func=\"signup\" isactive=\"false\">Don't have an account yet?</div>

\t\t\t\t</form>
\t\t\t</div>

\t\t\t<!-- FOOTER -->
\t\t\t<div class=\"bottom\">
\t\t\t\t<div class=\"text\">
\t\t\t\t\t<span>Development 2014 - 2015 // <a href=\"https://github.com/rootasjey/cloud\">See on GitHub</a> </span><br>
\t\t\t\t\t<span>An Open Source Versailles' University Project by Master students</span> <br>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>

\t\t";
        // line 80
        if (array_key_exists("users", $context)) {
            // line 81
            echo "\t\t\t";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["users"]) ? $context["users"] : $this->getContext($context, "users")), "name", array()), "html", null, true);
            echo "
\t\t";
        }
        // line 83
        echo "\t</body>
</html>
";
    }

    public function getTemplateName()
    {
        return "PCloudPlatformBundle:Advert:index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  138 => 83,  132 => 81,  130 => 80,  95 => 48,  83 => 39,  69 => 28,  55 => 17,  51 => 16,  41 => 9,  37 => 8,  33 => 7,  29 => 6,  25 => 5,  19 => 1,);
    }
}
