(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user_manage"],{

/***/ "./client/src/js/user_manage.js":
/*!**************************************!*\
  !*** ./client/src/js/user_manage.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_1__[\"mixinExt\"]],\n  created: function created() {\n    var that = this;\n    that.$api.user.get().then(function (data) {\n      that.rolesAll = data.data;\n    }).catch(function (data) {\n      console.log('eeeeeeeeeeeee');\n      console.log(data);\n    });\n  },\n  data: function data() {\n    return {\n      show_pass: false,\n      show_pass1: false,\n      rolesAll: {},\n      addData: {\n        role_id: []\n      },\n      showAdd: false,\n      theader: [{\n        text: 'ID',\n        align: 'left',\n        value: 'a',\n        sortable: false\n      }, {\n        text: '登录名',\n        align: 'left',\n        value: 'b',\n        sortable: false\n      }, {\n        text: '角色',\n        align: 'right',\n        value: 'c',\n        sortable: false\n      }, {\n        text: '是否启用',\n        align: 'left',\n        value: 'd',\n        sortable: false\n      }, {\n        text: '操作',\n        align: 'center',\n        value: 'e',\n        sortable: false\n      }],\n      tdata: [{\n        a: '1',\n        b: 'admin',\n        c: '管理员',\n        d: '是'\n      }]\n    };\n  },\n  methods: {\n    addCommit: function addCommit() {\n      var that = this,\n          data = {}; // console.log(that.addData);\n\n      that.$api.user.add({\n        data: that.addData\n      }).then(function (res) {\n        // that.showAdd = false;\n        console.log(res); // that.message.text = res.message;\n        // that.message.color = 'success';\n        // that.message.show = true;\n        // setTimeout(function () {\n        //     window.location.reload();\n        // },2000)\n      }).catch(function (data) {\n        //function(data){}\n        that.message.text = data.message;\n        that.message.color = 'error';\n        that.message.show = true;\n        that.submitLoading = false;\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/user_manage.js?");

/***/ })

},[["./client/src/js/user_manage.js","runtime","vendor"]]]);