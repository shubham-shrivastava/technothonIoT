function readContent(obj,callback) {
	var data;
	console.log('inside retriveData function');
	 var obj1 = {
    	'_id' : obj.id,
    	'name' : obj.name
    };
	
	var link="https://a93d9840-5777-4d63-89e6-0c3f213c8307-bluemix.cloudant.com/user/"+obj1._id;
	console.log(link);
       $.ajax({
       url: link,
       type: 'GET',
       callback: "?",
       data: null,
       dataType : "jsonp",
       contentType: "application/json",
       crossDomain: true,
       success: callback,/*function(response, status, xhr) {
                     data=response._id;
           			console.log("data: "+data);
                     },*/
       error: function() { console.log('Failed!'); },
       beforeSend: function(xhrObj){ xhrObj.setRequestHeader('Access-Control-Allow-Origin','*');}
       });
}