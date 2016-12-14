"use strict";
var FairmontCart_1 = require('./FairmontCart');
var FairmontApp;
(function (FairmontApp) {
    var Application;
    (function (Application) {
        "use strict";
        function initialize() {
            var w = window;
            var cart = new FairmontCart_1.FairmontCart();
            w._fmCart = cart;
        }
        Application.initialize = initialize;
    })(Application || (Application = {}));
    Application.initialize();
})(FairmontApp || (FairmontApp = {}));
//# sourceMappingURL=MainCart.js.map