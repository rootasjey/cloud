// -----------------
// MAIN.JS : CLOUD
// -----------------

// Lance cette fonction quand la page est totalement chargée
window.onload = function () {
  initialize();
}

// Initialise les fonctions par défaut
function initialize() {
  hoverIndex();
  clickIndex();
  prepareLoginForm();
  clickCategories();
}

// Charge les effets hover sur les éléments de la page d'index
function hoverIndex() {
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
      $(this).css("text-decoration", "underline");
    }, function () {
      $(this).css("text-decoration", "none");
    }
  );
}

// Charge les événements de click sur les éléments de la page d'index
function clickIndex() {
    // OPEN/CLOSE the search panel
    $(".menu-item[func='search']").click(function () {
        searchClicked();
    });
    $(".icon-button[func='closepanel']").click(function () {
    var parent = $(this).parent();
        closePanel(parent);
    });

    // SHOW/HIDE connection panel
    $(".menu-item[func='login']").click(function () {
        showConnectionPanel();
    });

    // SHOW/HIDE signup form
    $("#userform .button-function[func='signup']").click(function () {
        toggleSignupClicked();
    });

    $(".menu-item[func='help']").click(function () {
        viewUsers();
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
    $(".message-panel .action-icon").click(function () {
        messagepanel.animate({
          height: "0",
        }, {
          complete: function () {
            $(this).css({ display: "none"});
          }
        });
    });
}

// Fonction post-traitement ajax pour la connexion
function loginResult(response) {
  if (response.length > 0) {
    // La requête s'est bien déroulée ->l'utilisateur est connectée
    console.log(response);

    // Affiche un message
    var textMessage = "You're now logged in";
    showMessage(textMessage, "information");

    // Masque le panel de connexion
    $("#userform").css({

    }).animate({
        height: "0"
    }, {
        complete: function () {
            $(this).css("display", "none");
        }
    })
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

    }
    else {
        var textMessage = "Sorry, there was a problem";
        showMessage(textMessage, "error");
    }
}

// Fonction post-traitement ajax pour la vue des utilisateurs
function viewUsersResult(response) {
  if (data.length < 1) {
    var textMessage = "There's no result for this request.";
    showMessage(textMessage, "error");
    return;
  }

  for (var i = 0; i < data.length; i++) {
    console.log(data[i].name + " " + data[i].email + " " + data[i].subscriptiondate);
  }
}

// Affiche les utilisateurs
function viewUsers() {
  console.log("tata");
  var url = "/cloud/web/app_dev.php/viewusers";
  sendAjaxRequest(url);
}

// Se déclenche quand un utilisateur click sur une des catégories
function clickCategories() {
    $(".square").click(function () {
        // Récupère le sélecteur ainsi que l'objet (jquery) panel
        // Puis lance la fonction permettant d'afficher ou masquer le panel
        var selector = "#" + $(this).attr("func") + "-panel";
        var panel = $(selector);
        openCategoriePanel(panel);
    });
}

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
