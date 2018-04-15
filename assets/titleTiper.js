let titleTip = {};
titleTip.enabled = false;
titleTip.inited = false;
titleTip.dom = "";
titleTip.defaultTitle = "HELLO WORLD!";
titleTip.currentTitle = "";
titleTip.status = "show";
titleTip.settings = {};
titleTip.settings.delay = 3000;
titleTip.settings.change = 1000;
titleTip.timera,titleTip.timerb,titleTip.timerc,titleTip.timerd;
titleTip.init = function(dom,defaultText = false,initanim = true){
	if(document.getElementById(dom.id)){
		titleTip.enabled = true;
		if(!titleTip.inited){
			titleTip.inited = true;
			titleTip.cssInit();
		}
		titleTip.dom = dom;
		if(defaultText===false){
			defaultText = dom.innerHTML;
		}
		titleTip.defaultTitle = defaultText;
		if(initanim===true){
			let e = titleTip.dom;
			let delay = titleTip.settings.delay;
			let change = titleTip.settings.change;
			titleTip.status = 'changing';
			if(!titleTip.hasClass(titleTip.dom,"titleTip-anim"))titleTip.addClass(titleTip.dom,"titleTip-anim");
			titleTip.timerb = setTimeout((function(){
				e.style.opacity = 0;
				e.style.filter = 'alpha(opacity=0)';
				titleTip.timerc = setTimeout((function(){
					e.innerHTML = defaultText;
					e.style.opacity = 100;
					e.style.filter = 'alpha(opacity=100)';
					titleTip.timerd = setTimeout((function(){
						if(titleTip.hasClass(e,"titleTip-anim")&&titleTip.status == 'changing')titleTip.removeClass(e,"titleTip-anim");
					}),change);
					titleTip.status = 'show';
					titleTip.text = defaultText;
				}),change);
			}),100);
		}else{
			titleTip.dom.innerHTML = defaultText;
		}
		console.log("titleTip was just inited with dom which id='"+dom.id+"'.");
		return titleTip;
	}
}
titleTip.cssInit = function(){
	let css = ".titleTip-anim {transition: all 0.6s!important;}";
	let style = document.createElement("style");
	style.innerHTML = css;
	document.getElementsByTagName("body")[0].insertBefore(style,document.getElementsByTagName("body")[0].children[0]);
}

titleTip.addClass = function(obj, cls){
    let obj_class = obj.className;
    let blank = (obj_class != '') ? ' ' : '';
    let added = obj_class + blank + cls;
    obj.className = added;
	console.log(obj.id+"  "+added);
}
 
titleTip.removeClass = function(obj, cls){
    let obj_class = ' '+obj.className+' ';
    obj_class = obj_class.replace(/(\s+)/gi, ' ');
    let removed = obj_class.replace(' '+cls+' ', ' ');
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;
}
 
titleTip.hasClass = function(obj, cls){
    let obj_class = obj.className;
    let obj_class_lst = obj_class.split(/\s+/);
    let x = 0;
    for(x in obj_class_lst) {
        if(obj_class_lst[x] == cls) {
            return true;
        }
    }
    return false;
}
titleTip.getCurrentTitle = function(){
	if(titleTip.enabled) return titleTip.currentTitle = dom.innerHTML;
	else console.error("titleTip need to init.(getCurrentTitle)");
	return 0;
}
titleTip.getDom = function(){
	return titleTip.dom;
}
titleTip.Tip = function(text = "HELLO!", delay = false, change = false, backtext = titleTip.defaultTitle){
	if(!titleTip.enabled){
		console.error("titleTip need to init.(Tip)");
		return false;
	}
	if(titleTip.status!='show'){
        clearTimeout(titleTip.timera);
        clearTimeout(titleTip.timerb);
        clearTimeout(titleTip.timerc);
        clearTimeout(titleTip.timerd);
		console.warn('titleTip: Title is already changing.\nMessages:\n(\n\ttext\t=\t"'+text+'",\n\tstatus\t=\t"'+titleTip.status+'",\n\tshowing\t=\t"'+titleTip.currentTitle+'"\n)');
	}
	if(delay===false) delay = titleTip.settings.delay;
	if(change===false) change = titleTip.settings.change;
	titleTip.status = 'changing';
	titleTip.currentTitle = text;
	let e = titleTip.dom;
	if(!titleTip.hasClass(titleTip.dom,"titleTip-anim"))titleTip.addClass(titleTip.dom,"titleTip-anim");
    e.style.opacity = 0;
    e.style.filter = 'alpha(opacity=0)';
    titleTip.timera = setTimeout((function(){
        e.innerHTML = text;
        e.style.opacity = 100;
        e.style.filter = 'alpha(opacity=100)';
        titleTip.timerb = setTimeout((function(){
            e.style.opacity = 0;
            e.style.filter = 'alpha(opacity=0)';
            titleTip.timerc = setTimeout((function(){
                e.innerHTML = backtext;
                e.style.opacity = 100;
                e.style.filter = 'alpha(opacity=100)';
				titleTip.timerd = setTimeout((function(){
					if(titleTip.hasClass(e,"titleTip-anim")&&titleTip.status == 'changing')titleTip.removeClass(e,"titleTip-anim");
				}),change);
                titleTip.status = 'show';
                titleTip.text = backtext;
            }),change);
        }),delay);
    }),change);
    return true;
}
titleTip.resetTip = function(change = 500){
	if(!titleTip.enabled){
		console.error("titleTip need to init.(resetTip)");
		return false;
	}
	if(titleTip.getCurrentTitle()==titleTip.defaultTitle) return;
	titleTip.status = "changing";
	e = titleTip.dom;
    e.style.opacity = 0;
    e.style.filter = 'alpha(opacity=0)';
    titleTip.timerc = setTimeout((function(){
        e.innerHTML = titleTip.defaultTitle;
        e.style.opacity = 100;
        e.style.filter = 'alpha(opacity=100)';
        titleTip.status = 'show';
        titleTip.text = titleTip.defaultTitle;
    }),change);
}
titleTip.change = function(text = false){
	if(text!=false){
		if(text==titleTip.defaultTitle==titleTip.currentTitle){
			return;
		}
		titleTip.defaultTitle = text;
	}
	titleTip.resetTip();
	return;
}
