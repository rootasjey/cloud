// ----------------
// FORMS.JS - CLOUD
// ----------------
// Fonctions liées à des formulaires


// -------------------
// DEBUT METHODES AJAX
// -------------------
// Prépare la fonction de validation du formulaire
function prepareLoginForm() {
  var form = "#userform";
  prepareAjaxForm(form);
}

function prepareAdduserForm() {
    var form = "#adduserform";
    prepareAjaxForm(form);
}

function prepareAddfileForm() {
    var form = "#addfileform";
    prepareAjaxForm(form);
}

function prepareAddusergroupForm() {
    var form = "#addusergroupform";
    prepareAjaxForm(form);
}

function prepareAddfilegroupForm() {
    var form = "#addfilegroupform";
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
    // verifyEmpty();

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
            else if (url === "/cloud/web/app_dev.php/adduser/") {
                adduserResult(response);
            }
            else if (url === "/cloud/web/app_dev.php/addfile/") {
                addfileResult(response);
            }
            else if (url === "/cloud/web/app_dev.php/addusergroup/") {
                addusergroupResult(response);
            }
            else if (url === "/cloud/web/app_dev.php/addfilegroup/") {
                addfilegroupResult(response);
            }
        });

            // callback handler that will be called on failure
            request.fail(function(jqXHR, textStatus, errorThrown) {
            // console.error("The following error occured : " + textStatus, errorThrown);
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


// -----------------------------------
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

// Affiche le panneau de connexion
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

// Masque le panneau de connexion
function hideConnectionPanel() {
    // Masque le panel de connexion
    var cpanel = $(".connection-panel");

    cpanel.animate({
        height: "0"
    }, {
        complete: function () {
            $(this).css("display", "none");
        }
    });

    // Affiche l'avatar au niveau du header
    showUserAvatar();
}

function toggleAddFile() {
    // Récupère le formulaire s'il est présent
    var form = $("#files-panel .contentform");

    // Affiche le formulaire s'il n'est pas visible
    if (form.css("display") !== "block") {
        // Masque la liste de fichiers
        $("#files-panel .files-list").css({ display: "none" });

        // Affiche le formulaire
        form.css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });

        // Définit le propriétaire du fichier
        var ownerInput = $("#files-panel .contentform input[name='owner']");
        ownerInput.attr("value", _user.name);

        // Remplit le 'select' pour la sélection d'un groupe de fichiers
        getFilesgroups();
    }
    else { // Masque le formulaire s'il est visible

        // Masque le formulaire
        form.css({ display: "none" });

        // Affiche la liste de fichiers
        $("#files-panel .files-list")
        .css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });
    }
}

function toggleAddUser() {
    // Récupère le formulaire s'il est présent
    var form = $("#users-panel .contentform");

    // Affiche le formulaire s'il n'est pas visible
    if (form.css("display") !== "block") {
        // Masque la liste de fichiers
        $("#users-panel .users").css({ display: "none" });

        // Affiche le formulaire
        form.css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });

        // Remplit le 'select' pour la sélection d'un groupe de fichiers
        getUsersgroups();
    }
    else { // Masque le formulaire s'il est visible

        // Masque le formulaire
        form.css({ display: "none" });

        // Affiche la liste de fichiers
        $("#users-panel .users")
        .css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });
    }
}

function toggleAddFilegroup() {
    // Récupère le formulaire s'il est présent
    var form = $("#filesgroups-panel .contentform");

    // Affiche le formulaire s'il n'est pas visible
    if (form.css("display") !== "block") {
        // Masque la liste de fichiers
        $("#filesgroups-panel .filesgroups").css({ display: "none" });

        // Affiche le formulaire
        form.css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });
    }
    else { // Masque le formulaire s'il est visible

        // Masque le formulaire
        form.css({ display: "none" });

        // Affiche la liste de fichiers
        $("#filesgroups-panel .filesgroups")
        .css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });
    }
}

function toggleAddUsergroup() {
    // Récupère le formulaire s'il est présent
    var form = $("#usersgroups-panel .contentform");

    // Affiche le formulaire s'il n'est pas visible
    if (form.css("display") !== "block") {
        // Masque la liste de fichiers
        $("#usersgroups-panel .usersgroups").css({ display: "none" });

        // Affiche le formulaire
        form.css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });
    }
    else { // Masque le formulaire s'il est visible

        // Masque le formulaire
        form.css({ display: "none" });

        // Affiche la liste de fichiers
        $("#usersgroups-panel .usersgroups")
        .css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });
    }
}
// FIN FONCTIONS LIEES A L'AFFICHAGE
// ---------------------------------


// -----------------------------------------
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
    var textMessage = "Vous êtes maintenant connecté(e)";
    showMessage(textMessage, "information");


    hideConnectionPanel();
  }
  else {
    var textMessage = "Désolé, le login ou le mot de passe est erroné";
    showMessage(textMessage, "error");
  }
}

// Fonction post-traitement ajax pour l'inscription
function signupResult(response) {
    if (response !== "fail") {
        var textMessage = "Votre compte a bien été crée!";
        showMessage(textMessage, "information");

        // Remplit l'objet (javascript) _user
        _user.name          = response["name"];
        _user.email         = response["email"];
        _user.isconnected = true;

        checkAuth();
        hideConnectionPanel();
    }
    else {
        var textMessage = "Désolé, un problème est survenu lors de la création de votre compte";
        showMessage(textMessage, "error");
    }
}

function adduserResult(response) {
    if (response !== "fail") {
        var textMessage = "L'utilisateur a bien été ajouté";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddUser();

        // Recharger la liste des fichiers
        refreshUsers();
    }
    else {
        var textMessage = "Désole, l'utilisateur n'a pas pu etre ajouté";
        showMessage(textMessage, "error");
    }
}

function addfileResult(response) {
    if (response !== "fail") {
        var textMessage = "Le fichier a bien été ajouté";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddFile();

        // Recharger la liste des fichiers
        refreshFiles();
    }
    else {
        var textMessage = "Désole, le fichier n'a pas pu etre ajouté";
        showMessage(textMessage, "error");
    }
}

function addusergroupResult(response) {
    if (response !== "fail") {
        var textMessage = "Le groupe d'utilisateurs a bien été ajouté";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddUsergroup();

        // Recharger la liste des fichiers
        refreshUsersgroups();
    }
    else {
        var textMessage = "Désole, le groupe d'utilisateurs n'a pas pu etre ajouté";
        showMessage(textMessage, "error");
    }
}

function addfilegroupResult(response) {
    if (response !== "fail") {
        var textMessage = "Le groupe de fichiers a bien été ajouté";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddFilegroup();

        // Recharger la liste des fichiers
        refreshFilesgroups();
    }
    else {
        var textMessage = "Désole, le groupe de fichiers n'a pas pu etre ajouté";
        showMessage(textMessage, "error");
    }
}
// FIN FONCTIONS DE TRAITEMENT DES DONNEES
// ---------------------------------------


// -----------------------------------------
// DEBUT FONCTIONS AJAX LIEE AUX FORMULAIRES
// -----------------------------------------
// Récupère les groupes de fichiers
function getFilesgroups() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            populateSelectFilesgroups(data);
        }
    }
    http.open("POST", "/cloud/web/app_dev.php/viewfilesgroups");
    http.send();
}

// Remplit le 'select' lié au groupes de fichiers
function populateSelectFilesgroups(data) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "Un problème est survenu lors de la récupération des groupes de fichiers.";
        showMessage(textMessage, "error");
        return;
    }

    var select = $("#addfileform select[name='group']");

    for (var i = 0; i < data.length; i++) {

        // Crée un item option
        var option = $("<option>", {
            value   : data[i].id,
            html    : data[i].title,
        });

        select.append(option);
    }
}

// Récupère les groupes de fichiers
function getUsersgroups() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            populateSelectUsersgroups(data);
        }
    }
    http.open("POST", "/cloud/web/app_dev.php/viewusersgroups");
    http.send();
}

// Remplit le 'select' lié au groupes de fichiers
function populateSelectUsersgroups(data) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "Un problème est survenu lors de la récupération des groupes d'utilisateurs";
        showMessage(textMessage, "error");
        return;
    }

    var select = $("#adduserform select[name='group']");

    for (var i = 0; i < data.length; i++) {

        // Crée un item option
        var option = $("<option>", {
            value   : data[i].id,
            html    : data[i].title,
        });

        select.append(option);
    }
}

function getUser(id) {
    console.log(id);
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            console.log(data);
        }
    }
    http.open("POST", "/cloud/web/app_dev.php/viewuser/" + id);
    http.send();
}


// -----------------------------------------
// FIN FONCTIONS AJAX LIEE AUX FORMULAIRES
// -----------------------------------------


// ----------------------
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
