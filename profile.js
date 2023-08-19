const linkBtn = document.getElementById("logout-btn")
linkBtn.addEventListener("click",logOut)
function logOut(){
    localStorage.removeItem("user")
    window.location.replace("./index.html")
}