

// dom 4 shim https://github.com/WebReflection/dom4
<?php include 'dom4.js'; ?>
//dom manipulation lib
<?php include 'dom.js'; ?>
//search lib
<?php include 'WS.js'; ?>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UTILITY FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var mapObject=(o,ƒ)=>{
	var n = {}
	Object.keys(o)
		.forEach(v=>{n[v] = ƒ(o[v],v)})
	return n
};

var getQueryVariable = function(a){
	return unescape(
		(
			RegExp("[&?]"+a+"=([^&]+)")
				.exec(location)
				||["",""]
		)[1]||""
	)
};

var mergeObject=function(a,b){
	for(var i in b)
		a[i] = b[i]
	return a
};

var addMethods = (a,b)=>{
	for(var i in b)
		a.prototype[i] = b[i]
}

var range = function(start, stop) {

	var length = stop - start;
	var range = Array(length);
	var i=0;

	for (; i < length; i++, start++)
		range[i] = start;

	return range;
};

var expandRange = function(rangeString){
	var ends = rangeString.split("‑");
	var start = +ends[0];
	var stop  = +ends[1];
	return range(start,stop).join(" ")
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var  imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/"
	,inputFormElement = dom.query("#inputform")
	,showAllLink =
		dom("a",{id:"showalllink"},"show all")
			.on("click",WS.showAll)
	,linkTemplate = (link,text,desc,tags,height)=>
		dom("a",{
				 target:"paypal"
				,href:link
				,itemscope:""
				,itemtype:"http://schema.org/Product"
			}
			,dom("img",{height,width:150,itemprop:"image",alt:" "})
			,dom("strong",{itemprop:"name"},text)
			,dom("span",{itemprop:"name"},desc)
			,dom("span",{itemprop:"offers",itemscope:"",itemtype:"http://schema.org/AggregateOffer",hidden:"hidden"}
				,dom("span",{itemprop:"priceCurrency",content:"USD"},"$")
				,dom("span",{itemprop:"price",content:"19.00"},"19")
				,dom("span",{itemprop:"lowPrice",content:"19.00"},"19")
			)
			,dom("div",{class:"add-button"},"Add to Cart")
		)

var setArea = function(){
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var area = ((h-168)*w)/42302;
	area = Math.max(area,10)|0;

	WS.idealArea = area
	WS.area = area
}
setArea();
onresize = setArea;

dom.query("#showalllink").on("click",WS.showAll)

WS.search.on("appendnode",item=>{
	if(!item.imageLoaded)    	               		//test if image is loaded (very important for perf!!!)
		 item.node.firstChild.src = item.imageURL 	//load image
		,item.imageLoaded 		  = true 		  	//cache that the image was loaded
})

WS.search.on("fragmentpopulated",(fragment,array)=>{
	if(array.length===WS.idealArea)
		fragment.append(showAllLink)
})

//include data
<?php include 'data.js'; ?>
//process data

var prettify = text=>{
	var now=2017;//(new Date).getFullYear();
	var rules=[
		//date formating
		 [/uptodate/i,now+""]
		,[now+"‑"+now,now+""]
		,[(now+1)+"‑"+now,(now+1)+""]
	]

	rules.forEach(i=>{
		text = text.replace(i[0],i[1])
	})

	return text
}

var getSearchString = text=>{
	var  searchText = text.replace("\n", " ")
	var  noSpace = searchText.replace(/‑/g, "" )
		,space   = searchText.replace(/‑/g, " ")
		,dash    = searchText.replace(/‑/g, "-")
		,chevy   = searchText.replace("Chevrolet", "Chevy")
		,range   = searchText.replace(/20\d\d‑20\d\d/,expandRange)

	return `${searchText} ${noSpace} ${space} ${dash} ${chevy} ${range} `
}

WS.data.forEach(item=>{
	
	var [rawURL,rawText,rawDesc,tags="",height,sku] = item
		,buyURL  = "http://signshophelper.fetchapp.com/sell/" + rawURL + "/ppc"

	item.prettyText	 = rawText
	item.prettyDesc	 = prettify(rawDesc)
	item.node 		 = linkTemplate(buyURL,item.prettyText,item.prettyDesc,tags,height)
	item.imageURL 	 = imagePath + sku + "-thumb.jpg"
	if((window.devicePixelRatio||1)>1.5){
		item.imageURL = imagePath + sku + ".jpg"
	}
	item.imageLoaded = false
	item.searchText  = getSearchString(item.prettyText+"\n"+item.prettyDesc) + tags

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROGRAMMING
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//defered images
dom.query("[for=toggle-info]").on("click",e=>{
	dom.queryAll("[data-src]")
		.forEach(i=>{
			i.src = imagePath + i.getAttribute("data-src")
		})
})

//faq cover

var cover=dom(
	 "div"
	,{"class":"cover"}
	,dom("iframe",{src:"faq"})
)
	.on("click",e=>{
		e.preventDefault()
		cover.remove()
	})

dom.query("#faq")
	.on("click",e=>{
		e.preventDefault()
		dom.body.append(cover)
	})

//hide info on text input
var infoBlockElement = dom.query("#toggle-info");
WS.inputElement
	.on("input",function(){
		if(infoBlockElement.checked !== false)
			infoBlockElement.checked = false;
	})


//hardlinking

inputFormElement
	.on("submit",e=>{
		history.pushState("","","?search="+WS.inputElement.value);
		e.preventDefault()
	})


WS.inputElement.value = getQueryVariable("search")

WS.search()


//clicked indicator


WS.containerElement.on("click",event=>{
	if(event.target.href)
		event.target.classList.add("clicked")
})


//stylesheet load
//https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery

var cb = function() {
var l = document.createElement('link'); l.rel = 'stylesheet';
l.href = 'http://fonts.googleapis.com/css?family=Ubuntu:400,700';
var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
  webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);
