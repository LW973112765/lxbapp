(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/huaban/whiteboard/whiteboard"],{

/***/ 782:
/*!******************************************************************************************************************!*\
  !*** D:/360MoveData/Users/Administrator/Desktop/郎小宝/main.js?{"page":"pages%2Fhuaban%2Fwhiteboard%2Fwhiteboard"} ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _whiteboard = _interopRequireDefault(__webpack_require__(/*! ./pages/huaban/whiteboard/whiteboard.vue */ 783));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_whiteboard.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 783:
/*!*********************************************************************************************!*\
  !*** D:/360MoveData/Users/Administrator/Desktop/郎小宝/pages/huaban/whiteboard/whiteboard.vue ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _whiteboard_vue_vue_type_template_id_25319254___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./whiteboard.vue?vue&type=template&id=25319254& */ 784);
/* harmony import */ var _whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./whiteboard.vue?vue&type=script&lang=js& */ 786);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _whiteboard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./whiteboard.vue?vue&type=style&index=0&lang=scss& */ 789);
/* harmony import */ var _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _whiteboard_vue_vue_type_template_id_25319254___WEBPACK_IMPORTED_MODULE_0__["render"],
  _whiteboard_vue_vue_type_template_id_25319254___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _whiteboard_vue_vue_type_template_id_25319254___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/huaban/whiteboard/whiteboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 784:
/*!****************************************************************************************************************************!*\
  !*** D:/360MoveData/Users/Administrator/Desktop/郎小宝/pages/huaban/whiteboard/whiteboard.vue?vue&type=template&id=25319254& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_template_id_25319254___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./whiteboard.vue?vue&type=template&id=25319254& */ 785);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_template_id_25319254___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_template_id_25319254___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_template_id_25319254___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_template_id_25319254___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 785:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/360MoveData/Users/Administrator/Desktop/郎小宝/pages/huaban/whiteboard/whiteboard.vue?vue&type=template&id=25319254& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 786:
/*!**********************************************************************************************************************!*\
  !*** D:/360MoveData/Users/Administrator/Desktop/郎小宝/pages/huaban/whiteboard/whiteboard.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./whiteboard.vue?vue&type=script&lang=js& */ 787);
/* harmony import */ var _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 787:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/360MoveData/Users/Administrator/Desktop/郎小宝/pages/huaban/whiteboard/whiteboard.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _util = __webpack_require__(/*! ../../../common/util/util.js */ 788);
var Navbar = function Navbar() {
  __webpack_require__.e(/*! require.ensure | components/navbar/navbar */ "components/navbar/navbar").then((function () {
    return resolve(__webpack_require__(/*! ../../../components/navbar/navbar.vue */ 1041));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var Toolbar = function Toolbar() {
  __webpack_require__.e(/*! require.ensure | components/toolbar/toolbar */ "components/toolbar/toolbar").then((function () {
    return resolve(__webpack_require__(/*! ../../../components/toolbar/toolbar.vue */ 1048));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var ColorPanel = function ColorPanel() {
  __webpack_require__.e(/*! require.ensure | components/colorPanel/color-panel */ "components/colorPanel/color-panel").then((function () {
    return resolve(__webpack_require__(/*! ../../../components/colorPanel/color-panel.vue */ 1055));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    Navbar: Navbar,
    Toolbar: Toolbar,
    ColorPanel: ColorPanel
  },
  onShareAppMessage: function onShareAppMessage(res) {
    return {
      title: '你绝对看不出我画的是什么？',
      path: '/pages/index/index'
    };
  },
  data: function data() {
    return {
      colorPanelShow: false,
      drawInfos: [],
      curDrawArr: [],
      startX: 0,
      startY: 0,
      drawContext: {},
      currentColor: '#091A22',
      begin: false,
      bgColor: 'white',
      toolArr: [{
        title: '清空',
        icon: '../../../static/png/tool_clear.png',
        selectIcon: '../../../static/png/tool_clear_s.png',
        select: false,
        url: 'clear'
      }, {
        title: '橡皮',
        icon: '../../../static/png/tool_eraser.png',
        selectIcon: '../../../static/png/tool_eraser_s.png',
        select: false,
        url: 'eraser'
      }, {
        title: '画笔',
        icon: '../../../static/png/tool_pen.png',
        selectIcon: '../../../static/png/tool_pen_s.png',
        select: true,
        url: 'pen'
      }, {
        title: '颜色',
        icon: '../../../static/png/tool_color.png',
        selectIcon: '../../../static/png/tool_color_s.png',
        select: false,
        url: 'color'
      }, {
        title: '保存',
        icon: '../../../static/png/tool_download.png',
        selectIcon: '../../../static/png/tool_download_s.png',
        select: false,
        url: 'save'
      }, {
        title: '矩形',
        icon: '../../../static/png/tool_rect.png',
        selectIcon: '../../../static/png/tool_rect_s.png',
        select: false,
        url: 'hollowRect'
      }, {
        title: '圆形',
        icon: '../../../static/png/tool_circle.png',
        selectIcon: '../../../static/png/tool_circle_s.png',
        select: false,
        url: 'hollowCircle'
      }, {
        title: '矩形',
        icon: '../../../static/png/tool_rect_solid.png',
        selectIcon: '../../../static/png/tool_rect_solid_s.png',
        select: false,
        url: 'rect'
      }, {
        title: '圆形',
        icon: '../../../static/png/tool_circle_solid.png',
        selectIcon: '../../../static/png/tool_circle_solid_s.png',
        select: false,
        url: 'circle'
      }, {
        title: '分享',
        icon: '../../../static/png/tool_share.png',
        selectIcon: '../../../static/png/tool_share_s.png',
        select: false,
        url: 'share'
      }],
      lineWidth: 6,
      penMode: true,
      rectMode: false,
      hollowRectMode: false,
      circleMode: false,
      hollowCircleMode: false,
      lastHollowRect: {},
      lastHollowCircle: {}
    };
  },
  mounted: function mounted() {
    this.drawContext = uni.createCanvasContext('drawCanvas');
    this.initBoard();
    // this.fillWelcomeBackground(this.drawContext);
  },

  methods: {
    navbarBtnTapHandler: function navbarBtnTapHandler() {
      uni.navigateBack({
        delta: 1
      });
    },
    colorPickTapHandler: function colorPickTapHandler(obj) {
      (0, _util.customPrint)('我点击的颜色:' + JSON.stringify(obj));
      this.colorPanelShow = false;
      this.toolArr.forEach(function (item) {
        item.select = false;
        if (item.title === '画笔') {
          item.select = true;
        }
      });
      this.rectMode = false;
      this.hollowRectMode = false;
      this.circleMode = false;
      this.hollowCircleMode = false;
      this.penMode = true;
      this.currentColor = obj.color;
      this.drawContext.strokeStyle = obj.color;
    },
    penWidthChangeHandler: function penWidthChangeHandler(width) {
      this.lineWidth = width;
      (0, _util.customPrint)('画笔宽度:' + width);
      this.drawContext.setLineWidth(width);
    },
    toolItemTapHandler: function toolItemTapHandler(index) {
      var that = this;
      var url = this.toolArr[index]['url'];
      switch (url) {
        case 'clear':
          // this.clearDrawBoard();
          console.log(this.drawContext, '清空');
          break;
        case 'eraser':
          this.drawContext.strokeStyle = this.bgColor;
          this.colorPanelShow = false;
          break;
        case 'pen':
          this.drawContext.strokeStyle = this.currentColor;
          this.colorPanelShow = false;
          this.rectMode = false;
          this.hollowRectMode = false;
          this.circleMode = false;
          this.hollowCircleMode = false;
          this.penMode = true;
          break;
        case 'color':
          this.colorPanelShow = !this.colorPanelShow;
          // this.drawMode = this.colorPanelShow ? false : true;
          break;
        case 'save':
          uni.canvasToTempFilePath({
            canvasId: 'drawCanvas',
            success: function success(res) {
              (0, _util.customPrint)('回调参数:' + JSON.stringify(res));
              // 在H5平台下，tempFilePath 为 base64
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function success(res) {
                  (0, _util.customPrint)('成功回调参数:' + JSON.stringify(res));
                  that.$api.msgSuccess('保存成功');
                },
                fail: function fail(res) {
                  (0, _util.customPrint)('失败回调参数:' + JSON.stringify(res));
                  // that.$api.msgSuccess('保存成功');
                }
              });
            }
          });

          break;
        case 'hollowRect':
          this.hollowRectMode = true;
          this.rectMode = false;
          this.circleMode = false;
          this.hollowCircleMode = false;
          this.penMode = false;
          this.colorPanelShow = false;
          this.drawContext.strokeStyle = this.currentColor;
          // this.drawContext.restore();
          break;
        case 'hollowCircle':
          this.hollowRectMode = false;
          this.rectMode = false;
          this.circleMode = false;
          this.hollowCircleMode = true;
          this.penMode = false;
          this.colorPanelShow = false;
          this.drawContext.strokeStyle = this.currentColor;
          break;
        case 'rect':
          this.hollowRectMode = false;
          this.rectMode = true;
          this.circleMode = false;
          this.hollowCircleMode = false;
          this.penMode = false;
          this.colorPanelShow = false;
          this.drawContext.strokeStyle = this.currentColor;
          break;
        case 'circle':
          this.hollowRectMode = false;
          this.rectMode = false;
          this.circleMode = true;
          this.hollowCircleMode = false;
          this.penMode = false;
          this.colorPanelShow = false;
          this.drawContext.strokeStyle = this.currentColor;
          break;
        default:
          break;
      }
      if (url === 'clear' || url === 'save' || url === 'share') {
        return;
      }
      this.toolArr.forEach(function (item, indexPath) {
        item.select = false;
        if (indexPath === index) {
          item.select = true;
        }
      });
    },
    clearDrawBoard: function clearDrawBoard() {
      this.initBoard();
      this.fillBackground(this.drawContext);
    },
    initBoard: function initBoard() {
      this.drawContext.setLineCap('round'); // 让线条圆润
      this.drawContext.strokeStyle = this.currentColor;
      this.drawContext.setLineWidth(this.lineWidth);
    },
    touchStart: function touchStart(e) {
      (0, _util.customPrint)('我能够进行绘制');
      if (this.penMode) {
        this.lineBegin(e.touches[0].x, e.touches[0].y);
      } else if (this.rectMode) {
        this.rectBegin(e.touches[0].x, e.touches[0].y);
      } else if (this.hollowRectMode) {
        this.hollowRectBegin(e.touches[0].x, e.touches[0].y);
      } else if (this.hollowCircleMode) {
        this.hollowCircleBegin(e.touches[0].x, e.touches[0].y);
      } else if (this.circleMode) {
        this.circleBegin(e.touches[0].x, e.touches[0].y);
      }
      this.curDrawArr.push({
        x: e.touches[0].x,
        y: e.touches[0].y
      });
    },
    touchMove: function touchMove(e) {
      if (this.begin) {
        if (this.penMode) {
          this.lineAddPoint(e.touches[0].x, e.touches[0].y);
          this.draw(true);
        } else if (this.rectMode) {
          this.drawRect(e.touches[0].x, e.touches[0].y, true);
        } else if (this.hollowRectMode) {
          this.drawHollowRect(e.touches[0].x, e.touches[0].y, true);
        } else if (this.hollowCircleMode) {
          this.drawHollowCircle(e.touches[0].x, e.touches[0].y, true);
        } else if (this.circleMode) {
          this.drawCircle(e.touches[0].x, e.touches[0].y, true);
        }
        this.curDrawArr.push({
          x: e.touches[0].x,
          y: e.touches[0].y
        });
      }
    },
    touchEnd: function touchEnd(e) {
      // console.log('结束的坐标x:' + e.changedTouches[0].x + '结束的坐标y:' + e.changedTouches[0].y );
      if (this.penMode) {
        this.curDrawArr = [];
        this.lineEnd();
      } else if (this.rectMode) {
        this.drawRect(e.changedTouches[0].x, e.changedTouches[0].y, true);
      } else if (this.hollowRectMode) {
        this.drawHollowRect(e.changedTouches[0].x, e.changedTouches[0].y, true);
      } else if (this.hollowCircleMode) {
        this.drawHollowCircle(e.changedTouches[0].x, e.changedTouches[0].y, true);
      } else if (this.circleMode) {
        this.drawCircle(e.changedTouches[0].x, e.changedTouches[0].y, true);
      }
    },
    hollowRectBegin: function hollowRectBegin(x, y) {
      this.begin = true;
      this.drawContext.beginPath();
      this.startX = x;
      this.startY = y;
    },
    rectBegin: function rectBegin(x, y) {
      this.begin = true;
      this.drawContext.beginPath();
      this.startX = x;
      this.startY = y;
    },
    hollowCircleBegin: function hollowCircleBegin(x, y) {
      this.begin = true;
      this.drawContext.beginPath();
      this.startX = x;
      this.startY = y;
    },
    circleBegin: function circleBegin(x, y) {
      this.begin = true;
      this.drawContext.beginPath();
      this.startX = x;
      this.startY = y;
    },
    /**
     * 这里是画实体矩形
     */
    drawRect: function drawRect(x, y, isReverse) {
      var width = x - this.startX ? x - this.startX : this.startX - x;
      var height = y - this.startY ? y - this.startY : this.startY - y;
      this.drawContext.rect(this.startX, this.startY, width, height);
      this.drawContext.setFillStyle(this.currentColor);
      this.drawContext.fill();
      this.draw(isReverse);
    },
    /**
     * 这里是画空心矩形
     * 方法是根据四个坐标点画
     * 四条线进行连接
     */
    drawHollowRect: function drawHollowRect(x, y, isReverse) {
      var pointLT = {};
      var pointRB = {};
      var pointRT = {};
      var pointLB = {};
      var center = {};
      pointLT.X = this.startX <= x ? this.startX : x;
      pointLT.Y = this.startY <= y ? this.startY : y;
      pointRB.X = this.startX >= x ? this.startX : x;
      pointRB.Y = this.startY >= y ? this.startY : y;
      pointRT.X = pointRB.X;
      pointRT.Y = pointLT.Y;
      pointLB.X = pointLT.X;
      pointLB.Y = pointRB.Y;
      var width = x - this.startX ? x - this.startX : this.startX - x;
      var height = y - this.startY ? y - this.startY : this.startY - y;
      this.drawContext.rect(this.startX, this.startY, width, height);
      this.drawContext.setStrokeStyle(this.currentColor);
      this.drawContext.stroke();
      this.draw(isReverse);
      this.lastHollowRect = {
        x: this.startX,
        y: this.startY,
        width: Math.abs(width),
        height: Math.abs(height),
        pointLT: pointLT
      };
      this.clearLastHollowRect();
    },
    clearLastHollowRect: function clearLastHollowRect() {
      (0, _util.customPrint)('上一个矩形对象:' + JSON.stringify(this.lastHollowRect));
      this.drawContext.clearRect(this.lastHollowRect.pointLT.X + this.lineWidth / 2, this.lastHollowRect.pointLT.Y + this.lineWidth / 2, this.lastHollowRect.width - this.lineWidth, this.lastHollowRect.height - this.lineWidth);
    },
    clearLastHollowCircle: function clearLastHollowCircle(x, y, r, cxt) {
      //(x,y)为要清除的圆的圆心，r为半径，cxt为context
      var stepClear = 1; //别忘记这一步  
      clearArc(x, y, r);
      function clearArc(x, y, radius) {
        var calcWidth = radius - stepClear;
        var calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);
        var posX = x - calcWidth;
        var posY = y - calcHeight;
        var widthX = 2 * calcWidth;
        var heightY = 2 * calcHeight;
        if (stepClear <= radius) {
          cxt.clearRect(posX, posY, widthX, heightY);
          stepClear += 1;
          clearArc(x, y, radius);
        }
      }
    },
    /**
     * 这里是画
     * 实心圆
     */
    drawCircle: function drawCircle(x, y, isReverse) {
      var pointLT = {};
      var pointRB = {};
      var pointRT = {};
      var pointLB = {};
      var center = {};
      pointLT.X = this.startX <= x ? this.startX : x;
      pointLT.Y = this.startY <= y ? this.startY : y;
      pointRB.X = this.startX >= x ? this.startX : x;
      pointRB.Y = this.startY >= y ? this.startY : y;
      pointRT.X = pointRB.X;
      pointRT.Y = pointLT.Y;
      pointLB.X = pointLT.X;
      pointLB.Y = pointRB.Y;
      center.X = (pointRB.X + pointLT.X) / 2;
      center.Y = (pointRB.Y + pointLT.Y) / 2;
      var dx = pointRB.X - pointLT.X;
      var dy = pointRB.Y - pointLT.Y;
      var r = Math.sqrt(dx * dx + dy * dy) / 2;

      // console.log('圆心坐标:' + JSON.stringify(center));
      // console.log('半径:' + JSON.stringify(r));
      this.drawContext.arc(center.X, center.Y, r, 0, 2 * Math.PI);
      this.drawContext.setFillStyle(this.currentColor);
      this.drawContext.fill();
      // this.drawContext.stroke();
      this.draw(isReverse);
    },
    /**
     * 这里是画
     * 空心圆
     */
    drawHollowCircle: function drawHollowCircle(x, y, isReverse) {
      var pointLT = {};
      var pointRB = {};
      var center = {};
      pointLT.X = this.startX <= x ? this.startX : x;
      pointLT.Y = this.startY <= y ? this.startY : y;
      pointRB.X = this.startX >= x ? this.startX : x;
      pointRB.Y = this.startY >= y ? this.startY : y;
      center.X = (pointRB.X + pointLT.X) / 2;
      center.Y = (pointRB.Y + pointLT.Y) / 2;
      var dx = pointRB.X - pointLT.X;
      var dy = pointRB.Y - pointLT.Y;
      var r = Math.sqrt(dx * dx + dy * dy) / 2;

      // console.log('圆心坐标:' + JSON.stringify(center));
      // console.log('半径:' + JSON.stringify(r));
      this.drawContext.arc(center.X, center.Y, r, 0, 2 * Math.PI);
      // this.drawContext.setFillStyle(this.currentColor);
      // this.drawContext.fill();
      this.drawContext.stroke();
      this.drawContext.beginPath();
      this.drawContext.arc(center.X, center.Y, r - this.lineWidth / 2, 0, 2 * Math.PI);
      this.drawContext.setFillStyle(this.bgColor);
      this.drawContext.fill();
      this.draw(isReverse);

      // this.clearLastHollowCircle(center.X, center.Y, r - this.lineWidth / 2, this.drawContext);
    },

    // 开始绘制线条
    lineBegin: function lineBegin(x, y) {
      this.begin = true;
      this.drawContext.beginPath();
      this.startX = x;
      this.startY = y;
      this.drawContext.moveTo(this.startX, this.startY);
      this.lineAddPoint(x, y);
    },
    // 绘制线条中间添加点
    lineAddPoint: function lineAddPoint(x, y) {
      this.drawContext.moveTo(this.startX, this.startY);
      this.drawContext.lineTo(x, y);
      this.drawContext.stroke();
      this.startX = x;
      this.startY = y;
    },
    // 绘制线条结束
    lineEnd: function lineEnd() {
      this.drawContext.closePath();
      this.begin = false;
    },
    // canvas上下文设置背景为白色
    fillBackground: function fillBackground(context) {
      var _this = this;
      var query = uni.createSelectorQuery().in(this);
      query.select('.board').boundingClientRect(function (data) {
        // console.log("得到布局位置信息" + JSON.stringify(data));
        context.setFillStyle(_this.bgColor);
        context.fillRect(0, 0, data.width, data.height); //TODO context的宽和高待定
        context.fill();
        context.draw();
      }).exec();
    },
    // canvas上下文设置背景为白色
    fillWelcomeBackground: function fillWelcomeBackground(context) {
      var _this2 = this;
      var query = uni.createSelectorQuery().in(this);
      query.select('.board').boundingClientRect(function (data) {
        // console.log("得到布局位置信息" + JSON.stringify(data));
        context.setFillStyle(_this2.bgColor);
        context.fillRect(0, 0, data.width, data.height); //TODO context的宽和高待定
        context.fill();
        var pikaqiuW = 318;
        var pikaqiuH = 288;
        var pikaqiuX = (data.width - 318) / 2;
        var pikaqiuY = 80;
        context.drawImage('../../../static/png/pikaqiu.png', pikaqiuX, pikaqiuY, 318, 288);

        // context.setFillStyle('#ff875d');
        // context.setFontSize(25);
        // context.setTextAlign('center');
        // context.fillText('很高兴见到你，', data.width / 2, 380)

        // context.setFillStyle('#ff875d');
        // context.setFontSize(25);
        // context.setTextAlign('center');
        // context.fillText('点击清空，开始你的创作吧！', data.width / 2, 420)

        // context.setTextAlign('center')
        // context.fillText('textAlign=center', 150, 80)

        // context.setTextAlign('right')
        // context.fillText('开始画画吧！', 150, 100)
        context.draw();
      }).exec();
    },
    // 绘制canvas
    // isReverse: 是否保留之前的像素
    draw: function draw() {
      var isReverse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      this.drawContext.draw(isReverse, function () {
        if (cb && typeof cb == "function") {
          cb();
        }
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 789:
/*!*******************************************************************************************************************************!*\
  !*** D:/360MoveData/Users/Administrator/Desktop/郎小宝/pages/huaban/whiteboard/whiteboard.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./whiteboard.vue?vue&type=style&index=0&lang=scss& */ 790);
/* harmony import */ var _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_whiteboard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 790:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/360MoveData/Users/Administrator/Desktop/郎小宝/pages/huaban/whiteboard/whiteboard.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[782,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/huaban/whiteboard/whiteboard.js.map