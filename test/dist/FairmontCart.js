"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var FairmontCart = (function () {
    function FairmontCart() {
        /**
         * init sets up the cart with various options, sets the cart id (or gets a new one)
         * the cart is appended to the contents of the passed-in parent element
         */
        this.init = function (parent, cartOptions) {
            //TODO: consider how to allow the cart user to add custom form fields, etc, without changing the typescript source code
            var cartcontainer = document.createElement("div");
            cartcontainer.id = "fairmont-cart-container"; //make this something that can be set via cartOptions
            cartcontainer.classList.add("fairmont-cart");
            parent.appendChild(cartcontainer);
            ReactDOM.render(React.createElement("p", null, "THE FART"), cartcontainer); //render cart, etc
        };
        //do pre-init stuff if needd
    }
    return FairmontCart;
}());
exports.FairmontCart = FairmontCart;
//# sourceMappingURL=FairmontCart.js.map