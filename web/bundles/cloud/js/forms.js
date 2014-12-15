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

        var path = $("input[type='file']").val();
        $("input[name='path']").val(path);

        // Setup some local variables
        var $form = $(this);
        var $inputs = $form.find("input, select, button, textarea"); // cache fields
        var serializedData = $form.serialize();  // serialize the data in the form
        var url = $(this).attr('action');

        $inputs.prop("disabled", true); // disable inputs for the duration of the ajax request

        console.log(url);

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
            else if (url.indexOf("/cloud/web/app_dev.php/addfile/") > -1) {
                addfileResult(response);
            }
            else if (url === "/cloud/web/app_dev.php/addusergroup/") {
                addusergroupResult(response);
            }
            else if (url === "/cloud/web/app_dev.php/addfilegroup/") {
                addfilegroupResult(response);
            }
            else if (url === "/cloud/web/app_dev.php/edituser/") {
                edituserResult(response);
            }
            else if (url === "/cloud/web/app_dev.php/editusergroup/") {
                editusergroupResult(response);
            }
            else if (url === "/cloud/web/app_dev.php/editfilegroup/") {
                editfilegroupResult(response);
            }
            else if (url === "/cloud/web/app_dev.php/editfile/") {
                editfileResult(response);
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

function toggleAddFile(groupSelected) {
    // Récupère le formulaire s'il est présent
    var formSelector = "#files-panel .contentform";
    var form = $(formSelector);

    // Affiche le formulaire s'il n'est pas visible
    if (form.css("display") !== "block") {
        // Masque la liste de fichiers
        $("#files-panel .files-list").css({ display: "none" });

        // Affiche le formulaire
        form.css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });

        // Modifie l'apparence du bouton -> bouton retour
        $("#files-panel .icon-button[func='add']").attr("src", "/cloud/web/bundles/cloud/icon/return-icon.png");

        // Définit le propriétaire du fichier
        var ownerInput = $("#files-panel .contentform input[name='owner']");
        ownerInput.attr("value", _user.name);

        // Remplit le 'select' pour la sélection d'un groupe de fichiers
        getFilesgroups(groupSelected);

        //-----------------------------------------
        // Modifie l'url d'envoie du formulaire selon ce que l'administrateur souhaite faire
        // ----------------------------------------
        if (typeof groupSelected !== "undefined") {

            // On est dans l'UPDATE
            var urlForm = "/cloud/web/app_dev.php/editfile/" + _user.useraccess;
            form.attr("action", urlForm);

            // Modifie le texte du bouton valid
            $(formSelector + " input[type='submit']").val("UPDATE FILE");
        }
        else {
            // On est dans l'AJOUT
            var urlForm = "/cloud/web/app_dev.php/addfile/" + _user.useraccess;
            form.attr("action", urlForm);

            $(formSelector + " input").val("");
            ownerInput.attr("value", _user.name);

            // Modifie le texte du bouton valid
            $(formSelector + " input[type='submit']").val("ADD FILE");
        }
    }
    else { // Masque le formulaire s'il est visible

        // Masque le formulaire
        form.css({ display: "none" });

        // Affiche la liste de fichiers
        $("#files-panel .files-list")
        .css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });

        // Modifie l'apparence du bouton -> bouton initial
        $("#files-panel .icon-button[func='add']").attr("src", "/cloud/web/bundles/cloud/icon/addfile-icon.png");

    }
}

function toggleAddUser(groupSelected) {
    // Récupère le formulaire s'il est présent
    var formSelector = "#users-panel .contentform";
    var form = $(formSelector);

    // Affiche le formulaire s'il n'est pas visible
    if (form.css("display") !== "block") {
        // Masque la liste de fichiers
        $("#users-panel .users").css({ display: "none" });

        // Affiche le formulaire
        form.css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });

        // Modifie l'apparence du bouton -> bouton retour
        $("#users-panel .icon-button[func='add']").attr("src", "/cloud/web/bundles/cloud/icon/return-icon.png");

        // Remplit le 'select' pour la sélection d'un groupe de fichiers
        getUsersgroups(groupSelected);


        //-----------------------------------------
        // Modifie l'url d'envoie du formulaire selon ce que l'administrateur souhaite faire
        // ----------------------------------------
        if (typeof groupSelected !== "undefined") {

            // On est dans l'UPDATE
            form.attr("action", "/cloud/web/app_dev.php/edituser/");

            // Modifie le texte du bouton valid
            $(formSelector + " input[type='submit']").val("UPDATE USER");
        }
        else {
            // On est dans l'AJOUT
            form.attr("action", "/cloud/web/app_dev.php/adduser/");

            $(formSelector + " input").val("");

            // Modifie le texte du bouton valid
            $(formSelector + " input[type='submit']").val("ADD USER");
        }
    }
    else { // Masque le formulaire s'il est visible

        // Masque le formulaire
        form.css({ display: "none" });

        // Modifie l'apparence du bouton -> bouton initial
        $("#users-panel .icon-button[func='add']").attr("src", "/cloud/web/bundles/cloud/icon/adduser-icon.png");

        // Affiche la liste de fichiers
        $("#users-panel .users")
        .css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });
    }
}

function toggleAddFilegroup(edit) {
    // Récupère le formulaire s'il est présent
    var formSelector = "#filesgroups-panel .contentform";
    var form = $(formSelector);

    // Affiche le formulaire s'il n'est pas visible
    if (form.css("display") !== "block") {
        // Masque la liste de fichiers
        $("#filesgroups-panel .filesgroups").css({ display: "none" });

        // Affiche le formulaire
        form.css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });

        // Modifie l'apparence du bouton -> bouton retour
        $("#filesgroups-panel .icon-button[func='add']").attr("src", "/cloud/web/bundles/cloud/icon/return-icon.png");


        //-----------------------------------------
        // Modifie l'url d'envoie du formulaire selon ce que l'administrateur souhaite faire
        // ----------------------------------------
        if (typeof edit !== "undefined") {
            // On est dans l'UPDATE
            form.attr("action", "/cloud/web/app_dev.php/editfilegroup/");

            // Modifie le texte du bouton valid
            $(formSelector + " input[type='submit']").val("UPDATE GROUP");
        }
        else {
            // On est dans l'AJOUT
            form.attr("action", "/cloud/web/app_dev.php/addfilegroup/");

            $(formSelector + " input").val("");

            // Modifie le texte du bouton valid
            $(formSelector + " input[type='submit']").val("ADD GROUP");
        }
    }
    else { // Masque le formulaire s'il est visible

        // Masque le formulaire
        form.css({ display: "none" });

        // Modifie l'apparence du bouton -> bouton initial
        $("#filesgroups-panel .icon-button[func='add']").attr("src", "/cloud/web/bundles/cloud/icon/addfolder-icon.png");

        // Affiche la liste de fichiers
        $("#filesgroups-panel .filesgroups")
        .css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });
    }
}

function toggleAddUsergroup(groupSelected) {
    // Récupère le formulaire s'il est présent
    var formSelector = "#usersgroups-panel .contentform";
    var form = $(formSelector);

    // Masque la liste des acces du groupe
    hideGroupAccess();

    // Affiche le formulaire s'il n'est pas visible
    if (form.css("display") !== "block") {
        // Masque la liste de fichiers
        $("#usersgroups-panel .usersgroups").css({ display: "none" });

        // Affiche le formulaire
        form.css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });

        // Modifie l'apparence du bouton -> bouton retour
        $("#usersgroups-panel .icon-button[func='add']").attr("src", "/cloud/web/bundles/cloud/icon/return-icon.png");


        // Modifie l'url d'envoie du formulaire selon le cas d'utilisation
        if (typeof groupSelected !== "undefined") {

            // On est dans l'UPDATE
            form.attr("action", "/cloud/web/app_dev.php/editusergroup/");

            // Modifie le texte du bouton valid
            $(formSelector + " input[type='submit']").val("UPDATE GROUP");

            // Remplit le 'select' pour la sélection des accès
            getAllUsergroupAccess(groupSelected);

        }
        else {
            // On est dans l'AJOUT
            form.attr("action", "/cloud/web/app_dev.php/addusergroup/");

            $(formSelector + " input").val("");

            // Modifie le texte du bouton valid
            $(formSelector + " input[type='submit']").val("ADD GROUP");
        }
    }
    else { // Masque le formulaire s'il est visible

        // Masque le formulaire
        form.css({ display: "none" });

        // Affiche la liste de fichiers
        $("#usersgroups-panel .usersgroups")
        .css({ display: "block", opacity: "0" })
        .animate({ opacity: "1" });

        // Modifie l'apparence du bouton -> bouton retour
        $("#usersgroups-panel .icon-button[func='add']").attr("src", "/cloud/web/bundles/cloud/icon/addgroup-icon.png");
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
        _user.id                = response[0]["id"];
        _user.name              = response[0]["name"];
        _user.email             = response[0]["email"];
        _user.avatar            = response[0]["avatar"];
        _user.groupid           = response[0]["groupid"];
        _user.password          = response[0]["password"];
        _user.subscriptiondate  = response[0]["subscriptiondate"];
        _user.isconnected       = true;


        checkAuth(); // modifie l'ui si on est bien connecté

        // Récupère les droits d'accès
        getGrantAccess(_user.groupid);

        // Affiche un message
        var textMessage = "<strong>" + _user.name + "</strong>, vous êtes maintenant connecté(e)";
        showMessage(textMessage, "information");


        hideConnectionPanel();
    }
    else {
        var textMessage = "Désolé, le login ou le mot de passe est erroné";
        showMessage(textMessage, "error");
    }
}

// Récupère les droits d'accès pour l'utilisateur connecté
function getGrantAccess(usergroupid) {
    var url = "/cloud/web/app_dev.php/getusergrant/" + usergroupid;
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            // Récupère les données
            _user.useraccess = data[0].user;
            _user.passwordaccess = data[0].user;

            // console.log(_user);
        }
    }
    http.open("POST", url);
    http.send();
}

// Fonction post-traitement ajax pour l'inscription
function signupResult(response) {
    if (response !== "fail") {
        var textMessage = "<strong>" + response["name"] + "<strong>, votre compte a bien été crée!";
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

// Fonction post-traitement ajax pour l'ajout d'un utilisateur
function adduserResult(response) {
    if (response !== "fail") {
        var textMessage = "L'utilisateur <strong>" + response.name + "</strong> a bien été ajouté";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddUser();

        // Recharger la liste des fichiers
        refreshUsers();
    }
    else {
        var textMessage = "Désole, l'utilisateur <strong>" + response.name + "</strong> n'a pas pu etre ajouté";
        showMessage(textMessage, "error");
    }
}

// Fonction post-traitement ajax pour l'ajout d'un fichier
function addfileResult(response) {
    if (response !== "fail") {
        var textMessage = "Le fichier <strong>" + response.name + "</strong> a bien été ajouté";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddFile();

        // Recharger la liste des fichiers
        refreshFiles();


        // Creation/Mise à jour de la vue correspondant au groupe du fichier
        // Récupérer le nom du groupe de fichiers
        getFileGroup(response.groupid, "addview");
    }
    else {
        var textMessage = "Désole, le fichier <strong>" + response.name + "</strong> n'a pas pu etre ajouté";
        showMessage(textMessage, "error");
    }
}

// Fonction post-traitement ajax pour l'ajout d'un groupe d'utilisateurs
function addusergroupResult(response) {
    if (response.error !== "true") {
        var textMessage = "Le groupe d'utilisateurs <strong>"
                            + response.title + "</strong> a bien été ajouté";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddUsergroup();

        // Recharger la liste des fichiers
        refreshUsersGroups();

        var usersgroupsid = response.usersgroupsid;
        var filesgroupsid = response.filesgroupsid;
        var title         = response.title;

        // addGroupAccess(usersgroupsid, filesgroupsid, 0, title);

        Grant(title);
    }
    else {
        var textMessage = "Désole, le groupe d'utilisateurs <strong>"
                            + response.title + "</strong> n'a pas pu etre ajouté";
        showMessage(textMessage, "error");
    }
}

function Grant(user) {
    var url = "/cloud/web/app_dev.php/addgrant/" + user;
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var text = "Un utilisateur définissant les droits du group a été crée";
            showMessage(text, "information", "keep");
        }
    }
    http.open("POST", url);
    http.send();
}

function addfilegroupResult(response) {
    if (response !== "fail") {
        var textMessage = "Le groupe de fichiers <strong>"
                            + response.title + "</strong> a bien été ajouté";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddFilegroup();

        // Recharger la liste des fichiers
        refreshFilesgroups();

        // ON NE PEUT PAS AJOUTER UNE VUE IMMEDIATEMENT VU QUE LA TABLE FILES
        // NE POSSEDE PAS ENCORE DE FICHIERS APPARTENANT A CE GROUPE
        // > METTRE A JOUR LA TABLE A CHAQUE INSERT DE FICHIER
        // Création d'une vue pour le groupe de fichiers
        // addviewfilegroup(response.id, response.title);
    }
    else {
        var textMessage = "Désole, le groupe de fichiers <strong>"
                            + response.title + "</strong> n'a pas pu etre ajouté";
        showMessage(textMessage, "error");
    }
}

// Crée une vue pour le groupe de fichiers qu'on vient de créer
function addviewfilegroup(id, title) {
    var http = new XMLHttpRequest();
    var url = "/cloud/web/app_dev.php/addview/" + id + "/" + title;
    console.log(url);

    http.onreadystatechange = function () {
        console.log(http.readyState);
        console.log(http.status);
        if (http.readyState === 4 && http.status === 200) {
            console.log(http.response);
            console.log("view added");
            var data = JSON.parse(http.response);

            if (data.error !== true) {
                var textMessage = "La vue du groupe de fichiers <strong>"
                + data.title + "(" + data.id + ")</strong> a bient été ajoutée";
                showMessage(textMessage, "information", "keep");
            }
            else {
                var textMessage = "La vue du groupe de fichiers <strong>"
                + data.title + "(" + data.id + ")</strong> n'a pas pu être créée";
                showMessage(textMessage, "information", "keep");
            }
        }
    }
    http.open("POST", url);
    http.send();
}

function addGroupAccess(usersgroupsid, filesgroupsid, write, usergroupName) {
    var http = new XMLHttpRequest();
    var url = "/cloud/web/app_dev.php/addaccess/" + usersgroupsid + "/" + filesgroupsid + "/" + write;


    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = http.response;

            if (data === "OK") {
                var textMessage = "Les règles d'accès ont correctement été crées pour le groupe <strong>"
                                    + usergroupName + "</strong>";
                showMessage(textMessage, "information", "keep");
            }
            else {
                var textMessage = "Désole, les règles d'accès n'ont pas pu être crées pour le groupe <strong>"
                                    + usergroupName + "</strong>";
                showMessage(textMessage, "error", "keep");
            }
        }
    }
    http.open("POST", url);
    http.send();
}

function deleteGroupAccess(usersgroupsid, filesgroupsid, usergroupName) {
    var http = new XMLHttpRequest();
    var url = "/cloud/web/app_dev.php/deleteaccess/" + usersgroupsid + "/" + filesgroupsid;


    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            console.log(http.response);

            var data = JSON.parse(http.response);
            console.log(data);

            // Rafraichir les données
            refreshGroupAccess(data[0].usersgroupsid);


            if (data.error === "false") {
                var textMessage = "Les règles d'accès ont correctement été supprimées pour le groupe <strong>"
                + usergroupName + "</strong>";
                showMessage(textMessage, "information", "keep");
            }
            else {
                var textMessage = "Désole, les règles d'accès n'ont pas pu être supprimées pour le groupe <strong>"
                + usergroupName + "</strong>";
                showMessage(textMessage, "error", "keep");
            }
        }
    }
    http.open("POST", url);
    http.send();
}


// EDITION
// --------
// Résultat de la modification des informations d'un utilisateur
function edituserResult(response) {
    if (response !== "fail") {
        var textMessage = "L'utilisateur <strong>" +
                            response.name + "</strong> a bien été mis à jour!";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddUser();

        // Recharger la liste des fichiers
        refreshUsers();
    }
    else {
        var textMessage = "Désole, l'utilisateur <strong>" +
                            response.name + "</strong> n'a pas pu etre modifié :(";
        showMessage(textMessage, "error");
    }
}

function editusergroupResult(response) {
    if (response !== "fail") {
        var textMessage = "Le group <strong>"
                            + response.name + "</strong> a bien été mis à jour!";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddUsergroup();

        // Recharger la liste des fichiers
        refreshUsersGroups();
    }
    else {
        var textMessage = "Désole, le groupe <strong>"
                            + response.name + "</strong> n'a pas pu etre modifié :(";
        showMessage(textMessage, "error");
    }
}

function editfilegroupResult(response) {
    if (response !== "fail") {
        var textMessage = "Le groupe <strong>" + response.name + "</strong> a bien été mis à jour!";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddFilegroup();

        // Recharger la liste des fichiers
        refreshFilesgroups();
    }
    else {
        var textMessage = "Désole, le groupe <strong>" + response.name + "</strong> n'a pas pu etre modifié :(";
        showMessage(textMessage, "error");
    }
}

function editfileResult(response) {
    if (response !== "fail") {
        var textMessage = "Le fichier <strong>" + response.name + "</strong> a bien été mis à jour!";
        showMessage(textMessage, "information");

        // Masque le formulaire
        toggleAddFile();

        // Recharger la liste des fichiers
        refreshFiles();
    }
    else {
        var textMessage = "Désole, le fichier <strong>" + response.name + "</strong> n'a pas pu etre modifié :(";
        showMessage(textMessage, "error");
    }
}

// FIN FONCTIONS DE TRAITEMENT DES DONNEES
// ---------------------------------------


// -----------------------------------------
// DEBUT FONCTIONS AJAX LIEE AUX FORMULAIRES
// -----------------------------------------
// Récupère les groupes de fichiers
function getFilesgroups(groupSelected) {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            populateSelectFilesgroups(data, groupSelected);
        }
    }
    http.open("POST", "/cloud/web/app_dev.php/viewfilesgroups");
    http.send();
}

// Remplit le 'select' lié au groupes de fichiers
function populateSelectFilesgroups(data, groupSelected) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "Un problème est survenu lors de la récupération des groupes de fichiers.";
        showMessage(textMessage, "error");
        return;
    }

    var select = $("#addfileform select[name='group']");
    select.html("");

    for (var i = 0; i < data.length; i++) {

        // Crée un item option
        var option = $("<option>", {
            value   : data[i].id,
            html    : data[i].title,
        });

        select.append(option);
    }

    if (typeof groupSelected !== "undefined") {
        $(select).val(groupSelected);
    }
}

// Récupère les groupes de fichiers
function getUsersgroups(groupSelected) {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            populateSelectUsersgroups(data, groupSelected);
        }
    }
    http.open("POST", "/cloud/web/app_dev.php/viewusersgroups");
    http.send();
}

// Remplit le 'select' lié au groupes de fichiers
function populateSelectUsersgroups(data, groupSelected) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "Un problème est survenu lors de la récupération des groupes d'utilisateurs";
        showMessage(textMessage, "error");
        return;
    }

    var select = $("#adduserform select[name='group']");
    select.html(""); // vide ce qu'il y avait dedans -> évite les entrées multiples

    for (var i = 0; i < data.length; i++) {

        // Crée un item option
        var option = $("<option>", {
            value   : data[i].id,
            html    : data[i].title,
        });

        select.append(option);
    }

    if (typeof groupSelected !== "undefined") {
        $(select).val(groupSelected);
    }
}

function getAllUsergroupAccess(groupSelected) {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            populatSelectUsergroupAcess(data, groupSelected);
        }
    }
    http.open("POST", "/cloud/web/app_dev.php/viewfilesgroups");
    http.send();
}

function populatSelectUsergroupAcess(data, groupSelected) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "Un problème est survenu lors de la récupération des groupes de fichiers.";
        showMessage(textMessage, "error");
        return;
    }

    var select = $("#addusergroupform select[name='access']");
    select.html(""); // vide la liste déroulante

    var containerGroupAccessUnbinded = $("#usersgroups-panel .group-access .group-access-unbinded");
    $("#usersgroups-panel .group-access").css({ display: 'block' });

    for (var i = 0; i < data.length; i++) {
        // Crée un item option
        var option = $("<option>", {
            value   : data[i].id,
            html    : data[i].title,
        });

        select.append(option);


        // -------------------
        // Add access card
        var access = $("<div>", {
            status          : "out",
            filesgroupsid   : data[i].id,
            filesgroupstitle: data[i].title,
            html            : data[i].title,
            class           : "group-access-card",
        });
        containerGroupAccessUnbinded.append(access);

        access.click(function () {
            clickAddAccessToUsergroup($(this));
        });

    }

    // Récupère les groupes de fichiers liés
    getUserGroupAccessBinded(groupSelected);
}


function getUserGroupAccessBinded(usergroupid) {
    var http = new XMLHttpRequest();
    var url = "/cloud/web/app_dev.php/getaccess/" + usergroupid;

    http.onreadystatechange = function () {
        // console.log(http.readyState);
        // console.log(http.status);
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            // var container = $("#usersgroups-panel .group-access");
            // container.css({ display: 'block' });

            // console.log(data);
            // console.log("usergroup id: " + data[0].usersgroupsid);


            for (var i = 0; i < data.length; i++) {
                getFileGroup(data[i].filesgroupsid, "adduseraccess");
            }
        }
    }
    http.open("POST", url);
    http.send();
}


function hideGroupAccess() {
    console.log("toto");
    $("#usersgroups-panel .group-access").css({ display: "none"});
    var containerGroupAccessBinded = $("#usersgroups-panel .group-access .group-access-binded");
    var containerGroupAccessUnbinded = $("#usersgroups-panel .group-access .group-access-unbinded");

    containerGroupAccessBinded.html("");
    containerGroupAccessUnbinded.html("");
}

function refreshGroupAccess(usersgroupsid) {
    var containerGroupAccessBinded = $("#usersgroups-panel .group-access .group-access-binded");
    var containerGroupAccessUnbinded = $("#usersgroups-panel .group-access .group-access-unbinded");

    containerGroupAccessBinded.html("");
    containerGroupAccessUnbinded.html("");

    getAllUsergroupAccess(usersgroupsid); // id du groupe d'utilisateurs en param
}

function fillAdduserInputs(data) {
    var form = "#adduserform ";

    // Fille user id
    $(form + "input[name='id']").val(data[0].id);

    // Fill login
    $(form + "input[name='login']").val(data[0].name);

    // Fill password
    $(form + "input[name='password']").val(data[0].password);
    $(form + "input[name='passwordconfirm']").val(data[0].password);

    // Fill email
    $(form + "input[name='email']").val(data[0].email);

    // Select group
    // It appened before in toggleAddUser(...)
}

function fillAddfileInputs(data) {
    var form = "#addfileform ";

    // Fille file id
    $(form + "input[name='id']").val(data[0].id);

    // Fill name
    $(form + "input[name='name']").val(data[0].name);

    // Fill path
    $(form + "input[name='path']").val(data[0].path);

    // Fill tags
    $(form + "input[name='tags']").val(data[0].tags);

    // Fill email
    $(form + "select[name='type']").val(data[0].type);

    // Select group
    // It appened before in toggleAddUser(...)
}

function fillAddusergroupInputs(data) {
    var form = "#addusergroupform ";

    // Fille user id
    $(form + "input[name='id']").val(data[0].id);

    // Fill title
    $(form + "input[name='title']").val(data[0].title);

    // Select access
    // It appened before in toggleAddUser(...)
}

function fillAddfilegroupInputs(data) {
    var form = "#addfilegroupform ";

    // Fille user id
    $(form + "input[name='id']").val(data[0].id);

    // Fill title
    $(form + "input[name='title']").val(data[0].title);
}


function getUser(id) {
    var url = "/cloud/web/app_dev.php/viewsingleuser/" + id;
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            toggleAddUser(data[0].groupid);
            fillAdduserInputs(data);
        }
    }
    http.open("POST", url);
    http.send();
}

function getFile(id) {
    var url = "/cloud/web/app_dev.php/viewsinglefile/" + id;
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            toggleAddFile(data[0].groupid);
            fillAddfileInputs(data);
        }
    }
    http.open("POST", url);
    http.send();
}

function getUserGroup(id) {
    var url = "/cloud/web/app_dev.php/viewsingleusergroup/" + id;
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            toggleAddUsergroup(data[0].id); // à modifier
            fillAddusergroupInputs(data);
        }
    }
    http.open("POST", url);
    http.send();
}

function getFileGroup(id, type, fileid) {
    var url = "/cloud/web/app_dev.php/viewsinglefilegroup/" + id;
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            if (type === "edit") {
                toggleAddFilegroup("edit");
                fillAddfilegroupInputs(data);
            }
            else if (type === "addview") {
                addviewfilegroup(id, data[0].title);
            }
            else if (type === "deletefile") {
                processDeleteFile(data[0].title, fileid);
            }
            else if (type === "adduseraccess") {
                var container = $("#usersgroups-panel .group-access .group-access-binded");
                container.css({ display: 'block' });

                // Add access card
                var access = $("<div>", {
                    status          : "in",
                    filesgroupsid   : id,
                    filesgroupstitle: data[0].title,
                    html            : data[0].title,
                    class           : "group-access-card",
                });
                container.append(access);

                // Remove binded filesgroups from the other list
                var cardToRemove = $("#usersgroups-panel .group-access-unbinded .group-access-card[filesgroupsid='"
                                    + id + "']");
                cardToRemove.remove();

                // EVENTS
                access.click(function () {
                    clickAddAccessToUsergroup($(this));
                });
            }
        }
    }
    http.open("POST", url);
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
