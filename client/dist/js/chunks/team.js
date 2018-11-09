(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["team"],{

/***/ "./client/src/js/team.js":
/*!*******************************!*\
  !*** ./client/src/js/team.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./client/src/js/base.js\");\n/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin */ \"./client/src/js/mixin.js\");\n\n\nnew _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_1__[\"mixinExt\"]],\n  created: function created() {\n    var _this = this;\n\n    var that = this;\n    that.$api.team.lst().then(function (res) {\n      var data = res.data,\n          preItem = null;\n\n      for (var i = 0; i < data.length; i++) {\n        var item = data[i];\n\n        if (preItem && preItem.phone == item.phone) {\n          preItem.hideBorder = true;\n          item.hidePre = true;\n        }\n\n        preItem = item;\n      }\n\n      that.tdata = data;\n    }).catch(function (res) {\n      _this.$comp.toast({\n        text: '获取数据失败，请重试.',\n        color: 'error'\n      });\n    });\n  },\n  methods: {\n    showInvitation: function showInvitation() {\n      var _this2 = this;\n\n      var that = this;\n      that.$api.team.showQrCode().then(function (res) {\n        that.qr_code = res.data;\n        that.showAdd = true;\n      }).catch(function (res) {\n        _this2.$comp.toast({\n          text: '获取二维码，请重试.',\n          color: 'error'\n        });\n      });\n    },\n    CopyUrl: function CopyUrl(url) {\n      var that = this; //复制链接\n\n      var textToClipboard = url;\n      var success = true;\n\n      if (window.clipboardData) {\n        // Internet Explorer\n        window.clipboardData.setData(\"Text\", textToClipboard);\n      } else {\n        // create a temporary element for the execCommand method\n        var forExecElement = that.CreateElementForExecCommand(textToClipboard);\n        /* Select the contents of the element\r\n            (the execCommand for 'copy' method works on the selection) */\n\n        that.SelectContent(forExecElement);\n        var supported = true; // UniversalXPConnect privilege is required for clipboard access in Firefox\n\n        try {\n          if (window.netscape && netscape.security) {\n            netscape.security.PrivilegeManager.enablePrivilege(\"UniversalXPConnect\");\n          } // Copy the selected content to the clipboard\n          // Works in Firefox and in Safari be:fore version 5\n\n\n          success = document.execCommand(\"copy\", false, null);\n        } catch (e) {\n          success = false;\n        } // remove the temporary element\n\n\n        document.body.removeChild(forExecElement);\n      }\n\n      if (success) {\n        this.$comp.toast({\n          text: '复制成功.'\n        });\n      } else {\n        this.$comp.toast({\n          text: '复制失败.',\n          color: 'error'\n        });\n      }\n    },\n    CreateElementForExecCommand: function CreateElementForExecCommand(textToClipboard) {\n      var forExecElement = document.createElement(\"div\"); // place outside the visible area\n\n      forExecElement.style.position = \"absolute\";\n      forExecElement.style.left = \"-10000px\";\n      forExecElement.style.top = \"-10000px\"; // write the necessary text into the element and append to the document\n\n      forExecElement.textContent = textToClipboard;\n      document.body.appendChild(forExecElement); // the contentEditable mode is necessary for the  execCommand method in Firefox\n\n      forExecElement.contentEditable = true;\n      return forExecElement;\n    },\n    SelectContent: function SelectContent(element) {\n      // first create a range\n      var rangeToSelect = document.createRange();\n      rangeToSelect.selectNodeContents(element); // select the contents\n\n      var selection = window.getSelection();\n      selection.removeAllRanges();\n      selection.addRange(rangeToSelect);\n    }\n  },\n  data: function data() {\n    return {\n      showAdd: false,\n      qr_code: {},\n      //邀请人信息\n      checkRepeat: '',\n      theader: [{\n        text: '姓名',\n        align: 'left',\n        value: 'a',\n        sortable: false\n      }, {\n        text: '电话',\n        align: 'left',\n        value: 'b',\n        sortable: false\n      }, {\n        text: '负责/关联渠道',\n        align: 'right',\n        value: 'c',\n        sortable: false\n      }, {\n        text: '业绩目标',\n        align: 'left',\n        value: 'd',\n        sortable: false\n      }, {\n        text: '医生目标',\n        align: 'left',\n        value: 'e',\n        sortable: false\n      }, {\n        text: '设置',\n        align: 'left',\n        value: 'f',\n        sortable: false\n      }],\n      tdata: []\n    };\n  }\n});\n\n//# sourceURL=webpack:///./client/src/js/team.js?");

/***/ })

},[["./client/src/js/team.js","runtime","vendor","common"]]]);