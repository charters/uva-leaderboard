var leaderboardApp = angular.module('leaderboardApp', []);

leaderboardApp.controller('leaderboardCtrl', function($scope, $http){

	$scope.update = function() {
		$http.get('/api/scrape')
					.success(function(data){
						$scope.leaders = data;
					})
					.error(function(data){
						console.log('Error: ' + data);
					})
	};
	$scope.initialize = function(){
		$http.get('leaderboard.json')
		.then(function(res){
			$scope.leaders = res.data;
		})
	}
});