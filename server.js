var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var ejs = require('ejs');
var app = express();
var Counselor = require('./public/models/counselor')

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/leaderboard.html')
});

app.get('/api/populate', function(req, res){

	fs.readFile('urls.txt', function(err, data) {
		if(err) throw err;
		var array = data.toString().split("\n");
		for(i in array) {
			request(array[i], function (error, response, html){
				if (!error && response.statusCode == 200) {
					var $ = cheerio.load(html);
					var fundraiser_name = $('div.profile_wrapper strong').text();
					var fundraiser_url = response.request.uri.href;
					var raised_amount = 0;
					var current = 0;
					$('table.recent_donations_table td').each(function(i, elem) {
						var text = $(this).text();
						if (text.indexOf("donated") > -1){
							var parts = text.split("donated $");
							current = parseInt(parts[1]);
						}
						else if (text.indexOf("June") > -1){
							var parts = text.split(" ");
							var date = parts[2];
							date = parseInt(date.substring(0, date.length - 1));
							if (date >= 24){
								raised_amount += current;
							}

						}
						else if (text.indexOf("July") > -1) {
							raised_amount += current;
						}
					});

					var fundraiser = new Counselor({
						name: fundraiser_name,
						url: fundraiser_url,
						amount_raised: raised_amount
					});
					
					fundraiser.save(function(err) {
						if (err) throw err;

						console.log('Counselor created!');
					});

				}
			});
		}
	});
});

app.get('/api/getAll', function(req,res){
	Counselor.find({}, function(err, counselors){
		if (err) throw err;

		console.log(counselors);
		res.json(counselors);
	});
});

app.get('/api/scrape', function(req, res){
	var leaderboard = [];
	completed_request = 0;

	fs.readFile('urls.txt', function(err, data) {
		if(err) throw err;
		var array = data.toString().split("\n");
		for(i in array) {
			request(array[i], function (error, response, html){
				if (!error && response.statusCode == 200) {
					var $ = cheerio.load(html);
					var fundraiser_name = $('div.profile_wrapper strong').text();
					var fundraiser_url = response.request.uri.href;
					var raised_amount = 0;
					var current = 0;
					$('table.recent_donations_table td').each(function(i, elem) {
						var text = $(this).text();
						if (text.indexOf("donated") > -1){
							var parts = text.split("donated $");
							current = parseInt(parts[1]);
						}
						else if (text.indexOf("June") > -1){
							var parts = text.split(" ");
							var date = parts[2];
							date = parseInt(date.substring(0, date.length - 1));
							if (date >= 24){
								raised_amount += current;
							}

						}
						else if (text.indexOf("July") > -1) {
							raised_amount += current;
						}
					});

					
					Counselor.findOneAndUpdate({ url: fundraiser_url }, {amount_raised: raised_amount}, function(err, counselor) {
						if (err) throw err;

						console.log(counselor);
					});
				}
			});
		}
	});
});

app.listen(port, function(){
	console.log('Our app is running on http://localhost:' + port);
});