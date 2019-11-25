var index = 1;
var interval;
var colors = ["red", "orange", "green"];
var myimg = document.getElementsByTagName("img")[0];
myimg.setAttribute("src", colors[index - 1] + ".png");

function readyGo() {
    if (index === 4) {
        index = 1;
    }


    myimg.setAttribute("src", colors[index - 1] + ".png");
    index++;


}

document.getElementById("play").addEventListener("click", function play() {
    interval = setInterval(readyGo, 1000);

});
document.getElementById("stop").addEventListener("click", function play() {
    clearInterval(interval);
    index--;
});

document.getElementById("prev").addEventListener("click", function play() {
    if (index === 1)
        return;
    index--;
    myimg.setAttribute("src", colors[index - 1] + ".png");

});
document.getElementById("prev").addEventListener("click", function play() {
    if (index === 3)
        return;
    index++;
    myimg.setAttribute("src", colors[index - 1] + ".png");

});
document.getElementById("left").addEventListener("click", function play() {
    myimg.setAttribute("src", colors[0] + ".png");

});
document.getElementById("right").addEventListener("click", function play() {
    myimg.setAttribute("src", colors[2] + ".png");

});