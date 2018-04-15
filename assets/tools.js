// Collection of many useful js functions.


//From Bilibili | parse httpget params
function getUrlParam(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        try {
            return decodeURIComponent(r[2]);
        } catch (e) {
            return null;
        }
    }
    return null;
}

//From Unknow | parse json
function parseJson(json) {
    return eval("(" + json + ")");
}

//From zhihu | add style rules to html
function addStyle(str_css) {
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = str_css;
    document.getElementsByTagName("head").item(0).appendChild(style);
}

//From CKylin | if input is empty
function isEmpty(key) {
    if (!key || key == '' || key == ' ' || key == '   ' || key == 'undefined' || key == '{}') {
        return true;
    }
    return false;
}

//From CKylin | random keys
let random = {};
random.key = (function() {
    return Math.random();
});
random.number = (function() {
    return Math.ceil(Math.random());
});
random.range = (function(min, max) {
    if (!min) return false;
    if (!max) return false;
    return Math.floor(Math.random() * (max - min + 1) + min);
});
random.half = (function() {
    let r = Math.random();
    if (r >= .5) {
        return true;
    }
    return false;
});

//From Unknow | add document.ready();
(function() {
    let ie = !!(window.attachEvent && !window.opera);
    let wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    let fn = [];
    let run = function() { for (let i = 0; i < fn.length; i++) fn[i](); };
    let d = document;
    d.ready = function(f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function() {
                try { d.documentElement.doScroll('left');
                    run(); } catch (err) { setTimeout(arguments.callee, 0); }
            })();
        else if (wk)
            var t = setInterval(function() {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();

//From RankBill | Packaged ajax
function Ajax(type, url, data, success, failed) {
    // 创建ajax对象
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    type = type.toUpperCase();
    // 用于清除缓存
    let random = Math.random();

    if (typeof data == 'object') {
        let str = '';
        for (let key in data) {
            str += key + '=' + data[key] + '&';
        }
        data = str.replace(/&$/, '');
    }

    if (type == 'GET') {
        if (data) {
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
            console.log(url + '?t=' + random);
        }
        xhr.send();

    } else if (type == 'POST') {
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    // 处理返回数据
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                success(xhr.responseText);
            } else {
                if (failed) {
                    failed(xhr.status);
                }
            }
        }
    }
}

//From jser.com | getParams
function getParams(data) {
    let arr = [];
    for (let param in data) {
        arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
    }
    console.log(arr);
    arr.push(('randomNumber=' + Math.random()).replace('.'));
    console.log(arr);
    return arr.join('&');
}

//From caibaojian.com | jsonp
function jsonp(url, data, callback) {
    let script = document.createElement('script');
    document.body.appendChild(script);

    data = data || {};
    data.callback = 'cb' + new Date().getTime();
    window[data.callback] = callback;

    url += '?' + getParams(data);

    script.src = url;
    script.onload = function() {
        document.body.removeChild(script);
    }
}

function httpget(url, data, success, failed) {
    return Ajax('get', url, data, success, failed);
}

function httppost(url, data, success, failed) {
    return Ajax('post', url, data, success, failed);
}

//From jb51.net | Url parse
function parseURL(url) {
    let a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function() {
            let ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                s; //len = 2
            //alert(a.search)
            for (; i < len; i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}

function getFavicon(url) {
    if (!url) return false;
    let domain = parseURL(url);
    //console.log(domain);
    //return "http://statics.dnspod.cn/proxy_favicon/_/favicon?domain="+domain.host;
    return "http://api.byi.pw/favicon/?expire=3600&url=" + domain.host;
}

//From Unknow | JS Sleep
function sleep(numberMillis) {
    let now = new Date();
    let exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

//From xun_2008 | Check if url
function checkURL(URL) {
    let str = URL;
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    let objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
}

/*
    forEach除了接受一个必须的回调函数参数，还可以接受一个可选的上下文参数（改变回调函数里面的this指向）（第2个参数）。
*/
if (!Array.prototype.forEach && typeof Array.prototype.forEach !== "function") {
    Array.prototype.forEach = function(callback, context) {
       // 遍历数组,在每一项上调用回调函数，这里使用原生方法验证数组。
       if (Object.prototype.toString.call(this) === "[object Array]") {
           let i,len;
           //遍历该数组所有的元素
           for (i = 0, len = this.length; i < len; i++) {
               if (typeof callback === "function"  && Object.prototype.hasOwnProperty.call(this, i)) {
                   if (callback.call(context, this[i], i, this) === false) {
                       break; // or return;
                   }
               }
           }
       }
    };
}

//From Unknow | Styles actions
let domclass = {};
domclass.add = function(obj, cls){
    if(!(obj instanceof HTMLElement)) obj = document.querySelector(obj);
    let obj_class = obj.className;
    let blank = (obj_class != '') ? ' ' : '';
    let added = obj_class + blank + cls;
    obj.className = added;
	//console.log(obj.id+"  "+added);
}
 
domclass.remove = function(obj, cls){
    if(!(obj instanceof HTMLElement)) obj = document.querySelector(obj);
    let obj_class = ' '+obj.className+' ';
    obj_class = obj_class.replace(/(\s+)/gi, ' ');
    let removed = obj_class.replace(' '+cls+' ', ' ');
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;
}
 
domclass.has = function(obj, cls){
    if(!(obj instanceof HTMLElement)) obj = document.querySelector(obj);
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

//Check if tools.js is loaded.
let ToolsJS = true;
console.info('Tools.js loaded.');