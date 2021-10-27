function myFunction() {
    const top = document.getElementById("myTopnav");
    if (top.className === "topnav") {
        top.className += " responsive";
    } else {
        top.className = "topnav";
    }
}