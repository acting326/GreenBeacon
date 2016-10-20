//Queue controller

angular.module('app.queue', [])

.controller('QueueController', ['$scope', 'Tickets', 'Auth', function($scope, Tickets, Auth){

  //call getTickets from Tickets factory
  $scope.data = {};

  var initializeQueue = function() {
    Tickets.getTickets()
      .then(function(results){
        console.log("inside initialize ", results.tickets)
        $scope.data.tickets = results.tickets.data;

        $scope.data.claims = results.claims.data;
        for (var claim of $scope.data.claims) {
          if (claim.userId === results.userID.data) {
            alert('YOUR TICKET HAS BEEN CLAIMED');
          }
        }
      })
      .catch(function(error){
        console.error(error);
      })
  }

  $scope.ticket = {};

  $scope.addTicket = function () {
    console.log('inside addTicket module ', $scope.ticket)
    Tickets.addTicket($scope.ticket)
    .then(function () {
      $scope.ticket = {};
      initializeQueue();
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  $scope.signout = function () {
    console.log('inside signout')
    Auth.signout();
  }

  $scope.claimTicket = function (ticket) {
    //ticket.claimed = !ticket.claimed;

    Tickets.claimTicket(ticket)
    .then(function () {
      initializeQueue();
    })
    .catch(function (err) {
      console.log(err);
    });

  }

  initializeQueue();

}])
