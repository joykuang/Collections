## Weather API

### View City Information  
**[URL]** http://apistore.baidu.com/microservice/weather?cityid=[City Code]
**[URL]** http://apistore.baidu.com/microservice/weather?cityname=[City Name]
**[URL]** http://apistore.baidu.com/microservice/weather?citypinyin=[City Name Pinyin]

**[URL]** http://apistore.baidu.com/microservice/cityinfo?cityname=[City Name]  
**[URL]** http://apistore.baidu.com/microservice/cityinfo?cityid=[City Code] 
**[RETURN]**  

	{
	  "errNum": 0,
	  "retMsg": "success",
	  "retData": {
	    "cityName": "[City Name]",
	    "provinceName": "[Province Name]",
	    "cityCode": "101281101",
	    "zipCode": "529000",
	    "telAreaCode": "0750"
	  }
	}

**[URL]** http://wthrcdn.etouch.cn/weather_mini?city=[City Name]
**[URL]** http://wthrcdn.etouch.cn/weather_mini?citykey=[City Code]
**[URL]** http://wthrcdn.etouch.cn/WeatherApi?citykey=[City Code]
**[RETURN]** 

	{
	"desc": "OK",
	"status": 1000,
	"data": {
		"wendu": "19",
		"ganmao": "天气较凉，较易发生感冒，请适当增加衣服。体质较弱的朋友尤其应该注意防护。",
		"forecast": [
			{
				"fengxiang": "东北风",
				"fengli": "微风级",
				"high": "高温 20℃",
				"type": "多云",
				"low": "低温 15℃",
				"date": "9日星期六"
			},
			{
				"fengxiang": "东北风",
				"fengli": "微风级",
				"high": "高温 18℃",
				"type": "小雨",
				"low": "低温 15℃",
				"date": "10日星期天"
			},
			{
				"fengxiang": "东北风",
				"fengli": "微风级",
				"high": "高温 17℃",
				"type": "多云",
				"low": "低温 13℃",
				"date": "11日星期一"
			},
			{
				"fengxiang": "无持续风向",
				"fengli": "微风级",
				"high": "高温 16℃",
				"type": "多云",
				"low": "低温 12℃",
				"date": "12日星期二"
			},
			{
				"fengxiang": "无持续风向",
				"fengli": "微风级",
				"high": "高温 19℃",
				"type": "阴",
				"low": "低温 11℃",
				"date": "13日星期三"
			}
		],
		"yesterday": {
			"fl": "微风",
			"fx": "东北风",
			"high": "高温 20℃",
			"type": "多云",
			"low": "低温 15℃",
			"date": "8日星期五"
		},
		"aqi": "64",
		"city": "江门"
		}
	}


**[URL]** http://api.k780.com:88/?app=weather.today&weaid=1&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4

**[RETURN]**

	{
	"success": "1",
		"result": {
		"weaid": "1",
		"days": "2016-01-09",
		"week": "星期六",
		"cityno": "beijing",
		"citynm": "北京",
		"cityid": "101010100",
		"temperature": "3℃/-6℃",
		"temperature_curr": "3℃",
		"humidity": "21%",
		"weather": "晴",
		"weather_icon": "http://api.k780.com:88/upload/weather/d/0.gif",
		"weather_icon1": "",
		"wind": "北风",
		"winp": "0级",
		"temp_high": "3",
		"temp_low": "-6",
		"temp_curr": "3",
		"humi_high": "0",
		"humi_low": "0",
		"weatid": "1",
		"weatid1": "",
		"windid": "20",
		"winpid": "207"
		}
	}

**[URL]** http://platform.sina.com.cn/weather/forecast?app_key=1315597423&city=%E6%B1%9F%E9%97%A8

**[URL]** 
