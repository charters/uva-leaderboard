var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var ejs = require('ejs');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/leaderboard.html')
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
							if (date >= 22){
								raised_amount += current;
							}

						}
					});

					var fundraiser_data = {
						name: fundraiser_name,
						amount: raised_amount
					};
					
					leaderboard.push(fundraiser_data);
					completed_request++;
					
					if (completed_request == array.length){
						storeLeaderboard();
					}
				}
			});
		}
	});

function storeLeaderboard() {
	res.json(leaderboard);
	fs.writeFile( "public/leaderboard.json", JSON.stringify(leaderboard), "utf8");
	console.log('File successfully updated.')
}
});

app.listen(port, function(){
	console.log('Our app is running on http://localhost:' + port);
});