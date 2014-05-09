var $traceurRuntime = {};
$traceurRuntime.toObject = function(value) {
  return Object(value);
};
var templates = [["bohghozu", "Toyota Rav-4 2014-uptodate", "suv"], ["uyahchey", "Ford Fusion 2013-uptodate", "car"], ["mquiraep", "Jeep Cherokee 2014-uptodate", "suv"], ["ohjesoth", "Toyota Rav-4 2013", "suv"], ["shoghopi", "Jeep Grand-Cherokee 2014-uptodate", "suv"], ["eifurogo", "Buick Encore 2013-uptodate", "suv"], ["oothohki", "Toyota Highlander 2014-uptodate", "suv"], ["akiwaeph", "Ford Transit Connect long cargo 2014-uptodate", "van"], ["eizivapo", "Ford Transit Connect short cargo 2014-uptodate", "van"], ["ahdeisuw", "Ford Transit Connect short wagon 2014-uptodate", "van"], ["aexiemab", "Ford Transit Connect long wagon 2014-uptodate", "van"], ["ungaizes", "GMC Sierra crew-cab regular-box 2014-uptodate", "pickup"], ["gchivait", "Chevrolet Silverado crew-cab regular-box 2014-uptodate", "pickup"], ["ichizaix", "Honda Civic sedan 2011-uptodate", "car"], ["soocufai", "Dodge Ram Promaster 159 wheelbase, high-roof 2014-uptodate", "van"], ["oroocaph", "Dodge Ram Promaster 118 wheelbase, standard-roof 2014-uptodate", "van"], ["gothoxox", "Dodge Ram Promaster 136 wheelbase, standard-roof 2014-uptodate", "van"], ["aquefaid", "Nissan Murano 2014-uptodate", "suv"], ["engeivug", "Mitsubishi Outlander 2014", "suv"], ["weephahz", "Kenworth t680 2013-uptodate", "tractor"], ["eitoocah", "Peterbilt 579", "tractor"], ["kiewiezu", "Freightliner Cascadia Evolution", "tractor"], ["ohyedunu", "Nissan NV200 2013-uptodate", "van"], ["ynegunoo", "Toyota Prius C 2013-uptodate", "car"], ["jahghies", "Subaru XV 2013-uptodate", "suv"], ["ohkahroo", "Nissan Pathfinder 2013-uptodate", ""], ["vquiegee", "Mitsubishi Imiev 2012-uptodate", ""], ["bhrieyal", "Mazda CX-5 2012-uptodate", ""], ["shashahf", "Kia Rio hatchback 2013-uptodate", ""], ["ahhaevom", "Kia Forte hatchback 2013-uptodate", ""], ["ahzeigah", "Hyundai Santa-Fe 2013-uptodate", ""], ["highiefi", "Ford Escape 2013-uptodate", ""], ["ireixein", "Ford C-max 2012-uptodate", ""], ["ageejadi", "Dodge Dart 2013-uptodate", ""], ["gahpooni", "Chevrolet Orlando 2012-uptodate", ""], ["eidaveet", "Chevrolet Sonic 2012-uptodate", ""], ["woongahc", "Chevrolet Spark 2012-uptodate", ""], ["aeyothee", "Chevrolet Volt 2011-uptodate", ""], ["etaiveid", "Dodge Caravan 2012-uptodate", ""], ["xuxiegig", "Dodge Charger 2011-uptodate", ""], ["ehahbohf", "Dodge Durango 2012-uptodate", ""], ["ipeeghor", "Fiat 2012-uptodate", ""], ["ieteking", "Ford Focus 4-door hatchback 2012-uptodate", ""], ["oopofael", "Honda CR-V 2012-uptodate", ""], ["aikeyaye", "Honda Civic coupe 2012-uptodate", ""], ["ixaepohz", "Hyundai Accent 4-door hatchback 2012-uptodate", ""], ["aiboogoh", "Hyundai Elantra 2012-uptodate", ""], ["peiveelu", "Hyundai Veloster 2012-uptodate", ""], ["chievahm", "Mazda 5 2012-uptodate", ""], ["hoholier", "Mitsubishi RVR 2010-uptodate", ""], ["jajoodee", "Nissan NV high-roof 2012-uptodate", ""], ["gaicooju", "Nissan NV low-roof 2012-uptodate", ""], ["eriejece", "Scion IQ 2012-uptodate", ""], ["ibathief", "Scion XB 2008-uptodate", ""], ["oleiquai", "Volkswagen Beetle 2012-uptodate", ""], ["pemeiroh", "Volkswagen Jetta 2011-uptodate", ""], ["umohrohz", "Buick Enclave 2008-uptodate", ""], ["chaepaem", "Buick Rainier 2004-2007", ""], ["ahnohyai", "Buick Rendez-vous 2004-2007", ""], ["npbshoci", "Chevrolet Aveo 4-door 2004-2011", ""], ["shooregh", "Chevrolet Aveo 5-door 2004-2011", ""], ["thahhaed", "Chevrolet Camaro 2009-uptodate", ""], ["eesijoth", "Chevrolet Cavalier 2004-2005", ""], ["oohahnuw", "Chevrolet Cobalt 4-door 2007-2009", ""], ["oonijaif", "Chevrolet Cobalt coupe 2007-2009", ""], ["ehohcahk", "Chevrolet Corvette 2006-2013", ""], ["yzathahy", "Chevrolet Cruze 2011-uptodate", ""], ["abeedoon", "Chrysler Aspen 2007-2009", ""], ["ighohnoh", "Chevrolet Impala police 2005", ""], ["nxietoza", "Chevrolet Impala 2008-2013", ""], ["weeguque", "Chevrolet Malibu 2007", ""], ["ahshozai", "Chevrolet Malibu 2008-uptodate", ""], ["fhshoroo", "Chevrolet Malibu maxx 2007", ""], ["zecishol", "Chevrolet SSR 2004-2006", ""], ["zaipegae", "Chevrolet Express cube 16ft", ""], ["thijohni", "GMC Savana slash Chevrolet Express cube 13ft", ""], ["ushohori", "Chevrolet Avalanche 2003-2006", ""], ["lpooteel", "Chevrolet Avalanche 2007-2013", ""], ["pleewees", "Chevrolet Colorado crew-cab 2004-2012", ""], ["laruhohw", "Chevrolet Colorado extended-cab 2004-2012", ""], ["vaiwiequ", "Chevrolet Colorado regular 2004-2012", ""], ["ijaishan", "Chevrolet S-10 crew-cab 2003-2004", ""], ["wpngeith", "Chevrolet S-10 extended-cab 2003-2004", ""], ["rtfaevoh", "Chevrolet S-10 regular 2003-2004", ""], ["wdeyohng", "Chevrolet S-10 regular long 2003-2004", ""], ["eedusohb", "Chevrolet Silverado 3500 crew-cab 2003-2006", ""], ["shoozequ", "Chevrolet Silverado 3500 extended-cab long 2003-2006", ""], ["rgoochai", "Chevrolet Silverado 3500 regular 2003-2006", ""], ["hdrasohc", "Chevrolet Silverado crew-cab 2003-2006", ""], ["ihooxiqu", "Chevrolet Silverado extended-cab 2003-2006", ""], ["obowoghi", "Chevrolet Silverado extended-cab long 2003-2006", ""], ["naiceeka", "Chevrolet Silverado regular long 2003-2006", ""], ["ciyohrie", "Chevrolet Silverado regular short 2003-2006", ""], ["zohlohvo", "Chevrolet Silverado crew-cab 2007-2013", ""], ["hfieghai", "Chevrolet Silverado extended-cab regular 2007-2013", ""], ["rosietee", "Chevrolet Silverado extended-cab long 2007-2013", ""], ["ohrewoox", "Chevrolet Silverado long 2007-2013", ""], ["nohthaeg", "Chevrolet Silverado regular 2007-2013", ""], ["sngurahl", "Chevrolet Silverado 3500 crew-cab 2007", ""], ["thohseew", "Chevrolet Silverado 3500 extended-cab long 2007", ""], ["sphohbai", "Chevrolet Silverado 3500 regular 2007", ""], ["thaehaqu", "Chevrolet Silverado crew-cab 2007", ""], ["quahliej", "Chevrolet Silverado extended-cab 2007", ""], ["vtteiqui", "Chevrolet Silverado extended-cab long 2007", ""], ["dlegecha", "Chevrolet Silverado regular long 2007", ""], ["ixeehahh", "Chevrolet Silverado regular short 2007", ""], ["toonooth", "Chevrolet Astro cargo swing-door 2003-2005", ""], ["guraiche", "Chevrolet Astro swing-door 2003-2005", ""], ["pohmaemu", "Chevrolet Astro tailgate 2003-2005", ""], ["knyvahch", "Chevrolet Blazer 2-door 2004-2005", ""], ["igefaemu", "Chevrolet Blazer 4-door 2004-2005", ""], ["quisizee", "Chevrolet Equinox 2004-2009", ""], ["aengawoo", "Chevrolet Equinox 2010-uptodate", ""], ["ookijadi", "Chevrolet Express long 2003-uptodate", ""], ["sajeshiw", "Chevrolet Express long slide-door 2003-uptodate", ""], ["iepieyoo", "Chevrolet Express long slide-door cargo 2003-uptodate", ""], ["kothepho", "Chevrolet Express regular 2003-uptodate", ""], ["heenohch", "Chevrolet Express regular cargo 2003-uptodate", ""], ["ajikaepi", "Chevrolet Express regular slide-door 2003-uptodate", ""], ["zodienoh", "Chevrolet Express regular slide-door cargo 2003-uptodate", ""], ["joovaesi", "Chevrolet HHR 2007-2011", ""], ["eezohzax", "Chevrolet HHR panel 2007-2011", ""], ["mohijohr", "Chevrolet Suburban 2008-uptodate", ""], ["yrmiengo", "Chevrolet Tahoe 2007-uptodate", ""], ["ijeefief", "Chevrolet Tracker 2004", ""], ["geeragha", "Chevrolet Trailblazer extended-length 2004-2006", ""], ["zghohgie", "Chevrolet Trailblazer LS 2004-2009"], ["olieghae", "Chevrolet Traverse 2009-uptodate"], ["hepheish", "Chevrolet Uplander ext 2005-2009"], ["iwohjoon", "Chevrolet Venture ext 2003-2004"], ["zohbahng", "Chevrolet Venture regular 2003-2004"], ["oxaequee", "Chrysler PT-Cruiser 2004-2010"], ["airiezie", "Chrysler PT-Cruiser panel 2007-uptodate"], ["haipahji", "Chrysler Town and Country 2003-2007"], ["ziedeife", "Chrysler Town and Country 2008-uptodate"], ["thichohd", "Ford Econoline cube 15ft"], ["aboonagh", "Dodge Avenger 2008-uptodate"], ["geegokee", "Dodge Caliber 2007-uptodate"], ["hdgeefei", "Dodge Challenger 2008-uptodate"], ["dahmahvo", "Dodge Charger police 2007-uptodate"], ["ohdizije", "Dodge Magnum police 2006-2009"], ["jolilaqu", "Dodge SRT-4 2004-2006"], ["kthohhei", "Dodge Dakota crew-cab 2004"], ["ohghaidu", "Dodge Dakota quad-cab 2004"], ["eitheing", "Dodge Dakota regular 2004"], ["eenikeic", "Dodge Dakota crew-cab 2005-2011"], ["oocaecoo", "Dodge Dakota quad-cab 2005-2011"], ["kshahghu", "Dodge Ram 1500 quad-cab 2003-2008"], ["ahquadum", "Dodge Ram 1500 regular long 2003-2008"], ["igaehein", "Dodge Ram 1500 regular short 2003-2008"], ["gavahmoh", "Dodge Ram 3500 quad-cab 2003-2008"], ["xrunaema", "Dodge Ram 3500 resistol 2008"], ["eibaphie", "Dodge Ram mega-cab 2007-2008"], ["ekeeshai", "Dodge Ram 1500 crew-cab 2009-uptodate"], ["chutieph", "Dodge Ram 1500 crew-cab toolbox 2009-uptodate"], ["eephoocu", "Dodge Ram 1500 quad-cab 2009-uptodate"], ["aereisap", "Dodge Ram 1500 regular long 2009-uptodate"], ["usaeghuh", "Dodge Ram 1500 regular short 2009-uptodate"], ["waghaici", "Dodge Caliber 2007-uptodate"], ["ahzeenge", "Dodge Grand Caravan 2003-2007"], ["opiequim", "Dodge Caravan regular 2003-2006"], ["uwaihaex", "Dodge Grand Caravan 2008-uptodate"], ["gzthipai", "Dodge Durango 2003"], ["eingiero", "Dodge Durango 2004-2009"], ["cwepheem", "Dodge Journey 2009-uptodate"], ["zeneemez", "Dodge Nitro 2007-2009"], ["efiehahg", "Dodge Ram 2003"], ["aitojief", "Dodge Ram short 2003"], ["zooforai", "Dodge Sprinter regular 2004-2007"], ["xaiquool", "Dodge Sprinter regular high-roof 2004-2007"], ["udohshaw", "Dodge Sprinter short 2004-2007"], ["eibahgei", "Dodge Sprinter cargo 144 high-roof window 2008-uptodate"], ["odebeing", "Dodge Sprinter cargo 144 window 2008-uptodate"], ["teesohyi", "Dodge Sprinter cargo 170 2008-uptodate"], ["oceezazu", "Dodge Sprinter C extended-roof 170 2008-uptodate"], ["ohmodoka", "Dodge Sprinter chassis 144 2008-uptodate"], ["laxoorei", "Dodge Sprinter chassis 170 2008-uptodate"], ["fngiefix", "Dodge Sprinter C mega-roof 170 2008-uptodate"], ["sahbohsh", "Dodge Sprinter passenger 144 2008-uptodate"], ["xesosohd", "Dodge Sprinter passenger 144 high-roof 2008-uptodate"], ["aigheshu", "Dodge Sprinter passenger 170 2008-uptodate"], ["oowahfej", "Dodge Sprinter cargo 144 2008-uptodate"], ["ahshishi", "Dodge Sprinter cargo 144 high-roof 2008-uptodate"], ["opulohyu", "Mercedes Sprinter cargo 144 high-roof window 2008-uptodate"], ["egheweix", "Mercedes Sprinter cargo 144 window 2008-uptodate"], ["oolachop", "Mercedes Sprinter cargo 170 2008-uptodate"], ["quaehaep", "Mercedes Sprinter C extended-roof 170 2008-uptodate"], ["ooyeegho", "Mercedes Sprinter chassis 144 2008-uptodate"], ["ihakiepe", "Mercedes Sprinter chassis 170 2008-uptodate"], ["venguyee", "Mercedes Sprinter C mega-roof 170 2008-uptodate"], ["icekahmi", "Mercedes Sprinter passenger 144 2008-uptodate"], ["iemeixai", "Mercedes Sprinter passenger 144 high-roof 2008-uptodate"], ["eiyaicha", "Mercedes Sprinter passenger 170 2008-uptodate"], ["athifito", "Mercedes Sprinter cargo 144 2008-uptodate"], ["ingaisai", "Mercedes Sprinter cargo 144 high-roof 2008-uptodate"], ["ujafisei", "Ford Fiesta hatchback 2010-uptodate"], ["xghocoor", "Ford Flex 2009-uptodate"], ["fveeghie", "Ford Focus 4-door 2008-2010"], ["iefohlih", "Ford Focus 4-door sedan 2010-uptodate"], ["aibeigie", "Ford Focus coupe 2008-uptodate"], ["ofaixaca", "Ford Focus wagon 2003-2007"], ["eejiewof", "Ford Freestyle 2005-2007"], ["ietoomie", "Ford Fusion 2007-2009"], ["hzyahpaj", "Ford Fusion 2010-2012"], ["oomaiqua", "Ford Mustang 2004"], ["jaikaech", "Ford Mustang 2005-uptodate"], ["eixivoko", "Ford Focus SVT 2003-2006"], ["ohhaishu", "Ford Taurus 2008-2009"], ["ychashai", "Ford Taurus 2010-uptodate"], ["oteeluyu", "Ford Taurus X 2008-2009"], ["izobetho", "Ford Explorer sport-trac 2003-uptodate"], ["zahshote", "Ford F-150 regular-cab 6 5ft 2004-2008"], ["giephoce", "Ford F-150 regular-cab 8ft 2004-2008"], ["ymjtveeh", "Ford F-150 regular-cab F-6 5ft 2004-2008"], ["ahsohfae", "Ford F-150 supercab F-6 5ft 2004-2008"], ["cheisais", "Ford F-150 supercab S-5 5ft 2004-2008"], ["aexahrun", "Ford F-150 supercab S-6 5ft 2004-2008"], ["soofoomi", "Ford F-150 supercab S 8ft 2004-2008"], ["thaeseif", "Ford F-150 supercrew 5 5ft 2004-2008"], ["xahducai", "Ford F-250 slash F-350 supercab 8ft 2004-2008"], ["ahpohlav", "Ford F-250 slash F-350 supercab 8ft 2008"], ["eeyushoo", "Ford F-250 slash F-350 supercrew 8ft 2004-2008"], ["eengaloo", "Ford F-250 slash F-350 supercrew 8ft 2008"], ["aepheech", "Ford F-250 slash F-350 work 8ft 2004-2008"], ["aiphucha", "Ford F-250 slash F-350 work 8ft 2008"], ["theimoov", "Ford F-150 crew-cab 5 5ft 2009-uptodate"], ["quutheth", "Ford F-150 crew-cab 6 5ft 2009-uptodate"], ["jiexeero", "Ford F-150 regular-cab long b 2009-uptodate"], ["xbzelahn", "Ford F-150 regular-cab short b 2009-uptodate"], ["avoleita", "Ford F-150 supercab 5 5ft 2009-uptodate"], ["voophigu", "Ford F-150 supercab 8ft 2009-uptodate"], ["pdiepunu", "Ford F-150 supercab F-6 5ft 2009-uptodate"], ["afiseepo", "Ford Ranger regular-cab 2004-2011"], ["dxmeikeh", "Ford Ranger supercab flareside 2004-2011"], ["ijaefohm", "Ford Ranger supercab 2004-2011"], ["itahceek", "Ford Excursion 2004-2005"], ["ozeegesi", "Ford Econoline 2004-2007"], ["eizumoow", "Ford Econoline chateau 2004-2007"], ["ohquohzi", "Ford Econoline extended-length 2004-2007"], ["agoghipe", "Ford Econoline slide-door 2004-2007"], ["eedatogo", "Ford Econoline 2008-uptodate"], ["iquaphei", "Ford Econoline chateau 2008-uptodate"], ["ainekedu", "Ford Econoline extended-length 2008-uptodate"], ["xiethier", "Ford Econoline slide-door 2008-uptodate"], ["dkiquavo", "Ford Edge 2007-2010"], ["aediechi", "Ford Edge 2011-uptodate"], ["ahcakiex", "Ford Escape 2004-2007"], ["kukophie", "Ford Escape 2008-2012"], ["riepheze", "Ford Expedition 2004-2006"], ["yuchefud", "Ford Expedition 2008-uptodate"], ["ushodeig", "Ford Expedition el 2008-uptodate"], ["chohyeeh", "Ford Explorer 2003-2010"], ["quaikuho", "Ford Explorer 2011-uptodate"], ["aebeenov", "Ford Explorer sport-trac 2003-uptodate"], ["cievaezo", "Ford Freestar 2004-2007"], ["equaeshi", "Ford Freestyle 2005-2007"], ["siejaeth", "Ford Taurus X 2008-2009"], ["eehiesee", "Ford Transit Connect 2010-2013"], ["ekapohza", "Ford Windstar 2003"], ["lahkeish", "GMC Canyon crew-cab 2004-2012"], ["ailahshu", "GMC Canyon extended-cab 2004-2012"], ["iziebool", "GMC Canyon regular-cab 2004-2012"], ["aehothee", "GMC Sierra 3500HD 2007-2013"], ["fhohieko", "GMC Sierra crew-cab 2007-2013"], ["poreeliy", "GMC Sierra ext-long 2007-2013"], ["iengeica", "GMC Sierra extended regular 2007-2013"], ["bilaivah", "GMC Sierra regular 2007-2013"], ["tiegeifo", "GMC Sierra regular long 2007-2013"], ["ohgheshe", "Sonoma slash S-10 crew-cab 2003"], ["eideegip", "Sonoma slash S-10 extended-cab 2003"], ["ojeishai", "Sonoma slash S-10 extended sport-side 2003"], ["giechiet", "Sonoma slash S-10 regular 2003"], ["azaiyaib", "Sonoma slash S-10 regular long 2003"], ["ckeisahr", "GMC Sierra crew-cab 2003-2007"], ["ohzaedoo", "GMC Sierra crew-cab long 2003-2007"], ["diphenai", "GMC Sierra crew-cab sport-side 2003-2006"], ["uyebonge", "GMC Sierra extended-cab 2003-2006"], ["sngaingo", "GMC Sierra extended-cab sport-side 2003-2006"], ["eefohtil", "GMC Sierra ext-long 2007"], ["ahngieta", "GMC Sierra regular 2003-2007"], ["aethovee", "GMC Sierra regular long 2003-2007"], ["ahpepeje", "GMC Sierra regular sport-side 2003-2007"], ["odeibeey", "GMC Acadia 2007-uptodate"], ["cnubieme", "GMC Envoy 2003-2009"], ["xkdayiri", "GMC Envoy Denali 2005-2009"], ["eefaedai", "GMC Envoy XL 2004-2006"], ["oohaeziv", "GMC Terrain 2010-uptodate"], ["ljnngiew", "GMC Yukon slash Tahoe 2003-2006"], ["ohxaevoh", "GMC Yukon slash Tahoe 2007-uptodate"], ["cailihus", "GMC Yukon XL slash Suburban 2003-2006"], ["ohchaebu", "GMC Yukon XL slash Suburban 2007-uptodate"], ["thaigeit", "Safari slash Astro cargo swing-door 2003-2005"], ["ohphaipi", "Safari slash Astro swing-door 2003-2005"], ["yphoophe", "Safari slash Astro tailgate 2003-2005"], ["aefiyohd", "GMC Savana slash Chevrolet Express long 2003-uptodate"], ["ieghaeji", "GMC Savana slash Chevrolet Express long slide-door 2003-uptodate"], ["oraizohm", "GMC Savana slash Chevrolet Express regular 2003-uptodate"], ["daidotoo", "GMC Savana slash Chevrolet Express regular slide-door 2003-uptodate"], ["shaekaph", "Honda Accord coupe 2008-uptodate"], ["zohsoowa", "Honda Accord crosstour 2010-uptodate"], ["ooviquie", "Honda Civic coupe 2004-2005"], ["tieteise", "Honda Civic coupe 2006-2011"], ["alaebica", "Honda Civic sedan 2006-2010"], ["phohyies", "Honda Civic SI 2003-2005"], ["pohcevah", "Honda Civic SI 2006-2007"], ["erecaipu", "Honda CR-Z 2011-uptodate"], ["aevetied", "Honda Element 2003-2007"], ["zeequome", "Honda Fit 2007-2008"], ["aeteepol", "Honda Fit 2009-uptodate"], ["kainahdi", "Honda Insight 2010-uptodate"], ["eitheene", "Honda S2000 2007-uptodate"], ["aseecaim", "Honda Ridgeline 2006-uptodate"], ["hawahgae", "Honda CR-V 2007-2011"], ["mohveeci", "Honda CR-V 2004-2006"], ["ychiehoh", "Honda Element 2003-2007"], ["chelahye", "Honda Element 2008-2011"], ["shohcool", "Honda Odyssey 2004"], ["uyeehied", "Honda Odyssey 2005-2010"], ["kahpailo", "Honda Odyssey 2011-uptodate"], ["emiesooz", "Honda Pilot 2003-2008"], ["shohgoxe", "Honda Pilot 2009-uptodate"], ["mshophei", "Hummer H2 2003-2009"], ["eineewip", "Hummer H3 2006-2009"], ["poteijap", "Hyundai Accent 2-door 2004-2005"], ["vevayohn", "Hyundai Accent 2-door hatchback 2008-2011"], ["riexuquu", "Hyundai Accent 4-door 2004-2005"], ["aepahfug", "Hyundai Accent 2006-2011"], ["aiquiepu", "Hyundai Elantra 4-door hatchback 2004-2008"], ["aichohle", "Hyundai Elantra sedan 2006-2011"], ["owighoor", "Hyundai Genesis coupe 2009-uptodate"], ["shimahxi", "Hyundai Tiburon 2004-2007"], ["angeghae", "Hyundai Tiburon 2008"], ["gohquoxa", "Hyundai Entourage 2007-2009"], ["eenudeng", "Hyundai Santa-Fe 2003-2006"], ["oniethoh", "Hyundai Santa-Fe 2007-2012"], ["jquohsee", "Hyundai Tucson 2005-2009"], ["yoghahdo", "Hyundai Tucson 2010-uptodate"], ["iemahgho", "Hyundai Veracruz 2008-uptodate"], ["aigaethe", "Jeep Commander 2006-2011"], ["aexahsei", "Jeep Compass 2007-uptodate"], ["cailaero", "Jeep Grand-Cherokee 2003-2004"], ["edepaefa", "Jeep Grand-Cherokee 2005-2010"], ["ujexoqui", "Jeep Grand-Cherokee 2011-2013"], ["shuthana", "Jeep Liberty limited-edition 2003-2007"], ["eiquahth", "Jeep Liberty Renegade 2003-2007"], ["aenaewie", "Jeep Liberty sport 2003-2007"], ["tumaewoo", "Jeep Liberty 2008-2009"], ["iesekaeg", "Jeep Patriot 2007-uptodate"], ["ogahphoj", "Jeep TJ 2004-2006"], ["hangongu", "Jeep TJ unlimited 2005-2009"], ["cilaezox", "Jeep Wrangler 2-door 2007-uptodate"], ["wsoovagu", "Jeep Wrangler 4-door 2007-uptodate"], ["ohmuhiez", "Kia Forte 2010-uptodate"], ["phahquom", "Kia Koup 2010-uptodate"], ["zfwthoye", "Kia Rio 2006-2011"], ["giepoobi", "Kia Rondo 2007-uptodate"], ["thegaech", "Kia Soul 2010-2013"], ["ahgetihu", "Kia Spectra 2007-2009"], ["eenaichi", "Kia Borrego 2009-uptodate"], ["obahdieb", "Kia Sedona 2004-2005"], ["baingizu", "Kia Sedona 2006-2012"], ["eijahzee", "Kia Sorento 2004-2009"], ["quuyeegh", "Kia Sorento 2010-uptodate"], ["ahfituci", "Kia Sportage 2005-2006"], ["wooxeegi", "Kia Sportage 2007-uptodate"], ["thilooja", "Kia Sportage 2011-uptodate"], ["gshoosoh", "Lincoln Navigator L 2008-uptodate"], ["eefepohj", "Mazda 2 2011-uptodate"], ["hangiebe", "Mazda 3 2004-2009"], ["rnoothie", "Mazda 3 2010-2013"], ["aekoceis", "Mazda 3 sedan 2010-2013"], ["eedoxeet", "Mazda MX5 Miata 2008-uptodate"], ["cheixiem", "Mazda Protege 5 2003"], ["xmthuyoo", "Mazda RX-8 2008-uptodate"], ["ohtheebi", "Mazda Speed3 2010-uptodate"], ["ooneibee", "Mazda B-Series 2004-2009"], ["nefeicop", "Mazda 5 2006-2011"], ["xghootee", "Mazda CX-7 2007-2012"], ["amohnavo", "Mazda CX-9 2007-uptodate"], ["choseefo", "Mazda MPV 2003-2006"], ["uyeequuw", "Mazda Tribute 2004-2005"], ["nquaecer", "Mazda Tribute 2006"], ["reishoga", "Mazda Tribute 2007-2011"], ["ohshitie", "Mini Clubman 2008-uptodate"], ["ahghoolu", "Mini Cooper 2004-uptodate"], ["ipohsegu", "Mitsubishi Lancer evolution 2003-uptodate"], ["tkooxahp", "Mitsubishi Lancer 2008-uptodate"], ["fxmsaefu", "Mitsubishi Raider crew-cab 2006-2009"], ["chahkati", "Mitsubishi Raider extended-cab 2006-2009"], ["ooleetha", "Mitsubishi Endeavor 2004-2009"], ["xaegheiy", "Mitsubishi Montero 2003-2006"], ["aiwiteke", "Mitsubishi Montero sport 2003-2004"], ["eiyipeif", "Mitsubishi Outlander 2004-2006"], ["oonohche", "Mitsubishi Outlander 2007-2012"], ["gjieghuh", "Nissan Cube 2009-uptodate"], ["xphahnah", "Nissan Versa 2007-2013"], ["dxeeried", "Nissan Frontier extended-cab 2003-2004"], ["aichipie", "Nissan Frontier regular-cab 2003-2004"], ["paiyeipo", "Nissan Frontier crew-cab 2005-uptodate"], ["iboophop", "Nissan Frontier king-cab 2005-uptodate"], ["gahxeegh", "Nissan Titan crew-cab 2004-uptodate"], ["fgzahniz", "Nissan Titan king-cab 2004-uptodate"], ["mohpooko", "Nissan Armada 2004-uptodate"], ["eizepoma", "Nissan Juke 2011-uptodate"], ["ojielati", "Nissan Murano 2003-2013"], ["oyaimahm", "Nissan Pathfinder 2003-2004"], ["aijacoog", "Nissan Pathfinder 2005-2012"], ["uduweixi", "Nissan Quest 2004-2010"], ["zrohcaem", "Nissan Quest 2011-uptodate"], ["ooditaid", "Nissan Xterra 2003-2004"], ["niweilah", "Nissan Xterra 2005-uptodate"], ["bliquaez", "Nissan Rogue X-Trail 2008-uptodate"], ["aethufae", "Oldsmobile Bravada 2004"], ["tnxlaete", "Oldsmobile Silhouette 2004"], ["echeiquo", "Chevrolet Impala 2005"], ["achohsix", "Chevrolet Impala police 2006-uptodate"], ["eewuwaer", "Dodge Charger 2007-uptodate"], ["waengahd", "Dodge Magnum 2006-2009"], ["chafooxo", "Ford Crown Victoria slash Grand Marquis police 2005-2011"], ["sthejoox", "Ford Crown Victoria slash Grand Marquis 2005-2011"], ["vmiefuch", "Pontiac G6 2007"], ["tsaethah", "Pontiac G6 2008-2009"], ["laexaela", "Pontiac GTO 2005-2006"], ["neeputhi", "Pontiac Solstice 2007-2009"], ["shigabae", "Pontiac Sunfire 2004-2005"], ["quoopeem", "Pontiac Vibe 2004-2008"], ["eishahmu", "Pontiac Vibe 2009-uptodate"], ["oowiciga", "Pontiac Wave 4-door canadian 2004-2006"], ["lafohree", "Pontiac Wave 5-door canadian 2004-2006"], ["ahlohvei", "Pontiac Aztek 2004-2005"], ["phemooxe", "Pontiac Montana 2006-2009"], ["phohrahs", "Pontiac Montana extended 2004-2005"], ["gsenucoh", "Pontiac Montana regular 2004-2005"], ["hwaetash", "Pontiac SV6 2006"], ["ienithoo", "Pontiac Torrent 2007-2009"], ["neewoyov", "Saturn Astra 2008-2009"], ["ukeefiel", "Saturn Ion 2003-2007"], ["ahmeitah", "Saturn Sky 2007-2009"], ["ujagahng", "Saturn Outlook 2007-2009"], ["haebaeyu", "Saturn Relay 2006-2007"], ["sophaebo", "Saturn Vue 2003-2007"], ["vzoosaif", "Saturn Vue 2008-2009"], ["geesheng", "Smart Fortwo 2006-2007"], ["jaishuko", "Smart Fortwo 2008-uptodate"], ["shukisae", "Subaru Baja sport 2004-2006"], ["sieghawu", "Subaru Impreza 4-door hatchback 2008-uptodate"], ["hivohjim", "Subaru Impreza sedan 2008-uptodate"], ["lkzaetah", "Subaru Impreza sedan WRX 2008-uptodate"], ["xabohyuw", "Subaru Impreza wagon 2004-2007"], ["leivipoo", "Subaru Impreza WRX 4-door hatchback 2008-uptodate"], ["ieshaehe", "Subaru Impreza WRX 2004-2007"], ["ceicufah", "Subaru Impreza WRX STI 2008-uptodate"], ["quoowooh", "Subaru Outback 2006-2009"], ["syooghoo", "Subaru Outback 2010-uptodate"], ["lyohquus", "Subaru Outback sport 2006-2009"], ["thupecei", "Subaru B9 Tribeca 2006-2007"], ["fajuveek", "Subaru Tribeca 2008-uptodate"], ["phowisho", "Subaru Forester 2004-2008"], ["wdzeekox", "Subaru Forester 2009-2013"], ["quivange", "Suzuki Aerio 2004-2007"], ["ohmaisie", "Suzuki Swift 5-door 2004-2011"], ["shooxahy", "Suzuki SX4 2007-uptodate"], ["eideiche", "Suzuki Equator 6ft box 2009-uptodate"], ["eigheefo", "Suzuki Equator crew-cab 6ft box 2009-uptodate"], ["oshaivee", "Suzuki Equator crew-cab 2009-uptodate"], ["oorahngo", "Suzuki Grand Vitara 2004-2005"], ["tohvohlo", "Suzuki Grand Vitara 2006-uptodate"], ["twsheepa", "Suzuki Vitara convertible 2004"], ["gooquoze", "Suzuki XL-7 2004-2006"], ["vaxeshes", "Suzuki XL-7 2007-2009"], ["thahmohc", "Scion XA 2004-2007"], ["saechaix", "Toyota Echo 2-door coupe 2004-2005"], ["phemohcu", "Toyota Echo 4-door 2004-2005"], ["aipohkei", "Toyota Echo 2003-2005"], ["uxooxagh", "Toyota Matrix 2004-2008"], ["yahnaego", "Toyota Matrix 2009-uptodate"], ["ooyohnot", "Toyota Prius 2004-2009"], ["iedeexie", "Toyota Prius 2010-uptodate"], ["eiciquaz", "Toyota Venza 2009-uptodate"], ["ievogase", "Toyota Yaris 2-door 2006-uptodate"], ["aethakoo", "Toyota Yaris 4-door hatchback 2006-uptodate"], ["feteeghu", "Toyota Yaris sedan 2008-uptodate"], ["ahaegaco", "Toyota Tacoma crew-cab 2003-2004"], ["bapahpae", "Toyota Tacoma access-cab 2005-uptodate"], ["zoozagie", "Toyota Tacoma crew-cab 2005-uptodate"], ["leengael", "Toyota Tundra 2003"], ["nadagaqu", "Toyota Tundra regular 2003"], ["upureejo", "Toyota Tundra access-cab 2004-2006"], ["eduphaex", "Toyota Tundra crew-cab 2004-2006"], ["chiekaif", "Toyota Tundra regular-cab 2004-2006"], ["ooroodek", "Toyota Tundra crew-cab 2007-2013"], ["eeyuquud", "Toyota Tundra crew-cab long 2007-2013"], ["ifohrexe", "Toyota Tundra crewmax 2008-2013"], ["jaisieth", "Toyota Tundra regular-cab long 2007-2013"], ["ciphievu", "Toyota Tundra regular-cab short 2007-2013"], ["thijebaf", "Scion XB slash BB 2004-2007"], ["iezephoo", "Toyota 4Runner 2004-2009"], ["muhephoc", "Toyota 4Runner 2010-uptodate"], ["veichere", "Toyota FJ-Cruiser 2007-uptodate"], ["daefaela", "Toyota Highlander 2003-2007"], ["iecewohl", "Toyota Highlander 2008-2013"], ["enengiwo", "Toyota Rav-4 2003-2005"], ["pheevohp", "Toyota Rav-4 2006-2012"], ["izaelohm", "Toyota Sequoia 2003-2008"], ["wrveewob", "Toyota Sequoia 2009-uptodate"], ["olahiede", "Toyota Sienna 2004-2010"], ["fasooyap", "Toyota Sienna 2011-uptodate"], ["umifijic", "Volkswagen Golf 2003-uptodate"], ["eimoohae", "Volkswagen Jetta 2007-2010"], ["teehinit", "Volkswagen New-Beetle 2003-2011"], ["aihaevoo", "Volkswagen Rabbit GTI 2007-2009"], ["cfutaipi", "Volkswagen Routan 2009-2012"], ["iemeeque", "Volkswagen Tiguan 2009-uptodate"], ["oongaiqu", "Volkswagen Touareg 2004-uptodate"], ["epieleiz", "Freightliner Argosy day-cab 2001-2006"], ["eemiketh", "Freightliner Argosy medium-roof 2001-2006"], ["asahgaiz", "Freightliner Argosy raised-roof 2001-2006"], ["agaegees", "Freightliner Cascadia"], ["veireenu", "Freightliner Columbia day-cab 2004-uptodate"], ["vaijeeta", "Freightliner Columbia day-cab deflector 2004-uptodate"], ["aphiengi", "Freightliner Columbia medium-roof 2004-uptodate"], ["aimoopai", "Freightliner Columbia raised-roof 2004-uptodate"], ["iewielae", "Freightliner Coronado day-cab 2004-uptodate"], ["chievoof", "Freightliner Coronado medium-roof 2004-uptodate"], ["eidozeih", "Freightliner Coronado raised-roof 2004-uptodate"], ["elewiejo", "Freightliner M2 26in extended-cab 2003-uptodate"], ["ahghaevi", "Freightliner M2 48in crew-cab 2003-uptodate"], ["aiparome", "Freightliner M2 day-cab 2003-uptodate"], ["tbahwosh", "GMC Topkick C4500 slash C5500"], ["quieghil", "GMC T-Series T7500"], ["ahgoolee", "Hino FA1517 2008-2009"], ["icuquiem", "Hino Low-Profile 258 2009"], ["ahviexae", "International 8500 regular"], ["denemiem", "International 9200i"], ["eikohyai", "International 9200i 9400i high-roof"], ["pghighai", "International 9200i 9400i low-roof"], ["aiseiwoh", "International 9200i deflector"], ["upaiweyu", "International 9900i sleeper high-roof"], ["oophethu", "International 9900i sleeper medium-roof"], ["faicadoo", "International 9900ix deflector"], ["rogahxei", "International 9900ix regular"], ["chemevie", "International CF-Series"], ["zebahxok", "International CXT 2006"], ["njereibe", "International Lonestar"], ["oofeethi", "Kenworth T600 sleeper 2004-uptodate"], ["leexeepi", "Kenworth T800 deflector 2004-uptodate"], ["eechiewi", "Kenworth T800 regular-hood extended-cab 2004-uptodate"], ["ohdahtei", "Kenworth T800 sleeper 2004-uptodate"], ["eedaphil", "Kenworth T2000 uptodate"], ["aechieve", "Kenworth W900 sleeper 2004-uptodate"], ["yxixohze", "Mack CHN603 day-cab"], ["kuquebep", "Mack Vision day-cab"], ["hzookeef", "Mack Vision day-cab deflector"], ["ahheiyei", "Mack Vision sleeper"], ["ocixahya", "Mitsubishi Fuso FE-180"], ["pheisaef", "Peterbilt 330 108in BBC"], ["aishiepa", "Peterbilt 357 111in BBC"], ["wmoxopah", "Peterbilt 357 119in BBC sloped-hood"], ["cheecahm", "Peterbilt 362 76 BBC flat-nose"], ["utohfaiy", "Peterbilt 362 90 BBC flat-nose"], ["oosusibu", "Peterbilt 379 long city 2004-2009"], ["quoshohj", "Peterbilt 379 long sleeper 69in 2004-2009"], ["pohraish", "Peterbilt 379 short city 2004-2009"], ["eetakaqu", "Peterbilt 385 112in BBC"], ["ohphoxah", "Peterbilt 385 120in BBC"], ["angaexah", "Peterbilt 387 high-roof sleeper 2004-2009"], ["aiyohhoo", "Peterbilt 387 medium-roof sleeper 2004-2007"], ["ushiejae", "Sterling Acterra"], ["rwjoothe", "Volvo Highway 2003-uptodate"], ["mlquahgi", "Volvo Highway VN-730 2008-uptodate"], ["meecoqui", "Volvo VT-800 2006-uptodate"], ["ohliecek", "Western Star 4900 EX"], ["chiejail", "Western Star 4900 FA"], ["aivayaef", "Western Star 4900 SA"], ["ishiniye", "Western Star 6900 XD"], ["wdeeghek", "45ft trailer"], ["aemahhoh", "48ft trailer"], ["ahngahza", "53ft trailer"], ["cquooyah", "trailer front slash rear dry-box"], ["ohheghie", "trailer front slash rear refer-box"]];
templates.imageSuffix = ".jpg";
templates.processor = (function(t) {
  var r = "replace",
      now = (new Date).getFullYear() + "";
  return t[r](/uptodate/i, now)[r](" slash ", " / ")[r](/(20\d\d-20\d\d)/, "\n$1")[r](/( 20\d\d)/, "\n$1")[r](/^(\S*) (\S*) /, "$1 $2\n")[r]("\n\n", "\n")[r]("Prius\nC", "Prius C")[r](now + "-" + now, now)[r](/(20\d\d)-(20\d\d)/, "$1–$2")[r](" Econoline\n", " Econoline e-350\n")[r]("Ram\nPromaster", "Ram Promaster\n")[r]("Transit\nConnect ", "Transit Connect\n")[r]("\n ", "\n")[r](/-/g, "‑");
});
(window.devicePixelRatio || 1) > 1 ? ".png": "_500.png";
templates.buyPath = "http://signshophelper.fetchapp.com/sell/";
templates.buySuffix = "/ppc";
var views = {templates: templates},
    view;
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
var dom;
;
(function() {
  var constr = function(a) {
    a.on = function(a, b, c) {
      this.addEventListener(a, b, c);
      return this;
    };
    a.clear = function() {
      var i;
      while (i = this.firstChild) this.removeChild(i);
      return this;
    };
    return a;
  };
  dom = function(a, b) {
    var e = arguments,
        l = e.length,
        c,
        i = 1,
        element = document.createElement(a);
    if (b && b.constructor === Object) for (c in b) element.setAttribute(c, b[c]), i = 2;
    for (; i < l; i++) element.append(e[i]);
    return constr(element);
  };
  dom.query = function(s) {
    var a = document.querySelector(s);
    return constr(a);
  };
  dom.queryAll = (function(a) {
    return Array.prototype.slice.call(document.querySelectorAll(a)).map((function(a) {
      return constr(a);
    }));
  });
  dom.fragment = document.createDocumentFragment.bind(document);
  dom.on = (function(a, b, c) {
    return addEventListener(a, b, c);
  });
  dom.html = document.documentElement;
  dom.body = document.body;
})();
mapObject = function(o, f) {
  Object.keys(o).forEach((function(v) {
    o[v] = f(o[v], v);
  }));
  return o;
};
(function(global) {
  "use strict";
  global.memoize = global.memoize || (typeof JSON === 'object' && typeof JSON.stringify === 'function' ? function(func) {
    var stringifyJson = JSON.stringify,
        cache = {};
    return function() {
      var hash = stringifyJson(arguments);
      return (hash in cache) ? cache[hash]: cache[hash] = func.apply(this, arguments);
    };
  }: function(func) {
    return func;
  });
}(this));
var imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/",
    input = dom.query("#input"),
    inputForm = dom.query("#inputform"),
    container = dom.query("#container"),
    showAll = false,
    showAllLink = dom("a", "show all").on("click", (function(e) {
      e.preventDefault();
      showAll = true;
      filterView(input.value);
    })),
    area = 25,
    linkTemplate = (function(link, text, tags) {
      return dom("a", {
        target: "paypal",
        href: link
      }, dom("img"), text, dom("br"), dom("small", tags));
    });
views = mapObject(views, (function(a, b) {
  var textProcessor = a.processor || ((function(t) {
    return t + "";
  }));
  a.forEach((function(i) {
    var rawURL = i[0],
        rawText = i[1],
        tags = i[2] || "",
        buyURL = a.buyPath + rawURL + a.buySuffix;
    i.prettyText = textProcessor(rawText);
    i.node = linkTemplate(buyURL, i.prettyText, tags);
    i.imageURL = imagePath + rawText + (a.imageSuffix || ".png");
    i.imageLoaded = false;
    i.searchText = i.prettyText.replace("\n", " ");
    i.searchText = i.searchText + i.searchText.replace("-", "") + i.searchText.replace("-", " ");
    i.searchText = i.searchText + " " + tags;
  }));
  a.menu = dom.query(("menu." + b));
  return a;
}));
var searchFilter = (function(view, keyword, reverse) {
  keyword = new RegExp(keyword, "i");
  reverse |= 0;
  return array = views[view].filter((function(item, index) {
    return (keyword.test(item.searchText)^reverse);
  })).filter((function(item, index) {
    return (view === "templates" ? (showAll || index < area): true);
  }));
});
var search = (function() {
  for (var a = [],
      $__0 = 0; $__0 < arguments.length; $__0++) a[$__0] = arguments[$__0];
  var array = searchFilter.apply(null, $traceurRuntime.toObject(a)),
      fragment = dom.fragment();
  array.forEach((function(item, index) {
    if (!item.imageLoaded) item.node.firstChild.src = item.imageURL, item.imageLoaded = true;
    fragment.append(item.node);
  }));
  return {
    fragment: fragment,
    array: array
  };
});
var filterView = (function(keyword, reverse) {
  container.clear();
  var $__1 = search(view, keyword, reverse),
      fragment = $__1.fragment,
      array = $__1.array;
  if (view === "templates" && (!showAll) && array.length > (area - 1)) fragment.append(showAllLink);
  showAll = false;
  container.append(fragment);
});
var switchPage = (function(page) {
  dom.html.className = view = page;
  filterView();
});
dom.on("load", (function() {
  dom.queryAll("[data-src]").forEach((function(a) {
    a.src = imagePath + a.getAttribute("data-src");
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
input.on("input", (function(e) {
  filterView(input.value);
}));
inputForm.on("submit", (function(e) {
  history.pushState("", "", "?search=" + input.value);
  e.preventDefault();
}));
(function(t, page) {
  t = window.location.pathname.substr(1);
  page = views[t] ? t: "templates";
  switchPage(page);
  getQueryVariable = function(a) {
    return (RegExp("[&?]" + a + "=([^&]+)").exec(location) || ["", ""])[1] || "";
  };
  var query = getQueryVariable("search");
  input.value = query;
  filterView(query);
})();
