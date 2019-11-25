let x = 1;

function readyGo() {
    if (x == 4)
        x = 1;
    document.getElementsByClassName("message")[0].getElementsByClassName.color = "gray";
    for (let i = 0; i < 3; i++)
        document.getElementsByTagName("img")[i].setAttribute("src", "gray.png");
    colors = ["red", "orange", "green"];
    message = ["Ready", "steady", "go!"]
    mes = document.getElementsByClassName("message")[0];
    img = document.getElementsByTagName("img")[x - 1];
    mes.style.color = colors[x - 1];
    mes.textContent = message[x - 1];
    img.setAttribute("src", colors[x - 1] + ".png");
    x++


}
setInterval(readyGo, 2000);