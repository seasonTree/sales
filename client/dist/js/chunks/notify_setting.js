(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["notify_setting"],{

/***/ "./client/src/js/notify_setting.js":
/*!*****************************************!*\
  !*** ./client/src/js/notify_setting.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_1__[\"mixinExt\"]],\n  methods: {\n    showAddDig: function showAddDig() {\n      var that = this;\n      that.$api.config.addSel().then(function (res) {\n        // that.tdata = res.data;\n        that.items = res.data[0].select_name;\n        that.item_child = res.data.child;\n      }).catch(function (res) {\n        console.log('eeeeeeeeeeeee');\n        console.log(res);\n      });\n      that.showAdd = true;\n    }\n  },\n  data: function data() {\n    return {\n      showAdd: false,\n      items: '',\n      item_child: [{\n        id: '',\n        select_name: ''\n      }],\n      theader: [{\n        text: '',\n        align: 'left',\n        value: 'a',\n        sortable: false\n      }, {\n        text: '消息类型',\n        align: 'left',\n        value: 'b',\n        sortable: false\n      }, {\n        text: '消息内容',\n        align: 'left',\n        value: 'c',\n        sortable: false\n      }, {\n        align: 'center',\n        value: 'd',\n        sortable: false\n      }],\n      tdata: [{\n        a: 1,\n        b: '佣金消息',\n        c: '1322312321231223'\n      }]\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/notify_setting.js?");

/***/ })

},[["./client/src/js/notify_setting.js","runtime","vendor"]]]);