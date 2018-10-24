(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reg_audit"],{

/***/ "./client/src/js/reg_audit.js":
/*!************************************!*\
  !*** ./client/src/js/reg_audit.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_1__[\"mixinExt\"]],\n  methods: {\n    viewAudit: function viewAudit(item) {\n      this.auditInfo = true;\n      this.viewAuditInfo = item;\n    }\n  },\n  data: function data() {\n    return {\n      auditInfo: false,\n      viewImage: false,\n      auditNotPass: false,\n      viewAuditInfo: {},\n      theader: [{\n        text: '姓',\n        align: 'left',\n        value: 'a',\n        sortable: false\n      }, {\n        text: '名',\n        align: 'left',\n        value: 'b',\n        sortable: false\n      }, {\n        text: '角色',\n        align: 'left',\n        value: 'c',\n        sortable: false\n      }, {\n        text: '电话',\n        align: 'left',\n        value: 'd',\n        sortable: false\n      }, {\n        text: '操作',\n        align: 'center',\n        value: 'e',\n        sortable: false\n      }],\n      tdata: [{\n        a: '刘',\n        b: '伟',\n        c: '销售员',\n        d: '1234567890',\n        e: 'p'\n      }, {\n        a: '刘',\n        b: '伟2',\n        c: '公司',\n        d: '1234567890',\n        e: 'c'\n      }]\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/reg_audit.js?");

/***/ })

},[["./client/src/js/reg_audit.js","runtime","vendor"]]]);