var graphics={};

graphics.setup=function(){
	var a=graphics.list
	document.getElementsByClassName("content")[0].innerHTML="<div id=buts>"+
	"<button data-category='ky'>kentucky</button>"+
	"<button data-category='y2k'>y2k</button>"+
	"<button data-category='x-trim'>x-trim</button>"+
	"<button data-category='power'>flower power</button>"+
	"<button data-category='pin'>pinstripe</button>"+
	"<button data-category='mozart'>mozart</button>"+
	"<button data-reverse='' data-category='ky|y2k|x-trim|power|pin|mozart'>other</button>"+
	"<button data-category=''>all</button>"+
	"</div><div id='logs'></div>"
	
	document.getElementById("buts").onclick=function(e){
		if(!e){e={};e.target=event.srcElement}
		if(e.target.hasAttribute("data-category")){
			list(e.target.getAttribute("data-category"),e.target.hasAttribute("data-reverse"))
		}
	}

	var list=function(q,n){
		var i,txt="";
		for(i in a){
		if(n?!RegExp(q,"i").test(a[i][1]):RegExp(q,"i").test(a[i][1]))
			txt+="<a href='http://www.payloadz.com/go/?id="+a[i][0]+"' target='_blank'><img src='g/"+a[i][1]+".png'></a>"
		}
		document.getElementById("logs").innerHTML=txt;
	}
	list("ky")
}

graphics.list=[
	// [1896083,"zx-2-2"]
	//,[1896082,"zx-2-1"]
	 [1896081,"y2k"]
	,[1896080,"y2k-39"]
	,[1896079,"y2k-38"]
	,[1896078,"y2k-37"]
	,[1896077,"y2k-36"]
	,[1896076,"y2k-35"]
	,[1896075,"y2k-34"]
	,[1896074,"y2k-33"]
	,[1896073,"y2k-32"]
	,[1896072,"y2k-31"]
	,[1896071,"y2k-30"]
	,[1896070,"y2k-29"]
	,[1896069,"y2k-28"]
	,[1896068,"y2k-27"]
	,[1896067,"y2k-26"]
	,[1896066,"y2k-25"]
	,[1896065,"y2k-24"]
	,[1896064,"y2k-23"]
	,[1896063,"y2k-22"]
	,[1896062,"y2k-21"]
	,[1896061,"y2k-20"]
	,[1896060,"y2k-19"]
	,[1896059,"y2k-18"]
	,[1896058,"y2k-17"]
	,[1896057,"y2k-16"]
	,[1896056,"y2k-15"]
	,[1896055,"y2k-14"]
	,[1896054,"y2k-13"]
	,[1896053,"y2k-12"]
	,[1896052,"y2k-11"]
	,[1896051,"y2k-10"]
	,[1896050,"y2k-9"]
	,[1896049,"y2k-8"]
	,[1896048,"y2k-7"]
	,[1896047,"y2k-6"]
	,[1896046,"y2k-5"]
	,[1896045,"y2k-4"]
	,[1896044,"y2k-3"]
	,[1896043,"y2k-2"]
	,[1896042,"x-trim-109"]
	,[1896041,"x-trim-108"]
	,[1896040,"x-trim-107"]
	,[1896039,"x-trim-106"]
	,[1896038,"x-trim-105"]
	,[1896037,"x-trim-104"]
	,[1896036,"x-trim-103"]
	,[1896035,"x-trim-102"]
	,[1896034,"x-trim-101"]
	,[1896033,"x-trim-100"]
	,[1896032,"x-trim-2"]
	,[1896031,"x-trim-1"]
	,[1896030,"wynmoor"]
	,[1896029,"workout"]
	,[1896028,"woodline"]
	,[1896027,"winding"]
	//,[1896026,"wind-4"]
	//,[1896025,"wind-3"]
	//,[1896024,"wind-2"]
	//,[1896023,"wind-1"]
	,[1896022,"westport"]
	,[1896021,"wave-up"]
	,[1896020,"waterbri"]
	//,[1896019,"water-17"]
	//,[1896018,"water-16"]
	//,[1896017,"water-15"]
	//,[1896016,"water-14"]
	//,[1896015,"water-13"]
	//,[1896014,"water-12"]
	//,[1896013,"water-11"]
	//,[1896012,"water-10"]
	//,[1896011,"water-9"]
	//,[1896010,"water-8"]
	//,[1896009,"water-7"]
	//,[1896008,"water-6"]
	//,[1896007,"water-5"]
	//,[1896006,"water-4"]
	//,[1896005,"water-3"]
	//,[1896004,"water-2"]
	//,[1896003,"water-1"]
	,[1896002,"walklake"]
	,[1896001,"wagner"]
	//,[1896000,"voyage-3"]
	//,[1895999,"voyage-2"]
	//,[1895998,"voyage-1"]
	,[1895997,"vivaldi"]
	//,[1895996,"ventur-2"]
	//,[1895995,"ventur-1"]
	//,[1895994,"v-6-2"]
	//,[1895993,"v-6-1"]
	,[1895992,"twister"]
	,[1895991,"trend"]
	,[1895990,"tonny"]
	,[1895989,"titan-3"]
	,[1895988,"titan-2"]
	,[1895987,"titan-1"]
	,[1895986,"tiger"]
	//,[1895985,"tiburo-2"]
	//,[1895984,"tiburo-1"]
	,[1895983,"the-mini"]
	,[1895982,"the-maxi"]
	,[1895981,"teel"]
	,[1895980,"tech-dry"]
	,[1895979,"tchaikov"]
	//,[1895978,"tahoe-3"]
	//,[1895977,"tahoe-2"]
	//,[1895976,"tahoe-1"]
	,[1895975,"sweepup"]
	,[1895974,"sweavel"]
	,[1895973,"sunny"]
	//,[1895972,"sunfir-4"]
	//,[1895971,"sunfir-3"]
	//,[1895970,"sunfir-2"]
	//,[1895969,"sunfir-1"]
	//,[1895968,"subur-2"]
	//,[1895967,"subur-1"]
	,[1895966,"strauss"]
	,[1895965,"star-pin"]
	//,[1895964,"st_cruis"]
	//,[1895963,"sport_pk"]
	,[1895962,"speed_a"]
	//,[1895961,"sp_look"]
	,[1895960,"sovat"]
	,[1895959,"southgat"]
	//,[1895958,"sonoma-3"]
	//,[1895957,"sonoma-2"]
	//,[1895956,"sonoma-1"]
	,[1895955,"somerset"]
	//,[1895954,"siler-2"]
	//,[1895953,"siler-1"]
	//,[1895952,"sig99"]
	,[1895951,"seeweed"]
	,[1895950,"seemless"]
	,[1895949,"seagrape"]
	,[1895948,"seafair"]
	,[1895947,"schubert"]
	,[1895946,"scare2"]
	,[1895945,"scare"]
	,[1895944,"scapline"]
	,[1895943,"sanpoint"]
	//,[1895942,"sams-15"]
	//,[1895941,"sams-14"]
	//,[1895940,"sams-13"]
	//,[1895939,"sams-12"]
	//,[1895938,"sams-11"]
	//,[1895937,"sams-10"]
	//,[1895936,"sams-9"]
	//,[1895935,"sams-8"]
	//,[1895934,"sams-7"]
	//,[1895933,"sams-6"]
	//,[1895932,"sams-5"]
	//,[1895931,"sams-4"]
	//,[1895930,"sams-3"]
	//,[1895929,"sams-2"]
	//,[1895928,"sams-1"]
	,[1895927,"rotex"]
	,[1895926,"rokest"]
	,[1895925,"rodfix"]
	//,[1895924,"roadster"]
	,[1895923,"richmond"]
	//,[1895922,"rfm2-90"]
	//,[1895921,"rfm2-89"]
	//,[1895920,"rfm2-88"]
	//,[1895919,"rfm2-87"]
	//,[1895918,"rfm2-86"]
	//,[1895917,"rfm2-85"]
	//,[1895916,"rfm2-84"]
	//,[1895915,"rfm2-83"]
	//,[1895914,"rfm2-82"]
	//,[1895913,"rfm2-81"]
	//,[1895912,"rfm2-80"]
	//,[1895911,"rfm2-79"]
	//,[1895910,"rfm2-78"]
	//,[1895909,"rfm2-77"]
	//,[1895908,"rfm2-76"]
	//,[1895907,"rfm2-75"]
	//,[1895906,"rfm2-74"]
	//,[1895905,"rfm2-73"]
	//,[1895904,"rfm2-72"]
	//,[1895903,"rfm2-71"]
	//,[1895902,"rfm2-70"]
	//,[1895901,"rfm2-69"]
	//,[1895900,"rfm2-68"]
	//,[1895899,"rfm2-67"]
	//,[1895898,"rfm2-66"]
	//,[1895897,"rfm2-65"]
	//,[1895896,"rfm2-64"]
	//,[1895895,"rfm2-63"]
	//,[1895894,"rfm2-62"]
	//,[1895893,"rfm2-61"]
	//,[1895892,"rfm2-60"]
	//,[1895891,"rfm2-59"]
	//,[1895890,"rfm2-58"]
	//,[1895889,"rfm2-57"]
	//,[1895888,"rfm2-56"]
	//,[1895887,"rfm2-55"]
	//,[1895886,"rfm2-54"]
	//,[1895885,"rfm2-53"]
	//,[1895884,"rfm2-52"]
	//,[1895883,"rfm2-51"]
	//,[1895882,"rfm2-50"]
	//,[1895881,"rfm2-49"]
	//,[1895880,"rfm2-48"]
	//,[1895879,"rfm2-47"]
	//,[1895878,"rfm2-46"]
	//,[1895877,"rfm2-45"]
	//,[1895876,"rfm2-44"]
	//,[1895875,"rfm2-43"]
	//,[1895874,"rfm2-42"]
	//,[1895873,"rfm2-41"]
	//,[1895872,"rfm2-40"]
	//,[1895871,"rfm2-39"]
	//,[1895870,"rfm2-38"]
	//,[1895869,"rfm2-37"]
	//,[1895868,"rfm2-36"]
	//,[1895867,"rfm2-35"]
	//,[1895866,"rfm2-34"]
	//,[1895865,"rfm2-33"]
	//,[1895864,"rfm2-32"]
	//,[1895863,"rfm2-31"]
	//,[1895862,"rfm2-30"]
	//,[1895861,"rfm2-29"]
	//,[1895860,"rfm2-28"]
	//,[1895859,"rfm2-27"]
	//,[1895858,"rfm2-26"]
	//,[1895857,"rfm2-25"]
	//,[1895856,"rfm2-24"]
	//,[1895855,"rfm2-23"]
	//,[1895854,"rfm2-22"]
	//,[1895853,"rfm2-21"]
	//,[1895852,"rfm2-20"]
	//,[1895851,"rfm2-19"]
	//,[1895850,"rfm2-18"]
	//,[1895849,"rfm2-17"]
	//,[1895848,"rfm2-16"]
	//,[1895847,"rfm2-15"]
	//,[1895846,"rfm2-14"]
	//,[1895845,"rfm2-13"]
	//,[1895844,"rfm2-12"]
	//,[1895843,"rfm2-11"]
	//,[1895842,"rfm2-10"]
	//,[1895841,"rfm2-9"]
	//,[1895840,"rfm2-8"]
	//,[1895839,"rfm2-7"]
	//,[1895838,"rfm2-6"]
	//,[1895837,"rfm2-5"]
	//,[1895836,"rfm2-4"]
	//,[1895835,"rfm2-3"]
	//,[1895834,"rfm2-2"]
	//,[1895833,"rfm2-1"]
	//,[1895832,"rava-2"]
	//,[1895831,"rava-1"]
	//,[1895830,"ranger-4"]
	//,[1895829,"ranger-3"]
	//,[1895828,"ranger-2"]
	//,[1895827,"ranger-1"]
	//,[1895826,"ram-2"]
	//,[1895825,"ram-1"]
	,[1895824,"raleigh"]
	,[1895823,"raintree"]
	//,[1895822,"raintree 2"]
	,[1895821,"power-16"]
	,[1895820,"power-15"]
	,[1895819,"power-14"]
	,[1895818,"power-13"]
	,[1895817,"power-12"]
	,[1895816,"power-11"]
	,[1895815,"power-10"]
	,[1895814,"power-9"]
	,[1895813,"power-8"]
	,[1895812,"power-7"]
	,[1895811,"power-6"]
	,[1895810,"power-5"]
	,[1895809,"power-4"]
	,[1895808,"power-3"]
	,[1895807,"power-2"]
	,[1895806,"power-1"]
	,[1895805,"pinstate"]
	,[1895804,"pinstat2"]
	,[1895803,"pin-9"]
	,[1895802,"pin-8"]
	,[1895801,"pin-7"]
	,[1895800,"pin-6"]
	,[1895799,"pin-5"]
	,[1895798,"pin-4"]
	,[1895797,"pin-3"]
	,[1895796,"pin-2"]
	,[1895795,"pin-1"]
	//,[1895794,"perform2"]
	//,[1895793,"perform1"]
	//,[1895792,"perf_ath"]
	,[1895791,"pasadena"]
	,[1895790,"paintart"]
	,[1895789,"ovaly"]
	,[1895788,"osaka"]
	,[1895787,"oakhill"]
	//,[1895786,"nip4x4"]
	//,[1895785,"newgen-2"]
	//,[1895784,"newgen-1"]
	//,[1895783,"neon-3"]
	//,[1895782,"neon-2"]
	//,[1895781,"neon-1"]
	//,[1895780,"navig-2"]
	//,[1895779,"navig-1"]
	//,[1895778,"my_car"]
	//,[1895777,"mustang2"]
	//,[1895776,"mustang1"]
	//,[1895775,"mult-gr"]
	,[1895774,"mt_verno"]
	,[1895773,"mozart13"]
	,[1895772,"mozart12"]
	,[1895771,"mozart11"]
	,[1895770,"mozart10"]
	,[1895769,"mozart"]
	,[1895768,"mozart-9"]
	,[1895767,"mozart-8"]
	,[1895766,"mozart-7"]
	,[1895765,"mozart-6"]
	,[1895764,"mozart-5"]
	,[1895763,"mozart-4"]
	,[1895762,"mozart-3"]
	,[1895761,"mozart-2"]
	//,[1895760,"mount-4"]
	//,[1895759,"mount-3"]
	//,[1895758,"mount-2"]
	//,[1895757,"mount-1"]
	,[1895756,"moby"]
	,[1895755,"mito"]
	,[1895754,"mir-lake"]
	,[1895753,"mini"]
	//,[1895752,"metro-3"]
	//,[1895751,"metro-2"]
	//,[1895750,"metro-1"]
	//,[1895749,"maple-18"]
	//,[1895748,"maple-17"]
	//,[1895747,"maple-16"]
	//,[1895746,"maple-15"]
	//,[1895745,"maple-14"]
	//,[1895744,"maple-13"]
	//,[1895743,"maple-12"]
	//,[1895742,"maple-11"]
	//,[1895741,"maple-10"]
	//,[1895740,"maple-9"]
	//,[1895739,"maple-8"]
	//,[1895738,"maple-7"]
	//,[1895737,"maple-6"]
	//,[1895736,"maple-5"]
	//,[1895735,"maple-4"]
	//,[1895734,"maple-3"]
	//,[1895733,"maple-2"]
	//,[1895732,"maple-1"]
	//,[1895731,"malibu-2"]
	//,[1895730,"malibu-1"]
	,[1895729,"largo"]
	,[1895728,"lakeview"]
	,[1895727,"ky"]
	,[1895726,"ky-17"]
	,[1895725,"ky-16"]
	,[1895724,"ky-15"]
	,[1895723,"ky-14"]
	,[1895722,"ky-13"]
	,[1895721,"ky-12"]
	,[1895720,"ky-11"]
	,[1895719,"ky-10"]
	,[1895718,"ky-9"]
	,[1895717,"ky-8"]
	,[1895716,"ky-7"]
	,[1895715,"ky-6"]
	,[1895714,"ky-5"]
	,[1895713,"ky-4"]
	,[1895712,"ky-3"]
	,[1895711,"ky-2"]
	,[1895710,"ky-1"]
	,[1895709,"jaglake"]
	,[1895708,"jacarand"]
	,[1895707,"ireel"]
	//,[1895706,"innovat"]
	,[1895705,"inergraf"]
	//,[1895704,"id_desig"]
	,[1895703,"hugo"]
	,[1895702,"hotz"]
	//,[1895701,"honda-2"]
	//,[1895700,"honda-1"]
	,[1895699,"hillcres"]
	,[1895698,"hi-link"]
	,[1895697,"heronr"]
	//,[1895696,"gt_speci"]
	//,[1895695,"graphic9"]
	//,[1895694,"graphic8"]
	//,[1895693,"graphic7"]
	//,[1895692,"graphic6"]
	//,[1895691,"graphic5"]
	//,[1895690,"graphic4"]
	//,[1895689,"graphic3"]
	//,[1895688,"graphic2"]
	//,[1895687,"graphic1"]
	//,[1895686,"graphi17"]
	//,[1895685,"graphi16"]
	//,[1895684,"graphi15"]
	//,[1895683,"graphi14"]
	//,[1895682,"graphi13"]
	//,[1895681,"graphi12"]
	//,[1895680,"graphi11"]
	//,[1895679,"graphi10"]
	//,[1895678,"grafart"]
	,[1895677,"glendale"]
	//,[1895676,"geo_seri"]
	//,[1895675,"future"]
	,[1895674,"futura"]
	,[1895673,"freemix"]
	,[1895672,"foxrun"]
	,[1895671,"flywign"]
	,[1895670,"flyingm"]
	,[1895669,"florence"]
	,[1895668,"florando"]
	//,[1895667,"flight_m"]
	,[1895666,"flamingo"]
	,[1895665,"fish"]
	,[1895664,"fifties"]
	//,[1895663,"f-150-2"]
	//,[1895662,"f-150-1"]
	,[1895661,"exten"]
	,[1895660,"exploy"]
	//,[1895659,"exped-3"]
	//,[1895658,"exped-2"]
	//,[1895657,"exped-1"]
	,[1895656,"ellipse"]
	//,[1895655,"elantra2"]
	//,[1895654,"elantra1"]
	,[1895653,"edgewood"]
	,[1895652,"eaglet"]
	,[1895651,"e-land"]
	//,[1895650,"durang-3"]
	//,[1895649,"durang-2"]
	//,[1895648,"durang-1"]
	,[1895647,"dropout"]
	,[1895646,"drop2-2"]
	,[1895645,"drop1-1"]
	//,[1895644,"dezine"]
	//,[1895643,"dakota-3"]
	//,[1895642,"dakota-2"]
	//,[1895641,"dakota-1"]
	//,[1895640,"d-trac"]
	,[1895639,"cypress"]
	,[1895638,"crosslak"]
	//,[1895637,"cougar-4"]
	//,[1895636,"cougar-3"]
	//,[1895635,"cougar-2"]
	//,[1895634,"cougar-1"]
	//,[1895633,"corvet-2"]
	//,[1895632,"corvet-1"]
	,[1895631,"coralspr"]
	,[1895630,"cliffros"]
	,[1895629,"chroma"]
	,[1895628,"chopin"]
	,[1895627,"chelsea"]
	,[1895626,"channon"]
	,[1895625,"cavalier"]
	//,[1895624,"caval-3"]
	//,[1895623,"caval-2"]
	//,[1895622,"caval-1"]
	,[1895621,"carissa"]
	//,[1895620,"carava-4"]
	//,[1895619,"carava-3"]
	//,[1895618,"carava-2"]
	//,[1895617,"carava-1"]
	,[1895616,"cameo"]
	,[1895615,"braeburn"]
	//,[1895614,"blitz-3"]
	//,[1895613,"blitz-2"]
	//,[1895612,"blitz-1"]
	,[1895611,"bimini"]
	,[1895610,"begonia"]
	//,[1895609,"beetle-2"]
	//,[1895608,"beetle-1"]
	,[1895607,"beethovn"]
	,[1895606,"beautyf"]
	,[1895605,"bayview"]
	,[1895604,"bayside"]
	,[1895603,"baylight"]
	,[1895602,"bayberry"]
	,[1895601,"barcelon"]
	,[1895600,"barbes"]
	,[1895599,"bach"]
	,[1895598,"aventura"]
	,[1895597,"avanti"]
	//,[1895596,"au_tech"]
	,[1895595,"attach"]
	,[1895594,"ascot"]
	,[1895593,"arvida"]
	,[1895592,"alegro"]
	,[1895591,"alcazar"]
	//,[1895590,"accent-3"]
	//,[1895589,"accent-2"]
	//,[1895588,"accent-1"]
	,[1895587,"acacia"]
	//,[1895586,"2002-62"]
	//,[1895585,"2002-61"]
	//,[1895584,"2002-60"]
	//,[1895583,"2002-59"]
	//,[1895582,"2002-58"]
	//,[1895581,"2002-57"]
	//,[1895580,"2002-56"]
	//,[1895579,"2002-55"]
	//,[1895578,"2002-54"]
	//,[1895577,"2002-53"]
	//,[1895576,"2002-52"]
	//,[1895575,"2002-51"]
	//,[1895574,"2002-50"]
	//,[1895573,"2002-49"]
	//,[1895572,"2002-48"]
	//,[1895571,"2002-47"]
	//,[1895570,"2002-46"]
	//,[1895569,"2002-45"]
	//,[1895568,"2002-44"]
	//,[1895567,"2002-43"]
	//,[1895566,"2002-42"]
	//,[1895565,"2002-41"]
	//,[1895564,"2002-40"]
	//,[1895563,"2002-39"]
	//,[1895562,"2002-38"]
	//,[1895561,"2002-37"]
	//,[1895560,"2002-36"]
	//,[1895559,"2002-35"]
	//,[1895558,"2002-34"]
	//,[1895557,"2002-33"]
	//,[1895556,"2002-32"]
	//,[1895555,"2002-31"]
	//,[1895554,"2002-30"]
	//,[1895553,"2002-29"]
	//,[1895552,"2002-28"]
	//,[1895551,"2002-27"]
	//,[1895550,"2002-26"]
	//,[1895549,"2002-25"]
	//,[1895548,"2002-24"]
	//,[1895547,"2002-23"]
	//,[1895546,"2002-22"]
	//,[1895545,"2002-21"]
	//,[1895544,"2002-20"]
	//,[1895543,"2002-19"]
	//,[1895542,"2002-18"]
	//,[1895541,"2002-17"]
	//,[1895540,"2002-16"]
	//,[1895539,"2002-15"]
	//,[1895538,"2002-14"]
	//,[1895537,"2002-13"]
	//,[1895536,"2002-12"]
	//,[1895535,"2002-11"]
	//,[1895534,"2002-10"]
	//,[1895533,"2002-9"]
	//,[1895532,"2002-8"]
	//,[1895531,"2002-7"]
	//,[1895530,"2002-6"]
	//,[1895529,"2002-5"]
	//,[1895528,"2002-4"]
	//,[1895527,"2002-3"]
	//,[1895526,"2002-2"]
	//,[1895525,"2002-1"]
	//,[1895524,"2000sig"]
	//,[1895523,"300m-3"]
	//,[1895522,"300m-2"]
	//,[1895521,"300m-1"]
	//,[1895520,"4x4_off"]
	//,[1895519,"4wd_off"]
	//,[1895518,"3d-gr_5"]
	//,[1895517,"3d-gr_4"]
	//,[1895516,"3d-gr_3"]
	//,[1895515,"3d-gr_2"]
	//,[1895514,"3d-gr_1"]
]