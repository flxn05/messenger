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
    "invalid login try again!",
    "wrong password. give it another shot!",
    "login failed. invalid credentials detected!",
    "dumbass, cant even remember your password...",
    "even the memory of a goldfish is better than yours...",
    "either our database is stupid, or you are...",
    "do you even know how 'typing' is spelled?",
    "sure ur not a ghost? you're not in our database...",
    "invalid credentials. please consult a dictionary for guidance.",
    "incorrect credentials. please consult a psychiatrist for help with your typing skills and emotional stability.",
    "incorrect credentials. please consult a dictionary for help with your vocabulary and spelling skills.",
    "with great power comes great responsibility, but with a wrong username or password youl'll get neither of them"
];
//23 entrys 
const succes_msgs = [
    "beam me up, scotty!",
    "login succesful",
    "wow, you remembered your login data, who's a good boy...",
    "wow, you survived another login attempt...",
    "we missed you....well, actually....no, we didnt miss you",
    "acces granted! time to waste your time on our website...",
    "it's not a login...it's a lifestyle change",
    "go update your profile picture! oh, wait, we dont have that feature(yet)",
    "welcome back, stranger!",
    "great job! you managed to remember your password. we're impressed (not really)."
]

function fail() {
    var x = Math.floor(Math.random() * 23)
    var div = document.getElementById("error");
    var msg = fail_msgs[x];
    div.innerHTML = msg;
}

function succes(){
    var x = Math.floor(Math.random() * 10)
    var div = document.getElementById("error");
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
           window.location.replace("login_succesful.html");
        }
        else {
            fail();
        }     
    }
    catch {
        fail();
    }
}
