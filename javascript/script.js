// gets the banner url and adds it to id="banner" in default_head.html
function getBanner(){
    var bannerURL
    boltCall("mobile/getHomeBanners", {}, (result)=>{
        bannerURL = result.return_value.images[1];
        let banner = document.getElementById("banner");
        banner.style.backgroundImage = `url("`+ bannerURL +`")`;
    })
}

// uses apicall to get cart itmes then displays them on the sidebar  TODO needs more style work
function getCart(){
    boltCall("mobile/adjustCart", {}, (result)=>{
            let cartItems = result.return_value.cartItems;
            let x = document.getElementById("sideCart");
            var b = "";
            for (let i = 0; i < cartItems.length; i++){
                b = b.concat(`<div class="w3-row" >
                                <div class="w3-col s4">
                                    <article class="li">
                                        <a href="`+ cartItems[i].previewImage +`" class="clearfix" style="height:80px;">
                                            <div class="image" style="height:80px; background-image: url(`+ cartItems[i].previewImage +`)"></div>
                                        </a>
                                    </article>
                                </div>
                                <div class="w3-col s8 w3-light-gray">
                                    <div class="w3-large">`+ cartItems[i].name +`</div>
                                    <div class="w3-small">Price: $<span class="w3-medium w3-text-green">`+ cartItems[i].price +`</span></div>
                                    <div class="w3-small">qty: `+ cartItems[i].qty +`</div>
                                    <div class="w3-small">sku: `+ cartItems[i].sku +`</div>
                                </div>
                            </div>
                            <div>&nbsp;</div>`
                            );
                            x.innerHTML = b;
            }
        })
}

//Note: This is using hard coded simple auth. HMAC auth is recommended for production and requires some crypto
var boltUrlBase = "http://"+window.location.hostname+":8888/";
var username = "publicweb";
var userkey = "webaccess1";
var retryMs = 1000;

function boltCall(apicall, payload, resultcb) {
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
function boltRepeatCall(id, resultcb, attempt) {
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

