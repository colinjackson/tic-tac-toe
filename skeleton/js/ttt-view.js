(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.$el = $el;
    this.setupBoard();
  };

  View.prototype.bindEvents = function () {
  };

  View.prototype.makeMove = function ($square) {
  };

  View.prototype.setupBoard = function () {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var length = (winHeight < winWidth ? winHeight - 52 : winWidth - 52);
    this.$el.width(length).height(length);

    for (var i = 0; i < 3; i++) {
      var $rowDiv = $("<div></div>");
      $rowDiv.height((length / 3) - 4);
      $rowDiv.addClass("row");

      for (var j = 0; j < 3; j++) {
        var $cellDiv = $("<div></div>");
        $cellDiv.width((length / 3) - 4);
        $cellDiv.addClass("cell");

        var $squareDiv = $("<div></div>");
        $squareDiv.addClass("square");

        $cellDiv.append($squareDiv);
        $rowDiv.append($cellDiv);
      }

      this.$el.append($rowDiv);
    }
  };
})();
