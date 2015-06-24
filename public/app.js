var leaderboardApp = angular.module('leaderboardApp', []);

leaderboardApp.controller('leaderboardCtrl', function($scope, $http){

	$scope.initialize = function() {
		$http.get('/api/scrape')
					.success(function(data){
						$scope.leaders = data;
						console.log('Using correct App.js');
					})
					.error(function(data){
						console.log('Error: ' + data);
					})
	};


});