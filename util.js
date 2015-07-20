(function(o){
	var  _$ = {
		version:"1.0.0",
		email:/^\w+\@\w*\.\w/,
		phone:/^1\d{10}$/,
		isArray:function(obj){
			return Object.prototype.toString.call(obj) == "[object Array]";
		},
		isFunction:function(fn){
			return Object.prototype.toString.call(fn) == "[object Function]";
		},

		cloneObject:function( src ){
			
		},
		uniqArray:function( arr ){
			var ret = [],tmp = {};
			for( var i=0,len=arr.length;i<len;i++ ){
				if( !tmp[ arr[i] ] ){
					tmp[ arr[i] ] = true;
					ret.push( arr[i] );
				}
			}
			return ret;
		},

		trim:function(str){
			return this.version.replace.apply(str,[/(^\s+)|(\s+$)/g,""]);
		},

		each:function(arr,fn){
			if( this.isArray( arr )  && this.isFunction( fn )){
				for( var index in arr ){
					fn.call(this, index,arr[index] );
				}
				return true;
			}
			return false;
		},

		getObjectLength:function(obj){
			var counter = null;
			if( Object.prototype.toString.call(obj) == "[object Object]" ){
				counter = 0;
				for( var i in obj ){
					if( i ) counter++;
				}
			}
			return counter;
		},

		isEmail:function(emailStr){
			return  this.email.test( emailStr );
		},

		isMobilePhone:function(phone){
			return this.phone.test(phone);
		},

		//style 

		addClass:function(element, newClassName){
			element.className = newClassName;
		},

		removeClass:function(element, oldClassName){
			element.className =  element.className.replace( new RegExp( "(\\s|^)"+oldClassName+"(\\s|$)" ),"" );
		},

		isSiblingNode:function(element, siblingNode){
			return element.parentNode == siblingNode.parentNode;
		},

		getPosition:function(element){
			return "{"+ element.offsetLeft+","+element.offsetHeight+"}";
		},

		//mini jQuery
		minijQuery:function(selector){
			// HTML5
			return document.querySelector( selector );
		},

		//event
		addEvent:function(element,event,listener){
			element.addEventListener(event,listener,false);
		},

		removeEvent:function(element,event,listener){
			element.removeEventListener(event,listener,false);
		},

		addClickEvent:function(element,listener){
			element.addEventListener("click",listener,false);
		},

		addEnterEvent:function(element, listener){
			element.addEventListener("keydown",function(listener){
				if( event.keyCode ==  13 ){
					listener.call(this);
				}
			},false);
		},

		delegateEvent:function(element, tag, eventName, listener){
			element.addEventListener(eventName,function(e){
				var ev = e || window.event;
				var src = ev.target || ev.srcElement;
				if( src.nodeName.toLowerCase() ==  tag ){
					listener.call(this);
				}
			},false);
		},

		//BOM

		isIE:function(){
			return (!+[1,]);
		},

		setCookie:function(cookieName, cookieValue, expiredays){
			var date = new Date();
			date.setTime( date.getTime() + ( expiredays*24*60*60*1000 ) );
			var expires = "expires="+date.toUTCString();
			document.cookie = $.trim(cookieName) +  "=" + $.trim(cookieValue) + ";" +  expires;
		},

		getCookie:function(cookieName){
			var cookies = document.cookie.split(";");
			for( var i in cookies ){
				var couple = cookies[i].split("=");
				if( couple[0] == cookieName ){
					return couple[1];
				}
			}
			return null;
		},

		//Ajax
		getXhr:function(){
			var xhr = "";
			try{
				xhr = new XMLHttpRequest();
			}catch(e) {
				var IEXHRVers =["Msxml3.XMLHTTP","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];
				for (var i=0,len=IEXHRVers.length;i< len;i++) {
					try {xhr = new ActiveXObject(IEXHRVers[i]);}
					catch(e) {continue;}
				}
			}
			return xhr;
		},

		//  $.ajax("http://baidu.com",{},{type:"post",success:function(){ alert("ok") },fail:function(){ alert("fail") } })
		ajax:function(url,data,options){
			var xhr = this.getXhr();
			xhr.open( options.type,url,true );
			xhr.send( data );
			xhr.onreadystatechange = function () {
		 		if (xhr.readyState==4 && xhr.status ==200) {
		 			if( _$.isFunction( options.success ) ){
		 				options.success.call(this);
		 			}
		 		}else{
		 			if( _$.isFunction( options.fail ) ){
		 				options.fail.call(this);
		 			}
		 		}
		 	};
		}
	};
	o.$ = _$;
})(window);
