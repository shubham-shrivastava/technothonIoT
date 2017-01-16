$(function() {
	$('img').hide();
	var _myDate;
	var day;
	var month;
	var year;
	var week;
	var loc = angular.element('[ng-controller="HomeController"]').scope().location;
	var livetemp = [];
	var livehumid = [];
	var liveco2 = [];
	var liveco = [];
	var liveso2 = [];
	var liveno2 = [];
	var livepm25 = [];
	totalPoints = 7;

	var interactive_plot = $.plot("#interactive", [ livetemp ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 20,
					to : 20
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 40,
					to : 40
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without
			// shadows
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
			min : 0,
			max : 7
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
					to : 7
				},
				yaxis : {
					from : 500,
					to : 500
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 700,
					to : 700
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without
			// shadows
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
			max : 7
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
					to : 7
				},
				yaxis : {
					from : 17,
					to : 17
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 30,
					to : 30
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without
			// shadows
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
			min : 0,
			max : 7
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
					to : 7
				},
				yaxis : {
					from : 65,
					to : 65
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 75,
					to : 75
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without
			// shadows
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
			min : 0,
			max : 7
		}
	});
	var interactive_plot5 = $.plot("#interactive_so2", [ liveso2 ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 400,
					to : 400
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 800,
					to : 800
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without
			// shadows
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
			min : 0,
			max : 7
		}
	});

	var interactive_plot6 = $.plot("#interactive_no2", [ liveno2 ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 80,
					to : 80
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 200,
					to : 200
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without
			// shadows
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
			min : 0,
			max : 7
		}
	});

	var interactive_plot7 = $.plot("#interactive_pm25", [ livepm25 ], {
		grid : {
			borderColor : "#f3f3f3",
			borderWidth : 1,
			tickColor : "#f3f3f3",
			hoverable : true,
			markings : [ {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 60,
					to : 60
				},
				color : "green"
			}, {
				xaxis : {
					from : 0,
					to : 7
				},
				yaxis : {
					from : 140,
					to : 140
				},
				color : "red"
			} ]
		},
		series : {
			shadowSize : 0, // Drawing is faster without
			// shadows
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
			max : 300,
			show : true
		},
		xaxis : {
			show : true,
			min : 0,
			max : 7
		}
	});

	$('#btn').click(
			function() {
				$('img').show();
				_myDate = new Date($('#date').val());
				day = _myDate.getDate();
				if (day % 7 == 0)
					week = parseInt(day / 7)
					else
						week = parseInt(day / 7) + 1;
				// alert(week);
				month = _myDate.getMonth() + 1;
				year = _myDate.getFullYear();
				var url = "https://aqms-node.mybluemix.net/api/weekly?loc="
					+ loc + "&week=" + week + "&month=" + month + "&year="
					+ year
					$.get(url, function(response) {
						// .success(function(response, status, headers, config){
						console.log(response);

						myData = response;
						// console.log($scope.myData);

						var i = 0;
						if (livetemp.length == totalPoints) {
							i = 0;
							livetemp.length = 0;
							livehumid.length = 0;
							liveco.length = 0;
							liveco2.length = 0;
							liveso2.length = 0;
							liveno2.length = 0;
							livepm25.length = 0;
						}
						// msg=JSON.parse($scope.myData);
						msg = myData

						for (i = 0; i <= 6; i++) {

							// console.log(msg);

							console.log(msg[i].t);
							livetemp.push([ i, (msg[i].t) ]);
							livehumid.push([ i, (msg[i].h) ]);
							liveco2.push([ i, (msg[i].co2) ]);
							liveco.push([ i, (msg[i].co) ]);
							liveso2.push([ i, (msg[i].so2) ]);
							liveno2.push([ i, (msg[i].no2) ]);
							livepm25.push([ i, (msg[i].pm25) ]);
							/*
							 * if(livetemp.length>=100) {
							 */

						}
						interactive_plot.setData([ livetemp ]);
						interactive_plot.draw();
						interactive_plot4.setData([ livehumid ]);
						interactive_plot4.draw();
						interactive_plot2.setData([ liveco2 ]);
						interactive_plot2.draw();
						interactive_plot3.setData([ liveco ]);
						interactive_plot3.draw();
						interactive_plot5.setData([ liveso2 ]);
						interactive_plot5.draw();
						interactive_plot6.setData([ liveno2 ]);
						interactive_plot6.draw();
						interactive_plot7.setData([ livepm25 ]);
						interactive_plot7.draw();

					});

			})

});
