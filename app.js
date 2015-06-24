var leaderboardApp = angular.module('leaderboardApp', []);

leaderboardApp.controller('leaderboardCtrl', function($scope, $http){

	$scope.initialize = function() {
		$http.get('/api/scrape')
					.success(function(data){
						$scope.leaders = data;
					})
					.error(function(data){
						console.log('Error: ' + data);
					})
	};
	
	$http.get('leaderboard.json')
		.then(function(res){
			$scope.leaders = res.data;
		})
});