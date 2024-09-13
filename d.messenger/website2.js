

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

    const user_bad = await fetch("user.json")
    const user_good = await user_bad.json();
    for (let i = 0; i < user_good.length; i++) {
        add_user(user_good[i]);
    }

    const para = document.createElement("div");
    para.setAttribute("class", "chat-box");
    para.setAttribute("id", "chat-box");
    para.setAttribute("onclick", "load_grp()");
    para.innerHTML = "group_chat";
    const parent = document.getElementById("one");
    parent.appendChild(para);
}
function clear_users() {
    const element = document.getElementById("one");
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
    element.innerHTML = "<div class='search-con'><input type='text' id='search-box' class='text-input' placeholder='Search groups and contacts ....' style='font-size: 1rem;'></div>";
}

function update_users() {
    clear_users();
    load_users();
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
    var d = await fetch("grp.json");
    var data = await d.json();
   
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


function send_msg(){

    var form = document.getElementById("form");
    var sending_msg = form[0].value;
    form[0].value = " ";
    form[0].placeholder = "";
    console.log(sending_msg)
}



update_users();
