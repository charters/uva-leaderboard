var leaderboardApp = angular.module('leaderboardApp', []);

leaderboardApp.controller('leaderboardCtrl', function($scope, $http){

	$scope.update = function() {
		$http.get('/api/scrape', [{timeout: 90000}])
		.success(function(data){
			console.log('All users updated successfully.');
			$http.get('/api/getAll')
			.then(function(res){
				$scope.leaders = res.data;
			})
		})
		.error(function(data){
			console.log('Error: ' + data);
		})

	}
	$scope.initialize = function(){
		$http.get('/api/getAll')
		.then(function(res){
			$scope.leaders = res.data;
		})
	};
});