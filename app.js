var leaderboardApp = angular.module('leaderboardApp', []);

leaderboardApp.controller('leaderboardCtrl', function($scope, $http){
	$http.get('leaderboard.json')
		.then(function(res){
			$scope.leaders = res.data;
		})
});