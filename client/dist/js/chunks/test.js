(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["test"],{

/***/ "./client/src/js/test.js":
/*!*******************************!*\
  !*** ./client/src/js/test.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _compontent_stree_STree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../compontent/stree/STree */ \"./client/src/compontent/stree/STree.vue\");\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  components: {\n    STree: _compontent_stree_STree__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  methods: {\n    aaa: function aaa() {\n      console.log(this.$refs.tree.getSelectItem());\n      console.log(this.$refs.tree.getSelectItemAndParent());\n    }\n  },\n  data: function data() {\n    return {\n      data: [{\n        id: 1,\n        parentID: 0,\n        text: '节点1'\n      }, {\n        id: 2,\n        parentID: 0,\n        text: '节点2'\n      }, {\n        id: 3,\n        parentID: 1,\n        text: '节点3'\n      }, {\n        id: 4,\n        parentID: 1,\n        text: '节点44444'\n      }, {\n        id: 5,\n        parentID: 2,\n        text: '节点4'\n      }],\n      selected: [1, 4]\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/test.js?");

/***/ })

},[["./client/src/js/test.js","runtime","vendor"]]]);