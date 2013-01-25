<!--

var CALENDAR_STARTED = false;

function datePickerStartup(element){
	if (!CALENDAR_STARTED){
		monthDaysArray = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		monthNames = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
		weekDayNames = new Array('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo');
		Today = new Date();
		containerElement=element;
		CALENDAR_STARTED=true;
	}
}

function drawCalendar(){
	var monthDays = monthDaysArray[Today.getMonth()];
	var calendar = '';
	if (Today.getMonth()==1 && Today.getYear()%4==0){
		monthDays++;
	}
	var startDay = new Date(Today.getFullYear(), Today.getMonth(), 1).getDay();
	calendar = calendar + ('<html><body><table><tr><td colspan="2"><button type="button" onclick="prev();"><b><</b></button></td><td align=center colspan=3 class="header">'+monthNames[Today.getMonth()].substr(0,3)+' de ' + Today.getFullYear()+'</td><td colspan="2"><button type="button" onclick="next();"><b>></b></button></td></tr>');
	calendar = calendar + ('<tr>');
	for (var i=0; i<weekDayNames.length; i++){
		var className="laborate";
		if (i>4) className = "weekend";
		calendar = calendar + ('<td class="'+className+' headerDays"><b>'+weekDayNames[i].substr(0,3)+'</b></td>');
	}
	calendar = calendar + ('</tr>');
	calendar = calendar + ('<tr>');
	var prevMonth = (Today.getMonth()-1);
	if (prevMonth==-1)prevMonth=11;
	var prevYear = Today.getFullYear();
	if (prevMonth==11)prevYear--;
	var prevMaxDays = monthDaysArray[prevMonth];
	if (prevMonth==1 && prevYear%4==0){
		prevMaxDays++;
	}
	if (startDay==0)startDay=7;
	for (var i=0; i<(startDay-1); i++){
		calendar = calendar + ('<td height="20px" class="prevLastMonthDays"><b>'+(prevMaxDays-startDay+i+2)+'</b></td>');
	}
	lineCounter = startDay-1;
	for (var i=(startDay); i<(monthDays+startDay); i++){
		if ((i-1)%7==0) {
			calendar = calendar + ('</tr><tr>');
			lineCounter = 0;
		}
		var dayClass = "day";
		if ((i-startDay+1)==Today.getDate()) dayClass = dayClass + " today";
		else dayClass = dayClass + " notToday";
		if (lineCounter==5 || lineCounter==6) dayClass = dayClass + " weekendDay";
		else dayClass = dayClass + " notWeekendDay";
		calendar = calendar + ('<td height="20px" class="'+dayClass+'" onClick="dateSelect('+(i+1-startDay)+')"><b>'+(i+1-startDay)+'</b></td>');
		lineCounter++;
	}
	var tempCounter = 1;
	while (lineCounter<=6){
		calendar = calendar + ('<td height="20px" class="prevLastMonthDays"><b>'+tempCounter+'</b></td>');
		tempCounter++;
		lineCounter++;
	}
	/*calendar = calendar + ('</tr></table><p class="center" onclick="refresh();"><img src="restart.png" width="24px" height="24px" align="top" class="handCursor"><font face="arial, verdana" size=5 style="text-decoration:underline; cursor:hand; ">Reestablecer</font></img></p><br/>');*/
	document.getElementById('datePicker').innerHTML=calendar;
}

function refresh(){
	Today = new Date();
	drawCalendar();
}

function next(){
	var todayDay = Today.getDate();
	var todayMonth = Today.getMonth();
	var todayYear = Today.getFullYear();
	todayMonth++;
	if (todayMonth=='12'){
		todayYear++;
		todayMonth=0;
	}
	maxDays = monthDaysArray[todayMonth];
	if (todayMonth==1 && todayYear%4==0){
		maxDays++;
	}
	if (todayDay>maxDays)todayDay = maxDays;
	Today = new Date(todayYear, todayMonth, todayDay);
	drawCalendar();
}

function prev(){
	todayDay = Today.getDate();
	todayMonth = Today.getMonth();
	todayYear = Today.getFullYear();
	todayMonth--;
	if (todayMonth=='-1'){
		todayYear--;
		todayMonth=11;
	}
	maxDays = monthDaysArray[todayMonth];
	if (todayMonth==1 && todayYear%4==0){
		maxDays++;
	}
	if (todayDay>maxDays)todayDay = maxDays;
	Today = new Date(todayYear, todayMonth, todayDay);
	drawCalendar();
}

function datePicker(element){
	datePickerStartup(element);
	document.getElementById('datePicker').style.display = '';
	drawCalendar();
}

function dateSelect(day){
	Today = new Date(Today.getFullYear(), Today.getMonth(), day);
	todayMonth = (Today.getMonth()+1);
	if (todayMonth<10)todayMonth = "0"+todayMonth;
	if (day<10)day = "0"+day;
	todayYear = Today.getFullYear();
	containerElement.value = day+'/'+todayMonth+'/'+todayYear;
	containerElement.setAttribute('value', day+'/'+todayMonth+'/'+todayYear);
	validate(containerElement, false);
	hideCalendar();
}

function hideCalendar(){
	document.getElementById('datePicker').style.display = 'none';
}
-->