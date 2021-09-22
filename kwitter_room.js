const firebaseConfig = {
      apiKey: "AIzaSyBIjwBDsqog9A9zStZ-zuwwR88vmDty0NU",
      authDomain: "kwita-d4a1a.firebaseapp.com",
      databaseURL: "https://kwita-d4a1a-default-rtdb.firebaseio.com",
      projectId: "kwita-d4a1a",
      storageBucket: "kwita-d4a1a.appspot.com",
      messagingSenderId: "970118309191",
      appId: "1:970118309191:web:d75309655388a2c5841862"
};
firebase.initializeApp(firebaseConfig);

mainUsername = localStorage.getItem("usernameLocal");
document.getElementById("welcome@username").innerHTML = "Welcome " + mainUsername + " to Kwitter!"

function createRoom() {
      roomName = document.getElementById("newRoomName").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "Room Name"
      });
      localStorage.setItem("room_name", roomName)
      window.location = "kwitter_page.html"
};


function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick = 'showRoom(this.id)'> #" + Room_names + "</div> <br>";
                  document.getElementById("output").innerHTML += row;

                  //End code
            });
      });
}
getData();

function showRoom(room_name_all){
      console.log(room_name_all);
      localStorage.setItem("room_name", room_name_all);
      window.location="kwitter_page.html"
}

function logout(){
      localStorage.removeItem("usernameLocal");
      localStorage.removeItem("room_name");
      window.location="index.html";
}