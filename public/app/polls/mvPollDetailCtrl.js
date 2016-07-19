angular.module('app').controller('mvPollDetailCtrl', function($scope, $routeParams, $http, $route, mvCachedPolls, mvIdentity, mvAuth, mvNotifier){


  //chart setup & data
  var chartPollData = [];
  $scope.myChartObject = {};

  mvCachedPolls.query().$promise.then(function(collection){
    collection.forEach(function(poll){
      if(poll._id === $routeParams.id){
        $scope.poll = poll;
      }
    });
  }).then(function(){
    $scope.myChartObject.type = "BarChart";
    $scope.myChartObject.options = {
      'title': 'Your Poll Results'
    };
    for(i=0; i<$scope.poll.options.length; i++){
      chartPollData.push({c: [{v: $scope.poll.options[i].choice},{ v: $scope.poll.options[i].votes}]});
    }
    console.log(chartPollData);
    $scope.myChartObject.data = {
      "cols": [
      {id: "t", label: "Poll Options", type: "string"},
      {id: "s", label: "Votes", type: "number"}
      ], 
      "rows": chartPollData
    };
    console.log($scope.myChartObject.data);
  });

  //variables

  $scope.newOption = "";
  $scope.radioValue = {"selected": "none"};

  //functions


  $scope.deleteThisPoll = function(){
    if(typeof mvIdentity.currentUser === "undefined"){
      mvNotifier.notify("You need to log in to do this!");
    }else{
      if(mvIdentity.currentUser.username === $scope.poll.createdBy){
        var newPollData = {
          pollId: $scope.poll._id
        }
        $http.post("/api/deletepoll", newPollData).success(function(data, status){
          mvNotifier.notify("Deleting this poll...get ready to be redirected!");
          setTimeout(function(){window.location = '/polls';}, 1000);          
        })
      }else{
        mvNotifier.notify("Not sure how you got here, but this poll belongs to someone else!");
      }		
    }
  }

  $scope.openModal = function(){
    $scope.showModal = true;
  }

  $scope.closeModal = function(){
    $scope.showModal = false;
  }


  $scope.addNewOptions = function(){
    if(typeof mvIdentity.currentUser === "undefined" || $scope.newOption === ""){
      mvNotifier.notify("Not logged in!");
    }else{
      var newPollData = {
        pollId: $scope.poll._id,
        newOption: $scope.newOption
      }
      if(mvIdentity.currentUser.username === $scope.poll.createdBy){
        $http.post("/api/addNewOptions/", newPollData).success(function(data, status){
          mvNotifier.notify("Adding your new option! Refreshing data...");
          $scope.showModal = false;
          setTimeout(function(){
            var url = "/polls/" + $scope.poll._id;
            window.location.href = url; 
          }, 1000); 
          
        })
      }else{
        mvNotifier.notify("Wrong account!");
      }    
    }
  }

  $scope.showDeleteButton = function(){
   if(typeof mvIdentity.currentUser === "undefined"){
    return false;
  }else{
    if(mvIdentity.currentUser.username === $scope.poll.createdBy){
     return true;
   }else{
     return false;
   }		
 }
}

$scope.showAddButton = function(){
 if(typeof mvIdentity.currentUser === "undefined"){
  return false;
}else{
  if(mvIdentity.currentUser.username === $scope.poll.createdBy){
   return true;
 }else{
   return false;
 }    
}
}

$scope.submitVotes = function(){
  var newPollData = {
    pollId: $scope.poll._id,
    vote: $scope.radioValue.selected
  };

  $http.post("/api/vote/", newPollData).success(function(data, status) {
    if(data !== undefined){
      $scope.radioValue = {"selected": "none"};
    }else{
      console.log("Data = undefined, status: " + status);
      mvNotfier.notify("Error!");
    }
    mvNotifier.notify("Adding your vote! Refreshing data...");
    setTimeout(function(){
      var url = "/polls/" + $scope.poll._id;
      window.location.href = url; 
    }, 1000); 
  });
}

})