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



// DEBUT FONCTIONS DEMANDANT LES DONNEES
// ------------------------------------
// Affiche la liste des fichiers
function viewFiles() {

}

// Affiche la liste des groupes de fichiers
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

// Affiche la liste des groupes d'utilisateurs
function viewUsersgroups() {
    // Test si on n'a pas déjà récupéré les utilisateurs
    var content = $("#usersgroups-panel .categorie-panel-content .row");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewusersgroups";
    sendAjaxRequest(url);

    startLoadingAnimation(); // starts loading animation
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

// FIN FONCTIONS TRAITANT LES RESULTATS DES DONNEES
// --------------------------------------------------
