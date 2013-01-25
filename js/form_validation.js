<!--
/************************************
 *                                  *
 * EASY FORM VALIDATOR - JavaScript *
 *                                  *
 * **********************************
 *                                  *
 *         TRABER SOFTWARE          *
 *                                  *
 ************************************/

/*SCRIPT CONSTANTS*/

var NAME_MIN_LENGTH = 6;
var NAME_MAX_LENGTH = 16;
var PHONE_NUMBER_LENGTH = 9;
var EMPTY_WITH_SPACES = 'Escribe algo aparte de espacios en blanco';
var EMPTY_FIELD = 'Campo vac\u00EDo';
var BAD_DATE = 'Fecha incorrecta (formato de fecha: DD-MM-YYYY o DD/MM/YYYY)';
var BAD_EMAIL = 'Email incorrecto';
var BAD_PHONE = 'N\u00FAmero de tel\u00E9fono incorrecto';
var FORM_ERROR = 'Error de formulario';
var NOT_A_NUMBER = 'Introduce un n\u00FAmero';
var started=false;

/*Adding trim function to String*/
if(!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
}

/* Adding event listener for <input> tags */
function init() {
	if (!started){
		var formElements = document.getElementsByTagName("input");
		for(var i=0; i<formElements.length; i++){
			var element = formElements[i];
			if (element.getAttribute("fieldTag")){
				var parent = element.parentNode;
				var newElement = document.createElement("div");
				newElement.setAttribute('class', 'formField');				
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

/* Wait to the DOM to be loaded */
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

/*Handler for validation and UI*/
function validate(element, checkIfEmpty){
	var nextElement = element.parentNode.lastChild;
	if (nextElement.nodeName!="DIV"){ /*The validation DIV doesn't exist.*/
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

/* Validation function for each handled event */
function fieldValidate(element){
	switch(element.getAttribute('fieldTag').toUpperCase()){ /* We do an upperCase to allow case-insensitive tagging */
		case 'NAME': /* NAME tag */
			var max = parseInt((element.getAttribute('max')?element.getAttribute('max'):element.getAttribute('MAX')));
			var min = parseInt((element.getAttribute('min')?element.getAttribute('min'):element.getAttribute('MIN')));
			if (!max && !min){ /* Has no MIN or MAX tags */
				max = NAME_MAX_LENGTH; 
				min = NAME_MIN_LENGTH;
			}
			else if (!min){ /* Has MAX tag */
				min = Number.MIN_VALUE;
			}
			else if (!max){ /* Has MIN tag */
				max = Number.MAX_VALUE;
			}
			if (min && max && !isNaN(min) && !isNaN(max) && min>0 && min>0 && min<max){ /* Checking tags and tag values */
				var minLengthNotReached = 'M\u00EDnimo '+min+' caracteres';
				var maxLengthReached = 'M\u00E1ximo '+max+' caracteres';
				if (element.value!=''){
					if (element.value.trim()=='') return "0/\u2190 "+EMPTY_WITH_SPACES;
					else if (element.value.trim().length<min || element.value.trim().length>max){
						return "0/\u2190 "+(element.value.length<min?minLengthNotReached:maxLengthReached);
					}else return "1/\u221A ";
				}
				else{
					return "0/\u2190 " + EMPTY_FIELD;
				}
			}else return "0/\u2190 "+FORM_ERROR;
			break;
		case 'EMAIL': /* EMAIL tag */
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
			var min = parseInt((element.getAttribute('min')?element.getAttribute('min'):element.getAttribute('MIN')));
			if (min && !isNaN(parseInt(min)) && min>0){
				var minLengthNotReached = 'M\u00EDnimo '+min+' caracteres';
				if (element.value!=''){
					if (element.value.trim()!=''){
						if (element.value.trim().length>=min){
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
			var max = parseInt((element.getAttribute('max')?element.getAttribute('max'):element.getAttribute('MAX')));
			if (max && !isNaN(parseInt(max)) && max>0){
				var maxLengthReached = 'M\u00E1ximo '+max+' caracteres';
				if (element.value!=''){
					if (element.value.trim()!=''){
						if (element.value.trim().length<=max){
							return "1/\u221A ";
						}else return "0/\u2190 "+ maxLengthReached;
					}else return "0/\u2190 "+EMPTY_WITH_SPACES;	
				}
				else{
					return "0/\u2190 "+EMPTY_FIELD;
				}
			}else return "0/\u2190 "+FORM_ERROR;
			break;
		case 'MIN_MAX':
			var max = parseInt((element.getAttribute('max')?element.getAttribute('max'):element.getAttribute('MAX')));
			var min = parseInt((element.getAttribute('min')?element.getAttribute('min'):element.getAttribute('MIN')));
			if (min && max && !isNaN(parseInt(min)) && !isNaN(parseInt(max)) && min>0 && max>0 && min<max){
				var maxLengthReached = 'M\u00E1ximo '+max+' caracteres';
				var minLengthNotReached = 'M\u00EDnimo '+min+' caracteres';
				if (element.value!=''){
					if (element.value.trim()!=''){
						if (element.value.trim().length>max){
							return "0/\u2190 "+ maxLengthReached;
						}
						else if (element.value.trim().length<min){
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
		case 'NUMBER':
			if (!isNaN(element.value.trim())){
				var max = parseInt((element.getAttribute('max')?element.getAttribute('max'):element.getAttribute('MAX')));
				var min = parseInt((element.getAttribute('min')?element.getAttribute('min'):element.getAttribute('MIN')));
				if (!max && !min){ /* Has no MIN or MAX tags */
					max = NAME_MAX_LENGTH; 
					min = NAME_MIN_LENGTH;
				}
				else if (!min){ /* Has MAX tag */
					min = Number.MIN_VALUE;
				}
				else if (!max){ /* Has MIN tag */
					max = Number.MAX_VALUE;
				}
				if (min && max && !isNaN(min) && !isNaN(max) && min>0 && min>0 && min<max){ /* Checking tags and tag values */
					var minLengthNotReached = 'M\u00EDnimo '+min+' caracteres';
					var maxLengthReached = 'M\u00E1ximo '+max+' caracteres';
					if (element.value!=''){
						if (element.value.trim()=='') return "0/\u2190 "+EMPTY_WITH_SPACES;
						else if (element.value.trim().length<min || element.value.trim().length>max){
							return "0/\u2190 "+(element.value.length<min?minLengthNotReached:maxLengthReached);
						}else return "1/\u221A ";
					}
					else{
						return "0/\u2190 " + EMPTY_FIELD;
					}
				}else return "0/\u2190 "+FORM_ERROR;
			}else return "0/\u2190 "+NOT_A_NUMBER;
			break;
	}
}

/* We validate the DATE with this function */
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

-->