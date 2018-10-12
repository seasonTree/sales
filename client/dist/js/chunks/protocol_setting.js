(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["protocol_setting"],{

/***/ "./client/src/js/protocol_setting.js":
/*!*******************************************!*\
  !*** ./client/src/js/protocol_setting.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mounted: function mounted() {\n    ClassicEditor.create(document.querySelector('#editor'), {}).catch(function (error) {\n      console.error(error);\n    });\n  },\n  // computed: {\n  //     editor() {\n  //         return this.$refs.quillEditor.quill\n  //     },\n  // },\n  data: function data() {\n    return {\n      content: null,\n      editorOption: {},\n      showAdd: false,\n      items: ['开启注册', '关闭注册'],\n      theader: [{\n        text: '',\n        align: 'left',\n        value: 'a',\n        sortable: false\n      }, {\n        text: '协议名称',\n        align: 'left',\n        value: 'b',\n        sortable: false\n      }, {\n        text: '协议内容',\n        align: 'left',\n        value: 'c',\n        sortable: false\n      }, {\n        align: 'center',\n        value: 'h',\n        sortable: false\n      }],\n      tdata: [{\n        a: 1,\n        b: '佣金协议',\n        c: '协议内容'\n      }]\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/protocol_setting.js?");

/***/ })

},[["./client/src/js/protocol_setting.js","runtime","vendor"]]]);