(function(module) {
  var aboutController = {};

  // DONE: Define a function that hides all main section elements, and then reveals just the #about section:
  aboutController.index = function() {
    $('main > *').hide();
    $('#about').show();
  };

  module.aboutController = aboutController;
})(window);
