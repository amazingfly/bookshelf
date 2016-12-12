
//Note: This is using hard coded simple auth. HMAC auth is recommended for production and requires some crypto
var boltUrlBase = "http://"+window.location.hostname+":888/";
var username = "publicweb";
var userkey = "webaccess1";
var retryMs = 1000;

function boltCall(apicall:string, payload:any, resultcb:(result:any)=>void) {
    let request = new XMLHttpRequest();
    let URL = boltUrlBase+"request/"+apicall;
    let data = JSON.stringify(payload);
    request.open("POST", URL, true);
    request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + userkey));
    request.send(data);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            let resp = JSON.parse(request.response);
            if (resp.complete) {
                resultcb(resp);
            } else {
                boltRepeatCall(resp.id, resultcb, 1);
            }
        } else {
            console.log("Error with boltCall");
        } 
    }
}
function boltRepeatCall(id:string, resultcb:(result:any)=>void, attempt:number) {{
    setTimeout(()=> {
        let request = new XMLHttpRequest();
        let URL = boltUrlBase+"retr/peek/"+id;
        let data = ("{}");
        request.open("POST", URL, true);
        request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + userkey));
        request.send(data);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                let resp = JSON.parse(request.response);
                if (resp.complete) {
                    resultcb(resp);
                } else {
                    boltRepeatCall(resp.id, resultcb, attempt+1);
                }
            } else {
                console.log("Error with boltRepeatCall");
            } 
        }
    }, retryMs);
}
