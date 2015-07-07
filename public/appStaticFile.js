var leaderboardApp = angular.module('leaderboardApp', []);

leaderboardApp.controller('leaderboardCtrl', function($scope, $http){
	
	$scope.initialize = function(){
		$http.get('/api/getAll')
		.then(function(res){
			$scope.leaders = res.data;
			var total = 0;
			for (var i = 0; i < $scope.leaders.length; i++){
				total += $scope.leaders[i].raised_amount;
			}
			$scope.progress = total/5000;
		})
	}

	$scope.getTotal = function(){
		var total = 0;
		for (var i = 0; i < $scope.leaders.length; i++){
			total += $scope.leaders[i].raised_amount;
		}
		return total/5000;
	}
});