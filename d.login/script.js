const gigachat = "http://192.168.178.73/gigachat";


const fail_msgs = [
    "are you sure you remember your password?",
    "did you forget how to type?",
    "nice try, but wrong password or username!",
    "you shall not pass!",
    "invalid credentials detected!",
    "access denied. Try again!",
    "error 404: user/password not found!",
    "you're not authorized to login!",
    "invalid username or password.",
    "incorrect login details. Try again!",
    "access denied. invalid credentials!",
    "invalid login; try again!",
    "do you even know how 'typing' is spelled?",
    "sure ur not a ghost? you're not in our database...",
    "with great power comes great responsibility, but with a wrong username or password youl'll get neither of them"
];
//15 entries 
const succes_msgs = [,
    "login succesful",
    "go update your profile picture! oh, wait, we dont have that feature(yet)",
    "welcome back, stranger!",
    "great job! you managed to remember your password. we're impressed (not really)."
]
//4 entries

function fail() {
    var x = Math.floor(Math.random() * 15)
    var div = document.getElementById("lerror");
    var msg = fail_msgs[x];
    div.innerHTML = msg;
}

function succes(){
    var x = Math.floor(Math.random() * 4)
    var div = document.getElementById("lerror");
    var msg = succes_msgs[x];
    div.innerHTML = msg;
}




async function login() {
    var data_bad = await fetch("user_data.json");
    var data = await data_bad.json();

    var form =  document.getElementById("login_form");
    var user = form[0].value;
    var pswd = form[1].value;
    try {
        if (data[user].password == pswd) {
           succes();
           document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
           document.cookie = "user=" + user;
           window.location.replace(gigachat);
        }
        else {
            fail();
        }     
    }
    catch {
        fail();
    }
}


document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        login();
    }
});