// ----------------------
// CONTENT.JS - CLOUD
// ----------------------

var _pendingAjaxRequest = "";

// DEBUT FONCTIONS D'AFFICHAGE
// ---------------------------
// Affiche les cat�gories apr�s identification de l'utilisateur
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

// Masque les cat�gories si l'utilisateur se d�connecte
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

// Se d�clenche quand un utilisateur click sur une des cat�gories
function clickCategories() {
    $(".square").click(function () {
        // R�cup�re le s�lecteur ainsi que l'objet (jquery) panel
        // Puis lance la fonction permettant d'afficher ou masquer le panel
        var selector = "#" + $(this).attr("func") + "-panel";
        var panel = $(selector);
        openCategoriePanel(panel);

        // Lance la requ�te ajax ad�quate
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

// Affiche/Masque les sections des cat�gories
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
// Envoie une requ�te ajax � la route pass�e en param�tre
function sendAjaxRequest(url) {
    // Bloque la fonction ajax si elle est d�j� lanc�e avec la m�me url
    if (_pendingAjaxRequest === url) {
        return;
    }

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {

            var data = JSON.parse(http.response);

            if (url.indexOf("/cloud/web/app_dev.php/viewusers/") > -1) {
                viewUsersResult(data);
            }
            else if (url.indexOf("/cloud/web/app_dev.php/viewusersgroups") > -1) {
                viewUsersgroupsResult(data);
            }
            else if (url.indexOf("/cloud/web/app_dev.php/viewfiles/") > -1) {
                viewFilesResult(data);
                // getSelectedViewResult(data);
            }
            else if (url.indexOf("/cloud/web/app_dev.php/viewfilesgroups") > -1) {
                viewFilesgroupsResult(data);
            }
            else if (url.indexOf("/cloud/web/app_dev.php/getaccess") > -1) {
                getAccessResult(data);
            }
            else if (url.indexOf("/cloud/web/app_dev.php/viewsinglefilegroup") > -1) {
                getGroupTitleResult(data);
            }
            else if (url.indexOf("/cloud/web/app_dev.php/deletefile/") > -1) {
                viewDeleteFileResult(data);
            }
        }
    }
    http.open("POST", url);
    http.send();

    _pendingAjaxRequest = url;
}

// Envoie une requ�te ajax vers la route avec des param�tres
function sendAjaxRequestWithParameters(url, parameter) {
    // Bloque la fonction ajax si elle est d�j� lanc�e avec la m�me url
    if (_pendingAjaxRequest === url) {
        return;
    }

    var http = new XMLHttpRequest();
    var _url = url + "/" + parameter;

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = http.response;
            console.log(data);
            data = JSON.parse(data);


            if (_url == "/cloud/web/app_dev.php/deleteuser/" + parameter) {
                viewDeleteUserResult(data);
            }
            else if (_url == "/cloud/web/app_dev.php/deletefile/" + parameter) {
                viewDeleteFileResult(data);
            }
            else if (_url == "/cloud/web/app_dev.php/deleteusergroup/" + parameter) {
                viewDeleteUsergroupResult(data);
            }
            else if (_url == "/cloud/web/app_dev.php/deletefilegroup/" + parameter) {
                viewDeleteFilegroupResult(data);
            }
            else if (_url == "/cloud/web/app_dev.php/deleteview/" + parameter) {
                viewDeleteViewResult(data);
            }
        }
    }
    http.open("POST", _url);
    http.send();

    _pendingAjaxRequest = _url;
}
// FIN FONCTIONS AJAX
// ------------------



// DEBUT FONCTIONS DEMANDANT LES DONNEES
// ------------------------------------
// Affiche la liste des fichiers
function viewFiles() {
    // Scroll down vertically to the element
    $('html, body').animate({
        scrollTop: $("#files-panel").offset().top
    }, 500);

    // Test si on n'a pas d�j� r�cup�r� les fichiers
    var content = $("#files-panel .table-body tr");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewfiles/" + _user.useraccess;
    // sendAjaxRequest(url);
    // console.log(url);

    // startLoadingAnimation(); // starts loading animation
    startLoadingAnimationCustomPlace("#files-panel .categorie-panel-content");

    // � d�placer
    getAccess();
}

// Affiche la liste des groupes de fichiers
function viewFilesgroups() {
    // Scroll down vertically to the element
    $('html, body').animate({
        scrollTop: $("#filesgroups-panel").offset().top
    }, 500);

    // Test si on n'a pas d�j� r�cup�r� les utilisateurs
    var content = $("#filesgroups-panel .categorie-panel-content .filesgroups .group-card");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewfilesgroups";
    sendAjaxRequest(url);

    startLoadingAnimationCustomPlace("#filesgroups-panel .categorie-panel-content");
}

// Affiche les utilisateurs
function viewUsers() {
    // Scroll down vertically to the element
    $('html, body').animate({
        scrollTop: $("#users-panel").offset().top
    }, 500);

    // Test si on n'a pas d�j� r�cup�r� les utilisateurs
    var content = $("#users-panel .categorie-panel-content .users .row");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewusers/";
    sendAjaxRequest(url);

    startLoadingAnimationCustomPlace("#users-panel .categorie-panel-content");
}

// Affiche la liste des groupes d'utilisateurs
function viewUsersgroups() {
    // Scroll down vertically to the element
    $('html, body').animate({
        scrollTop: $("#usersgroups-panel").offset().top
    }, 500);

    // Test si on n'a pas d�j� r�cup�r� les utilisateurs
    var content = $("#usersgroups-panel .categorie-panel-content .usersgroups .group-card");
    if (content.length > 0)
        return;

    var url = "/cloud/web/app_dev.php/viewusersgroups";
    sendAjaxRequest(url);

    startLoadingAnimationCustomPlace("#usersgroups-panel .categorie-panel-content");
}

// FIN FONCTIONS DEMANDANT LES DONNEES
// -----------------------------------


// -------------------------------
// FONCTION SUPPRIMANT DES DONNEES
// -------------------------------
// Supprime un utilisateur
function deleteUser(id) {
    var url = "/cloud/web/app_dev.php/deleteuser";
    sendAjaxRequestWithParameters(url, id);
}

// Supprime un fichier
function deleteFile(id, groupid) {
    // Récupère le nom de la vue du fichier
    // >récupère le titre du groupe du fichier
    getFileGroup(groupid, "deletefile", id);
}

function processDeleteFile(viewTitle, fileid) {
    viewTitle = "v_" + viewTitle;
    console.log(viewTitle);
    var url = "/cloud/web/app_dev.php/deletefile/" +  _user.useraccess + "/" + viewTitle + "/" + fileid;
    sendAjaxRequest(url);
}

// Supprime un groupe d'utilisateurs
function deleteUsergroup(id) {
    var url = "/cloud/web/app_dev.php/deleteusergroup";
    sendAjaxRequestWithParameters(url, id);
}

// Supprime un groupe de fichiers
function deleteFilegroup(id, title) {
    var url = "/cloud/web/app_dev.php/deletefilegroup";
    var parameters = id + "/" + title;

    sendAjaxRequestWithParameters(url, parameters);
}

function deleteView(title) {
    var url = "/cloud/web/app_dev.php/deleteview";
    var view = "v_" + title
    sendAjaxRequestWithParameters(url, view);
}
// FIN FONCTION SUPPRIMANT DES DONNEES
// -----------------------------------

// -------------------------------
// FONCTION EDITANT DES DONNEES
// -------------------------------
// Edite un utilisateur
function editUser(id) {
    // Affiche le formulaire d'�dition pr�-rempli
    getUser(id);
}

// Edite un fichier
function editFile(id) {
    // Affiche le formulaire d'�dition pr�-rempli
    getFile(id, "edit");
}

// Edite un groupe d'utilisateurs
function editUserGroup(id) {
    // Affiche le formulaire d'�dition pr�-rempli
    getUserGroup(id);
}

// Edite un groupe de fichiers
function editFileGroup(id) {
    // Affiche le formulaire d'�dition pr�-rempli
    getFileGroup(id, "edit");
}

// FIN FONCTION SUPPRIMANT DES DONNEES
// -----------------------------------


// DEBUT FONCTIONS TRAITANT LES RESULTATS DES DONNEES
// --------------------------------------------------
// Fonction post-traitement ajax pour la vue des utilisateurs
function viewUsersResult(data) {
    _pendingAjaxRequest = null; // requ�te ajax termin�e

    if (data.length < 1) {
        // Affiche un message si on n'a r�cup�r� aucune donn�e
        var textMessage = "Il n'y a aucun utilisateur pour le moment";
        showMessage(textMessage, "error");
        stopLoadingAnimationCustomPlace("#users-panel .categorie-panel-content");
        return;
    }

    // R�cup�re l'objet o� on va ins�rer le contenu
    var content = $("#users-panel .categorie-panel-content .users");

    // Traitement des donn�es
    for (var i = 0; i < data.length; i++) {
        // Cr�e l'avatar
        var avatar = $("<img>", {
            class:"avatar",
            alt: "avatar",
            src : "/cloud/web/bundles/cloud/icon/user-icon.png"
        });

        // Cr�e les �l�ments groupid (id du groupe) et name (nom)
        var groupid = $("<span>", { class: 'user-groupid', html: data[i].groupid });
        var name = $("<span>", { class: 'user-name', html: " " + data[i].name });

        if (groupid.html().length > 3) {
            groupid.html(groupid.html().substring(0, 4) + "...");
        }

        if (name.html().length > 4) {
            name.html(name.html().substring(0, 4) + "...");
        }

        // Cr�e le contenu de la ligne d'informations
        var rowtext = $("<div>", {
            class: "row-text"
        });

        // Cr�e la ligne d'informations des utilisateurs
        var row = $("<div>", {
            class: "row",
            userid: data[i].id
        }).appendTo(content);

        // Cr�e l'icone d'�dition
        var editIcon = $("<img>", {
            class: "icon-button",
            func: "edit-user",
            userid: data[i].id,
            src : "/cloud/web/bundles/cloud/icon/edit-icon.png"
        });

        // Cr�e l'icone de suppression
        var deleteIcon = $("<img>", {
            class: "icon-button",
            func: "delete-user",
            userid: data[i].id,
            src : "/cloud/web/bundles/cloud/icon/minus-icon.png"
        });

        // Ins�re le contenu dans la ligne
        // Attache l'icone d'�dition, de suppression, l'avatar
        // et enfin le contenu de la ligne � l'objet row (ligne)
        row.append(editIcon).append(deleteIcon).append(avatar).append(rowtext);

        // Ajoute le groupid et le nom de l'utilisateur au contenu de la ligne
        // Attache le groupid et le nom au contenu de la ligne (rowtext)
        rowtext.append(groupid).append(name);


        // -------------------
        // Ajoute les tooltips
        addTooltip(".row[userid='" + data[i].id + "'] .user-name", data[i].name);
        addTooltip(".row[userid='" + data[i].id + "'] .user-groupid", "groupe: " + data[i].groupid);
    }

    // Ajoute les toolitps de description
    addTooltip(".avatar", "avatar");
    // addTooltip(".user-groupid", "id du group de l'utilisateur");
    addTooltip(".icon-button[func='edit-user']", "editer");
    addTooltip(".icon-button[func='delete-user']", "supprimer");

    // Ev�nements
    clickDeleteUser();  // �v�nement de suppression
    clickEditUser();    // �v�nement d'�dition

    // Arr�te l'animation de chargement
    stopLoadingAnimationCustomPlace("#users-panel .categorie-panel-content");
}

// Fonction post-traitement ajax pour la vue des groupes d'utilisateurs
function viewUsersgroupsResult(data) {
    _pendingAjaxRequest = null; // requ�te ajax termin�e

    if (data.length < 1) {
        // Affiche un message si on n'a r�cup�r� aucune donn�e
        var textMessage = "Il n'y a pas de groupe d'utilisateurs pour le moment";
        showMessage(textMessage, "error");
        stopLoadingAnimationCustomPlace("#usersgroups-panel .categorie-panel-content");
        return;
    }

    // R�cup�re l'objet o� on va ins�rer le contenu
    var content = $("#usersgroups-panel .categorie-panel-content .usersgroups");

    // Traitement des donn�es
    for (var i = 0; i < data.length; i++) {
        // Cr�e la carte de groupe
        var card = $("<div>", {
            class   : "group-card",
            groupid : data[i].id
        }).appendTo(content);

        // Cr�e le header
        var header = $("<div>", {
            class:"group-card-header"
        });

        // Cr�e le contenu
        var groupid = $("<span>", { class: 'group-id', html: data[i].id });
        var grouptitle = $("<span>", { class: 'group-title', html: data[i].title });

        // Tronque le titre s'il est trop long
        if (grouptitle.html().length > 15) {
            addTooltipJquery(grouptitle, grouptitle.html(), "bottom center", "top center");
            grouptitle.html(grouptitle.html().substring(0, 12) + "...");
        }

        // Attache les �l�ments au DOM (Document Object Model)
        card.append(header);        // attache l'objet header au parent card
        card.append(groupid);       // attache l'objet groupid au parent card
        header.append(grouptitle);  // attache l'objet grouptitle au parent header


        //  Cr�e un bouton text  (pour l'�dition)
        var edit = $("<div>", {
            class: "text-button",
            func : "edit-usergroup",
            groupid: data[i].id,
            html: "edit"
        });

        //  Cr�e un second bouton text (pour la suppression)
        var del = $("<div>", {
            class: "text-button",
            func : "delete-usergroup",
            groupid: data[i].id,
            html: "delete"
        });

        header.append(edit);
        header.append(del);
    }

    // Ajoute les toolitps de description
    addTooltip(".group-id", "group id");
    // addTooltip(".user-groupid", "id du group de l'utilisateur");
    // addTooltip(".icon-button[func='edit-user']", "editer");
    // addTooltip(".icon-button[func='delete-user']", "supprimer");

    // Ev�nements
    clickDeleteUsergroup();
    clickEditUsergroup();

    // Stop l'animation de chargement
    stopLoadingAnimationCustomPlace("#usersgroups-panel .categorie-panel-content");
}

// Fonction post-traitement ajax pour la vue des fichiers
function viewFilesResult(data) {
    _pendingAjaxRequest = null; // requete ajax terminee
    // console.log("tata");
    if (data.length < 1) {
        // Affiche un message si on n'a recupere aucune donnee
        var textMessage = "There's no result for this request.";
        showMessage(textMessage, "error");
        return;
    }

    // Reeupere l'objet on va inserer le contenu
    var fileslist = $("#files-panel .categorie-panel-content .files-list");
    var content = $("#files-panel .categorie-panel-content .files-list .table-body");

    // Traitement des donnees
    for (var i = 0; i < data.length; i++) {
        var tr = $("<tr>");

        var name    = $("<td>", { class:"td-name" }).html(data[i].name);
        var group   = $("<td>", { class:"td-group" }).html(data[i].groupid);
        var path    = $("<td>", { class:"td-path" }).html(data[i].path);
        var type    = $("<td>", { class:"td-type" }).html(data[i].type);
        var pubdate = $("<td>", { class:"td-pubdate" }).html(data[i].pubDate);
        var tags    = $("<td>", { class:"td-tags" }).html(data[i].tags);
        var owner   = $("<td>", { class:"td-owner" }).html(data[i].owner);

        var _edit   = $("<td>", { class: "text-button", func: "edit-file", fileid: data[i].id, filegroupid: data[i].groupid }).html("edit");
        var _delete  = $("<td>", { class: "text-button", func: "delete-file", fileid: data[i].id, filegroupid: data[i].groupid }).html("delete");

        tr.append(name).append(group).append(path).append(type).append(pubdate).append(tags).append(owner);
        tr.append(_edit).append(_delete);
        content.append(tr);
    }

    // Arrete l'animation de chargement
    stopLoadingAnimationCustomPlace("#files-panel .categorie-panel-content");

    // Animations
    fileslist.css({ display: "block", opacity: "0", top: "20px"})
             .animate({ opacity: "1", top :"0" });


    // Evenements
    clickEditFile();
    clickDeleteFile();
}

// Fonction post-traitement ajax pour la vue des groupes de fichiers
function viewFilesgroupsResult(data) {
    _pendingAjaxRequest = null; // requ�te ajax termin�e

    if (data.length < 1) {
        // Affiche un message si on n'a r�cup�r� aucune donn�e
        var textMessage = "Il n'y a pas de groupe de fichiers disponibles pour le moment.";
        showMessage(textMessage, "error");
        stopLoadingAnimationCustomPlace("#filesgroups-panel .categorie-panel-content");
        return;
    }

    // R�cup�re l'objet o� on va ins�rer le contenu
    var content = $("#filesgroups-panel .categorie-panel-content .filesgroups");

    // Traitement des donn�es
    for (var i = 0; i < data.length; i++) {
        // Cr�e la carte de groupe
        var card = $("<div>", {
            class: "group-card"
        }).appendTo(content);

        // Cr�e le header
        var header = $("<div>", {
            class:"group-card-header"
        });

        // Cr�e le contenu
        var groupid = $("<span>", { class: 'group-id', html: data[i].id });
        var grouptitle = $("<span>", { class: 'group-title', html: data[i].title });

        // Tronque le titre s'il est trop long
        if (grouptitle.html().length > 15) {
            addTooltipJquery(grouptitle, grouptitle.html(), "bottom center", "top center");
            grouptitle.html(grouptitle.html().substring(0, 12) + "...");
        }

        // Attache les �l�ments au DOM (Document Object Model)
        card.append(header);        // attache l'objet header au parent card
        card.append(groupid);       // attache l'objet groupid au parent card
        header.append(grouptitle);  // attache l'objet grouptitle au parent header


        //  Cr�e un bouton text  (pour l'�dition)
        var edit = $("<div>", {
            class       : "text-button",
            groupid     : data[i].id,
            grouptitle  : data[i].title,
            func        : "edit-filegroup",
            html        : "edit"
        });

        //  Cr�e un second bouton text (pour la suppression)
        var del = $("<div>", {
            class       : "text-button",
            groupid     : data[i].id,
            grouptitle  : data[i].title,
            func        : "delete-filegroup",
            html        : "delete"
        });

        header.append(edit);
        header.append(del);
    }

    // Ajoute les toolitps de description
    addTooltip(".group-id", "group id");
    // addTooltip(".user-groupid", "id du group de l'utilisateur");
    // addTooltip(".icon-button[func='edit-user']", "editer");
    // addTooltip(".icon-button[func='delete-user']", "supprimer");

    // Ev�nements
    clickDeleteFilegroup();
    clickEditFilegroup();

    // Stop l'animation de chargement
    stopLoadingAnimationCustomPlace("#filesgroups-panel .categorie-panel-content");
}


// Suppressions
// ------------
function viewDeleteUserResult(data) {
    _pendingAjaxRequest = null; // requ�te ajax termin�e

    if (data.error !== "true") {
        var text = "L'utilisateur a �t� supprim�(e) avec succ�s."
        showMessage(text, "error");
        refreshUsers();
    }
    else {
        var text = "D�sol�, nous n'avons pas pu supprimer l'utilisateur."
        showMessage(text, "error");
        // refreshUsers();
    }
}

function viewDeleteFileResult(data) {
    _pendingAjaxRequest = null; // requ�te ajax termin�e

    if (data.error !== "true") {
        var text = "Le fichier a ete supprime avec succes."
        showMessage(text, "error");
        refreshFiles();
    }
    else {
        var text = "Desole, nous n'avons pas pu supprimer le fichier."
        showMessage(text, "error");
        // refreshFiles();
    }
}

function viewDeleteUsergroupResult(data) {
    _pendingAjaxRequest = null; // requ�te ajax termin�e

    if (data.error !== "true") {
        var text = "Le groupe d'utilisateurs a �t� supprim� avec succ�s."
        showMessage(text, "error");

        var card = $(".group-card[groupid='" + data.id + "']");
        card.animate({
            opacity: 0,
            top: "20px"
        });
    }
    else {
        var text = "D�sol�, nous n'avons pas pu supprimer le groupe d'utilisateurs."
        showMessage(text, "error");
        // refreshUsersGroups();
    }
}

function viewDeleteFilegroupResult(data) {
    _pendingAjaxRequest = null; // requ�te ajax termin�e

    if (data.error !== "true") {
        var text = "Le groupe de fichiers <strong>" + data.title + "</strong> a �t� supprim� avec succ�s."
        showMessage(text, "error");
        refreshFilesgroups();

        // Suppression de la vue associ�e au groupe de fichiers
        deleteView(data.title);
    }
    else {
        var text = "D�sol�, nous n'avons pas pu supprimer le groupe de fichiers <strong>"
                    + data.title + "</strong>."
        showMessage(text, "error");
        // refreshFilesgroups();
    }
}

function viewDeleteViewResult(data) {
    var group = data.title.substring(2);

    if (data.error !== "true") {
        var text = "La vue <strong>"+ data.title +
                    "</strong> du groupe de fichiers <strong> " + group +
                    "</strong>  a �t� supprim� avec succ�s."
        showMessage(text, "error", "keep");

    }
    else {
        var text = "D�sol�, nous n'avons pas pu supprimer la vue <strong> " + data.title
                    + "</strong> du groupe de fichiers" + group + "</strong> ";
        text += "<br>" + data.message;
        showMessage(text, "error", "keep");
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

    // Envoie une nouvelle requ�te au serveur
    viewUsers();
}

function refreshFiles() {
    // Vide le contenu
    var content = $("#files-panel .categorie-panel-content .table-body");
    content.html("");

    // Masque le tableau
    $("#files-panel .categorie-panel-content .files-list").css({ display: "none" });

    // Envoie une nouvelle requ�te au serveur
    viewFiles();
}

function refreshUsersGroups() {
    // Vide le contenu
    var content = $("#usersgroups-panel .categorie-panel-content .usersgroups");
    content.html("");

    // Envoie une nouvelle requ�te au serveur
    viewUsersgroups();
}

function refreshFilesgroups() {
    // Vide le contenu
    var content = $("#filesgroups-panel .categorie-panel-content .filesgroups");
    content.html("");

    // Envoie une nouvelle requ�te au serveur
    viewFilesgroups();
}

// FIN FONCTIONS DE RAFRAICHISSEMENT DES DONNEES
// -----------------------------------------------


// DEBUT EVENEMENTS
// ----------------
// ------
// DELETE
// ------
// Ev�nement de click pour supprimer un utilisateur
function clickDeleteUser() {
    $(".icon-button[func='delete-user']").click(function () {
        var id = $(this).attr("userid");
        deleteUser(id);
    });
}

// Ev�nement de click pour supprimer un fichier
function clickDeleteFile() {
    $("td[func='delete-file']").click(function () {
        var id = $(this).attr("fileid");
        var groupid = $(this).attr("filegroupid");
        deleteFile(id, groupid);
    });
}

// Ev�nement de click pour supprimer un groupe d'utilisateurs
function clickDeleteUsergroup() {
    $(".text-button[func='delete-usergroup']").click(function () {
        var id = $(this).attr("groupid");
        deleteUsergroup(id);
    });
}

// Ev�nement de click pour supprimer un groupe de fichiers
function clickDeleteFilegroup() {
    $(".text-button[func='delete-filegroup']").click(function () {
        var id = $(this).attr("groupid");
        var title = $(this).attr("grouptitle");
        deleteFilegroup(id, title);
    });
}

// -------
// EDITION
// -------
// Ev�nement de click pour editer un utilisateur
function clickEditUser() {
    $(".icon-button[func='edit-user']").click(function () {
        var id = $(this).attr("userid");
        editUser(id);
    });
}

// Ev�nement de click pour editer un fichier
function clickEditFile() {
    $("td[func='edit-file']").click(function () {
        var id = $(this).attr("fileid");
        editFile(id);
    });
}

// Ev�nement de click pour editer un groupe d'utilisateurs
function clickEditUsergroup() {
    $(".text-button[func='edit-usergroup']").click(function () {
        var id = $(this).attr("groupid");
        editUserGroup(id);
    });
}

// Ev�nement de click pour editer un groupe fichiers
function clickEditFilegroup() {
    $(".text-button[func='edit-filegroup']").click(function () {
        var id = $(this).attr("groupid");
        editFileGroup(id);
    });
}

// Ev�nement de click pour actualiser un panel
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
            refreshUsersGroups();
        }
        else if (id === "files-panel") {
            refreshFiles();
        }
        else if (id === "filesgroups-panel") {
            refreshFilesgroups();
        }
    });
}

// Ev�nement de click pour ajouter un �l�ment
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
            // console.log($("input[type='file']").val());
        }
        else if (id === "filesgroups-panel") {
            toggleAddFilegroup();
        }
    });
}

function clickAddAccessToUsergroup(card) {
    // Decide si on doit ajouter ou revoquer l'acces
    var status = card.attr("status");

    console.log("status: " + status);
    // var usersgroupsid = _user.groupid;
    var usersgroupsid = $("#addusergroupform input[name='id']").val();
    var usersgroupstitle = $("#addusergroupform input[name='title']").val();
    console.log(usersgroupstitle);

    var filesgroupsid = card.attr("filesgroupsid");
    var filesgroupstitle = card.attr("filesgroupstitle");

    if (status === "in") {
        // On r�voque l'acc�s
        console.log("revoque l'acces");
        // console.log("usersgroupsid : " + usersgroupsid);
        // console.log("filesgroupsid : " + filesgroupsid);
        // console.log("filesgroupstitle : " + filesgroupstitle);

        deleteGroupAccess(usersgroupsid, filesgroupsid, filesgroupstitle);
        deleteGrantFromView(filesgroupstitle);
    }
    else if (status === "out") {
        // On ajoute l'acc�s
        console.log("ajoute l'acces");
        // console.log("usersgroupsid : " + usersgroupsid);
        // console.log("filesgroupsid : " + filesgroupsid);
        // console.log("filesgroupstitle : " + filesgroupstitle);

        addGroupAccess(usersgroupsid, filesgroupsid, 0, filesgroupstitle);
        addGrantOnView(filesgroupstitle, usersgroupstitle);
    }
}

// Evenement pour s�lectionner un fichier � partir de la boite de dialogue
function performClick(elemId) {
    console.log("browse file");
    var elem = document.getElementById(elemId);
    if(elem && document.createEvent) { // sanity check
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        node.dispatchEvent(evt);
    }
}

// $(":file").change(function(){
//     alert($(":file").val());
//     console.log("toto");
//
// });

// ----------------
// FIN : EVENEMENTS
// ----------------

function addGrantOnView(view, usersgroupstitle) {
    // var user = usersgroupstitle;
    var view = "v_" + view;

    console.log("user : " + usersgroupstitle);
    console.log("view : " + view);

    var http = new XMLHttpRequest();
    var url = "/cloud/web/app_dev.php/addgrantonview/" + usersgroupstitle + "/" + view;
    console.log(url);


    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = http.response;

            console.log("success added grant on view");
        }
    }
    http.open("POST", url);
    http.send();
}

function deleteGrantFromView(view) {
    var user = _user.useraccess;
    var view = "v_" + view;

    console.log("user : " + user);
    console.log("view : " + view);

    var http = new XMLHttpRequest();
    var url = "/cloud/web/app_dev.php/deletegrantfromview/" + user + "/" + view;


    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var data = http.response;

            console.log("success deleted grant on view");
        }
    }
    http.open("POST", url);
    http.send();
}

// ---------------
// DEBUT : GETTER
// ---------------
// Obtient la liste des groupes de fichiers accessibles
// Permettra ensuite de faire une requ�te sur les vues (de fichiers) corrspondantes
function getAccess() {
    var url = "/cloud/web/app_dev.php/getaccess/" + _user.groupid;
    sendAjaxRequest(url);
}

function getAccessResult(data) {
    // console.log(data);

    for (var i = 0; i < data.length; i++) {
        var groupid = data[i].filesgroupsid;
        // console.log("groupid: " + groupid);
        getGroupTitle(groupid);
    }
}

function getGroupTitle(usersgroupsid) {
    var url = "/cloud/web/app_dev.php/viewsinglefilegroup/" + usersgroupsid;
    // console.log(url);
    sendAjaxRequest(url);
}

function getGroupTitleResult(data) {
    console.log(data);

    for (var i = 0; i < data.length; i++) {
        var title = data[i].title;
        // console.log("title: " + title);
        getSelectedView(title);
    }
}

function getSelectedView(title) {
    var viewName = "v_" + title;

    var url = "/cloud/web/app_dev.php/viewfiles/" + _user.useraccess + "/" + viewName;
    console.log(url);
    sendAjaxRequest(url);
}

function getSelectedViewResult(data) {
    console.log(data);
}

// ---------------
// FIN : GETTER
// ---------------
