// ----------------------
// CONTENT.JS - CLOUD
// ----------------------



// DEBUT FONCTIONS D'AFFICHAGE
// ---------------------------
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

    clickAdd();
    clickRefresh();
}

// Masque les catégories si l'utilisateur se déconnecte
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

// FIN FONCTIONS D'AFFICHAGE
// -------------------------


// DEBUT FONCTIONS AJAX
// --------------------
// Envoie une requête ajax à la route passée en paramètre
function sendAjaxRequest(url) {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.response);

            if (url == "/cloud/web/app_dev.php/viewusers") {
                viewUsersResult(data);
            }
            else if (url == "/cloud/web/app_dev.php/viewusersgroups") {
                viewUsersgroupsResult(data);
            }
            else if (url == "/cloud/web/app_dev.php/viewfiles") {
                viewFilesResult(data);
            }
            else if (url == "/cloud/web/app_dev.php/viewfilesgroups") {
                viewFilesgroupsResult(data);
            }
        }
    }
    http.open("POST", url);
    http.send();
}

function sendAjaxRequestWithParameters(url, parameter) {
    var http = new XMLHttpRequest();
    var _url = url + "/" + parameter;

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = http.response;

            if (_url == "/cloud/web/app_dev.php/deleteuser/" + parameter) {
                viewDeleteuserResult(data);
            }
        }
    }
    http.open("POST", _url);
    http.send();
}
// FIN FONCTIONS AJAX
// ------------------



// DEBUT FONCTIONS DEMANDANT LES DONNEES
// ------------------------------------
// Affiche la liste des fichiers
function viewFiles() {
    // Test si on n'a pas déjà récupéré les fichiers
    var content = $("#files-panel .table-body tr");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewfiles";
    sendAjaxRequest(url);

    // startLoadingAnimation(); // starts loading animation
    startLoadingAnimationCustomPlace("#files-panel .categorie-panel-content");
}

// Affiche la liste des groupes de fichiers
function viewFilesgroups() {
    // Test si on n'a pas déjà récupéré les utilisateurs
    var content = $("#filesgroups-panel .categorie-panel-content .filesgroups .group-card");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewfilesgroups";
    sendAjaxRequest(url);

    startLoadingAnimationCustomPlace("#filesgroups-panel .categorie-panel-content");
}

// Affiche les utilisateurs
function viewUsers() {
    // Test si on n'a pas déjà récupéré les utilisateurs
    var content = $("#users-panel .categorie-panel-content .users .row");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewusers";
    sendAjaxRequest(url);

    startLoadingAnimationCustomPlace("#users-panel .categorie-panel-content");
}

// Affiche la liste des groupes d'utilisateurs
function viewUsersgroups() {
    // Test si on n'a pas déjà récupéré les utilisateurs
    var content = $("#usersgroups-panel .categorie-panel-content .usersgroups .group-card");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewusersgroups";
    sendAjaxRequest(url);

    startLoadingAnimationCustomPlace("#usersgroups-panel .categorie-panel-content");
}

function deleteUser(id) {
    var url = "/cloud/web/app_dev.php/deleteuser";
    // sendAjaxRequest(url);
    sendAjaxRequestWithParameters(url, id);
}
// FIN FONCTIONS DEMANDANT LES DONNEES
// -----------------------------------



// DEBUT FONCTIONS TRAITANT LES RESULTATS DES DONNEES
// --------------------------------------------------
// Fonction post-traitement ajax pour la vue des utilisateurs
function viewUsersResult(data) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "There's no result for this request.";
        showMessage(textMessage, "error");
        return;
    }

    // Récupère l'objet où on va insérer le contenu
    var content = $("#users-panel .categorie-panel-content .users");

    // Traitement des données
    for (var i = 0; i < data.length; i++) {
        // Crée l'avatar
        var avatar = $("<img>", {
            class:"avatar",
            alt: "avatar",
            src : "/cloud/web/bundles/cloud/icon/user-icon.png"
        });

        // Crée les éléments groupid (id du groupe) et name (nom)
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

        // Crée l'icone d'édition
        var editIcon = $("<img>", {
            class: "icon-button",
            func: "edit-user",
            src : "/cloud/web/bundles/cloud/icon/edit-icon.png"
        });

        // Crée l'icone de suppression
        var deleteIcon = $("<img>", {
            class: "icon-button",
            func: "delete-user",
            userid: data[i].id,
            src : "/cloud/web/bundles/cloud/icon/minus-icon.png"
        });

        // Insère le contenu dans la ligne
        // Attache l'icone d'édition, de suppression, l'avatar
        // et enfin le contenu de la ligne à l'objet row (ligne)
        row.append(editIcon).append(deleteIcon).append(avatar).append(rowtext);

        // Ajoute le groupid et le nom de l'utilisateur au contenu de la ligne
        // Attache le groupid et le nom au contenu de la ligne (rowtext)
        rowtext.append(groupid).append(name);
    }

    // Ajoute les toolitps de description
    addTooltip(".avatar", "avatar");
    addTooltip(".user-groupid", "id du group de l'utilisateur");
    addTooltip(".icon-button[func='edit-user']", "editer");
    addTooltip(".icon-button[func='delete-user']", "supprimer");

    // Evénements
    clickDelete(); // événement de suppression

    // Arrête l'animation de chargement
    stopLoadingAnimationCustomPlace("#users-panel .categorie-panel-content");
}

function viewUsersgroupsResult(data) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "There's no result for this request.";
        showMessage(textMessage, "error");
        return;
    }

    // Récupère l'objet où on va insérer le contenu
    var content = $("#usersgroups-panel .categorie-panel-content .usersgroups");

    // Traitement des données
    for (var i = 0; i < data.length; i++) {
        // Crée la carte de groupe
        var card = $("<div>", {
            class: "group-card"
        }).appendTo(content);

        // Crée le header
        var header = $("<div>", {
            class:"group-card-header"
        });

        // Crée le contenu
        var groupid = $("<span>", { class: 'group-id', html: data[i].id });
        var grouptitle = $("<span>", { class: 'group-title', html: data[i].title });

        // Attache les éléments au DOM (Document Object Model)
        card.append(header);        // attache l'objet header au parent card
        card.append(groupid);       // attache l'objet groupid au parent card
        header.append(grouptitle);  // attache l'objet grouptitle au parent header


        //  Crée un bouton text  (pour l'édition)
        var edit = $("<div>", {
            class: "text-button",
            func : "edit",
            html: "edit"
        });

        //  Crée un second bouton text (pour la suppression)
        var del = $("<div>", {
            class: "text-button",
            func : "delete",
            html: "delete"
        });

        header.append(edit);
        header.append(del);
    }

    // Ajoute les toolitps de description
    // addTooltip(".avatar", "avatar");
    // addTooltip(".user-groupid", "id du group de l'utilisateur");
    // addTooltip(".icon-button[func='edit-user']", "editer");
    // addTooltip(".icon-button[func='delete-user']", "supprimer");

    // Stop l'animation de chargement
    stopLoadingAnimationCustomPlace("#usersgroups-panel .categorie-panel-content");
}

function viewFilesResult(data) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "There's no result for this request.";
        showMessage(textMessage, "error");
        return;
    }

    // Récupère l'objet où on va insérer le contenu
    var fileslist = $("#files-panel .categorie-panel-content .files-list");
    var content = $("#files-panel .categorie-panel-content .files-list .table-body");

    // Traitement des données
    for (var i = 0; i < data.length; i++) {
        var tr = $("<tr>");

        var name    = $("<td>", { class:"td-name" }).html(data[i].name);
        var group   = $("<td>", { class:"td-group" }).html(data[i].groupid);
        var path    = $("<td>", { class:"td-path" }).html(data[i].path);
        var type    = $("<td>", { class:"td-type" }).html(data[i].type);
        var pubdate = $("<td>", { class:"td-pubdate" }).html(data[i].pubDate);
        var tags    = $("<td>", { class:"td-tags" }).html(data[i].tags);
        var owner   = $("<td>", { class:"td-owner" }).html(data[i].owner);

        tr.append(name).append(group).append(path).append(type).append(pubdate).append(tags).append(owner);
        content.append(tr);
    }

    // Arrête l'animation de chargement
    stopLoadingAnimationCustomPlace("#files-panel .categorie-panel-content");

    // Animations
    fileslist.css({ display: "block", opacity: "0", top: "20px"})
             .animate({ opacity: "1", top :"0" });
    $("#files-panel .files-list tr").each(function () {
        $(this).css({ opacity: "0", top: "20px" }).animate({ opacity: "1", top: "0" });
    });
}

function viewFilesgroupsResult(data) {
    if (data.length < 1) {
        // Affiche un message si on n'a récupéré aucune donnée
        var textMessage = "There's no result for this request.";
        showMessage(textMessage, "error");
        return;
    }

    // Récupère l'objet où on va insérer le contenu
    var content = $("#filesgroups-panel .categorie-panel-content .filesgroups");

    // Traitement des données
    for (var i = 0; i < data.length; i++) {
        // Crée la carte de groupe
        var card = $("<div>", {
            class: "group-card"
        }).appendTo(content);

        // Crée le header
        var header = $("<div>", {
            class:"group-card-header"
        });

        // Crée le contenu
        var groupid = $("<span>", { class: 'group-id', html: data[i].id });
        var grouptitle = $("<span>", { class: 'group-title', html: data[i].title });

        // Attache les éléments au DOM (Document Object Model)
        card.append(header);        // attache l'objet header au parent card
        card.append(groupid);       // attache l'objet groupid au parent card
        header.append(grouptitle);  // attache l'objet grouptitle au parent header


        //  Crée un bouton text  (pour l'édition)
        var edit = $("<div>", {
            class: "text-button",
            func : "edit",
            html: "edit"
        });

        //  Crée un second bouton text (pour la suppression)
        var del = $("<div>", {
            class: "text-button",
            func : "delete",
            html: "delete"
        });

        header.append(edit);
        header.append(del);
    }

    // Ajoute les toolitps de description
    // addTooltip(".avatar", "avatar");
    // addTooltip(".user-groupid", "id du group de l'utilisateur");
    // addTooltip(".icon-button[func='edit-user']", "editer");
    // addTooltip(".icon-button[func='delete-user']", "supprimer");

    // Stop l'animation de chargement
    stopLoadingAnimationCustomPlace("#filesgroups-panel .categorie-panel-content");
}

function viewDeleteuserResult(data) {
    if (data === "OK") {
        var text = "L'utilisateur a été supprimé(e) avec succès."
        showMessage(text, "error");
        refreshUsers();
    }
    else {
        var text = "Désolé, nous n'avons pas pu supprimer l'utilisateur."
        showMessage(text, "error");
        refreshUsers();
    }
}
// FIN FONCTIONS TRAITANT LES RESULTATS DES DONNEES
// --------------------------------------------------

// DEBUT FONCTIONS DE RAFRAICHISSEMENT DES DONNEES
// -----------------------------------------------
function refreshUsers() {
    // Vide le contenu
    var content = $("#users-panel .categorie-panel-content .users");
    content.html("");

    // Envoie une nouvelle requête au serveur
    viewUsers();
}

function refreshFiles() {
    // Vide le contenu
    var content = $("#files-panel .categorie-panel-content .table-body");
    content.html("");

    // Masque le tableau
    $("#files-panel .categorie-panel-content .files-list").css({ display: "none" });

    // Envoie une nouvelle requête au serveur
    viewFiles();
}

function refreshUsersgroups() {
    // Vide le contenu
    var content = $("#usersgroups-panel .categorie-panel-content .usersgroups");
    content.html("");

    // Envoie une nouvelle requête au serveur
    viewUsersgroups();
}

function refreshFilesgroups() {
    // Vide le contenu
    var content = $("#filesgroups-panel .categorie-panel-content .filesgroups");
    content.html("");

    // Envoie une nouvelle requête au serveur
    viewFilesgroups();
}

// FIN FONCTIONS DE RAFRAICHISSEMENT DES DONNEES
// -----------------------------------------------


// DEBUT EVENEMENTS
// ----------------
function clickDelete() {
    $(".icon-button[func='delete-user']").click(function () {
        var id = $(this).attr("userid");
        deleteUser(id);
    });
}

function clickRefresh() {
    var button = ".icon-button[func='refreshpanel']";
    $(button).off("click");
    $(button).click(function () {
        var panel = $(this).parent();
        var id = panel.attr("id");

        if (id === "users-panel") {
            refreshUsers();
        }
        else if (id === "usersgroups-panel") {
            refreshUsersgroups();
        }
        else if (id === "files-panel") {
            refreshFiles();
        }
        else if (id === "filesgroups-panel") {
            refreshFilesgroups();
        }
    });
}

function clickAdd() {
    var button = ".icon-button[func='add']";

    $(button).off("click");
    $(button).click(function () {
        var panel = $(this).parent().parent();
        var id = panel.attr("id");


        if (id === "users-panel") {
            toggleAddUser();
        }
        else if (id === "usersgroups-panel") {
            toggleAddUsergroup();
        }
        else if (id === "files-panel") {
            toggleAddFile();
        }
        else if (id === "filesgroups-panel") {
            toggleAddFilegroup();
        }
    });

}
// FIN EVENEMENTS
// --------------
