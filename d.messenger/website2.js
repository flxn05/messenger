
async function add_user(user_id){

    const para = document.createElement("div");
    para.setAttribute("class", "chat-box");
    para.setAttribute("id", "chat-box");
    para.setAttribute("onclick", "load_chats('" + user_id + "')");
    para.innerHTML = user_id;
    const parent = document.getElementById("one");
    parent.appendChild(para);
}

async function load_users(){

    //const user_bad = await fetch("user.json")
    //const user_good = await user_bad.json();
    const user_bad = await get_json("user");
    console.log(user_bad);
    const user_good = JSON.parse(user_bad);

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
    element.innerHTML = "<div class='search-con'><input type='text' id='search-box' class='text-input' placeholder='Search groups and contacts ....' style='font-size: 1rem;'></div>";
}

async function update_users() {
    clear_users();
    await load_users();
}


async function add_msg(msg, dir){
    var act_msg = msg
    var act_dir = dir
    const para2 = document.createElement("div");
    
    para2.setAttribute("id", "msg-con");
    const el2 = document.getElementById("three");
    el2.appendChild(para2);

    const para3 = document.createElement("div");
    para3.innerHTML = act_msg;
    if (act_dir == "rx"){
        para3.setAttribute("class", "msg-content-rx");
        para2.setAttribute("class", "msg-rx");
    }
    else if (act_dir == "tx"){
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


async function load_chats(user_id){
    clear_chats();
    var x = await fetch("dave.json");
    var r = await x.json();
    


    

    for (let i= 0; i < r[user_id].length; i++){
        var msg = r[user_id][i].text;
        var dir = r[user_id][i].dir;
        add_msg(msg, dir);
    }
}

async function load_grp() {
    clear_chats();

    //local-fetching
    //var d = await fetch("grp.json");
    //var data = await d.json();
    const d = await get_json("grp");
    const data = JSON.parse(d);
   
    for(let i=0; i < data.length; i++){
        var msg = data[i].sender + ": " + data[i].msg;
        console.log(msg);

        var dir = "rx";
        if (data[i].sender == "logged_in_user"){
            dir = "tx";
        }
        add_msg(msg, dir);
    }
}


async function send_msg(){

    var form = document.getElementById("form");
    var sending_msg = form[0].value;
    form[0].value = " ";
    form[0].placeholder = "";
    console.log(sending_msg)

    add_msg(sending_msg, "tx");
    var grp = await get_json("grp");
    var grp_data = JSON.parse(grp);
    grp_data[grp_data.length] = {"sender": "logged_in_user", "msg": sending_msg};
    send_json(JSON.stringify(grp_data), "grp");

}

async function ws_test(){
    console.log("test");
    const x = await get_json();
    const y = JSON.parse(x);
    console.log(y);
    console.log(x);
    
}

async function ws_test2(){

    //const x = await fetch("user.json");
    send_json("windows_for_life");

}

sleep(100);
//window.onload = update_users();
update_users();
//window.addEventListener('load', update_users);
//window.addEventListener('load', () => {update_users()});




//injected for html appearance

//search-function
document.getElementById('search-box').addEventListener('input', function() {
    let searchQuery = this.value.toLowerCase();
    let contacts = document.querySelectorAll('.chat-box');

    contacts.forEach(function(contact) {
        let contactName = contact.textContent.toLowerCase();
        if (contactName.includes(searchQuery)) {
            contact.classList.remove('hidden');
        } else {
            contact.classList.add('hidden');
        }
    });
});

//scroll-function
const scrollContainer = document.getElementById('three');
scrollContainer.scrollTop = 9999999;


//input detector
const inputField = document.getElementById('text-input');
const warning = document.getElementById('text-input');
const triggerWords = ['nigga','nugga','neger','nogger','nugger','nigger', 'suck', 'sugg','dildo','sperma','ganz groß','anus','cock','penis','rektal','samenleiter','spritz','stange','lange stange'];

inputField.addEventListener('input', function() {
  const inputValue = inputField.value.toLowerCase();
  
  // Überprüfen, ob eines der trigger words im Eingabewert enthalten ist
  const containsTriggerWord = triggerWords.some(word => inputValue.includes(word));

  // Wenn ein Triggerwort enthalten ist, wird das "!" angezeigt, sonst ausgeblendet
  if (containsTriggerWord) {
document.getElementById('text-input').style.border = '1px solid darkred';
} else {
document.getElementById('text-input').style.border = '1px solid transparent';
}

});

<<<<<<< HEAD
    //const x = await fetch("user.json");
    send_json("deine_mutter");
=======
//menu
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu');
    const popupMenu = document.getElementById('expanded');
>>>>>>> c9db52e97305e7f098f294e1e6c2283ff1a75d5c

    menuButton.addEventListener('click', () => {
        popupMenu.classList.toggle('hidden');
    });

<<<<<<< HEAD
sleep(100);
//window.onload = update_users();
update_users();
//window.addEventListener('load', update_users);
//window.addEventListener('load', () => {update_users()});
=======
    // Close the menu if the user clicks outside of it
    document.addEventListener('click', (event) => {
        if (!menuButton.contains(event.target) && !popupMenu.contains(event.target)) {
            popupMenu.classList.add('hidden');
        }
    });
});
>>>>>>> c9db52e97305e7f098f294e1e6c2283ff1a75d5c
