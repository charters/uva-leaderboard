var leaderboardApp = angular.module('leaderboardApp', []);

leaderboardApp.controller('leaderboardCtrl', function($scope, $http){
	
	$scope.initialize = function(){
		$http.get('/api/getAll')
		.then(function(res){
			$scope.leaders = res.data;
		})
	};
});