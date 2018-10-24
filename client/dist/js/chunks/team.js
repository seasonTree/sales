(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["team"],{

/***/ "./client/src/js/team.js":
/*!*******************************!*\
  !*** ./client/src/js/team.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_1__[\"mixinExt\"]],\n  created: function created() {\n    var that = this;\n    that.$api.team.lst().then(function (res) {\n      that.tdata = res.data;\n    }).catch(function (res) {\n      console.log('eeeeeeeeeeeee');\n      console.log(res);\n    });\n  },\n  data: function data() {\n    return {\n      showAdd: false,\n      show_pass: false,\n      showEdit: false,\n      theader: [{\n        text: '姓名',\n        align: 'left',\n        value: 'a',\n        sortable: false\n      }, {\n        text: '电话',\n        align: 'left',\n        value: 'b',\n        sortable: false\n      }, {\n        text: '负责/关联渠道',\n        align: 'right',\n        value: 'c',\n        sortable: false\n      }, {\n        text: '业绩目标',\n        align: 'left',\n        value: 'd',\n        sortable: false\n      }, {\n        text: '医生目标',\n        align: 'left',\n        value: 'e',\n        sortable: false\n      }, {\n        text: '设置',\n        align: 'left',\n        value: 'f',\n        sortable: false\n      }],\n      tdata: [// {\n        //         a: '王成',\n        //         b: '187563245',\n        //         c: '微信1(大众点评)',\n        //         d: '50000',\n        //         e: '10000',\n        //     },\n        //     {\n        //         a: '',\n        //         b: '',\n        //         c: '微信1(大众点评)',\n        //         d: '50000',\n        //         e: '10000',\n        //     },\n        //     {\n        //         a: '李成功',\n        //         b: '1821503112',\n        //         c: '医生合作',\n        //         d: '50000',\n        //         e: '10000',\n        //     }\n      ]\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/team.js?");

/***/ })

},[["./client/src/js/team.js","runtime","vendor"]]]);