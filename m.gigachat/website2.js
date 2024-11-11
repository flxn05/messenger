//consts

const login_page = "https://gigachat.ddns.net/login"
const logged_out_page = "https://gigachat.ddns.net/logged_out"



const x = document.cookie;

const y = x.substring(5, x.length + 1);

var qwertz = false;
let current_chat;
let uu;


async function check_users() {
    try {
        const c = await get_json("user");


        const d = await JSON.parse(await get_json("user"));

        for (let i = 0; i < d.length; i++) {

            if (d[i] == y) {

                qwertz = true;

            }
        }
    }
    catch (error) {
        window.location.replace(logged_out_page);

    }


    if (qwertz == false) {

        window.location.replace(logged_out_page);

    }
    else {

        update_users();
    }
}



setTimeout(check_users, 400);







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
    //const user_bad = await get_json("user");
    //console.log(user_bad);
    //const user_good = JSON.parse(user_bad);

    const para = document.createElement("div");
    para.setAttribute("class", "chat-box");
    para.setAttribute("id", "chat-box");
    para.setAttribute("onclick", "load_grp()");
    para.innerHTML = "group_chat";
    const parent = document.getElementById("one");
    parent.appendChild(para);

    //for (let i = 0; i < user_good.length; i++) {
    //    add_user(user_good[i]);
    //}    
}

function clear_users() {
    const element = document.getElementById("one");
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
    element.innerHTML = "<div class='search-con'><input type='text' id='search-box' class='text-input' placeholder='Search ....' style='font-size: 1rem; background-color: #13181c;'></div>";
}

async function update_users() {
    clear_users();
    await load_users();
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
    clear_chats();
    var x = await fetch("dave.json");
    var r = await x.json();





    for (let i = 0; i < r[user_id].length; i++) {
        var msg = r[user_id][i].text;
        var dir = r[user_id][i].dir;
        add_msg(msg, dir);
    }
}

async function load_grp() {
    current_chat = "grp";

    clear_chats();

    //local-fetching
    //var d = await fetch("grp.json");
    //var data = await d.json();
    const d = await get_json("grp");
    
    const data = JSON.parse(d);

    uu = JSON.stringify(d);

    for (let i = 0; i < data.length; i++) {
        var msg = data[i].sender + ": " + data[i].msg;


        var dir = "rx";
        if (data[i].sender == y) {
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

    add_msg(y + ": " + sending_msg, "tx");
    var grp = await get_json(current_chat);
    var grp_data = JSON.parse(grp);
    grp_data[grp_data.length] = { "sender": y, "msg": sending_msg };
    send_json(JSON.stringify(grp_data), "grp");
    scrollContainer.scrollTop = 9999999;

}

function toggle_menu() {

    popup_menu.classList.toggle("hidden");
}

function logout() {
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = login_page;
}

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

let u;

async function check_update() {    
    u = await get_json(current_chat);
    u = JSON.stringify(u);
    
    if (u == uu){
        return;
    }
    if (u != uu) {
        
        uu = u;
        load_grp();
    }
}


setInterval(check_update, 2000);





 
