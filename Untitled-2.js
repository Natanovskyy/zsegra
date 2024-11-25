$(document).ready(function () {
    const colors = ["green", "red", "yellow", "blue"];
    let gameSequence = [];
    let userSequence = [];
    let level = 0;
    let started = false;
    let headerElement = $("h1");

    function startGame() {
        level = 0;
        gameSequence = [];
        userSequence = [];
        started = true;
        nextSequence();
        headerElement.text("Poziom: " + level);
    }

    function nextSequence() {
        userSequence = [];
        level++;
        headerElement.text(`Poziom: ${level}`);
        
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        gameSequence.push(randomColor);

        $("#" + randomColor).fadeOut(100).fadeIn(100);
        playSound(randomColor);
    }

    function playSound(color) {
        const audio = new Audio(`../dzwiek/${color}.mp3`);
        $(audio).on("error", function () {
            console.error(`Nie znaleziono pliku dzwiekowego: ${color}.mp3`);
        });
        audio.play();

        $("#" + color).addClass("pressed");
        setTimeout(() => {
            $("#" + color).removeClass("pressed");
        }, 100);
    }

    function checkAnswer(currentLevel) {
        if (userSequence[currentLevel] === gameSequence[currentLevel]) {
            if (userSequence.length === gameSequence.length) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("game-over");
            $("body").addClass("game-over");
            $("h1").text("Przegrales... zacznij od nowa");
            startOver();
        }
    }

    $(".zse-kwadrat").click(function () {
        if (!started) return;
        
        const userChosenColor = $(this).attr("id");
        userSequence.push(userChosenColor);
        playSound(userChosenColor);

        checkAnswer(userSequence.length - 1);
    });

    function startOver() {
        started = false;
        $("h1").text("nacisnij start, aby rozpoczac gre");
    }

    $(".zse-container").click(function () {
        if (!started) {
            startGame();
        }
    });
});
