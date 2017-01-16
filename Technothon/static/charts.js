
 $(function() { 
 var livetemp=[];
	var livehumid = [];
	var liveco2 = [];
	var liveco = [];
	var liveno = [];
	var liveso = [];
	var liveppt = [];
	var livepm = [];
	totalPoints = 100;
	// var loc=$("#loc").innerHTML;
	var loc = angular.element("[ng-controller=\"HomeController\"]").scope().location;
	// alert(loc);
	var wsUri = "wss://aqms-node.mybluemix.net/ws/getdata";
	var i = 0;

	// var ws = new WebSocket(wsUri);

	function wsConnect() {
		console.log("connect", wsUri);
		var temp = 0;
		ws = new WebSocket(wsUri);

		ws.onmessage = function(msg) {
			// var line = ""; // or uncomment this to overwrite the existing
			// message
			// parse the incoming message as a JSON object
			// console.log(msg);
			msg = JSON.parse(msg.data);
			if (msg.d_id == parseFloat(loc)) {
				// livetemp.slice(1);
				// console.log(data);
				if (livetemp.length == totalPoints) {
					i = 0;
					livetemp.length = 0;
					livehumid.length = 0;
					liveco.length = 0;
					liveco2.length = 0;
					liveso.length = 0;
					liveno.length = 0;
					liveppt.length = 0;
					livepm.length = 0;

				}

				i++;
				// console.log(msg);

				// alert(msg.t);
				// console.log(msg.d.t);
				livetemp.push([ i, (msg.t) ]);
				livehumid.push([ i, (msg.h) ]);
				liveco2.push([ i, (msg.co2) ]);
				liveco.push([ i, (msg.co) ]);

				liveno.push([ i, (msg.no2) ]);
				liveso.push([ i, (msg.so2) ]);
				liveppt.push([ i, (msg.ppt) ]);
				livepm.push([ i, (msg.pm25) ]);

				/*
				 * if(livetemp.length>=100) {
				 */
				interactive_plot.setData([ livetemp ]);
				interactive_plot.draw();
				interactive_plot4.setData([ livehumid ]);
				interactive_plot4.draw();
				interactive_plot2.setData([ liveco2 ]);
				interactive_plot2.draw();
				interactive_plot3.setData([ liveco ]);
				interactive_plot3.draw();

				interactive_plot5.setData([ liveno ]);
				interactive_plot5.draw();
				interactive_plot6.setData([ liveso ]);
				interactive_plot6.draw();
				interactive_plot7.setData([ livepm ]);
				interactive_plot7.draw();

				// }

				$("#currtempl").html(msg.t);
				$("#currhumidl").html(msg.h);
				$("#currco2l").html(msg.co2);
				$("#currcol").html(msg.co);
				$("#currsol").html(msg.so);
				$("#currnol").html(msg.no);
				$("#currpml").html(msg.pm25);

				// temp=msg.temparature;

			}
			ws.onopen = function() {
				// update the status div with the connection status
				// ws.send("Open for data");
				console.log("connected");
				// interactive_plot.setData(livetemp);
				// interactive_plot.draw();
			}
			ws.onclose = function() {
				// update the status div with the connection status
				console.log("Disconnected!");
				// in case of lost connection tries to reconnect every 3 secs
				setTimeout(wsConnect, 3000);
			}
		}
	}
	// return temp;

	wsConnect();

	var interactive_plot = $.plot("#interactive", [ livetemp ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 20,
					to : 20
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 40,
					to : 40
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without shadows
			color : "orange"
		},
		lines : {
			show : true,
			color : "#3c8dbc"
		},
		points : {
			show : true
		},
		yaxis : {
			min : 0,
			max : 60,
			show : true
		},
		xaxis : {
			show : true,
			min : 1,
			max : 100
		}
	});

	var interactive_plot2 = $.plot("#interactive_co2", [ liveco2 ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from :500,
					to : 500
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 700,
					to : 700
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without shadows
			color : "orange"
		},
		lines : {
			show : true,
			color : "#3c8dbc"
		},
		points : {
			show : true
		},
		yaxis : {
			min : 100,
			max : 800,
			show : true
		},
		xaxis : {
			show : true,
			min : 0,
			max : 100
		}
	});

	var interactive_plot3 = $.plot("#interactive_co", [ liveco ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 17,
					to : 17
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 30,
					to : 30
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without shadows
			color : "orange"
		},
		lines : {
			show : true,
			color : "#3c8dbc"
		},
		points : {
			show : true
		},
		yaxis : {
			min : 0,
			max : 49,
			show : true
		},
		xaxis : {
			show : true,
			min : 0,
			max : 100
		}
	});

	var interactive_plot4 = $.plot("#interactive_humid", [ livehumid ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 65,
					to : 65
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 75,
					to : 75
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without shadows
			color : "orange"
		},
		lines : {
			show : true,
			color : "#3c8dbc"
		},
		points : {
			show : true
		},
		yaxis : {
			min : 0,
			max : 80,
			show : true
		},
		xaxis : {
			show : true,
			min : 1,
			max : 100
		}
	});

	var interactive_plot5 = $.plot("#interactive_no2", [ liveno ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 80,
					to : 80
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 200,
					to : 200
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without shadows
			color : "orange"
		},
		lines : {
			show : true,
			color : "#3c8dbc"
		},
		points : {
			show : true
		},
		yaxis : {
			min : 0,
			max : 600,
			show : true
		},
		xaxis : {
			show : true,
			min : 1,
			max : 100
		}
	});

	var interactive_plot6 = $.plot("#interactive_so2", [ liveso ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 400,
					to : 400
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 800,
					to : 800
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without shadows
			color : "orange"
		},
		lines : {
			show : true,
			color : "#3c8dbc"
		},
		points : {
			show : true
		},
		yaxis : {
			min : 0,
			max : 2400,
			show : true
		},
		xaxis : {
			show : true,
			min : 1,
			max : 100
		}
	});

	var interactive_plot7 = $.plot("#interactive_pm25", [ livepm ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 60,
					to : 60
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 100
				},
				yaxis : {
					from : 140,
					to : 140
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without shadows
			color : "orange"
		},
		lines : {
			show : true,
			color : "#3c8dbc"
		},
		points : {
			show : true
		},
		yaxis : {
			min : 0,
			max : 380,
			show : true
		},
		xaxis : {
			show : true,
			min : 1,
			max : 100
		}
	});

});
