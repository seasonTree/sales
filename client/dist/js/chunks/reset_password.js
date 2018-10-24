(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reset_password"],{

/***/ "./client/src/js/reset_password.js":
/*!*****************************************!*\
  !*** ./client/src/js/reset_password.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_1__[\"baseMixin\"]],\n  methods: {\n    // showMessage(show, text, color) {\n    //     this.message.text = text || '';\n    //     this.message.color = color;\n    //     this.message.show = show;\n    // },\n    commit: function commit() {\n      var _this = this;\n\n      var that = this;\n\n      if (that.$refs.form.validate()) {\n        that.$api.user.resetPassword({\n          data: that.data\n        }).then(function (res) {\n          if (res.code == 0) {\n            // that.globalShowMessage(true, res.msg, 'success');\n            _this.$comp.toast({\n              text: res.msg\n            });\n\n            setTimeout(function () {\n              window.location.href = res.data.url;\n            }, 3000);\n          } else {\n            // that.globalShowMessage(true, res.msg, 'error');\n            _this.$comp.toast({\n              text: res.msg,\n              color: 'error'\n            });\n          }\n        }).catch(function (res) {\n          _this.$comp.toast({\n            text: '修改失败,请重试.',\n            color: 'error'\n          }); // that.globalShowMessage(true, '修改失败,请重试.', 'error');\n\n        });\n      }\n    }\n  },\n  data: function data() {\n    return {\n      valid: false,\n      show_pass: false,\n      show_pass1: false,\n      data: {\n        password: '',\n        rePassword: '',\n        uid: ''\n      },\n      message: {\n        show: false,\n        text: '',\n        time: 3000,\n        color: 'success'\n      }\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/reset_password.js?");

/***/ })

},[["./client/src/js/reset_password.js","runtime","vendor"]]]);