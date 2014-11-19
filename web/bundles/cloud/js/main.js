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
    $("#userform .text-button[func='signup']").click(function () {
        toggleSignupClicked();
    });

    // DECONNEXION
    $(".menu-item[func='logout']").click(function () {
        logout();
    });

    // AIDE
    $(".menu-item[func='help']").click(function () {

    });

    // Recharge la page quand on clique sur le titre
    $(".main-ui .header .title").click(function () {
        window.location.reload(true);
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



// FONCTIONS DU HEADER
// -------------------
// Affiche l'avatar de l'utilisateur au niveau du header
function showUserAvatar() {
    var avatar  = $(".header-avatar").css({ display: "block" });
    var img     = $(".header-avatar-img").css({ opacity: "0" });
    var text    = $(".header-avatar-name").html(_user.name).css({ opacity: "0" });

    // Animation d'ouverture
    // Anime d'abord l'image
    img.css({
        top: "20px"
    }).animate({
        top: "0",
        opacity: "1",
    });

    // Anime le texte
    text.css({
        top: "20px"
    }).animate({
        top: "0",
        opacity: "1",
    }, {
        duration: 500
    });

    avatar.off("click");
    avatar.click(function () {
        toggleHeaderHeight();
    });
}

// Masque l'avatar de l'utilisateur au niveau du header
function hideUserAvatar() {
    var avatar  = $(".header-avatar");
    avatar.off("click");

    var img = $(".header-avatar-img");
    var text = $(".header-avatar-name");

    // Animation de fermeture
    // Anime le texte
    text.animate({
        top: "20px",
        opacity: "0",
    });

    // Anime l'image
    img.animate({
        top: "20px",
        opacity: "0",
    }, {
        duration: 200,
        complete: function () {
            window.setTimeout(function () {
                $(".header-avatar").css({ display: "none" });
            }, 200);

        }
    });


}

// Agrandit/Réduit le header selon une condition
function toggleHeaderHeight() {
    var header = $(".main-ui .header");
    if (header.css("height") < "700px") {
        expendHeader();
    }
    else {
        minimizeHeader();
    }
}

// Agrandit la taille du header
function expendHeader() {
    $(".main-ui .header").css({
        height: '700px'
    });
}

// Réduit la taille du header
function minimizeHeader() {
    $(".main-ui .header").css({
        height: '500px'
    });
}
// FIN FONCTIONS DU HEADER
// -------------------



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

function startLoadingAnimation() {
    $(".loader").css({ display: "block" });
    $(".loader-inner").css({ display: "inline-block" });
}
function stopLoadingAnimation() {
    $(".loader").css({ display: "none" });
    $(".loader-inner").css({ display: "none" });
}

function startLoadingAnimationCustomPlace(selector) {
    // Enlève toute animation précédente, s'il y en a
    stopLoadingAnimationCustomPlace(selector);

    var loader = $("<span>", {
        class: 'loader'
    });

    var loaderInner = $("<span>", {
        class: 'loader-inner'
    });

    var loaderText = $("<div>",{
        class: "loader-text",
        html: "<span> chargement... </span>"
    });

    $(selector).append(loader).append(loaderText);
    loader.append(loaderInner);

    loader.css({ display: "block" });
    loaderInner.css({ display: "inline-block" });
}
function stopLoadingAnimationCustomPlace(selector) {
    $(selector + " .loader").remove();
    $(selector + " .loader-inner").remove();
    $(selector + " .loader-text").remove();
}

// Vérifie qu'un object n'est pas nul ou non défini
function notNull(object) {
    if (object === null || object === undefined || object === "" || object == 'null')
        return false;
    return true;
}

// FIN AUTRES
// ----------
