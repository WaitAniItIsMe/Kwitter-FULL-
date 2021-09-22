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

username = localStorage.getItem("usernameLocal");
roomName = localStorage.getItem("room_name");

function Send() {
      message = document.getElementById("enterMsg").value;
      firebase.database().ref(roomName).push({
            Name: username,
            Message: message,
            Likes: 0

      });
      document.getElementById("enterMsg").value = "";

}


function getData() {
      firebase.database().ref("/" + roomName).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        
                        console.log(firebase_message_id);
                        console.log(message_data);
                        
                        Name = message_data["Name"];
                        Message = message_data["Message"];
                        Likes = message_data["Likes"];

                        name_tick = "<h4>" + Name + "<img class = 'user_tick' src='tick.png'> </h4>"
                        message_display = "<h5 class='message_h4'>" + Message + "</h5>"
                        like_button = "<button class= 'btn btn-warning' id = " + firebase_message_id + " value = " + Likes + " onclick = 'updateLike(this.id)'>"
                        span_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>" + "  " + Likes + "</spna> </button> <hr style='width: 19px'>"
                        row =  name_tick + message_display + like_button + span_tag; 
                        document.getElementById('output').innerHTML += row;
                  }
            });
      });
}

function updateLike(messageID){

      buttonID = messageID;
      Likes = document.getElementById(buttonID).value;
      updatedLike = Number(Likes) + 1;
      firebase.database().ref(roomName).child(buttonID).update({
            Likes: updatedLike
      });
      }

getData();

function logout(){
      localStorage.removeItem("usernameLocal");
      localStorage.removeItem("room_name");
      window.location="index.html";
}