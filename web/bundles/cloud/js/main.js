// -----------------
// MAIN.JS : CLOUD
// -----------------

// Load when the page is loaded
window.onload = function () {
  initialize();
}

// Initialize default functions
function initialize() {
  hoverIndex();
  clickIndex();
  connectUser();
}

// Load the main hover effects
function hoverIndex() {
  $(".main-ui .header .title").hover(
    function () {
    $(".main-ui .header").css({
      height: '700px'
    });
  }, function () {
      $(".main-ui .header").css({
        height: '500px'
      });
  });

  $("#userform .button-function[func='signup']").hover(
    function () {
      $(this).css("text-decoration", "underline");
    }, function () {
      $(this).css("text-decoration", "none");
    }
  );
}


// Load the default click effects
function clickIndex() {
  // OPEN/CLOSE the search panel
  $(".menu-item[func='search']").click(function () {
    searchClicked();
  });
  $("#searchform .icon-button[func='closepanel']").click(function () {
    searchClicked();
  });

  // SHOW/HIDE signup form
  $("#userform .button-function[func='signup']").click(function () {
    toggleSignupClicked();
  });
}

// Open or Close the search panel
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

function connectUser() {
  var form = "#userform";
  var url = "/cloud/web/app_dev.php/login/";

  if ($(".button-function[func='signup']").isactive === "true") {
    url = "/cloud/web/app_dev.php/signup/";
  }

  sendAjaxRequest(url, form);
}

function sendAjaxRequest(url, form) {
  var _url  = url;
  var _form = form;
  var request; // variable to hold request

  // Bind to the submit event of our form
  $(form).submit(function(event) {
      if (request) request.abort(); // abort any pending request

      // Setup some local variables
      var $form = $(this);
      var $inputs = $form.find("input, select, button, textarea"); // cache fields
      var serializedData = $form.serialize();  // serialize the data in the form

      $inputs.prop("disabled", true); // disable inputs for the duration of the ajax request

      request = $.ajax({
          url: _url,
          type: "POST",
          data: serializedData
      });

      // callback handler that will be called on success
      request.done(function(response, textStatus, jqXHR) {
          if (_url === "/cloud/web/app_dev.php/login/") {
            console.log("login sucess");
            console.log(response);

            var textMessage = "You're now logged in";
            showMessage(textMessage, "information");
          }
          else if (_url === "/cloud/web/app_dev.php/signup/") {
            console.log("new user success");
            console.log(response);
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

function toggleSignupClicked() {
  if ($("#userform .button-function[func='signup']").attr("isactive") === "false") {

    var signupsection = $("#userform .signup-section").css("display", "block");
    var children = signupsection.children();
    children.each(function () {
      $(this).css({
        display: "block"
      });
    });

    $("#userform .button-function[func='signup']")
      .attr("isactive", "true")
      .html("Already have an account?");
  }
  else {
    $("#userform .button-function[func='signup']")
      .attr("isactive", "false")
      .html("Don't have an account yet?");

    var children = $("#userform .signup-section").children();
    children.each(function () {
      $(this).css({
        display: "none"
      });
    });
  }
}

function showMessage(message, type) {
  var messagepanel = $(".middle .message-panel");
  if (messagepanel.css("height") === "0px") {
    messagepanel.css({
      height: "0px",
      display: "block"
    }).animate({
      height: "100px",
      display: "inline-block"
    });

    messagepanel.html(message);
  }
  else {
    messagepanel.html(message);
  }
}

function chooseResponse(url, response) {

}

function viewUsers() {
  var url = "/cloud/web/app_dev.php/viewusers";

  sendAjaxRequest(url, null);
}
