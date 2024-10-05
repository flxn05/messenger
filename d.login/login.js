let socket = new WebSocket("wss://192.168.178.73:12369");
let response = "";
let wopened = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function loogin(username, passwd) {
    if (wopened) {
        socket.send(username + ":" + passwd);
        while (response == "") {
            await sleep(10);
        }
        return response;
        
    }
}



socket.onopen = async function (e) {
    wopened = true;
};

socket.onmessage = function (event) {
    response = event.data;
};

socket.onclose = function (event) {
    wopened = false;
    if (event.wasClean) {
        alert(`[error] please refresh page or contact developers`);
    } else {
        alert('[error] please refresh page or contact developers');
    }
};

socket.onerror = function (error) {
    wopened = false;
    alert(`[error] please refresh page or contact developers`);
};

