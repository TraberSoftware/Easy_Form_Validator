<!--

var NAME_MIN_LENGTH = 6;
var NAME_MAX_LENGTH = 16;
var PHONE_NUMBER_LENGTH = 9;
var EMPTY_WITH_SPACES = 'Escribe algo aparte de espacios en blanco';
var EMPTY_FIELD = 'Campo vac\u00EDo';
var BAD_DATE = 'Fecha incorrecta (formato de fecha: DD-MM-YYYY o DD/MM/YYYY)';
var BAD_EMAIL = 'Email incorrecto';
var BAD_PHONE = 'N\u00FAmero de tel\u00E9fono incorrecto';
var MIN_LENGTH_NOT_REACHED = 'M\u00EDnimo '+NAME_MIN_LENGTH+' caracteres';
var MAX_LENGTH_REACHED = 'M\u00E1ximo '+NAME_MAX_LENGTH+' caracteres';
var FORM_ERROR = 'Error de formulario';

var started=false;

if(!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
}

function validate(element, checkIfEmpty){
	var nextElement = element.parentNode.lastChild;
	if (nextElement.nodeName!="DIV"){
		if (checkIfEmpty){
			var result = fieldValidate(element);
			var resultNumber = result.split("/")[0];
			var message = result.split("/")[1];
			var newElement = document.createElement("div");
			newElement.setAttribute('class', (resultNumber==0?"wrong":"ok"));
			var newElementText = document.createTextNode(message);
			newElement.appendChild(newElementText);
			element.parentNode.appendChild(newElement);
		}
		else{
			if (element.value!=''){
				var result = fieldValidate(element);
				var resultNumber = result.split("/")[0];
				var message = result.split("/")[1];
				var newElement = document.createElement("div");
				newElement.setAttribute('class', (resultNumber==0?"wrong":"ok"));
				var newElementText = document.createTextNode(message);
				newElement.appendChild(newElementText);
				element.parentNode.appendChild(newElement);
			}
			else if (nextElement!=element) nextElement.parentNode.removeChild(nextElement);
		}
	}
	else if ((nextElement.getAttribute('class')=='wrong' || nextElement.getAttribute('class')=='ok')){
		if (checkIfEmpty){
			var result = fieldValidate(element);
			var resultNumber = result.split("/")[0];
			var message = result.split("/")[1];
			nextElement.setAttribute('class', (resultNumber==0?"wrong":"ok"));
			if (message!='') nextElement.innerHTML = unescape(message);
		}
		else{
			if (element.value!=''){
				var result = fieldValidate(element);
				var resultNumber = result.split("/")[0];
				var message = result.split("/")[1];
				nextElement.setAttribute('class', (resultNumber==0?"wrong":"ok"));
				if (message!='') nextElement.innerHTML = unescape(message);
			}
			else if (nextElement!=element) nextElement.parentNode.removeChild(nextElement);
		}
	}
	else if (nextElement.getAttribute('class')=='calendar'){
		nextElement = nextElement.previousSibling;
		if (nextElement.nodeName!="DIV"){
			if (checkIfEmpty){
				var result = fieldValidate(element);
				var resultNumber = result.split("/")[0];
				var message = result.split("/")[1];
				var newElement = document.createElement("div");
				newElement.setAttribute('class', (resultNumber==0?"wrong":"ok"));
				var newElementText = document.createTextNode(message);
				newElement.appendChild(newElementText);
				element.parentNode.insertBefore(newElement, nextElement.parentNode.lastChild);
			}
			else{
				if (element.value!=''){
					var result = fieldValidate(element);
					var resultNumber = result.split("/")[0];
					var message = result.split("/")[1];
					var newElement = document.createElement("div");
					newElement.setAttribute('class', (resultNumber==0?"wrong":"ok"));
					var newElementText = document.createTextNode(message);
					newElement.appendChild(newElementText);
					element.parentNode.insertBefore(newElement, nextElement.parentNode.lastChild);
				}
				else if (nextElement!=element) nextElement.parentNode.removeChild(nextElement);
			}
		}
		else if ((nextElement.getAttribute('class')=='wrong' || nextElement.getAttribute('class')=='ok')){
			if (checkIfEmpty){
				var result = fieldValidate(element);
				var resultNumber = result.split("/")[0];
				var message = result.split("/")[1];
				nextElement.setAttribute('class', (resultNumber==0?"wrong":"ok"));
				if (message!='') nextElement.innerHTML = unescape(message);
			}
			else{
				if (element.value!=''){
					var result = fieldValidate(element);
					var resultNumber = result.split("/")[0];
					var message = result.split("/")[1];
					nextElement.setAttribute('class', (resultNumber==0?"wrong":"ok"));
					if (message!='') nextElement.innerHTML = unescape(message);
				}
			}
		}
	}
}

function fieldValidate(element){
	switch(element.getAttribute('fieldTag').toUpperCase()){
		case 'NAME':
			if (element.value!=''){
				if (element.value.trim()=='') return "0/\u2190 "+EMPTY_WITH_SPACES;
				else if (element.value.trim().length<NAME_MIN_LENGTH || element.value.trim().length>NAME_MAX_LENGTH){
					return "0/\u2190 "+(element.value.length<NAME_MIN_LENGTH?MIN_LENGTH_NOT_REACHED:MAX_LENGTH_REACHED);
				}else return "1/\u221A ";
			}
			else{
				return "0/\u2190 " + EMPTY_FIELD;
			}
			break;
		case 'EMAIL':
			if (element.value!=''){
				var emailPatt = /^.+@.+[.].{2,}$/i;
				if (element.value.trim()=='') return "0/\u2190 "+EMPTY_WITH_SPACES;
				else if (!emailPatt.test(element.value.trim())){
					return "0/\u2190 "+BAD_EMAIL;
				}else return "1/\u221A ";
			}
			else{
				return "0/\u2190 "+EMPTY_FIELD;
			}
			break;
		case 'PHONE':
			if (element.value!=''){
				if (element.value.trim()=='') return "0/\u2190 "+EMPTY_WITH_SPACES;
				else if (isNaN(parseInt(element.value.trim())) || element.value.trim().length!=PHONE_NUMBER_LENGTH || parseInt(element.value.trim())<0){
					return "0/\u2190 "+BAD_PHONE;
				}else return "1/\u221A ";
			}
			else{
				return "0/\u2190 "+EMPTY_FIELD;
			}
			break;
		case 'DATE':
			if (element.value!=''){
				var mainPattern = /^([1-9]{1}|[0-3]{0,1}[1-9]{1}|[1-3]{1}[0]{1})\-[0-9]{1,2}\-[0-9]{4}$/;
				if (element.value.trim()=='') return "0/\u2190 "+EMPTY_WITH_SPACES;
				else if (mainPattern.test(element.value.replace("/", "-").replace("/", "-"))){
					if (validateDate(element.value.replace("/", "-").replace("/", "-"))){
						return "1/\u221A ";
					}else return "0/\u2190 "+BAD_DATE;
				}else return "0/\u2190 "+BAD_DATE;
			}
			else{
				return "0/\u2190 "+EMPTY_FIELD;
			}
			break;
		case 'SIMPLE':
			if (element.value!=''){
				if (element.value.trim()!=''){
					return "1/\u221A ";
				}else return "0/\u2190 "+EMPTY_WITH_SPACES;	
			}
			else{
				return "0/\u2190 "+EMPTY_FIELD;
			}
			break;
		case 'MIN':
			if (element.getAttribute('min') || element.getAttribute('MIN')){
				var MIN = (element.getAttribute('min')?element.getAttribute('min'):element.getAttribute('MIN'));
				var minLengthNotReached = 'M\u00EDnimo '+MIN+' caracteres';
				if (element.value!=''){
					if (element.value.trim()!=''){
						if (element.value.trim().length>=MIN){
							return "1/\u221A ";
						}else return "0/\u2190 "+ minLengthNotReached;
					}else return "0/\u2190 "+EMPTY_WITH_SPACES;	
				}
				else{
					return "0/\u2190 "+EMPTY_FIELD;
				}
			}else return "0/\u2190 "+FORM_ERROR;
			break;
		case 'MAX':
			if (element.getAttribute('max') || element.getAttribute('MAX')){
				var MAX = (element.getAttribute('max')?element.getAttribute('max'):element.getAttribute('MAX'));
				var maxLengthReached = 'M\u00E1ximo '+MAX+' caracteres';
				if (element.value!=''){
					if (element.value.trim()!=''){
						if (element.value.trim().length<=MAX){
							return "1/\u221A ";
						}else return "0/\u2190 "+ maxLengthReached;
					}else return "0/\u2190 "+EMPTY_WITH_SPACES;	
				}
				else{
					return "0/\u2190 "+EMPTY_FIELD;
				}
			}else return "0/\u2190 "+EMPTY_WITH_SPACES;
			break;
		case 'MIN_MAX':
			if ((element.getAttribute('max') || element.getAttribute('MAX')) && (element.getAttribute('min') || element.getAttribute('MIN'))){
				var MAX = (element.getAttribute('max')?element.getAttribute('max'):element.getAttribute('MAX'));
				var MIN = (element.getAttribute('min')?element.getAttribute('min'):element.getAttribute('MIN'));
				
				var maxLengthReached = 'M\u00E1ximo '+(element.getAttribute('max')?element.getAttribute('max'):element.getAttribute('MAX'))+' caracteres';
				var minLengthNotReached = 'M\u00EDnimo '+(element.getAttribute('min')?element.getAttribute('min'):element.getAttribute('MIN'))+' caracteres';
				if (element.value!=''){
					if (element.value.trim()!=''){
						if (element.value.trim().length>MAX){
							return "0/\u2190 "+ maxLengthReached;
						}
						else if (element.value.trim().length<MIN){
							return "0/\u2190 "+ minLengthNotReached;
						}
						else{
							return "1/\u221A ";
						}
					}else return "0/\u2190 "+EMPTY_WITH_SPACES;	
				}
				else{
					return "0/\u2190 "+EMPTY_FIELD;
				}
			}else return "0/\u2190 "+FORM_ERROR;
			break;
	}
}

function validateDate(date){
	var dateElements = date.split("-");
	var day = dateElements[0];
	var month = dateElements[1];
	var year = dateElements[2];
	monthDaysArray = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var validDate=true;
	var maxDays = monthDaysArray[parseInt(month)-1];
	if (month==2 && year%4==0) maxDays++;
	if (day>maxDays) validDate=false;
	if (month>12) validDate=false;
	if (year>2050 || year<1) validDate=false;
	return validDate;
}

function init() {
	if (!started){
		var formElements = document.getElementsByTagName("input");
		for(var i=0; i<formElements.length; i++){
			var element = formElements[i];
			if (element.getAttribute("fieldTag")){
				var parent = element.parentNode;
				var newElement = document.createElement("div");
				newElement.setAttribute('class', 'formField');
				
				//parent.appendChild(newElement);
				
				parent.insertBefore(newElement, element);
				newElement.appendChild(parent.removeChild(element));
				
				element.onblur = function(){
					validate(this, false);
				};
				
				if (element.getAttribute("fieldTag").toUpperCase()=='DATE'){
					var element = document.getElementsByTagName("input")[i];
					element.setAttribute('readonly', 'readonly');
					var calendarDiv = document.createElement("div");
					calendarDiv.setAttribute('id', 'datePicker');
					calendarDiv.setAttribute('style', 'display:none');
					calendarDiv.setAttribute('class', 'calendar');
					element.parentNode.appendChild(calendarDiv);
					
					//element.setAttribute('onblur','validar(this);'); 

					element.onblur = undefined;
					
					element.onfocus = function(){
						datePicker(this);
					};
				}
			} 
			if (element.getAttribute("type").toUpperCase()=='SUBMIT'){
				element.onclick = function(){
					var formElements = document.getElementsByTagName("input");
					for(var i=0; i<formElements.length; i++){
						var element = formElements[i];
						if (element.getAttribute("fieldTag")){
							validate(element, true);
						}
					}
				};
			}
		}
		if (_timer) clearInterval(_timer);
		started=true;
	}
};

if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
  document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
  var script = document.getElementById("__ie_onload");
  script.onreadystatechange = function() {
    if (this.readyState == "complete") {
      init(); // call the onload handler
    }
  };
/*@end @*/

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
  var _timer = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
      init(); // call the onload handler
    }
  }, 10);
}

/* for other browsers */
window.onload = init;

-->