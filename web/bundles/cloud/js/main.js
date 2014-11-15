// -----------------
// MAIN.JS : CLOUD
// -----------------

var _user = {
    "name" : "",
    "email": "",
    "isconnected": false
};

// Lance cette fonction quand la page est totalement chargée
window.onload = function () {
  initialize();
}

// Initialise les fonctions par défaut
function initialize() {
  defaultHoverEvents();
  defaultClickEvents();
  addDefaultTooltip();

  prepareLoginForm();
  clickCategories();
}



// DEBUT EVENEMENTS
// ----------------
// Charge les effets hover sur les éléments de la page d'index
function defaultHoverEvents() {
  // $(".main-ui .header .title").hover(
  //   function () {
  //   $(".main-ui .header").css({
  //     height: '700px'
  //   });
  // }, function () {
  //     $(".main-ui .header").css({
  //       height: '500px'
  //     });
  // });

    $("#userform .button-function[func='signup']").hover(
        function () {
          $(this).css({ textDecoration: "underline"});
        },
        function () {
          $(this).css({ textDecoration: "none" });
        }
    );

    $(".categories .square").hover(
        function () {
            $(this).css({ opacity: "1" });
        },
        function () {
            $(this).css({ opacity: "0.8" });
        }
    )
}

// Charge les événements de click sur les éléments de la page d'index
function defaultClickEvents() {
    // OUVRE/FERME the search panel
    $(".menu-item[func='search']").click(function () {
        searchClicked();
    });
    $(".icon-button[func='closepanel']").click(function () {
    var parent = $(this).parent();
        closePanel(parent);
    });

    // AFFICHE/CACHE connection panel
    $(".menu-item[func='login']").click(function () {
        showConnectionPanel();
    });

    // AFFICHE/CACHE signup form
    $("#userform .button-function[func='signup']").click(function () {
        toggleSignupClicked();
    });

    // DECONNEXION
    $(".menu-item[func='logout']").click(function () {
        logout();
    });

    $(".menu-item[func='help']").click(function () {

    });
}

// Close any panel which is opened
function closePanel(panel) {
    panel.css({
      display: "block",
    }).animate({
      display: "block",
      height: '0px',
    }, {
      complete: function () {
        panel.css({
          display: "none"
        });
      },
    });
}

// Affiche/Masque la recherche
function searchClicked() {
    if ($(".search-panel").css("display") === "block") {
      $(".search-panel").css({
        display: "block",
        height: '200px',
      }).animate({
        display: "block",
        height: '0px',
      }, {
        complete: function () {
          $(".search-panel").css({
            display: "none"
          });
        },
      });
    }
    else {
      $(".search-panel").css({
        display: "block",
        height: '0px',
      }).animate({
        display: "block",
        height: '200px',
      });
    }
}

// FIN EVENEMENTS
// --------------



// DEBUT FONCTIONS LIEES AUX TOOLTIPS
// ----------------------------------
// Ajoute des tooltips par défaut sur les boutons
function addDefaultTooltip() {
    addTooltip(".menu-item[func='login']", "se connecter");
    addTooltip(".menu-item[func='logout']", "se déconnecter");
    addTooltip(".menu-item[func='search']", "rechercher");
    addTooltip(".menu-item[func='help']", "aide");
}

// Ajoute un tooltip sur un objet
function addTooltip(selector, textContent, cpos, tpos) {
    var cornerPosition = 'top center';
    var tooltipPosition = 'bottom center';

    if (cpos) cornerPosition = cpos;
    if (tpos) tooltipPosition = tpos;

    // Ajoute les toolitps de description
    $(selector).qtip({
        content: {
            text: textContent,
        },
        style: { classes: 'qtip-dark'},
        position: {
            my: cornerPosition,
            at: tooltipPosition
        }
    });
}

// FIN FONCTIONS LIEES AUX TOOLTIPS
// ----------------------------------



// DEBUT AUTRES
// ------------
// Affiche un message à l'utilisateur
function showMessage(message, type) {
    var messagepanel = $(".middle .message-panel");
    var messagepanelContent = $(".middle .message-panel .message-panel-content");

    // Change la couleur du message selon son type
    if (type === "error") messagepanel.css("background-color", "#e74c3c");
    else if (type === "information") messagepanel.css("background-color", "#2ecc71");

    if (messagepanel.css("height") === "0px") {
        messagepanel.css({
          height: "0",
          display: "block"
        }).animate({
          height: "100px",
        });

        messagepanelContent.html(message);
    }
    else {
        messagepanelContent.html(message);
    }
}

// Vérifie qu'un object n'est pas nul ou non défini
function notNull(object) {
    if (object === null || object === undefined || object === "" || object == 'null')
        return false;
    return true;
}

// FIN AUTRES
// ----------
