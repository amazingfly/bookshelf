/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FairmontCart_1 = __webpack_require__(1);
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var CartPanel_1 = __webpack_require__(4);
	var FairmontCart = (function () {
	    function FairmontCart() {
	        /**
	         * init sets up the cart with various options, sets the cart id (or gets a new one)
	         * the cart is appended to the contents of the passed-in parent element
	         */
	        this.init = function (parent, cartOptions) {
	            //TODO: consider how to allow the cart user to add custom form fields, etc, without changing the typescript source code
	            var cartcontainer = document.createElement("div");
	            //check if cart options exist and set the cart ID
	            if (cartOptions) {
	                cartcontainer.id = cartOptions.id;
	            }
	            else {
	                cartcontainer.id = "fairmont-cart-container"; //make this something that can be set via cartOptions
	            }
	            cartcontainer.id = "fairmont-cart-container"; //make this something that can be set via cartOptions
	            cartcontainer.classList.add("fairmont-cart");
	            parent.appendChild(cartcontainer);
	            ReactDOM.render(React.createElement("div", {style: { height: '100%' }}, React.createElement(CartPanel_1.CartPanel, {style: { height: '100%' }})), cartcontainer); //render cart, etc
	        };
	        //do pre-init stuff if needd
	    }
	    return FairmontCart;
	}());
	exports.FairmontCart = FairmontCart;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var CartItem_1 = __webpack_require__(5);
	var Share = __webpack_require__(8);
	var Promo_1 = __webpack_require__(9);
	var CartDataPanel_1 = __webpack_require__(10);
	var CartCheckoutPanel_1 = __webpack_require__(11);
	var ProductListItem_1 = __webpack_require__(12);
	var ProductListPanel_1 = __webpack_require__(13);
	var HomeBanner_1 = __webpack_require__(14);
	var DropDown_1 = __webpack_require__(15);
	var DropDown_2 = __webpack_require__(15);
	var DropDown_3 = __webpack_require__(15);
	var ThemeSelector_1 = __webpack_require__(16);
	//main cart display area
	var CartPanel = (function (_super) {
	    __extends(CartPanel, _super);
	    function CartPanel() {
	        var _this = this;
	        _super.call(this);
	        this.selectors = ["cart", "wish"];
	        this.componentDidMount = function () {
	            //set html background color
	            document.documentElement.className = _this.state.colors.color3;
	            _this._el.addEventListener('click', _this.clickHandler); //assign main click listener
	            //get the main banner
	            Share.boltCall("mobile/getHomeBanners", {}, function (result) {
	                _this.setState(result.return_value);
	            });
	            //get cart data
	            Share.boltCall("mobile/adjustCart", { cartId: 123, product: "bob" }, function (result) {
	                _this.setState(result.return_value);
	            });
	            //get color themes for dropdown and color scheme
	            Share.boltCall("mobile/getThemeNormal", {}, function (result) {
	                _this.setState(result.return_value);
	            });
	        };
	        // clickHandler executes when any click event occurs on the cart panel
	        this.clickHandler = function (ev) {
	            var ex = ev.target; //get the element that was clicked
	            switch (ex.id) {
	                case "submitButton": {
	                    _this.sendCall("mobile/submitCart", {});
	                    break;
	                }
	                case "cancelButton": {
	                    _this.sendCall("mobile/cancelCart", {});
	                    break;
	                }
	                case "clearButton": {
	                    _this.sendCall("mobile/clearCart", {});
	                    break;
	                }
	                case "remove": {
	                    _this.sendCall("mobile/remove", _this.state.cartItems[ex.getAttribute("data-id")].sku);
	                    ex.parentElement.parentElement.parentElement.parentElement.parentElement.remove(); //remove the item element
	                    break;
	                }
	                case "update": {
	                    //assigns the clicked cartItem to temp
	                    var temp = _this.state.cartItems[ex.getAttribute("data-id")];
	                    //moves to higher level of cartItem and looks for the qtyField className
	                    var tempQty = ex.parentElement.parentElement.parentElement.querySelector(".qtyField");
	                    temp.qty = tempQty.value; //assigns the value from the user editable qty field to the qty in the desired cartItems
	                    _this.sendCall("mobile/adjustCart", temp); //sends the cartItem with the newly edited qty
	                    break;
	                }
	                case "qty": {
	                    ex.parentElement.addEventListener("keydown", _this.qtyHandler.bind(_this, ex));
	                    break;
	                }
	                case "nameSort": {
	                    if (!_this.state.nameToggle) {
	                        _this.sortBy(Share.SortByName, ex.getAttribute("data-id"));
	                        _this.setState({ nameToggle: true }); //switch toggle
	                        _this.upArrow(ex);
	                    }
	                    else {
	                        _this.sortBy(Share.ReverseSortByName, ex.getAttribute("data-id"));
	                        _this.setState({ nameToggle: false });
	                        _this.downArrow(ex);
	                    }
	                    DropDown_2.HideList(_this.selectors);
	                    _this.selectors = [];
	                    break;
	                }
	                case "priceSort": {
	                    if (!_this.state.priceToggle) {
	                        _this.sortBy(Share.SortByPrice, ex.getAttribute("data-id"));
	                        _this.setState({ priceToggle: true });
	                        _this.upArrow(ex);
	                    }
	                    else {
	                        _this.sortBy(Share.ReverseSortByPrice, ex.getAttribute("data-id"));
	                        _this.setState({ priceToggle: false });
	                        _this.downArrow(ex);
	                    }
	                    DropDown_2.HideList(_this.selectors);
	                    _this.selectors = [];
	                    break;
	                }
	                case "qtySort": {
	                    if (!_this.state.qtyToggle) {
	                        _this.sortBy(Share.SortByQTY, ex.getAttribute("data-id"));
	                        _this.setState({ qtyToggle: true });
	                        _this.upArrow(ex);
	                    }
	                    else {
	                        _this.sortBy(Share.ReverseSortByQTY, ex.getAttribute("data-id"));
	                        _this.setState({ qtyToggle: false });
	                        _this.downArrow(ex);
	                    }
	                    DropDown_2.HideList(_this.selectors);
	                    _this.selectors = [];
	                    break;
	                }
	                case "dateSort": {
	                    if (!_this.state.dateToggle) {
	                        _this.sortBy(Share.SortByDate, ex.getAttribute("data-id"));
	                        _this.setState({ dateToggle: true });
	                        _this.upArrow(ex);
	                    }
	                    else {
	                        _this.sortBy(Share.ReverseSortByDate, ex.getAttribute("data-id"));
	                        _this.setState({ dateToggle: false });
	                        _this.downArrow(ex);
	                    }
	                    DropDown_2.HideList(_this.selectors);
	                    _this.selectors = [];
	                    break;
	                }
	                case "dropMenu": {
	                    //add item to selectors toggles
	                    _this.selectors.push(ex.getAttribute("data-id"));
	                    DropDown_3.ShowList(ex.getAttribute("data-id")); //shows list based on its data-id
	                    break;
	                }
	                case "theme": {
	                    //send a bolt call that uses data-name to get the desired theme
	                    _this.changeTheme(ex.getAttribute('data-name'));
	                    DropDown_2.HideList(_this.selectors);
	                    _this.selectors = [];
	                    break;
	                }
	                default: {
	                    DropDown_2.HideList(_this.selectors);
	                    _this.selectors = [];
	                }
	            }
	        };
	        //Wrapper for boltcall.
	        this.sendCall = function (apiCallName, payload) {
	            Share.boltCall(apiCallName, payload, function (result) {
	                alert(result.return_value.message);
	            });
	        };
	        //Fires when a key is pressed in the qty field, after it has been clicked. Listens for the enter key
	        this.qtyHandler = function (ex, ev) {
	            if (ev.keyCode === 13) {
	                var temp = _this.state.cartItems[ex.getAttribute("data-id")];
	                temp.qty = ex.value; //Assign the user entered qty to temp.qty
	                Share.boltCall("mobile/adjustCart", temp, function (result) {
	                    alert(result.return_value.message);
	                    ex.removeEventListener("keyDown", _this.qtyHandler);
	                });
	            }
	        };
	        //css is passed in and appended to document head.
	        this.changeStyle = function (theme) {
	            var css = theme;
	            var style = document.createElement('style');
	            if (css !== "") {
	                if (style.styleSheet) {
	                    style.styleSheet.cssText = css;
	                }
	                else {
	                    style.appendChild(document.createTextNode(css));
	                }
	            }
	            else {
	                console.log("css is empty");
	            }
	            //add the style element to the head
	            document.getElementsByTagName('head')[0].appendChild(style);
	        };
	        //sortBy passes in a sorting function and  a data id of the clicked button
	        this.sortBy = function (sort, selector) {
	            Share.boltCall("mobile/adjustCart", { cartId: 123, product: "bob" }, function (result) {
	                switch (selector) {
	                    case "cart": {
	                        result.return_value.cartItems.sort(sort);
	                        break;
	                    }
	                    case "wish": {
	                        result.return_value.wishItems.sort(sort);
	                    }
	                }
	                _this.setState(result.return_value);
	            });
	        };
	        //places up arrow next to a button to indicate wich direction the list is sorted
	        this.upArrow = function (ex) {
	            //remove all existing arrows
	            var x = ex.parentElement.parentElement.querySelectorAll(".arrow");
	            for (var i = 0; i < x.length; i++) {
	                x[i].innerHTML = "";
	            } //put an arrow next to the clicked button based on id
	            ex.parentElement.parentElement.querySelector("#" + ex.id + "Arrow").innerHTML = '<img src="upArrow.png"/>';
	        }; //places a down arrow next to a button
	        this.downArrow = function (ex) {
	            var x = ex.parentElement.parentElement.querySelectorAll(".arrow");
	            for (var i = 0; i < x.length; i++) {
	                x[i].innerHTML = "";
	            }
	            ex.parentElement.parentElement.querySelector("#" + ex.id + "Arrow").innerHTML = '<img src="downArrow.png"/>';
	        };
	        this.componentDidUpdate = function () {
	            document.getElementById("fairmont-cart-container").style.height = '100%';
	            //document.documentElement.className = this.state.colors.color1;
	        };
	        //gets the new theme and sets it to the state
	        this.changeTheme = function (name) {
	            Share.boltCall("mobile/getTheme" + name, {}, function (result) {
	                _this.setState(result.return_value);
	            });
	        };
	        this.state = {
	            "images": [],
	            "cartItems": [],
	            "wishItems": [],
	            "subtotal": 0,
	            "shipping": 0,
	            "tax": 0,
	            "total": 0,
	            "promos": [],
	            "discount": 0,
	            "theme": {},
	            "qty": 0,
	            "nameToggle": false,
	            "priceToggle": false,
	            "qtyToggle": false,
	            "dateToggle": false,
	            "colors": {},
	            "DropListItems": {
	                "Sort": []
	            },
	            "ThemeList": []
	        };
	    }
	    CartPanel.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {className: "", style: { height: '100%' }, ref: function (component) { return _this._el = component; }}, React.createElement("div", {className: "w3-row"}, React.createElement("div", {id: "b", className: "w3-col w3-center" + this.state.colors.color3, style: { height: '100%' }}, React.createElement(HomeBanner_1.HomeBanner, {images: this.state.images}))), React.createElement("div", {className: "w3-row" + "", style: { height: '100%' }}, React.createElement("div", {className: "w3-col m3 l2 w3-center" + this.state.colors.color2, style: { height: '100%' }}, React.createElement("div", {className: this.state.colors.color3}, React.createElement("div", {style: { fontSize: '150%' }}, "Summary"), React.createElement(ThemeSelector_1.ThemeSelector, {ThemeList: this.state.ThemeList})), React.createElement(CartDataPanel_1.CartDataPanel, {cartData: { subtotal: this.state.subtotal, tax: this.state.tax, shipping: this.state.shipping, stock: this.state.stock, discount: this.state.discount, total: this.state.total }}), React.createElement(CartCheckoutPanel_1.CartCheckoutPanel, {colors: this.state.colors}), React.createElement("br", null), React.createElement(Promo_1.Promo, null), React.createElement("div", {className: "w3-hide-small" + ""}, React.createElement(ProductListPanel_1.ProductListPanel, null))), React.createElement("div", {className: "w3-col m7 l8 w3-center" + this.state.colors.color3, style: { height: '100%' }}, React.createElement("div", {style: { fontSize: '150%' }}, "Cart"), React.createElement(DropDown_1.DropDown, {DropListItems: this.state.DropListItems.Sort, selector: "cart", dropName: "Sort By: "}), this.state.cartItems.map(function (v, i) {
	            return React.createElement("div", {className: "w3-center" + _this.state.colors.color1, style: { height: '15%' }}, React.createElement(CartItem_1.CartItem, {item: v, colors: _this.state.colors, index: i, key: i}));
	        })), React.createElement("div", {className: "w3-col m2 w3-center" + this.state.colors.color3, style: { height: '100%' }}, React.createElement("div", {className: "w3-hide-medium w3-hide-large", style: { height: '100%', fontSize: '150%' }}, React.createElement("br", null)), React.createElement("span", {style: { height: '100%', fontSize: '150%' }}, "Wishlist"), React.createElement("br", null), React.createElement(DropDown_1.DropDown, {DropListItems: this.state.DropListItems.Sort, selector: "wish", dropName: "Sort By: "}), this.state.wishItems.map(function (v, i) {
	            return React.createElement("div", {className: _this.state.colors.color2}, React.createElement(ProductListItem_1.ProductListItem, {style: { height: '100%' }, item: v, colors: _this.state.colors, index: i, key: i}));
	        }))));
	    };
	    return CartPanel;
	}(React.Component));
	exports.CartPanel = CartPanel;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Button_1 = __webpack_require__(6);
	var Popper_1 = __webpack_require__(7);
	var Share_1 = __webpack_require__(8);
	var Share_2 = __webpack_require__(8);
	var CartItem = (function (_super) {
	    __extends(CartItem, _super);
	    function CartItem() {
	        var _this = this;
	        _super.call(this);
	        this.componentDidMount = function () {
	            //add mouse hover listener to cartitems thumbnail image
	            var thumb = _this._el.querySelector("#thumb");
	            thumb.onmouseover = function () {
	                //this.popUp();
	                Share_2.ShowHide("#popContainer" + _this.props.index);
	            };
	            thumb.onmouseout = function () {
	                //this.popAway();
	                Share_2.ShowHide("#popContainer" + _this.props.index);
	            };
	        };
	        //shows image and description when hovering over cart item picture
	        this.popUp = function () {
	            var e = _this._el.querySelector('#popContainer');
	            e.style.display = 'block';
	        };
	        //removes the popup when mouse is not hovering over the cartitems image
	        this.popAway = function () {
	            var e = _this._el.querySelector('#popContainer');
	            e.style.display = 'none';
	        };
	    }
	    CartItem.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {style: { height: '100%' }, className: "w3-card w3-round-large w3-center w3-hover-shadow" + "", ref: function (component) { return _this._el = component; }}, React.createElement("div", {className: "w3-row", style: { height: '100%' }}, React.createElement("div", {className: "w3-col s2 m2", style: { height: '100%' }}, React.createElement("img", {id: "thumb", src: this.props.item.previewImage, style: { height: '80px', width: '80px' }, className: 'w3-circle'}), React.createElement(Popper_1.Popper, {index: this.props.index, colors: this.props.colors, style: { display: 'none' }, item: this.props.item})), React.createElement("div", {className: "w3-col s4 m4", style: { height: '100%' }}, this.props.item.name, React.createElement("br", null), this.props.item.sku), React.createElement("div", {className: "w3-col s2 m2", style: { height: '100%' }}, React.createElement(Button_1.Button, {buttonID: "remove", dataID: this.props.index, buttonText: "remove", colors: this.props.colors}), React.createElement(Button_1.Button, {buttonID: "update", dataID: this.props.index, buttonText: "update", colors: this.props.colors})), React.createElement("div", {className: "w3-col s2 m2", style: { height: '100%' }}, React.createElement("div", {id: "price", className: "itemRightTop"}, Share_1.Currency(this.props.item.price)), React.createElement("br", null), React.createElement("input", {style: { maxWidth: '55%' }, id: "qty", value: this.props.item.qty, className: "qtyField", "data-id": this.props.index, placeholder: "qty", type: "text"})), React.createElement("div", {className: "w3-col s2 m2", style: { height: '100%' }}, React.createElement("div", {style: { height: '100%' }}, this.props.item.date))));
	    };
	    return CartItem;
	}(React.Component));
	exports.CartItem = CartItem;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Button = (function (_super) {
	    __extends(Button, _super);
	    function Button() {
	        _super.call(this);
	        this.componentDidMount = function () {
	        };
	    }
	    Button.prototype.render = function () {
	        return React.createElement("div", {style: { padding: '0.5em' }}, React.createElement("div", {style: { fontSize: "80%" }, className: " w3-btn-block w3-tiny w3-round" + this.props.colors.colorBtn}, React.createElement("div", {id: this.props.buttonID, "data-id": this.props.dataID}, this.props.buttonText, " ")));
	    };
	    return Button;
	}(React.Component));
	exports.Button = Button;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Popper = (function (_super) {
	    __extends(Popper, _super);
	    function Popper() {
	        var _this = this;
	        _super.call(this);
	        this.componentDidMount = function () {
	            _this._el.style.position = 'absolute';
	            _this._el.style.zIndex = '3';
	            _this._el.className = 'w3-hide';
	            _this._el.style.transform = 'translate(-100%, -100%)';
	        };
	        this.componentDidUpdate = function () {
	            _this._el.className = 'w3-hide ' + _this.props.colors.color3;
	        };
	    }
	    Popper.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {style: { maxWidth: '100%' }, id: "popContainer" + this.props.index, className: 'w3-card' + this.props.colors.color3, ref: function (component) { return _this._el = component; }}, React.createElement("div", {className: this.props.colors.color2, style: { maxWidth: '90%' }}, React.createElement("img", {style: { width: '100%' }, src: this.props.item.previewImage})), React.createElement("div", {className: this.props.colors.color2, style: { textAlign: 'center', padding: '2px', overflow: 'hidden', wordWrap: 'break-word', maxWidth: '100%' }, id: "description", innerHTML: this.props.item.description}, this.props.item.description));
	    };
	    return Popper;
	}(React.Component));
	exports.Popper = Popper;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	//Note: This is using hard coded simple auth. HMAC auth is recommended for production and requires some crypto
	var boltUrlBase = "http://" + window.location.hostname + ":8888/";
	var username = "publicweb";
	var userkey = "webaccess1";
	var retryMs = 1000;
	function boltCall(apicall, payload, resultcb) {
	    var request = new XMLHttpRequest();
	    var URL = boltUrlBase + "request/" + apicall;
	    var data = JSON.stringify(payload);
	    request.open("POST", URL, true);
	    request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + userkey));
	    request.send(data);
	    request.onload = function () {
	        if (request.status >= 200 && request.status < 400) {
	            // Success!
	            var resp = JSON.parse(request.response);
	            if (resp.complete) {
	                resultcb(resp);
	            }
	            else {
	                boltRepeatCall(resp.id, resultcb, 1);
	            }
	        }
	        else {
	            console.log("Error with boltCall");
	        }
	    };
	}
	exports.boltCall = boltCall;
	function boltRepeatCall(id, resultcb, attempt) {
	    setTimeout(function () {
	        var request = new XMLHttpRequest();
	        var URL = boltUrlBase + "retr/peek/" + id;
	        var data = ("{}");
	        request.open("POST", URL, true);
	        request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + userkey));
	        request.send(data);
	        request.onload = function () {
	            if (request.status >= 200 && request.status < 400) {
	                // Success!
	                var resp = JSON.parse(request.response);
	                if (resp.complete) {
	                    resultcb(resp);
	                }
	                else {
	                    boltRepeatCall(resp.id, resultcb, attempt + 1);
	                }
	            }
	            else {
	                console.log("Error with boltRepeatCall");
	            }
	        };
	    }, retryMs);
	}
	exports.boltRepeatCall = boltRepeatCall;
	function SortByName(a, b) {
	    return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0;
	}
	exports.SortByName = SortByName;
	function ReverseSortByName(a, b) {
	    return (a.name.toUpperCase() < b.name.toUpperCase()) ? 1 : (a.name.toUpperCase() > b.name.toUpperCase()) ? -1 : 0;
	}
	exports.ReverseSortByName = ReverseSortByName;
	function SortByPrice(a, b) {
	    return (a.price < b.price) ? 1 : (a.price > b.price) ? -1 : 0;
	}
	exports.SortByPrice = SortByPrice;
	function ReverseSortByPrice(a, b) {
	    return (a.price < b.price) ? -1 : (a.price > b.price) ? 1 : 0;
	}
	exports.ReverseSortByPrice = ReverseSortByPrice;
	function SortByQTY(a, b) {
	    return (a.qty < b.qty) ? 1 : (a.qty > b.qty) ? -1 : 0;
	}
	exports.SortByQTY = SortByQTY;
	function ReverseSortByQTY(a, b) {
	    return (a.qty < b.qty) ? -1 : (a.qty > b.qty) ? 1 : 0;
	}
	exports.ReverseSortByQTY = ReverseSortByQTY;
	function SortByDate(a, b) {
	    var dateA = new Date(a.date);
	    var dateA_utc = new Date(dateA.getUTCFullYear(), dateA.getUTCMonth(), dateA.getUTCDate(), dateA.getUTCHours(), dateA.getUTCMinutes(), dateA.getUTCSeconds());
	    var dateB = new Date(b.date);
	    var dateB_utc = new Date(dateB.getUTCFullYear(), dateB.getUTCMonth(), dateB.getUTCDate(), dateB.getUTCHours(), dateB.getUTCMinutes(), dateB.getUTCSeconds());
	    return dateA_utc - dateB_utc;
	}
	exports.SortByDate = SortByDate;
	function ReverseSortByDate(a, b) {
	    var dateA = new Date(a.date);
	    var dateA_utc = new Date(dateA.getUTCFullYear(), dateA.getUTCMonth(), dateA.getUTCDate(), dateA.getUTCHours(), dateA.getUTCMinutes(), dateA.getUTCSeconds());
	    var dateB = new Date(b.date);
	    var dateB_utc = new Date(dateB.getUTCFullYear(), dateB.getUTCMonth(), dateB.getUTCDate(), dateB.getUTCHours(), dateB.getUTCMinutes(), dateB.getUTCSeconds());
	    return dateA_utc < dateB_utc ? 1 : dateA_utc > dateB_utc ? -1 : 0;
	}
	exports.ReverseSortByDate = ReverseSortByDate;
	//regex to put commas in proper positions, and go to 2 decimal places
	function Currency(s) {
	    if (s) {
	        var ss = s.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	        return "$" + ss;
	    }
	}
	exports.Currency = Currency;
	//shows list based on the data-id that is  passed in
	function ShowHide(selector) {
	    var x = document.querySelector(selector);
	    if (x.className.indexOf("w3-show") == -1) {
	        x.className += " w3-show";
	    }
	    else {
	        x.className = x.className.replace(" w3-show", "");
	    }
	}
	exports.ShowHide = ShowHide;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Share_1 = __webpack_require__(8);
	var Share_2 = __webpack_require__(8);
	var Promo = (function (_super) {
	    __extends(Promo, _super);
	    function Promo() {
	        var _this = this;
	        _super.call(this);
	        //sets a keydown listener for the promocode
	        this.componentDidMount = function () {
	            _this._el.addEventListener("keydown", _this.firePromo.bind(_this));
	        };
	        this.timer = 2000; // 2 seconds after keydown
	        this.timeout = 0;
	        //starts timeout function that calls promoCall
	        this.firePromo = function (e) {
	            document.getElementById("Promo").onkeydown = function () {
	                clearTimeout(_this.timeout);
	                _this.timeout = setTimeout(_this.promoCall, _this.timer);
	            };
	        };
	        //fires off a bolt call after timer is up.
	        this.promoCall = function () {
	            Share_1.boltCall("mobile/getPromo", {}, function (result) {
	                Share_2.ShowHide("#promoLight");
	                //toggleHidden("promoLight");
	            });
	        };
	        this.state = {};
	    }
	    Promo.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {className: "promoField", ref: function (c) { return _this._el = c; }}, React.createElement("input", {style: { maxWidth: '80%' }, id: "Promo", type: "text", placeholder: "Enter Promo Code"}), React.createElement("br", null), React.createElement("div", {className: "w3-green w3-hide", id: "promoLight"}, "Promo accepted!"), React.createElement("br", null));
	    };
	    return Promo;
	}(React.Component));
	exports.Promo = Promo;
	//used in CartPopover as well to toggle visibility of elements
	function toggleHidden(id) {
	    var elem = document.getElementById(id);
	    if (elem.className == "") {
	        elem.className = "hidden";
	    }
	    else {
	        elem.className = "";
	    }
	}
	exports.toggleHidden = toggleHidden;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Share_1 = __webpack_require__(8);
	var CartDataPanel = (function (_super) {
	    __extends(CartDataPanel, _super);
	    function CartDataPanel() {
	        _super.call(this);
	    }
	    CartDataPanel.prototype.render = function () {
	        return React.createElement("div", {className: "w3-card w3-round" + ""}, React.createElement("div", {className: "w3-row"}, React.createElement("div", {className: "w3-col s6"}, "Subtotal: "), React.createElement("div", {className: "w3-right-align w3-col s4"}, Share_1.Currency(this.props.cartData.subtotal)), React.createElement("div", {className: "w3-col s2"})), React.createElement("div", {className: "w3-row"}, React.createElement("div", {className: "w3-col s6"}, "Shipping: "), React.createElement("div", {className: "w3-right-align w3-col s4"}, Share_1.Currency(this.props.cartData.shipping)), React.createElement("div", {className: "w3-col s2"})), React.createElement("div", {className: "w3-row"}, React.createElement("div", {className: "w3-col s6"}, "Tax: "), React.createElement("div", {className: "w3-right-align w3-col s4"}, Share_1.Currency(this.props.cartData.tax)), React.createElement("div", {className: "w3-col s2"})), React.createElement("div", {className: "w3-row w3-border-top"}, React.createElement("div", {className: "w3-col s6"}, "Total: "), React.createElement("div", {className: "w3-right-align w3-col s4"}, Share_1.Currency(this.props.cartData.total)), React.createElement("div", {className: "w3-col s2"})));
	    };
	    return CartDataPanel;
	}(React.Component));
	exports.CartDataPanel = CartDataPanel;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Button_1 = __webpack_require__(6);
	var CartCheckoutPanel = (function (_super) {
	    __extends(CartCheckoutPanel, _super);
	    function CartCheckoutPanel() {
	        _super.call(this);
	    }
	    CartCheckoutPanel.prototype.render = function () {
	        return React.createElement("div", null, React.createElement("div", {className: "w3-row w3-center"}, React.createElement("div", {className: "w3-padding w3-col s12 w3-center"}, React.createElement(Button_1.Button, {buttonID: "cancelButton", buttonText: "Cancel", colors: this.props.colors})), React.createElement("div", {className: "w3-padding w3-col s12 w3-center"}, React.createElement(Button_1.Button, {buttonID: "clearButton", buttonText: "Clear", colors: this.props.colors})), React.createElement("div", {className: "w3-padding w3-col s12 w3-center"}, React.createElement(Button_1.Button, {buttonID: "submitButton", buttonText: "Checkout", colors: this.props.colors}))));
	    };
	    return CartCheckoutPanel;
	}(React.Component));
	exports.CartCheckoutPanel = CartCheckoutPanel;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Share_1 = __webpack_require__(8);
	var ProductListItem = (function (_super) {
	    __extends(ProductListItem, _super);
	    function ProductListItem() {
	        var _this = this;
	        _super.call(this);
	        this.componentDidMount = function () {
	            //when the product suggestion is clicked go to the clients product page
	            _this._el.addEventListener("click", _this.productLinker);
	        };
	        this.productLinker = function () {
	            window.location = _this.props.item.previewImage;
	        };
	    }
	    ProductListItem.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {className: "w3-card w3-round-medium w3-hover-shadow" + "", ref: function (component) { return _this._el = component; }}, React.createElement("div", {className: "productTop"}, React.createElement("div", {className: "productImage w3-center w3-padding"}, React.createElement("img", {className: "w3-round-large", style: { maxHeight: '95%', maxWidth: '95%' }, src: this.props.item.previewImage}))), React.createElement("div", {className: ""}, React.createElement("div", {className: "w3-row"}, React.createElement("div", {className: "w3-col s7 l8 w3-center"}, this.props.item.name, " "), React.createElement("div", {className: "w3-col s5 l4"}, " ", React.createElement("div", {classname: "centerPrice"}, Share_1.Currency(this.props.item.price)))), React.createElement("div", {className: "w3-row"}, React.createElement("div", {className: "w3-col s7 w3-center"}, this.props.item.sku), React.createElement("div", {className: "w3-col s5 w3-center"}, this.props.item.stock, " in stock"))));
	    };
	    return ProductListItem;
	}(React.Component));
	exports.ProductListItem = ProductListItem;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Share_1 = __webpack_require__(8);
	var Share_2 = __webpack_require__(8);
	var ProductListItem_1 = __webpack_require__(12);
	//
	//area to hold product suggestions
	//
	var ProductListPanel = (function (_super) {
	    __extends(ProductListPanel, _super);
	    function ProductListPanel() {
	        var _this = this;
	        _super.call(this);
	        this.componentDidMount = function () {
	            Share_1.boltCall("mobile/getRecommendedProducts", { userId: "someuser" }, function (result) {
	                result.return_value.products.sort(Share_2.SortByName);
	                _this.setState(result.return_value);
	            });
	        };
	        this.state = { "products": [{
	                    "previewImage": "",
	                    "name": ""
	                }] };
	    }
	    ProductListPanel.prototype.render = function () {
	        return React.createElement("div", {class: true}, React.createElement("div", {className: "w3-center" + "", style: { fontSize: '150%' }}, "You might like..."), this.state.products.map(function (v, i) {
	            return React.createElement("div", null, React.createElement(ProductListItem_1.ProductListItem, {item: v, index: i}));
	        }));
	    };
	    return ProductListPanel;
	}(React.Component));
	exports.ProductListPanel = ProductListPanel;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var HomeBanner = (function (_super) {
	    __extends(HomeBanner, _super);
	    function HomeBanner() {
	        _super.call(this);
	        this.componentDidMount = function () {
	        };
	        this.state = {};
	    }
	    HomeBanner.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {ref: function (component) { return _this._el = component; }}, React.createElement("img", {src: this.props.images[1]}));
	    };
	    return HomeBanner;
	}(React.Component));
	exports.HomeBanner = HomeBanner;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var DropDown = (function (_super) {
	    __extends(DropDown, _super);
	    function DropDown() {
	        _super.call(this);
	    }
	    DropDown.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {id: "h", ref: function (component) { return _this._el = component; }, className: "w3-dropdown-click"}, React.createElement("button", {id: "dropMenu", "data-id": this.props.selector, className: "w3-btn w3-light-gray"}, this.props.dropName), React.createElement("div", {id: "list" + this.props.selector, style: {}, className: "w3-center w3-dropdown-content w3-card"}, this.props.DropListItems.map(function (v, i) {
	            return React.createElement("a", {href: "#", "data-id": _this.props.selector, "data-name": v.listTitle, id: v.listID}, v.listTitle, " ", React.createElement("div", {id: v.listID + "Arrow", className: "arrow", style: { display: 'inline-block' }}));
	        })));
	    };
	    return DropDown;
	}(React.Component));
	exports.DropDown = DropDown;
	//shows list based on the data-id that is  passed in
	function ShowList(selector) {
	    var x = document.querySelector("#list" + selector);
	    if (x.className.indexOf("w3-show") == -1) {
	        x.className += " w3-show";
	    }
	    else {
	        x.className = x.className.replace(" w3-show", "");
	    }
	}
	exports.ShowList = ShowList;
	//hides all open drop down lists
	function HideList(selectors) {
	    for (var i = 0; i < selectors.length; i++) {
	        var x = document.querySelector('#list' + selectors[i]);
	        console.log(x);
	        if (x.className.indexOf("w3-show") != -1) {
	            x.className = x.className.replace(" w3-show", "");
	        }
	    }
	}
	exports.HideList = HideList;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var DropDown_1 = __webpack_require__(15);
	var ThemeSelector = (function (_super) {
	    __extends(ThemeSelector, _super);
	    function ThemeSelector() {
	        _super.call(this);
	    }
	    ThemeSelector.prototype.render = function () {
	        return React.createElement("div", null, React.createElement(DropDown_1.DropDown, {DropListItems: this.props.ThemeList, selector: "theme", dropName: "Themes: "}));
	    };
	    return ThemeSelector;
	}(React.Component));
	exports.ThemeSelector = ThemeSelector;


/***/ }
/******/ ]);
//# sourceMappingURL=fairmont-cart.js.map