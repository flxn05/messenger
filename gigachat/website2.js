//consts

const login_page = "https://gigachat.ddns.net/login"
const logged_out_page = "https://gigachat.ddns.net/logged_out"


let u;

//const x = document.cookie;

//const y = x.substring(5, x.length + 1);
//const userr = y;

//var qwertz = false;
let current_chat = "undefined123";
let uu;
let userr;

let user = "";
let username = "";

const client = new Appwrite.Client();
	client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('67571cd7002ca90a77ef'); 

const account = new Appwrite.Account(client);

async function check(){
	try {
		user = await account.get();

		username = await user.name;
        userr = user.name;
		console.log(username);
        console.log(userr);         
	} catch (err) {
		console.log(err);
		window.location.replace("https://gigachat.ddns.net/login");
	}
}

//check();

async function logout(){
	const res = await account.deleteSessions();
	username = "";
	user = "";
	window.location.replace("https://gigachat.ddns.net/login");
}



//setTimeout(check, 400);





popup_menu = document.getElementById("expanded");
popup_menu.classList.add("hidden");

const scrollContainer = document.getElementById('three');
scrollContainer.scrollTop = 9999999;

async function add_user(user_id) {

    const para = document.createElement("div");
    para.setAttribute("class", "chat-box");
    para.setAttribute("id", "chat-box");
    para.setAttribute("onclick", "load_chats('" + user_id + "')");
    para.innerHTML = user_id;
    const parent = document.getElementById("one");
    parent.appendChild(para);
}

async function load_users() {

    //const user_good = await user_bad.json();
    //const user_bad = await get_json(userr +"_chats");
    const user_bad = await get_json(userr + "_chats");
    //console.log(user_bad);
    const user_good = JSON.parse(user_bad);
    //console.log(user_good);
    //const user_good = ["s", "grp"];
    //grp
    const para = document.createElement("div");
    para.setAttribute("class", "chat-box");
    para.setAttribute("id", "chat-box");
    para.setAttribute("onclick", "load_grp()");
    para.innerHTML = "group_chat";
    const parent = document.getElementById("one");
    parent.appendChild(para);

    for (let i = 0; i < user_good.length; i++) {
        add_user(user_good[i]);
    }    
}

function clear_users() {
    const element = document.getElementById("one");
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
    element.innerHTML = "<div class='search-con'><input type='text' id='search-box' class='text-input' placeholder='Search groups and contacts ....' style='font-size: 1rem;'></div>";
}

async function update_users() {
    clear_users();

    await load_users();
    document.getElementById('search-box').addEventListener('input', function () {
        let searchQuery = this.value.toLowerCase();
        console.log(searchQuery);
        let contacts = document.querySelectorAll('.chat-box');
    
        contacts.forEach(function (contact) {
            let contactName = contact.textContent.toLowerCase();
            if (contactName.includes(searchQuery)) {
                contact.classList.remove('hidden');
            } else {
                contact.classList.add('hidden');
            }
        });
    });
}


async function add_msg(msg, dir) {
    var act_msg = msg
    var act_dir = dir
    const para2 = document.createElement("div");

    para2.setAttribute("id", "msg-con");
    const el2 = document.getElementById("three");
    el2.appendChild(para2);

    const para3 = document.createElement("div");

    r = document.createTextNode(act_msg);
    para3.appendChild(r);
    //para3.innerHTML = act_msg;
    if (act_dir == "rx") {
        para3.setAttribute("class", "msg-content-rx");
        para2.setAttribute("class", "msg-rx");
    }
    else if (act_dir == "tx") {
        para3.setAttribute("class", "msg-content-tx");
        para2.setAttribute("class", "msg-tx");
    }


    const el3 = document.getElementById("three");
    el3.appendChild(para2);
    para2.appendChild(para3);
}
function clear_chats() {
    const element = document.getElementById("three");
    while (element.firstChild) {

        element.removeChild(element.lastChild);

    }
}


async function load_chats(user_id) {
    current_chat = user_id;
    clear_chats();

    let dd = document.createElement("div");
    dd.setAttribute("id", "currentChat");
    dd.innerHTML = current_chat;
    document.getElementById("three").appendChild(dd);

    var xx = await get_json(user_id);
    u = xx;
    var rr = await JSON.parse(xx);
    //console.log(xx);
    
    



    for (let i = 0; i < rr.length; i++) {
        var msg = rr[i].sender + ": " + rr[i].msg;
        if (rr[i].sender == userr){
            var dir = "tx";
        }
        else {
            var dir = "rx";
        }

        add_msg(msg, dir);
    }
    scrollContainer.scrollTop = 9999999;
}

async function load_grp() {
    current_chat = "grp";

    clear_chats();
    let dd = document.createElement("div");
    dd.setAttribute("id", "currentChat");
    let curr_chat = document.getElementById("three").appendChild(dd);
    //local-fetching
    //var d = await fetch("grp.json");
    //var data = await d.json();
    const d = await get_json("grp");
    
    const data = JSON.parse(d);

    uu = JSON.stringify(d);

    for (let i = 0; i < data.length; i++) {
        var msg = data[i].sender + ": " + data[i].msg;


        var dir = "rx";
        if (data[i].sender == username) {
            dir = "tx";
        }
        add_msg(msg, dir);
    }
    scrollContainer.scrollTop = 9999999;
}


async function send_msg() {


    var input = document.getElementById("text_input");


    var sending_msg = input.value;
    if (sending_msg == " ") {
        return;
    }
    input.value = " ";
    add_msg(userr + ": " + sending_msg, "tx");
    msg = { "sender": userr, "msg": sending_msg };
    send_json(JSON.stringify(msg), current_chat);
    scrollContainer.scrollTop = 9999999;

}

function toggle_menu() {

    popup_menu.classList.toggle("hidden");
}

//function logout() {
//    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
//    window.location.href = login_page;
//}

function styles_whatsapp() {

    document.getElementById("head").innerHTML = '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Messages | gigaCHAT</title><link rel="stylesheet" href="whatsapp.css"><link rel="icon" type="image/x-icon" href="thumbnail.png"><script type="text/javascript" src="client.js"></script><script type="text/javascript" src="website2.js" defer></script><link rel="manifest" href="manifest.json">'

}

function styles_signal() {

    document.getElementById("head").innerHTML = '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Messages | gigaCHAT</title><link rel="stylesheet" href="signal.css"><link rel="icon" type="image/x-icon" href="thumbnail.png"><script type="text/javascript" src="client.js"></script><script type="text/javascript" src="website2.js" defer></script><link rel="manifest" href="manifest.json">'

}

styles_whatsapp();

//sleep(100);
//window.onload = update_users();
//update_users();
document.addEventListener("DOMContentLoaded", update_users());

//window.addEventListener('load', update_users);
//window.addEventListener('load', () => {update_users()});
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        send_msg();
    }
});

//search-function
document.getElementById('search-box').addEventListener('input', function () {
    let searchQuery = this.value.toLowerCase();
    console.log(searchQuery);
    let contacts = document.querySelectorAll('.chat-box');

    contacts.forEach(function (contact) {
        let contactName = contact.textContent.toLowerCase();
        if (contactName.includes(searchQuery)) {
            contact.classList.remove('hidden');
        } else {
            contact.classList.add('hidden');
        }
    });
});



async function check_update() {    
    if (current_chat == "undefined123") {
        return;
    }
    u = await get_json(current_chat);
    u = JSON.stringify(u);
    
    if (u == uu){
        return;
    }
    if (u != uu) {
        
        uu = u;
        if (current_chat == "grp") {
            clear_chats();
            load_grp();
        }
        else {
            clear_chats();
            load_chats(current_chat);
        }
        
    }
}

async function check_update2(){
    if (current_chat == "undefined123") {
        return;
    }
    if(is_new_avaiable()){
        if (current_chat == "grp") {
            clear_chats();
            load_grp();
        }
        else {
            clear_chats();
            load_chats(current_chat);
        }
    }

}


async function createYourMother(){
    let grpName = document.getElementById("groupName").value;
    let userList = document.getElementById("userList").value;
    await make_group_chat(grpName, userList);
    update_users();
}

setInterval(check_update2, 2000);
setTimeout(update_users, 500);

clear_chats();

let dd = document.createElement("div");
    dd.setAttribute("id", "currentChat");
    dd.innerHTML = current_chat;
    document.getElementById("three").appendChild(dd);




//      .---.
//     /     \
//     \.@-@./
//     /`\_/`\
//    //  _  \\
//   | \     )|_
//  /`\_`>  <_/ \
//  \__/'---'\__/
//MultimeterManiac
