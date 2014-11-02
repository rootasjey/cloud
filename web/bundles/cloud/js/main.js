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
    console.log("panel?");
  });

  // SHOW/HIDE signup form
  $("#userform .button-function[func='signup']").click(function () {

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
          console.log("finished hide");
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
    var _url = null;
    var request; // variable to hold request

    // Bind to the submit event of our form
    $("#userform").submit(function(event) {
        if (request) request.abort(); // abort any pending request

        _url = "/login/";
        if ($(".button-function[func='signup']").isactive === true) {
          _url = "/signup/";
        }


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

            if (_url === "/login/") {
                console.log("login sucess");
            }
            else if (_url === "/signup/") {
                console.log("new user success");
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
