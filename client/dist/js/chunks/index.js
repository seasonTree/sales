(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "./client/src/js/index.js":
/*!********************************!*\
  !*** ./client/src/js/index.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_1__[\"baseMixin\"]],\n  methods: {\n    handlerSubmit: function handlerSubmit() {\n      var _this = this;\n\n      var that = this;\n      that.submitLoading = true;\n      that.$api.common.login({\n        data: that.data\n      }).then(function (res) {\n        if (res.code == 0) {\n          window.location.href = res.data.url;\n        } else {\n          // this.globalShowMessage(true, res.msg, 'error');\n          _this.$comp.toast({\n            text: res.msg,\n            color: 'error'\n          });\n\n          that.submitLoading = false;\n        }\n      }).catch(function (res) {\n        _this.$comp.toast({\n          text: '登录失败,请重试.',\n          color: 'error'\n        }); // this.globalShowMessage(true, '登录失败,请重试.', 'error');\n\n\n        that.submitLoading = false;\n      });\n    }\n  },\n  data: function data() {\n    return {\n      show_pass: false,\n      submitLoading: false,\n      message: {\n        show: false,\n        text: '',\n        time: 3000,\n        color: 'success'\n      },\n      data: {\n        username: '',\n        password: '',\n        remember: false\n      }\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/index.js?");

/***/ })

},[["./client/src/js/index.js","runtime","vendor","common"]]]);