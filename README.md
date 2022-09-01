# geocode-api

Returns longitude and latitude coordinates of (most) cities in the US

Requirements:
- Nodejs

To install:
1. Open command line and navigate to the folder
2. Run `npm install`
3. When installation is finished, run `npm start` to start your server

You can look up location coords using your server url, example:  
`http://localhost:3000/losangeles/california` <sub>You an also use state abbreviation if you like</sub>

Will return:
```
{
"STATE_NAME": "California",
"LONGITUDE": -118.247896,
"LATITUDE": 33.973093,
"CITY": "Los Angeles",
"COUNTY": "Los Angeles"
}
```

Thanks to @kelvins for his US-Cities-Database dump
