var WS={};


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


})()