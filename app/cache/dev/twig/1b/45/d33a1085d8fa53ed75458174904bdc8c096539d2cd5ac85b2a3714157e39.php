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
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/js/main.js"), "html", null, true);
        echo "\"></script>
\t\t<link href=\"";
        // line 6
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/css/style.css"), "html", null, true);
        echo "\" rel=\"stylesheet\" />
\t\t<link href=\"";
        // line 7
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/cloud/css/index.css"), "html", null, true);
        echo "\" rel=\"stylesheet\" />
\t</head>

\t<body>
\t\t<div class=\"search-panel\">
\t\t\t<span>search</span>
\t\t\t<input type=\"text\" name=\"searchinput\"/>
\t\t</div>

\t\t<div class=\"main-panel\">
\t\t\t<div class=\"main-title\">CLOUD</div>

\t\t\t<div class=\"large-square\">
\t\t\t\t<div id=\"login-panel\">
\t\t\t\t\t<form id=\"userform\" action=\"/cloud/web/app_dev.php/newuser/\" method=\"post\">
\t\t\t\t\t\t<span class=\"title\">login</span>
\t\t\t\t\t\t<input type=\"text\" name=\"login\">

\t\t\t\t\t\t<span class=\"title\">password</span>
\t\t\t\t\t\t<input type=\"text\" name=\"password\">
\t\t\t\t\t\t<input type=\"submit\" name=\"valid\" value=\"login now\">
\t\t\t\t\t</form>
\t\t\t\t</div>
\t\t\t</div>

\t\t\t<div class=\"medium-square\">

\t\t\t</div>
\t\t\t<div class=\"medium-square\">

\t\t\t</div>
\t\t</div>

\t\t";
        // line 40
        if (array_key_exists("users", $context)) {
            // line 41
            echo "\t\t\t";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["users"]) ? $context["users"] : $this->getContext($context, "users")), "name", array()), "html", null, true);
            echo "
\t\t";
        }
        // line 43
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
        return array (  77 => 43,  71 => 41,  69 => 40,  33 => 7,  29 => 6,  25 => 5,  19 => 1,);
    }
}
