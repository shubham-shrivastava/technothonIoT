function check(id){
	var tag = document.getElementById(id);
	var cash=100;
	var minimum=200;
	
	if (cash>=minimum)
	window.location.href = tag.getAttribute("href");
	else
	alert("not enough cash");
}