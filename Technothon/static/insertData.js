function sendContent(obj) {
    	console.log("function called");
     var obj1 = {
    	'_id' : obj.id,
    	'name' : obj.name
    };
     /*  obj.name = $("#name").val();
       obj.age  = $("#age").val(); 
       obj.married = $("#status").val();
       */
       var jsonString= JSON.stringify(obj1);

        console.log(jsonString);
        var jsonObj = JSON.parse(jsonString);
        console.log(jsonObj);
        $.ajax({
            url: 'https://a93d9840-5777-4d63-89e6-0c3f213c8307-bluemix.cloudant.com/user',
            type: 'POST',
            data: jsonString,
            crossDomain: true,
            datatype: 'json',
            contentType: 'application/json',
            success: function (responseData, textStatus, errorThrown) {
                console.log("JSON uploaded");
            },
            error: function(responseData, textStatus, errorThrown) {
                     console.log("JSON upload failed");
                }
        });
        console.log("Function completed");
    }