webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _color = __webpack_require__(2);

var _color2 = _interopRequireDefault(_color);

var _api = __webpack_require__(3);

var _api2 = _interopRequireDefault(_api);

var _hello = __webpack_require__(4);

var _hello2 = _interopRequireDefault(_hello);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import $ from 'jquery';
$('.title').html('Hello Webpack'); //import 'bootstrap/scss/bootstrap.scss';

Vue.component('Card', {
    template: _hello2.default,
    props: ['teams']
});
var vm = new Vue({
    el: '#app',
    data: {
        msg: 'hello',
        cav: [{ name: 'K. Love' }, { name: 'L. James' }, { name: 'D. Rose' }, { name: 'D. Wade' }],
        pacers: [{ name: 'T. Young' }, { name: 'B. Bogdanovic' }, { name: 'D. Sabonis' }, { name: 'V. Oladipo' }]
    }
});
console.log(_api2.default.title);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var api = {
    title: 'Title'
};

exports.default = api;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r    <div class=\"card-body\">\r        <h4 class=\"card-title\">Card title</h4>\r        <p class=\"card-text\">This card has supporting text below as a natural lead-in to additional content.</p>\r        <p class=\"card-text\"><small class=\"text-muted\">Last updated 3 mins ago</small></p>\r    </div>\r    <ul class=\"list-group list-group-flush\">\r        <slot name=\"player\" :props=\"name\" v-for=\"name in teams\"></slot>\r    </ul>\r</div>"

/***/ })
],[1]);