const gigachat = "https://gigachat.ddns.net/gigachat";


const fail_msgs = [
    "error"
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

function succes() {
    var x = Math.floor(Math.random() * 4)
    var div = document.getElementById("lerror");
    var msg = succes_msgs[x];
    div.innerHTML = msg;
}



/*
async function login() {
    var form = document.getElementById("login_form");
    var user = form[0].value;
    var pswd = form[1].value;
    var dd = await loogin(user, pswd);
    console.log(dd);
    if (dd == "j") {
        sleep(1000);
        succes();*/
        //document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
/*       document.cookie = "user=" + user + "; path=/";
        window.location.replace(gigachat);
    }
    else {
        fail();
    }
}
*/

if (typeof Appwrite === 'undefined') {
    console.error('Appwrite SDK is not loaded.');
}


const client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('67571cd7002ca90a77ef'); 
        
const account = new Appwrite.Account(client);

async function login() {
    let name = document.getElementById("username").value + "@giga.drive";
    let password = document.getElementById("password").value;
    console.log(name);
    console.log(password);

    console.log("Logging in...");
    try{
        const session = await account.createEmailPasswordSession(
            name, 
            password
            );
    }
    catch(err){
        account.deleteSessions();
        try{
        const session = await account.createEmailPasswordSession(
            name, 
            password
            );
        }
        catch(err){
            return;
        }
    }

    console.log(account.get());	

    window.location.replace("https://gigachat.ddns.net/gigachat");
}



document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        login();
    }
});
