(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reset_password"],{

/***/ "./client/src/js/reset_password.js":
/*!*****************************************!*\
  !*** ./client/src/js/reset_password.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  methods: {\n    commitChange: function commitChange() {\n      this.snackbar = true;\n      setTimeout(function () {\n        window.location.href = '/login.html';\n      }, 3000);\n    }\n  },\n  data: function data() {\n    return {\n      snackbar: false,\n      show_pass: false\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/reset_password.js?");

/***/ })

},[["./client/src/js/reset_password.js","runtime","vendor"]]]);