(function(modules) {
  var installedModules = {};

	function __webpack_require__(moduleId) {
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
    }

		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
    };

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    module.l = true;

		return module.exports;
  }

	return __webpack_require__(__webpack_require__.s = "./src/other.js");
})
({

  "./src/other.js": (function(module, exports, __webpack_require__) {
    eval(`console.log('other.js');`);
  }),

});