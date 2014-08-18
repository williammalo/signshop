var $traceurRuntime = {};
$traceurRuntime.toObject = function(value) {
  return Object(value);
};
;
(function(e) {
  function t(e) {
    return typeof e == "string" ? i.createTextNode(e): e;
  }
  function n(e) {
    if (e.length === 1) return t(e[0]);
    for (var n = i.createDocumentFragment(),
        r = u.call(e),
        s = 0; s < e.length; s++) n.appendChild(t(r[s]));
    return n;
  }
  for (var r,
      i = e.document,
      s = (e.Node || e.HTMLDocument || e.HTMLElement).prototype,
      o = ["prepend", function() {
        var t = this.firstChild,
            r = n(arguments);
        t ? this.insertBefore(r, t): this.appendChild(r);
      }, "append", function() {
        this.appendChild(n(arguments));
      }, "before", function() {
        var t = this.parentNode;
        t && t.insertBefore(n(arguments), this);
      }, "after", function() {
        var t = this.parentNode,
            r = this.nextSibling,
            i = n(arguments);
        t && (r ? t.insertBefore(i, r): t.appendChild(i));
      }, "replace", function() {
        var t = this.parentNode;
        t && t.replaceChild(n(arguments), this);
      }, "remove", function() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }],
      u = o.slice,
      a = o.length; a; a -= 2) r = o[a - 2], r in s || (s[r] = o[a - 1]);
})(window);
if (!window.Node)(function(e) {
  function t(e) {
    return typeof e == "string" ? i.createTextNode(e): e;
  }
  function n(e) {
    if (e.length === 1) return t(e[0]);
    for (var n = i.createDocumentFragment(),
        r = u.call(e),
        s = 0; s < e.length; s++) n.appendChild(t(r[s]));
    return n;
  }
  for (var r,
      i = e.document,
      s = (e.Element).prototype,
      o = ["prepend", function() {
        var t = this.firstChild,
            r = n(arguments);
        t ? this.insertBefore(r, t): this.appendChild(r);
      }, "append", function() {
        this.appendChild(n(arguments));
      }, "before", function() {
        var t = this.parentNode;
        t && t.insertBefore(n(arguments), this);
      }, "after", function() {
        var t = this.parentNode,
            r = this.nextSibling,
            i = n(arguments);
        t && (r ? t.insertBefore(i, r): t.appendChild(i));
      }, "replace", function() {
        var t = this.parentNode;
        t && t.replaceChild(n(arguments), this);
      }, "remove", function() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }],
      u = o.slice,
      a = o.length; a; a -= 2) r = o[a - 2], r in s || (s[r] = o[a - 1]);
})(window);
Element.prototype.on = function(a, b, c) {
  this.addEventListener(a, b, c);
  return this;
};
Element.prototype.clear = function() {
  var i;
  while (i = this.firstChild) this.removeChild(i);
  return this;
};
;
(function() {
  window.dom = function(a, b) {
    if (a === "br") return document.createElement("br");
    var e = arguments,
        l = e.length,
        c,
        i = 1,
        element = document.createElement(a);
    if (b && b.constructor === Object) for (c in b) element.setAttribute(c, b[c]), i = 2;
    for (; i < l; i++) element.append(e[i]);
    return element;
  };
  dom.query = function(s) {
    var a = document.querySelector(s);
    return a;
  };
  dom.queryAll = (function(a) {
    return Array.prototype.slice.call(document.querySelectorAll(a));
  });
  dom.fragment = document.createDocumentFragment.bind(document);
  dom.on = (function(a, b, c) {
    return addEventListener(a, b, c);
  });
  dom.html = document.documentElement;
  dom.body = document.body;
})();
var mapObject = (function(o, ƒ) {
  var n = {};
  Object.keys(o).forEach((function(v) {
    n[v] = ƒ(o[v], v);
  }));
  return n;
});
var getQueryVariable = function(a) {
  return unescape((RegExp("[&?]" + a + "=([^&]+)").exec(location) || ["", ""])[1] || "");
};
var mergeObject = function(a, b) {
  for (var i in b) a[i] = b[i];
  return a;
};
var addMethods = (function(a, b) {
  for (var i in b) a.prototype[i] = b[i];
});
SSH = {};
SSH.idealArea = 15;
SSH.area = 15;
SSH.filter = function(array, callback) {
  var result = [];
  var index = - 1,
      length = array.length,
      value,
      resultLength = 0;
  while (++index < length) {
    value = array[index];
    if ((resultLength < SSH.area) && callback(value, index, array)) {
      result[resultLength] = value;
      resultLength += 1;
    }
  }
  return result;
};
SSH.match = (function(keyword, target) {
  if (keyword === "") return true;
  var keywordList = keyword.split(" ").map((function(a) {
    return RegExp(a, "i");
  }));
  return keywordList.every((function(a) {
    return a.test(target);
  }));
});
SSH.getResults = (function(keyword, reverse) {
  return SSH.filter(SSH.data, (function(i) {
    return SSH.match(keyword, i.searchText)^reverse;
  }));
});
SSH.search = function() {
  var args = arguments[0] !== (void 0) ? arguments[0]: {};
  var $__0 = args,
      keyword = "keyword"in $__0 ? $__0.keyword: SSH.inputElement.value,
      reverse = $__0.reverse;
  var onappendnode = SSH.search.onappendnode || function() {};
  var onfragmentpopulated = SSH.search.onfragmentpopulated || function() {};
  var array = SSH.getResults(keyword, reverse),
      fragment = dom.fragment();
  array.forEach((function(i) {
    onappendnode(i);
    fragment.append(i.node);
  }));
  onfragmentpopulated(fragment, array);
  SSH.containerElement.clear().append(fragment);
};
SSH.search.on = (function(eventString, callback) {
  SSH.search["on" + eventString] = callback;
});
var imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/",
    inputFormElement = dom.query("#inputform"),
    showAllLink = dom("a", {style: "cursor:pointer"}, "show all").on("click", (function(e) {
      e.preventDefault();
      SSH.area = 1000;
      SSH.search();
      SSH.area = SSH.idealArea;
    })),
    linkTemplate = (function(link, text, tags, height) {
      return dom("a", {
        target: "paypal",
        href: link
      }, dom("img", {style: "height:" + height + "px"}), text);
    });
SSH.inputElement = dom.query("#input");
SSH.containerElement = dom.query("#container");
SSH.search.on("appendnode", (function(item) {
  if (!item.imageLoaded) item.node.firstChild.src = item.imageURL, item.imageLoaded = true;
}));
SSH.search.on("fragmentpopulated", (function(fragment, array) {
  if (array.length === SSH.idealArea) fragment.append(showAllLink);
}));
SSH.data = [["aesameev", "Tesla model S 2014", "car", 65], ["caiphooj", "Ford Transit full-size medium-roof long 2015", "van", 86], ["iquokeib", "Ford Econoline extended length cargo 2008-uptodate", "van", 76], ["bohghozu", "Toyota Rav-4 2014-uptodate", "suv", 83], ["ijughaim", "Honda Accord 2012-uptodate", "car", 67], ["cmhoorae", "Toyota Camry 2012-uptodate", "car", 75], ["cheteicu", "Ford Transit Connect short wagon liftgate 2014-uptodate", "van", 85], ["uyahchey", "Ford Fusion 2013-uptodate", "car", 71], ["mquiraep", "Jeep Cherokee 2014-uptodate", "suv", 79], ["ohjesoth", "Toyota Rav-4 2013", "suv", 81], ["shoghopi", "Jeep Grand-Cherokee 2014-uptodate", "suv", 79], ["eifurogo", "Buick Encore 2013-uptodate", "suv", 86], ["oothohki", "Toyota Highlander 2014-uptodate", "suv", 76], ["akiwaeph", "Ford Transit Connect long cargo 2014-uptodate", "van", 80], ["eizivapo", "Ford Transit Connect short cargo 2014-uptodate", "van", 86], ["ahdeisuw", "Ford Transit Connect short wagon 2014-uptodate", "van", 86], ["aexiemab", "Ford Transit Connect long wagon 2014-uptodate", "van", 82], ["ungaizes", "GMC Sierra crew-cab regular-box 2014-uptodate", "pickup", 72], ["gchivait", "Chevrolet Silverado crew-cab regular-box 2014-uptodate", "pickup", 72], ["ichizaix", "Honda Civic sedan 2011-uptodate", "car", 74], ["soocufai", "Dodge Ram Promaster 159 wheelbase, high-roof 2014-uptodate", "van", 86], ["oroocaph", "Dodge Ram Promaster 118 wheelbase, standard-roof 2014-uptodate", "van", 85], ["gothoxox", "Dodge Ram Promaster 136 wheelbase, standard-roof 2014-uptodate", "van", 86], ["aquefaid", "Nissan Murano 2014-uptodate", "suv", 87], ["engeivug", "Mitsubishi Outlander 2014", "suv", 85], ["weephahz", "Kenworth t680 2013-uptodate", "tractor", 126], ["eitoocah", "Peterbilt 579", "tractor", 127], ["kiewiezu", "Freightliner Cascadia Evolution", "tractor", 132], ["ohyedunu", "Nissan NV200 2013-uptodate", "van", 86], ["ynegunoo", "Toyota Prius C 2013-uptodate", "car", 75], ["jahghies", "Subaru XV 2013-uptodate", "suv", 82], ["ohkahroo", "Nissan Pathfinder 2013-uptodate", "suv", 80], ["vquiegee", "Mitsubishi Imiev 2012-uptodate", "car", 98], ["bhrieyal", "Mazda CX-5 2012-uptodate", "suv", 83], ["shashahf", "Kia Rio hatchback 2013-uptodate", "car", 80], ["ahhaevom", "Kia Forte hatchback 2013-uptodate", "car", 80], ["ahzeigah", "Hyundai Santa-Fe 2013-uptodate", "suv", 81], ["highiefi", "Ford Escape 2013-uptodate", "suv", 82], ["ireixein", "Ford C-max 2012-uptodate", "car hatchback", 80], ["ageejadi", "Dodge Dart 2013-uptodate", "car", 73], ["gahpooni", "Chevrolet Orlando 2012-uptodate", "suv", 85], ["eidaveet", "Chevrolet Sonic 2012-uptodate", "car hatchback", 83], ["woongahc", "Chevrolet Spark 2012-uptodate", "car hatchback", 88], ["aeyothee", "Chevrolet Volt 2011-uptodate", "car", 74], ["etaiveid", "Dodge Caravan 2012-uptodate", "van", 80], ["xuxiegig", "Dodge Charger 2011-uptodate", "muscle car", 72], ["ehahbohf", "Dodge Durango 2012-uptodate", "suv", 82], ["ipeeghor", "Fiat 2012-uptodate", "car hatchback", 88], ["ieteking", "Ford Focus 4-door hatchback 2012-uptodate", "car", 81], ["oopofael", "Honda CR-V 2012-uptodate", "suv", 82], ["aikeyaye", "Honda Civic coupe 2012-uptodate", "car", 74], ["ixaepohz", "Hyundai Accent 4-door hatchback 2012-uptodate", "car", 79], ["aiboogoh", "Hyundai Elantra 2012-uptodate", "car", 72], ["peiveelu", "Hyundai Veloster 2012-uptodate", "car", 73], ["chievahm", "Mazda 5 2012-uptodate", "van", 83], ["hoholier", "Mitsubishi RVR 2010-uptodate", "suv", 81], ["jajoodee", "Nissan NV high-roof 2012-uptodate", "van", 89], ["gaicooju", "Nissan NV low-roof 2012-uptodate", "van", 82], ["eriejece", "Scion IQ 2012-uptodate", "car", 97], ["ibathief", "Scion XB 2008-uptodate", "car", 84], ["oleiquai", "Volkswagen Beetle 2012-uptodate", "car", 85], ["pemeiroh", "Volkswagen Jetta 2011-uptodate", "car", 78], ["umohrohz", "Buick Enclave 2008-uptodate", "suv", 82], ["chaepaem", "Buick Rainier 2004-2007", "suv", 83], ["ahnohyai", "Buick Rendez-vous 2004-2007", "suv", 80], ["npbshoci", "Chevrolet Aveo 4-door 2004-2011", "car", 120], ["shooregh", "Chevrolet Aveo 5-door 2004-2011", "car", 90], ["thahhaed", "Chevrolet Camaro 2009-uptodate", "muscle car", 69], ["eesijoth", "Chevrolet Cavalier 2004-2005", "car", 116], ["oohahnuw", "Chevrolet Cobalt 4-door 2007-2009", "car", 108], ["oonijaif", "Chevrolet Cobalt coupe 2007-2009", "car", 115], ["ehohcahk", "Chevrolet Corvette 2006-2013", "car", 90], ["yzathahy", "Chevrolet Cruze 2011-uptodate", "car", 73], ["abeedoon", "Chrysler Aspen 2007-2009", "suv", 84], ["ighohnoh", "Chevrolet Impala police 2005", "car", 80], ["nxietoza", "Chevrolet Impala 2008-2013", "car", 74], ["weeguque", "Chevrolet Malibu 2007", "car", 75], ["ahshozai", "Chevrolet Malibu 2008-uptodate", "car", 74], ["fhshoroo", "Chevrolet Malibu maxx 2007", "car", 80], ["zecishol", "Chevrolet SSR 2004-2006", "car", 77], ["zaipegae", "Chevrolet Express cube 16ft", "cube", 105], ["thijohni", "GMC Savana slash Chevrolet Express cube 13ft", "cube", 105], ["ushohori", "Chevrolet Avalanche 2003-2006", "pickup", 85], ["lpooteel", "Chevrolet Avalanche 2007-2013", "pickup", 82], ["pleewees", "Chevrolet Colorado crew-cab 2004-2012", "pickup", 82], ["laruhohw", "Chevrolet Colorado extended-cab 2004-2012", "pickup", 78], ["vaiwiequ", "Chevrolet Colorado regular 2004-2012", "pickup", 81], ["ijaishan", "Chevrolet S-10 crew-cab 2003-2004", "pickup", 85], ["wpngeith", "Chevrolet S-10 extended-cab 2003-2004", "pickup", 80], ["rtfaevoh", "Chevrolet S-10 regular 2003-2004", "pickup", 82], ["wdeyohng", "Chevrolet S-10 regular long 2003-2004", "pickup", 82], ["eedusohb", "Chevrolet Silverado 3500 crew-cab 2003-2006", "pickup", 82], ["shoozequ", "Chevrolet Silverado 3500 extended-cab long 2003-2006", "pickup", 85], ["rgoochai", "Chevrolet Silverado 3500 regular 2003-2006", "pickup", 86], ["hdrasohc", "Chevrolet Silverado crew-cab 2003-2006", "pickup", 83], ["ihooxiqu", "Chevrolet Silverado extended-cab 2003-2006", "pickup", 85], ["obowoghi", "Chevrolet Silverado extended-cab long 2003-2006", "pickup", 81], ["naiceeka", "Chevrolet Silverado regular long 2003-2006", "pickup", 80], ["ciyohrie", "Chevrolet Silverado regular short 2003-2006", "pickup", 85], ["zohlohvo", "Chevrolet Silverado crew-cab 2007-2013", "pickup", 78], ["hfieghai", "Chevrolet Silverado extended-cab regular 2007-2013", "pickup", 79], ["rosietee", "Chevrolet Silverado extended-cab long 2007-2013", "pickup", 74], ["ohrewoox", "Chevrolet Silverado long 2007-2013", "pickup", 79], ["nohthaeg", "Chevrolet Silverado regular 2007-2013", "pickup", 82], ["sngurahl", "Chevrolet Silverado 3500 crew-cab 2007", "pickup", 80], ["thohseew", "Chevrolet Silverado 3500 extended-cab long 2007", "pickup", 85], ["sphohbai", "Chevrolet Silverado 3500 regular 2007", "pickup", 87], ["thaehaqu", "Chevrolet Silverado crew-cab 2007", "pickup", 81], ["quahliej", "Chevrolet Silverado extended-cab 2007", "pickup", 87], ["vtteiqui", "Chevrolet Silverado extended-cab long 2007", "pickup", 82], ["dlegecha", "Chevrolet Silverado regular long 2007", "pickup", 80], ["ixeehahh", "Chevrolet Silverado regular short 2007", "pickup", 86], ["toonooth", "Chevrolet Astro cargo swing-door 2003-2005", "van", 94], ["guraiche", "Chevrolet Astro swing-door 2003-2005", "van", 92], ["pohmaemu", "Chevrolet Astro tailgate 2003-2005", "van", 94], ["knyvahch", "Chevrolet Blazer 2-door 2004-2005", "suv", 80], ["igefaemu", "Chevrolet Blazer 4-door 2004-2005", "suv", 80], ["quisizee", "Chevrolet Equinox 2004-2009", "suv", 87], ["aengawoo", "Chevrolet Equinox 2010-uptodate", "suv", 86], ["ookijadi", "Chevrolet Express long 2003-uptodate", "van", 87], ["sajeshiw", "Chevrolet Express long slide-door 2003-uptodate", "van", 85], ["iepieyoo", "Chevrolet Express long slide-door cargo 2003-uptodate", "van", 82], ["kothepho", "Chevrolet Express regular 2003-uptodate", "van", 86], ["heenohch", "Chevrolet Express regular cargo 2003-uptodate", "van", 90], ["ajikaepi", "Chevrolet Express regular slide-door 2003-uptodate", "van", 87], ["zodienoh", "Chevrolet Express regular slide-door cargo 2003-uptodate", "van", 88], ["joovaesi", "Chevrolet HHR 2007-2011", "suv", 84], ["eezohzax", "Chevrolet HHR panel 2007-2011", "suv", 82], ["mohijohr", "Chevrolet Suburban 2008-uptodate", "suv", 83], ["yrmiengo", "Chevrolet Tahoe 2007-uptodate", "suv", 86], ["ijeefief", "Chevrolet Tracker 2004", "suv", 89], ["geeragha", "Chevrolet Trailblazer extended-length 2004-2006", "suv", 84], ["zghohgie", "Chevrolet Trailblazer LS 2004-2009", "suv", 91], ["olieghae", "Chevrolet Traverse 2009-uptodate", "suv", 81], ["hepheish", "Chevrolet Uplander ext 2005-2009", "van", 83], ["iwohjoon", "Chevrolet Venture ext 2003-2004", "van", 83], ["zohbahng", "Chevrolet Venture regular 2003-2004", "van", 80], ["oxaequee", "Chrysler PT-Cruiser 2004-2010", "car", 81], ["airiezie", "Chrysler PT-Cruiser panel 2007-uptodate", "car", 80], ["haipahji", "Chrysler Town and Country 2003-2007", "van", 79], ["ziedeife", "Chrysler Town and Country 2008-uptodate", "van", 80], ["thichohd", "Ford Econoline cube 15ft", "cube", 97], ["aboonagh", "Dodge Avenger 2008-uptodate", "car", 74], ["geegokee", "Dodge Caliber 2007-uptodate", "car", 83], ["hdgeefei", "Dodge Challenger 2008-uptodate", "car", 69], ["dahmahvo", "Dodge Charger police 2007-uptodate", "car", 78], ["ohdizije", "Dodge Magnum police 2006-2009", "car", 76], ["jolilaqu", "Dodge SRT-4 2004-2006", "car", 76], ["kthohhei", "Dodge Dakota crew-cab 2004", "pickup", 110], ["ohghaidu", "Dodge Dakota quad-cab 2004", "pickup", 111], ["eitheing", "Dodge Dakota regular 2004", "pickup", 116], ["eenikeic", "Dodge Dakota crew-cab 2005-2011", "pickup", 76], ["oocaecoo", "Dodge Dakota quad-cab 2005-2011", "pickup", 79], ["kshahghu", "Dodge Ram 1500 quad-cab 2003-2008", "pickup", 80], ["ahquadum", "Dodge Ram 1500 regular long 2003-2008", "pickup", 82], ["igaehein", "Dodge Ram 1500 regular short 2003-2008", "pickup", 86], ["gavahmoh", "Dodge Ram 3500 quad-cab 2003-2008", "pickup", 75], ["xrunaema", "Dodge Ram 3500 resistol 2008", "pickup", 75], ["eibaphie", "Dodge Ram mega-cab 2007-2008", "pickup", 78], ["ekeeshai", "Dodge Ram 1500 crew-cab 2009-uptodate", "pickup", 78], ["chutieph", "Dodge Ram 1500 crew-cab toolbox 2009-uptodate", "pickup", 80], ["eephoocu", "Dodge Ram 1500 quad-cab 2009-uptodate", "pickup", 78], ["aereisap", "Dodge Ram 1500 regular long 2009-uptodate", "pickup", 79], ["usaeghuh", "Dodge Ram 1500 regular short 2009-uptodate", "pickup", 80], ["waghaici", "Dodge Caliber 2007-uptodate", "car", 83], ["ahzeenge", "Dodge Grand Caravan 2003-2007", "van", 81], ["opiequim", "Dodge Caravan regular 2003-2006", "van", 87], ["uwaihaex", "Dodge Grand Caravan 2008-uptodate", "van", 80], ["gzthipai", "Dodge Durango 2003", "suv", 122], ["eingiero", "Dodge Durango 2004-2009", "suv", 84], ["cwepheem", "Dodge Journey 2009-uptodate", "suv", 80], ["zeneemez", "Dodge Nitro 2007-2009", "suv", 86], ["efiehahg", "Dodge Ram 2003", "pickup", 85], ["aitojief", "Dodge Ram short 2003", "pickup", 87], ["zooforai", "Dodge Sprinter regular 2004-2007", "van", 97], ["xaiquool", "Dodge Sprinter regular high-roof 2004-2007", "van", 102], ["udohshaw", "Dodge Sprinter short 2004-2007", "van", 101], ["eibahgei", "Dodge Sprinter cargo 144 high-roof window 2008-uptodate", "van", 97], ["odebeing", "Dodge Sprinter cargo 144 window 2008-uptodate", "van", 89], ["teesohyi", "Dodge Sprinter cargo 170 2008-uptodate", "van", 93], ["oceezazu", "Dodge Sprinter C extended-roof 170 2008-uptodate", "van", 86], ["ohmodoka", "Dodge Sprinter chassis 144 2008-uptodate", "van", 87], ["laxoorei", "Dodge Sprinter chassis 170 2008-uptodate", "van", 76], ["fngiefix", "Dodge Sprinter C mega-roof 170 2008-uptodate", "van", 93], ["sahbohsh", "Dodge Sprinter passenger 144 2008-uptodate", "van", 87], ["xesosohd", "Dodge Sprinter passenger 144 high-roof 2008-uptodate", "van", 96], ["aigheshu", "Dodge Sprinter passenger 170 2008-uptodate", "van", 89], ["oowahfej", "Dodge Sprinter cargo 144 2008-uptodate", "van", 87], ["ahshishi", "Dodge Sprinter cargo 144 high-roof 2008-uptodate", "van", 93], ["opulohyu", "Mercedes Sprinter cargo 144 high-roof window 2008-uptodate", "van", 97], ["egheweix", "Mercedes Sprinter cargo 144 window 2008-uptodate", "van", 89], ["oolachop", "Mercedes Sprinter cargo 170 2008-uptodate", "van", 93], ["quaehaep", "Mercedes Sprinter C extended-roof 170 2008-uptodate", "van", 86], ["ooyeegho", "Mercedes Sprinter chassis 144 2008-uptodate", "van", 87], ["ihakiepe", "Mercedes Sprinter chassis 170 2008-uptodate", "van", 76], ["venguyee", "Mercedes Sprinter C mega-roof 170 2008-uptodate", "van", 93], ["icekahmi", "Mercedes Sprinter passenger 144 2008-uptodate", "van", 87], ["iemeixai", "Mercedes Sprinter passenger 144 high-roof 2008-uptodate", "van", 96], ["eiyaicha", "Mercedes Sprinter passenger 170 2008-uptodate", "van", 89], ["athifito", "Mercedes Sprinter cargo 144 2008-uptodate", "van", 87], ["ingaisai", "Mercedes Sprinter cargo 144 high-roof 2008-uptodate", "van", 93], ["ujafisei", "Ford Fiesta hatchback 2010-uptodate", "car", 86], ["xghocoor", "Ford Flex 2009-uptodate", "crossover", 82], ["fveeghie", "Ford Focus 4-door 2008-2010", "car", 80], ["iefohlih", "Ford Focus 4-door sedan 2010-uptodate", "car", 80], ["aibeigie", "Ford Focus coupe 2008-uptodate", "car", 79], ["ofaixaca", "Ford Focus wagon 2003-2007", "car", 81], ["eejiewof", "Ford Freestyle 2005-2007", "crossover", 85], ["ietoomie", "Ford Fusion 2007-2009", "car", 73], ["hzyahpaj", "Ford Fusion 2010-2012", "car", 75], ["oomaiqua", "Ford Mustang 2004", "muscle car", 69], ["jaikaech", "Ford Mustang 2005-uptodate", "muscle car", 73], ["eixivoko", "Ford Focus SVT 2003-2006", "car", 92], ["ohhaishu", "Ford Taurus 2008-2009", "car", 77], ["ychashai", "Ford Taurus 2010-uptodate", "car", 78], ["oteeluyu", "Ford Taurus X 2008-2009", "car", 82], ["izobetho", "Ford Explorer sport-trac 2003-uptodate", "suv", 86], ["zahshote", "Ford F-150 regular-cab 6 5ft 2004-2008", "pickup", 81], ["giephoce", "Ford F-150 regular-cab 8ft 2004-2008", "pickup", 79], ["ymjtveeh", "Ford F-150 regular-cab F-6 5ft 2004-2008", "pickup", 84], ["ahsohfae", "Ford F-150 supercab F-6 5ft 2004-2008", "pickup", 80], ["cheisais", "Ford F-150 supercab S-5 5ft 2004-2008", "pickup", 80], ["aexahrun", "Ford F-150 supercab S-6 5ft 2004-2008", "pickup", 78], ["soofoomi", "Ford F-150 supercab S 8ft 2004-2008", "pickup", 75], ["thaeseif", "Ford F-150 supercrew 5 5ft 2004-2008", "pickup", 74], ["xahducai", "Ford F-250 slash F-350 supercab 8ft 2004-2008", "pickup", 81], ["ahpohlav", "Ford F-250 slash F-350 supercab 8ft 2008", "pickup", 85], ["eeyushoo", "Ford F-250 slash F-350 supercrew 8ft 2004-2008", "pickup", 80], ["eengaloo", "Ford F-250 slash F-350 supercrew 8ft 2008", "pickup", 79], ["aepheech", "Ford F-250 slash F-350 work 8ft 2004-2008", "pickup", 82], ["aiphucha", "Ford F-250 slash F-350 work 8ft 2008", "pickup", 80], ["theimoov", "Ford F-150 crew-cab 5 5ft 2009-uptodate", "pickup", 73], ["quutheth", "Ford F-150 crew-cab 6 5ft 2009-uptodate", "pickup", 72], ["jiexeero", "Ford F-150 regular-cab long b 2009-uptodate", "pickup", 74], ["xbzelahn", "Ford F-150 regular-cab short b 2009-uptodate", "pickup", 82], ["avoleita", "Ford F-150 supercab 5 5ft 2009-uptodate", "pickup", 75], ["voophigu", "Ford F-150 supercab 8ft 2009-uptodate", "pickup", 73], ["pdiepunu", "Ford F-150 supercab F-6 5ft 2009-uptodate", "pickup", 74], ["afiseepo", "Ford Ranger regular-cab 2004-2011", "pickup", 85], ["dxmeikeh", "Ford Ranger supercab flareside 2004-2011", "pickup", 86], ["ijaefohm", "Ford Ranger supercab 2004-2011", "pickup", 80], ["itahceek", "Ford Excursion 2004-2005", "suv", 88], ["ozeegesi", "Ford Econoline 2004-2007", "van", 83], ["eizumoow", "Ford Econoline chateau 2004-2007", "van", 85], ["ohquohzi", "Ford Econoline extended-length 2004-2007", "van", 78], ["agoghipe", "Ford Econoline slide-door 2004-2007", "van", 85], ["eedatogo", "Ford Econoline 2008-uptodate", "van", 84], ["iquaphei", "Ford Econoline chateau 2008-uptodate", "van", 85], ["ainekedu", "Ford Econoline extended-length 2008-uptodate", "van", 79], ["xiethier", "Ford Econoline slide-door 2008-uptodate", "van", 88], ["dkiquavo", "Ford Edge 2007-2010", "suv", 84], ["aediechi", "Ford Edge 2011-uptodate", "suv", 84], ["ahcakiex", "Ford Escape 2004-2007", "suv", 84], ["kukophie", "Ford Escape 2008-2012", "suv", 87], ["riepheze", "Ford Expedition 2004-2006", "suv", 88], ["yuchefud", "Ford Expedition 2008-uptodate", "suv", 86], ["ushodeig", "Ford Expedition el 2008-uptodate", "suv", 83], ["chohyeeh", "Ford Explorer 2003-2010", "suv", 89], ["quaikuho", "Ford Explorer 2011-uptodate", "suv", 83], ["aebeenov", "Ford Explorer sport-trac 2003-uptodate", "pickup", 86], ["cievaezo", "Ford Freestar 2004-2007", "van", 85], ["equaeshi", "Ford Freestyle 2005-2007", "suv", 85], ["siejaeth", "Ford Taurus X 2008-2009", "suv", 82], ["eehiesee", "Ford Transit Connect 2010-2013", "van", 88], ["ekapohza", "Ford Windstar 2003", "van", 82], ["lahkeish", "GMC Canyon crew-cab 2004-2012", "pickup", 82], ["ailahshu", "GMC Canyon extended-cab 2004-2012", "pickup", 75], ["iziebool", "GMC Canyon regular-cab 2004-2012", "pickup", 80], ["aehothee", "GMC Sierra 3500HD 2007-2013", "pickup", 76], ["fhohieko", "GMC Sierra crew-cab 2007-2013", "pickup", 78], ["poreeliy", "GMC Sierra ext-long 2007-2013", "pickup", 79], ["iengeica", "GMC Sierra extended regular 2007-2013", "pickup", 81], ["bilaivah", "GMC Sierra regular 2007-2013", "pickup", 83], ["tiegeifo", "GMC Sierra regular long 2007-2013", "pickup", 78], ["ohgheshe", "Sonoma slash S-10 crew-cab 2003", "pickup", 82], ["eideegip", "Sonoma slash S-10 extended-cab 2003", "pickup", 79], ["ojeishai", "Sonoma slash S-10 extended sport-side 2003", "pickup", 80], ["giechiet", "Sonoma slash S-10 regular 2003", "pickup", 82], ["azaiyaib", "Sonoma slash S-10 regular long 2003", "pickup", 80], ["ckeisahr", "GMC Sierra crew-cab 2003-2007", "pickup", 79], ["ohzaedoo", "GMC Sierra crew-cab long 2003-2007", "pickup", 76], ["diphenai", "GMC Sierra crew-cab sport-side 2003-2006", "pickup", 76], ["uyebonge", "GMC Sierra extended-cab 2003-2006", "pickup", 80], ["sngaingo", "GMC Sierra extended-cab sport-side 2003-2006", "pickup", 79], ["eefohtil", "GMC Sierra ext-long 2007", "pickup", 78], ["ahngieta", "GMC Sierra regular 2003-2007", "pickup", 86], ["aethovee", "GMC Sierra regular long 2003-2007", "pickup", 82], ["ahpepeje", "GMC Sierra regular sport-side 2003-2007", "pickup", 86], ["odeibeey", "GMC Acadia 2007-uptodate", "suv", 81], ["cnubieme", "GMC Envoy 2003-2009", "suv", 84], ["xkdayiri", "GMC Envoy Denali 2005-2009", "suv", 81], ["eefaedai", "GMC Envoy XL 2004-2006", "suv", 81], ["oohaeziv", "GMC Terrain 2010-uptodate", "suv", 85], ["ljnngiew", "GMC Yukon slash Tahoe 2003-2006", "suv", 86], ["ohxaevoh", "GMC Yukon slash Tahoe 2007-uptodate", "suv", 87], ["cailihus", "GMC Yukon XL slash Suburban 2003-2006", "suv", 81], ["ohchaebu", "GMC Yukon XL slash Suburban 2007-uptodate", "suv", 82], ["thaigeit", "Safari slash Astro cargo swing-door 2003-2005", "van", 93], ["ohphaipi", "Safari slash Astro swing-door 2003-2005", "van", 97], ["yphoophe", "Safari slash Astro tailgate 2003-2005", "van", 93], ["aefiyohd", "GMC Savana slash Chevrolet Express long 2003-uptodate", "van", 86], ["ieghaeji", "GMC Savana slash Chevrolet Express long slide-door 2003-uptodate", "van", 85], ["oraizohm", "GMC Savana slash Chevrolet Express regular 2003-uptodate", "van", 91], ["daidotoo", "GMC Savana slash Chevrolet Express regular slide-door 2003-uptodate", "van", 88], ["shaekaph", "Honda Accord coupe 2008-uptodate", "car", 71], ["zohsoowa", "Honda Accord crosstour 2010-uptodate", "car", 74], ["ooviquie", "Honda Civic coupe 2004-2005", "car", 75], ["tieteise", "Honda Civic coupe 2006-2011", "car", 78], ["alaebica", "Honda Civic sedan 2006-2010", "car", 75], ["phohyies", "Honda Civic SI 2003-2005", "car", 82], ["pohcevah", "Honda Civic SI 2006-2007", "car", 81], ["erecaipu", "Honda CR-Z 2011-uptodate", "car", 75], ["aevetied", "Honda Element 2003-2007", "suv", 88], ["zeequome", "Honda Fit 2007-2008", "car", 82], ["aeteepol", "Honda Fit 2009-uptodate", "car", 83], ["kainahdi", "Honda Insight 2010-uptodate", "car", 78], ["eitheene", "Honda S2000 2007-uptodate", "car", 73], ["aseecaim", "Honda Ridgeline 2006-uptodate", "pickup", 85], ["hawahgae", "Honda CR-V 2007-2011", "suv", 81], ["mohveeci", "Honda CR-V 2004-2006", "suv", 86], ["ychiehoh", "Honda Element 2003-2007", "suv", 88], ["chelahye", "Honda Element 2008-2011", "suv", 89], ["shohcool", "Honda Odyssey 2004", "van", 87], ["uyeehied", "Honda Odyssey 2005-2010", "van", 86], ["kahpailo", "Honda Odyssey 2011-uptodate", "van", 78], ["emiesooz", "Honda Pilot 2003-2008", "suv", 86], ["shohgoxe", "Honda Pilot 2009-uptodate", "suv", 82], ["mshophei", "Hummer H2 2003-2009", "suv", 89], ["eineewip", "Hummer H3 2006-2009", "suv", 92], ["poteijap", "Hyundai Accent 2-door 2004-2005", "car", 80], ["vevayohn", "Hyundai Accent 2-door hatchback 2008-2011", "car", 81], ["riexuquu", "Hyundai Accent 4-door 2004-2005", "car", 78], ["aepahfug", "Hyundai Accent 2006-2011", "car", 81], ["aiquiepu", "Hyundai Elantra 4-door hatchback 2004-2008", "car", 111], ["aichohle", "Hyundai Elantra sedan 2006-2011", "car", 78], ["owighoor", "Hyundai Genesis coupe 2009-uptodate", "car", 71], ["shimahxi", "Hyundai Tiburon 2004-2007", "car", 74], ["angeghae", "Hyundai Tiburon 2008", "car", 74], ["gohquoxa", "Hyundai Entourage 2007-2009", "van", 80], ["eenudeng", "Hyundai Santa-Fe 2003-2006", "suv", 85], ["oniethoh", "Hyundai Santa-Fe 2007-2012", "suv", 87], ["jquohsee", "Hyundai Tucson 2005-2009", "suv", 80], ["yoghahdo", "Hyundai Tucson 2010-uptodate", "suv", 87], ["iemahgho", "Hyundai Veracruz 2008-uptodate", "suv", 86], ["aigaethe", "Jeep Commander 2006-2011", "suv", 86], ["aexahsei", "Jeep Compass 2007-uptodate", "suv", 82], ["cailaero", "Jeep Grand-Cherokee 2003-2004", "suv", 84], ["edepaefa", "Jeep Grand-Cherokee 2005-2010", "suv", 82], ["ujexoqui", "Jeep Grand-Cherokee 2011-2013", "suv", 85], ["shuthana", "Jeep Liberty limited-edition 2003-2007", "suv", 86], ["eiquahth", "Jeep Liberty Renegade 2003-2007", "suv", 93], ["aenaewie", "Jeep Liberty sport 2003-2007", "suv", 89], ["tumaewoo", "Jeep Liberty 2008-2009", "suv", 90], ["iesekaeg", "Jeep Patriot 2007-uptodate", "suv", 87], ["ogahphoj", "Jeep TJ 2004-2006", "suv", 92], ["hangongu", "Jeep TJ unlimited 2005-2009", "suv", 87], ["cilaezox", "Jeep Wrangler 2-door 2007-uptodate", "suv", 87], ["wsoovagu", "Jeep Wrangler 4-door 2007-uptodate", "suv", 85], ["ohmuhiez", "Kia Forte 2010-uptodate", "car", 75], ["phahquom", "Kia Koup 2010-uptodate", "car", 76], ["zfwthoye", "Kia Rio 2006-2011", "car", 86], ["giepoobi", "Kia Rondo 2007-uptodate", "car", 86], ["thegaech", "Kia Soul 2010-2013", "car", 87], ["ahgetihu", "Kia Spectra 2007-2009", "car", 76], ["eenaichi", "Kia Borrego 2009-uptodate", "suv", 81], ["obahdieb", "Kia Sedona 2004-2005", "suv", 82], ["baingizu", "Kia Sedona 2006-2012", "suv", 82], ["eijahzee", "Kia Sorento 2004-2009", "suv", 87], ["quuyeegh", "Kia Sorento 2010-uptodate", "suv", 81], ["ahfituci", "Kia Sportage 2005-2006", "suv", 87], ["wooxeegi", "Kia Sportage 2007-uptodate", "suv", 83], ["thilooja", "Kia Sportage 2011-uptodate", "suv", 83], ["gshoosoh", "Lincoln Navigator L 2008-uptodate", "suv", 81], ["eefepohj", "Mazda 2 2011-uptodate", "car", 84], ["hangiebe", "Mazda 3 2004-2009", "car", 80], ["rnoothie", "Mazda 3 2010-2013", "car", 79], ["aekoceis", "Mazda 3 sedan 2010-2013", "car", 82], ["eedoxeet", "Mazda MX5 Miata 2008-uptodate", "car", 70], ["cheixiem", "Mazda Protege 5 2003", "car", 75], ["xmthuyoo", "Mazda RX-8 2008-uptodate", "car", 74], ["ohtheebi", "Mazda Speed3 2010-uptodate", "car", 78], ["ooneibee", "Mazda B-Series 2004-2009", "pickup", 82], ["nefeicop", "Mazda 5 2006-2011", "van", 86], ["xghootee", "Mazda CX-7 2007-2012", "suv", 81], ["amohnavo", "Mazda CX-9 2007-uptodate", "suv", 80], ["choseefo", "Mazda MPV 2003-2006", "van", 84], ["uyeequuw", "Mazda Tribute 2004-2005", "suv", 88], ["nquaecer", "Mazda Tribute 2006", "suv", 87], ["reishoga", "Mazda Tribute 2007-2011", "suv", 85], ["ohshitie", "Mini Clubman 2008-uptodate", "car", 81], ["ahghoolu", "Mini Cooper 2004-uptodate", "car", 99], ["ipohsegu", "Mitsubishi Lancer evolution 2003-uptodate", "car", 88], ["tkooxahp", "Mitsubishi Lancer 2008-uptodate", "car", 76], ["fxmsaefu", "Mitsubishi Raider crew-cab 2006-2009", "pickup", 79], ["chahkati", "Mitsubishi Raider extended-cab 2006-2009", "pickup", 80], ["ooleetha", "Mitsubishi Endeavor 2004-2009", "suv", 87], ["xaegheiy", "Mitsubishi Montero 2003-2006", "suv", 87], ["aiwiteke", "Mitsubishi Montero sport 2003-2004", "suv", 86], ["eiyipeif", "Mitsubishi Outlander 2004-2006", "suv", 85], ["oonohche", "Mitsubishi Outlander 2007-2012", "suv", 86], ["gjieghuh", "Nissan Cube 2009-uptodate", "car", 94], ["xphahnah", "Nissan Versa 2007-2013", "car", 81], ["dxeeried", "Nissan Frontier extended-cab 2003-2004", "pickup", 113], ["aichipie", "Nissan Frontier regular-cab 2003-2004", "pickup", 114], ["paiyeipo", "Nissan Frontier crew-cab 2005-uptodate", "pickup", 83], ["iboophop", "Nissan Frontier king-cab 2005-uptodate", "pickup", 83], ["gahxeegh", "Nissan Titan crew-cab 2004-uptodate", "pickup", 82], ["fgzahniz", "Nissan Titan king-cab 2004-uptodate", "pickup", 84], ["mohpooko", "Nissan Armada 2004-uptodate", "suv", 83], ["eizepoma", "Nissan Juke 2011-uptodate", "suv", 80], ["ojielati", "Nissan Murano 2003-2013", "suv", 85], ["oyaimahm", "Nissan Pathfinder 2003-2004", "suv", 124], ["aijacoog", "Nissan Pathfinder 2005-2012", "suv", 88], ["uduweixi", "Nissan Quest 2004-2010", "van", 86], ["zrohcaem", "Nissan Quest 2011-uptodate", "van", 83], ["ooditaid", "Nissan Xterra 2003-2004", "suv", 89], ["niweilah", "Nissan Xterra 2005-uptodate", "suv", 89], ["bliquaez", "Nissan Rogue X-Trail 2008-uptodate", "suv", 84], ["aethufae", "Oldsmobile Bravada 2004", "suv", 83], ["tnxlaete", "Oldsmobile Silhouette 2004", "van", 83], ["echeiquo", "Chevrolet Impala 2005", "car", 74], ["achohsix", "Chevrolet Impala police 2006-uptodate", "car", 80], ["eewuwaer", "Dodge Charger 2007-uptodate", "car", 73], ["waengahd", "Dodge Magnum 2006-2009", "car", 71], ["chafooxo", "Ford Crown Victoria slash Grand Marquis police 2005-2011", "car", 79], ["sthejoox", "Ford Crown Victoria slash Grand Marquis 2005-2011", "car", 72], ["vmiefuch", "Pontiac G6 2007", "car", 114], ["tsaethah", "Pontiac G6 2008-2009", "car", 117], ["laexaela", "Pontiac GTO 2005-2006", "car", 74], ["neeputhi", "Pontiac Solstice 2007-2009", "car", 73], ["shigabae", "Pontiac Sunfire 2004-2005", "car", 74], ["quoopeem", "Pontiac Vibe 2004-2008", "car", 84], ["eishahmu", "Pontiac Vibe 2009-uptodate", "car", 80], ["oowiciga", "Pontiac Wave 4-door canadian 2004-2006", "car", 117], ["lafohree", "Pontiac Wave 5-door canadian 2004-2006", "car", 91], ["ahlohvei", "Pontiac Aztek 2004-2005", "suv", 80], ["phemooxe", "Pontiac Montana 2006-2009", "van", 82], ["phohrahs", "Pontiac Montana extended 2004-2005", "van", 82], ["gsenucoh", "Pontiac Montana regular 2004-2005", "van", 88], ["hwaetash", "Pontiac SV6 2006", "van", 82], ["ienithoo", "Pontiac Torrent 2007-2009", "suv", 85], ["neewoyov", "Saturn Astra 2008-2009", "car", 79], ["ukeefiel", "Saturn Ion 2003-2007", "car", 77], ["ahmeitah", "Saturn Sky 2007-2009", "car", 78], ["ujagahng", "Saturn Outlook 2007-2009", "suv", 82], ["haebaeyu", "Saturn Relay 2006-2007", "van", 83], ["sophaebo", "Saturn Vue 2003-2007", "suv", 124], ["vzoosaif", "Saturn Vue 2008-2009", "suv", 85], ["geesheng", "Smart Fortwo 2006-2007", "car", 111], ["jaishuko", "Smart Fortwo 2008-uptodate", "car", 102], ["shukisae", "Subaru Baja sport 2004-2006", "car pickup", 82], ["sieghawu", "Subaru Impreza 4-door hatchback 2008-uptodate", "car", 79], ["hivohjim", "Subaru Impreza sedan 2008-uptodate", "car", 75], ["lkzaetah", "Subaru Impreza sedan WRX 2008-uptodate", "car", 75], ["xabohyuw", "Subaru Impreza wagon 2004-2007", "car", 79], ["leivipoo", "Subaru Impreza WRX 4-door hatchback 2008-uptodate", "car", 79], ["ieshaehe", "Subaru Impreza WRX 2004-2007", "car", 77], ["ceicufah", "Subaru Impreza WRX STI 2008-uptodate", "car", 80], ["quoowooh", "Subaru Outback 2006-2009", "car", 76], ["syooghoo", "Subaru Outback 2010-uptodate", "car", 83], ["lyohquus", "Subaru Outback sport 2006-2009", "car", 82], ["thupecei", "Subaru B9 Tribeca 2006-2007", "suv", 85], ["fajuveek", "Subaru Tribeca 2008-uptodate", "suv", 85], ["phowisho", "Subaru Forester 2004-2008", "suv", 84], ["wdzeekox", "Subaru Forester 2009-2013", "suv", 87], ["quivange", "Suzuki Aerio 2004-2007", "car", 123], ["ohmaisie", "Suzuki Swift 5-door 2004-2011", "car", 130], ["shooxahy", "Suzuki SX4 2007-uptodate", "car", 83], ["eideiche", "Suzuki Equator 6ft box 2009-uptodate", "pickup", 78], ["eigheefo", "Suzuki Equator crew-cab 6ft box 2009-uptodate", "pickup", 76], ["oshaivee", "Suzuki Equator crew-cab 2009-uptodate", "pickup", 78], ["oorahngo", "Suzuki Grand Vitara 2004-2005", "suv", 88], ["tohvohlo", "Suzuki Grand Vitara 2006-uptodate", "suv", 92], ["twsheepa", "Suzuki Vitara convertible 2004", "pickup", 97], ["gooquoze", "Suzuki XL-7 2004-2006", "van", 84], ["vaxeshes", "Suzuki XL-7 2007-2009", "van", 86], ["thahmohc", "Scion XA 2004-2007", "car", 126], ["saechaix", "Toyota Echo 2-door coupe 2004-2005", "car", 85], ["phemohcu", "Toyota Echo 4-door 2004-2005", "car", 132], ["aipohkei", "Toyota Echo 2003-2005", "car", 132], ["uxooxagh", "Toyota Matrix 2004-2008", "car", 84], ["yahnaego", "Toyota Matrix 2009-uptodate", "car", 85], ["ooyohnot", "Toyota Prius 2004-2009", "car", 86], ["iedeexie", "Toyota Prius 2010-uptodate", "car", 80], ["eiciquaz", "Toyota Venza 2009-uptodate", "suv", 79], ["ievogase", "Toyota Yaris 2-door 2006-uptodate", "car", 78], ["aethakoo", "Toyota Yaris 4-door hatchback 2006-uptodate", "car", 80], ["feteeghu", "Toyota Yaris sedan 2008-uptodate", "car", 75], ["ahaegaco", "Toyota Tacoma crew-cab 2003-2004", "pickup", 118], ["bapahpae", "Toyota Tacoma access-cab 2005-uptodate", "pickup", 75], ["zoozagie", "Toyota Tacoma crew-cab 2005-uptodate", "pickup", 75], ["leengael", "Toyota Tundra 2003", "pickup", 114], ["nadagaqu", "Toyota Tundra regular 2003", "pickup", 117], ["upureejo", "Toyota Tundra access-cab 2004-2006", "pickup", 82], ["eduphaex", "Toyota Tundra crew-cab 2004-2006", "pickup", 80], ["chiekaif", "Toyota Tundra regular-cab 2004-2006", "pickup", 78], ["ooroodek", "Toyota Tundra crew-cab 2007-2013", "pickup", 78], ["eeyuquud", "Toyota Tundra crew-cab long 2007-2013", "pickup", 73], ["ifohrexe", "Toyota Tundra crewmax 2008-2013", "pickup", 76], ["jaisieth", "Toyota Tundra regular-cab long 2007-2013", "pickup", 76], ["ciphievu", "Toyota Tundra regular-cab short 2007-2013", "pickup", 76], ["thijebaf", "Scion XB slash BB 2004-2007", "car", 129], ["iezephoo", "Toyota 4Runner 2004-2009", "suv", 87], ["muhephoc", "Toyota 4Runner 2010-uptodate", "suv", 81], ["veichere", "Toyota FJ-Cruiser 2007-uptodate", "suv", 86], ["daefaela", "Toyota Highlander 2003-2007", "suv", 82], ["iecewohl", "Toyota Highlander 2008-2013", "suv", 82], ["enengiwo", "Toyota Rav-4 2003-2005", "suv", 88], ["pheevohp", "Toyota Rav-4 2006-2012", "suv", 87], ["izaelohm", "Toyota Sequoia 2003-2008", "suv", 85], ["wrveewob", "Toyota Sequoia 2009-uptodate", "suv", 81], ["olahiede", "Toyota Sienna 2004-2010", "van", 83], ["fasooyap", "Toyota Sienna 2011-uptodate", "van", 82], ["umifijic", "Volkswagen Golf 2003-uptodate", "car", 78], ["eimoohae", "Volkswagen Jetta 2007-2010", "car", 79], ["teehinit", "Volkswagen New-Beetle 2003-2011", "car", 86], ["aihaevoo", "Volkswagen Rabbit GTI 2007-2009", "car", 77], ["cfutaipi", "Volkswagen Routan 2009-2012", "van", 82], ["iemeeque", "Volkswagen Tiguan 2009-uptodate", "suv", 85], ["oongaiqu", "Volkswagen Touareg 2004-2010", "suv", 83], ["epieleiz", "Freightliner Argosy day-cab 2001-2006", "tractor truck", 152], ["eemiketh", "Freightliner Argosy medium-roof 2001-2006", "tractor truck", 147], ["asahgaiz", "Freightliner Argosy raised-roof 2001-2006", "tractor truck", 153], ["agaegees", "Freightliner Cascadia", "tractor truck", 131], ["veireenu", "Freightliner Columbia day-cab 2004-uptodate", "tractor truck", 111], ["vaijeeta", "Freightliner Columbia day-cab deflector 2004-uptodate", "tractor truck", 127], ["aphiengi", "Freightliner Columbia medium-roof 2004-uptodate", "tractor truck", 132], ["aimoopai", "Freightliner Columbia raised-roof 2004-uptodate", "tractor truck", 134], ["iewielae", "Freightliner Coronado day-cab 2004-uptodate", "tractor truck", 153], ["chievoof", "Freightliner Coronado medium-roof 2004-uptodate", "tractor truck", 129], ["eidozeih", "Freightliner Coronado raised-roof 2004-uptodate", "tractor truck", 133], ["elewiejo", "Freightliner M2 26in extended-cab 2003-uptodate", "tractor truck", 129], ["ahghaevi", "Freightliner M2 48in crew-cab 2003-uptodate", "tractor truck", 132], ["aiparome", "Freightliner M2 day-cab 2003-uptodate", "tractor truck", 133], ["tbahwosh", "GMC Topkick C4500 slash C5500", "tractor truck", 106], ["quieghil", "GMC T-Series T7500", "tractor truck", 108], ["ahgoolee", "Hino FA1517 2008-2009", "tractor truck", 86], ["icuquiem", "Hino Low-Profile 258 2009", "tractor truck", 103], ["ahviexae", "International 8500 regular", "tractor truck", 144], ["denemiem", "International 9200i", "tractor truck", 143], ["eikohyai", "International 9200i 9400i high-roof", "tractor truck", 141], ["pghighai", "International 9200i 9400i low-roof", "tractor truck", 121], ["aiseiwoh", "International 9200i deflector", "tractor truck", 149], ["upaiweyu", "International 9900i sleeper high-roof", "tractor truck", 144], ["oophethu", "International 9900i sleeper medium-roof", "tractor truck", 131], ["faicadoo", "International 9900ix deflector", "tractor truck", 179], ["rogahxei", "International 9900ix regular", "tractor truck", 146], ["chemevie", "International CF-Series", "tractor truck", 104], ["zebahxok", "International CXT 2006", "tractor truck", 116], ["njereibe", "International Lonestar", "tractor truck", 124], ["oofeethi", "Kenworth T600 sleeper 2004-uptodate", "tractor truck", 142], ["leexeepi", "Kenworth T800 deflector 2004-uptodate", "tractor truck", 155], ["eechiewi", "Kenworth T800 regular-hood extended-cab 2004-uptodate", "tractor truck", 138], ["ohdahtei", "Kenworth T800 sleeper 2004-uptodate", "tractor truck", 124], ["eedaphil", "Kenworth T2000 uptodate", "tractor truck", 140], ["aechieve", "Kenworth W900 sleeper 2004-uptodate", "tractor truck", 137], ["yxixohze", "Mack CHN603 day-cab", "tractor truck", 147], ["kuquebep", "Mack Vision day-cab", "tractor truck", 130], ["hzookeef", "Mack Vision day-cab deflector", "tractor truck", 135], ["ahheiyei", "Mack Vision sleeper", "tractor truck", 135], ["ocixahya", "Mitsubishi Fuso FE-180", "tractor truck", 83], ["pheisaef", "Peterbilt 330 108in BBC", "tractor truck", 109], ["aishiepa", "Peterbilt 357 111in BBC", "tractor truck", 139], ["wmoxopah", "Peterbilt 357 119in BBC sloped-hood", "tractor truck", 139], ["cheecahm", "Peterbilt 362 76 BBC flat-nose", "tractor truck", 149], ["utohfaiy", "Peterbilt 362 90 BBC flat-nose", "tractor truck", 150], ["oosusibu", "Peterbilt 379 long city 2004-2009", "tractor truck", 125], ["quoshohj", "Peterbilt 379 long sleeper 69in 2004-2009", "tractor truck", 130], ["pohraish", "Peterbilt 379 short city 2004-2009", "tractor truck", 134], ["eetakaqu", "Peterbilt 385 112in BBC", "tractor truck", 130], ["ohphoxah", "Peterbilt 385 120in BBC", "tractor truck", 126], ["angaexah", "Peterbilt 387 high-roof sleeper 2004-2009", "tractor truck", 140], ["aiyohhoo", "Peterbilt 387 medium-roof sleeper 2004-2007", "tractor truck", 116], ["ushiejae", "Sterling Acterra", "tractor truck", 141], ["rwjoothe", "Volvo Highway 2003-uptodate", "tractor truck", 137], ["mlquahgi", "Volvo Highway VN-730 2008-uptodate", "tractor truck", 133], ["meecoqui", "Volvo VT-800 2006-uptodate", "tractor truck", 152], ["ohliecek", "Western Star 4900 EX", "tractor truck", 153], ["chiejail", "Western Star 4900 FA", "tractor truck", 151], ["aivayaef", "Western Star 4900 SA", "tractor truck", 153], ["ishiniye", "Western Star 6900 XD", "tractor truck", 149], ["wdeeghek", "45ft trailer", "trailer", 102], ["aemahhoh", "48ft trailer", "trailer", 99], ["ahngahza", "53ft trailer", "trailer", 87], ["cquooyah", "trailer front slash rear dry-box", "trailer", 92], ["ohheghie", "trailer front slash rear refer-box", "trailer", 94]];
SSH.data.imageSuffix = ".jpg";
SSH.data.processor = function(t) {
  var r = "replace",
      now = (new Date).getFullYear() + "";
  return t[r](/uptodate/i, now)[r](" slash ", " / ")[r](/(20\d\d-20\d\d)/, "\n$1")[r](/( 20\d\d)/, "\n$1")[r](/^(\S*) (\S*) /, "$1 $2\n")[r]("\n\n", "\n")[r]("Prius\nC", "Prius C")[r](now + "-" + now, now)[r](/(20\d\d)-(20\d\d)/, "$1–$2")[r](" Econoline\n", " Econoline e-350\n")[r]("Ram\nPromaster", "Ram Promaster\n")[r]("Transit\nConnect ", "Transit Connect\n")[r]("model\nS", "model S")[r]("\n ", "\n")[r](/-/g, "‑");
};
SSH.data.buyPath = "http://signshophelper.fetchapp.com/sell/";
SSH.data.buySuffix = "/ppc";
SSH.data.forEach((function(item) {
  var rawURL = item[0],
      rawText = item[1],
      tags = item[2] || "",
      buyURL = SSH.data.buyPath + rawURL + SSH.data.buySuffix,
      height = item[3];
  item.prettyText = SSH.data.processor(rawText);
  item.node = linkTemplate(buyURL, item.prettyText, tags, height);
  item.imageURL = imagePath + rawText + (SSH.data.imageSuffix || ".png");
  item.imageLoaded = false;
  item.searchText = item.prettyText.replace("\n", " ");
  item.searchText = item.searchText + item.searchText.replace(/‑/g, "") + item.searchText.replace(/‑/g, " ") + item.searchText.replace(/‑/g, "-");
  item.searchText = item.searchText + " " + tags;
}));
dom.on("load", (function() {
  dom.queryAll("[data-src]").forEach((function(i) {
    i.src = imagePath + i.getAttribute("data-src");
  }));
}));
var cover = dom("div", {"class": "cover"}, dom("iframe", {src: "faq"})).on("click", (function(e) {
  e.preventDefault();
  cover.remove();
}));
dom.query("#faq").on("click", (function(e) {
  e.preventDefault();
  dom.body.append(cover);
}));
SSH.inputElement.on("input", SSH.search);
inputFormElement.on("submit", (function(e) {
  history.pushState("", "", "?search=" + SSH.inputElement.value);
  e.preventDefault();
}));
SSH.inputElement.value = getQueryVariable("search");
SSH.search();
var cb = function() {
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'http://fonts.googleapis.com/css?family=Ubuntu:400,700';
  var h = document.getElementsByTagName('head')[0];
  h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb); else window.addEventListener('load', cb);
