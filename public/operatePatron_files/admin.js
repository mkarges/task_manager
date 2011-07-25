// Begin tooltip.js
// Extended Tooltip _Javascript
// copyright 9th August 2002, by Stephen Chapman, Felgall Pty Ltd
// permission is granted to use this _javascript provided that the below code is not altered
// sorry -- but I had to alter it: David Stanke added the escape for WebTV; it doesn't work on WebTV
if(navigator.appName.indexOf('WebTV')==-1) {
var DH = 0;var an = 0;var al = 0;var ai = 0;if (document.getElementById) {ai = 1; DH = 1;}else {if (document.all) {al = 1; DH = 1;} else { browserVersion = parseInt(navigator.appVersion); if ((navigator.appName.indexOf('Netscape') != -1) && (browserVersion == 4)) {an = 1; DH = 1;}}} function fd(oi,ws) {if (ws == 1) {if (ai) {return (document.getElementById(oi).style);}
else {if (al) {return (document.all[oi].style);} else {if (an) {return (document.layers[oi]);}};}} else {if (ai) {return (document.getElementById(oi));} else {if (al) {return (document.all[oi]);} else {if (an) {return (document.layers[oi]);}};}}} function pw() {if (window.innerWidth != null) return window.innerWidth; if (document.body.clientWidth != null)
return document.body.clientWidth; return (null);} function popUp(evt,oi) {if (DH) {var wp = pw(); ds = fd(oi,1); dm = fd(oi,0); st = ds.visibility; if (dm.offsetWidth) ew = dm.offsetWidth; else if (dm.clip.width) ew = dm.clip.width; if (st == "visible" || st == "show") { ds.visibility = "hidden"; } else  { if (evt.y || evt.pageY) {if (evt.pageY) {tv = evt.pageY + 20;
lv = evt.pageX - (ew/4);} else {tv = evt.y + 20 + document.body.scrollTop; lv = evt.x  - (ew/4) + document.body.scrollLeft;} if (lv < 2) lv = 2; else if (lv + ew > wp) lv -= ew/2;if (!an) {lv += 'px';tv += 'px'};ds.left = lv; ds.top = tv;} ds.visibility = "visible";}}}}
//end tooltip.js
function addStringToListWithComma(addStr,strList){
	if(addStr!=null){
		addStr=jQuery.trim(addStr);
	}
	
	if(strList!=null){
		var oldList=strList;
		var cArr=strList.split(",");
		var t=new Array();
		for(var i=0;i<cArr.length;i++){
			var c=cArr[i];
			if(c!=null && c!=""){
				//only for jquery
				t.push(jQuery.trim(c));
			}
		}
		strList="";
		for(var i=0;i<t.length;i++){
			if(t[i]==addStr){
				//don't add
				return oldList;
			}
			if(i==0){
				strList+=""+t[i];
			}else{
				strList+=", "+t[i];
			}
		}
		if(t.length>0){
			strList+=", "+addStr;
		}else{
			strList+=addStr;
		}
	}
	return strList;
}

function isEmpty(ctrl){
	return ctrl==null || ctrl=="undefined" || ctrl.value==null || ctrl.value=="";
}

function replaceAll(src, oldStr, newStr){ 
	return src.replace(new RegExp(oldStr, "g"), newStr); 
}
function setRadioValue(n,v){
	var ctrls=document.getElementsByName(n);
	if(ctrls!=null){
		for(var i=0;i<ctrls.length;i++){
			var ctrl=ctrls[i];
			if(ctrl.value==v){
				ctrl.checked=true;
				break;
			}
		}
	}	
}
function getValueFromRadio(n){
	var ctrls=document.getElementsByName(n);
	if(ctrls!=null){
		for(var i=0;i<ctrls.length;i++){
			var ctrl=ctrls[i];
			if(ctrl.type=='radio' && ctrl.checked){
				return ctrl.value;
			}
		}
	}
	return "";
}
function containInArray(arr,v){
	for(var i=0;i<arr.length;i++){
		s=arr[i];
		if(s==v){
			return true;
		}
	}
	return false;
}

function check_float(v){
try{
	var f=parseFloat(v);
	return ! isNaN(f);
}catch(e){
	return false;
}
}
function start_with_array(s,arr_perfix){
	for(var i=0;i<arr_perfix.length;i++){
		if(start_with(s,arr_perfix[i])){
			return true;
		}
	}
	return false;
}
function start_with(s,perfix){
	return s.substring(0,perfix.length)==perfix;
}

/*0001420: Date Range*/
/*modified in 0002140*/
function checkDateFromTo(fromDateVar,toDateVar,fromHours,fromMinutes,toHours,toMinutes,notcheckFromDate,dateName){
	try{
		if(toDateVar==null || fromDateVar==null || toDateVar.type!='text' || fromDateVar.type!='text'){
			return true;
		}
		var tmp=toDateVar.value;
		tmp=fromDateVar.value;
	}catch(e){
		return true;
	}
	if(toDateVar.value==""){
		return true;
	}
	var fromDateStr=fromDateVar.value;
	var toDateStr=toDateVar.value;
	var result=true;
	var fArr=fromDateStr.split("/");
	var fYear,fMonth,fDay;
	if(fArr.length>0){
		fMonth=fArr[0]-1;
	}
	if(fArr.length>1){
		fDay=fArr[1];
	}
	if(fArr.length>2){
		fYear=fArr[2];
	}
	if(!fromHours){
		fromHours=0;
	}
	if(!fromMinutes){
		fromMinutes=0;
	}
	var fromDate=new Date(fYear,fMonth,fDay,fromHours,fromMinutes,0);
	
	var tArr=toDateStr.split("/");
	var tYear,tMonth,tDay;
	if(tArr.length>0){
		tMonth=tArr[0]-1;
	}
	if(tArr.length>1){
		tDay=tArr[1];
	}
	if(tArr.length>2){
		tYear=tArr[2];
	}
	if(!toHours){
		toHours=0;
	}
	if(!toMinutes){
		toMinutes=0;
	}
	var toDate=new Date(tYear,tMonth,tDay,toHours,toMinutes,59);
	
	var now=new Date();
	//less now and form < to
	//alert(now.getTime()+" "+fromDate.getTime()+" "+toDate.getTime()+"\n"
	//	+now.toString()+" "+fromDate.toString()+" "+toDate.toString());
	
	if(!notcheckFromDate){	
		result= fromDate.getTime()<=now.getTime();
		if(!result){
			if(!dateName){
				alert("'From' date must be equal to or less than now.");
		  	}else{
		  		alert(dateName+" 'from' date must be equal to or less than now.");
		  	}
			fromDateVar.focus();
		}
	}
	if(result){
		result=fromDate.getTime()<=toDate.getTime();
		if(!result){
			if(!dateName){
				alert("'To' date must be equal to or later than 'from' date." );
			}else{
				alert(dateName+" 'to' date must be equal to or later than 'from' date." );
			}
			fromDateVar.focus();
		}
	}
	
	return result;
}

//=============================
function selectMultipleSeatsStyle(lstSeats,sectionId) {
if(paintStyle!="none"){
	// create an array from seats
	var arrSeats = lstSeats.split(",");

	var cls=paintStyle==''?'selected':paintStyle;
	var ch=paintChar==''?'&nbsp;':paintChar;
	// loop across array and select each
	var i = 0;
	while(i<arrSeats.length){
		selectSeatStyle(arrSeats[i],sectionId,cls,ch);
		i++;
	}
}   
}

var paintStyle="";
var paintChar="";

var arrSeatStyleClass = new Array();
var arrSeatChar=new Array();
// begin seating chart selection/deselection functions
// begin toggle seat
function toggleSeatStyle(seat, sectionId){
if(paintStyle!="none"){
	var cls= paintStyle==''?'selected':paintStyle;
	var ch= paintChar==''?'&nbsp;':paintChar;
	var seatObj=document.getElementById(seat);	
	if(seatObj){
		//alert(seatObj+" :"+seat+" "+cls+" "+ch);
		selectSeatStyle(seat,sectionId,cls,ch);
	}
}else{
	gotoOrder(seat);
}
}
// end toggle seat

// begin increment selected
function addToSelected(theNum) {
var ctrl=document.getElementById('numSeats');
if(ctrl!=null  && ctrl){
	var theQty = parseInt(ctrl.innerHTML);
	theQty = theQty + theNum;
	ctrl.innerHTML=theQty;
}
}

// end increment selected

// begin select seat
function selectSeatStyle(seat,sectionId,cls,ch) {
	var seatName = ch;
	if(cls=="hold" && (ch == '&nbsp;' || ch.charCodeAt(0) == 160)){
		seatName = "GNRL";
	}else if(cls=="available"){
		seatName = "available";
	}else if(cls=="patronHold"){
		seatName="PATN";
	}
	//deselect old
	deselectSeatStyle(seat,sectionId);
	var seatsObj=document.getElementById("seats"+seatName+sectionId);
//	alert("seats"+seatName+sectionId+":"+seatsObj);
	var strSeats = seatsObj.value;
    // create an array from the currently-selected seats
	var arrSeats = strSeats.split(",");
	// if not already present, add seat to array
		var i = 0;
		var seatFound = false;
		while(i<=arrSeats.length){
			if(arrSeats[i]==seat) {
				seatFound=true;
			}
			i++;
		}
		if(!seatFound) {
			arrSeats.push(seat);
		}
	// set original seat class in array
	var stObj=document.getElementById(seat);

	//if(stObj.className != cls) {
		arrSeatStyleClass[seat] = stObj.className;
		arrSeatChar[seat] = stObj.childNodes[0].innerHTML;
	//}
	// set seat class to selected
	stObj.className = cls;	
	//alert(stObj.childNodes[0].innerHTML);
	stObj.childNodes[0].innerHTML=ch;
	// convert array back to list and update the hidden field
	seatsObj.value = arrSeats.join(",");	
}
// end select seat

// begin deselect seat
function deselectSeatStyle(seat,sectionId) {
	var stObj=document.getElementById(seat);
	if(stObj!=null && arrSeatStyleClass[seat]!=null){
		cls= stObj.className;
		ch=stObj.childNodes[0].innerHTML;
		var seatName = ch;
		if(cls=="hold" && (ch == '&nbsp;' || ch.charCodeAt(0) == 160)){
			seatName = "GNRL";
		}else if(cls=="available"){
			seatName = "available";
		}else if(cls=="patronHold"){
			seatName="PATN";
		}
		var seatsObj=document.getElementById("seats"+seatName+sectionId);
		var strSeats = seatsObj.value;
	    // create an array from the currently-selected seats
		var arrSeats = strSeats.split(",");
		// determine seat position in array
		var i = 0;
		while(arrSeats[i] != seat){i++;}
		// remove seat from array
		arrSeats.splice(i, 1);
		// convert array back to list and update the hidden field
		seatsObj.value = arrSeats.join(",");
		// return cell to original class
		//var stObj=document.getElementById(seat);		
		stObj.className = arrSeatStyleClass[seat];	
		stObj.childNodes[0].innerHTML=arrSeatChar[seat];
	}
//	document.getElementById(seat).className=arrSeatStyleClass[seat];
//	document.getElementById(seat).innerHTML=arrSeatChar[seat];
}
//===============================

// declare array to hold onto original seat cell classes
var arrSeatClass = new Array();

// begin seating chart selection/deselection functions
// begin toggle seat
function toggleSeat(seat, sectionId){
var ctrl=document.getElementById(seat);	
if(!isPatronHold(ctrl.className)){
	if(ctrl.className == 'selected') {
		deselectSeat(seat,sectionId)
	} else {
		selectSeat(seat,sectionId);
	}
}else{
	var holdClassName = ctrl.className;
	selectSeat(seat,sectionId);
	ctrl.className  = holdClassName;
	gotoOrder(seat);
}
}
// end toggle seat

// begin select seat
function selectSeat(seat,sectionId,ignorePatron) {
	if(ignorePatron==undefined) ignorePatron=false;
	var st=document.getElementById(seat);
	if(st!=null && st.className != 'selected' && (!ignorePatron || !isPatronHold(st.className))) {
		var strSeats = document.getElementById("seats"+sectionId).value;
	    // create an array from the currently-selected seats
		var arrSeats = strSeats.split(",");
		// if not already present, add seat to array
		var i = 0;
		var seatFound = false;
		while(i<=arrSeats.length){
			if(arrSeats[i]==seat) {
				seatFound=true;
			}
			i++;
		}
		if(!seatFound) {
			arrSeats.push(seat);
		}
		// set original seat class in array
		arrSeatClass[seat] = st.className;
		// set seat class to selected
		st.className = 'selected';	
		// convert array back to list and update the hidden field
		document.getElementById("seats"+sectionId).value = arrSeats.join(",");	
		addToSelected(1);	
	}
}
// end select seat

// begin deselect seat
function deselectSeat(seat,sectionId) {
	if(document.getElementById(seat).className == 'selected') {
		var strSeats = document.getElementById("seats"+sectionId).value;
	    // create an array from the currently-selected seats
		var arrSeats = strSeats.split(",");
		// determine seat position in array
		var i = 0;
		while(arrSeats[i] != seat){i++;}
		// remove seat from array
		arrSeats.splice(i, 1);
		// convert array back to list and update the hidden field
		document.getElementById("seats"+sectionId).value = arrSeats.join(",");
		// return cell to original class
		if(arrSeatClass[seat]==null){
			arrSeatClass[seat]="available";
		}
		document.getElementById(seat).className=arrSeatClass[seat];
		addToSelected(-1);
	}
}


function togglePromoSeat(seat, sectionId){
    if(!document.getElementById('seat_' + sectionId + '_' + seat))
        return;
	if(document.getElementById('seat_' + sectionId + '_' + seat).className == 'selected') {
		deselectPromoSeat(seat,sectionId)
	} else {
		selectPromoSeat(seat,sectionId);
	}
}



// begin select seat
function selectPromoSeat(seat,sectionId) {
	var strSeats = document.getElementById("seats"+sectionId).value;
    // create an array from the currently-selected seats
	var arrSeats = strSeats.split(",");
	// if not already present, add seat to array
		var i = 0;
		var seatFound = false;
		while(i<=arrSeats.length){
			if(arrSeats[i]==seat) {
				seatFound=true;
			}
			i++;
		}
		if(!seatFound) {
			arrSeats.push(seat);
		}
	// set original seat class in array
	if(document.getElementById('seat_' + sectionId + '_' + seat).className != 'selected') {
		arrSeatClass[seat] = document.getElementById('seat_' + sectionId + '_' + seat).className;
	}
	// set seat class to selected
	document.getElementById('seat_' + sectionId + '_' + seat).className = 'selected';
	// convert array back to list and update the hidden field
	document.getElementById("seats"+sectionId).value = arrSeats.join(",");
}
// end select seat

// begin deselect seat
function deselectPromoSeat(seat,sectionId) {
	var strSeats = document.getElementById("seats"+sectionId).value;
    // create an array from the currently-selected seats
	var arrSeats = strSeats.split(",");
	// determine seat position in array
	var i = 0;
	while(arrSeats[i] != seat){i++;}
	// remove seat from array
	arrSeats.splice(i, 1);
	// convert array back to list and update the hidden field
	document.getElementById("seats"+sectionId).value = arrSeats.join(",");
	// return cell to original class
	document.getElementById('seat_' + sectionId + '_' + seat).className=arrSeatClass[seat];
}

// end deselect seat

function selectMultiplePromoSeats(lstSeats,sectionId) {
	// create an array from seats
	var arrSeats = lstSeats.split(",");
	// loop across array and select each
	var i = 0;
	while(i<arrSeats.length){
		togglePromoSeat(arrSeats[i],sectionId);
		i++;
	}

}

//begin seating chart select row
function selectMultipleSeats(lstSeats,sectionId) {
	// create an array from seats
	var arrSeats = lstSeats.split(",");
	// loop across array and select each
	var i = 0;
	while(i<arrSeats.length){
		selectSeat(arrSeats[i],sectionId,true);
		i++;
	}
   
}
// end seating chart select/deselect row
// begin seating chart selection/deselection functions


function preSelectSeats() {
	var moreSections = true;
	var thisSection = 1;
	
	while(moreSections) {
		
		var thisSectionSeatsSelected = document.getElementById('seats' + thisSection).value;
		
		var arrSeats = thisSectionSeatsSelected.split(",");
		
		for (i=0; i<arrSeats.length; ++i) {
		  toggleSeat(arrSeats[i],thisSection);
		} 
		
		thisSection++;
		if(!document.getElementById('seats' + thisSection)) {
			moreSections = false;
		}
	
	}
	
}

function preSelectPromoSeats(lstSections) {
	
	var arrSections = lstSections.split(",");	
	
	for(j=0; j<arrSections.length; ++j) {	
	
		var thisSection=arrSections[j];
		
		var thisSectionSeatsSelected = document.getElementById('seats' + thisSection).value;

		var arrSeats = thisSectionSeatsSelected.split(",");

		for (i=0; i<arrSeats.length; ++i) {
		    togglePromoSeat(arrSeats[i],thisSection);
		}

	}

}


//end seating chart select/deselct row

function getSeats() {
	alert(document.getElementById('seats').value);
}

//begin toggle all check boxes
	function toggleOne()
	{
		if(this.checked) 
			list.CheckBoxes.NumberChecked++;
		else 
			list.CheckBoxes.NumberChecked--;
		list.selectAll.checked = (list.CheckBoxes.NumberChecked == list.CheckBoxes.length) ? true : false;
	};
	function toggleAll()
	{
		var aCheckBoxes = list.CheckBoxes;
		var bChecked = list.selectAll.checked;
	
		var aRows = list.tBodies[0].rows;
		var nRows = aRows.length-1;
		
		if(bChecked)
			for(var i=nRows;i>=0;i--)
				aCheckBoxes[i].checked = bChecked;
		else
			for(var i=nRows;i>=0;i--)
				aCheckBoxes[i].checked = bChecked;

		list.CheckBoxes.NumberChecked = (bChecked) ? list.CheckBoxes.length : 0;
	};
	
	function listInit(checkboxName)
	{
		list = document.getElementById("checkboxList");
		if(list)
		{
			list.selectAll = document.getElementById("selectAll");
			list.selectAll.onfiltered= toggleAll;		

			var aCheckBoxes = document.getElementsByName(checkboxName);
			var aRows = list.tBodies[0].rows;
			var nRows = aRows.length-1;
			
			for (var i = nRows; i >= 0; i--) {
				aCheckBoxes[i].onfiltered= toggleOne;
			}
			
			list.CheckBoxes = aCheckBoxes;
			list.CheckBoxes.NumberChecked = 0;
			//alert(nRows);					
		}
		else return false;
	};
//End

	function agreeSubmitOrder() {
		var agreeEl = document.getElementById("agree");
	    if (agreeEl.checked) {
	        document.getElementById('theSubmit').disabled=false;
	    	document.getElementById('theSubmit').className='submit';
	    } else {
	        document.getElementById('theSubmit').disabled=true;
	    	document.getElementById('theSubmit').className='disabled';
	    }
	    
	};
	
	function performanceListInit()
	{
		list = document.getElementById("checkboxList");
		if(list)
		{
			list.selectAll = document.getElementById("selectAll");
			list.selectAll.onclick = toggleAll;		

			var aCheckBoxes = document.getElementsByName("performanceIds");
			var aRows = list.tBodies[0].rows;
			var nRows = aRows.length-1;
			
			for (var i = nRows; i >= 0; i--) {
				aCheckBoxes[i].onclick = toggleOne;
			}
			
			list.CheckBoxes = aCheckBoxes;
			list.CheckBoxes.NumberChecked = 0;
			//alert(nRows);					
		}
		else return false;
	};
  function findPosX(obj)
  {
    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
        curleft += obj.x;
    return curleft;
  }

  function findPosY(obj)
  {
    var curtop = 0;
    if(obj.offsetParent)
        while(1)
        {
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
  }
  
 function showPageMask() {
	var pageMask=document.getElementById('pageMask');
	if(pageMask==null){
		pageMask=document.createElement("DIV");
		pageMask.setAttribute("id","pageMask");
		document.body.appendChild(pageMask);
	}
	pageMask.style.display='block';
	pageMask.style.height=document.body.scrollHeight+"px";
	pageMask.style.width=document.body.scrollWidth+"px";
	
 }	
 
 function hidePageMask() {
	 $("#pageMask").hide();
 }
 
 function setOnclickEventOfPageMask(jsFunction){
	var pageMask=document.getElementById('pageMask');
	if(pageMask){
		pageMask.onclick=jsFunction;
	}
 }

 function helpIcon(helpText) {
   var uniqueID='helpTip' + Math.floor(Math.random()*9999999);
   document.write('<div id="' + uniqueID + '" class="toolTipLong">' + helpText + '</div>');
   document.write('<img src="images/iconHelp.gif" width="16" height="16" align="absmiddle" onMouseover="popUp(event,\'' + uniqueID + '\')"' + ' onMouseout="popUp(event,\'' + uniqueID + '\')"' + '>');
}
function printIframe(ptarget){
	ptarget.focus();
	ptarget.print();
}

/**
 * param excludingContainer:
 * param display: if true then display combobox, false hide them.
 */
function showAllCombobox(excludingContainer, display){
	var excludingObjs=excludingContainer.getElementsByTagName("select");
	var cbs=document.getElementsByTagName("select");

	outer: 
	for(var i=0;i<cbs.length;i++){		
		for(var j=0;j<excludingObjs.length;j++){
			if(excludingObjs[j]==cbs[i]){
				continue outer;
			}
		}
		var ctrl=cbs[i];
		ctrl.style.visibility=display?"":"hidden";
	}
}

function toggleAllCombobox(excludingContainer){
	var excludingObjs=excludingContainer.getElementsByTagName("select");
	var cbs=document.getElementsByTagName("select");

	outer: 
	for(var i=0;i<cbs.length;i++){		
		for(var j=0;j<excludingObjs.length;j++){
			if(excludingObjs[j]==cbs[i]){
				continue outer;
			}
		}
		var ctrl=cbs[i];
		if(ctrl.style.visibility=="hidden"){
			ctrl.style.visibility="";
		}else{
			ctrl.style.visibility="hidden";
		}
	}
}

function getFirstField(containerObj){
	var elements=containerObj.getElementsByTagName('*');
	for(var i=0;i<elements.length;i++){
		var element=elements[i];
		var t=element.tagName.toLowerCase();
		if((t=='input' || t=='select' || t=='textarea')
			&& element.type != 'hidden' && !element.disabled){
			return element;
		}
	}
	return null;
}
function focusOnFirstField(containerObj){
	var firstField=getFirstField(containerObj);
	if(firstField!=null){
		firstField.focus();
	}
}

/**
 * Show dialog.
 * dialogId: dialog object's id.
 * lazyLoadingObjId: object ID need to be lazy loaded.
 * url: the src attribute of lazyLoadingObjId object 
 * beforeCloseFunc: JS function object called before close dialog.
 * keepOriginalSize: if true make thePage's size as large as possible, otherwise keep original size.
 * disableDefaultClose: if diable default closing dialog funtinality.
 */
function showDialog(dialogId, lazyLoadingObjId, url, beforeCloseFunc, keepOriginalSize, html, disableDefaultClose, afterCloseFunc){
	var loadIframe=false;
	if(lazyLoadingObjId!=null){
		var lazyLoadingObj=$id(lazyLoadingObjId);
		if(url!=null){
			if(lazyLoadingObj.src==""){
				lazyLoadingObj.src=url;
				loadIframe=true;
			}
		}
		if(html!=null){
			lazyLoadingObj.innerHTML=html.content;
		}
	}
	var dialog=$id(dialogId);
	showPageMask();
	dialog.beforeCloseFunc=beforeCloseFunc;	
	if(disableDefaultClose==null || disableDefaultClose==false){
		setOnclickEventOfPageMask(function(){hideDialog(dialogId);});
	}
	dialog.afterCloseFunc=afterCloseFunc;

	var width=document.body.clientWidth;
	var height=document.body.clientHeight;
	var scrollLeft= document.documentElement.scrollLeft || document.body.scrollLeft;
	var scrollTop= document.documentElement.scrollTop || document.body.scrollTop;

	if(keepOriginalSize){
		dialog.style.left=(scrollLeft+(width-dialog.offsetWidth)/2)+"px";
	}else{
		var widthRatio=0.9;
		var heightRatio=0.9;

		if(html!=null && html.width!=null){
			dialog.style.width=html.width+"px";
			dialog.style.left=(scrollLeft+(width-dialog.offsetWidth)/2)+"px"
		}else{		
			dialog.style.width=(widthRatio*width)+"px";
			dialog.style.left=(scrollLeft+(1-widthRatio)*width/2)+"px";
		}
		if(html!=null && html.height!=null){
			dialog.style.height=html.height+"px";
		}else{		
			dialog.style.height=(heightRatio*height)+"px";
		}
	}
	dialog.style.top=(scrollTop+10)+"px";

	dialog.style.position='absolute';
	dialog.style.zIndex="9999";
	dialog.style.visibility='visible';
	//
	if(loadIframe){
		$(lazyLoadingObj).height($(lazyLoadingObj).parent().height());
	}

	showAllCombobox(dialog, false);

	focusOnFirstField($id(dialogId));
}

function hideDialog(dialogId){
	var dialog=$id(dialogId);

	if(dialog.beforeCloseFunc!=null && dialog.beforeCloseFunc()==false){
		return;
	}

	hidePageMask();

	dialog.style.zIndex=-1;
	dialog.style.visibility='hidden';

	showAllCombobox(dialog, true);
	
	if(dialog.afterCloseFunc!=null){
		dialog.afterCloseFunc();
	}
}

function isEmptyString(str){
	return str==null || str=="";
}

var TEXT_NODE_TYPE=3;

/* Switch Html Blocks. It can be used for (show and enable) or (hide and disable) one block from blocks.
 * objs: to be switched html objects.
 * inOn: if true then remove style class named disabledClassName; otherwise assign it;
 * disabledClassName: style class for disabled blocks.
 */
function switchClassOfBlocks(objs, isOn, disabledClassName){
	for(var i=0;i<objs.length;i++){

		var obj=objs[i];
		var childNodes=obj.childNodes;
		var activeNodes=getActiveNodesRecursively(obj);

		obj=$(obj);
		if(isOn){
			//Use this manner rather than obj.addClassName() for IE compatibility
			obj.removeClass(disabledClassName);
			for(var j=0;j<activeNodes.length;j++){
				activeNodes[j].disabled=false;
				var node=$(activeNodes[j]);
				node.removeClass(disabledClassName);
			}
		}else{
			obj.addClass(disabledClassName);
			for(var j=0;j<activeNodes.length;j++){
				activeNodes[j].disabled=true;
				var node=$(activeNodes[j]);
				node.addClass(disabledClassName);
			}
		}
	}
}

function getActiveNodesRecursively(node){
	var result=new Array();
	if(node.nodeType!=TEXT_NODE_TYPE && node.style.display!="none"){
		result[result.length]=node;
		if(node.childNodes!=null){
			for(var i=0;i<node.childNodes.length;i++){
				var childNode=node.childNodes[i];
				result=result.concat(getActiveNodesRecursively(childNode));
			}
		}
	}
	return result;
}
function $id(id){
	return document.getElementById(id);
}

function submitByTempForm(url,nameValueObj, target){
	var form=document.createElement("FORM");
	form.method="post";
	form.action=url;
	if(target!=null){
		form.target=target;
	}
	form.style.display="none";
	document.body.appendChild(form);

	if(nameValueObj!=null){
		for(var name in nameValueObj){
			var hiddenInput=document.createElement("INPUT");
			hiddenInput.type="hidden";
			hiddenInput.name=name;
			hiddenInput.value=nameValueObj[name];
			form.appendChild(hiddenInput);
		}
	}

	form.submit();
}


function copyAllAttributes(src,dest){
	for(var j=0;j<src.attributes.length;j++){
		var attrName=src.attributes[j].nodeName;
		var attrValue=src.attributes[j].nodeValue;
		dest.setAttribute(attrName,attrValue);
	}
}

function copyAttributes(src,dest,properties,isPropertyWhiteList){
	for(var j=0;j<src.attributes.length;j++){
		var attrName=src.attributes[j].nodeName;
		var attrValue=src.attributes[j].nodeValue;
		if(containInArray(properties,attrName) == isPropertyWhiteList){
			
			dest.setAttribute(attrName,attrValue);
		}
	}
}
function copyTbody(srcTbody,destTbody){
	
	var trs=srcTbody.rows;
	for(var i=0;i<trs.length;i++){
		var tr=trs[i];
		var destTr=document.createElement('tr');
		copyAllAttributes(tr,destTr);

		for(var j=0;j<tr.cells.length;j++){
			var td=tr.cells[j];
			var destTd=document.createElement('td');
			copyAllAttributes(td,destTd);

			destTd.innerHTML=td.innerHTML;
			destTr.appendChild(destTd);
		}
		destTbody.appendChild(destTr);
	}
}

function stripCharsForNumber(control){
	var result=control.value;
	if(result!=null){
		var toRemoveChars=['$',',',' '];
		for(var i=0;i<toRemoveChars.length;i++){
			result=result.replace(toRemoveChars[i],"");
		}
	}
	control.value=result;
}

function checkChildren(checkbox,callBackFunc){
	var childObjs=$('div.tree_children input',checkbox.parentNode.parentNode);
	childObjs.attr('checked',checkbox.checked);
	childObjs.each(function(){
		if(callBackFunc!=null){
			callBackFunc(this);
		}
	});
	
}

function setParentStatus(checkbox){
	var parentContainer=checkbox.parentNode.parentNode.parentNode.parentNode;
	
	if(parentContainer.className=='tree_container'){
		var allChildrenChecked=true;
		var siblings=$('div.tree_children > div.tree_container > div.tree_node > input',parentContainer);
		for(var i=0;i<siblings.length;i++){
			if(siblings[i].checked==false){
				allChildrenChecked=false;
				break;
			}
//			alert(siblings[i].id+":"+siblings[i].checked);
		}

		var parent=$('div.tree_node > input',parentContainer).get(0);
		//alert("parentId:"+parent.id+" all:"+allChildrenChecked);
		parent.checked=allChildrenChecked;

		//alert('parent:'+allChildrenChecked);
		//Recursive invocation
		setParentStatus(parent);
	}
}

function onClickOfCheckBoxTree(checkbox, callBackFunc){
	checkChildren(checkbox,callBackFunc);
	setParentStatus(checkbox);
}

function escapeWithHtmlEntity(str){
	if(str==null){
		return str;
	}

	str = str.replace(/&/g, '&amp;');
	str = str.replace(/\"/g, '&quot;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	return str;
}
function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}
$(document).ready(function(){
	//set checkbox and radio
	$(':checkbox').addClass("checkRadio");
	$(':radio').addClass("checkRadio");
});


/* start of myValidation.js */

/**
 * Validation Utility.
 * Note: JQuery is required.
 */

/**
 * param rules: a array of rule difinition map. For example:[{"name":"myPropertyName","label":"myPropertyLabel":"validators":[{"name":"required"}]}]
 */
function testRules(rules,containerObj){
	var result=true;
	outer:for(var i=0;i<rules.length;i++){
		var rule=rules[i];
		for(var j=0;j<rule['validators'].length;j++){
			var validatorDef=rule['validators'][j];
			var validatorName=validatorDef['name'];
			var fieldDef=getObjectWithProperties(rule,['name','label','message']);

			if(validatorName=='required'){
				result=testRequiredWithDef(fieldDef,validatorDef,containerObj);
			}else if(validatorName=='maxLength'){
				result=testMaxLenWithDef(fieldDef,validatorDef,containerObj);
			}else if(validatorName=='integer'){
				result=testIntegerWithDef(fieldDef,validatorDef,containerObj);
			}else if(validatorName=='float'){
				result=testFloatWithDef(fieldDef,validatorDef,containerObj);
			}else if(validatorName=='oneNumberNotLessThanOther'){
				result=testOneNumberNotLessThanOtherWithDef(fieldDef,validatorDef,containerObj);
			}else if(validatorName=='oneDateNotLessThanOther'){
				result=testOneDateNotLessThanOtherWithDef(fieldDef,validatorDef,containerObj);
			}else if(validatorName=='date'){
				result=testDateWithDef(fieldDef,validatorDef,containerObj);
			}else{
				alert('cannot find validator with name \"'+validatorName+'\"');
			}
			if(!result){
				break outer;
			}
		}
	}
	return result;
}

function getObjectWithProperties(srcObj, propertyNames){
	var result=new Object();
	if(propertyNames!=null){
		for(var i=0;i<propertyNames.length;i++){
			result[propertyNames[i]]=srcObj[propertyNames[i]];
		}
	}
	return result;
}

function testRequiredWithDef(fieldDef, validatorDef, containerObj){
	var value=getControlValue(fieldDef['name'],containerObj);
	if(!testRequired(value)){
		var message=fieldDef['message'];

		if(message==null){
			message="\""+getLabel(fieldDef)+"\" is required.";
		}
		alert(message);
		return false;
	}

	return true;
}
function testMaxLenWithDef(fieldDef, validatorDef, containerObj){
	var value=getControlValue(fieldDef['name'],containerObj);
	if(!testMaxLength(value,validatorDef['maxLength'])){
		var message=fieldDef['message'];
		if(message==null){
			message="\""+getLabel(fieldDef)+"\" cannot be longer than "+validatorDef['maxLength']+" character(s).";
		}
		alert(message);
		return false;
	}
	return true;
}
function testIntegerWithDef(fieldDef, validatorDef, containerObj){
	var value=getControlValue(fieldDef['name'],containerObj);
	if(!testInteger(value)){
		var message=fieldDef['message'];
		if(message==null){
			message="\""+getLabel(fieldDef)+"\" should be a (integer) number.";
		}
		alert(message);
		return false;
	}
	return true;
}
function testFloatWithDef(fieldDef, validatorDef, containerObj){
	var value=getControlValue(fieldDef['name'],containerObj);
	if(!testFloat(value)){
		var message=fieldDef['message'];
		if(message==null){
			message="\""+getLabel(fieldDef)+"\" should be a (float) number.";
		}
		alert(message);
		return false;
	}
	return true;
}
function testOneNumberNotLessThanOtherWithDef(fieldDef, validatorDef, containerObj){
	var values=getControlValueArray(fieldDef['name'],containerObj);
	if(!testOneNumberNotLessThanOther(values)){
		var message=fieldDef['message'];
		if(message==null){
			var labels=getLabel(fieldDef);
			message="\""+labels[1]+"\" should be greater than or equal to \""+labels[0]+"\".";
		}
		alert(message);
		return false;
	}
	return true;
}
function testOneDateNotLessThanOtherWithDef(fieldDef, validatorDef, containerObj){
	var values=getControlValueArray(fieldDef['name'],containerObj);
	if(values && values.length>=2 && !testOneDateNotLessThanOther(values)){
		var message=fieldDef['message'];
		if(message==null){
			var labels=getLabel(fieldDef);
			message="\""+labels[1]+"\" should be greater than or equal to \""+labels[0]+"\".";
		}
		alert(message);
		return false;
	}
	return true;
}
function testDateWithDef(fieldDef, validatorDef, containerObj){
	var value=getControlValue(fieldDef['name'],containerObj);
	if(!testDate(value)){
		var message=fieldDef['message'];
		if(message==null){
			message="\""+getLabel(fieldDef)+"\" is not a valid date.";
		}
		alert(message);
		return false;
	}
	return true;
}

function getLabel(fieldDef){
	if(fieldDef['label']!=null){
		return fieldDef['label'];
	}else{
		return fieldDef['name'];
	}
}


function getControlValue(controlName, containerObj){
	
	var controls=$('*[name='+controlName+']',containerObj);

	var result=null;
	for(var i=0;i<controls.length;i++){
		var ctl=controls[i];
	
		if(ctl.tagName!=null && ctl.tagName.toLowerCase()=='input' && ctl.type!=null && (ctl.type.toLowerCase()=='radio' || ctl.type.toLowerCase()=='checkbox')){
			if(ctl.checked==true){
				result=ctl.value;
				break;
			}
		}else{
			result=ctl.value;
			break;
		}
	}
	
	return result;
}

function getControlValueArray(controlNames, containerObj){
	var result=new Array();
	for(var i=0;i<controlNames.length;i++){	
		result[i]=getControlValue(controlNames[i], containerObj);
	}
	
	return result;
}


function testRequired(value){
	if(value==null || value==''){
		return false;
	}
	return true;
}
function testMaxLength(value, maxLen){
	if(value!=null && typeof value=='string' && value.length>maxLen){
		return false;
	}
	return true;
}
function testInteger(value){
	if(value==null || value.length==0){
		return true;
	}

	if(!__isAllDigits(value)){
		return false;
	}else{
		var iValue = parseInt(value);
        if (isNaN(iValue) || !(iValue >= -2147483648 && iValue <= 2147483647)){
			return false;
		}
	}
	return true;
}

/* Mainly copied from Common Validator*/
function testFloat(value){
	var bValid = true;
	if (value!=null && value.length > 0) {
		// remove '.' before checking digits
		var tempArray = value.split('.');
		//Strip off leading '0'
		var zeroIndex = 0;
		var joinedString= tempArray.join('');
		while (joinedString.charAt(zeroIndex) == '0') {
			zeroIndex++;
		}
		var noZeroString = joinedString.substring(zeroIndex,joinedString.length);

		if (!__isAllDigits(noZeroString)) {
			bValid = false;
		} else {
			var iValue = parseFloat(value);
			if (isNaN(iValue)) {
				bValid = false;
			}
		}
	}
	return bValid;
}

function testOneNumberNotLessThanOther(values){
	if(values==null || values.length<2 || values[0]==null || values[1]==null){
		return true;
	}

	var fValue0 = parseFloat(values[0]);
	var fValue1 = parseFloat(values[1]);
	if(isNaN(fValue0) || isNaN(fValue1)){
		return true;
	}

	return fValue0 <= fValue1;
}
function testOneDateNotLessThanOther(values){
	if(values==null || values.length<2 || values[0]==null || values[1]==null || values[0]=="" || values[1]==""){
		return true;
	}
	if(testDate(values[0]) && testDate(values[1])){
		var arr1=values[0].split("/");
		var arr2=values[1].split("/");
		var d1=new Date(arr1[2],arr1[0],arr1[1],0,0,0,0);
		var d2=new Date(arr2[2],arr2[0],arr2[1],0,0,0,0);
		return d1.getTime() <= d2.getTime();
	}else{
		return false;
	}
}

/* Mainly copied from Common Validator*/
function testDate(value) {
	var bValid=true;
	
	if(value==null || value==""){
		return bValid;
	}

	var datePattern = 'MM/dd/yyyy';

	var MONTH = "MM";
	var DAY = "dd";
	var YEAR = "yyyy";

	var orderMonth = datePattern.indexOf(MONTH);
	var orderDay = datePattern.indexOf(DAY);
	var orderYear = datePattern.indexOf(YEAR);

	if ((orderDay < orderYear && orderDay > orderMonth)) {
		var iDelim1 = orderMonth + MONTH.length;
		var iDelim2 = orderDay + DAY.length;
		var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
		var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
		if (iDelim1 == orderDay && iDelim2 == orderYear) {
			dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
		} else if (iDelim1 == orderDay) {
			dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2
					+ "](\\d{4})$");
		} else if (iDelim2 == orderYear) {
			dateRegexp = new RegExp("^(\\d{2})[" + delim1
					+ "](\\d{2})(\\d{4})$");
		} else {
			dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})["
					+ delim2 + "](\\d{4})$");
		}
		var matched = dateRegexp.exec(value);
		if (matched != null) {
			if (!__isValidDate(matched[2], matched[1], matched[3])) {
				bValid = false;
			}
		} else {
			bValid = false;
		}
	} else if ((orderMonth < orderYear && orderMonth > orderDay)) {
		var iDelim1 = orderDay + DAY.length;
		var iDelim2 = orderMonth + MONTH.length;
		var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
		var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
		if (iDelim1 == orderMonth && iDelim2 == orderYear) {
			dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
		} else if (iDelim1 == orderMonth) {
			dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2
					+ "](\\d{4})$");
		} else if (iDelim2 == orderYear) {
			dateRegexp = new RegExp("^(\\d{2})[" + delim1
					+ "](\\d{2})(\\d{4})$");
		} else {
			dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})["
					+ delim2 + "](\\d{4})$");
		}
		var matched = dateRegexp.exec(value);
		if (matched != null) {
			if (!__isValidDate(matched[1], matched[2], matched[3])) {
				bValid = false;
			}
		} else {
			bValid = false;
		}
	} else if ((orderMonth > orderYear && orderMonth < orderDay)) {
		var iDelim1 = orderYear + YEAR.length;
		var iDelim2 = orderMonth + MONTH.length;
		var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
		var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
		if (iDelim1 == orderMonth && iDelim2 == orderDay) {
			dateRegexp = new RegExp("^(\\d{4})(\\d{2})(\\d{2})$");
		} else if (iDelim1 == orderMonth) {
			dateRegexp = new RegExp("^(\\d{4})(\\d{2})[" + delim2
					+ "](\\d{2})$");
		} else if (iDelim2 == orderDay) {
			dateRegexp = new RegExp("^(\\d{4})[" + delim1
					+ "](\\d{2})(\\d{2})$");
		} else {
			dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})["
					+ delim2 + "](\\d{2})$");
		}
		var matched = dateRegexp.exec(value);
		if (matched != null) {
			if (!__isValidDate(matched[3], matched[2], matched[1])) {
				bValid = false;
			}
		} else {
			bValid = false;
		}
	} else {
		bValid = false;
	}
	return bValid;
}


/* Copied from Common Validator*/
function __isAllDigits(argvalue) {
	argvalue = argvalue.toString();
	var validChars = "0123456789";
	var startFrom = 0;
	if (argvalue.substring(0, 2) == "0x") {
	   validChars = "0123456789abcdefABCDEF";
	   startFrom = 2;
	} else if (argvalue.charAt(0) == "0") {
	   validChars = "01234567";
	   startFrom = 1;
	} else if (argvalue.charAt(0) == "-") {
		startFrom = 1;
	}

	for (var n = startFrom; n < argvalue.length; n++) {
		if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) return false;
	}
	return true;
}
/* Copied from Common Validator*/
function __isValidDate(day, month, year) {
	if (month < 1 || month > 12) {
		return false;
	}
	if (day < 1 || day > 31) {
		return false;
	}
	if ((month == 4 || month == 6 || month == 9 || month == 11) &&
		(day == 31)) {
		return false;
	}
	if (month == 2) {
		var leap = (year % 4 == 0 &&
		   (year % 100 != 0 || year % 400 == 0));
		if (day>29 || (day == 29 && !leap)) {
			return false;
		}
	}
	return true;
}

/* end of myValidation.js */

/* start of validator_utils.js */

function get_mins(hour_name,pm_name,min_name){
	var hour=parseInt($id(hour_name).value,10);
	if($id(pm_name).checked){
		if(hour!=12){
			hour+=12;
		}
	}else if(hour==12){
		hour=0;
	}
	
	var mins=hour*60+parseInt($id(min_name).value,10);
	return mins;
}
function check_numbers(ctrls,get_ctrl_desc){
	for(var i=0;i<ctrls.length;i++){
		var ctrl_name=ctrls[i];
		if($id(ctrl_name)!=null && $id(ctrl_name).value!=null && $id(ctrl_name).value!=""){
			if($id(ctrl_name).value.match(/[^\d]/)){
				var desc=ctrl_name;
				if(get_ctrl_desc!=null){
					desc=get_ctrl_desc(ctrl_name);
				}				
				alert( desc+" must be number.");
				$id(ctrl_name).focus();
				return false;
			}
		}
	}
	return true;
}
function check_floats(ctrls,ctrl_names){
	for(var i=0;i<ctrls.length;i++){
		var ctrl_name=ctrls[i];
		if($id(ctrl_name)!=null && $id(ctrl_name).value!=null && $id(ctrl_name).value!=""){
			if( !isFloat($id(ctrl_name).value)){
				var desc=ctrl_name;
				if(ctrl_names!=null){
					desc=ctrl_names[i];
				}				
				alert( desc+" must be a numeric value.");
				$id(ctrl_name).focus();
				return false;
			}
		}
	}
	return true;
}
function check_dates(ctrls,ctrl_names){
	for(var i=0;i<ctrls.length;i++){
		var ctrl_name=ctrls[i];
		if($id(ctrl_name)!=null && $id(ctrl_name).value!=null && $id(ctrl_name).value!=""){
			if( !checkDateFormat($id(ctrl_name).value)){
				var desc=ctrl_name;
				if(ctrl_names!=null){
					desc=ctrl_names[i];
				}				
				alert("please check "+ desc+" date format");
				$id(ctrl_name).focus();
				return false;
			}
		}
	}
	return true;
}
function check_empty(ctrls,ctrl_names){
	for(var i=0;i<ctrls.length;i++){
		var ctrl_name=ctrls[i];
		if($id(ctrl_name).value==null || $id(ctrl_name).value==""){
			var desc=ctrl_name;
			if(ctrl_names!=null){
				desc=ctrl_names[i];
			}				
			alert(desc+" is a required field.");
			if($id(ctrl_name)!=null){
				$id(ctrl_name).focus();
			}
			return false;
		}
	}
	return true;
}
function isFloat( str ){
	try{
		var f=parseFloat(str);
		return ! isNaN(f);
	}catch(e){
		return false;
	}
}
function check_nulls(ctrls,get_ctrl_desc){
	for(var i=0;i<ctrls.length;i++){
		var ctrl_name=ctrls[i];
		if($id(ctrl_name).value==null || $id(ctrl_name).value==""){
			var desc=ctrl_name;
			if(get_ctrl_desc!=null){
				desc=get_ctrl_desc(ctrl_name);
			}				
			alert(desc+" can't be empty.");
			$id(ctrl_name).focus();
			return false;
		}
	}
	return true;
}
function check_range(ctrl,min,max,title){
	try{
		var v=parseInt(ctrl.value,10);
		if(v<min || v>max){
			alert(title+" is not in range "+min+" through "+max);
			ctrl.focus();
			return false;
		}
	}catch(ignore){
	}
	return true;
}
function is_ctrl_checked(ctrlName){
	if(ctrlName!=null && ctrlName!=""){
		if($id(ctrlName)!=null){
			return $id(ctrlName).checked;
		}
	}
	return false;
}

function isChecked(ctrlName){
	if(ctrlName!=null && ctrlName!=""){
		if($id(ctrlName)!=null){
			return $id(ctrlName).checked;
		}
	}
	return false;
}
function isPositiveNumber( str ){
	var regu = /^[0-9]{1,}$/;
	return regu.test(str);
}
function checkRequired(fieldId,fieldDesc){
	if($("#"+fieldId).val()==""){
		alert(fieldDesc+" is required.");
		$("#"+fieldId).focus();
		return false;
	}
	return true;
}
function checkDateFormat(str){
	//just MM/dd/YYYY
	var  reg  =  /^(\d{1,2})\/(\d{1,2})\/(\d{1,4})$/;    
    var  r  =  str.match(reg);    
	if(r==null)return false;
	return true;
}

/* end of validator_utils.js */

/* start of tooltip.js */

var close_time=-1,check_time=200;
var	close_tooltip=true;

function hiddenInfo(id){
if(close_time>0 && close_tooltip){
	close_time-=check_time;	
	if(close_time<=0){
		//timeout
		var toolId="tooltip_";//+id;
		var el =document.getElementById(toolId);
		if(el!=null){
			el.style.display="none";
		}
	}
}	
}

//window.setInterval("hiddenInfo()",check_time);
var tooltip_div_id="tooltip";

function closeTooltip(){
	close_time=check_time;
	close_tooltip=true;
}

function enterTooltip(){
	close_tooltip=false;
}

function leaveTooltip(){
	close_tooltip=true;
}

function showTooltips(id,x,y,msg){
	var toolId="tooltip_";
	var el =document.getElementById(toolId);// document.createElement('DIV');
	if(el==null){
		el = document.createElement('DIV');
		el.setAttribute("id",toolId);
		//el.onmouseover=enterTooltip;
		//el.onmouseout=leaveTooltip;
		el.style.cssText="display:none;font-family:Verdana;font-size:13px;border:1px solid rgb(178, 219, 251);background-color:rgb(219, 239, 255);padding:1px;position:absolute; z-index:10000;width:200px;height:50px;text-align:left; vertical-align:top";			
		document.body.appendChild(el);
	}
	el.innerHTML=msg;
	el.style.display="block";
	el.style.top =y;//evt.screenY;
	el.style.left =x;//evt.screenX;
	//alert("x:"+el.style.left+" y:"+el.style.top);
}

var patronOrderHoldInfos=new Array();
function showInfo(evt,id,perfId,clientId,hidden,msg){
	var tooltip_x,tooltip_y;
	//var evt=window.event;
	evt=evt?evt:(window.event?window.event:null);
	tooltip_x=(evt.x ? evt.x+document.body.scrollLeft : evt.pageX);
	tooltip_y=(evt.y ? evt.y+document.body.scrollTop : evt.pageY);
	var ctrl=document.getElementById(id);	
	if(perfId!=null && perfId.value!=null){
		perfId=parseInt(perfId.value);
	}
	
	if(ctrl==null){
		alert("id "+id+" error.");
	}else{
		if(hidden){
			close_tooltip=true;
			close_time=check_time;
			document.getElementById(tooltip_div_id).style.visibility = "hidden";
			document.getElementById(tooltip_div_id).setAttribute("seatId","");
			//popUp(evt,tooltip_div_id);
			//console.debug("hidden:"+document.getElementById(tooltip_div_id).style.visibility);
		}else if(msg!=null && msg!=""){
			//direct msg
			document.getElementById(tooltip_div_id).innerHTML=msg;
			document.getElementById(tooltip_div_id).style.visibility = "hidden";		
			document.getElementById(tooltip_div_id).setAttribute("seatId",ctrl.id);
			popUpTooltip(tooltip_x,tooltip_y,tooltip_div_id);
		}else{
			hideError();
			//force close
			document.getElementById(tooltip_div_id).style.visibility = "hidden";
			document.getElementById(tooltip_div_id).setAttribute("seatId",ctrl.id);
			//console.debug("set seatId:"+ctrl.id);
			
			var info=patronOrderHoldInfos[id];
			if(info!=null && info!="-1"){
				//alert(info);
				showInfoInPage(id,ctrl.className,info,tooltip_x,tooltip_y);
			}else{
				//showLoading(true);	    
				try{
					//start
					//patronOrderHoldInfos[id]="-1";
					if(ctrl.className=="sold" || isPatronHold(ctrl.className)){
						var patronId=-1;
						if(isPatronHold(ctrl.className)){
							patronId=parseInt(ctrl.getAttribute("patronId"));
						}
						setTimeout("queryInfo("+id+",'"+ctrl.className+"',"+perfId+","+clientId+","+patronId+","+tooltip_x+","+tooltip_y+")",1000);
						
						//console.debug("seat:"+id+" perfId:"+perfId+" clientId:"+clientId+" patronId:"+patronId);
				    }else{
				    	//ignore
				    }
				    //showLoading(false);
			    }catch(e){    
				    //console.debug("tooltip:"+e);
				    alertError("connect server error!  "+e);
				    throw e;
			    }
			}
		}
	}
}
function queryInfo(id,className,perfId,clientId,patronId,tooltip_x,tooltip_y){
	var seatId=document.getElementById(tooltip_div_id).getAttribute("seatId");
	if(seatId==id){
		//buffalo.events["onError"]=alertError;    						
	    ajax("ajaxManager.querySeatHoldSoldInfoBy",[id,perfId,clientId,patronId], function (replay){
		    //showLoading(false);
		    if(replay.error){
				alertError("internal server error!  "+replay.message);
		    	return;
		    }else{
			    var t=replay.result;
				patronOrderHoldInfos[id]=t;
				showInfoInPage(id,className,t,tooltip_x,tooltip_y);
			}
	    });
//	}else{
		//debug
//		if(console)
//			console.debug("lost:"+id);
	}
}
function showInfoInPage(id,className,info,x,y){
	var seatId=document.getElementById(tooltip_div_id).getAttribute("seatId");

	//console.debug("seatId:"+seatId+" id:"+ctrl.id+" tooltip:"+document.getElementById(tooltip_div_id)+" vis:"+document.getElementById(tooltip_div_id).style.visibility);
	if(info!=null && seatId==id){
		if(className=="sold"){
			var msg=info.seatName+":"+info.patronName+"<br>Order No:PR"+info.orderId+"<br>(click for detail)";
			document.getElementById(tooltip_div_id).innerHTML=msg;
			document.getElementById(tooltip_div_id).style.visibility = "hidden";
			//popUp(evt,tooltip_div_id);
			popUpTooltip(x,y,tooltip_div_id);
			//console.debug("x:"+evt.pageX+" y:"+evt.pageY+"  tx:"+x+" ty:"+y);
			//showTooltips(ctrl.id,x,y,msg);
		}else if(isPatronHold(className)){
			var msg=info.seatName+": Held for "+info.patronName+"<br>(click to sell)";
			document.getElementById(tooltip_div_id).innerHTML=msg;
			document.getElementById(tooltip_div_id).style.visibility = "hidden";
			popUpTooltip(x,y,tooltip_div_id);
			//popUp(evt,tooltip_div_id);
			//showTooltips(ctrl.id,x,y,msg);
		}
	}
}

function showCart(evt,id,perfId,clientId,hidden,msg){
	var tooltip_x,tooltip_y;
	//var evt=window.event;
	evt=evt?evt:(window.event?window.event:null);
	tooltip_x=(evt.x ? evt.x+document.body.scrollLeft : evt.pageX);
	tooltip_y=(evt.y ? evt.y+document.body.scrollTop : evt.pageY);
	if(perfId!=null && perfId.value!=null){
		perfId=parseInt(perfId.value);
	}
	if(hidden){
		document.getElementById(tooltip_div_id).style.visibility = "visible";
	}else{
		document.getElementById(tooltip_div_id).innerHTML=msg;
		document.getElementById(tooltip_div_id).style.visibility = "hidden";
	}
	popUpTooltip(tooltip_x,tooltip_y,tooltip_div_id);
}

function showTooltipMessage(evt,msg,isClose){
	var tooltip_x,tooltip_y;
	//var evt=window.event;
	evt=evt?evt:(window.event?window.event:null);
	var scrollPos;
	if (typeof window.pageYOffset != 'undefined') {
	   scrollPos = window.pageYOffset;
	}
	else if (typeof document.compatMode != 'undefined' &&
	     document.compatMode != 'BackCompat') {
	   scrollPos = document.documentElement.scrollTop;
	}
	else if (typeof document.body != 'undefined') {
	   scrollPos = document.body.scrollTop;
	} 
	var scrollX;
	if (typeof window.pageXOffset != 'undefined') {
	   scrollX = window.pageXOffset;
	}
	else if (typeof document.compatMode != 'undefined' &&
	     document.compatMode != 'BackCompat') {
	   scrollX = document.documentElement.scrollLeft;
	}
	else if (typeof document.body != 'undefined') {
	   scrollX = document.body.scrollLeft;
	} 
	tooltip_x=(evt.x ? evt.x+scrollX : evt.pageX);
	tooltip_y=(evt.y ? evt.y+scrollPos : evt.pageY);
	document.getElementById(tooltip_div_id).innerHTML=msg;
	if(isClose){
		document.getElementById(tooltip_div_id).style.visibility = "visible";
	}else{
		document.getElementById(tooltip_div_id).style.visibility = "hidden";
	}
	popUpTooltip(tooltip_x,tooltip_y,tooltip_div_id);
}

function popUpTooltip(x,y,oi) {
if (DH) {
	var wp = pw(); 
	ds = fd(oi,1); 
	dm = fd(oi,0); 
	st = ds.visibility; 
	if (dm.offsetWidth) 
		ew = dm.offsetWidth; 
	else if (dm.clip.width) 
		ew = dm.clip.width; 
	if (st == "visible" || st == "show") { 
		ds.visibility = "hidden"; 
	} else  { 
		//if (evt.y || evt.pageY) {
			//if (evt.pageY) {
				tv = y + 20;
				lv = x - (ew/4);
			//} else {
			//	tv = evt.y + 20 + document.body.scrollTop; 
			//	lv = evt.x  - (ew/4) + document.body.scrollLeft;
			//} 
			if (lv < 2) 
				lv = 2; 
			else if (lv + ew > wp) 
				lv -= ew/2;
			if (!an) {
				lv += 'px';tv += 'px';
			}
			ds.left = lv; 
			ds.top = tv;
		//} 
		ds.visibility = "visible";
	}
}
}

//----------------------------------------------------
// Extended Tooltip Javascript
// copyright 9th August 2002, by Stephen Chapman, Felgall Pty Ltd

// permission is granted to use this javascript provided that the below code is not altered

// sorry -- but I had to alter it: David Stanke added the escape for WebTV; it doesn't work on WebTV
if(navigator.appName.indexOf('WebTV')==-1) {
var DH = 0;var an = 0;var al = 0;var ai = 0;if (document.getElementById) {ai = 1; DH = 1;}else {if (document.all) {al = 1; DH = 1;} else { browserVersion = parseInt(navigator.appVersion); if ((navigator.appName.indexOf('Netscape') != -1) && (browserVersion == 4)) {an = 1; DH = 1;}}} function fd(oi,ws) {if (ws == 1) {if (ai) {return (document.getElementById(oi).style);}
else {if (al) {return (document.all[oi].style);} else {if (an) {return (document.layers[oi]);}};}} else {if (ai) {return (document.getElementById(oi));} else {if (al) {return (document.all[oi]);} else {if (an) {return (document.layers[oi]);}};}}} function pw() {if (window.innerWidth != null) return window.innerWidth; if (document.body.clientWidth != null)
return document.body.clientWidth; return (null);} function popUp(evt,oi) {if (DH) {var wp = pw(); ds = fd(oi,1); dm = fd(oi,0); st = ds.visibility; if (dm.offsetWidth) ew = dm.offsetWidth; else if (dm.clip.width) ew = dm.clip.width; if (st == "visible" || st == "show") { ds.visibility = "hidden"; } else  { if (evt.y || evt.pageY) {if (evt.pageY) {tv = evt.pageY + 20;
lv = evt.pageX - (ew/4);} else {tv = evt.y + 20 + document.body.scrollTop; lv = evt.x  - (ew/4) + document.body.scrollLeft;} if (lv < 2) lv = 2; else if (lv + ew > wp) lv -= ew/2;if (!an) {lv += 'px';tv += 'px'};ds.left = lv; ds.top = tv;} ds.visibility = "visible";}}}}

/* end of tooltip.js */

/* start of NumberFormat154.js */
//mredkj.com
function NumberFormat(num, inputDecimal)
{
this.VERSION = 'Number Format v1.5.4';
this.COMMA = ',';
this.PERIOD = '.';
this.DASH = '-'; 
this.LEFT_PAREN = '('; 
this.RIGHT_PAREN = ')'; 
this.LEFT_OUTSIDE = 0; 
this.LEFT_INSIDE = 1;  
this.RIGHT_INSIDE = 2;  
this.RIGHT_OUTSIDE = 3;  
this.LEFT_DASH = 0; 
this.RIGHT_DASH = 1; 
this.PARENTHESIS = 2; 
this.NO_ROUNDING = -1 
this.num;
this.numOriginal;
this.hasSeparators = false;  
this.separatorValue;  
this.inputDecimalValue; 
this.decimalValue;  
this.negativeFormat; 
this.negativeRed; 
this.hasCurrency;  
this.currencyPosition;  
this.currencyValue;  
this.places;
this.roundToPlaces; 
this.truncate; 
this.setNumber = setNumberNF;
this.toUnformatted = toUnformattedNF;
this.setInputDecimal = setInputDecimalNF; 
this.setSeparators = setSeparatorsNF; 
this.setCommas = setCommasNF;
this.setNegativeFormat = setNegativeFormatNF; 
this.setNegativeRed = setNegativeRedNF; 
this.setCurrency = setCurrencyNF;
this.setCurrencyPrefix = setCurrencyPrefixNF;
this.setCurrencyValue = setCurrencyValueNF; 
this.setCurrencyPosition = setCurrencyPositionNF; 
this.setPlaces = setPlacesNF;
this.toFormatted = toFormattedNF;
this.toPercentage = toPercentageNF;
this.getOriginal = getOriginalNF;
this.moveDecimalRight = moveDecimalRightNF;
this.moveDecimalLeft = moveDecimalLeftNF;
this.getRounded = getRoundedNF;
this.preserveZeros = preserveZerosNF;
this.justNumber = justNumberNF;
this.expandExponential = expandExponentialNF;
this.getZeros = getZerosNF;
this.moveDecimalAsString = moveDecimalAsStringNF;
this.moveDecimal = moveDecimalNF;
this.addSeparators = addSeparatorsNF;
if (inputDecimal == null) {
this.setNumber(num, this.PERIOD);
} else {
this.setNumber(num, inputDecimal); 
}
this.setCommas(true);
this.setNegativeFormat(this.LEFT_DASH); 
this.setNegativeRed(false); 
this.setCurrency(false); 
this.setCurrencyPrefix('$');
this.setPlaces(2);
}
function setInputDecimalNF(val)
{
this.inputDecimalValue = val;
}
function setNumberNF(num, inputDecimal)
{
if (inputDecimal != null) {
this.setInputDecimal(inputDecimal); 
}
this.numOriginal = num;
this.num = this.justNumber(num);
}
function toUnformattedNF()
{
return (this.num);
}
function getOriginalNF()
{
return (this.numOriginal);
}
function setNegativeFormatNF(format)
{
this.negativeFormat = format;
}
function setNegativeRedNF(isRed)
{
this.negativeRed = isRed;
}
function setSeparatorsNF(isC, separator, decimal)
{
this.hasSeparators = isC;
if (separator == null) separator = this.COMMA;
if (decimal == null) decimal = this.PERIOD;
if (separator == decimal) {
this.decimalValue = (decimal == this.PERIOD) ? this.COMMA : this.PERIOD;
} else {
this.decimalValue = decimal;
}
this.separatorValue = separator;
}
function setCommasNF(isC)
{
this.setSeparators(isC, this.COMMA, this.PERIOD);
}
function setCurrencyNF(isC)
{
this.hasCurrency = isC;
}
function setCurrencyValueNF(val)
{
this.currencyValue = val;
}
function setCurrencyPrefixNF(cp)
{
this.setCurrencyValue(cp);
this.setCurrencyPosition(this.LEFT_OUTSIDE);
}
function setCurrencyPositionNF(cp)
{
this.currencyPosition = cp
}
function setPlacesNF(p, tr)
{
this.roundToPlaces = !(p == this.NO_ROUNDING); 
this.truncate = (tr != null && tr); 
this.places = (p < 0) ? 0 : p; 
}
function addSeparatorsNF(nStr, inD, outD, sep)
{
nStr += '';
var dpos = nStr.indexOf(inD);
var nStrEnd = '';
if (dpos != -1) {
nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
nStr = nStr.substring(0, dpos);
}
var rgx = /(\d+)(\d{3})/;
while (rgx.test(nStr)) {
nStr = nStr.replace(rgx, '$1' + sep + '$2');
}
return nStr + nStrEnd;
}
function toFormattedNF()
{	
var pos;
var nNum = this.num; 
var nStr;            
var splitString = new Array(2);   
if (this.roundToPlaces) {
nNum = this.getRounded(nNum);
nStr = this.preserveZeros(Math.abs(nNum)); 
} else {
nStr = this.expandExponential(Math.abs(nNum)); 
}
if (this.hasSeparators) {
nStr = this.addSeparators(nStr, this.PERIOD, this.decimalValue, this.separatorValue);
} else {
nStr = nStr.replace(new RegExp('\\' + this.PERIOD), this.decimalValue); 
}
var c0 = '';
var n0 = '';
var c1 = '';
var n1 = '';
var n2 = '';
var c2 = '';
var n3 = '';
var c3 = '';
var negSignL = (this.negativeFormat == this.PARENTHESIS) ? this.LEFT_PAREN : this.DASH;
var negSignR = (this.negativeFormat == this.PARENTHESIS) ? this.RIGHT_PAREN : this.DASH;
if (this.currencyPosition == this.LEFT_OUTSIDE) {
if (nNum < 0) {
if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n1 = negSignL;
if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n2 = negSignR;
}
if (this.hasCurrency) c0 = this.currencyValue;
} else if (this.currencyPosition == this.LEFT_INSIDE) {
if (nNum < 0) {
if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n0 = negSignL;
if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n3 = negSignR;
}
if (this.hasCurrency) c1 = this.currencyValue;
}
else if (this.currencyPosition == this.RIGHT_INSIDE) {
if (nNum < 0) {
if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n0 = negSignL;
if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n3 = negSignR;
}
if (this.hasCurrency) c2 = this.currencyValue;
}
else if (this.currencyPosition == this.RIGHT_OUTSIDE) {
if (nNum < 0) {
if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n1 = negSignL;
if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n2 = negSignR;
}
if (this.hasCurrency) c3 = this.currencyValue;
}
nStr = c0 + n0 + c1 + n1 + nStr + n2 + c2 + n3 + c3;
if (this.negativeRed && nNum < 0) {
nStr = '<font color="red">' + nStr + '</font>';
}
return (nStr);
}
function toPercentageNF()
{
nNum = this.num * 100;
nNum = this.getRounded(nNum);
return nNum + '%';
}
function getZerosNF(places)
{
var extraZ = '';
var i;
for (i=0; i<places; i++) {
extraZ += '0';
}
return extraZ;
}
function expandExponentialNF(origVal)
{
if (isNaN(origVal)) return origVal;
var newVal = parseFloat(origVal) + ''; 
var eLoc = newVal.toLowerCase().indexOf('e');
if (eLoc != -1) {
var plusLoc = newVal.toLowerCase().indexOf('+');
var negLoc = newVal.toLowerCase().indexOf('-', eLoc); 
var justNumber = newVal.substring(0, eLoc);
if (negLoc != -1) {
var places = newVal.substring(negLoc + 1, newVal.length);
justNumber = this.moveDecimalAsString(justNumber, true, parseInt(places));
} else {
if (plusLoc == -1) plusLoc = eLoc;
var places = newVal.substring(plusLoc + 1, newVal.length);
justNumber = this.moveDecimalAsString(justNumber, false, parseInt(places));
}
newVal = justNumber;
}
return newVal;
} 
function moveDecimalRightNF(val, places)
{
var newVal = '';
if (places == null) {
newVal = this.moveDecimal(val, false);
} else {
newVal = this.moveDecimal(val, false, places);
}
return newVal;
}
function moveDecimalLeftNF(val, places)
{
var newVal = '';
if (places == null) {
newVal = this.moveDecimal(val, true);
} else {
newVal = this.moveDecimal(val, true, places);
}
return newVal;
}
function moveDecimalAsStringNF(val, left, places)
{
var spaces = (arguments.length < 3) ? this.places : places;
if (spaces <= 0) return val; 
var newVal = val + '';
var extraZ = this.getZeros(spaces);
var re1 = new RegExp('([0-9.]+)');
if (left) {
newVal = newVal.replace(re1, extraZ + '$1');
var re2 = new RegExp('(-?)([0-9]*)([0-9]{' + spaces + '})(\\.?)');		
newVal = newVal.replace(re2, '$1$2.$3');
} else {
var reArray = re1.exec(newVal); 
if (reArray != null) {
newVal = newVal.substring(0,reArray.index) + reArray[1] + extraZ + newVal.substring(reArray.index + reArray[0].length); 
}
var re2 = new RegExp('(-?)([0-9]*)(\\.?)([0-9]{' + spaces + '})');
newVal = newVal.replace(re2, '$1$2$4.');
}
newVal = newVal.replace(/\.$/, ''); 
return newVal;
}
function moveDecimalNF(val, left, places)
{
var newVal = '';
if (places == null) {
newVal = this.moveDecimalAsString(val, left);
} else {
newVal = this.moveDecimalAsString(val, left, places);
}
return parseFloat(newVal);
}
function getRoundedNF(val)
{
val = this.moveDecimalRight(val);
if (this.truncate) {
val = val >= 0 ? Math.floor(val) : Math.ceil(val); 
} else {
val = Math.round(val);
}
val = this.moveDecimalLeft(val);
return val;
}
function preserveZerosNF(val)
{
var i;
val = this.expandExponential(val);
if (this.places <= 0) return val; 
var decimalPos = val.indexOf('.');
if (decimalPos == -1) {
val += '.';
for (i=0; i<this.places; i++) {
val += '0';
}
} else {
var actualDecimals = (val.length - 1) - decimalPos;
var difference = this.places - actualDecimals;
for (i=0; i<difference; i++) {
val += '0';
}
}
return val;
}
function justNumberNF(val)
{
newVal = val + '';
var isPercentage = false;
if (newVal.indexOf('%') != -1) {
newVal = newVal.replace(/\%/g, '');
isPercentage = true; 
}
var re = new RegExp('[^\\' + this.inputDecimalValue + '\\d\\-\\+\\(\\)eE]', 'g');	
newVal = newVal.replace(re, '');
var tempRe = new RegExp('[' + this.inputDecimalValue + ']', 'g');
var treArray = tempRe.exec(newVal); 
if (treArray != null) {
var tempRight = newVal.substring(treArray.index + treArray[0].length); 
newVal = newVal.substring(0,treArray.index) + this.PERIOD + tempRight.replace(tempRe, ''); 
}
if (newVal.charAt(newVal.length - 1) == this.DASH ) {
newVal = newVal.substring(0, newVal.length - 1);
newVal = '-' + newVal;
}
else if (newVal.charAt(0) == this.LEFT_PAREN
&& newVal.charAt(newVal.length - 1) == this.RIGHT_PAREN) {
newVal = newVal.substring(1, newVal.length - 1);
newVal = '-' + newVal;
}
newVal = parseFloat(newVal);
if (!isFinite(newVal)) {
newVal = 0;
}
if (isPercentage) {
newVal = this.moveDecimalLeft(newVal, 2);
}
return newVal;
}

function isPatronHold(className){
	return className.match("^patronHold") =="patronHold";
}
/* end of NumberFormat154.js */

function checkDateOnlyFromTo(fromDateVar,toDateVar,notcheckFromDate,dateName){
	try{
		if(toDateVar==null || fromDateVar==null || toDateVar.type!='text' || fromDateVar.type!='text'){
			return true;
		}
		var tmp=toDateVar.value;
		tmp=fromDateVar.value;
	}catch(e){
		return true;
	}
	if(toDateVar.value==""){
		return true;
	}
	var fromDateStr=fromDateVar.value;
	var toDateStr=toDateVar.value;
	var result=true;
	var fArr=fromDateStr.split("/");
	var fYear,fMonth,fDay;
	if(fArr.length>0){
		fMonth=fArr[0]-1;
	}
	if(fArr.length>1){
		fDay=fArr[1];
	}
	if(fArr.length>2){
		fYear=fArr[2];
	}
	var fromDate=new Date(fYear,fMonth,fDay,0,0,0);
	
	var tArr=toDateStr.split("/");
	var tYear,tMonth,tDay;
	if(tArr.length>0){
		tMonth=tArr[0]-1;
	}
	if(tArr.length>1){
		tDay=tArr[1];
	}
	if(tArr.length>2){
		tYear=tArr[2];
	}
	var toDate=new Date(tYear,tMonth,tDay,0,0,59);
	
	var now=new Date();
	//less now and form < to
	//alert(now.getTime()+" "+fromDate.getTime()+" "+toDate.getTime()+"\n"
	//	+now.toString()+" "+fromDate.toString()+" "+toDate.toString());
	
	if(!notcheckFromDate){	
		result= fromDate.getTime()<=now.getTime();
		if(!result){
			if(!dateName){
				alert("'From' date must be equal to or less than now.");
		  	}else{
		  		alert(dateName+" 'from' date must be equal to or less than now.");
		  	}
			fromDateVar.focus();
		}
	}
	if(result){
		result=fromDate.getTime()<=toDate.getTime();
		if(!result){
			if(!dateName){
				alert("'To' date must be equal to or later than 'from' date." );
			}else{
				alert(dateName+" 'to' date must be equal to or later than 'from' date." );
			}
			fromDateVar.focus();
		}
	}
	
	return result;
}

function appendHiddenInputToForm(formObj, name, value){
	var hiddenInput=document.createElement("INPUT");
	hiddenInput.type="hidden";
	hiddenInput.name=name;
	hiddenInput.value=value;
	formObj.appendChild(hiddenInput);
}

function generateId(){
	return (""+Math.random()).replace("\.","");
}

function check_empty_with_jquery(ctrls,ctrl_names){
	
	var result=true;
	for(var i=0;i<ctrls.length;i++){
		$.each(ctrls[i], function(){
			var value=this.value;
			if(value==null || value==""){
				var desc=ctrl_names[i];
						
				alert(desc+" is a required field.");

				this.focus();
				
				result=false;
				return false;
			}
		});

		if(!result){
			break;
		}
	}

	return result;
}

function check_blank_with_jquery(ctrls,ctrl_names){
	
	var result=true;
	for(var i=0;i<ctrls.length;i++){
		$.each(ctrls[i], function(){
			var value=this.value;
			if(value==null || jQuery.trim(value).length==0){
				var desc=ctrl_names[i];
						
				alert(desc+" can't be blank.");

				this.focus();
				
				result=false;
				return false;
			}
		});

		if(!result){
			break;
		}
	}

	return result;
}

function check_floats_with_jquery(ctrls,ctrl_names){
	var result=true;
	for(var i=0;i<ctrls.length;i++){
		$.each(ctrls[i], function(){
			var value=this.value;
			if(value!=null && value!=""){
				if( !isFloat(value)){
					var desc=ctrl_names[i];
							
					alert( desc+" must be a numeric value.");
					this.focus();

					result=false;
					return false;
				}
			}
		});
		if(!result){
			break;
		}
	}
	return result;
}
