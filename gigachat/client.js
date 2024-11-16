let socket = new WebSocket("ws://localhost:12356");
let response = "";
let wopened = false;
let encrypt;
let decrypt;

Module.onRuntimeInitialized = () => {
                encrypt = Module.cwrap('encrypt', 'string', ['string']);
                decrypt = Module.cwrap('decrypt', 'string', ['string']);};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function csend(msg){
    socket.send(btoa(unescape(encodeURIComponent(encrypt(msg)))));
}

async function get_clients(){
    if(wopened){
        csend("c");
    while(response == ""){
        await sleep(10);
    }
    let rresponse = response;
    response = "";
    return decrypt(rresponse);}
}

async function send_json(json, filename){
    if(wopened){
    csend("r"+filename+","+json);} 
}

async function get_updated(json, filename){
    if(wopened){
    csend("j" + filename+","+json);
    while(response == ""){
        await sleep(10);
    }
    let rresponse = response;
    response = "";
    return decrypt(rresponse);}

}

async function get_json(filename){
    if(wopened){
        csend("s"+filename);
        while(response == ""){
            await sleep(10);
        }
        let rresponse = response;
        response = "";
        return decrypt(rresponse);}
}

async function make_group_chat(groupname, users){
    if(wopened){
        csend("m"+groupname+"%"+users);
    }
}

socket.onopen = async function(e) {
    wopened = true;
};

socket.onmessage = function(event) {
    response = event.data;
};

socket.onclose = function(event) {
    wopened = false;
  if (event.wasClean) {
    alert(`[error] please refresh page or contact developers`);
  } else {
    alert('[error] please refresh page or contact developers');
  }
};

socket.onerror = function(error) {
    wopened = false;
  alert(`[error] please refresh page or contact developers`);
};
