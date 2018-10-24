(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["message"],{

/***/ "./client/src/js/message.js":
/*!**********************************!*\
  !*** ./client/src/js/message.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_1__[\"mixinExt\"]],\n  created: function created() {\n    var that = this;\n    that.$api.message.lst().then(function (res) {\n      that.tdata = res.data;\n    }).catch(function (res) {\n      console.log('eeeeeeeeeeeee');\n      console.log(res);\n    });\n  },\n  methods: {\n    showMessage: function showMessage(list) {\n      var that = this;\n      that.m_id = that.tdata[list].id;\n      that.m_title = that.tdata[list].title;\n      that.m_content = that.tdata[list].content; // console.log(that.m_content);\n\n      that.$api.message.isRead({\n        data: that.m_id\n      }).then(function (res) {\n        // that.tdata = res.data;\n        that.globalShowMessage(true, res.msg, 'success');\n      }).catch(function (res) {\n        console.log('eeeeeeeeeeeee');\n        console.log(res);\n      });\n      that.viewMessage = true;\n    }\n  },\n  data: function data() {\n    return {\n      viewMessage: false,\n      m_id: '',\n      m_title: '',\n      m_content: '',\n      theader: [{\n        text: 'id',\n        align: 'left',\n        value: 'a',\n        sortable: false\n      }, {\n        text: '标题',\n        align: 'left',\n        value: 'b',\n        sortable: false\n      }, {\n        text: '发送人',\n        align: 'left',\n        value: 'c',\n        sortable: false\n      }, {\n        text: '发送时间',\n        align: 'left',\n        value: 'd',\n        sortable: false\n      }, {\n        text: '',\n        align: 'left',\n        // value: '',\n        sortable: false\n      }],\n      tdata: [{// a: '123',\n        // b: '111111',\n        // c: '111111',\n        // d: '111111',\n        // e: '111111',\n      }]\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/message.js?");

/***/ })

},[["./client/src/js/message.js","runtime","vendor"]]]);