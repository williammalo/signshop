var WS={}

//defaults
WS.idealArea = 15
WS.area = 15

//filter that respects WS.area
WS.filter = function(array,callback) {
	var result = [];

	var  index = -1
		,length = array.length
		,value
		,resultLength = 0

	while (++index < length) {
		value = array[index];
		if ((resultLength<WS.area)&&callback(value, index, array)){  //for showall
			result[resultLength] = value
			resultLength+=1
	  	}
	}
	return result
}

WS.match = (keyword,target)=>{
	if(keyword==="")
		return true  //for perf
	var keywordList = keyword
			.split(" ")
			.map(a=>RegExp(a,"i"))

	return keywordList.every(a=>a.test(target))
}

WS.getResults = (keyword,reverse)=>
	WS.filter(
		 WS.data
		,i=>WS.match(keyword,i.searchText)^reverse
	)

WS.search = function(args={}){
	var {keyword=WS.inputElement.value,reverse} = args

	var onappendnode = WS.search.onappendnode||function(){}
	var onfragmentpopulated = WS.search.onfragmentpopulated||function(){}

	var  array       = WS.getResults(keyword,reverse)
		,fragment    = dom.fragment()
	
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