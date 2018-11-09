(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["company_detail"],{

/***/ "./client/src/js/company_detail.js":
/*!*****************************************!*\
  !*** ./client/src/js/company_detail.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _compontent_uploadimage_UploadImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @compontent/uploadimage/UploadImage */ \"./client/src/compontent/uploadimage/UploadImage.vue\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_2__[\"mixinExt\"]],\n  components: {\n    uploadImage: _compontent_uploadimage_UploadImage__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  created: function created() {\n    var that = this;\n    that.$api.user.getOneUser().then(function (res) {\n      that.data = res.data;\n    }).catch(function (res) {\n      console.log('eeeeeeeeeeeee');\n      console.log(res);\n    });\n  },\n  methods: {\n    submit: function submit() {\n      var that = this;\n      that.$api.user.insUserInfo({\n        data: that.data\n      }).then(function (res) {\n        that.$comp.toast({\n          text: res.msg\n        }); // that.data = res.data;\n      }).catch(function (res) {\n        console.log('eeeeeeeeeeeee');\n        console.log(res);\n        that.$comp.toast({\n          text: res.msg,\n          color: 'error'\n        });\n      });\n    }\n  },\n  data: function data() {\n    return {\n      data: []\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/company_detail.js?");

/***/ })

},[["./client/src/js/company_detail.js","runtime","vendor","common"]]]);