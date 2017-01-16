# Copyright 2015 IBM Corp. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
from flask import Flask, jsonify, send_from_directory, request
import requests
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
import numpy as np
PredictedWeatherData = {}
MainList = []
WeatherData = []
import warnings
warnings.filterwarnings('ignore')
import pandas as pd




app = Flask(__name__, static_url_path='')
print "Access-Control-Allow-Origin: *"
@app.route('/')
def Main():
    return app.send_static_file('MainPage.html')
    #return app.send_static_file('M')
	
@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('.', path)


@app.route('/api/forecast')
def GetForecast():
	loc = request.args.get('loc')
	
	def PolynomialRegressionPrecip(degree,val):
		regressor = LinearRegression()
		regressor.fit(MainList, Preci)
		xx = np.linspace(0, 26, 100)
		yy = regressor.predict(xx.reshape(xx.shape[0], 1))
		
		quadratic_featurizer = PolynomialFeatures(degree)
		X_quadratic = quadratic_featurizer.fit_transform(MainList)
		
		regressor_quadratic = LinearRegression()
		regressor_quadratic.fit(X_quadratic, Preci)
		
		
		xx_quadratic = quadratic_featurizer.transform(xx.reshape(xx.shape[0], 1))
		
		#print ('Residual sum of squares: %.2f' % np.mean(( regressor_quadratic.predict(X_quadratic)- Preci) ** 2))  10.74
		X_quadratic = quadratic_featurizer.fit_transform([30 + val])
		output = regressor_quadratic.predict(X_quadratic)
		return (output)

	def PolynomialRegressionHumidity(degree,val):
		regressor = LinearRegression()
		regressor.fit(MainList, Humidity)
		xx = np.linspace(0, 26, 100)
		yy = regressor.predict(xx.reshape(xx.shape[0], 1))
		
		quadratic_featurizer = PolynomialFeatures(degree)
		X_quadratic = quadratic_featurizer.fit_transform(MainList)
		
		regressor_quadratic = LinearRegression()
		regressor_quadratic.fit(X_quadratic, Humidity)
		
		
		xx_quadratic = quadratic_featurizer.transform(xx.reshape(xx.shape[0], 1))
		
		   # print ('Residual sum of squares: %.2f' % np.mean(( regressor_quadratic.predict(X_quadratic)- Humidity) ** 2)) #error 7.08
		X_quadratic = quadratic_featurizer.fit_transform([30 + val])
		output = regressor_quadratic.predict(X_quadratic)
		return (output)


	df = pd.read_csv('static/WeatherData.csv')
	url = 'https://mean-wizards-v2.mybluemix.net/api/getdata?loc='+loc+'&limit=30'
	r = requests.get(url)
	ServerData =r.json()

	Temp = df['Temp'].values
	Temp = Temp[90:120]
	Humidity = df['Humidity'].values
	Humidity = Humidity[90:120]
	Preci = df['preci'].values
	Preci = Preci[90:120]
	WeatherData = df[['Temp','Humidity']].values

	X = [each for each in range(1,31)]
	MainList = []


	for each in X:
		MainList.append([each])
	slr = LinearRegression()
	WeatherData = WeatherData[:30]


	coData = [float(i['co']) for i in ServerData]
	co2Data = [float(i['co2']) for i in ServerData]
	no2Data = [float(i['no2']) for i in ServerData]
	pm25Data = [float(i['pm25']) for i in ServerData]
	so2Data = [float(i['so2']) for i in ServerData]
	print (len(coData))
	print (len(WeatherData))
	# In[284]:

	def Prediction(val):
		slr.fit(MainList,Temp)
		Temp_predict = [30 + val]
		Temp_output = slr.predict(Temp_predict)
		PredictedWeatherData['temp'] = Temp_output[0]

		Humid =  PolynomialRegressionHumidity(9,val)
		PredictedWeatherData['Humidity'] = Humid[0]

		preci =  PolynomialRegressionPrecip(22,val)
		PredictedWeatherData['preci'] = preci[0]

		AQIParameters = {}
		model = LinearRegression()
		
		model.fit(WeatherData, coData)
		
		X_predict = [PredictedWeatherData['temp'],PredictedWeatherData['Humidity']]
		y_predict = model.predict(X_predict)
		AQIParameters['co'] = y_predict[0]

		model.fit(WeatherData, co2Data)
		y_predict = model.predict(X_predict)
		AQIParameters['co2'] = y_predict[0]

		model.fit(WeatherData, no2Data)
		y_predict = model.predict(X_predict)
		AQIParameters['no2'] = y_predict[0]

		model.fit(WeatherData, pm25Data)
		y_predict = model.predict(X_predict)
		AQIParameters['pm25'] = y_predict[0]

		model.fit(WeatherData, so2Data)
		y_predict = model.predict(X_predict)
		AQIParameters['so2'] = y_predict[0]

		FinalDataRecord = {}
		FinalDataRecord = AQIParameters.copy()
		FinalDataRecord.update(PredictedWeatherData)
		
		CObr=[0, 1.0, 2.0, 10, 17, 34, 49];
		SO2br=[0, 40, 80, 380, 800, 1600, 2400];
		O3br=[0, 50, 100, 168, 208, 748, 1300]
		PM25br=[0, 30, 60, 90, 120, 250, 350.4];
		PM10br=[0, 50, 100, 250, 350, 430, 504];
		NO2br=[0, 40, 80, 180, 280, 400, 540];
		AQI=[0, 50, 100, 200, 300, 400, 500];

		dummy = []
		so2= FinalDataRecord['so2']
		so2AQI=0;
		i=0;
		while(i<6):
			if( so2 > SO2br[i] and so2 <= SO2br[i+1]):
				so2AQI= ( ( AQI[i+1]-AQI[i] ) * ( so2 - SO2br[i] ) / ( SO2br[i+1] - SO2br[i] ) ) + AQI[i]
				break; 
			else:
				i = i+1
		dummy.append(so2AQI)

		no2= FinalDataRecord['no2']
		no2AQI=0;
		i=0;
		while(i<6):
			if( no2 > NO2br[i] and no2 <= NO2br[i+1]):
				no2AQI= ( ( AQI[i+1]-AQI[i] ) * ( no2 - NO2br[i] ) / ( NO2br[i+1] - NO2br[i] ) ) + AQI[i]
				break; 
			else:
				i = i+1
		dummy.append(no2AQI)

		co= FinalDataRecord['co']
		coAQI=0;
		i=0;
		while(i<6):
			if( co > CObr[i] and co <= CObr[i+1]):
				coAQI= ( ( AQI[i+1]-AQI[i] ) * ( co - CObr[i] ) / ( CObr[i+1] - CObr[i] ) ) + AQI[i]
				break; 
			else:
				i = i+1
		dummy.append(coAQI)

		pm25= FinalDataRecord['pm25']
		pmAQI=0;
		i=0;
		while(i<6):
			if( pm25 > PM25br[i] and pm25 <= PM25br[i+1]):
				pmAQI= ( ( AQI[i+1]-AQI[i] ) * ( pm25 - PM25br[i] ) / ( PM25br[i+1] - PM25br[i] ) ) + AQI[i]
				break; 
			else:
				i = i+1
		dummy.append(pmAQI)
		finalAQI = max(dummy)
		FinalDataRecord['AQI'] = finalAQI
		return FinalDataRecord


	# In[285]:

	Data = []
	Data.append(Prediction(1))
	Data.append(Prediction(2))
	Data.append(Prediction(3))
	Data.append(Prediction(4))
	Data.append(Prediction(5))
	Data.append(Prediction(6))
	Data.append(Prediction(7))
	print(Data)

	return jsonify(results=Data)

	





port = os.getenv('PORT', '5000')
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=int(port))
