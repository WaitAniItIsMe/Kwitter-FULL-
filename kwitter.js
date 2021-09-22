function logIn(){
    Username = document.getElementById("username").value;
    localStorage.setItem("usernameLocal", Username);
    window.location = "kwitter_room.html";
}