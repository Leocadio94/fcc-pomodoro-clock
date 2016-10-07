function startCountdown(duration, display) {
  var timer = duration,
    minutes, seconds;
  return setInterval(function() {
    if ($("#pomodoro").hasClass('started')) {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(minutes + ":" + seconds);

      if (--timer < 0) {
        if ($("#pomodoro").hasClass('pomodoro-break')) {
          timer = (60 * parseInt($('#s-length').text()));
          $("#session").text("Started");
          $("#pomodoro").removeClass("pomodoro-break");
        } else {
          timer = (60 * parseInt($('#b-length').text()));
          $("#session").text("Break!");
          $("#pomodoro").addClass("pomodoro-break");
        }

        $("#session").effect("shake");
        $("#time").effect("shake");
      }

    }
  }, 1000);
}

$(document).ready(function() {
  var timer = 0;
  var time = (60 * parseInt($('#s-length').text()));
  var display = $('#time');
  var first_click = true;
  display.text($("#s-length").text());
  $("#pomodoro").click(function() {
    if (first_click) {
      time = (60 * parseInt($('#s-length').text()));
      first_click = false;
      $("#pomodoro").addClass("started");
      $("#session").text("Started");
      timer = startCountdown(time, display);
    } else {
      $("#pomodoro").toggleClass("started");
      if ($("#pomodoro").hasClass('started')) {
        if ($("#pomodoro").hasClass('pomodoro-break')) {
          $("#session").text("Break!");
        } else {
          $("#session").text("Started");
        }
      } else {
        $("#session").text("Stopped");
      }
    }
  });
  $("#min-break").click(function() {
    if (!$("#pomodoro").hasClass('started')) {
      var blength = parseInt($("#b-length").text(), 10);

      if (blength > 1) {
        $("#b-length").text(blength - 1);
        if ($("#pomodoro").hasClass('pomodoro-break')) {
          display.text($("#b-length").text());
          clearInterval(timer);
          timer = (60 * parseInt($('#b-length').text()));
          first_click = true;
        }
      }

    }
  });
  $("#plus-break").click(function() {
    if (!$("#pomodoro").hasClass('started')) {
      $("#b-length").text(parseInt($("#b-length").text(), 10) + 1);
      if ($("#pomodoro").hasClass('pomodoro-break')) {
        display.text($("#b-length").text());
        clearInterval(timer);
        timer = (60 * parseInt($('#b-length').text()));
        first_click = true;
      }
    }
  });
  $("#min-session").click(function() {

    if (!$("#pomodoro").hasClass('started')) {
      var slength = parseInt($("#s-length").text(), 10);

      if (slength > 1) {
        $("#s-length").text(slength - 1);
        display.text($("#s-length").text());
        clearInterval(timer);
        timer = (60 * parseInt($('#s-length').text()));
        first_click = true;
        $("#pomodoro").removeClass("pomodoro-break");
      }
    }
  });
  $("#plus-session").click(function() {

    if (!$("#pomodoro").hasClass('started')) {
      $("#s-length").text(parseInt($("#s-length").text(), 10) + 1);
      display.text($("#s-length").text());
      clearInterval(timer);
      timer = (60 * parseInt($('#s-length').text()));
      first_click = true;
      $("#pomodoro").removeClass("pomodoro-break");
    }
  });
  $("#reset").click(function() {
    $("#s-length").text(25);
    $("#b-length").text(5);
    $("#session").text("Session");
    display.text($("#s-length").text());
    clearInterval(timer);
    timer = (60 * parseInt($('#s-length').text()));
    first_click = true;
    $("#pomodoro").removeClass("started");
    $("#pomodoro").removeClass("pomodoro-break");
  });
});