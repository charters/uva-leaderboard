var leaderboardApp = angular.module('leaderboardApp', []);

leaderboardApp.controller('leaderboardCtrl', function($scope, $http){
	
	$scope.initialize = function(){
		$http.get('/api/getAll')
		.then(function(res){
			$scope.leaders = res.data;
			var total = 0;
			for (var i = 0; i < $scope.leaders.length; i++){
				total += $scope.leaders[i].amount_raised;
			}
			$scope.progress = (total/7000 * 100) + '%';
		})
	}
});