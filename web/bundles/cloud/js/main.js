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

// Prépare la fonction de validation du formulaire
function prepareLoginForm() {
  var form = "#userform";
  prepareAjaxForm(form);
}

// Lie la fonction ajax au formulaire
// (qui sera appelée lors de la validation/l'envoi du formulaire)
function prepareAjaxForm(form) {
  var request; // variable to hold request

  // Bind to the submit event of our form
  $(form).submit(function(event) {
      if (request) request.abort(); // abort any pending request

      // Setup some local variables
      var $form = $(this);
      var $inputs = $form.find("input, select, button, textarea"); // cache fields
      var serializedData = $form.serialize();  // serialize the data in the form
      var url = $(this).attr('action');

      $inputs.prop("disabled", true); // disable inputs for the duration of the ajax request


      request = $.ajax({
          url: url,
          type: "POST",
          data: serializedData
      });

      // callback handler that will be called on success
      request.done(function(response, textStatus, jqXHR) {
          if (url === "/cloud/web/app_dev.php/login/") {
            loginResult(response);
          }
          else if (url === "/cloud/web/app_dev.php/signup/") {
            signupResult(response);
          }
          else if (url === "/cloud/web/app_dev.php/viewusers") {
            // Vérifie la route
            console.log(response);
          }
      });

      // callback handler that will be called on failure
      request.fail(function(jqXHR, textStatus, errorThrown) {
          console.error("The following error occured : " + textStatus, errorThrown);
      });

  // callback handler that will be called regardless
  // if the request failed or succeeded
  request.always(function () {
      // reenable the inputs
      $inputs.prop("disabled", false);
  });

  // prevent default posting of form
  event.preventDefault();
  });
}

// Envoie une requête ajax à la route passée en paramètre
function sendAjaxRequest(url) {
  var http = new XMLHttpRequest();

  http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      var data = JSON.parse(http.response);

      if (url == "/cloud/web/app_dev.php/viewusers") {
        viewUsersResult(data);
      }
    }
  }
  http.open("POST", url);
  http.send();
}

// Afiche/Masque le formulaire d'inscription
function toggleSignupClicked() {
  // Si on est en mode connexion
  if ($("#userform .button-function[func='signup']").attr("isactive") === "false") {

    // On passe en mode (nouvelle) inscription
    var signupsection = $("#userform .signup-section").css("display", "block");
    var children = signupsection.children();
    children.each(function () {
      $(this).css({
        display: "block",
        top: "10px",
        opacity: "0"
      }).animate({
        top: "0",
        opacity: "1"
      });
    });

    // Indique qu'on est en mode inscription et modifie le texte
    $("#userform .button-function[func='signup']")
      .attr("isactive", "true")
      .html("Already have an account?");

    // On change la route du formulaire
    $("#userform").attr("action", "/cloud/web/app_dev.php/signup/");
  }
  else {
    // On passe en mode connexion
    $("#userform .button-function[func='signup']")
      .attr("isactive", "false")
      .html("Don't have an account yet?");

    var children = $("#userform .signup-section").children();
    children.each(function () {
      $(this).css({
        display: "none"
      });
    });

    // On change la route du formulaire
    $("#userform").attr("action", "/cloud/web/app_dev.php/login/");
  }
}

// Afiche/Masque le panneau de connexion
function showConnectionPanel() {
    var cpanel = $(".connection-panel");
    if (cpanel.css("display") === "block")
        return;

    cpanel.css({
        display: 'block',
        height: "0"
    }).animate({
        height: "300px"
    }, {
        complete: function () {
            $(this).css("height", "auto");
        }
    })
}

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

    // Close event
    // $(".message-panel .action-icon").click(function () {
    //     messagepanel.animate({
    //       height: "0",
    //     }, {
    //       complete: function () {
    //         $(this).css({ display: "none"});
    //       }
    //     });
    // });
}

// Fonction post-traitement ajax pour la connexion
function loginResult(response) {
  if (response.length > 0) {
    // La requête s'est bien déroulée ->l'utilisateur est connectée

    // Remplit l'objet (javascript) _user
    _user.name          = response[0]["name"];
    _user.email         = response[0]["email"];
    _user.isconnected   = true;
    checkAuth();

    // Affiche un message
    var textMessage = "You're now logged in";
    showMessage(textMessage, "information");

    // Masque le panel de connexion
    $(".connection-panel")
    .animate({
        height: "0"
    }, {
        complete: function () {
            $(this).css("display", "none");
        }
    });
  }
  else {
    var textMessage = "Sorry, wrong password or login";
    showMessage(textMessage, "error");
  }
}

// Fonction post-traitement ajax pour l'inscription
function signupResult(response) {
    if (response === "OK") {
        var textMessage = "Your account has been created!";
        showMessage(textMessage, "information");

        console.log(response);

        _user.isconnected = true;
        checkAuth();
    }
    else {
        var textMessage = "Sorry, there was a problem";
        showMessage(textMessage, "error");
    }
}

// Vérifie que l'utilisateur est connecté
function checkAuth() {
    if (_user.isconnected === true) {
        // Si l'utilisateur est connecté, masque le bouton de connexion
        // et affiche le bouton de déconnexion
        $(".menu-item[func='login']").css({ display: "none" });
        $(".menu-item[func='logout']").css({ display: "inline-block" });

        showCategories(); // affiche la liste des catégories
    }
    else {
        // Sinon, fait les actions contraires
        $(".menu-item[func='login']").css({ display: "inline-block" });
        $(".menu-item[func='logout']").css({ display: "none" });

        hideCategories(); // masque la liste des catégories
    }
}

// Déconnecte l'utilisateur en réinitialisant les variables
function logout() {
    _user.name          = null;
    _user.email         = null;
    _user.isconnected   = false;

    showMessage("You've been correctly disconnected", "error");
    checkAuth();
}

// Affiche les catégories après identification de l'utilisateur
function showCategories() {
    var delay = 200;
    $(".middle-content .categories").css({ display: "block" });

    $(".categories .square").each(function () {
        $(this).css({
            opacity: "0",
            right : "10px"
        }).animate({
            opacity: "0.8",
            right: "0"
        }, {
            duration: delay
        });

        delay += 200;
    });
}

function hideCategories() {
    var delay = 200;


    $(".categories .square").each(function () {
        $(this).animate({
            opacity: "0",
            right: "10px"
        }, {
            duration: delay
        });

        delay += 200;
    });

    window.setTimeout(function () {
        $(".middle-content .categories").css({ display: "none" });
    }, 1200);
}

// Se déclenche quand un utilisateur click sur une des catégories
function clickCategories() {
    $(".square").click(function () {
        // Récupère le sélecteur ainsi que l'objet (jquery) panel
        // Puis lance la fonction permettant d'afficher ou masquer le panel
        var selector = "#" + $(this).attr("func") + "-panel";
        var panel = $(selector);
        openCategoriePanel(panel);

        // Lance la requête ajax adéquate
        var square = $(this);
        if (square.attr("func") === "files") {
            viewFiles();
        }
        else if (square.attr("func") === "filesgroups") {
            viewFilesgroups();
        }
        else if (square.attr("func") === "users") {
            viewUsers();
        }
        else if (square.attr("func") === "usersgroups") {
            viewUsersgroups();
        }
    });
}

// Affiche/Masque les sections des catégories
function openCategoriePanel(panel) {
    if (panel.css("display") === "none") {
        panel.css({
            display: "block",
            height: "0"
        }).animate({
            height: "500px"
        });
    }
    else {
        panel.css({
        }).animate({
            height: "0"
        }, {
            complete: function () {
                $(this).css({ display: "none" })
            }
        });
    }
}

function viewFiles() {

}

function viewFilesgroups() {

}

// Affiche les utilisateurs
function viewUsers() {
    // Test si on n'a pas déjà récupéré les utilisateurs
    var content = $("#users-panel .categorie-panel-content .row");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewusers";
    sendAjaxRequest(url);

    startLoadingAnimation(); // starts loading animation
}

function viewUsersgroups() {

}

// Fonction post-traitement ajax pour la vue des utilisateurs
function viewUsersResult(data) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "There's no result for this request.";
        showMessage(textMessage, "error");
        return;
    }

    var content = $("#users-panel .categorie-panel-content");

    // Traitement des données
    for (var i = 0; i < data.length; i++) {
        // Crée l'avatar
        var avatar = $("<img>", {
            class:"avatar",
            alt: "avatar",
            src : "/cloud/web/bundles/cloud/icon/user-icon.png"
        });

        var groupid = $("<span>", { class: 'user-groupid', html: data[i].groupid });
        var name = $("<span>", { class: 'user-name', html: " " + data[i].name });

        // Crée le contenu de la ligne d'informations
        var rowtext = $("<div>", {
            class: "row-text"
        });

        // Crée la ligne d'informations des utilisateurs
        var row = $("<div>", {
            class: "row",
            userid: data[i].id
        }).appendTo(content);

        var editIcon = $("<img>", {
            class: "icon-button",
            func: "edit-user",
            src : "/cloud/web/bundles/cloud/icon/edit-icon.png"
        });

        var deleteIcon = $("<img>", {
            class: "icon-button",
            func: "delete-user",
            src : "/cloud/web/bundles/cloud/icon/minus-icon.png"
        });

        // Insère le contenu dans la ligne
        row.append(editIcon).append(deleteIcon).append(avatar).append(rowtext);

        // Ajoute le groupid et le nom de l'utilisateur au contenu de la ligne
        rowtext.append(groupid).append(name);
    }

    // Ajoute les toolitps de description
    addTooltip(".avatar", "avatar");
    addTooltip(".user-groupid", "id du group de l'utilisateur");
    addTooltip(".icon-button[func='edit-user']", "editer");
    addTooltip(".icon-button[func='delete-user']", "supprimer");

    stopLoadingAnimation();
}

function startLoadingAnimation() {
    $(".loader").css({ display: "block" });
    $(".loader-inner").css({ display: "inline-block" });
}
function stopLoadingAnimation() {
    $(".loader").css({ display: "none" });
    $(".loader-inner").css({ display: "none" });
}

function addDefaultTooltip() {
    addTooltip(".menu-item[func='login']", "se connecter");
    addTooltip(".menu-item[func='logout']", "se déconnecter");
    addTooltip(".menu-item[func='search']", "rechercher");
    addTooltip(".menu-item[func='help']", "aide");
}
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

// Vérifie qu'un object n'est pas nul ou non défini
function notNull(object) {
    if (object === null || object === undefined || object === "" || object == 'null')
        return false;
    return true;
}
