let game={};
game.start = function(){
    domFilled("#gameframe",getE("#gameTemplate").innerHTML);
    $('#game_TimeRemain').timer({
        duration: game.time,
        callback: function() {
            game.timeStop();
        }
    });

    window.getE("#game_Input").readOnly = "";
    this.new();
};
game.time = "5m";
game.setTime = function(){
    dialoger.newDialog("s=秒 m=分钟 h=小时 d=天 <br><br><input id='game_SetTimeOut' value='"+game.time+"' placeholder='输入一个时间，如： 1m' required></input>","设置时间","确定",function(){
        dialoger.close();
        game.time = getE("#game_SetTimeOut").value;
        setTimeout(function(){
            dialoger.newDialog("时间已被设置为 "+game.time);
            getE("#time_Display").innerHTML = game.time;
        },500);
    })
};
game.locked = false;
game.totalCount = 0;
game.trueCount = 0;
game.history = [];
game.currentHash = "";
game.currentTime = {};
game.tryTimes = 0;
game.timeStop = function(){
    dialoger.newDialog("你的成绩是：<br><h1>正确："+this.trueCount+"</h1><h4>时间："+this.time+"</h4>","时间到!");
    this.locked = true;
    window.getE("#game_Input").readOnly = "readonly";
    game.end();
};
game.end = function(){
    domFilled("#gameframe",getE("#gameResultTemplate").innerHTML);
	let totalTrys = 0;
	let totalTimes = 0;
    this.history.forEach(function(key){
        data = JSON.parse(key);
        status = "<font color=red>失败</font>";
        if(data.status=="Success"){
            status = "<font color=green>成功</font>";
		}
		if(data.trys!=0){
			totalTrys+= data.trys;
			totalTimes+= data.times;
		}
        domAppend(getE("#game_ResultUL"),"<li>第"+data.counter+"个 | "+status+" | 尝试"+data.trys+"次 | 耗时"+data.times+"秒 | HASH: "+data.hash+"</li>");
    });
	trueflagps = Math.round(totalTimes/this.trueCount);
	flagps = Math.round(totalTimes/totalTrys);
	domAppend("#game_ResultBody",
		"<hr>总计尝试"+totalTrys+"次，正确率 "+GetPercent(this.trueCount,totalTrys)+"，平均正确单个耗时 "+trueflagps+" 秒，平均单个耗时 "+flagps+" 秒。"
	);
    domAppend("#game_ResultBody","<hr><button class='primary' onclick='game.reset()'>重置</button>");
};
game.scoreCalc = function(){
    return this.trueCount+"/"+this.totalCount;
};
game.generate = function(){
    return md5(Math.random());
};
game.jump = function(){
	let time = new Date().getTime() - this.currentTime.getTime();
	time = Math.round(time/1000);
	this.history.push(JSON.stringify({counter:this.totalCount,status: "Failed",hash: this.currentHash,trys: this.tryTimes, times: time}));
	dialoger.newDialog("有点可惜吶。。。","已跳过！");
    getE("#game_Input").value = "";
	this.new();
};
game.new = function(){
    this.currentTime = new Date();
    this.tryTimes = 0;
    this.totalCount++;
    this.currentHash = this.generate();
    this.update();
};
game.submit = function(value){
    //alert(value);
    if(game.locked) {
        dialoger.newDialog("不能再进行提交！","超时！");
        return;
    }
    this.tryTimes++;
    if(value==this.currentHash){
        let time = new Date().getTime() - this.currentTime.getTime();
        time = Math.round(time/1000);
        this.history.push(JSON.stringify({counter:this.totalCount,status: "Success",hash: this.currentHash,trys: this.tryTimes, times: time}));
        this.trueCount++;
        dialoger.newDialog("","正确！");

        this.new();
    }else{
        dialoger.newDialog("","错误！");
    }
    getE("#game_Input").value = "";
};
game.reset = function(){
    domFilled("#gameframe",getE("#gamePreparingTemplate").innerHTML);
    this.locked = false;
    this.totalCount = 0;
    this.trueCount = 0;
    this.history = [];
    this.currentHash = "";
    this.currentTime = {};
    this.tryTimes = 0;
};
game.update = function(){
    getE("#game_Score").innerHTML = this.scoreCalc();
    getE("#game_hash").innerHTML = this.currentHash;

};

function getE(e){
    return document.querySelector(e);
}
function domAppend(parent,child){
    let textmode = 0;
    if(!(parent instanceof HTMLElement)) parent = getE(parent);
    if(!(child instanceof HTMLElement)) {
        try{
            child = getE(child);
        }catch(e){
            textmode=1
        }
    }
    if(textmode){
        parent.innerHTML+=child;
    }else{
        parent.appendChild(child);
    }
    return parent;
}
function domFilled(parent,child){
    let textmode = 0;
    if(!(parent instanceof HTMLElement)) parent = getE(parent);
    if(!(child instanceof HTMLElement)) {
        try{
            child = getE(child);
        }catch(e){
            textmode=1
        }
    }
    if(textmode){
        parent.innerHTML = child;
    }else{
        parent.innerHTML = "";
        parent.appendChild(child);
    }
    return parent;
}
function GetPercent(num, total) { 
	num = parseFloat(num); 
	total = parseFloat(total); 
	if (isNaN(num) || isNaN(total)) { 
		return "-"; 
	} 
	return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00 + "%"); 
} 