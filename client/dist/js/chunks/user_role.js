(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user_role"],{

/***/ "./client/src/js/user_role.js":
/*!************************************!*\
  !*** ./client/src/js/user_role.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _compontent_stree_STree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../compontent/stree/STree */ \"./client/src/compontent/stree/STree.vue\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_2__[\"mixinExt\"]],\n  components: {\n    STree: _compontent_stree_STree__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  created: function created() {\n    var _this = this;\n\n    var that = this;\n    that.$api.role.get().then(function (data) {\n      that.tdata = data.data;\n      _this.checkBoxData = data.priData;\n    }).catch(function (data) {\n      console.log('eeeeeeeeeeeee');\n      console.log(data);\n    });\n  },\n  data: function data() {\n    return {\n      showAdd: false,\n      showEdit: false,\n      prevData: [],\n      addItem: {// checkBoxData:[],\n      },\n      editItem: {// checkBoxData:[],\n      },\n      checkBoxData: [],\n      selected: [],\n      items: ['页面1', '页面2'],\n      theader: [{\n        text: 'ID',\n        align: 'left',\n        value: 'id',\n        sortable: false\n      }, {\n        text: '角色名称',\n        align: 'left',\n        value: 'role_name',\n        sortable: false\n      }, {\n        text: '用户列表',\n        align: 'left',\n        value: 'username',\n        sortable: false\n      }, {\n        text: '描述',\n        align: 'left',\n        value: 'pri_name',\n        sortable: false\n      }, {\n        text: '操作',\n        align: 'center',\n        value: 'e',\n        sortable: false\n      }],\n      tdata: [],\n      message: {\n        show: false,\n        text: '',\n        time: 3000,\n        color: 'success'\n      }\n    };\n  },\n  methods: {\n    edit: function edit(item) {\n      this.showEdit = true;\n      var that = this;\n      that.editItem.role_name = item.role_name;\n      that.editItem.id = item.id;\n      this.selected = item.pri_id.split(',');\n    },\n    addCommit: function addCommit() {\n      var that = this,\n          data = {};\n      data.role_name = that.addItem.role_name;\n      data.selected = this.$refs.treeAdd.getSelect();\n      that.$api.role.add({\n        data: data\n      }).then(function (res) {\n        // that.editItem.id = data.id;\n        that.showAdd = false;\n        that.message.text = res.message;\n        that.message.color = 'success';\n        that.message.show = true;\n        setTimeout(function () {\n          window.location.reload();\n        }, 2000);\n      }).catch(function (data) {\n        //function(data){}\n        that.message.text = data.message;\n        that.message.color = 'error';\n        that.message.show = true;\n        that.submitLoading = false;\n      });\n    },\n    editCommit: function editCommit() {\n      var that = this,\n          data = {};\n      data.role_name = that.editItem.role_name;\n      data.id = that.editItem.id;\n      data.selected = this.$refs.treeEdit.getSelect();\n      that.$api.role.edit({\n        data: data\n      }).then(function (data) {\n        that.showEdit = false;\n        that.message.text = data.message;\n        that.message.color = 'success';\n        that.message.show = true;\n        setTimeout(function () {\n          window.location.reload();\n        }, 2000);\n      }).catch(function (data) {\n        //function(data){}\n        // console.log('失败了')\n        that.message.text = data.message;\n        that.message.color = 'error';\n        that.message.show = true;\n        that.submitLoading = false;\n      });\n    },\n    del: function del(id) {\n      var that = this;\n      that.$api.role.del({\n        data: id\n      }).then(function (data) {\n        that.message.text = data.message;\n        that.message.color = 'success';\n        that.message.show = true;\n        setTimeout(function () {\n          window.location.reload();\n        }, 2000);\n      }).catch(function (data) {\n        //function(data){}\n        that.message.text = data.message;\n        that.message.color = 'error';\n        that.message.show = true; // that.submitLoading = false;\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/user_role.js?");

/***/ })

},[["./client/src/js/user_role.js","runtime","vendor"]]]);