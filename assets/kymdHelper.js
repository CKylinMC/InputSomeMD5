let card = {};
card.div = function(classname="",inner="",id="",classext=""){
	div = document.createElement("div");
	if(classname) domclass.add(div,classname);
	if(id) div.id = id;
	if(classext) domclass.add(div,classext);
	if(inner instanceof HTMLElement)div.appendChild(inner); else div.innerHTML = inner;
	return div;
}
card.header = function(){
	e = card.div("card-header");
	for(i=0;i<arguments.length;i++){
		if(arguments[i] instanceof HTMLElement){
			e.appendChild(arguments[i]);
		} else {
			e.innerHTML+= arguments[i].toString();
		}
	}
	return e;
}
card.sub = card.subtitle = function(){
	e = card.div("card-subtitle");
	for(i=0;i<arguments.length;i++){
		if(arguments[i] instanceof HTMLElement){
			e.appendChild(arguments[i]);
		} else {
			e.innerHTML+= arguments[i].toString();
		}
	}
	return e;
}
card.body = function(){
	e = card.div("card-body");
	for(i=0;i<arguments.length;i++){
		if(arguments[i] instanceof HTMLElement){
			e.appendChild(arguments[i]);
		} else {
			e.innerHTML+= arguments[i].toString();
		}
	}
	return e;
}
card.footer = function(){
	e = card.div("card-footer card-footer-right");
	for(i=0;i<arguments.length;i++){
		if(arguments[i] instanceof HTMLElement){
			e.appendChild(arguments[i]);
		} else {
			e.innerHTML+= arguments[i].toString();
		}
	}
	return e;
}
card.clear = function(){
	e = card.div("clear");
	return e;
}
card.alink = function(text="&nbsp;",href="javascript:void(0)",onclick="",classnames="",disabled=0,dosth=function(){}){
	a = document.createElement("a");
	a.innerHTML = text;
	a.href = href;
	a.onclick = onclick;
	domclass.add(a,classnames);
	if(disabled) a.disabled = "disabled";
	if(dosth instanceof Function) dosth(a);
	return a;
}
card.btn = function(text="&nbsp;",classnames="",disabled=0,dosth=function(){}){
	btn = document.createElement("button");
	btn.innerHTML = text;
	//console.log(onclick);
	//btn.onclick = onclick;
	domclass.add(btn,classnames);
	if(disabled) btn.disabled = "disabled";
	if(dosth instanceof Function) dosth(btn);
	return btn;
}
card.input = function(value="",ph="",readonly=0,width="",dosth=function(){}){
	input = document.createElement("input");
	input.value = value;
	input.placeholder = ph;
	if(readonly) input.readonly = "readonly";
	if(width) input.width=width;
	if(dosth instanceof Function) dosth(input);
	return input;
}
card.card = function(){
	carddiv = card.div("card");
	for(i=0;i<arguments.length;i++){
		if(arguments[i] instanceof HTMLElement){
			carddiv.appendChild(arguments[i]);
		} else {
			carddiv.innerHTML+= arguments[i].toString();
		}
	}
	return carddiv;
}
