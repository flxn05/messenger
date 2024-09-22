//y=true, n=false, c=how many clients, j=check json, s=send json, r=receive new json
let socket = new WebSocket("ws://93.217.255.81:12356");
let response = "";
let wopened = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function get_clients(){
    if(wopened){
        socket.send("c");
    while(response == ""){
        await sleep(10);
    }
    let rresponse = response;
    response = "";
    return rresponse;}
}

async function send_json(json, filename){
    if(wopened){
    socket.send("r"+filename+","+json);} 
}

async function get_updated(json, filename){
    if(wopened){
    socket.send("j"filename+","+json);
    while(response == ""){
        await sleep(10);
    }
    let rresponse = response;
    response = "";
    return rresponse;}

}

async function get_json(filename){
    if(wopened){
        socket.send("s"+filename);
        while(response == ""){
            await sleep(10);
        }
        let rresponse = response;
        response = "";
        return rresponse;}
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
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
    wopened = false;
  alert(`[error]`);
};

