"use strict";(function(window){'use strict';
  /* jshint loopfunc: true, noempty: false*/
  // http://www.w3.org/TR/dom/#element
  function textNodeIfString(node) {
    return typeof node === 'string' ? window.document.createTextNode(node) : node;
  }
  function mutationMacro(nodes) {
    if (nodes.length === 1) {
      return textNodeIfString(nodes[0]);
    }
    for (var
      fragment = window.document.createDocumentFragment(),
      list = slice.call(nodes),
      i = 0; i < nodes.length; i++
    ) {
      fragment.appendChild(textNodeIfString(list[i]));
    }
    return fragment;
  }
  for(var
    defineProperty = Object.defineProperty || function (object, property, descriptor) {
      object.__defineGetter__(property, descriptor.get);
    },
    indexOf = [].indexOf || function indexOf(value){
      var length = this.length;
      while(length--) {
        if (this[length] === value) {
          break;
        }
      }
      return length;
    },
    head,
    property,
    verifyToken,
    DOMTokenList,
    trim = /^\s+|\s+$/g,
    spaces = /\s+/,
    SPACE = '\x20',
    toggle = function toggle(token, force) {
      if (this.contains(token)) {
        if (!force) {
          // force is not true (either false or omitted)
          this.remove(token);
        }
      } else if(force === undefined || force) {
        force = true;
        this.add(token);
      }
      return !!force;
    },
    ElementPrototype = (window.Node ||  window.Element || window.HTMLElement).prototype,
    properties = [
      'matches', (
        ElementPrototype.matchesSelector ||
        ElementPrototype.webkitMatchesSelector ||
        ElementPrototype.khtmlMatchesSelector ||
        ElementPrototype.mozMatchesSelector ||
        ElementPrototype.msMatchesSelector ||
        ElementPrototype.oMatchesSelector ||
        function matches(selector) {
          var parentNode = this.parentNode;
          return !!parentNode && -1 < indexOf.call(
            parentNode.querySelectorAll(selector),
            this
          );
        }
      ),
      'prepend', function prepend() {
        var firstChild = this.firstChild,
            node = mutationMacro(arguments);
        if (firstChild) {
          this.insertBefore(node, firstChild);
        } else {
          this.appendChild(node);
        }
      },
      'append', function append() {
        this.appendChild(mutationMacro(arguments));
      },
      'before', function before() {
        var parentNode = this.parentNode;
        if (parentNode) {
          parentNode.insertBefore(
            mutationMacro(arguments), this
          );
        }
      },
      'after', function after() {
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
      },
      'replace', function replace() {
        var parentNode = this.parentNode;
        if (parentNode) {
          parentNode.replaceChild(
            mutationMacro(arguments),
            this
          );
        }
      },
      'remove', function remove() {
        var parentNode = this.parentNode;
        if (parentNode) {
          parentNode.removeChild(this);
        }
      }
    ],
    slice = properties.slice,
    i = properties.length; i; i -= 2
  ) {
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
        properties.push.apply(
          this,
          className.split(spaces)
        );
      }
      this._ = node;
    };
    DOMTokenList.prototype = {
      length: 0,
      add: function add() {
        for(var j = 0, token; j < arguments.length; j++) {
          token = arguments[j];
          if(!this.contains(token)) {
            properties.push.call(this, property);
          }
        }
        this._.className = '' + this;
      },
      contains: (function(indexOf){
        return function contains(token) {
          i = indexOf.call(this, property = verifyToken(token));
          return -1 < i;
        };
      }([].indexOf || function (token) {
        i = this.length;
        while(i-- && this[i] !== token){}
        return i;
      })),
      item: function item(i) {
        return this[i] || null;
      },
      remove: function remove() {
        for(var j = 0, token; j < arguments.length; j++) {
          token = arguments[j];
          if(this.contains(token)) {
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
      set: function(){}
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
        return head || (
          head = document.getElementsByTagName('head')[0]
        );
      }
    });
  }

  // http://www.w3.org/TR/dom/#customevent
  try{new window.CustomEvent('?')}catch(o_O){
    window.CustomEvent = function(
      eventName,
      defaultInitDict
    ){

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
        event.initCustomEvent(
          type,
          eventInitDict.bubbles,
          eventInitDict.cancelable,
          eventInitDict.detail
        );
        return event;
      }

      // attached at runtime
      function initCustomEvent(
        type, bubbles, cancelable, detail
      ) {
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
      }
    );
  }

}(window));;(function(document){

	var slice      = Array.prototype.slice
	var addMethods = (a,b)=>{for(var i in b)a.prototype[i] = b[i]}

	addMethods(Element,{
		on		 (...a)	{this.addEventListener(...a); return this;},
		clear	 ()		{var i; while(i=this.firstChild)this.removeChild(i); return this;},
		query 	 (a)	{return this.querySelector(a)},
		queryAll (a)	{return slice.call(this.querySelectorAll(a))}
	})

	var dom=function(a,b){
	  if(a==="br")return document.createElement("br");//dumb ie bug fix
	  var e=arguments, l=e.length, c, i=1,
	  element = document.createElement(a)
	  if(b&&b.constructor===Object)
	    for(c in b)
	      element.setAttribute(c, b[c])
	    ,i=2
	  for(;i<l;i++) element.append(e[i])
	  return element
	}

	dom.query    = s => document.querySelector(s);
	dom.queryAll = a => slice.call(document.querySelectorAll(a));
	dom.fragment = ()=> document.createDocumentFragment()

	dom.on   = (...a)=>window.addEventListener(...a)
	dom.html = document.documentElement
	dom.body = document.body
	dom.head = document.head

	window.dom = dom

})(document);var WS={};


(function(){

var noop=function(){}

var fastEvery = function(collection, callback) {
	var result = true;

	var index = -1,
		length = collection ? collection.length : 0;

	while (++index < length) {
	  if (!(result = !!callback(collection[index], index, collection))) {
	    break;
	  }
	}

	return result;
}

var match = (target,keywordList)=>{
	return fastEvery(keywordList,a=>a.test(target))
}

//filter that stops when it reaches a certain number of items
var limitedFilter = (array,callback,limit)=>{
	var result = [];

	var  index = -1
		,length = array.length
		,value
		,resultLength = 0

	while (++index < length) {
		value = array[index];
		if ((resultLength<limit)&&callback(value, index, array)){
			result[resultLength] = value
			resultLength+=1
	  	}
	}
	return result
}

var toCaseInsensitive = a=>RegExp(a,"i")

//defaults
WS.idealArea = 15
WS.area = 15
WS.inputElement = dom.query("#ws-input")
WS.containerElement = dom.query("#ws-container")

WS.getResults = (keyword,reverse)=>{
	if(keyword==="")
		return WS.data.slice(0,WS.area)

	var keywordList = keyword.split(" ").map(toCaseInsensitive)
	
	return limitedFilter(
		 WS.data
		,i=>match(i.searchText,keywordList)^reverse
		,WS.area
	)
}

WS.search = function(args={}){
	var {keyword=WS.inputElement.value,reverse} = args
		,{onappendnode=noop,onfragmentpopulated=noop} = WS.search
		,array    = WS.getResults(keyword,reverse)
		,fragment = dom.fragment()
	
	array.forEach(i=>{
		onappendnode(i)
		fragment.append(i.node)
	})

	onfragmentpopulated(fragment,array)

	WS.containerElement
		.clear()
		.append(fragment)

}

WS.search.on = (eventString,callback)=>{
	WS.search["on"+eventString]=callback
}

WS.showAll = ()=>{
	WS.area = WS.data.length;
	WS.search();
	WS.area = WS.idealArea;
	return false;
}

WS.inputElement
	.on("input",WS.search)


})();var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally {try{if(!_n&&_i["return"])_i["return"]();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var mapObject=function mapObject(o,ƒ){var n={};Object.keys(o).forEach(function(v){n[v]=ƒ(o[v],v);});return n;};var getQueryVariable=function getQueryVariable(a){return unescape((RegExp("[&?]"+a+"=([^&]+)").exec(location)||["",""])[1]||"");};var mergeObject=function mergeObject(a,b){for(var i in b){a[i]=b[i];}return a;};var addMethods=function addMethods(a,b){for(var i in b){a.prototype[i]=b[i];}};var range=function range(start,stop){var length=stop-start;var range=Array(length);var i=0;for(;i<length;i++,start++){range[i]=start;}return range;};var expandRange=function expandRange(rangeString){var ends=rangeString.split("‑");var start=+ends[0];var stop=+ends[1];return range(start,stop).join(" ");};var imagePath="http://signshop.s3-website-us-east-1.amazonaws.com/",inputFormElement=dom.query("#inputform"),showAllLink=dom("a",{id:"showalllink"},"show all").on("click",WS.showAll),linkTemplate=function linkTemplate(link,text,desc,tags,height){return dom("a",{target:"paypal",href:link,itemscope:"",itemtype:"http://schema.org/Product"},dom("img",{height:height,width:150,itemprop:"image",alt:" "}),dom("strong",{itemprop:"name"},text),dom("span",{itemprop:"name"},desc),dom("span",{itemprop:"offers",itemscope:"",itemtype:"http://schema.org/AggregateOffer",hidden:"hidden"},dom("span",{itemprop:"priceCurrency",content:"USD"},"$"),dom("span",{itemprop:"price",content:"19.00"},"19"),dom("span",{itemprop:"lowPrice",content:"19.00"},"19")),dom("div",{class:"add-button"},"Add to Cart"));};var setArea=function setArea(){var w=Math.max(document.documentElement.clientWidth,window.innerWidth||0);var h=Math.max(document.documentElement.clientHeight,window.innerHeight||0);var area=(h-168)*w/42302;area=Math.max(area,10)|0;WS.idealArea=area;WS.area=area;};setArea();onresize=setArea;dom.query("#showalllink").on("click",WS.showAll);WS.search.on("appendnode",function(item){if(!item.imageLoaded)item.node.firstChild.src=item.imageURL,item.imageLoaded=true;});WS.search.on("fragmentpopulated",function(fragment,array){if(array.length===WS.idealArea)fragment.append(showAllLink);});WS.data=[
//["","","","",,""],
["c810c121","Chevrolet Volt","2016‑uptodate","car sedan",73,"00635"],
["770cc504","Chevrolet Spark","2016‑uptodate","car hatchback",90,"00634"],
["14300163","Ford F‑150","regular cab 6.5ft 2017‑uptodate","pickup",83,"00633"],
["b0420147","Nissan Titan","crew‑cab 5.5ft 2016‑uptodate","pickup",72,"00632"],
["b40a7b27","Nissan Titan","XD crew‑cab 6.5ft 2016‑uptodate","pickup",73,"00631"],
["ad40b9ae","Honda Pilot","2016‑uptodate","suv van",90,"00630"],
["ce1889df","Ford Transit","full‑size low‑roof passenger 2015‑uptodate","van wagon 350 XLT 147.6 wb",89,"00629"],
["c7a7acb0","Nissan Patrol","2016‑uptodate","suv van",85,"00628"],
["3b10927e","Toyota Prius","2016‑uptodate","car",75,"00627"],
["57517325","Chevrolet Impala","2014‑uptodate","car",65,"00626"],
["bd002003","Chevrolet Malibu","2016‑uptodate","car",66,"00625"],
["57fb77fd","Chevrolet Corvette","Stingray Z51 Z06\n2015‑uptodate","car",70,"00624"],
["679fa22f","Subaru Forester","2014‑uptodate","suv",91,"00623"],
["61393d30","Toyota Tacoma","double‑cab short‑bed 6.1ft\n2016‑uptodate","6ft pickup",70,"00622"],
["1e10cc9e","Toyota Tacoma","access‑cab long‑bed\n2016‑uptodate","pickup",73,"00621"],
["4b36e2fb","Toyota Tundra","double‑cab SR5\n2016‑uptodate","pickup",73,"00620"],
["e4c3aebd","Mazda CX-3","2016‑uptodate","suv",78,"00619"],
["dd838198","Kia Sedona","2015‑uptodate","van",82,"00618"],
["1626ce09","Toyota Tundra","crewmax 2016‑uptodate","pickup",73,"00617"],
["0d27c757","Ford Edge","2016‑uptodate","suv",79,"00616"],
["f7cefb84","Smart Fortwo","2016‑uptodate","car",105,"00615"],
["8e7907b5","Honda Civic","sedan 2016‑uptodate","car",70,"00614"],
["0ea4504e","Subaru BRZ","2013‑uptodate","car",70,"00613"],
["4f175128","Ford Super‑Duty F‑Series F‑250 F‑350 F‑450","crew‑cab 2016‑uptodate","pickup",71,"00612"],
["8abf2355","Winnebago Brave 31C","","RV Recreational vehicle class a motorhome caravan camper van bus",90,"00611"],
["68206198","Kia Sorento","SX 2016","suv",78,"00610"],
["baa887ad","Winnebago Vista","","RV Recreational vehicle class a motorhome caravan camper van bus",90,"00609"],
["304dde38","GMC Sierra / Chevrolet Silverado","crew‑cab 3500 HD long‑box 2014‑uptodate","pickup",68,"00608"],
["29185114","Mercedes Metris","cargo van 2016‑uptodate","van",82,"00607"],
["6751b7bd","Ford F‑150","supercrew 5.5ft 2015‑uptodate","pickup",75,"00606"],
["a2f1142e","Ford F‑150","supercrew 6.5ft 2015‑uptodate","pickup",78,"00605"],
["508dc0f3","GMC Canyon","/ Chevrolet Colorado extended‑cab short‑box\n2015‑uptodate","pickup",75,"00604"],
["3a7cb9c6","GMC Canyon","/ Chevrolet Colorado crew‑cab short‑box\n2015‑uptodate","pickup",76,"00603"],
["0e82e3b3","Honda HR‑V","2016","suv",85,"00602"],
["04f4ea49","Nissan Micra","4‑door\n2016‑uptodate","car",92,"00601"],
["98973bb9","GMC Sierra","double‑cab standard‑box\n2014‑uptodate","pickup",76,"00600"],
["36cf2901","Ford Transit","full‑size high‑roof long extended\n2015‑uptodate","van",91,"00599"],
["1b545db2","Mazda MX‑5","Miata Eunos Roadster\n2015‑uptodate","car",72,"00598"],
["aec6015b","Ford Mustang","2015‑uptodate","car",65,"00597"],
["fddce689","Chevrolet City","express\n2015‑uptodate","van",88,"00596"],
["ilahbath","Kia Sorento","2016","suv",78,"00595"],
["zoolieni","Jeep Renegade","2015","suv",83,"00594"],
["wahyahgu","Ram Promaster","city\n2015","van dodge",85,"00593"],
["mhoohush","Newmar RV","45ft","Recreational vehicle class a motorhome caravan camper van bus",73,"00592"],
["amohmuri","Mini Cooper","2008‑2015","car",79,"00591"],
["rphooref","Ford F‑150","supercab 6 5ft\n2015‑uptodate","pickup",75,"00590"],
["vwakecoo","Dodge Ram Promaster","136 wheelbase, high‑roof\n2014‑uptodate","van",90,"00587"],
["ohphizoo","Ford Transit","full‑size high‑roof long\n2015‑uptodate","van",100,"00588"],
["aesameev","Tesla model S","2014‑uptodate","car",65,"00586"],
["caiphooj","Ford Transit","full‑size medium‑roof long\n2015‑uptodate","van",86,"00585"],
["iquokeib","Ford Econoline e‑350 / e‑250","extended length cargo\n2008‑2014","van",76,"00584"],
["bohghozu","Toyota Rav‑4","2014‑uptodate","suv",83,"00001"],
["ijughaim","Honda Accord","2012‑uptodate","car",67,"00582"],
["cmhoorae","Toyota Camry","2012‑uptodate","car",75,"00581"],
["cheteicu","Ford Transit Connect","short wagon liftgate\n2014‑uptodate","van",85,"00583"],
["uyahchey","Ford Fusion","2013‑uptodate","car",71,"00580"],
["mquiraep","Jeep Cherokee","2014‑uptodate","suv",79,"00579"],
["ohjesoth","Toyota Rav‑4","2013","suv",81,"00002"],
["shoghopi","Jeep Grand‑Cherokee","2014‑uptodate","suv",79,"00003"],
["eifurogo","Buick Encore","2013‑uptodate","suv",86,"00004"],
["oothohki","Toyota Highlander","2014‑uptodate","suv",76,"00005"],
["akiwaeph","Ford Transit Connect","long cargo\n2014‑uptodate","van",80,"00006"],
["eizivapo","Ford Transit Connect","short cargo\n2014‑uptodate","van",86,"00007"],
["ahdeisuw","Ford Transit Connect","short wagon\n2014‑uptodate","van",86,"00008"],
["aexiemab","Ford Transit Connect","long wagon\n2014‑uptodate","van",82,"00009"],
["ungaizes","GMC Sierra","crew‑cab regular‑box\n2014‑uptodate","pickup",72,"00010"],
["gchivait","Chevrolet Silverado","crew‑cab regular‑box\n2014‑uptodate","pickup",72,"00011"],
["ichizaix","Honda Civic","sedan\n2011‑2015","car",74,"00012"],
["soocufai","Dodge Ram Promaster","159 wheelbase, high‑roof\n2014‑uptodate","van",86,"00013"],
["oroocaph","Dodge Ram Promaster","118 wheelbase, standard‑roof\n2014‑uptodate","van",85,"00014"],
["gothoxox","Dodge Ram Promaster","136 wheelbase, standard‑roof\n2014‑uptodate","van",86,"00015"],
["aquefaid","Nissan Murano","2014","suv",87,"00016"],
["engeivug","Mitsubishi Outlander","2014‑2015","suv",85,"00017"],
["weephahz","Kenworth t680","2013‑uptodate","tractor",126,"00018"],
["eitoocah","Peterbilt 579","","tractor",127,"00019"],
["kiewiezu","Freightliner Cascadia","Evolution","tractor",132,"00020"],
["ohyedunu","Nissan NV200","2013‑uptodate","van",86,"00021"],
["ynegunoo","Toyota Prius C","2013‑uptodate","car",75,"00022"],
["jahghies","Subaru XV Crosstrek","2013‑uptodate","suv",82,"00023"],
["ohkahroo","Nissan Pathfinder","2013‑uptodate","suv",80,"00024"],
["vquiegee","Mitsubishi Imiev","2012‑uptodate","car",98,"00025"],
["bhrieyal","Mazda CX‑5","2012‑uptodate","suv",83,"00026"],
["shashahf","Kia Rio","hatchback\n2013‑uptodate","car",80,"00027"],
["ahhaevom","Kia Forte","hatchback\n2013‑uptodate","car",80,"00028"],
["ahzeigah","Hyundai Santa‑Fe","2013‑uptodate","suv",81,"00029"],
["highiefi","Ford Escape","2013‑uptodate","suv",82,"00030"],
["ireixein","Ford C‑max","2012‑uptodate","car hatchback",80,"00031"],
["ageejadi","Dodge Dart","2013‑uptodate","car",73,"00032"],
["gahpooni","Chevrolet Orlando","2012‑2014","suv",85,"00033"],
["eidaveet","Chevrolet Sonic","2012‑uptodate","car hatchback",83,"00034"],
["woongahc","Chevrolet Spark","2012‑2015","car hatchback",88,"00035"],
["aeyothee","Chevrolet Volt","2011‑2015","car",74,"00036"],
["etaiveid","Dodge Caravan","2012‑uptodate","van ram",80,"00037"],
["xuxiegig","Dodge Charger","2011‑uptodate","muscle car",72,"00038"],
["ehahbohf","Dodge Durango","2012‑uptodate","suv",82,"00039"],
["ipeeghor","Fiat","2012‑uptodate","car hatchback",88,"00040"],
["ieteking","Ford Focus","4‑door hatchback\n2012‑uptodate","car",81,"00041"],
["oopofael","Honda CR‑V","2012‑uptodate","suv",82,"00042"],
["aikeyaye","Honda Civic","coupe\n2012‑2015","car",74,"00043"],
["ixaepohz","Hyundai Accent","4‑door hatchback\n2012‑uptodate","car",79,"00044"],
["aiboogoh","Hyundai Elantra","2012‑2016","car",72,"00045"],
["peiveelu","Hyundai Veloster","2012‑uptodate","car",73,"00046"],
["chievahm","Mazda 5","2012‑uptodate","van",83,"00047"],
["hoholier","Mitsubishi RVR","2010‑uptodate","suv",81,"00048"],
["jajoodee","Nissan NV","NV2500 NV3500 HD\nhigh‑roof\n2012‑uptodate","van",89,"00049"],
["gaicooju","Nissan NV","NV1500 NV2500 HD NV3500\nlow‑roof\n2012‑uptodate","van",82,"00050"],
["eriejece","Scion IQ","2012‑uptodate","car",97,"00051"],
["ibathief","Scion XB","2008‑2015","car",84,"00052"],
["oleiquai","Volkswagen Beetle","2012‑uptodate","car",85,"00053"],
["pemeiroh","Volkswagen Jetta","2011‑uptodate","car",78,"00054"],
["umohrohz","Buick Enclave","2008‑uptodate","suv",82,"00055"],
["chaepaem","Buick Rainier","2004‑2007","suv",83,"00056"],
["ahnohyai","Buick Rendez‑vous","2004‑2007","suv",80,"00057"],
["npbshoci","Chevrolet Aveo","4‑door\n2004‑2011","car",120,"00058"],
["shooregh","Chevrolet Aveo","5‑door\n2004‑2011","car",90,"00059"],
["thahhaed","Chevrolet Camaro","2009‑2015","muscle car",69,"00060"],
["eesijoth","Chevrolet Cavalier","2004‑2005","car",116,"00061"],
["oohahnuw","Chevrolet Cobalt","4‑door\n2007‑2009","car",108,"00062"],
["oonijaif","Chevrolet Cobalt","coupe\n2007‑2009","car",115,"00063"],
["ehohcahk","Chevrolet Corvette","2006‑2013","car",90,"00064"],
["yzathahy","Chevrolet Cruze","2011‑2015","car",73,"00065"],
["abeedoon","Chrysler Aspen","2007‑2009","suv",84,"00066"],
//["ighohnoh","Chevrolet Impala","police","2005","car",80,"00067"],
["nxietoza","Chevrolet Impala","2008‑2013","car",74,"00068"],
["weeguque","Chevrolet Malibu","2007","car",75,"00069"],
["ahshozai","Chevrolet Malibu","2008‑2015","car",74,"00070"],
["fhshoroo","Chevrolet Malibu","maxx\n2007","car",80,"00071"],
["zecishol","Chevrolet SSR","2004‑2006","car",77,"00072"],
["zaipegae","Chevrolet Express","cube 16ft","cube",105,"00073"],
["thijohni","GMC Savana","/ Chevrolet Express cube 13ft","cube",105,"00074"],
["ushohori","Chevrolet Avalanche","2003‑2006","pickup",85,"00075"],
["lpooteel","Chevrolet Avalanche","2007‑2013","pickup",82,"00076"],
["pleewees","Chevrolet Colorado","crew‑cab\n2004‑2012","pickup",82,"00077"],
["laruhohw","Chevrolet Colorado","extended‑cab\n2004‑2012","pickup",78,"00078"],
["vaiwiequ","Chevrolet Colorado","regular\n2004‑2012","pickup",81,"00079"],
["ijaishan","Chevrolet S‑10","crew‑cab\n2003‑2004","pickup",85,"00080"],
["wpngeith","Chevrolet S‑10","extended‑cab\n2003‑2004","pickup",80,"00081"],
["rtfaevoh","Chevrolet S‑10","regular\n2003‑2004","pickup",82,"00082"],
["wdeyohng","Chevrolet S‑10","regular long\n2003‑2004","pickup",82,"00083"],
["eedusohb","Chevrolet Silverado","3500 crew‑cab\n2003‑2006","pickup",82,"00084"],
["shoozequ","Chevrolet Silverado","3500 extended‑cab long\n2003‑2006","pickup",85,"00085"],
["rgoochai","Chevrolet Silverado","3500 regular\n2003‑2006","pickup",86,"00086"],
["hdrasohc","Chevrolet Silverado","crew‑cab\n2003‑2006","pickup",83,"00087"],
["ihooxiqu","Chevrolet Silverado","extended‑cab\n2003‑2006","pickup",85,"00088"],
["obowoghi","Chevrolet Silverado","extended‑cab long\n2003‑2006","pickup",81,"00089"],
["naiceeka","Chevrolet Silverado","regular long\n2003‑2006","pickup",80,"00090"],
["ciyohrie","Chevrolet Silverado","regular short\n2003‑2006","pickup",85,"00091"],
["zohlohvo","Chevrolet Silverado","crew‑cab\n2007‑2013","pickup",78,"00092"],
["hfieghai","Chevrolet Silverado","extended‑cab regular\n2007‑2013","pickup",79,"00093"],
["rosietee","Chevrolet Silverado","extended‑cab long\n2007‑2013","pickup",74,"00094"],
["ohrewoox","Chevrolet Silverado","long\n2007‑2013","pickup",79,"00095"],
["nohthaeg","Chevrolet Silverado","regular\n2007‑2013","pickup",82,"00096"],
["sngurahl","Chevrolet Silverado","3500 crew‑cab\n2007","pickup",80,"00097"],
["thohseew","Chevrolet Silverado","3500 extended‑cab long\n2007","pickup",85,"00098"],
["sphohbai","Chevrolet Silverado","3500 regular\n2007","pickup",87,"00099"],
["thaehaqu","Chevrolet Silverado","crew‑cab\n2007","pickup",81,"00100"],
["quahliej","Chevrolet Silverado","extended‑cab\n2007","pickup",87,"00101"],
["vtteiqui","Chevrolet Silverado","extended‑cab long\n2007","pickup",82,"00102"],
["dlegecha","Chevrolet Silverado","regular long\n2007","pickup",80,"00103"],
["ixeehahh","Chevrolet Silverado","regular short\n2007","pickup",86,"00104"],
["toonooth","Chevrolet Astro","cargo swing‑door\n2003‑2005","van",94,"00105"],
["guraiche","Chevrolet Astro","swing‑door\n2003‑2005","van",92,"00106"],
["pohmaemu","Chevrolet Astro","tailgate\n2003‑2005","van",94,"00107"],
["knyvahch","Chevrolet Blazer","2‑door\n2004‑2005","suv",80,"00108"],
["igefaemu","Chevrolet Blazer","4‑door\n2004‑2005","suv",80,"00109"],
["quisizee","Chevrolet Equinox","2004‑2009","suv",87,"00110"],
["aengawoo","Chevrolet Equinox","2010‑uptodate","suv",86,"00111"],
["ookijadi","Chevrolet Express","long\n2003‑uptodate","van",87,"00112"],
["sajeshiw","Chevrolet Express","long slide‑door\n2003‑uptodate","van",85,"00113"],
["iepieyoo","Chevrolet Express","long slide‑door cargo\n2003‑uptodate","van",82,"00114"],
["kothepho","Chevrolet Express","regular\n2003‑uptodate","van",86,"00115"],
["heenohch","Chevrolet Express","regular cargo\n2003‑uptodate","van",90,"00116"],
["ajikaepi","Chevrolet Express","regular slide‑door\n2003‑uptodate","van",87,"00117"],
["zodienoh","Chevrolet Express","regular slide‑door cargo\n2003‑uptodate","van",88,"00118"],
["joovaesi","Chevrolet HHR","2007‑2011","suv",84,"00119"],
["eezohzax","Chevrolet HHR","panel\n2007‑2011","suv",82,"00120"],
["mohijohr","Chevrolet Suburban","2008‑2014","suv",83,"00121"],
["yrmiengo","Chevrolet Tahoe","2007‑uptodate","suv denali",86,"00122"],
["ijeefief","Chevrolet Tracker","2004","suv",89,"00123"],
["geeragha","Chevrolet Trailblazer","extended‑length\n2004‑2006","suv",84,"00124"],
["zghohgie","Chevrolet Trailblazer","LS\n2004‑2009","suv",91,"00125"],
["olieghae","Chevrolet Traverse","2009‑uptodate","suv",81,"00126"],
["hepheish","Chevrolet Uplander","ext\n2005‑2009","van",83,"00127"],
["iwohjoon","Chevrolet Venture","ext\n2003‑2004","van",83,"00128"],
["zohbahng","Chevrolet Venture","regular\n2003‑2004","van",80,"00129"],
["oxaequee","Chrysler PT‑Cruiser","2004‑2010","car",81,"00130"],
["airiezie","Chrysler PT‑Cruiser","panel\n2007‑2010","car",80,"00131"],
["haipahji","Chrysler Town and Country","2003‑2007","van",79,"00132"],
["ziedeife","Chrysler Town and Country","2008‑2016","van",80,"00133"],
["thichohd","Ford Econoline e‑350 e‑250","cube 15ft","cube",97,"00134"],
["aboonagh","Dodge Avenger","2008‑2014","car",74,"00135"],
["geegokee","Dodge Caliber","2007‑2012","car",83,"00136"],
["hdgeefei","Dodge Challenger","2008‑uptodate","car",69,"00137"],
//["dahmahvo","Dodge Charger","police","2007‑2010","car",78,"00138"],
//["ohdizije","Dodge Magnum","police","2006‑2009","car",76,"00139"],
["jolilaqu","Dodge SRT‑4","2004‑2006","car",76,"00140"],
["kthohhei","Dodge Dakota","crew‑cab\n2004","pickup",110,"00141"],
["ohghaidu","Dodge Dakota","quad‑cab\n2004","pickup",111,"00142"],
["eitheing","Dodge Dakota","regular\n2004","pickup",116,"00143"],
["eenikeic","Dodge Dakota","crew‑cab\n2005‑2011","pickup",76,"00144"],
["oocaecoo","Dodge Dakota","quad‑cab\n2005‑2011","pickup",79,"00145"],
["kshahghu","Dodge Ram 1500 / 2500","quad‑cab\n2003‑2008","pickup",80,"00146"],
["ahquadum","Dodge Ram 1500 / 2500","regular long\n2003‑2008","pickup",82,"00147"],
["igaehein","Dodge Ram 1500 / 2500","regular short\n2003‑2008","pickup",86,"00148"],
["gavahmoh","Dodge Ram","3500 quad‑cab\n2003‑2008","pickup",75,"00149"],
["xrunaema","Dodge Ram","3500 resistol\n2008","pickup",75,"00150"],
["eibaphie","Dodge Ram","mega‑cab\n2007‑2008","pickup",78,"00151"],
["ekeeshai","Dodge Ram 1500 2500","crew‑cab\n2009‑uptodate","pickup",78,"00152"],
["chutieph","Dodge Ram 1500 2500","crew‑cab toolbox\n2009‑uptodate","pickup",80,"00153"],
["eephoocu","Dodge Ram 1500 2500","quad‑cab\n2009‑uptodate","pickup",78,"00154"],
["aereisap","Dodge Ram 1500 2500","regular long\n2009‑uptodate","pickup",79,"00155"],
["usaeghuh","Dodge Ram 1500 2500","regular short\n2009‑uptodate","pickup",80,"00156"],
["ahzeenge","Dodge Grand Caravan","2003‑2007","van ram",81,"00158"],
["opiequim","Dodge Caravan","regular\n2003‑2006","van ram",87,"00159"],
["uwaihaex","Dodge Grand Caravan","2008‑uptodate","van ram",80,"00160"],
["gzthipai","Dodge Durango","2003","suv",122,"00161"],
["eingiero","Dodge Durango","2004‑2009","suv",84,"00162"],
["cwepheem","Dodge Journey","2009‑uptodate","suv",80,"00163"],
["zeneemez","Dodge Nitro","2007‑2009","suv",86,"00164"],
["efiehahg","Dodge Ram","2003","pickup",85,"00165"],
["aitojief","Dodge Ram","short\n2003","pickup",87,"00166"],
["zooforai","Dodge / Mercedes Sprinter","regular\n2004‑2007","van mercedes",97,"00167"],
["xaiquool","Dodge / Mercedes Sprinter","regular high‑roof\n2004‑2007","van mercedes",102,"00168"],
["udohshaw","Dodge / Mercedes Sprinter","short\n2004‑2007","van mercedes",101,"00169"],
["eibahgei","Dodge / Mercedes Sprinter","cargo 144 high‑roof window\n2008‑uptodate","van mercedes",97,"00170"],
["odebeing","Dodge / Mercedes Sprinter","cargo 144 window\n2008‑uptodate","van mercedes",89,"00171"],
["teesohyi","Dodge / Mercedes Sprinter","cargo 170\n2008‑uptodate","van mercedes",93,"00172"],
["oceezazu","Dodge / Mercedes Sprinter","C extended‑roof 170\n2008‑uptodate","van mercedes",86,"00173"],
["ohmodoka","Dodge / Mercedes Sprinter","chassis 144\n2008‑uptodate","van mercedes",87,"00174"],
["laxoorei","Dodge / Mercedes Sprinter","chassis 170\n2008‑uptodate","van mercedes",76,"00175"],
["fngiefix","Dodge / Mercedes Sprinter","C mega‑roof 170\n2008‑uptodate","van mercedes",93,"00176"],
["sahbohsh","Dodge / Mercedes Sprinter","passenger 144\n2008‑uptodate","van mercedes",87,"00177"],
["xesosohd","Dodge / Mercedes Sprinter","passenger 144 high‑roof\n2008‑uptodate","van mercedes",96,"00178"],
["aigheshu","Dodge / Mercedes Sprinter","passenger 170\n2008‑uptodate","van mercedes",89,"00179"],
["oowahfej","Dodge / Mercedes Sprinter","cargo 144\n2008‑uptodate","van mercedes",87,"00180"],
["ahshishi","Dodge / Mercedes Sprinter","cargo 144 high‑roof\n2008‑uptodate","van mercedes",93,"00181"],
["opulohyu","Mercedes / Dodge Sprinter","cargo 144 high‑roof window\n2008‑uptodate","van dodge",97,"00182"],
["egheweix","Mercedes / Dodge Sprinter","cargo 144 window\n2008‑uptodate","van dodge",89,"00183"],
["oolachop","Mercedes / Dodge Sprinter","cargo 170\n2008‑uptodate","van dodge",93,"00184"],
["quaehaep","Mercedes / Dodge Sprinter","C extended‑roof 170\n2008‑uptodate","van dodge",86,"00185"],
["ooyeegho","Mercedes / Dodge Sprinter","chassis 144\n2008‑uptodate","van dodge",87,"00186"],
["ihakiepe","Mercedes / Dodge Sprinter","chassis 170\n2008‑uptodate","van dodge",76,"00187"],
["venguyee","Mercedes / Dodge Sprinter","C mega‑roof 170\n2008‑uptodate","van dodge",93,"00188"],
["icekahmi","Mercedes / Dodge Sprinter","passenger 144\n2008‑uptodate","van dodge",87,"00189"],
["iemeixai","Mercedes / Dodge Sprinter","passenger 144 high‑roof\n2008‑uptodate","van dodge",96,"00190"],
["eiyaicha","Mercedes / Dodge Sprinter","passenger 170\n2008‑uptodate","van dodge",89,"00191"],
["athifito","Mercedes / Dodge Sprinter","cargo 144\n2008‑uptodate","van dodge",87,"00192"],
["ingaisai","Mercedes / Dodge Sprinter","cargo 144 high‑roof\n2008‑uptodate","van dodge",93,"00193"],
["ujafisei","Ford Fiesta","hatchback\n2010‑uptodate","car",86,"00194"],
["xghocoor","Ford Flex","2009‑uptodate","crossover",82,"00195"],
["fveeghie","Ford Focus","4‑door\n2008‑2010","car",80,"00196"],
["iefohlih","Ford Focus","4‑door sedan\n2010‑uptodate","car",80,"00197"],
["aibeigie","Ford Focus","coupe\n2008‑2011","car",79,"00198"],
["ofaixaca","Ford Focus","wagon\n2003‑2007","car",81,"00199"],
["eejiewof","Ford Freestyle","2005‑2007","crossover",85,"00200"],
["ietoomie","Ford Fusion","2007‑2009","car",73,"00201"],
["hzyahpaj","Ford Fusion","2010‑2012","car",75,"00202"],
["oomaiqua","Ford Mustang","2004","muscle car",69,"00203"],
["jaikaech","Ford Mustang","2005‑2014","muscle car",73,"00204"],
["eixivoko","Ford Focus","SVT\n2003‑2006","car",92,"00205"],
["ohhaishu","Ford Taurus","2008‑2009","car",77,"00206"],
["ychashai","Ford Taurus","2010‑2014","car",78,"00207"],
["zahshote","Ford F‑150","regular‑cab 6.5ft\n2004‑2008","pickup",81,"00210"],
["giephoce","Ford F‑150","regular‑cab 8ft\n2004‑2008","pickup",79,"00211"],
["ymjtveeh","Ford F‑150","regular‑cab F‑6 5ft\n2004‑2008","pickup",84,"00212"],
["ahsohfae","Ford F‑150","supercab F‑6 5ft\n2004‑2008","pickup",80,"00213"],
["cheisais","Ford F‑150","supercab S‑5 5ft\n2004‑2008","pickup",80,"00214"],
["aexahrun","Ford F‑150","supercab S‑6 5ft\n2004‑2008","pickup",78,"00215"],
["soofoomi","Ford F‑150","supercab S 8ft\n2004‑2008","pickup",75,"00216"],
["thaeseif","Ford F‑150","supercrew 5 5ft\n2004‑2008","pickup",74,"00217"],
["xahducai","Ford F‑250","/ F‑350 supercab 8ft\n2004‑2008","pickup",81,"00218"],
["ahpohlav","Ford F‑250","/ F‑350 supercab 8ft\n2008‑uptodate","pickup",85,"00219"],
["eeyushoo","Ford F‑250","/ F‑350 supercrew 8ft\n2004‑2008","pickup",80,"00220"],
["eengaloo","Ford F‑250","/ F‑350 supercrew 8ft\n2008‑uptodate","pickup",79,"00221"],
["aepheech","Ford F‑250","/ F‑350 work 8ft\n2004‑2008","pickup",82,"00222"],
["aiphucha","Ford F‑250","/ F‑350 work 8ft\n2008‑uptodate","pickup",80,"00223"],
["theimoov","Ford F‑150","crew‑cab 5.5ft\n2009‑2014","pickup",73,"00224"],
["quutheth","Ford F‑150","crew‑cab 6.5ft\n2009‑2014","pickup",72,"00225"],
["jiexeero","Ford F‑150","regular‑cab long b\n2009‑2014","pickup",74,"00226"],
["xbzelahn","Ford F‑150","regular‑cab short b\n2009‑2014","pickup",82,"00227"],
["avoleita","Ford F‑150","supercab 5.5ft\n2009‑2014","pickup",75,"00228"],
["voophigu","Ford F‑150","supercab 8ft\n2009‑2014","pickup",73,"00229"],
["pdiepunu","Ford F‑150","supercab F‑6 5ft\n2009‑2014","pickup",74,"00230"],
["afiseepo","Ford Ranger","regular‑cab\n2004‑2011","pickup",85,"00231"],
["dxmeikeh","Ford Ranger","supercab flareside\n2004‑2011","pickup",86,"00232"],
["ijaefohm","Ford Ranger","supercab\n2004‑2011","pickup",80,"00233"],
["itahceek","Ford Excursion","2004‑2005","suv",88,"00234"],
["ozeegesi","Ford Econoline e‑350 e‑250","2004‑2007","van",83,"00235"],
["eizumoow","Ford Econoline e‑350 e‑250","chateau\n2004‑2007","van",85,"00236"],
["ohquohzi","Ford Econoline e‑350 e‑250","extended‑length\n2004‑2007","van",78,"00237"],
["agoghipe","Ford Econoline e‑350 e‑250","slide‑door\n2004‑2007","van",85,"00238"],
["eedatogo","Ford Econoline e‑350 e‑250","2008‑2014","van",84,"00239"],
["iquaphei","Ford Econoline e‑350 e‑250","chateau\n2008‑2014","van",85,"00240"],
["ainekedu","Ford Econoline e‑350 e‑250","extended‑length\n2008‑2014","van",79,"00241"],
["xiethier","Ford Econoline e‑350 e‑250","slide‑door\n2008‑2014","van",88,"00242"],
["dkiquavo","Ford Edge","2007‑2010","suv",84,"00243"],
["aediechi","Ford Edge","2011‑2015","suv",84,"00244"],
["ahcakiex","Ford Escape","2004‑2007","suv",84,"00245"],
["kukophie","Ford Escape","2008‑2012","suv",87,"00246"],
["riepheze","Ford Expedition","2004‑2006","suv",88,"00247"],
["yuchefud","Ford Expedition","2008‑uptodate","suv",86,"00248"],
["ushodeig","Ford Expedition","el\n2008‑uptodate","suv",83,"00249"],
["chohyeeh","Ford Explorer","2003‑2010","suv",89,"00250"],
["quaikuho","Ford Explorer","2011‑2015","suv",83,"00251"],
["aebeenov","Ford Explorer","sport‑trac\n2003‑2010","pickup",86,"00252"],
["cievaezo","Ford Freestar","2004‑2007","van",85,"00253"],
["equaeshi","Ford Freestyle","2005‑2007","suv",85,"00254"],
["siejaeth","Ford Taurus","X\n2008‑2009","suv",82,"00255"],
["eehiesee","Ford Transit Connect","2010‑2013","van",88,"00256"],
["ekapohza","Ford Windstar","2003","van",82,"00257"],
["lahkeish","GMC Canyon","crew‑cab\n2004‑2012","pickup",82,"00258"],
["ailahshu","GMC Canyon","extended‑cab\n2004‑2012","pickup",75,"00259"],
["iziebool","GMC Canyon","regular‑cab\n2004‑2012","pickup",80,"00260"],
["aehothee","GMC Sierra","3500HD\n2007‑2013","pickup",76,"00261"],
["fhohieko","GMC Sierra","crew‑cab\n2007‑2013","pickup",78,"00262"],
["poreeliy","GMC Sierra","ext‑long\n2007‑2013","pickup",79,"00263"],
["iengeica","GMC Sierra","extended regular\n2007‑2013","pickup",81,"00264"],
["bilaivah","GMC Sierra","regular\n2007‑2013","pickup",83,"00265"],
["tiegeifo","GMC Sierra","regular long\n2007‑2013","pickup",78,"00266"],
["ohgheshe","Sonoma / S‑10","crew‑cab\n2003","pickup",82,"00267"],
["eideegip","Sonoma / S‑10","extended‑cab\n2003","pickup",79,"00268"],
["ojeishai","Sonoma / S‑10","extended sport‑side\n2003","pickup",80,"00269"],
["giechiet","Sonoma / S‑10","regular\n2003","pickup",82,"00270"],
["azaiyaib","Sonoma / S‑10","regular long\n2003","pickup",80,"00271"],
["ckeisahr","GMC Sierra","crew‑cab\n2003‑2007","pickup",79,"00272"],
["ohzaedoo","GMC Sierra","crew‑cab long\n2003‑2007","pickup",76,"00273"],
["diphenai","GMC Sierra","crew‑cab sport‑side\n2003‑2006","pickup",76,"00274"],
["uyebonge","GMC Sierra","extended‑cab\n2003‑2006","pickup",80,"00275"],
["sngaingo","GMC Sierra","extended‑cab sport‑side\n2003‑2006","pickup",79,"00276"],
["eefohtil","GMC Sierra","ext‑long\n2007","pickup",78,"00277"],
["ahngieta","GMC Sierra","regular\n2003‑2007","pickup",86,"00278"],
["aethovee","GMC Sierra","regular long\n2003‑2007","pickup",82,"00279"],
["ahpepeje","GMC Sierra","regular sport‑side\n2003‑2007","pickup",86,"00280"],
["odeibeey","GMC Acadia","2007‑2016","suv denali",81,"00281"],
["cnubieme","GMC Envoy","2003‑2009","suv",84,"00282"],
["xkdayiri","GMC Envoy","Denali\n2005‑2009","suv",81,"00283"],
["eefaedai","GMC Envoy","XL\n2004‑2006","suv",81,"00284"],
["oohaeziv","GMC Terrain","2010‑uptodate","suv denali",85,"00285"],
["ljnngiew","GMC Yukon / Tahoe","2003‑2006","suv denali",86,"00286"],
["ohxaevoh","GMC Yukon / Tahoe","2007‑uptodate","suv denali",87,"00287"],
["cailihus","GMC Yukon XL / Suburban","2003‑2006","suv",81,"00288"],
["ohchaebu","GMC Yukon XL / Suburban","2007‑2014","suv",82,"00289"],
["thaigeit","Safari / Astro","cargo swing‑door\n2003‑2005","van",93,"00290"],
["ohphaipi","Safari / Astro","swing‑door\n2003‑2005","van",97,"00291"],
["yphoophe","Safari / Astro","tailgate\n2003‑2005","van",93,"00292"],
["aefiyohd","GMC Savana / Chevrolet Express","long\n2003‑uptodate","van",86,"00293"],
["ieghaeji","GMC Savana / Chevrolet Express","long slide‑door\n2003‑uptodate","van",85,"00294"],
["oraizohm","GMC Savana / Chevrolet Express","regular\n2003‑uptodate","van",91,"00295"],
["daidotoo","GMC Savana / Chevrolet Express","regular slide‑door\n2003‑uptodate","van",88,"00296"],
["shaekaph","Honda Accord","coupe\n2008‑uptodate","car",71,"00297"],
["zohsoowa","Honda Accord","crosstour\n2010‑2014","car",74,"00298"],
["ooviquie","Honda Civic","coupe\n2004‑2005","car",75,"00299"],
["tieteise","Honda Civic","coupe\n2006‑2011","car",78,"00300"],
["alaebica","Honda Civic","sedan\n2006‑2010","car",75,"00301"],
["phohyies","Honda Civic","SI\n2003‑2005","car",82,"00302"],
["pohcevah","Honda Civic","SI\n2006‑2007","car",81,"00303"],
["erecaipu","Honda CR‑Z","2011‑2014","car",75,"00304"],
["aevetied","Honda Element","2003‑2007","suv",88,"00305"],
["zeequome","Honda Fit","2007‑2008","car",82,"00306"],
["aeteepol","Honda Fit","2009‑uptodate","car",83,"00307"],
["kainahdi","Honda Insight","2010‑2014","car",78,"00308"],
["eitheene","Honda S2000","2007‑uptodate","car",73,"00309"],
["aseecaim","Honda Ridgeline","2006‑2014","pickup",85,"00310"],
["hawahgae","Honda CR‑V","2007‑2011","suv",81,"00311"],
["mohveeci","Honda CR‑V","2004‑2006","suv",86,"00312"],
["ychiehoh","Honda Element","2003‑2007","suv",88,"00313"],
["chelahye","Honda Element","2008‑2011","suv",89,"00314"],
["shohcool","Honda Odyssey","2004","van",87,"00315"],
["uyeehied","Honda Odyssey","2005‑2010","van",86,"00316"],
["kahpailo","Honda Odyssey","2011‑uptodate","van",78,"00317"],
["emiesooz","Honda Pilot","2003‑2008","suv",86,"00318"],
["shohgoxe","Honda Pilot","2009‑2015","suv",82,"00319"],
["mshophei","Hummer H2","2003‑2009","suv",89,"00320"],
["eineewip","Hummer H3","2006‑2009","suv",92,"00321"],
["poteijap","Hyundai Accent","2‑door\n2004‑2005","car",80,"00322"],
["vevayohn","Hyundai Accent","2‑door hatchback\n2008‑2011","car",81,"00323"],
["riexuquu","Hyundai Accent","4‑door\n2004‑2005","car",78,"00324"],
["aepahfug","Hyundai Accent","2006‑2011","car",81,"00325"],
["aiquiepu","Hyundai Elantra","4‑door hatchback\n2004‑2008","car",111,"00326"],
["aichohle","Hyundai Elantra","sedan\n2006‑2011","car",78,"00327"],
["owighoor","Hyundai Genesis","coupe\n2009‑uptodate","car",71,"00328"],
["shimahxi","Hyundai Tiburon","2004‑2007","car",74,"00329"],
["angeghae","Hyundai Tiburon","2008","car",74,"00330"],
["gohquoxa","Hyundai Entourage","2007‑2009","van",80,"00331"],
["eenudeng","Hyundai Santa‑Fe","2003‑2006","suv",85,"00332"],
["oniethoh","Hyundai Santa‑Fe","2007‑2012","suv",87,"00333"],
["jquohsee","Hyundai Tucson","2005‑2009","suv",80,"00334"],
["yoghahdo","Hyundai Tucson","2010‑2015","suv",87,"00335"],
["iemahgho","Hyundai Veracruz","2008‑2015","suv",86,"00336"],
["aigaethe","Jeep Commander","2006‑2011","suv",86,"00337"],
["aexahsei","Jeep Compass","2007‑2015","suv",82,"00338"],
["cailaero","Jeep Grand‑Cherokee","2003‑2004","suv",84,"00339"],
["edepaefa","Jeep Grand‑Cherokee","2005‑2010","suv",82,"00340"],
["ujexoqui","Jeep Grand‑Cherokee","2011‑2013","suv",85,"00341"],
["shuthana","Jeep Liberty","limited‑edition\n2003‑2007","suv",86,"00342"],
["eiquahth","Jeep Liberty","Renegade\n2003‑2007","suv",93,"00343"],
["aenaewie","Jeep Liberty","sport\n2003‑2007","suv",89,"00344"],
["tumaewoo","Jeep Liberty","2008‑2009","suv",90,"00345"],
["iesekaeg","Jeep Patriot","2007‑2015","suv",87,"00346"],
["ogahphoj","Jeep TJ","2004‑2006","suv",92,"00347"],
["hangongu","Jeep TJ","unlimited\n2005‑2009","suv",87,"00348"],
["cilaezox","Jeep Wrangler","2‑door\n2007‑uptodate","suv",87,"00349"],
["wsoovagu","Jeep Wrangler","4‑door\n2007‑uptodate","suv",85,"00350"],
["ohmuhiez","Kia Forte","2010‑uptodate","car",75,"00351"],
["phahquom","Kia Koup","2010‑uptodate","car",76,"00352"],
["zfwthoye","Kia Rio","2006‑2011","car",86,"00353"],
["giepoobi","Kia Rondo","2007‑2012","car",86,"00354"],
["thegaech","Kia Soul","2010‑2013","car",87,"00355"],
["ahgetihu","Kia Spectra","2007‑2009","car",76,"00356"],
["eenaichi","Kia Borrego","2009‑2011","suv",81,"00357"],
["obahdieb","Kia Sedona","2004‑2005","suv",82,"00358"],
["baingizu","Kia Sedona","2006‑2012","suv",82,"00359"],
["eijahzee","Kia Sorento","2004‑2009","suv",87,"00360"],
["quuyeegh","Kia Sorento","2010‑2015","suv",81,"00361"],
["ahfituci","Kia Sportage","2005‑2006","suv",87,"00362"],
["wooxeegi","Kia Sportage","2007‑2010","suv",83,"00363"],
["thilooja","Kia Sportage","2011‑2015","suv",83,"00364"],
["gshoosoh","Lincoln Navigator","L\n2008‑uptodate","suv",81,"00365"],
["eefepohj","Mazda 2","2011‑uptodate","car",84,"00366"],
["hangiebe","Mazda 3","2004‑2009","car",80,"00367"],
["rnoothie","Mazda 3","2010‑2013","car",79,"00368"],
["aekoceis","Mazda 3","sedan\n2010‑2013","car",82,"00369"],
["eedoxeet","Mazda MX5 / Miata","2008‑uptodate","car",70,"00370"],
["cheixiem","Mazda Protege / 5","2003","car",75,"00371"],
["xmthuyoo","Mazda RX‑8","2008‑2012","car",74,"00372"],
["ohtheebi","Mazda Speed3","2010‑2013","car",78,"00373"],
["ooneibee","Mazda B‑Series","2004‑2009","pickup",82,"00374"],
["nefeicop","Mazda 5","2006‑2011","van",86,"00375"],
["xghootee","Mazda CX‑7","2007‑2012","suv",81,"00376"],
["amohnavo","Mazda CX‑9","2007‑uptodate","suv",80,"00377"],
["choseefo","Mazda MPV","2003‑2006","van",84,"00378"],
["uyeequuw","Mazda Tribute","2004‑2005","suv",88,"00379"],
["nquaecer","Mazda Tribute","2006","suv",87,"00380"],
["reishoga","Mazda Tribute","2007‑2011","suv",85,"00381"],
["ohshitie","Mini Clubman","2008‑uptodate","car",81,"00382"],
["ahghoolu","Mini Cooper","2004‑2007","car",99,"00383"],
["ipohsegu","Mitsubishi Lancer","evolution\n2003‑uptodate","car",88,"00384"],
["tkooxahp","Mitsubishi Lancer","2008‑uptodate","car",76,"00385"],
["fxmsaefu","Mitsubishi Raider","crew‑cab\n2006‑2009","pickup",79,"00386"],
["chahkati","Mitsubishi Raider","extended‑cab\n2006‑2009","pickup",80,"00387"],
["ooleetha","Mitsubishi Endeavor","2004‑2009","suv",87,"00388"],
["xaegheiy","Mitsubishi Montero","2003‑2006","suv",87,"00389"],
["aiwiteke","Mitsubishi Montero","sport\n2003‑2004","suv",86,"00390"],
["eiyipeif","Mitsubishi Outlander","2004‑2006","suv",85,"00391"],
["oonohche","Mitsubishi Outlander","2007‑2012","suv",86,"00392"],
["gjieghuh","Nissan Cube","2009‑2014","car",94,"00393"],
["xphahnah","Nissan Versa Note","2007‑2013","car",81,"00394"],
["dxeeried","Nissan Frontier","extended‑cab\n2003‑2004","pickup",113,"00395"],
["aichipie","Nissan Frontier","regular‑cab\n2003‑2004","pickup",114,"00396"],
["paiyeipo","Nissan Frontier","crew‑cab\n2005‑uptodate","pickup",83,"00397"],
["iboophop","Nissan Frontier","king‑cab\n2005‑uptodate","pickup",83,"00398"],
["gahxeegh","Nissan Titan","crew‑cab\n2004‑2015","pickup",82,"00399"],
["fgzahniz","Nissan Titan","king‑cab\n2004‑2015","pickup",84,"00400"],
["mohpooko","Nissan Armada","2004‑2016","suv",83,"00401"],
["eizepoma","Nissan Juke","2011‑uptodate","suv",80,"00402"],
["ojielati","Nissan Murano","2003‑2013","suv",85,"00403"],
["oyaimahm","Nissan Pathfinder","2003‑2004","suv",124,"00404"],
["aijacoog","Nissan Pathfinder","2005‑2012","suv",88,"00405"],
["uduweixi","Nissan Quest","2004‑2010","van",86,"00406"],
["zrohcaem","Nissan Quest","2011‑2014","van",83,"00407"],
["ooditaid","Nissan Xterra","2003‑2004","suv",89,"00408"],
["niweilah","Nissan Xterra","2005‑2015","suv",89,"00409"],
["bliquaez","Nissan Rogue","X‑Trail\n2008‑uptodate","suv",84,"00410"],
["aethufae","Oldsmobile Bravada","2004","suv",83,"00411"],
["tnxlaete","Oldsmobile Silhouette","2004","van",83,"00412"],
["echeiquo","Chevrolet Impala","2005","car",74,"00413"],
//["achohsix","Chevrolet Impala","police","2006‑2015","car",80,"00414"],
["eewuwaer","Dodge Charger","2007‑2010","car",73,"00415"],
["waengahd","Dodge Magnum","2006‑2009","car",71,"00416"],
//["chafooxo","Ford Crown","Victoria / Grand Marquis police","2005‑2011","car",79,"00417"],
["sthejoox","Ford Crown Victoria / Grand Marquis","2005‑2011","car",72,"00418"],
["vmiefuch","Pontiac G6","2007","car",114,"00419"],
["tsaethah","Pontiac G6","2008‑2009","car",117,"00420"],
["laexaela","Pontiac GTO","2005‑2006","car",74,"00421"],
["neeputhi","Pontiac Solstice","2007‑2009","car",73,"00422"],
["shigabae","Pontiac Sunfire","2004‑2005","car",74,"00423"],
["quoopeem","Pontiac Vibe","2004‑2008","car",84,"00424"],
["eishahmu","Pontiac Vibe","2009‑2010","car",80,"00425"],
["oowiciga","Pontiac Wave","4‑door canadian\n2004‑2006","car",117,"00426"],
["lafohree","Pontiac Wave","5‑door canadian\n2004‑2006","car",91,"00427"],
["ahlohvei","Pontiac Aztek","2004‑2005","suv",80,"00428"],
["phemooxe","Pontiac Montana","2006‑2009","van",82,"00429"],
["phohrahs","Pontiac Montana","extended\n2004‑2005","van",82,"00430"],
["gsenucoh","Pontiac Montana","regular\n2004‑2005","van",88,"00431"],
["hwaetash","Pontiac SV6","2006","van",82,"00432"],
["ienithoo","Pontiac Torrent","2007‑2009","suv",85,"00433"],
["neewoyov","Saturn Astra","2008‑2009","car",79,"00434"],
["ukeefiel","Saturn Ion","2003‑2007","car",77,"00435"],
["ahmeitah","Saturn Sky","2007‑2009","car",78,"00436"],
["ujagahng","Saturn Outlook","2007‑2009","suv",82,"00437"],
["haebaeyu","Saturn Relay","2006‑2007","van",83,"00438"],
["sophaebo","Saturn Vue","2003‑2007","suv",124,"00439"],
["vzoosaif","Saturn Vue","2008‑2009","suv",85,"00440"],
["geesheng","Smart Fortwo","2006‑2007","car",111,"00441"],
["jaishuko","Smart Fortwo","2008‑2015","car",102,"00442"],
["shukisae","Subaru Baja","sport\n2004‑2006","car pickup",82,"00443"],
["sieghawu","Subaru Impreza","4‑door hatchback\n2008‑2014","car",79,"00444"],
["hivohjim","Subaru Impreza","sedan\n2008‑2014","car",75,"00445"],
["lkzaetah","Subaru Impreza","sedan WRX\n2008‑2014","car",75,"00446"],
["xabohyuw","Subaru Impreza","wagon\n2004‑2007","car",79,"00447"],
["leivipoo","Subaru Impreza","WRX 4‑door hatchback\n2008‑2014","car",79,"00448"],
["ieshaehe","Subaru Impreza","WRX\n2004‑2007","car",77,"00449"],
["ceicufah","Subaru Impreza","WRX STI\n2008‑2014","car",80,"00450"],
["quoowooh","Subaru Outback","2006‑2009","car",76,"00451"],
["syooghoo","Subaru Outback","2010‑2014","car",83,"00452"],
["lyohquus","Subaru Outback","sport\n2006‑2009","car",82,"00453"],
["thupecei","Subaru B9","Tribeca\n2006‑2007","suv",85,"00454"],
["fajuveek","Subaru Tribeca","2008‑2014","suv",85,"00455"],
["phowisho","Subaru Forester","2004‑2008","suv",84,"00456"],
["wdzeekox","Subaru Forester","2009‑2013","suv",87,"00457"],
["quivange","Suzuki Aerio","2004‑2007","car",123,"00458"],
["ohmaisie","Suzuki Swift","5‑door\n2004‑2011","car",130,"00459"],
["shooxahy","Suzuki SX4","2007‑2014","car",83,"00460"],
["eideiche","Suzuki Equator","6ft box\n2009‑2014","pickup",78,"00461"],
["eigheefo","Suzuki Equator","crew‑cab 6ft box\n2009‑2014","pickup",76,"00462"],
["oshaivee","Suzuki Equator","crew‑cab\n2009‑2014","pickup",78,"00463"],
["oorahngo","Suzuki Grand","Vitara\n2004‑2005","suv",88,"00464"],
["tohvohlo","Suzuki Grand","Vitara\n2006‑2014","suv",92,"00465"],
["twsheepa","Suzuki Vitara","convertible\n2004","pickup",97,"00466"],
["gooquoze","Suzuki XL‑7","2004‑2006","van",84,"00467"],
["vaxeshes","Suzuki XL‑7","2007‑2009","van",86,"00468"],
["thahmohc","Scion XA","2004‑2007","car",126,"00469"],
["saechaix","Toyota Echo","2‑door coupe\n2004‑2005","car",85,"00470"],
["phemohcu","Toyota Echo","4‑door\n2004‑2005","car",132,"00471"],
["aipohkei","Toyota Echo","2003‑2005","car",132,"00472"],
["uxooxagh","Toyota Matrix","2004‑2008","car",84,"00473"],
["yahnaego","Toyota Matrix","2009‑2014","car",85,"00474"],
["ooyohnot","Toyota Prius","2004‑2009","car",86,"00475"],
["iedeexie","Toyota Prius","2010‑2015","car",80,"00476"],
["eiciquaz","Toyota Venza","2009‑2015","suv",79,"00477"],
["ievogase","Toyota Yaris","2‑door\n2006‑2013","car",78,"00478"],
["aethakoo","Toyota Yaris","4‑door hatchback\n2006‑2013","car",80,"00479"],
["feteeghu","Toyota Yaris","sedan\n2008‑2013","car",75,"00480"],
["ahaegaco","Toyota Tacoma","crew‑cab\n2003‑2004","pickup",118,"00481"],
["bapahpae","Toyota Tacoma","access‑cab\n2005‑2015","pickup",75,"00482"],
["zoozagie","Toyota Tacoma","crew‑cab\n2005‑2015","pickup",75,"00483"],
["leengael","Toyota Tundra","2003","pickup",114,"00484"],
["nadagaqu","Toyota Tundra","regular\n2003","pickup",117,"00485"],
["upureejo","Toyota Tundra","access‑cab\n2004‑2006","pickup",82,"00486"],
["eduphaex","Toyota Tundra","crew‑cab\n2004‑2006","pickup",80,"00487"],
["chiekaif","Toyota Tundra","regular‑cab\n2004‑2006","pickup",78,"00488"],
["ooroodek","Toyota Tundra","crew‑cab\n2007‑2013","pickup",78,"00489"],
["eeyuquud","Toyota Tundra","crew‑cab long\n2007‑2013","pickup",73,"00490"],
["ifohrexe","Toyota Tundra","crewmax\n2008‑2013","pickup",76,"00491"],
["jaisieth","Toyota Tundra","regular‑cab long\n2007‑2013","pickup",76,"00492"],
["ciphievu","Toyota Tundra","regular‑cab short\n2007‑2013","pickup",76,"00493"],
["thijebaf","Scion XB / BB","2004‑2007","car",129,"00494"],
["iezephoo","Toyota 4Runner","2004‑2009","suv",87,"00495"],
["muhephoc","Toyota 4Runner","2010‑uptodate","suv",81,"00496"],
["veichere","Toyota FJ‑Cruiser","2007‑2014","suv",86,"00497"],
["daefaela","Toyota Highlander","2003‑2007","suv",82,"00498"],
["iecewohl","Toyota Highlander","2008‑2013","suv",82,"00499"],
["enengiwo","Toyota Rav‑4","2003‑2005","suv",88,"00500"],
["pheevohp","Toyota Rav‑4","2006‑2012","suv",87,"00501"],
["izaelohm","Toyota Sequoia","2003‑2008","suv",85,"00502"],
["wrveewob","Toyota Sequoia","2009‑uptodate","suv",81,"00503"],
["olahiede","Toyota Sienna","2004‑2010","van",83,"00504"],
["fasooyap","Toyota Sienna","2011‑uptodate","van",82,"00505"],
["umifijic","Volkswagen Golf","2003‑2009","car",78,"00506"],
["eimoohae","Volkswagen Jetta","2007‑2010","car",79,"00507"],
["teehinit","Volkswagen New‑Beetle","2003‑2011","car",86,"00508"],
["aihaevoo","Volkswagen Rabbit GTI","2007‑2009","car",77,"00509"],
["cfutaipi","Volkswagen Routan","2009‑2012","van",82,"00510"],
["iemeeque","Volkswagen Tiguan","2009‑uptodate","suv",85,"00511"],
["oongaiqu","Volkswagen Touareg","2004‑2010","suv",83,"00512"],
["epieleiz","Freightliner Argosy","day‑cab\n2001‑2006","tractor truck",152,"00513"],
["eemiketh","Freightliner Argosy","medium‑roof\n2001‑2006","tractor truck",147,"00514"],
["asahgaiz","Freightliner Argosy","raised‑roof\n2001‑2006","tractor truck",153,"00515"],
["agaegees","Freightliner Cascadia","","tractor truck",131,"00516"],
["veireenu","Freightliner Columbia","day‑cab\n2004‑uptodate","tractor truck",111,"00517"],
["vaijeeta","Freightliner Columbia","day‑cab deflector\n2004‑uptodate","tractor truck",127,"00518"],
["aphiengi","Freightliner Columbia","medium‑roof\n2004‑uptodate","tractor truck",132,"00519"],
["aimoopai","Freightliner Columbia","raised‑roof\n2004‑uptodate","tractor truck",134,"00520"],
["iewielae","Freightliner Coronado","day‑cab\n2004‑uptodate","tractor truck",153,"00521"],
["chievoof","Freightliner Coronado","medium‑roof\n2004‑uptodate","tractor truck",129,"00522"],
["eidozeih","Freightliner Coronado","raised‑roof\n2004‑uptodate","tractor truck",133,"00523"],
["elewiejo","Freightliner M2","26in extended‑cab\n2003‑uptodate","tractor truck",129,"00524"],
["ahghaevi","Freightliner M2","48in crew‑cab\n2003‑uptodate","tractor truck",132,"00525"],
["aiparome","Freightliner M2","day‑cab\n2003‑uptodate","tractor truck",133,"00526"],
["tbahwosh","GMC Topkick","C4500 / C5500","tractor truck",106,"00527"],
["quieghil","GMC T‑Series","T7500","tractor truck",108,"00528"],
["ahgoolee","Hino FA1517","2008‑2009","tractor truck",86,"00529"],
["icuquiem","Hino Low‑Profile","258\n2009","tractor truck",103,"00530"],
["ahviexae","International 8500","regular","tractor truck",144,"00531"],
["denemiem","International 9200i","","tractor truck",143,"00532"],
["eikohyai","International 9200i","9400i high‑roof","tractor truck",141,"00533"],
["pghighai","International 9200i","9400i low‑roof","tractor truck",121,"00534"],
["aiseiwoh","International 9200i","deflector","tractor truck",149,"00535"],
["upaiweyu","International 9900i","sleeper high‑roof","tractor truck",144,"00536"],
["oophethu","International 9900i","sleeper medium‑roof","tractor truck",131,"00537"],
["faicadoo","International 9900ix","deflector","tractor truck",179,"00538"],
["rogahxei","International 9900ix","regular","tractor truck",146,"00539"],
["chemevie","International CF‑Series","","tractor truck",104,"00540"],
["zebahxok","International CXT","2006","tractor truck",116,"00541"],
["njereibe","International Lonestar","","tractor truck",124,"00542"],
["oofeethi","Kenworth T600","sleeper\n2004‑uptodate","tractor truck",142,"00543"],
["leexeepi","Kenworth T800","deflector\n2004‑uptodate","tractor truck",155,"00544"],
["eechiewi","Kenworth T800","regular‑hood extended‑cab\n2004‑uptodate","tractor truck",138,"00545"],
["ohdahtei","Kenworth T800","sleeper\n2004‑uptodate","tractor truck",124,"00546"],
["eedaphil","Kenworth T2000","uptodate","tractor truck",140,"00547"],
["aechieve","Kenworth W900","sleeper\n2004‑uptodate","tractor truck",137,"00548"],
["yxixohze","Mack CHN603","day‑cab","tractor truck",147,"00549"],
["kuquebep","Mack Vision","day‑cab","tractor truck",130,"00550"],
["hzookeef","Mack Vision","day‑cab deflector","tractor truck",135,"00551"],
["ahheiyei","Mack Vision","sleeper","tractor truck",135,"00552"],
["ocixahya","Mitsubishi Fuso","FE‑180","tractor truck",83,"00553"],
["pheisaef","Peterbilt 330","108in BBC","tractor truck",109,"00554"],
["aishiepa","Peterbilt 357","111in BBC","tractor truck",139,"00555"],
["wmoxopah","Peterbilt 357","119in BBC sloped‑hood","tractor truck",139,"00556"],
["cheecahm","Peterbilt 362","76 BBC flat‑nose","tractor truck",149,"00557"],
["utohfaiy","Peterbilt 362","90 BBC flat‑nose","tractor truck",150,"00558"],
["oosusibu","Peterbilt 379","long city\n2004‑2009","tractor truck",125,"00559"],
["quoshohj","Peterbilt 379","long sleeper 69in\n2004‑2009","tractor truck",130,"00560"],
["pohraish","Peterbilt 379","short city\n2004‑2009","tractor truck",134,"00561"],
["eetakaqu","Peterbilt 385","112in BBC","tractor truck",130,"00562"],
["ohphoxah","Peterbilt 385","120in BBC","tractor truck",126,"00563"],
["angaexah","Peterbilt 387","high‑roof sleeper\n2004‑2009","tractor truck",140,"00564"],
["aiyohhoo","Peterbilt 387","medium‑roof sleeper\n2004‑2007","tractor truck",116,"00565"],
["ushiejae","Sterling Acterra","","tractor truck",141,"00566"],
["rwjoothe","Volvo Highway","2003‑uptodate","tractor truck",137,"005677"],
["mlquahgi","Volvo Highway","VN‑730\n2008‑uptodate","tractor truck",133,"00568"],
["meecoqui","Volvo VT‑800","2006‑uptodate","tractor truck",152,"00569"],
["ohliecek","Western Star","4900 EX","tractor truck",153,"00570"],
["chiejail","Western Star","4900 FA","tractor truck",151,"00571"],
["aivayaef","Western Star","4900 SA","tractor truck",153,"00572"],
["ishiniye","Western Star","6900 XD","tractor truck",149,"00573"],
["wdeeghek","45ft trailer","","trailer",102,"00574"],
["aemahhoh","48ft trailer","","trailer",99,"00575"],
["ahngahza","53ft trailer","","trailer",87,"00576"],
["cquooyah","trailer front","/ rear dry‑box","trailer",92,"00577"],
["ohheghie","trailer front","/ rear refer‑box","trailer",94,"00578"]
];var prettify=function prettify(text){var now=2017;var rules=[[/uptodate/i,now+""],[now+"‑"+now,now+""],[now+1+"‑"+now,now+1+""]];rules.forEach(function(i){text=text.replace(i[0],i[1]);});return text;};var getSearchString=function getSearchString(text){var searchText=text.replace("\n"," ");var noSpace=searchText.replace(/‑/g,""),space=searchText.replace(/‑/g," "),dash=searchText.replace(/‑/g,"-"),chevy=searchText.replace("Chevrolet","Chevy"),range=searchText.replace(/20\d\d‑20\d\d/,expandRange);return searchText+" "+noSpace+" "+space+" "+dash+" "+chevy+" "+range+" ";};WS.data.forEach(function(item){var _item=_slicedToArray(item,6);var rawURL=_item[0];var rawText=_item[1];var rawDesc=_item[2];var _item$=_item[3];var tags=_item$===undefined?"":_item$;var height=_item[4];var sku=_item[5];var buyURL="http://signshophelper.fetchapp.com/sell/"+rawURL+"/ppc";item.prettyText=rawText;item.prettyDesc=prettify(rawDesc);item.node=linkTemplate(buyURL,item.prettyText,item.prettyDesc,tags,height);item.imageURL=imagePath+sku+"-thumb.jpg";if((window.devicePixelRatio||1)>1.5){item.imageURL=imagePath+sku+".jpg";}item.imageLoaded=false;item.searchText=getSearchString(item.prettyText+"\n"+item.prettyDesc)+tags;});dom.query("[for=toggle-info]").on("click",function(e){dom.queryAll("[data-src]").forEach(function(i){i.src=imagePath+i.getAttribute("data-src");});});var cover=dom("div",{"class":"cover"},dom("iframe",{src:"faq"})).on("click",function(e){e.preventDefault();cover.remove();});dom.query("#faq").on("click",function(e){e.preventDefault();dom.body.append(cover);});var infoBlockElement=dom.query("#toggle-info");WS.inputElement.on("input",function(){if(infoBlockElement.checked!==false)infoBlockElement.checked=false;});inputFormElement.on("submit",function(e){history.pushState("","","?search="+WS.inputElement.value);e.preventDefault();});WS.inputElement.value=getQueryVariable("search");WS.search();WS.containerElement.on("click",function(event){if(event.target.href)event.target.classList.add("clicked");});