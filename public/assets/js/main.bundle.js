/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./ts/index.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ts/_dev.ts":
/*!********************!*\
  !*** ./ts/_dev.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("if (true) {\n    setTimeout(console.log.bind(console, '%cTHIS SOURCE IS DEVELOPMENT MODE.', 'color: #fff;background-color: #9dbc04;border:6px solid #9dbc04;'));\n}\nelse {}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90cy9fZGV2LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdHMvX2Rldi50cz84OGIzIl0sInNvdXJjZXNDb250ZW50IjpbImlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIHNldFRpbWVvdXQoY29uc29sZS5sb2cuYmluZChjb25zb2xlLCclY1RISVMgU09VUkNFIElTIERFVkVMT1BNRU5UIE1PREUuJywnY29sb3I6ICNmZmY7YmFja2dyb3VuZC1jb2xvcjogIzlkYmMwNDtib3JkZXI6NnB4IHNvbGlkICM5ZGJjMDQ7JykpO1xufSBlbHNlIHtcbiAgICBzZXRUaW1lb3V0KGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwnJWNDcmVhdGVkIEJ5IGh0dHBzOi8vYmFxZW1vbm8uanAnLCdjb2xvcjogI2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzYsIDc2LCA3Nik7Ym9yZGVyOjZweCBzb2xpZCByZ2IoNzYsIDc2LCA3Nik7JykpO1xufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQUEsT0FFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./ts/_dev.ts\n");

/***/ }),

/***/ "./ts/app/base/BaseApp.ts":
/*!********************************!*\
  !*** ./ts/app/base/BaseApp.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst VcRouter_1 = __webpack_require__(/*! ../routers/VcRouter */ \"./ts/app/routers/VcRouter.ts\");\nconst BaseControllerManager_1 = __webpack_require__(/*! ./BaseControllerManager */ \"./ts/app/base/BaseControllerManager.ts\");\nconst Schedule_1 = __webpack_require__(/*! ../../utility/Schedule */ \"./ts/utility/Schedule.ts\");\nclass BaseApp {\n    constructor(FxRouter, VcRouter, useAjax) {\n        this.FxRouter = FxRouter;\n        this.VcRouter = VcRouter;\n        this.useAjax = useAjax;\n        /**\n         *\n         * @type {BaseControllerManager}\n         * @public\n         */\n        this.controllerManager = new BaseControllerManager_1.default(VcRouter);\n        /**\n         * @type {Object}\n         * @public\n         */\n        this._fx = FxRouter;\n        /**\n         *\n         * @type {boolean}\n         * @public\n         */\n        this.useAjax = useAjax;\n    }\n    boot() {\n        // old safeBoot\n        const schedule = new Schedule_1.default();\n        schedule.add(this._fx['none --> none'](null, null, null, null, this.controllerManager));\n        schedule.done(() => {\n            // this.controllerManager.use('current').viewDidAppear();\n        });\n    }\n    baseBoot() {\n        // not use Router\n        let viewController = new BaseControllerManager_1.default(VcRouter_1.default).getController(document.querySelector('.page-content').getAttribute('id'));\n        window.addEventListener('DOMContentLoaded', () => {\n            viewController.viewWillLoad();\n            setTimeout(() => {\n                viewController.viewDidLoad();\n            }, 500);\n        }, false);\n        window.addEventListener('load', () => {\n            viewController.viewWillAppear();\n            setTimeout(() => {\n                viewController.viewDidAppear();\n            }, 500);\n        }, false);\n    }\n}\nexports.default = BaseApp;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90cy9hcHAvYmFzZS9CYXNlQXBwLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdHMvYXBwL2Jhc2UvQmFzZUFwcC50cz85ZjkwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWY1JvdXRlciBmcm9tICcuLi9yb3V0ZXJzL1ZjUm91dGVyJztcbmltcG9ydCBCYXNlQ29udHJvbGxlck1hbmFnZXIgZnJvbSAnLi9CYXNlQ29udHJvbGxlck1hbmFnZXInO1xuXG5pbXBvcnQgU2NoZWR1bGUgZnJvbSAnLi4vLi4vdXRpbGl0eS9TY2hlZHVsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VBcHAge1xuICAgIFxuICAgIHB1YmxpYyBjb250cm9sbGVyTWFuYWdlcjogYW55O1xuXG4gICAgcHVibGljIF9meDogYW55O1xuXG4gICAgcHVibGljIHNlbmRBbmFseXRpY3M6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBGeFJvdXRlcjogYW55LCBwdWJsaWMgVmNSb3V0ZXI6IGFueSwgcHVibGljIHVzZUFqYXg6IGJvb2xlYW4pIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Jhc2VDb250cm9sbGVyTWFuYWdlcn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb250cm9sbGVyTWFuYWdlciA9IG5ldyBCYXNlQ29udHJvbGxlck1hbmFnZXIoVmNSb3V0ZXIpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9meCA9IEZ4Um91dGVyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy51c2VBamF4ID0gdXNlQWpheDtcblxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgYm9vdCgpIHtcblxuICAgICAgICAvLyBvbGQgc2FmZUJvb3RcbiAgICAgICAgY29uc3Qgc2NoZWR1bGUgPSBuZXcgU2NoZWR1bGUoKTtcblxuICAgICAgICBzY2hlZHVsZS5hZGQodGhpcy5fZnhbJ25vbmUgLS0+IG5vbmUnXShudWxsLCBudWxsLCBudWxsLCBudWxsLCB0aGlzLmNvbnRyb2xsZXJNYW5hZ2VyKSk7XG5cbiAgICAgICAgc2NoZWR1bGUuZG9uZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLmNvbnRyb2xsZXJNYW5hZ2VyLnVzZSgnY3VycmVudCcpLnZpZXdEaWRBcHBlYXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgYmFzZUJvb3QoKSB7XG5cbiAgICAgICAgLy8gbm90IHVzZSBSb3V0ZXJcblxuICAgICAgICBsZXQgdmlld0NvbnRyb2xsZXIgPSBuZXcgQmFzZUNvbnRyb2xsZXJNYW5hZ2VyKFZjUm91dGVyKS5nZXRDb250cm9sbGVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWNvbnRlbnQnKS5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgICAgICBcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZpZXdDb250cm9sbGVyLnZpZXdXaWxsTG9hZCgpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRyb2xsZXIudmlld0RpZExvYWQoKTtcbiAgICAgICAgICAgIH0sIDUwMCApO1xuXG4gICAgICAgIH0sIGZhbHNlICk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZpZXdDb250cm9sbGVyLnZpZXdXaWxsQXBwZWFyKCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udHJvbGxlci52aWV3RGlkQXBwZWFyKCk7XG4gICAgICAgICAgICB9LCA1MDAgKTtcblxuICAgICAgICB9LCBmYWxzZSApO1xuXG4gICAgfVxuXG59Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFFQTs7OztBQUlBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUF6RUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./ts/app/base/BaseApp.ts\n");

/***/ }),

/***/ "./ts/app/base/BaseControllerManager.ts":
/*!**********************************************!*\
  !*** ./ts/app/base/BaseControllerManager.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass BaseControllerManager {\n    constructor(ViewControllers) {\n        /**\n         *\n         * @type {Array}\n         * @private\n         */\n        this._VC = ViewControllers;\n        /**\n         *\n         * @type {Array}\n         * @private\n         */\n        this._controllers = [];\n    }\n    /**\n     *\n     * @param ID\n     * @param content\n     */\n    add(ID = null, content) {\n        if (typeof ID === 'string' && ID === 'null') {\n            ID = null;\n        }\n        this._controllers.unshift(this.getController(ID, content));\n    }\n    pop() {\n        this._controllers.pop();\n    }\n    shift() {\n        this._controllers.shift();\n    }\n    /**\n     *\n     * @param type\n     * @returns {*}\n     */\n    use(type) {\n        if ('prev' === type) {\n            return this._controllers[1];\n        }\n        if ('current' === type) {\n            return this._controllers[0];\n        }\n        return false;\n    }\n    /**\n     *\n     * @param ID\n     * @param content\n     */\n    getController(ID = null, content = null) {\n        let controller = null;\n        // if (ID !== null && (this._VC[ID] !== null && this._VC[ID] !== undefined)) {\n        //     controller = new this._VC[ID](content);\n        // } else if (content !== null && this.isSet(this._VC[content.attr('data-use-controller')])) {\n        //     controller = new this._VC[content.attr('data-use-controller')](content);\n        // } else if (content !== null && this.isSet(this._VC[content.attr('id')])) {\n        //     controller = new this._VC[content.attr('id')](content);\n        // } else {\n        //     controller = new this._VC['default'](content);\n        // }\n        if (ID !== null && (this._VC[ID] !== null && this._VC[ID] !== undefined)) {\n            controller = new this._VC[ID](content);\n        }\n        else if (content !== null && this._VC[content.attr('data-use-controller')]) {\n            controller = new this._VC[content.attr('data-use-controller')](content);\n        }\n        else if (content !== null && this._VC[content.attr('id')]) {\n            controller = new this._VC[content.attr('id')](content);\n        }\n        else {\n            controller = new this._VC['default'](content);\n        }\n        return controller;\n    }\n}\nexports.default = BaseControllerManager;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90cy9hcHAvYmFzZS9CYXNlQ29udHJvbGxlck1hbmFnZXIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90cy9hcHAvYmFzZS9CYXNlQ29udHJvbGxlck1hbmFnZXIudHM/MTEwMyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlQ29udHJvbGxlck1hbmFnZXIge1xuXG4gICAgcHVibGljIF9WQzogYW55O1xuXG4gICAgcHJpdmF0ZSBfY29udHJvbGxlcnM6IGFueVtdO1xuXG4gICAgY29uc3RydWN0b3IoVmlld0NvbnRyb2xsZXJzKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX1ZDID0gVmlld0NvbnRyb2xsZXJzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9jb250cm9sbGVycyA9IFtdO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gSURcbiAgICAgKiBAcGFyYW0gY29udGVudFxuICAgICAqL1xuICAgIHB1YmxpYyBhZGQoSUQgPSBudWxsLCBjb250ZW50KSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBJRCA9PT0gJ3N0cmluZycgJiYgSUQgPT09ICdudWxsJykge1xuICAgICAgICAgICAgSUQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29udHJvbGxlcnMudW5zaGlmdCh0aGlzLmdldENvbnRyb2xsZXIoSUQsIGNvbnRlbnQpKTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBwb3AoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xsZXJzLnBvcCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaGlmdCgpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbGxlcnMuc2hpZnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgcHVibGljIHVzZSh0eXBlKSB7XG5cbiAgICAgICAgaWYgKCdwcmV2JyA9PT0gdHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xsZXJzWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdjdXJyZW50JyA9PT0gdHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xsZXJzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIElEXG4gICAgICogQHBhcmFtIGNvbnRlbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q29udHJvbGxlcihJRCA9IG51bGwsIGNvbnRlbnQgPSBudWxsKSB7XG5cbiAgICAgICAgbGV0IGNvbnRyb2xsZXIgPSBudWxsO1xuXG4gICAgICAgIC8vIGlmIChJRCAhPT0gbnVsbCAmJiAodGhpcy5fVkNbSURdICE9PSBudWxsICYmIHRoaXMuX1ZDW0lEXSAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAvLyAgICAgY29udHJvbGxlciA9IG5ldyB0aGlzLl9WQ1tJRF0oY29udGVudCk7XG4gICAgICAgIC8vIH0gZWxzZSBpZiAoY29udGVudCAhPT0gbnVsbCAmJiB0aGlzLmlzU2V0KHRoaXMuX1ZDW2NvbnRlbnQuYXR0cignZGF0YS11c2UtY29udHJvbGxlcicpXSkpIHtcbiAgICAgICAgLy8gICAgIGNvbnRyb2xsZXIgPSBuZXcgdGhpcy5fVkNbY29udGVudC5hdHRyKCdkYXRhLXVzZS1jb250cm9sbGVyJyldKGNvbnRlbnQpO1xuICAgICAgICAvLyB9IGVsc2UgaWYgKGNvbnRlbnQgIT09IG51bGwgJiYgdGhpcy5pc1NldCh0aGlzLl9WQ1tjb250ZW50LmF0dHIoJ2lkJyldKSkge1xuICAgICAgICAvLyAgICAgY29udHJvbGxlciA9IG5ldyB0aGlzLl9WQ1tjb250ZW50LmF0dHIoJ2lkJyldKGNvbnRlbnQpO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgY29udHJvbGxlciA9IG5ldyB0aGlzLl9WQ1snZGVmYXVsdCddKGNvbnRlbnQpO1xuICAgICAgICAvLyB9XG4gICAgICAgIGlmIChJRCAhPT0gbnVsbCAmJiAodGhpcy5fVkNbSURdICE9PSBudWxsICYmIHRoaXMuX1ZDW0lEXSAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgY29udHJvbGxlciA9IG5ldyB0aGlzLl9WQ1tJRF0oY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGVudCAhPT0gbnVsbCAmJiB0aGlzLl9WQ1tjb250ZW50LmF0dHIoJ2RhdGEtdXNlLWNvbnRyb2xsZXInKV0pIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgPSBuZXcgdGhpcy5fVkNbY29udGVudC5hdHRyKCdkYXRhLXVzZS1jb250cm9sbGVyJyldKGNvbnRlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQgIT09IG51bGwgJiYgdGhpcy5fVkNbY29udGVudC5hdHRyKCdpZCcpXSkge1xuICAgICAgICAgICAgY29udHJvbGxlciA9IG5ldyB0aGlzLl9WQ1tjb250ZW50LmF0dHIoJ2lkJyldKGNvbnRlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udHJvbGxlciA9IG5ldyB0aGlzLl9WQ1snZGVmYXVsdCddKGNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgfVxuXG59Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBTUE7QUFFQTs7OztBQUlBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFFQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFoR0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./ts/app/base/BaseControllerManager.ts\n");

/***/ }),

/***/ "./ts/app/controllers/TopViewController.ts":
/*!*************************************************!*\
  !*** ./ts/app/controllers/TopViewController.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ViewController_1 = __webpack_require__(/*! ./ViewController */ \"./ts/app/controllers/ViewController.ts\");\nclass TopViewController extends ViewController_1.default {\n    constructor(content) {\n        super(content);\n        this.stage = null;\n    }\n    viewWillLoad() {\n        super.viewWillLoad();\n        // @ts-ignore\n        this.stage = new window.Stage();\n        this.stage.setup();\n        this.stage.render();\n    }\n    viewDidLoad() {\n        super.viewDidLoad();\n    }\n    viewWillAppear() {\n        super.viewWillAppear();\n    }\n    viewDidAppear() {\n        super.viewDidAppear();\n    }\n    viewWillDisappear() {\n        super.viewWillDisappear();\n    }\n    viewDidDisappear() {\n        super.viewDidDisappear();\n    }\n    resize() {\n        super.resize();\n    }\n}\nexports.default = TopViewController;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90cy9hcHAvY29udHJvbGxlcnMvVG9wVmlld0NvbnRyb2xsZXIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90cy9hcHAvY29udHJvbGxlcnMvVG9wVmlld0NvbnRyb2xsZXIudHM/MTFiMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0NvbnRyb2xsZXIgZnJvbSAnLi9WaWV3Q29udHJvbGxlcic7XG5cbmltcG9ydCB7IFR3ZWVuTGl0ZSB9IGZyb20gJ2dzYXAnO1xuaW1wb3J0IFV0aWxpdHkgZnJvbSAnLi4vLi4vdXRpbGl0eS9VdGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlld0NvbnRyb2xsZXIgZXh0ZW5kcyBWaWV3Q29udHJvbGxlciB7XG5cbiAgICBwdWJsaWMgc3RhZ2U6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQpIHtcblxuICAgICAgICBzdXBlcihjb250ZW50KTtcblxuICAgICAgICB0aGlzLnN0YWdlID0gbnVsbDtcblxuICAgIH1cblxuICAgIHZpZXdXaWxsTG9hZCgpIHtcblxuICAgICAgICBzdXBlci52aWV3V2lsbExvYWQoKTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgd2luZG93LlN0YWdlKCk7XG4gICAgICAgIHRoaXMuc3RhZ2Uuc2V0dXAoKTtcbiAgICAgICAgdGhpcy5zdGFnZS5yZW5kZXIoKTtcblxuICAgIH1cblxuICAgIHZpZXdEaWRMb2FkKCkge1xuXG4gICAgICAgIHN1cGVyLnZpZXdEaWRMb2FkKCk7XG5cbiAgICB9XG5cbiAgICB2aWV3V2lsbEFwcGVhcigpIHtcblxuICAgICAgICBzdXBlci52aWV3V2lsbEFwcGVhcigpO1xuXG4gICAgfVxuXG4gICAgdmlld0RpZEFwcGVhcigpIHtcblxuICAgICAgICBzdXBlci52aWV3RGlkQXBwZWFyKCk7XG5cbiAgICB9XG5cbiAgICB2aWV3V2lsbERpc2FwcGVhcigpIHtcblxuICAgICAgICBzdXBlci52aWV3V2lsbERpc2FwcGVhcigpO1xuXG4gICAgfVxuXG4gICAgdmlld0RpZERpc2FwcGVhcigpIHtcblxuICAgICAgICBzdXBlci52aWV3RGlkRGlzYXBwZWFyKCk7XG5cbiAgICB9XG5cbiAgICByZXNpemUoKSB7XG5cbiAgICAgICAgc3VwZXIucmVzaXplKCk7XG5cbiAgICB9XG5cbiAgICAvLyBzY3JvbGwoc3QpIHtcbiAgICAvLyAgICAgc3VwZXIuc2Nyb2xsKCk7XG4gICAgLy8gfVxuXG59Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBS0E7QUFJQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBTUE7QUEvREE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./ts/app/controllers/TopViewController.ts\n");

/***/ }),

/***/ "./ts/app/controllers/ViewController.ts":
/*!**********************************************!*\
  !*** ./ts/app/controllers/ViewController.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass ViewController {\n    constructor(content) {\n        this.SWITCH_WIDTH = 768;\n        this.window_inner_width = window.innerWidth;\n        this.window_inner_height = window.innerHeight;\n    }\n    viewWillLoad() { }\n    viewDidLoad() { }\n    viewWillAppear() { }\n    viewDidAppear() { }\n    viewWillDisappear() { }\n    viewDidDisappear() { }\n    resize() {\n        this.window_inner_width = window.innerWidth;\n        this.window_inner_height = window.innerHeight;\n    }\n}\nexports.default = ViewController;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90cy9hcHAvY29udHJvbGxlcnMvVmlld0NvbnRyb2xsZXIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90cy9hcHAvY29udHJvbGxlcnMvVmlld0NvbnRyb2xsZXIudHM/MzA5OSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29udHJvbGxlciB7XG5cbiAgICBwdWJsaWMgU1dJVENIX1dJRFRIOiBudW1iZXI7XG4gICAgcHVibGljIHdpbmRvd19pbm5lcl93aWR0aDogbnVtYmVyO1xuICAgIHB1YmxpYyB3aW5kb3dfaW5uZXJfaGVpZ2h0OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50KSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLlNXSVRDSF9XSURUSCA9IDc2ODtcbiAgICAgICAgdGhpcy53aW5kb3dfaW5uZXJfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy53aW5kb3dfaW5uZXJfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgfVxuXG4gICAgdmlld1dpbGxMb2FkKCkge31cblxuICAgIHZpZXdEaWRMb2FkKCkge31cblxuICAgIHZpZXdXaWxsQXBwZWFyKCkge31cblxuICAgIHZpZXdEaWRBcHBlYXIoKSB7fVxuXG4gICAgdmlld1dpbGxEaXNhcHBlYXIoKSB7fVxuXG4gICAgdmlld0RpZERpc2FwcGVhcigpIHt9XG5cbiAgICByZXNpemUoKSB7XG5cbiAgICAgICAgdGhpcy53aW5kb3dfaW5uZXJfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy53aW5kb3dfaW5uZXJfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgfVxuXG4gICAgLy8gc2Nyb2xsKHN0KSB7XG4gICAgLy8gICAgIC8vIHRoaXMudUlIZWFkZXIuc2Nyb2xsKHN0KTtcbiAgICAvLyB9XG5cbn0iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFNQTtBQXJDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./ts/app/controllers/ViewController.ts\n");

/***/ }),

/***/ "./ts/app/routers/VcRouter.ts":
/*!************************************!*\
  !*** ./ts/app/routers/VcRouter.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ViewController_1 = __webpack_require__(/*! ../controllers/ViewController */ \"./ts/app/controllers/ViewController.ts\");\nconst TopViewController_1 = __webpack_require__(/*! ../controllers/TopViewController */ \"./ts/app/controllers/TopViewController.ts\");\nexports.default = {\n    'default': ViewController_1.default,\n    'top': TopViewController_1.default,\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90cy9hcHAvcm91dGVycy9WY1JvdXRlci50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3RzL2FwcC9yb3V0ZXJzL1ZjUm91dGVyLnRzP2MzZDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL1ZpZXdDb250cm9sbGVyJztcbmltcG9ydCBUb3BWaWV3Q29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGxlcnMvVG9wVmlld0NvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgICdkZWZhdWx0JzogVmlld0NvbnRyb2xsZXIsXG4gICAgJ3RvcCc6IFRvcFZpZXdDb250cm9sbGVyLFxufTsiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./ts/app/routers/VcRouter.ts\n");

/***/ }),

/***/ "./ts/index.ts":
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// import App from './app/App';\n// import FxRouter from './app/routers/FxRouter';\n// import VcRouter from './app/routers/VcRouter';\nconst BaseApp_1 = __webpack_require__(/*! ./app/base/BaseApp */ \"./ts/app/base/BaseApp.ts\");\nconst UserAgent_1 = __webpack_require__(/*! ./utility/UserAgent */ \"./ts/utility/UserAgent.ts\");\n// @ts-ignore\n// require('waypoints/lib/noframework.waypoints.min.js');\n// @ts-ignore\n__webpack_require__(/*! ./_dev */ \"./ts/_dev.ts\");\nwindow.ua = new UserAgent_1.default();\nwindow.uaName = window.ua.getBrowser();\nwindow.MOBILE = window.ua.mobile;\nwindow.TABLET = window.ua.tablet;\nwindow.OTHER = !window.MOBILE && !window.TABLET;\nwindow.IE = window.uaName.match(/ie/);\nwindow.WHEEL_RATIO = 'firefox' === window.uaName ? 100 : 1;\nwindow.page_initialized = false;\n/**\n *\n * @type {APP}\n * @public\n */\n// window.APP = new App(FxRouter, VcRouter, false);\n// // @ts-ignore\n// window.APP.debug = process.env.NODE_ENV === 'development';\n// window.APP.boot();\nwindow.APP = new BaseApp_1.default(null, null, false);\nwindow.APP.baseBoot();\n/**\n *\n * @type {resize}\n * @public\n */\nconst INIT_WIDTH = window.innerWidth;\nwindow.addEventListener('resize', () => {\n    if (INIT_WIDTH > 768) {\n        if (window.innerWidth <= 768) {\n            location.reload();\n        }\n    }\n    else {\n        if (window.innerWidth > 768) {\n            location.reload();\n        }\n    }\n}, false);\n/**\n *\n * @type {Waypoint}\n * @public\n */\n// window.WAYPOINT =[];\n// let triger_fix = document.querySelectorAll<HTMLElement>('.js-waypoint__fix');\n// for (let i = 0; i < triger_fix.length; i++) {\n//     let waypoint = new Waypoint({\n//         element: triger_fix[i],\n//         handler: function(direction) {\n//             this.element.classList.add('is-start');\n//             setTimeout(() => {\n//                 this.element.classList.add('is-end');\n//             }, 750);\n//         },\n//         offset: '75%'\n//     });\n//     window.WAYPOINT.push(waypoint);\n// }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90cy9pbmRleC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3RzL2luZGV4LnRzPzE0ZjUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IEFwcCBmcm9tICcuL2FwcC9BcHAnO1xuLy8gaW1wb3J0IEZ4Um91dGVyIGZyb20gJy4vYXBwL3JvdXRlcnMvRnhSb3V0ZXInO1xuLy8gaW1wb3J0IFZjUm91dGVyIGZyb20gJy4vYXBwL3JvdXRlcnMvVmNSb3V0ZXInO1xuaW1wb3J0IEJhc2VBcHAgZnJvbSAnLi9hcHAvYmFzZS9CYXNlQXBwJztcblxuaW1wb3J0IFV0aWxpdHkgZnJvbSAnLi91dGlsaXR5L1V0aWxpdHknO1xuaW1wb3J0IFVzZXJBZ2VudCBmcm9tICcuL3V0aWxpdHkvVXNlckFnZW50JztcblxuLy8gQHRzLWlnbm9yZVxuLy8gcmVxdWlyZSgnd2F5cG9pbnRzL2xpYi9ub2ZyYW1ld29yay53YXlwb2ludHMubWluLmpzJyk7XG5cbi8vIEB0cy1pZ25vcmVcbnJlcXVpcmUoJy4vX2RldicpO1xuXG5cbi8qKlxuICpcbiAqIEB0eXBlIHtHbG9iYWxWYXJpYWJsZX1cbiAqIEBwdWJsaWNcbiAqL1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgXG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG5cbiAgICAgICAgdWE6IGFueTtcbiAgICAgICAgdWFOYW1lOiBhbnk7XG4gICAgICAgIE1PQklMRTogYm9vbGVhbjtcbiAgICAgICAgVEFCTEVUOiBib29sZWFuO1xuICAgICAgICBPVEhFUjogYm9vbGVhbjtcbiAgICAgICAgSUU6IGJvb2xlYW47XG5cbiAgICAgICAgV0hFRUxfUkFUSU86IGFueTtcbiAgICAgICAgcGFnZV9pbml0aWFsaXplZDogYm9vbGVhbjtcblxuICAgICAgICBBUFA6IGFueTtcblxuICAgICAgICBXQVlQT0lOVDogYW55W107XG5cbiAgICB9XG59XG5cbndpbmRvdy51YSA9IG5ldyBVc2VyQWdlbnQoKTtcbndpbmRvdy51YU5hbWUgPSB3aW5kb3cudWEuZ2V0QnJvd3NlcigpO1xud2luZG93Lk1PQklMRSA9IHdpbmRvdy51YS5tb2JpbGU7XG53aW5kb3cuVEFCTEVUID0gd2luZG93LnVhLnRhYmxldDtcbndpbmRvdy5PVEhFUiA9ICF3aW5kb3cuTU9CSUxFICYmICF3aW5kb3cuVEFCTEVUO1xud2luZG93LklFID0gd2luZG93LnVhTmFtZS5tYXRjaCgvaWUvKTtcbndpbmRvdy5XSEVFTF9SQVRJTyA9ICdmaXJlZm94JyA9PT0gd2luZG93LnVhTmFtZSA/IDEwMCA6IDE7XG53aW5kb3cucGFnZV9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG5cbi8qKlxuICpcbiAqIEB0eXBlIHtBUFB9XG4gKiBAcHVibGljXG4gKi9cblxuLy8gd2luZG93LkFQUCA9IG5ldyBBcHAoRnhSb3V0ZXIsIFZjUm91dGVyLCBmYWxzZSk7XG4vLyAvLyBAdHMtaWdub3JlXG4vLyB3aW5kb3cuQVBQLmRlYnVnID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG4vLyB3aW5kb3cuQVBQLmJvb3QoKTtcblxud2luZG93LkFQUCA9IG5ldyBCYXNlQXBwKG51bGwsIG51bGwsIGZhbHNlKTtcbndpbmRvdy5BUFAuYmFzZUJvb3QoKTtcblxuXG4vKipcbiAqXG4gKiBAdHlwZSB7cmVzaXplfVxuICogQHB1YmxpY1xuICovXG5jb25zdCBJTklUX1dJRFRIOiBudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICBpZihJTklUX1dJRFRIID4gNzY4KSB7XG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjgpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0sIGZhbHNlKTtcblxuXG4vKipcbiAqXG4gKiBAdHlwZSB7V2F5cG9pbnR9XG4gKiBAcHVibGljXG4gKi9cbi8vIHdpbmRvdy5XQVlQT0lOVCA9W107XG5cbi8vIGxldCB0cmlnZXJfZml4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oJy5qcy13YXlwb2ludF9fZml4Jyk7XG4vLyBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWdlcl9maXgubGVuZ3RoOyBpKyspIHtcblxuLy8gICAgIGxldCB3YXlwb2ludCA9IG5ldyBXYXlwb2ludCh7XG4vLyAgICAgICAgIGVsZW1lbnQ6IHRyaWdlcl9maXhbaV0sXG4vLyAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuXG4vLyAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtc3RhcnQnKTtcblxuLy8gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWVuZCcpO1xuLy8gICAgICAgICAgICAgfSwgNzUwKTtcblxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBvZmZzZXQ6ICc3NSUnXG4vLyAgICAgfSk7XG5cbi8vICAgICB3aW5kb3cuV0FZUE9JTlQucHVzaCh3YXlwb2ludCk7XG5cbi8vIH0iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBOEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7OztBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7Ozs7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./ts/index.ts\n");

/***/ }),

/***/ "./ts/utility/Schedule.ts":
/*!********************************!*\
  !*** ./ts/utility/Schedule.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Promise = __webpack_require__(/*! es6-promise */ \"../node_modules/es6-promise/dist/es6-promise.js\").Promise;\nclass Schedule {\n    constructor() {\n        /**\n         *\n         * @type {Array}\n         * @private\n         */\n        this._list = [];\n        /**\n         *\n         * @type {Array}\n         * @private\n         */\n        this._promiseList = [];\n    }\n    static wait(time) {\n        return new Promise(resolve => {\n            setTimeout(function () {\n                resolve();\n            }, time);\n        });\n    }\n    /**\n     *\n     * @param task {function}\n     */\n    add(task = resolve => { }) {\n        this._list.push(() => {\n            let promise = new Promise(resolve => {\n                task(resolve);\n            });\n            this._promiseList.push(promise);\n            return promise;\n        });\n    }\n    /**\n     *\n     * @param callback {function}\n     */\n    done(callback = () => { }) {\n        this._list.reduce((prev, current) => {\n            return prev.then(current);\n        }, Promise.resolve()).then(() => {\n            Promise.all(this._promiseList).then(callback);\n        });\n    }\n}\nexports.default = Schedule;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90cy91dGlsaXR5L1NjaGVkdWxlLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdHMvdXRpbGl0eS9TY2hlZHVsZS50cz8wZTdjIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFByb21pc2UgPSByZXF1aXJlKCdlczYtcHJvbWlzZScpLlByb21pc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjaGVkdWxlIHtcblxuICAgIHByaXZhdGUgX2xpc3Q6IGFueVtdO1xuICAgIHByaXZhdGUgX3Byb21pc2VMaXN0OiBhbnlbXTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wcm9taXNlTGlzdCA9IFtdO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHdhaXQodGltZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIHRpbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0YXNrIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkKHRhc2sgPSByZXNvbHZlID0+IHt9KSB7XG4gICAgICAgIHRoaXMuX2xpc3QucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIHRhc2socmVzb2x2ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZUxpc3QucHVzaChwcm9taXNlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sge2Z1bmN0aW9ufVxuICAgICAqL1xuICAgIHB1YmxpYyBkb25lKGNhbGxiYWNrID0gKCkgPT4ge30pIHtcbiAgICAgICAgdGhpcy5fbGlzdC5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2LnRoZW4oY3VycmVudCk7XG4gICAgICAgIH0sIFByb21pc2UucmVzb2x2ZSgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKHRoaXMuX3Byb21pc2VMaXN0KS50aGVuKGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBRUE7QUFLQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBM0RBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./ts/utility/Schedule.ts\n");

/***/ }),

/***/ "./ts/utility/UserAgent.ts":
/*!*********************************!*\
  !*** ./ts/utility/UserAgent.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass UserAgent {\n    constructor() {\n        this.tablet = false;\n        this.mobile = false;\n        this.android = false;\n        this.iphone = false;\n        this._init();\n        this._addDevice();\n    }\n    /**\n     *\n     * @private\n     */\n    _init() {\n        let u = window.navigator.userAgent.toLowerCase();\n        this.tablet = (u.indexOf(\"windows\") !== -1 && u.indexOf(\"touch\") !== -1 && u.indexOf(\"tablet pc\") === -1)\n            || u.indexOf(\"ipad\") !== -1\n            || (u.indexOf(\"android\") !== -1 && u.indexOf(\"mobile\") === -1)\n            || (u.indexOf(\"firefox\") !== -1 && u.indexOf(\"tablet\") !== -1)\n            || u.indexOf(\"kindle\") !== -1\n            || u.indexOf(\"silk\") !== -1\n            || u.indexOf(\"playbook\") !== -1;\n        this.mobile = (u.indexOf(\"windows\") !== -1 && u.indexOf(\"phone\") !== -1)\n            || u.indexOf(\"iphone\") !== -1\n            || u.indexOf(\"ipod\") !== -1\n            || (u.indexOf(\"android\") !== -1 && u.indexOf(\"mobile\") !== -1)\n            || (u.indexOf(\"firefox\") !== -1 && u.indexOf(\"mobile\") !== -1)\n            || u.indexOf(\"blackberry\") !== -1;\n        this.android = (u.indexOf(\"android\") !== -1 && u.indexOf(\"mobile\") !== -1);\n        this.iphone = (u.indexOf(\"iphone\") !== -1) || u.indexOf(\"ipod\") !== -1;\n    }\n    /**\n     *\n     * @private\n     */\n    _addDevice() {\n        let $html = document.querySelector('html');\n        if (this.tablet) {\n            $html.setAttribute('class', 'is-tablet');\n        }\n        else if (this.mobile) {\n            $html.setAttribute('class', 'is-mobile');\n        }\n        else if (this.android) {\n            $html.setAttribute('class', 'is-android');\n        }\n        else if (this.iphone) {\n            $html.setAttribute('class', 'is-iphone');\n        }\n        else {\n            $html.setAttribute('class', 'is-others');\n        }\n    }\n    /**\n     * https://qiita.com/Evolutor_web/items/162bfcf83695c83f1077\n     * @returns {string}\n     */\n    getBrowser() {\n        let ua = window.navigator.userAgent.toLowerCase();\n        let ver = window.navigator.appVersion.toLowerCase();\n        let name = 'unknown';\n        let isIE = null;\n        let ieVersion = null;\n        let userAgent = window.navigator.userAgent.toLowerCase();\n        if (userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/) || userAgent.indexOf(\"edge\") !== -1) {\n            isIE = true;\n            if (userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/)) {\n                ieVersion = userAgent.match(/((msie|MSIE)\\s|rv:)([\\d\\.]+)/)[3];\n                ieVersion = parseInt(ieVersion);\n            }\n            else {\n                ieVersion = 'edge';\n            }\n        }\n        else {\n            isIE = false;\n        }\n        if (isIE) {\n            name = 'ie' + ieVersion;\n        }\n        else {\n            if (ua.indexOf('chrome') !== -1) {\n                name = 'chrome';\n            }\n            else if (ua.indexOf('safari') !== -1) {\n                name = 'safari';\n            }\n            else if (ua.indexOf('opera') !== -1) {\n                name = 'opera';\n            }\n            else if (ua.indexOf('firefox') !== -1) {\n                name = 'firefox';\n            }\n        }\n        return name;\n    }\n    /**\n     * https://qiita.com/Evolutor_web/items/162bfcf83695c83f1077\n     * @param browsers\n     * @returns {boolean}\n     */\n    isSupported(browsers) {\n        let thusBrowser = this.getBrowser();\n        for (let i = 0; i < browsers.length; i++) {\n            if (browsers[i] === thusBrowser) {\n                return true;\n            }\n        }\n        return false;\n    }\n    /**\n     * https://hacknote.jp/archives/6631/\n     * @returns {Number}\n     */\n    androidVersion() {\n        let ua = window.navigator.userAgent.toLowerCase();\n        if (ua.indexOf(\"android\") > 0) {\n            return parseFloat(ua.slice(ua.indexOf(\"android\") + 8));\n        }\n        return null;\n    }\n    isMajor() {\n        return !(window.navigator.userAgent.indexOf(\"DoCoMo\") === -1 && window.navigator.userAgent.indexOf(\"KDDI\") === -1 && window.navigator.userAgent.indexOf(\"Vodafone\") === -1 && window.navigator.userAgent.indexOf(\"SoftBank\") === -1);\n    }\n    /**\n     * https://hacknote.jp/archives/22633/\n     *\n     */\n    iphoneVersion() {\n        let u = window.navigator.userAgent.toLowerCase();\n        let version = u.match(/iphone os ([\\d]+)_([\\d]+)_([\\d]+)/);\n        if (!version) {\n            version = u.match(/iphone os ([\\d]+)_([\\d]+)/);\n        }\n        return version;\n    }\n    /**\n     * https://qiita.com/narikei/items/ada44891cb0902efc165\n     * @returns {boolean}\n     */\n    isAndroidBrowser() {\n        let ua = window.navigator.userAgent.toLowerCase();\n        return /android/.test(ua) && /linux; u;/.test(ua) && !/chrome/.test(ua);\n    }\n    /**\n     *\n     * @param device {String}\n     * @param width {Number}\n     */\n    viewPort(device, width) {\n        if (this[device]) {\n            let viewPort = document.querySelector('meta[name=\"viewport\"]');\n            viewPort.setAttribute('content', 'width=' + width + ',user-scalable=no');\n        }\n    }\n}\nexports.default = UserAgent;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90cy91dGlsaXR5L1VzZXJBZ2VudC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3RzL3V0aWxpdHkvVXNlckFnZW50LnRzPzU1Y2QiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckFnZW50IHtcblxuICAgIHByaXZhdGUgdGFibGV0OiBib29sZWFuO1xuICAgIHByaXZhdGUgbW9iaWxlOiBib29sZWFuO1xuICAgIHByaXZhdGUgYW5kcm9pZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIGlwaG9uZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMudGFibGV0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW9iaWxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYW5kcm9pZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlwaG9uZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgdGhpcy5fYWRkRGV2aWNlKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXQoKSB7XG4gICAgICAgIGxldCB1ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy50YWJsZXQgPSAodS5pbmRleE9mKCBcIndpbmRvd3NcIiApICE9PSAtMSAmJiB1LmluZGV4T2YoIFwidG91Y2hcIiApICE9PSAtMSAmJiB1LmluZGV4T2YoIFwidGFibGV0IHBjXCIgKSA9PT0gLTEpXG4gICAgICAgICAgICB8fCB1LmluZGV4T2YoIFwiaXBhZFwiICkgIT09IC0xXG4gICAgICAgICAgICB8fCAodS5pbmRleE9mKCBcImFuZHJvaWRcIiApICE9PSAtMSAmJiB1LmluZGV4T2YoIFwibW9iaWxlXCIgKSA9PT0gLTEpXG4gICAgICAgICAgICB8fCAodS5pbmRleE9mKCBcImZpcmVmb3hcIiApICE9PSAtMSAmJiB1LmluZGV4T2YoIFwidGFibGV0XCIgKSAhPT0gLTEpXG4gICAgICAgICAgICB8fCB1LmluZGV4T2YoIFwia2luZGxlXCIgKSAhPT0gLTFcbiAgICAgICAgICAgIHx8IHUuaW5kZXhPZiggXCJzaWxrXCIgKSAhPT0gLTFcbiAgICAgICAgICAgIHx8IHUuaW5kZXhPZiggXCJwbGF5Ym9va1wiICkgIT09IC0xO1xuICAgICAgICB0aGlzLm1vYmlsZSA9ICh1LmluZGV4T2YoIFwid2luZG93c1wiICkgIT09IC0xICYmIHUuaW5kZXhPZiggXCJwaG9uZVwiICkgIT09IC0xKVxuICAgICAgICAgICAgfHwgdS5pbmRleE9mKCBcImlwaG9uZVwiICkgIT09IC0xXG4gICAgICAgICAgICB8fCB1LmluZGV4T2YoIFwiaXBvZFwiICkgIT09IC0xXG4gICAgICAgICAgICB8fCAodS5pbmRleE9mKCBcImFuZHJvaWRcIiApICE9PSAtMSAmJiB1LmluZGV4T2YoIFwibW9iaWxlXCIgKSAhPT0gLTEpXG4gICAgICAgICAgICB8fCAodS5pbmRleE9mKCBcImZpcmVmb3hcIiApICE9PSAtMSAmJiB1LmluZGV4T2YoIFwibW9iaWxlXCIgKSAhPT0gLTEpXG4gICAgICAgICAgICB8fCB1LmluZGV4T2YoIFwiYmxhY2tiZXJyeVwiICkgIT09IC0xO1xuICAgICAgICB0aGlzLmFuZHJvaWQgPSAodS5pbmRleE9mKCBcImFuZHJvaWRcIiApICE9PSAtMSAmJiB1LmluZGV4T2YoIFwibW9iaWxlXCIgKSAhPT0gLTEpO1xuICAgICAgICB0aGlzLmlwaG9uZSA9ICh1LmluZGV4T2YoIFwiaXBob25lXCIgKSAhPT0gLTEpIHx8IHUuaW5kZXhPZiggXCJpcG9kXCIgKSAhPT0gLTFcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZERldmljZSgpIHtcbiAgICAgICAgbGV0ICRodG1sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ2h0bWwnICk7XG4gICAgICAgIGlmICggdGhpcy50YWJsZXQgKSB7XG4gICAgICAgICAgICAkaHRtbC5zZXRBdHRyaWJ1dGUoICdjbGFzcycsICdpcy10YWJsZXQnIClcbiAgICAgICAgfSBlbHNlIGlmICggdGhpcy5tb2JpbGUgKSB7XG4gICAgICAgICAgICAkaHRtbC5zZXRBdHRyaWJ1dGUoICdjbGFzcycsICdpcy1tb2JpbGUnIClcbiAgICAgICAgfSBlbHNlIGlmICggdGhpcy5hbmRyb2lkICkge1xuICAgICAgICAgICAgJGh0bWwuc2V0QXR0cmlidXRlKCAnY2xhc3MnLCAnaXMtYW5kcm9pZCcgKVxuICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLmlwaG9uZSApIHtcbiAgICAgICAgICAgICRodG1sLnNldEF0dHJpYnV0ZSggJ2NsYXNzJywgJ2lzLWlwaG9uZScgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGh0bWwuc2V0QXR0cmlidXRlKCAnY2xhc3MnLCAnaXMtb3RoZXJzJyApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBodHRwczovL3FpaXRhLmNvbS9Fdm9sdXRvcl93ZWIvaXRlbXMvMTYyYmZjZjgzNjk1YzgzZjEwNzdcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldEJyb3dzZXIoKSB7XG4gICAgICAgIGxldCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCB2ZXIgPSB3aW5kb3cubmF2aWdhdG9yLmFwcFZlcnNpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IG5hbWUgPSAndW5rbm93bic7XG5cbiAgICAgICAgbGV0IGlzSUUgPSBudWxsO1xuICAgICAgICBsZXQgaWVWZXJzaW9uID0gbnVsbDtcbiAgICAgICAgbGV0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYoIHVzZXJBZ2VudC5tYXRjaCgvKG1zaWV8TVNJRSkvKSB8fCB1c2VyQWdlbnQubWF0Y2goLyhUfHQpcmlkZW50LykgfHwgdXNlckFnZW50LmluZGV4T2YoXCJlZGdlXCIpICE9PSAtMSApIHtcbiAgICAgICAgICAgIGlzSUUgPSB0cnVlO1xuICAgICAgICAgICAgaWYoIHVzZXJBZ2VudC5tYXRjaCgvKG1zaWV8TVNJRSkvKSB8fCB1c2VyQWdlbnQubWF0Y2goLyhUfHQpcmlkZW50LykgKSB7XG4gICAgICAgICAgICAgICAgaWVWZXJzaW9uID0gdXNlckFnZW50Lm1hdGNoKC8oKG1zaWV8TVNJRSlcXHN8cnY6KShbXFxkXFwuXSspLylbM107XG4gICAgICAgICAgICAgICAgaWVWZXJzaW9uID0gcGFyc2VJbnQoaWVWZXJzaW9uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWVWZXJzaW9uID0gJ2VkZ2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNJRSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaXNJRSl7XG4gICAgICAgICAgICBuYW1lID0gJ2llJyArIGllVmVyc2lvblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCB1YS5pbmRleE9mKCAnY2hyb21lJyApICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gJ2Nocm9tZSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB1YS5pbmRleE9mKCAnc2FmYXJpJyApICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gJ3NhZmFyaSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB1YS5pbmRleE9mKCAnb3BlcmEnICkgIT09IC0xICkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSAnb3BlcmEnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggdWEuaW5kZXhPZiggJ2ZpcmVmb3gnICkgIT09IC0xICkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSAnZmlyZWZveCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBodHRwczovL3FpaXRhLmNvbS9Fdm9sdXRvcl93ZWIvaXRlbXMvMTYyYmZjZjgzNjk1YzgzZjEwNzdcbiAgICAgKiBAcGFyYW0gYnJvd3NlcnNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1N1cHBvcnRlZCggYnJvd3NlcnMgKSB7XG4gICAgICAgIGxldCB0aHVzQnJvd3NlciA9IHRoaXMuZ2V0QnJvd3NlcigpO1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBicm93c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmICggYnJvd3NlcnNbIGkgXSA9PT0gdGh1c0Jyb3dzZXIgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGh0dHBzOi8vaGFja25vdGUuanAvYXJjaGl2ZXMvNjYzMS9cbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGFuZHJvaWRWZXJzaW9uKCkge1xuICAgICAgICBsZXQgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIHVhLmluZGV4T2YoIFwiYW5kcm9pZFwiICkgPiAwICkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoIHVhLnNsaWNlKCB1YS5pbmRleE9mKCBcImFuZHJvaWRcIiApICsgOCApICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cblxuICAgIH1cblxuICAgIGlzTWFqb3IoKXtcbiAgICAgICAgcmV0dXJuICEod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkRvQ29Nb1wiKSA9PT0gLTEgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIktERElcIikgPT09IC0xICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJWb2RhZm9uZVwiKSA9PT0gLTEgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNvZnRCYW5rXCIpID09PSAtMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaHR0cHM6Ly9oYWNrbm90ZS5qcC9hcmNoaXZlcy8yMjYzMy9cbiAgICAgKlxuICAgICAqL1xuICAgIGlwaG9uZVZlcnNpb24oKSB7XG4gICAgICAgIGxldCB1ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IHZlcnNpb24gPSB1Lm1hdGNoKCAvaXBob25lIG9zIChbXFxkXSspXyhbXFxkXSspXyhbXFxkXSspLyApO1xuICAgICAgICBpZiAoICF2ZXJzaW9uICkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IHUubWF0Y2goIC9pcGhvbmUgb3MgKFtcXGRdKylfKFtcXGRdKykvICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaHR0cHM6Ly9xaWl0YS5jb20vbmFyaWtlaS9pdGVtcy9hZGE0NDg5MWNiMDkwMmVmYzE2NVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzQW5kcm9pZEJyb3dzZXIoKSB7XG4gICAgICAgIGxldCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiAvYW5kcm9pZC8udGVzdCggdWEgKSAmJiAvbGludXg7IHU7Ly50ZXN0KCB1YSApICYmICEvY2hyb21lLy50ZXN0KCB1YSApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGRldmljZSB7U3RyaW5nfVxuICAgICAqIEBwYXJhbSB3aWR0aCB7TnVtYmVyfVxuICAgICAqL1xuICAgIHZpZXdQb3J0KCBkZXZpY2UsIHdpZHRoICkge1xuICAgICAgICBpZiAoIHRoaXNbIGRldmljZSBdICkge1xuICAgICAgICAgICAgbGV0IHZpZXdQb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ21ldGFbbmFtZT1cInZpZXdwb3J0XCJdJyApO1xuICAgICAgICAgICAgdmlld1BvcnQuc2V0QXR0cmlidXRlKCAnY29udGVudCcsICd3aWR0aD0nICsgd2lkdGggKyAnLHVzZXItc2NhbGFibGU9bm8nIClcbiAgICAgICAgfVxuICAgIH1cblxufSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUExS0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./ts/utility/UserAgent.ts\n");

/***/ })

/******/ });