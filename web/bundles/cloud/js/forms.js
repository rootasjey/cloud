// ----------------
// FORMS.JS - CLOUD
// ----------------
// Fonctions liées à des formulaires


// DEBUT METHODES AJAX
// -------------------
// Prépare la fonction de validation du formulaire
function prepareLoginForm() {
  var form = "#userform";
  prepareAjaxForm(form);
}
//fonction qui verifie que les champs ne sont pas vide
function verifyEmpty() {
  var login     = $("input[name='login']");
  var password  = $("input[name='password']");
  var button    = $("input[type='submit']");

  button.prop("disabled", true);

  login.change(function () {
      var loginValue = $(this)[0].value;
      if (loginValue === "") {
          showMessage("Vous devez entrer un login valide", "error");
          button.prop("disabled", true);
      }
      else {
          button.prop("disabled", false);
      }
  });
}

// Lie la fonction ajax au formulaire
// (qui sera appelée lors de la validation/l'envoi du formulaire)
function prepareAjaxForm(form) {
    var request; // variable to hold request
    verifyEmpty();

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

// FIN METHODES AJAX
// -------------------



// DEBUT FONCTIONS LIEES A L'AFFICHAGE
// -----------------------------------
// Afiche/Masque le formulaire d'inscription
function toggleSignupClicked() {
  // Si on est en mode connexion
  if ($("#userform .text-button[func='signup']").attr("isactive") === "false") {

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
    $("#userform .text-button[func='signup']")
      .attr("isactive", "true")
      .html("Already have an account?");

    // On change la route du formulaire
    $("#userform").attr("action", "/cloud/web/app_dev.php/signup/");
  }
  else {
    // On passe en mode connexion
    $("#userform .text-button[func='signup']")
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

// FIN FONCTIONS LIEES A L'AFFICHAGE
// ---------------------------------


// DEBUT FONCTIONS DE TRAITEMENT DES DONNEES
// -----------------------------------------
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

    // Affiche l'avatar au niveau du header
    showUserAvatar();
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

// FIN FONCTIONS DE TRAITEMENT DES DONNEES
// ---------------------------------------



// DEBUT FONCTIONS AUTRES
// ----------------------
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

    // Ferme tous les blocks
    closeAllPanels();

    // Affiche le block de connexion
    showConnectionPanel();

    // Masque l'avatar du header
    hideUserAvatar();
}

function closeAllPanels() {
    var files       = $("#files-panel");
    var filesgroups = $("#filesgroups-panel");
    var users       = $("#users-panel");
    var usersgroups = $("#usersgroups-panel");

    if (files.css("display") !== "none") {
        closePanel(files);
    }
    if (filesgroups.css("display") !== "none") {
        closePanel(filesgroups);
    }
    if (users.css("display") !== "none") {
        closePanel(users);
    }
    if (usersgroups.css("display") !== "none") {
        closePanel(usersgroups);
    }
}
// FIN FONCTIONS AUTRES
// --------------------
