
// dom 4 shim https://github.com/WebReflection/dom4
(function (window) {
  'use strict';
  /* jshint loopfunc: true, noempty: false*/
  // http://www.w3.org/TR/dom/#element

  function textNodeIfString(node) {
    return typeof node === 'string' ? window.document.createTextNode(node) : node;
  }
  function mutationMacro(nodes) {
    if (nodes.length === 1) {
      return textNodeIfString(nodes[0]);
    }
    for (var fragment = window.document.createDocumentFragment(), list = slice.call(nodes), i = 0; i < nodes.length; i++) {
      fragment.appendChild(textNodeIfString(list[i]));
    }
    return fragment;
  }
  for (var defineProperty = Object.defineProperty || function (object, property, descriptor) {
    object.__defineGetter__(property, descriptor.get);
  }, indexOf = [].indexOf || function indexOf(value) {
    var length = this.length;
    while (length--) {
      if (this[length] === value) {
        break;
      }
    }
    return length;
  }, head, property, verifyToken, DOMTokenList, trim = /^\s+|\s+$/g, spaces = /\s+/, SPACE = '\x20', toggle = function toggle(token, force) {
    if (this.contains(token)) {
      if (!force) {
        // force is not true (either false or omitted)
        this.remove(token);
      }
    } else if (force === undefined || force) {
      force = true;
      this.add(token);
    }
    return !!force;
  }, ElementPrototype = (window.Node || window.Element || window.HTMLElement).prototype, properties = ['matches', ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.khtmlMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.msMatchesSelector || ElementPrototype.oMatchesSelector || function matches(selector) {
    var parentNode = this.parentNode;
    return !!parentNode && -1 < indexOf.call(parentNode.querySelectorAll(selector), this);
  }, 'prepend', function prepend() {
    var firstChild = this.firstChild,
        node = mutationMacro(arguments);
    if (firstChild) {
      this.insertBefore(node, firstChild);
    } else {
      this.appendChild(node);
    }
  }, 'append', function append() {
    this.appendChild(mutationMacro(arguments));
  }, 'before', function before() {
    var parentNode = this.parentNode;
    if (parentNode) {
      parentNode.insertBefore(mutationMacro(arguments), this);
    }
  }, 'after', function after() {
    var parentNode = this.parentNode,
        nextSibling = this.nextSibling,
        node = mutationMacro(arguments);
    if (parentNode) {
      if (nextSibling) {
        parentNode.insertBefore(node, nextSibling);
      } else {
        parentNode.appendChild(node);
      }
    }
  }, 'replace', function replace() {
    var parentNode = this.parentNode;
    if (parentNode) {
      parentNode.replaceChild(mutationMacro(arguments), this);
    }
  }, 'remove', function remove() {
    var parentNode = this.parentNode;
    if (parentNode) {
      parentNode.removeChild(this);
    }
  }], slice = properties.slice, i = properties.length; i; i -= 2) {
    property = properties[i - 2];
    if (!(property in ElementPrototype)) {
      ElementPrototype[property] = properties[i - 1];
    }
  }
  // http://www.w3.org/TR/dom/#domtokenlist
  // iOS 5.1 has completely screwed this property
  // classList in ElementPrototype is false
  // but its actually there as getter
  if (!('classList' in document.documentElement)) {
    // http://www.w3.org/TR/domcore/#domtokenlist
    verifyToken = function (token) {
      if (!token) {
        throw 'SyntaxError';
      } else if (spaces.test(token)) {
        throw 'InvalidCharacterError';
      }
      return token;
    };
    DOMTokenList = function (node) {
      var className = node.className.replace(trim, '');
      if (className.length) {
        properties.push.apply(this, className.split(spaces));
      }
      this._ = node;
    };
    DOMTokenList.prototype = {
      length: 0,
      add: function add() {
        for (var j = 0, token; j < arguments.length; j++) {
          token = arguments[j];
          if (!this.contains(token)) {
            properties.push.call(this, property);
          }
        }
        this._.className = '' + this;
      },
      contains: function (indexOf) {
        return function contains(token) {
          i = indexOf.call(this, property = verifyToken(token));
          return -1 < i;
        };
      }([].indexOf || function (token) {
        i = this.length;
        while (i-- && this[i] !== token) {}
        return i;
      }),
      item: function item(i) {
        return this[i] || null;
      },
      remove: function remove() {
        for (var j = 0, token; j < arguments.length; j++) {
          token = arguments[j];
          if (this.contains(token)) {
            properties.splice.call(this, i, 1);
          }
        }
        this._.className = '' + this;
      },
      toggle: toggle,
      toString: function toString() {
        return properties.join.call(this, SPACE);
      }
    };
    defineProperty(ElementPrototype, 'classList', {
      get: function get() {
        return new DOMTokenList(this);
      },
      set: function () {}
    });
  } else {
    // iOS 5.1 and Nokia ASHA do not support multiple add or remove
    // trying to detect and fix that in here
    DOMTokenList = document.createElement('div').classList;
    DOMTokenList.add('a', 'b', 'a');
    if ('a\x20b' != DOMTokenList) {
      // no other way to reach original methods in iOS 5.1
      ElementPrototype = DOMTokenList.constructor.prototype;
      if (!('add' in ElementPrototype)) {
        // ASHA double fails in here
        ElementPrototype = window.DOMTokenList.prototype;
      }
      verifyToken = function (original) {
        return function () {
          var i = 0;
          while (i < arguments.length) {
            original.call(this, arguments[i++]);
          }
        };
      };
      ElementPrototype.add = verifyToken(ElementPrototype.add);
      ElementPrototype.remove = verifyToken(ElementPrototype.remove);
      // toggle is broken too ^_^ ... lets fix it
      ElementPrototype.toggle = toggle;
    }
  }

  if (!('head' in document)) {
    defineProperty(document, 'head', {
      get: function () {
        return head || (head = document.getElementsByTagName('head')[0]);
      }
    });
  }

  // http://www.w3.org/TR/dom/#customevent
  try {
    new window.CustomEvent('?');
  } catch (o_O) {
    window.CustomEvent = function (eventName, defaultInitDict) {

      // the infamous substitute
      function CustomEvent(type, eventInitDict) {
        var event = document.createEvent(eventName);
        if (typeof type != 'string') {
          throw new Error('An event name must be provided');
        }
        if (eventName == 'Event') {
          event.initCustomEvent = initCustomEvent;
        }
        if (eventInitDict == null) {
          eventInitDict = defaultInitDict;
        }
        event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
        return event;
      }

      // attached at runtime
      function initCustomEvent(type, bubbles, cancelable, detail) {
        this.initEvent(type, bubbles, cancelable);
        this.detail = detail;
      }

      // thats it
      return CustomEvent;
    }(
    // is this IE9 or IE10 ?
    // where CustomEvent is there
    // but not usable as construtor ?
    window.CustomEvent ?
    // use the CustomEvent interface in such case
    'CustomEvent' : 'Event',
    // otherwise the common compatible one
    {
      bubbles: false,
      cancelable: false,
      detail: null
    });
  }
})(window); //dom manipulation lib
;(function (document) {

  var slice = Array.prototype.slice;
  var addMethods = (a, b) => {
    for (var i in b) a.prototype[i] = b[i];
  };

  addMethods(Element, {
    on(...a) {
      this.addEventListener(...a);return this;
    },
    clear() {
      var i;while (i = this.firstChild) this.removeChild(i);return this;
    },
    query(a) {
      return this.querySelector(a);
    },
    queryAll(a) {
      return slice.call(this.querySelectorAll(a));
    }
  });

  var dom = function (a, b) {
    if (a === "br") return document.createElement("br"); //dumb ie bug fix
    var e = arguments,
        l = e.length,
        c,
        i = 1,
        element = document.createElement(a);
    if (b && b.constructor === Object) for (c in b) element.setAttribute(c, b[c]), i = 2;
    for (; i < l; i++) element.append(e[i]);
    return element;
  };

  dom.query = s => document.querySelector(s);
  dom.queryAll = a => slice.call(document.querySelectorAll(a));
  dom.fragment = () => document.createDocumentFragment();

  dom.on = (...a) => window.addEventListener(...a);
  dom.html = document.documentElement;
  dom.body = document.body;
  dom.head = document.head;

  window.dom = dom;
})(document); //search lib
var WS = {};

(function () {

  var noop = function () {};

  var fastEvery = function (collection, callback) {
    var result = true;

    var index = -1,
        length = collection ? collection.length : 0;

    while (++index < length) {
      if (!(result = !!callback(collection[index], index, collection))) {
        break;
      }
    }

    return result;
  };

  var match = (target, keywordList) => {
    return fastEvery(keywordList, a => a.test(target));
  };

  //filter that stops when it reaches a certain number of items
  var limitedFilter = (array, callback, limit) => {
    var result = [];

    var index = -1,
        length = array.length,
        value,
        resultLength = 0;

    while (++index < length) {
      value = array[index];
      if (resultLength < limit && callback(value, index, array)) {
        result[resultLength] = value;
        resultLength += 1;
      }
    }
    return result;
  };

  var toCaseInsensitive = a => RegExp(a, "i");

  //defaults
  WS.idealArea = 15;
  WS.area = 15;
  WS.inputElement = dom.query("#ws-input");
  WS.containerElement = dom.query("#ws-container");

  WS.getResults = (keyword, reverse) => {
    if (keyword === "") return WS.data.slice(0, WS.area);

    var keywordList = keyword.split(" ").map(toCaseInsensitive);

    return limitedFilter(WS.data, i => match(i.searchText, keywordList) ^ reverse, WS.area);
  };

  WS.search = function (args = {}) {
    var { keyword = WS.inputElement.value, reverse } = args,
        { onappendnode = noop, onfragmentpopulated = noop } = WS.search,
        array = WS.getResults(keyword, reverse),
        fragment = dom.fragment();

    array.forEach(i => {
      onappendnode(i);
      fragment.append(i.node);
    });

    onfragmentpopulated(fragment, array);

    WS.containerElement.clear().append(fragment);
  };

  WS.search.on = (eventString, callback) => {
    WS.search["on" + eventString] = callback;
  };

  WS.showAll = () => {
    WS.area = WS.data.length;
    WS.search();
    WS.area = WS.idealArea;
    return false;
  };

  WS.inputElement.on("input", WS.search);
})();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UTILITY FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var mapObject = (o, ƒ) => {
  var n = {};
  Object.keys(o).forEach(v => {
    n[v] = ƒ(o[v], v);
  });
  return n;
};

var getQueryVariable = function (a) {
  return unescape((RegExp("[&?]" + a + "=([^&]+)").exec(location) || ["", ""])[1] || "");
};

var mergeObject = function (a, b) {
  for (var i in b) a[i] = b[i];
  return a;
};

var addMethods = (a, b) => {
  for (var i in b) a.prototype[i] = b[i];
};

var range = function (start, stop) {

  var length = stop - start;
  var range = Array(length);
  var i = 0;

  for (; i < length; i++, start++) range[i] = start;

  return range;
};

var expandRange = function (rangeString) {
  var ends = rangeString.split("‑");
  var start = +ends[0];
  var stop = +ends[1];
  return range(start, stop).join(" ");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/",
    inputFormElement = dom.query("#inputform"),
    showAllLink = dom("a", { id: "showalllink" }, "show all").on("click", WS.showAll),
    linkTemplate = (link, text, tags, height) => dom("a", {
  target: "paypal",
  href: link,
  itemscope: "",
  itemtype: "http://schema.org/Product"
}, dom("img", { height, width: 150, itemprop: "image", alt: " " }), dom("span", { itemprop: "name" }, text), dom("span", { itemprop: "offers", itemscope: "", itemtype: "http://schema.org/AggregateOffer", hidden: "hidden" }, dom("span", { itemprop: "priceCurrency", content: "USD" }, "$"), dom("span", { itemprop: "price", content: "19.00" }, "19"), dom("span", { itemprop: "lowPrice", content: "19.00" }, "19")));

var setArea = function () {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var area = (h - 168) * w / 54208;
  area = Math.max(area, 10) | 0;

  WS.idealArea = area;
  WS.area = area;
};
setArea();
onresize = setArea;

dom.query("#showalllink").on("click", WS.showAll);

WS.search.on("appendnode", item => {
  if (!item.imageLoaded) //test if image is loaded (very important for perf!!!)
    item.node.firstChild.src = item.imageURL //load image
    , item.imageLoaded = true; //cache that the image was loaded
});

WS.search.on("fragmentpopulated", (fragment, array) => {
  if (array.length === WS.idealArea) fragment.append(showAllLink);
});

//include data
WS.data = [
//["","","",,""],
["57517325", "Chevrolet Impala\n2014‑uptodate", "car", 65, "00626"], ["bd002003", "Chevrolet Malibu\n2016‑uptodate", "car", 66, "00625"], ["57fb77fd", "Chevrolet Corvette\nStingray Z51 Z06\n2015‑uptodate", "car", 70, "00624"], ["679fa22f", "Subaru Forester\n2014‑uptodate", "suv", 91, "00623"], ["61393d30", "Toyota Tacoma\ndouble‑cab short‑bed 6.1ft 2016‑uptodate", "6ft pickup", 70, "00622"], ["1e10cc9e", "Toyota Tacoma\naccess‑cab long‑bed\n2016‑uptodate", "pickup", 73, "00621"], ["4b36e2fb", "Toyota Tundra\ndouble‑cab SR5\n2016‑uptodate", "pickup", 73, "00620"], ["e4c3aebd", "Mazda CX-3\n2016‑uptodate", "suv", 78, "00619"], ["dd838198", "Kia Sedona\n2015‑uptodate", "van", 82, "00618"], ["1626ce09", "Toyota Tundra\ncrewmax 2016‑uptodate", "pickup", 73, "00617"], ["0d27c757", "Ford Edge\n2016‑uptodate", "suv", 79, "00616"], ["f7cefb84", "Smart Fortwo\n2016‑uptodate", "car", 105, "00615"], ["8e7907b5", "Honda Civic\nsedan 2016‑uptodate", "car", 70, "00614"], ["0ea4504e", "Subaru BRZ\n2013‑uptodate", "car", 70, "00613"], ["4f175128", "Ford Super‑Duty F‑Series F‑250 F‑350 F‑450 crew‑cab 2016‑uptodate", "pickup", 71, "00612"], ["8abf2355", "Winnebago Brave 31C", "RV Recreational vehicle class a motorhome caravan camper van bus", 90, "00611"], ["68206198", "Kia Sorento SX 2016", "suv", 78, "00610"], ["baa887ad", "Winnebago Vista", "RV Recreational vehicle class a motorhome caravan camper van bus", 90, "00609"], ["304dde38", "GMC Sierra\n/ Chevrolet Silverado crew‑cab 3500 HD long‑box 2014‑uptodate", "pickup", 68, "00608"], ["29185114", "Mercedes Metris cargo van 2016‑uptodate", "van", 82, "00607"], ["6751b7bd", "Ford F‑150\nsupercrew 5.5ft 2015‑uptodate", "pickup", 75, "00606"], ["a2f1142e", "Ford F‑150\nsupercrew 6.5ft 2015‑uptodate", "pickup", 78, "00605"], ["508dc0f3", "GMC Canyon\n/ Chevrolet Colorado extended‑cab short‑box\n2015‑uptodate", "pickup", 75, "00604"], ["3a7cb9c6", "GMC Canyon\n/ Chevrolet Colorado crew‑cab short‑box\n2015‑uptodate", "pickup", 76, "00603"], ["0e82e3b3", "Honda HR‑V\n2016", "suv", 85, "00602"], ["04f4ea49", "Nissan Micra\n4‑door\n2016‑uptodate", "car", 92, "00601"], ["98973bb9", "GMC Sierra\ndouble‑cab standard‑box\n2014‑uptodate", "pickup", 76, "00600"], ["36cf2901", "Ford Transit\nfull‑size high‑roof long extended\n2015‑uptodate", "van", 91, "00599"], ["1b545db2", "Mazda MX‑5\nMiata Eunos Roadster\n2015‑uptodate", "car", 72, "00598"], ["aec6015b", "Ford Mustang\n2015‑uptodate", "car", 65, "00597"], ["fddce689", "Chevrolet City\nexpress\n2015‑uptodate", "van", 88, "00596"], ["ilahbath", "Kia Sorento\n2016", "suv", 78, "00595"], ["zoolieni", "Jeep Renegade\n2015", "suv", 83, "00594"], ["wahyahgu", "Ram Promaster\ncity\n2015", "van dodge", 85, "00593"], ["mhoohush", "Newmar RV\n45ft", "Recreational vehicle class a motorhome caravan camper van bus", 73, "00592"], ["amohmuri", "Mini Cooper\n2008‑2015", "car", 79, "00591"], ["rphooref", "Ford F‑150\nsupercab 6 5ft\n2015‑uptodate", "pickup", 75, "00590"], ["vwakecoo", "Dodge Ram Promaster\n136 wheelbase, high‑roof\n2014‑uptodate", "van", 90, "00587"], ["ohphizoo", "Ford Transit\nfull‑size high‑roof long\n2015‑uptodate", "van", 100, "00588"], ["aesameev", "Tesla model S\n2014‑uptodate", "car", 65, "00586"], ["caiphooj", "Ford Transit\nfull‑size medium‑roof long\n2015‑uptodate", "van", 86, "00585"], ["iquokeib", "Ford Econoline e‑350 e‑250\nextended length cargo\n2008‑2014", "van", 76, "00584"], ["bohghozu", "Toyota Rav‑4\n2014‑uptodate", "suv", 83, "00001"], ["ijughaim", "Honda Accord\n2012‑uptodate", "car", 67, "00582"], ["cmhoorae", "Toyota Camry\n2012‑uptodate", "car", 75, "00581"], ["cheteicu", "Ford Transit Connect\nshort wagon liftgate\n2014‑uptodate", "van", 85, "00583"], ["uyahchey", "Ford Fusion\n2013‑uptodate", "car", 71, "00580"], ["mquiraep", "Jeep Cherokee\n2014‑uptodate", "suv", 79, "00579"], ["ohjesoth", "Toyota Rav‑4\n2013", "suv", 81, "00002"], ["shoghopi", "Jeep Grand‑Cherokee\n2014‑uptodate", "suv", 79, "00003"], ["eifurogo", "Buick Encore\n2013‑uptodate", "suv", 86, "00004"], ["oothohki", "Toyota Highlander\n2014‑uptodate", "suv", 76, "00005"], ["akiwaeph", "Ford Transit Connect\nlong cargo\n2014‑uptodate", "van", 80, "00006"], ["eizivapo", "Ford Transit Connect\nshort cargo\n2014‑uptodate", "van", 86, "00007"], ["ahdeisuw", "Ford Transit Connect\nshort wagon\n2014‑uptodate", "van", 86, "00008"], ["aexiemab", "Ford Transit Connect\nlong wagon\n2014‑uptodate", "van", 82, "00009"], ["ungaizes", "GMC Sierra\ncrew‑cab regular‑box\n2014‑uptodate", "pickup", 72, "00010"], ["gchivait", "Chevrolet Silverado\ncrew‑cab regular‑box\n2014‑uptodate", "pickup", 72, "00011"], ["ichizaix", "Honda Civic\nsedan\n2011‑2015", "car", 74, "00012"], ["soocufai", "Dodge Ram Promaster\n159 wheelbase, high‑roof\n2014‑uptodate", "van", 86, "00013"], ["oroocaph", "Dodge Ram Promaster\n118 wheelbase, standard‑roof\n2014‑uptodate", "van", 85, "00014"], ["gothoxox", "Dodge Ram Promaster\n136 wheelbase, standard‑roof\n2014‑uptodate", "van", 86, "00015"], ["aquefaid", "Nissan Murano\n2014", "suv", 87, "00016"], ["engeivug", "Mitsubishi Outlander\n2014‑2015", "suv", 85, "00017"], ["weephahz", "Kenworth t680\n2013‑uptodate", "tractor", 126, "00018"], ["eitoocah", "Peterbilt 579", "tractor", 127, "00019"], ["kiewiezu", "Freightliner Cascadia\nEvolution", "tractor", 132, "00020"], ["ohyedunu", "Nissan NV200\n2013‑uptodate", "van", 86, "00021"], ["ynegunoo", "Toyota Prius C\n2013‑uptodate", "car", 75, "00022"], ["jahghies", "Subaru XV Crosstrek\n2013‑uptodate", "suv", 82, "00023"], ["ohkahroo", "Nissan Pathfinder\n2013‑uptodate", "suv", 80, "00024"], ["vquiegee", "Mitsubishi Imiev\n2012‑uptodate", "car", 98, "00025"], ["bhrieyal", "Mazda CX‑5\n2012‑uptodate", "suv", 83, "00026"], ["shashahf", "Kia Rio\nhatchback\n2013‑uptodate", "car", 80, "00027"], ["ahhaevom", "Kia Forte\nhatchback\n2013‑uptodate", "car", 80, "00028"], ["ahzeigah", "Hyundai Santa‑Fe\n2013‑uptodate", "suv", 81, "00029"], ["highiefi", "Ford Escape\n2013‑uptodate", "suv", 82, "00030"], ["ireixein", "Ford C‑max\n2012‑uptodate", "car hatchback", 80, "00031"], ["ageejadi", "Dodge Dart\n2013‑uptodate", "car", 73, "00032"], ["gahpooni", "Chevrolet Orlando\n2012‑2014", "suv", 85, "00033"], ["eidaveet", "Chevrolet Sonic\n2012‑uptodate", "car hatchback", 83, "00034"], ["woongahc", "Chevrolet Spark\n2012‑2015", "car hatchback", 88, "00035"], ["aeyothee", "Chevrolet Volt\n2011‑2015", "car", 74, "00036"], ["etaiveid", "Dodge Caravan\n2012‑uptodate", "van ram", 80, "00037"], ["xuxiegig", "Dodge Charger\n2011‑uptodate", "muscle car", 72, "00038"], ["ehahbohf", "Dodge Durango\n2012‑uptodate", "suv", 82, "00039"], ["ipeeghor", "Fiat\n2012‑uptodate", "car hatchback", 88, "00040"], ["ieteking", "Ford Focus\n4‑door hatchback\n2012‑uptodate", "car", 81, "00041"], ["oopofael", "Honda CR‑V\n2012‑uptodate", "suv", 82, "00042"], ["aikeyaye", "Honda Civic\ncoupe\n2012‑2015", "car", 74, "00043"], ["ixaepohz", "Hyundai Accent\n4‑door hatchback\n2012‑uptodate", "car", 79, "00044"], ["aiboogoh", "Hyundai Elantra\n2012‑2016", "car", 72, "00045"], ["peiveelu", "Hyundai Veloster\n2012‑uptodate", "car", 73, "00046"], ["chievahm", "Mazda 5\n2012‑uptodate", "van", 83, "00047"], ["hoholier", "Mitsubishi RVR\n2010‑uptodate", "suv", 81, "00048"], ["jajoodee", "Nissan NV\nNV2500 NV3500 HD\nhigh‑roof\n2012‑uptodate", "van", 89, "00049"], ["gaicooju", "Nissan NV\nNV1500 NV2500 HD NV3500\nlow‑roof\n2012‑uptodate", "van", 82, "00050"], ["eriejece", "Scion IQ\n2012‑uptodate", "car", 97, "00051"], ["ibathief", "Scion XB\n2008‑2015", "car", 84, "00052"], ["oleiquai", "Volkswagen Beetle\n2012‑uptodate", "car", 85, "00053"], ["pemeiroh", "Volkswagen Jetta\n2011‑uptodate", "car", 78, "00054"], ["umohrohz", "Buick Enclave\n2008‑uptodate", "suv", 82, "00055"], ["chaepaem", "Buick Rainier\n2004‑2007", "suv", 83, "00056"], ["ahnohyai", "Buick Rendez‑vous\n2004‑2007", "suv", 80, "00057"], ["npbshoci", "Chevrolet Aveo\n4‑door\n2004‑2011", "car", 120, "00058"], ["shooregh", "Chevrolet Aveo\n5‑door\n2004‑2011", "car", 90, "00059"], ["thahhaed", "Chevrolet Camaro\n2009‑2015", "muscle car", 69, "00060"], ["eesijoth", "Chevrolet Cavalier\n2004‑2005", "car", 116, "00061"], ["oohahnuw", "Chevrolet Cobalt\n4‑door\n2007‑2009", "car", 108, "00062"], ["oonijaif", "Chevrolet Cobalt\ncoupe\n2007‑2009", "car", 115, "00063"], ["ehohcahk", "Chevrolet Corvette\n2006‑2013", "car", 90, "00064"], ["yzathahy", "Chevrolet Cruze\n2011‑2015", "car", 73, "00065"], ["abeedoon", "Chrysler Aspen\n2007‑2009", "suv", 84, "00066"],
//["ighohnoh","Chevrolet Impala\npolice\n2005","car",80,"00067"],
["nxietoza", "Chevrolet Impala\n2008‑2013", "car", 74, "00068"], ["weeguque", "Chevrolet Malibu\n2007", "car", 75, "00069"], ["ahshozai", "Chevrolet Malibu\n2008‑2015", "car", 74, "00070"], ["fhshoroo", "Chevrolet Malibu\nmaxx\n2007", "car", 80, "00071"], ["zecishol", "Chevrolet SSR\n2004‑2006", "car", 77, "00072"], ["zaipegae", "Chevrolet Express\ncube 16ft", "cube", 105, "00073"], ["thijohni", "GMC Savana\n/ Chevrolet Express cube 13ft", "cube", 105, "00074"], ["ushohori", "Chevrolet Avalanche\n2003‑2006", "pickup", 85, "00075"], ["lpooteel", "Chevrolet Avalanche\n2007‑2013", "pickup", 82, "00076"], ["pleewees", "Chevrolet Colorado\ncrew‑cab\n2004‑2012", "pickup", 82, "00077"], ["laruhohw", "Chevrolet Colorado\nextended‑cab\n2004‑2012", "pickup", 78, "00078"], ["vaiwiequ", "Chevrolet Colorado\nregular\n2004‑2012", "pickup", 81, "00079"], ["ijaishan", "Chevrolet S‑10\ncrew‑cab\n2003‑2004", "pickup", 85, "00080"], ["wpngeith", "Chevrolet S‑10\nextended‑cab\n2003‑2004", "pickup", 80, "00081"], ["rtfaevoh", "Chevrolet S‑10\nregular\n2003‑2004", "pickup", 82, "00082"], ["wdeyohng", "Chevrolet S‑10\nregular long\n2003‑2004", "pickup", 82, "00083"], ["eedusohb", "Chevrolet Silverado\n3500 crew‑cab\n2003‑2006", "pickup", 82, "00084"], ["shoozequ", "Chevrolet Silverado\n3500 extended‑cab long\n2003‑2006", "pickup", 85, "00085"], ["rgoochai", "Chevrolet Silverado\n3500 regular\n2003‑2006", "pickup", 86, "00086"], ["hdrasohc", "Chevrolet Silverado\ncrew‑cab\n2003‑2006", "pickup", 83, "00087"], ["ihooxiqu", "Chevrolet Silverado\nextended‑cab\n2003‑2006", "pickup", 85, "00088"], ["obowoghi", "Chevrolet Silverado\nextended‑cab long\n2003‑2006", "pickup", 81, "00089"], ["naiceeka", "Chevrolet Silverado\nregular long\n2003‑2006", "pickup", 80, "00090"], ["ciyohrie", "Chevrolet Silverado\nregular short\n2003‑2006", "pickup", 85, "00091"], ["zohlohvo", "Chevrolet Silverado\ncrew‑cab\n2007‑2013", "pickup", 78, "00092"], ["hfieghai", "Chevrolet Silverado\nextended‑cab regular\n2007‑2013", "pickup", 79, "00093"], ["rosietee", "Chevrolet Silverado\nextended‑cab long\n2007‑2013", "pickup", 74, "00094"], ["ohrewoox", "Chevrolet Silverado\nlong\n2007‑2013", "pickup", 79, "00095"], ["nohthaeg", "Chevrolet Silverado\nregular\n2007‑2013", "pickup", 82, "00096"], ["sngurahl", "Chevrolet Silverado\n3500 crew‑cab\n2007", "pickup", 80, "00097"], ["thohseew", "Chevrolet Silverado\n3500 extended‑cab long\n2007", "pickup", 85, "00098"], ["sphohbai", "Chevrolet Silverado\n3500 regular\n2007", "pickup", 87, "00099"], ["thaehaqu", "Chevrolet Silverado\ncrew‑cab\n2007", "pickup", 81, "00100"], ["quahliej", "Chevrolet Silverado\nextended‑cab\n2007", "pickup", 87, "00101"], ["vtteiqui", "Chevrolet Silverado\nextended‑cab long\n2007", "pickup", 82, "00102"], ["dlegecha", "Chevrolet Silverado\nregular long\n2007", "pickup", 80, "00103"], ["ixeehahh", "Chevrolet Silverado\nregular short\n2007", "pickup", 86, "00104"], ["toonooth", "Chevrolet Astro\ncargo swing‑door\n2003‑2005", "van", 94, "00105"], ["guraiche", "Chevrolet Astro\nswing‑door\n2003‑2005", "van", 92, "00106"], ["pohmaemu", "Chevrolet Astro\ntailgate\n2003‑2005", "van", 94, "00107"], ["knyvahch", "Chevrolet Blazer\n2‑door\n2004‑2005", "suv", 80, "00108"], ["igefaemu", "Chevrolet Blazer\n4‑door\n2004‑2005", "suv", 80, "00109"], ["quisizee", "Chevrolet Equinox\n2004‑2009", "suv", 87, "00110"], ["aengawoo", "Chevrolet Equinox\n2010‑uptodate", "suv", 86, "00111"], ["ookijadi", "Chevrolet Express\nlong\n2003‑uptodate", "van", 87, "00112"], ["sajeshiw", "Chevrolet Express\nlong slide‑door\n2003‑uptodate", "van", 85, "00113"], ["iepieyoo", "Chevrolet Express\nlong slide‑door cargo\n2003‑uptodate", "van", 82, "00114"], ["kothepho", "Chevrolet Express\nregular\n2003‑uptodate", "van", 86, "00115"], ["heenohch", "Chevrolet Express\nregular cargo\n2003‑uptodate", "van", 90, "00116"], ["ajikaepi", "Chevrolet Express\nregular slide‑door\n2003‑uptodate", "van", 87, "00117"], ["zodienoh", "Chevrolet Express\nregular slide‑door cargo\n2003‑uptodate", "van", 88, "00118"], ["joovaesi", "Chevrolet HHR\n2007‑2011", "suv", 84, "00119"], ["eezohzax", "Chevrolet HHR\npanel\n2007‑2011", "suv", 82, "00120"], ["mohijohr", "Chevrolet Suburban\n2008‑2014", "suv", 83, "00121"], ["yrmiengo", "Chevrolet Tahoe\n2007‑uptodate", "suv denali", 86, "00122"], ["ijeefief", "Chevrolet Tracker\n2004", "suv", 89, "00123"], ["geeragha", "Chevrolet Trailblazer\nextended‑length\n2004‑2006", "suv", 84, "00124"], ["zghohgie", "Chevrolet Trailblazer\nLS\n2004‑2009", "suv", 91, "00125"], ["olieghae", "Chevrolet Traverse\n2009‑uptodate", "suv", 81, "00126"], ["hepheish", "Chevrolet Uplander\next\n2005‑2009", "van", 83, "00127"], ["iwohjoon", "Chevrolet Venture\next\n2003‑2004", "van", 83, "00128"], ["zohbahng", "Chevrolet Venture\nregular\n2003‑2004", "van", 80, "00129"], ["oxaequee", "Chrysler PT‑Cruiser\n2004‑2010", "car", 81, "00130"], ["airiezie", "Chrysler PT‑Cruiser\npanel\n2007‑2010", "car", 80, "00131"], ["haipahji", "Chrysler Town\nand Country\n2003‑2007", "van", 79, "00132"], ["ziedeife", "Chrysler Town\nand Country\n2008‑uptodate", "van", 80, "00133"], ["thichohd", "Ford Econoline e‑350 e‑250\ncube 15ft", "cube", 97, "00134"], ["aboonagh", "Dodge Avenger\n2008‑2014", "car", 74, "00135"], ["geegokee", "Dodge Caliber\n2007‑2012", "car", 83, "00136"], ["hdgeefei", "Dodge Challenger\n2008‑uptodate", "car", 69, "00137"],
//["dahmahvo","Dodge Charger\npolice\n2007‑2010","car",78,"00138"],
//["ohdizije","Dodge Magnum\npolice\n2006‑2009","car",76,"00139"],
["jolilaqu", "Dodge SRT‑4\n2004‑2006", "car", 76, "00140"], ["kthohhei", "Dodge Dakota\ncrew‑cab\n2004", "pickup", 110, "00141"], ["ohghaidu", "Dodge Dakota\nquad‑cab\n2004", "pickup", 111, "00142"], ["eitheing", "Dodge Dakota\nregular\n2004", "pickup", 116, "00143"], ["eenikeic", "Dodge Dakota\ncrew‑cab\n2005‑2011", "pickup", 76, "00144"], ["oocaecoo", "Dodge Dakota\nquad‑cab\n2005‑2011", "pickup", 79, "00145"], ["kshahghu", "Dodge Ram 1500 2500 quad‑cab\n2003‑2008", "pickup", 80, "00146"], ["ahquadum", "Dodge Ram 1500 2500 regular long\n2003‑2008", "pickup", 82, "00147"], ["igaehein", "Dodge Ram 1500 2500 regular short\n2003‑2008", "pickup", 86, "00148"], ["gavahmoh", "Dodge Ram\n3500 quad‑cab\n2003‑2008", "pickup", 75, "00149"], ["xrunaema", "Dodge Ram\n3500 resistol\n2008", "pickup", 75, "00150"], ["eibaphie", "Dodge Ram\nmega‑cab\n2007‑2008", "pickup", 78, "00151"], ["ekeeshai", "Dodge Ram 1500 2500 crew‑cab\n2009‑uptodate", "pickup", 78, "00152"], ["chutieph", "Dodge Ram 1500 2500 crew‑cab toolbox\n2009‑uptodate", "pickup", 80, "00153"], ["eephoocu", "Dodge Ram 1500 2500 quad‑cab\n2009‑uptodate", "pickup", 78, "00154"], ["aereisap", "Dodge Ram 1500 2500 regular long\n2009‑uptodate", "pickup", 79, "00155"], ["usaeghuh", "Dodge Ram 1500 2500 regular short\n2009‑uptodate", "pickup", 80, "00156"], ["ahzeenge", "Dodge Grand\nCaravan\n2003‑2007", "van ram", 81, "00158"], ["opiequim", "Dodge Caravan\nregular\n2003‑2006", "van ram", 87, "00159"], ["uwaihaex", "Dodge Grand\nCaravan\n2008‑uptodate", "van ram", 80, "00160"], ["gzthipai", "Dodge Durango\n2003", "suv", 122, "00161"], ["eingiero", "Dodge Durango\n2004‑2009", "suv", 84, "00162"], ["cwepheem", "Dodge Journey\n2009‑uptodate", "suv", 80, "00163"], ["zeneemez", "Dodge Nitro\n2007‑2009", "suv", 86, "00164"], ["efiehahg", "Dodge Ram\n2003", "pickup", 85, "00165"], ["aitojief", "Dodge Ram\nshort\n2003", "pickup", 87, "00166"], ["zooforai", "Dodge / Mercedes Sprinter\nregular\n2004‑2007", "van mercedes", 97, "00167"], ["xaiquool", "Dodge / Mercedes Sprinter\nregular high‑roof\n2004‑2007", "van mercedes", 102, "00168"], ["udohshaw", "Dodge / Mercedes Sprinter\nshort\n2004‑2007", "van mercedes", 101, "00169"], ["eibahgei", "Dodge / Mercedes Sprinter\ncargo 144 high‑roof window\n2008‑uptodate", "van mercedes", 97, "00170"], ["odebeing", "Dodge / Mercedes Sprinter\ncargo 144 window\n2008‑uptodate", "van mercedes", 89, "00171"], ["teesohyi", "Dodge / Mercedes Sprinter\ncargo 170\n2008‑uptodate", "van mercedes", 93, "00172"], ["oceezazu", "Dodge / Mercedes Sprinter\nC extended‑roof 170\n2008‑uptodate", "van mercedes", 86, "00173"], ["ohmodoka", "Dodge / Mercedes Sprinter\nchassis 144\n2008‑uptodate", "van mercedes", 87, "00174"], ["laxoorei", "Dodge / Mercedes Sprinter\nchassis 170\n2008‑uptodate", "van mercedes", 76, "00175"], ["fngiefix", "Dodge / Mercedes Sprinter\nC mega‑roof 170\n2008‑uptodate", "van mercedes", 93, "00176"], ["sahbohsh", "Dodge / Mercedes Sprinter\npassenger 144\n2008‑uptodate", "van mercedes", 87, "00177"], ["xesosohd", "Dodge / Mercedes Sprinter\npassenger 144 high‑roof\n2008‑uptodate", "van mercedes", 96, "00178"], ["aigheshu", "Dodge / Mercedes Sprinter\npassenger 170\n2008‑uptodate", "van mercedes", 89, "00179"], ["oowahfej", "Dodge / Mercedes Sprinter\ncargo 144\n2008‑uptodate", "van mercedes", 87, "00180"], ["ahshishi", "Dodge / Mercedes Sprinter\ncargo 144 high‑roof\n2008‑uptodate", "van mercedes", 93, "00181"], ["opulohyu", "Mercedes / Dodge Sprinter\ncargo 144 high‑roof window\n2008‑uptodate", "van dodge", 97, "00182"], ["egheweix", "Mercedes / Dodge Sprinter\ncargo 144 window\n2008‑uptodate", "van dodge", 89, "00183"], ["oolachop", "Mercedes / Dodge Sprinter\ncargo 170\n2008‑uptodate", "van dodge", 93, "00184"], ["quaehaep", "Mercedes / Dodge Sprinter\nC extended‑roof 170\n2008‑uptodate", "van dodge", 86, "00185"], ["ooyeegho", "Mercedes / Dodge Sprinter\nchassis 144\n2008‑uptodate", "van dodge", 87, "00186"], ["ihakiepe", "Mercedes / Dodge Sprinter\nchassis 170\n2008‑uptodate", "van dodge", 76, "00187"], ["venguyee", "Mercedes / Dodge Sprinter\nC mega‑roof 170\n2008‑uptodate", "van dodge", 93, "00188"], ["icekahmi", "Mercedes / Dodge Sprinter\npassenger 144\n2008‑uptodate", "van dodge", 87, "00189"], ["iemeixai", "Mercedes / Dodge Sprinter\npassenger 144 high‑roof\n2008‑uptodate", "van dodge", 96, "00190"], ["eiyaicha", "Mercedes / Dodge Sprinter\npassenger 170\n2008‑uptodate", "van dodge", 89, "00191"], ["athifito", "Mercedes / Dodge Sprinter\ncargo 144\n2008‑uptodate", "van dodge", 87, "00192"], ["ingaisai", "Mercedes / Dodge Sprinter\ncargo 144 high‑roof\n2008‑uptodate", "van dodge", 93, "00193"], ["ujafisei", "Ford Fiesta\nhatchback\n2010‑uptodate", "car", 86, "00194"], ["xghocoor", "Ford Flex\n2009‑uptodate", "crossover", 82, "00195"], ["fveeghie", "Ford Focus\n4‑door\n2008‑2010", "car", 80, "00196"], ["iefohlih", "Ford Focus\n4‑door sedan\n2010‑uptodate", "car", 80, "00197"], ["aibeigie", "Ford Focus\ncoupe\n2008‑2011", "car", 79, "00198"], ["ofaixaca", "Ford Focus\nwagon\n2003‑2007", "car", 81, "00199"], ["eejiewof", "Ford Freestyle\n2005‑2007", "crossover", 85, "00200"], ["ietoomie", "Ford Fusion\n2007‑2009", "car", 73, "00201"], ["hzyahpaj", "Ford Fusion\n2010‑2012", "car", 75, "00202"], ["oomaiqua", "Ford Mustang\n2004", "muscle car", 69, "00203"], ["jaikaech", "Ford Mustang\n2005‑2014", "muscle car", 73, "00204"], ["eixivoko", "Ford Focus\nSVT\n2003‑2006", "car", 92, "00205"], ["ohhaishu", "Ford Taurus\n2008‑2009", "car", 77, "00206"], ["ychashai", "Ford Taurus\n2010‑2014", "car", 78, "00207"], ["zahshote", "Ford F‑150\nregular‑cab 6.5ft\n2004‑2008", "pickup", 81, "00210"], ["giephoce", "Ford F‑150\nregular‑cab 8ft\n2004‑2008", "pickup", 79, "00211"], ["ymjtveeh", "Ford F‑150\nregular‑cab F‑6 5ft\n2004‑2008", "pickup", 84, "00212"], ["ahsohfae", "Ford F‑150\nsupercab F‑6 5ft\n2004‑2008", "pickup", 80, "00213"], ["cheisais", "Ford F‑150\nsupercab S‑5 5ft\n2004‑2008", "pickup", 80, "00214"], ["aexahrun", "Ford F‑150\nsupercab S‑6 5ft\n2004‑2008", "pickup", 78, "00215"], ["soofoomi", "Ford F‑150\nsupercab S 8ft\n2004‑2008", "pickup", 75, "00216"], ["thaeseif", "Ford F‑150\nsupercrew 5 5ft\n2004‑2008", "pickup", 74, "00217"], ["xahducai", "Ford F‑250\n/ F‑350 supercab 8ft\n2004‑2008", "pickup", 81, "00218"], ["ahpohlav", "Ford F‑250\n/ F‑350 supercab 8ft\n2008‑uptodate", "pickup", 85, "00219"], ["eeyushoo", "Ford F‑250\n/ F‑350 supercrew 8ft\n2004‑2008", "pickup", 80, "00220"], ["eengaloo", "Ford F‑250\n/ F‑350 supercrew 8ft\n2008‑uptodate", "pickup", 79, "00221"], ["aepheech", "Ford F‑250\n/ F‑350 work 8ft\n2004‑2008", "pickup", 82, "00222"], ["aiphucha", "Ford F‑250\n/ F‑350 work 8ft\n2008‑uptodate", "pickup", 80, "00223"], ["theimoov", "Ford F‑150\ncrew‑cab 5.5ft\n2009‑2014", "pickup", 73, "00224"], ["quutheth", "Ford F‑150\ncrew‑cab 6.5ft\n2009‑2014", "pickup", 72, "00225"], ["jiexeero", "Ford F‑150\nregular‑cab long b\n2009‑2014", "pickup", 74, "00226"], ["xbzelahn", "Ford F‑150\nregular‑cab short b\n2009‑2014", "pickup", 82, "00227"], ["avoleita", "Ford F‑150\nsupercab 5.5ft\n2009‑2014", "pickup", 75, "00228"], ["voophigu", "Ford F‑150\nsupercab 8ft\n2009‑2014", "pickup", 73, "00229"], ["pdiepunu", "Ford F‑150\nsupercab F‑6 5ft\n2009‑2014", "pickup", 74, "00230"], ["afiseepo", "Ford Ranger\nregular‑cab\n2004‑2011", "pickup", 85, "00231"], ["dxmeikeh", "Ford Ranger\nsupercab flareside\n2004‑2011", "pickup", 86, "00232"], ["ijaefohm", "Ford Ranger\nsupercab\n2004‑2011", "pickup", 80, "00233"], ["itahceek", "Ford Excursion\n2004‑2005", "suv", 88, "00234"], ["ozeegesi", "Ford Econoline e‑350 e‑250\n2004‑2007", "van", 83, "00235"], ["eizumoow", "Ford Econoline e‑350 e‑250\nchateau\n2004‑2007", "van", 85, "00236"], ["ohquohzi", "Ford Econoline e‑350 e‑250\nextended‑length\n2004‑2007", "van", 78, "00237"], ["agoghipe", "Ford Econoline e‑350 e‑250\nslide‑door\n2004‑2007", "van", 85, "00238"], ["eedatogo", "Ford Econoline e‑350 e‑250\n2008‑2014", "van", 84, "00239"], ["iquaphei", "Ford Econoline e‑350 e‑250\nchateau\n2008‑2014", "van", 85, "00240"], ["ainekedu", "Ford Econoline e‑350 e‑250\nextended‑length\n2008‑2014", "van", 79, "00241"], ["xiethier", "Ford Econoline e‑350 e‑250\nslide‑door\n2008‑2014", "van", 88, "00242"], ["dkiquavo", "Ford Edge\n2007‑2010", "suv", 84, "00243"], ["aediechi", "Ford Edge\n2011‑2015", "suv", 84, "00244"], ["ahcakiex", "Ford Escape\n2004‑2007", "suv", 84, "00245"], ["kukophie", "Ford Escape\n2008‑2012", "suv", 87, "00246"], ["riepheze", "Ford Expedition\n2004‑2006", "suv", 88, "00247"], ["yuchefud", "Ford Expedition\n2008‑uptodate", "suv", 86, "00248"], ["ushodeig", "Ford Expedition\nel\n2008‑uptodate", "suv", 83, "00249"], ["chohyeeh", "Ford Explorer\n2003‑2010", "suv", 89, "00250"], ["quaikuho", "Ford Explorer\n2011‑2015", "suv", 83, "00251"], ["aebeenov", "Ford Explorer\nsport‑trac\n2003‑2010", "pickup", 86, "00252"], ["cievaezo", "Ford Freestar\n2004‑2007", "van", 85, "00253"], ["equaeshi", "Ford Freestyle\n2005‑2007", "suv", 85, "00254"], ["siejaeth", "Ford Taurus\nX\n2008‑2009", "suv", 82, "00255"], ["eehiesee", "Ford Transit Connect\n2010‑2013", "van", 88, "00256"], ["ekapohza", "Ford Windstar\n2003", "van", 82, "00257"], ["lahkeish", "GMC Canyon\ncrew‑cab\n2004‑2012", "pickup", 82, "00258"], ["ailahshu", "GMC Canyon\nextended‑cab\n2004‑2012", "pickup", 75, "00259"], ["iziebool", "GMC Canyon\nregular‑cab\n2004‑2012", "pickup", 80, "00260"], ["aehothee", "GMC Sierra\n3500HD\n2007‑2013", "pickup", 76, "00261"], ["fhohieko", "GMC Sierra\ncrew‑cab\n2007‑2013", "pickup", 78, "00262"], ["poreeliy", "GMC Sierra\next‑long\n2007‑2013", "pickup", 79, "00263"], ["iengeica", "GMC Sierra\nextended regular\n2007‑2013", "pickup", 81, "00264"], ["bilaivah", "GMC Sierra\nregular\n2007‑2013", "pickup", 83, "00265"], ["tiegeifo", "GMC Sierra\nregular long\n2007‑2013", "pickup", 78, "00266"], ["ohgheshe", "Sonoma /\nS‑10 crew‑cab\n2003", "pickup", 82, "00267"], ["eideegip", "Sonoma /\nS‑10 extended‑cab\n2003", "pickup", 79, "00268"], ["ojeishai", "Sonoma /\nS‑10 extended sport‑side\n2003", "pickup", 80, "00269"], ["giechiet", "Sonoma /\nS‑10 regular\n2003", "pickup", 82, "00270"], ["azaiyaib", "Sonoma /\nS‑10 regular long\n2003", "pickup", 80, "00271"], ["ckeisahr", "GMC Sierra\ncrew‑cab\n2003‑2007", "pickup", 79, "00272"], ["ohzaedoo", "GMC Sierra\ncrew‑cab long\n2003‑2007", "pickup", 76, "00273"], ["diphenai", "GMC Sierra\ncrew‑cab sport‑side\n2003‑2006", "pickup", 76, "00274"], ["uyebonge", "GMC Sierra\nextended‑cab\n2003‑2006", "pickup", 80, "00275"], ["sngaingo", "GMC Sierra\nextended‑cab sport‑side\n2003‑2006", "pickup", 79, "00276"], ["eefohtil", "GMC Sierra\next‑long\n2007", "pickup", 78, "00277"], ["ahngieta", "GMC Sierra\nregular\n2003‑2007", "pickup", 86, "00278"], ["aethovee", "GMC Sierra\nregular long\n2003‑2007", "pickup", 82, "00279"], ["ahpepeje", "GMC Sierra\nregular sport‑side\n2003‑2007", "pickup", 86, "00280"], ["odeibeey", "GMC Acadia\n2007‑uptodate", "suv denali", 81, "00281"], ["cnubieme", "GMC Envoy\n2003‑2009", "suv", 84, "00282"], ["xkdayiri", "GMC Envoy\nDenali\n2005‑2009", "suv", 81, "00283"], ["eefaedai", "GMC Envoy\nXL\n2004‑2006", "suv", 81, "00284"], ["oohaeziv", "GMC Terrain\n2010‑uptodate", "suv denali", 85, "00285"], ["ljnngiew", "GMC Yukon\n/ Tahoe\n2003‑2006", "suv denali", 86, "00286"], ["ohxaevoh", "GMC Yukon\n/ Tahoe\n2007‑uptodate", "suv denali", 87, "00287"], ["cailihus", "GMC Yukon\nXL / Suburban\n2003‑2006", "suv", 81, "00288"], ["ohchaebu", "GMC Yukon\nXL / Suburban\n2007‑2014", "suv", 82, "00289"], ["thaigeit", "Safari /\nAstro cargo swing‑door\n2003‑2005", "van", 93, "00290"], ["ohphaipi", "Safari /\nAstro swing‑door\n2003‑2005", "van", 97, "00291"], ["yphoophe", "Safari /\nAstro tailgate\n2003‑2005", "van", 93, "00292"], ["aefiyohd", "GMC Savana\n/ Chevrolet Express long\n2003‑uptodate", "van", 86, "00293"], ["ieghaeji", "GMC Savana\n/ Chevrolet Express long slide‑door\n2003‑uptodate", "van", 85, "00294"], ["oraizohm", "GMC Savana\n/ Chevrolet Express regular\n2003‑uptodate", "van", 91, "00295"], ["daidotoo", "GMC Savana\n/ Chevrolet Express regular slide‑door\n2003‑uptodate", "van", 88, "00296"], ["shaekaph", "Honda Accord\ncoupe\n2008‑uptodate", "car", 71, "00297"], ["zohsoowa", "Honda Accord\ncrosstour\n2010‑2014", "car", 74, "00298"], ["ooviquie", "Honda Civic\ncoupe\n2004‑2005", "car", 75, "00299"], ["tieteise", "Honda Civic\ncoupe\n2006‑2011", "car", 78, "00300"], ["alaebica", "Honda Civic\nsedan\n2006‑2010", "car", 75, "00301"], ["phohyies", "Honda Civic\nSI\n2003‑2005", "car", 82, "00302"], ["pohcevah", "Honda Civic\nSI\n2006‑2007", "car", 81, "00303"], ["erecaipu", "Honda CR‑Z\n2011‑2014", "car", 75, "00304"], ["aevetied", "Honda Element\n2003‑2007", "suv", 88, "00305"], ["zeequome", "Honda Fit\n2007‑2008", "car", 82, "00306"], ["aeteepol", "Honda Fit\n2009‑uptodate", "car", 83, "00307"], ["kainahdi", "Honda Insight\n2010‑2014", "car", 78, "00308"], ["eitheene", "Honda S2000\n2007‑uptodate", "car", 73, "00309"], ["aseecaim", "Honda Ridgeline\n2006‑2014", "pickup", 85, "00310"], ["hawahgae", "Honda CR‑V\n2007‑2011", "suv", 81, "00311"], ["mohveeci", "Honda CR‑V\n2004‑2006", "suv", 86, "00312"], ["ychiehoh", "Honda Element\n2003‑2007", "suv", 88, "00313"], ["chelahye", "Honda Element\n2008‑2011", "suv", 89, "00314"], ["shohcool", "Honda Odyssey\n2004", "van", 87, "00315"], ["uyeehied", "Honda Odyssey\n2005‑2010", "van", 86, "00316"], ["kahpailo", "Honda Odyssey\n2011‑uptodate", "van", 78, "00317"], ["emiesooz", "Honda Pilot\n2003‑2008", "suv", 86, "00318"], ["shohgoxe", "Honda Pilot\n2009‑2015", "suv", 82, "00319"], ["mshophei", "Hummer H2\n2003‑2009", "suv", 89, "00320"], ["eineewip", "Hummer H3\n2006‑2009", "suv", 92, "00321"], ["poteijap", "Hyundai Accent\n2‑door\n2004‑2005", "car", 80, "00322"], ["vevayohn", "Hyundai Accent\n2‑door hatchback\n2008‑2011", "car", 81, "00323"], ["riexuquu", "Hyundai Accent\n4‑door\n2004‑2005", "car", 78, "00324"], ["aepahfug", "Hyundai Accent\n2006‑2011", "car", 81, "00325"], ["aiquiepu", "Hyundai Elantra\n4‑door hatchback\n2004‑2008", "car", 111, "00326"], ["aichohle", "Hyundai Elantra\nsedan\n2006‑2011", "car", 78, "00327"], ["owighoor", "Hyundai Genesis\ncoupe\n2009‑uptodate", "car", 71, "00328"], ["shimahxi", "Hyundai Tiburon\n2004‑2007", "car", 74, "00329"], ["angeghae", "Hyundai Tiburon\n2008", "car", 74, "00330"], ["gohquoxa", "Hyundai Entourage\n2007‑2009", "van", 80, "00331"], ["eenudeng", "Hyundai Santa‑Fe\n2003‑2006", "suv", 85, "00332"], ["oniethoh", "Hyundai Santa‑Fe\n2007‑2012", "suv", 87, "00333"], ["jquohsee", "Hyundai Tucson\n2005‑2009", "suv", 80, "00334"], ["yoghahdo", "Hyundai Tucson\n2010‑2015", "suv", 87, "00335"], ["iemahgho", "Hyundai Veracruz\n2008‑2015", "suv", 86, "00336"], ["aigaethe", "Jeep Commander\n2006‑2011", "suv", 86, "00337"], ["aexahsei", "Jeep Compass\n2007‑2015", "suv", 82, "00338"], ["cailaero", "Jeep Grand‑Cherokee\n2003‑2004", "suv", 84, "00339"], ["edepaefa", "Jeep Grand‑Cherokee\n2005‑2010", "suv", 82, "00340"], ["ujexoqui", "Jeep Grand‑Cherokee\n2011‑2013", "suv", 85, "00341"], ["shuthana", "Jeep Liberty\nlimited‑edition\n2003‑2007", "suv", 86, "00342"], ["eiquahth", "Jeep Liberty\nRenegade\n2003‑2007", "suv", 93, "00343"], ["aenaewie", "Jeep Liberty\nsport\n2003‑2007", "suv", 89, "00344"], ["tumaewoo", "Jeep Liberty\n2008‑2009", "suv", 90, "00345"], ["iesekaeg", "Jeep Patriot\n2007‑2015", "suv", 87, "00346"], ["ogahphoj", "Jeep TJ\n2004‑2006", "suv", 92, "00347"], ["hangongu", "Jeep TJ\nunlimited\n2005‑2009", "suv", 87, "00348"], ["cilaezox", "Jeep Wrangler\n2‑door\n2007‑uptodate", "suv", 87, "00349"], ["wsoovagu", "Jeep Wrangler\n4‑door\n2007‑uptodate", "suv", 85, "00350"], ["ohmuhiez", "Kia Forte\n2010‑uptodate", "car", 75, "00351"], ["phahquom", "Kia Koup\n2010‑uptodate", "car", 76, "00352"], ["zfwthoye", "Kia Rio\n2006‑2011", "car", 86, "00353"], ["giepoobi", "Kia Rondo\n2007‑2012", "car", 86, "00354"], ["thegaech", "Kia Soul\n2010‑2013", "car", 87, "00355"], ["ahgetihu", "Kia Spectra\n2007‑2009", "car", 76, "00356"], ["eenaichi", "Kia Borrego\n2009‑2011", "suv", 81, "00357"], ["obahdieb", "Kia Sedona\n2004‑2005", "suv", 82, "00358"], ["baingizu", "Kia Sedona\n2006‑2012", "suv", 82, "00359"], ["eijahzee", "Kia Sorento\n2004‑2009", "suv", 87, "00360"], ["quuyeegh", "Kia Sorento\n2010‑2015", "suv", 81, "00361"], ["ahfituci", "Kia Sportage\n2005‑2006", "suv", 87, "00362"], ["wooxeegi", "Kia Sportage\n2007‑2010", "suv", 83, "00363"], ["thilooja", "Kia Sportage\n2011‑2015", "suv", 83, "00364"], ["gshoosoh", "Lincoln Navigator\nL\n2008‑uptodate", "suv", 81, "00365"], ["eefepohj", "Mazda 2\n2011‑uptodate", "car", 84, "00366"], ["hangiebe", "Mazda 3\n2004‑2009", "car", 80, "00367"], ["rnoothie", "Mazda 3\n2010‑2013", "car", 79, "00368"], ["aekoceis", "Mazda 3\nsedan\n2010‑2013", "car", 82, "00369"], ["eedoxeet", "Mazda MX5\nMiata\n2008‑uptodate", "car", 70, "00370"], ["cheixiem", "Mazda Protege\n5\n2003", "car", 75, "00371"], ["xmthuyoo", "Mazda RX‑8\n2008‑2012", "car", 74, "00372"], ["ohtheebi", "Mazda Speed3\n2010‑2013", "car", 78, "00373"], ["ooneibee", "Mazda B‑Series\n2004‑2009", "pickup", 82, "00374"], ["nefeicop", "Mazda 5\n2006‑2011", "van", 86, "00375"], ["xghootee", "Mazda CX‑7\n2007‑2012", "suv", 81, "00376"], ["amohnavo", "Mazda CX‑9\n2007‑uptodate", "suv", 80, "00377"], ["choseefo", "Mazda MPV\n2003‑2006", "van", 84, "00378"], ["uyeequuw", "Mazda Tribute\n2004‑2005", "suv", 88, "00379"], ["nquaecer", "Mazda Tribute\n2006", "suv", 87, "00380"], ["reishoga", "Mazda Tribute\n2007‑2011", "suv", 85, "00381"], ["ohshitie", "Mini Clubman\n2008‑uptodate", "car", 81, "00382"], ["ahghoolu", "Mini Cooper\n2004‑2007", "car", 99, "00383"], ["ipohsegu", "Mitsubishi Lancer\nevolution\n2003‑uptodate", "car", 88, "00384"], ["tkooxahp", "Mitsubishi Lancer\n2008‑uptodate", "car", 76, "00385"], ["fxmsaefu", "Mitsubishi Raider\ncrew‑cab\n2006‑2009", "pickup", 79, "00386"], ["chahkati", "Mitsubishi Raider\nextended‑cab\n2006‑2009", "pickup", 80, "00387"], ["ooleetha", "Mitsubishi Endeavor\n2004‑2009", "suv", 87, "00388"], ["xaegheiy", "Mitsubishi Montero\n2003‑2006", "suv", 87, "00389"], ["aiwiteke", "Mitsubishi Montero\nsport\n2003‑2004", "suv", 86, "00390"], ["eiyipeif", "Mitsubishi Outlander\n2004‑2006", "suv", 85, "00391"], ["oonohche", "Mitsubishi Outlander\n2007‑2012", "suv", 86, "00392"], ["gjieghuh", "Nissan Cube\n2009‑2014", "car", 94, "00393"], ["xphahnah", "Nissan Versa Note\n2007‑2013", "car", 81, "00394"], ["dxeeried", "Nissan Frontier\nextended‑cab\n2003‑2004", "pickup", 113, "00395"], ["aichipie", "Nissan Frontier\nregular‑cab\n2003‑2004", "pickup", 114, "00396"], ["paiyeipo", "Nissan Frontier\ncrew‑cab\n2005‑uptodate", "pickup", 83, "00397"], ["iboophop", "Nissan Frontier\nking‑cab\n2005‑uptodate", "pickup", 83, "00398"], ["gahxeegh", "Nissan Titan\ncrew‑cab\n2004‑2015", "pickup", 82, "00399"], ["fgzahniz", "Nissan Titan\nking‑cab\n2004‑2015", "pickup", 84, "00400"], ["mohpooko", "Nissan Armada\n2004‑uptodate", "suv", 83, "00401"], ["eizepoma", "Nissan Juke\n2011‑uptodate", "suv", 80, "00402"], ["ojielati", "Nissan Murano\n2003‑2013", "suv", 85, "00403"], ["oyaimahm", "Nissan Pathfinder\n2003‑2004", "suv", 124, "00404"], ["aijacoog", "Nissan Pathfinder\n2005‑2012", "suv", 88, "00405"], ["uduweixi", "Nissan Quest\n2004‑2010", "van", 86, "00406"], ["zrohcaem", "Nissan Quest\n2011‑2014", "van", 83, "00407"], ["ooditaid", "Nissan Xterra\n2003‑2004", "suv", 89, "00408"], ["niweilah", "Nissan Xterra\n2005‑2015", "suv", 89, "00409"], ["bliquaez", "Nissan Rogue\nX‑Trail\n2008‑uptodate", "suv", 84, "00410"], ["aethufae", "Oldsmobile Bravada\n2004", "suv", 83, "00411"], ["tnxlaete", "Oldsmobile Silhouette\n2004", "van", 83, "00412"], ["echeiquo", "Chevrolet Impala\n2005", "car", 74, "00413"],
//["achohsix","Chevrolet Impala\npolice\n2006‑2015","car",80,"00414"],
["eewuwaer", "Dodge Charger\n2007‑2010", "car", 73, "00415"], ["waengahd", "Dodge Magnum\n2006‑2009", "car", 71, "00416"],
//["chafooxo","Ford Crown\nVictoria / Grand Marquis police\n2005‑2011","car",79,"00417"],
["sthejoox", "Ford Crown\nVictoria / Grand Marquis\n2005‑2011", "car", 72, "00418"], ["vmiefuch", "Pontiac G6\n2007", "car", 114, "00419"], ["tsaethah", "Pontiac G6\n2008‑2009", "car", 117, "00420"], ["laexaela", "Pontiac GTO\n2005‑2006", "car", 74, "00421"], ["neeputhi", "Pontiac Solstice\n2007‑2009", "car", 73, "00422"], ["shigabae", "Pontiac Sunfire\n2004‑2005", "car", 74, "00423"], ["quoopeem", "Pontiac Vibe\n2004‑2008", "car", 84, "00424"], ["eishahmu", "Pontiac Vibe\n2009‑2010", "car", 80, "00425"], ["oowiciga", "Pontiac Wave\n4‑door canadian\n2004‑2006", "car", 117, "00426"], ["lafohree", "Pontiac Wave\n5‑door canadian\n2004‑2006", "car", 91, "00427"], ["ahlohvei", "Pontiac Aztek\n2004‑2005", "suv", 80, "00428"], ["phemooxe", "Pontiac Montana\n2006‑2009", "van", 82, "00429"], ["phohrahs", "Pontiac Montana\nextended\n2004‑2005", "van", 82, "00430"], ["gsenucoh", "Pontiac Montana\nregular\n2004‑2005", "van", 88, "00431"], ["hwaetash", "Pontiac SV6\n2006", "van", 82, "00432"], ["ienithoo", "Pontiac Torrent\n2007‑2009", "suv", 85, "00433"], ["neewoyov", "Saturn Astra\n2008‑2009", "car", 79, "00434"], ["ukeefiel", "Saturn Ion\n2003‑2007", "car", 77, "00435"], ["ahmeitah", "Saturn Sky\n2007‑2009", "car", 78, "00436"], ["ujagahng", "Saturn Outlook\n2007‑2009", "suv", 82, "00437"], ["haebaeyu", "Saturn Relay\n2006‑2007", "van", 83, "00438"], ["sophaebo", "Saturn Vue\n2003‑2007", "suv", 124, "00439"], ["vzoosaif", "Saturn Vue\n2008‑2009", "suv", 85, "00440"], ["geesheng", "Smart Fortwo\n2006‑2007", "car", 111, "00441"], ["jaishuko", "Smart Fortwo\n2008‑2015", "car", 102, "00442"], ["shukisae", "Subaru Baja\nsport\n2004‑2006", "car pickup", 82, "00443"], ["sieghawu", "Subaru Impreza\n4‑door hatchback\n2008‑2014", "car", 79, "00444"], ["hivohjim", "Subaru Impreza\nsedan\n2008‑2014", "car", 75, "00445"], ["lkzaetah", "Subaru Impreza\nsedan WRX\n2008‑2014", "car", 75, "00446"], ["xabohyuw", "Subaru Impreza\nwagon\n2004‑2007", "car", 79, "00447"], ["leivipoo", "Subaru Impreza\nWRX 4‑door hatchback\n2008‑2014", "car", 79, "00448"], ["ieshaehe", "Subaru Impreza\nWRX\n2004‑2007", "car", 77, "00449"], ["ceicufah", "Subaru Impreza\nWRX STI\n2008‑2014", "car", 80, "00450"], ["quoowooh", "Subaru Outback\n2006‑2009", "car", 76, "00451"], ["syooghoo", "Subaru Outback\n2010‑2014", "car", 83, "00452"], ["lyohquus", "Subaru Outback\nsport\n2006‑2009", "car", 82, "00453"], ["thupecei", "Subaru B9\nTribeca\n2006‑2007", "suv", 85, "00454"], ["fajuveek", "Subaru Tribeca\n2008‑2014", "suv", 85, "00455"], ["phowisho", "Subaru Forester\n2004‑2008", "suv", 84, "00456"], ["wdzeekox", "Subaru Forester\n2009‑2013", "suv", 87, "00457"], ["quivange", "Suzuki Aerio\n2004‑2007", "car", 123, "00458"], ["ohmaisie", "Suzuki Swift\n5‑door\n2004‑2011", "car", 130, "00459"], ["shooxahy", "Suzuki SX4\n2007‑2014", "car", 83, "00460"], ["eideiche", "Suzuki Equator\n6ft box\n2009‑2014", "pickup", 78, "00461"], ["eigheefo", "Suzuki Equator\ncrew‑cab 6ft box\n2009‑2014", "pickup", 76, "00462"], ["oshaivee", "Suzuki Equator\ncrew‑cab\n2009‑2014", "pickup", 78, "00463"], ["oorahngo", "Suzuki Grand\nVitara\n2004‑2005", "suv", 88, "00464"], ["tohvohlo", "Suzuki Grand\nVitara\n2006‑2014", "suv", 92, "00465"], ["twsheepa", "Suzuki Vitara\nconvertible\n2004", "pickup", 97, "00466"], ["gooquoze", "Suzuki XL‑7\n2004‑2006", "van", 84, "00467"], ["vaxeshes", "Suzuki XL‑7\n2007‑2009", "van", 86, "00468"], ["thahmohc", "Scion XA\n2004‑2007", "car", 126, "00469"], ["saechaix", "Toyota Echo\n2‑door coupe\n2004‑2005", "car", 85, "00470"], ["phemohcu", "Toyota Echo\n4‑door\n2004‑2005", "car", 132, "00471"], ["aipohkei", "Toyota Echo\n2003‑2005", "car", 132, "00472"], ["uxooxagh", "Toyota Matrix\n2004‑2008", "car", 84, "00473"], ["yahnaego", "Toyota Matrix\n2009‑2014", "car", 85, "00474"], ["ooyohnot", "Toyota Prius\n2004‑2009", "car", 86, "00475"], ["iedeexie", "Toyota Prius\n2010‑uptodate", "car", 80, "00476"], ["eiciquaz", "Toyota Venza\n2009‑2015", "suv", 79, "00477"], ["ievogase", "Toyota Yaris\n2‑door\n2006‑2013", "car", 78, "00478"], ["aethakoo", "Toyota Yaris\n4‑door hatchback\n2006‑2013", "car", 80, "00479"], ["feteeghu", "Toyota Yaris\nsedan\n2008‑2013", "car", 75, "00480"], ["ahaegaco", "Toyota Tacoma\ncrew‑cab\n2003‑2004", "pickup", 118, "00481"], ["bapahpae", "Toyota Tacoma\naccess‑cab\n2005‑2015", "pickup", 75, "00482"], ["zoozagie", "Toyota Tacoma\ncrew‑cab\n2005‑2015", "pickup", 75, "00483"], ["leengael", "Toyota Tundra\n2003", "pickup", 114, "00484"], ["nadagaqu", "Toyota Tundra\nregular\n2003", "pickup", 117, "00485"], ["upureejo", "Toyota Tundra\naccess‑cab\n2004‑2006", "pickup", 82, "00486"], ["eduphaex", "Toyota Tundra\ncrew‑cab\n2004‑2006", "pickup", 80, "00487"], ["chiekaif", "Toyota Tundra\nregular‑cab\n2004‑2006", "pickup", 78, "00488"], ["ooroodek", "Toyota Tundra\ncrew‑cab\n2007‑2013", "pickup", 78, "00489"], ["eeyuquud", "Toyota Tundra\ncrew‑cab long\n2007‑2013", "pickup", 73, "00490"], ["ifohrexe", "Toyota Tundra\ncrewmax\n2008‑2013", "pickup", 76, "00491"], ["jaisieth", "Toyota Tundra\nregular‑cab long\n2007‑2013", "pickup", 76, "00492"], ["ciphievu", "Toyota Tundra\nregular‑cab short\n2007‑2013", "pickup", 76, "00493"], ["thijebaf", "Scion XB\n/ BB\n2004‑2007", "car", 129, "00494"], ["iezephoo", "Toyota 4Runner\n2004‑2009", "suv", 87, "00495"], ["muhephoc", "Toyota 4Runner\n2010‑uptodate", "suv", 81, "00496"], ["veichere", "Toyota FJ‑Cruiser\n2007‑2014", "suv", 86, "00497"], ["daefaela", "Toyota Highlander\n2003‑2007", "suv", 82, "00498"], ["iecewohl", "Toyota Highlander\n2008‑2013", "suv", 82, "00499"], ["enengiwo", "Toyota Rav‑4\n2003‑2005", "suv", 88, "00500"], ["pheevohp", "Toyota Rav‑4\n2006‑2012", "suv", 87, "00501"], ["izaelohm", "Toyota Sequoia\n2003‑2008", "suv", 85, "00502"], ["wrveewob", "Toyota Sequoia\n2009‑uptodate", "suv", 81, "00503"], ["olahiede", "Toyota Sienna\n2004‑2010", "van", 83, "00504"], ["fasooyap", "Toyota Sienna\n2011‑uptodate", "van", 82, "00505"], ["umifijic", "Volkswagen Golf\n2003‑2009", "car", 78, "00506"], ["eimoohae", "Volkswagen Jetta\n2007‑2010", "car", 79, "00507"], ["teehinit", "Volkswagen New‑Beetle\n2003‑2011", "car", 86, "00508"], ["aihaevoo", "Volkswagen Rabbit\nGTI\n2007‑2009", "car", 77, "00509"], ["cfutaipi", "Volkswagen Routan\n2009‑2012", "van", 82, "00510"], ["iemeeque", "Volkswagen Tiguan\n2009‑uptodate", "suv", 85, "00511"], ["oongaiqu", "Volkswagen Touareg\n2004‑2010", "suv", 83, "00512"], ["epieleiz", "Freightliner Argosy\nday‑cab\n2001‑2006", "tractor truck", 152, "00513"], ["eemiketh", "Freightliner Argosy\nmedium‑roof\n2001‑2006", "tractor truck", 147, "00514"], ["asahgaiz", "Freightliner Argosy\nraised‑roof\n2001‑2006", "tractor truck", 153, "00515"], ["agaegees", "Freightliner Cascadia", "tractor truck", 131, "00516"], ["veireenu", "Freightliner Columbia\nday‑cab\n2004‑uptodate", "tractor truck", 111, "00517"], ["vaijeeta", "Freightliner Columbia\nday‑cab deflector\n2004‑uptodate", "tractor truck", 127, "00518"], ["aphiengi", "Freightliner Columbia\nmedium‑roof\n2004‑uptodate", "tractor truck", 132, "00519"], ["aimoopai", "Freightliner Columbia\nraised‑roof\n2004‑uptodate", "tractor truck", 134, "00520"], ["iewielae", "Freightliner Coronado\nday‑cab\n2004‑uptodate", "tractor truck", 153, "00521"], ["chievoof", "Freightliner Coronado\nmedium‑roof\n2004‑uptodate", "tractor truck", 129, "00522"], ["eidozeih", "Freightliner Coronado\nraised‑roof\n2004‑uptodate", "tractor truck", 133, "00523"], ["elewiejo", "Freightliner M2\n26in extended‑cab\n2003‑uptodate", "tractor truck", 129, "00524"], ["ahghaevi", "Freightliner M2\n48in crew‑cab\n2003‑uptodate", "tractor truck", 132, "00525"], ["aiparome", "Freightliner M2\nday‑cab\n2003‑uptodate", "tractor truck", 133, "00526"], ["tbahwosh", "GMC Topkick\nC4500 / C5500", "tractor truck", 106, "00527"], ["quieghil", "GMC T‑Series\nT7500", "tractor truck", 108, "00528"], ["ahgoolee", "Hino FA1517\n2008‑2009", "tractor truck", 86, "00529"], ["icuquiem", "Hino Low‑Profile\n258\n2009", "tractor truck", 103, "00530"], ["ahviexae", "International 8500\nregular", "tractor truck", 144, "00531"], ["denemiem", "International 9200i", "tractor truck", 143, "00532"], ["eikohyai", "International 9200i\n9400i high‑roof", "tractor truck", 141, "00533"], ["pghighai", "International 9200i\n9400i low‑roof", "tractor truck", 121, "00534"], ["aiseiwoh", "International 9200i\ndeflector", "tractor truck", 149, "00535"], ["upaiweyu", "International 9900i\nsleeper high‑roof", "tractor truck", 144, "00536"], ["oophethu", "International 9900i\nsleeper medium‑roof", "tractor truck", 131, "00537"], ["faicadoo", "International 9900ix\ndeflector", "tractor truck", 179, "00538"], ["rogahxei", "International 9900ix\nregular", "tractor truck", 146, "00539"], ["chemevie", "International CF‑Series", "tractor truck", 104, "00540"], ["zebahxok", "International CXT\n2006", "tractor truck", 116, "00541"], ["njereibe", "International Lonestar", "tractor truck", 124, "00542"], ["oofeethi", "Kenworth T600\nsleeper\n2004‑uptodate", "tractor truck", 142, "00543"], ["leexeepi", "Kenworth T800\ndeflector\n2004‑uptodate", "tractor truck", 155, "00544"], ["eechiewi", "Kenworth T800\nregular‑hood extended‑cab\n2004‑uptodate", "tractor truck", 138, "00545"], ["ohdahtei", "Kenworth T800\nsleeper\n2004‑uptodate", "tractor truck", 124, "00546"], ["eedaphil", "Kenworth T2000\nuptodate", "tractor truck", 140, "00547"], ["aechieve", "Kenworth W900\nsleeper\n2004‑uptodate", "tractor truck", 137, "00548"], ["yxixohze", "Mack CHN603\nday‑cab", "tractor truck", 147, "00549"], ["kuquebep", "Mack Vision\nday‑cab", "tractor truck", 130, "00550"], ["hzookeef", "Mack Vision\nday‑cab deflector", "tractor truck", 135, "00551"], ["ahheiyei", "Mack Vision\nsleeper", "tractor truck", 135, "00552"], ["ocixahya", "Mitsubishi Fuso\nFE‑180", "tractor truck", 83, "00553"], ["pheisaef", "Peterbilt 330\n108in BBC", "tractor truck", 109, "00554"], ["aishiepa", "Peterbilt 357\n111in BBC", "tractor truck", 139, "00555"], ["wmoxopah", "Peterbilt 357\n119in BBC sloped‑hood", "tractor truck", 139, "00556"], ["cheecahm", "Peterbilt 362\n76 BBC flat‑nose", "tractor truck", 149, "00557"], ["utohfaiy", "Peterbilt 362\n90 BBC flat‑nose", "tractor truck", 150, "00558"], ["oosusibu", "Peterbilt 379\nlong city\n2004‑2009", "tractor truck", 125, "00559"], ["quoshohj", "Peterbilt 379\nlong sleeper 69in\n2004‑2009", "tractor truck", 130, "00560"], ["pohraish", "Peterbilt 379\nshort city\n2004‑2009", "tractor truck", 134, "00561"], ["eetakaqu", "Peterbilt 385\n112in BBC", "tractor truck", 130, "00562"], ["ohphoxah", "Peterbilt 385\n120in BBC", "tractor truck", 126, "00563"], ["angaexah", "Peterbilt 387\nhigh‑roof sleeper\n2004‑2009", "tractor truck", 140, "00564"], ["aiyohhoo", "Peterbilt 387\nmedium‑roof sleeper\n2004‑2007", "tractor truck", 116, "00565"], ["ushiejae", "Sterling Acterra", "tractor truck", 141, "00566"], ["rwjoothe", "Volvo Highway\n2003‑uptodate", "tractor truck", 137, "005677"], ["mlquahgi", "Volvo Highway\nVN‑730\n2008‑uptodate", "tractor truck", 133, "00568"], ["meecoqui", "Volvo VT‑800\n2006‑uptodate", "tractor truck", 152, "00569"], ["ohliecek", "Western Star\n4900 EX", "tractor truck", 153, "00570"], ["chiejail", "Western Star\n4900 FA", "tractor truck", 151, "00571"], ["aivayaef", "Western Star\n4900 SA", "tractor truck", 153, "00572"], ["ishiniye", "Western Star\n6900 XD", "tractor truck", 149, "00573"], ["wdeeghek", "45ft trailer", "trailer", 102, "00574"], ["aemahhoh", "48ft trailer", "trailer", 99, "00575"], ["ahngahza", "53ft trailer", "trailer", 87, "00576"], ["cquooyah", "trailer front\n/ rear dry‑box", "trailer", 92, "00577"], ["ohheghie", "trailer front\n/ rear refer‑box", "trailer", 94, "00578"]]; //process data

var prettify = text => {
  var now = new Date().getFullYear();
  var rules = [
  //date formating
  [/uptodate/i, now + ""], [now + "‑" + now, now + ""], [now + 1 + "‑" + now, now + 1 + ""]];

  rules.forEach(i => {
    text = text.replace(i[0], i[1]);
  });

  return text;
};

var getSearchString = text => {
  var searchText = text.replace("\n", " ");
  var noSpace = searchText.replace(/‑/g, ""),
      space = searchText.replace(/‑/g, " "),
      dash = searchText.replace(/‑/g, "-"),
      chevy = searchText.replace("Chevrolet", "Chevy"),
      range = searchText.replace(/20\d\d‑20\d\d/, expandRange);

  return `${ searchText } ${ noSpace } ${ space } ${ dash } ${ chevy } ${ range } `;
};

WS.data.forEach(item => {

  var [rawURL, rawText, tags = "", height, sku] = item,
      buyURL = "http://signshophelper.fetchapp.com/sell/" + rawURL + "/ppc";

  item.prettyText = prettify(rawText);
  item.node = linkTemplate(buyURL, item.prettyText, tags, height);
  item.imageURL = imagePath + sku + ".jpg";
  item.imageLoaded = false;
  item.searchText = getSearchString(item.prettyText) + tags;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROGRAMMING
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//defered images
dom.query("[for=toggle-info]").on("click", e => {
  dom.queryAll("[data-src]").forEach(i => {
    i.src = imagePath + i.getAttribute("data-src");
  });
});

//faq cover

var cover = dom("div", { "class": "cover" }, dom("iframe", { src: "faq" })).on("click", e => {
  e.preventDefault();
  cover.remove();
});

dom.query("#faq").on("click", e => {
  e.preventDefault();
  dom.body.append(cover);
});

//hide info on text input
var infoBlockElement = dom.query("#toggle-info");
WS.inputElement.on("input", function () {
  if (infoBlockElement.checked !== false) infoBlockElement.checked = false;
});

//hardlinking

inputFormElement.on("submit", e => {
  history.pushState("", "", "?search=" + WS.inputElement.value);
  e.preventDefault();
});

WS.inputElement.value = getQueryVariable("search");

WS.search();

//clicked indicator

WS.containerElement.on("click", event => {
  if (event.target.href) event.target.classList.add("clicked");
});

//stylesheet load
//https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery

var cb = function () {
  var l = document.createElement('link');l.rel = 'stylesheet';
  l.href = 'http://fonts.googleapis.com/css?family=Ubuntu:400,700';
  var h = document.getElementsByTagName('head')[0];h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);else window.addEventListener('load', cb);