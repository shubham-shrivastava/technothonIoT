$(function() {
	var wsUri = "wss://aqms-node.mybluemix.net/ws/getdata";

	function wsConnect() {
		console.log("connect", wsUri);
		ws = new WebSocket(wsUri);

		ws.onmessage = function(msg) {
			// parse the incoming message as a JSON object
			var loc = angular.element('[ng-controller="HomeController"]').scope().location;
			msg = JSON.parse(msg.data);
			if (msg.d_id == parseFloat(loc)) {

				s1 = [ msg.aqi ];
				angular.element('[ng-controller="HomeController"]').scope().aqi = s1[0];
				angular.element('[ng-controller="HomeController"]').scope().$apply();

				plot = $.jqplot('chart', [ s1 ], {
					seriesDefaults : {
						renderer : $.jqplot.MeterGaugeRenderer,
						rendererOptions : {
							min : 0,
							max : 500,
							intervals : [ 50, 100, 200, 300, 400, 500 ],
							intervalColors : [ '#008000', '#00FF00', '#FFCC00', '#FFA500',
							                   '#FF0000', '#A52A2A' ]
						}
					}
				});

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

});