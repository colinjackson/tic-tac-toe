(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.$el = $el;
    this.game = game;

    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    $(".square").on("click", function () {
      var $square = $(event.currentTarget);
      $square.addClass("square-occupied");

      this.makeMove($square);
    }.bind(this));
  };

  View.prototype.makeMove = function ($square) {
    var pos = $square.data("pos");
    var mark = this.game.currentPlayer;

    this.game.playMove(pos);
    $square.append(mark);

    if (this.checkForGameOver()) {
      this.game = new TTT.Game();
      this.$el.empty();
      this.setupBoard();
      this.bindEvents();
    }
  };

  View.prototype.checkForGameOver = function () {
    if (!this.game.isOver()) {
      return false;
    }

    var winner = this.game.winner();
    if (winner) {
      window.alert(winner + " wins!");
    } else {
      window.alert("It's a draw...");
    }

    return true;
  };

  View.prototype.setupBoard = function () {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var length = (winHeight < winWidth ? winHeight - 52 : winWidth - 52);
    this.$el.width(length).height(length);

    for (var i = 0; i < 3; i++) {
      var $row = $("<div></div>");
      $row.height((length / 3) - 4);
      $row.addClass("row");

      for (var j = 0; j < 3; j++) {
        this.generateCell($row, length, [i, j]);
      }

      this.$el.append($row);
    }
  };

  View.prototype.generateCell = function ($row, length, pos) {
    var $cell = $("<div></div>");
    $cell.width((length / 3) - 4);
    $cell.addClass("cell");

    var $square = $("<div><span></span></div>");
    $square.data("pos", pos);
    $square.css("line-height", $row.height() + "px");
    $square.css("font-size", $row.height() / 1.75 + "px");
    $square.addClass("square");

    $cell.append($square);
    $row.append($cell);
  }
})();
