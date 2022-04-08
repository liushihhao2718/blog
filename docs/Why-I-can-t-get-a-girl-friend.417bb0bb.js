// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8P5FB":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "272bae2a417bb0bb";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"2Am7B":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
/*!
 * Start Bootstrap - Clean Blog v6.0.8 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */ // window.addEventListener('DOMContentLoaded', () => {
//     let scrollPos = 0;
//     const mainNav = document.getElementById('mainNav');
//     const headerHeight = mainNav.clientHeight;
//     window.addEventListener('scroll', function() {
//         const currentTop = document.body.getBoundingClientRect().top * -1;
//         if ( currentTop < scrollPos) {
//             // Scrolling Up
//             if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
//                 mainNav.classList.add('is-visible');
//             } else {
//                 console.log(123);
//                 mainNav.classList.remove('is-visible', 'is-fixed');
//             }
//         } else {
//             // Scrolling Down
//             mainNav.classList.remove(['is-visible']);
//             if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
//                 mainNav.classList.add('is-fixed');
//             }
//         }
//         scrollPos = currentTop;
//     });
// })
var _2021有偶率Json = require("./2021有偶率.json");
var _2021有偶率JsonDefault = parcelHelpers.interopDefault(_2021有偶率Json);
const population_ages = [
    "0",
    "1～4",
    "5～9",
    "10～14",
    "15～19",
    "20～24",
    "25～29",
    "30～34",
    "35～39",
    "40～44",
    "45～49",
    "50～54",
    "55～59",
    "60～64",
    "65～69",
    "70～74",
    "75～79",
    "80～84",
    "85～89",
    "90～94",
    "95～99",
    "100+", 
];
const single_ages = [
    "0～14",
    "15～19",
    "20～24",
    "25～29",
    "30～34",
    "35～39",
    "40～44",
    "45～49",
    "50～54",
    "55～59",
    "60～64",
    "65～69",
    "70～74",
    "75～79",
    "80～84",
    "85～89",
    "90～94",
    "95～99",
    "100", 
];
const city = document.getElementById("city");
const tw_map = document.getElementById("map");
const pp = document.getElementById("pp");
tw_map.addEventListener("change", (e)=>{
    // console.log(tw_map.value);
    reloadText();
});
document.getElementById("population-config").addEventListener("population", ()=>{
    reloadText();
});
const attractive = document.getElementById("attractive");
const attractive_text = document.getElementById("attractive-text");
attractive.addEventListener("change", (e)=>{
    reloadText();
});
const intelligent = document.getElementById("intelligent");
const intelligentText = document.getElementById("intelligent-text");
intelligent.addEventListener("change", (e)=>{
    reloadText();
});
const single = document.getElementById("single");
const singleText = document.getElementById("single-text");
const attractive_self = document.getElementById("attractive_self");
const attractive_self_text = document.getElementById("attractive_self_text");
attractive_self.addEventListener("change", (e)=>{
    reloadText();
});
const intelligent_self = document.getElementById("intelligent_self");
const intelligent_self_text = document.getElementById("intelligent_self_text");
intelligent_self.addEventListener("change", (e)=>{
    reloadText();
});
window.addEventListener("WebComponentsReady", function() {
    // console.log("ready");
    tw_map.select(2);
    single.setData(_2021有偶率JsonDefault.default);
});
function reloadText() {
    let m = mergeAge(tw_map.value, population_ages);
    city.textContent = numberWithCommas(m.map((x)=>x.male + x.female
    ).reduce((a, b)=>a + b
    ));
    pp.setData(m);
    let p = handlePopulation(m);
    let attractiveValue = Math.round(attractive.value * p);
    attractive_text.textContent = attractiveValue;
    let intelligentValue = Math.round(intelligent.value * attractiveValue);
    intelligentText.textContent = intelligentValue;
    let single_percentage = handleSingle(_2021有偶率JsonDefault.default);
    let single_value = Math.round(single_percentage * intelligentValue);
    singleText.textContent = single_value;
    let attractive_self_value = Math.round(attractive_self.value * single_value);
    attractive_self_text.textContent = attractive_self_value;
    let intelligent_self_value = Math.round(intelligent_self.value * attractive_self_value);
    intelligent_self_text.textContent = intelligent_self_value;
}
function handlePopulation(m) {
    const input_age_min = document.getElementById("age_min");
    const input_age_max = document.getElementById("age_max");
    const gender = document.querySelector("input[name=inlineRadioOptions]:checked").value;
    const population = document.getElementById("population");
    let age = pickAgeRange(m, Number(input_age_min.value), Number(input_age_max.value), gender, population_ages);
    population.textContent = numberWithCommas(age);
    return age;
}
function handleSingle(m) {
    const input_age_min = document.getElementById("age_min");
    const input_age_max = document.getElementById("age_max");
    const gender = document.querySelector("input[name=inlineRadioOptions]:checked").value;
    let range_total = pickSinglePercentage(m, Number(input_age_min.value), Number(input_age_max.value), gender, single_ages);
    return range_total;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function mergeAge(data, ages) {
    if (data.length == 0) return [];
    return data.map((d)=>convertAge(d, ages)
    ).reduce((a, b)=>{
        return a.map((x, i)=>{
            return {
                age: x.age,
                male: x.male + b[i].male,
                female: x.female + b[i].female
            };
        });
    });
}
function convertAge(data, ages) {
    return ages.map((a)=>{
        return {
            age: a,
            male: parseAge(data["男"][a]),
            female: parseAge(data["女"][a])
        };
    });
}
function parseAge(n) {
    return parseFloat(n.replace(/,/g, ""));
}
function pickAgeRange(data, min, max, gender, ages) {
    let r = getRange(min, max, ages);
    // console.log(r.filter((x) => x.v));
    let in_range = r.filter((x)=>x.v
    );
    let first = in_range.shift();
    let end = in_range.pop();
    // console.log(in_range.map((r) => data[r.i].male));
    let s = (g)=>data[first.i][g] * interpolation(first.r[0], first.r[1], min) + in_range.map((r)=>data[r.i][g]
        ).reduce((a, b)=>a + b
        ) + data[first.i][g] * interpolation(end.r[0], end.r[1], max)
    ;
    if (gender == "male") return s("male");
    else if (gender == "female") return s("female");
    else if (gender == "all") return s("male") + s("female");
    else return 0;
}
function pickSinglePercentage(data, min, max, gender, ages) {
    let r = getRange(min, max, ages);
    // console.log(r.filter((x) => x.v));
    let in_range = r.filter((x)=>x.v
    );
    let first = in_range.shift();
    let end = in_range.pop();
    // console.log(in_range.map((r) => data[r.i].male));
    let s = (g)=>data[first.i][g] * interpolation(first.r[0], first.r[1], min) + in_range.map((r)=>data[r.i][g]
        ).reduce((a, b)=>a + b
        ) + data[first.i][g] * interpolation(end.r[0], end.r[1], max)
    ;
    if (gender == "male") return 1 - s("male") / s('male_total');
    else if (gender == "female") return 1 - s("female") / s('female_total');
    else if (gender == "all") return 1 - s("male") / s('male_total') + s("female") / s('female_total');
    else return 1;
}
function getRange(min, max, ages) {
    let range = ages.map((x)=>x.replace("+", "").split("～")
    ).map((x)=>x.map((y)=>Number(y)
        )
    );
    return range.map((r, i)=>{
        if (r.length == 1) return {
            i,
            r,
            v: r[0] == min || r[0] == max
        };
        return {
            i,
            r,
            v: (r[0] <= min && r[1] >= min || r[0] >= min && r[1] >= min) && (r[0] <= max && r[1] >= max || r[0] <= max && r[1] <= max)
        };
    });
}
function interpolation(a, b, x) {
    return (Math.abs(b - x) + 1) / (Math.abs(b - a) + 1);
}

},{"./2021有偶率.json":"3cpgk","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3cpgk":[function(require,module,exports) {
module.exports = JSON.parse("[{\"age\":\"0～15\",\"male_total\":1500232,\"female_total\":1389676,\"male\":0,\"female\":0},{\"age\":\"15～19\",\"male_total\":574085,\"female_total\":523649,\"male\":432,\"female\":1524},{\"age\":\"20～24\",\"male_total\":741685,\"female_total\":683039,\"male\":14269,\"female\":27918},{\"age\":\"25～29\",\"male_total\":825351,\"female_total\":765891,\"male\":91093,\"female\":139386},{\"age\":\"30～34\",\"male_total\":819451,\"female_total\":766264,\"male\":255996,\"female\":336693},{\"age\":\"35～39\",\"male_total\":884401,\"female_total\":886781,\"male\":439983,\"female\":534429},{\"age\":\"40～44\",\"male_total\":985293,\"female_total\":1012869,\"male\":576218,\"female\":649106},{\"age\":\"45～49\",\"male_total\":882337,\"female_total\":919349,\"male\":561887,\"female\":592119},{\"age\":\"50～54\",\"male_total\":873204,\"female_total\":904568,\"male\":587476,\"female\":591100},{\"age\":\"55～59\",\"male_total\":886769,\"female_total\":927991,\"male\":632000,\"female\":617229},{\"age\":\"60～64\",\"male_total\":813629,\"female_total\":869767,\"male\":614320,\"female\":572088},{\"age\":\"65～69\",\"male_total\":696974,\"female_total\":768486,\"male\":548830,\"female\":474633},{\"age\":\"70～74\",\"male_total\":476519,\"female_total\":546437,\"male\":383032,\"female\":292210},{\"age\":\"75～79\",\"male_total\":256442,\"female_total\":319156,\"male\":202477,\"female\":136815},{\"age\":\"80～84\",\"male_total\":192117,\"female_total\":268252,\"male\":139942,\"female\":83589},{\"age\":\"85～89\",\"male_total\":102595,\"female_total\":155913,\"male\":62605,\"female\":28619},{\"age\":\"90～94\",\"male_total\":52177,\"female_total\":68318,\"male\":27678,\"female\":5644},{\"age\":\"95～99\",\"male_total\":13336,\"female_total\":17573,\"male\":5951,\"female\":627},{\"age\":\"100+\",\"male_total\":2099,\"female_total\":2639,\"male\":774,\"female\":94}]");

},{}]},["8P5FB","2Am7B"], "2Am7B", "parcelRequire0102")

//# sourceMappingURL=Why-I-can-t-get-a-girl-friend.417bb0bb.js.map
