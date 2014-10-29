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
\t\t<title>Bienvenue sur le Cloud Personnel!</title>
\t</head>

\t<body>
\t\t<h1>Personal CLoud</h1>

\t\t<p> <span>FORMULAIRE</span></p>
\t  \t<p>
\t\t\tLe Hello World est un grand classique en programmation.
\t\t\tIl signifie énormément, car cela veut dire que vous avez
\t\t\tréussi à exécuter le programme pour accomplir une tâche simple :
\t\t\tafficher ce hello world !
\t\t</p>

\t\t";
        // line 18
        if (array_key_exists("users", $context)) {
            // line 19
            echo "\t\t\t";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["users"]) ? $context["users"] : $this->getContext($context, "users")), "Nom_user", array()), "html", null, true);
            echo "
\t\t";
        }
        // line 21
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
        return array (  46 => 21,  40 => 19,  38 => 18,  19 => 1,);
    }
}
