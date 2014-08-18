Application.Controllers.controller('BoardCtrl', ['$scope', '$state', 'BugzillaService',
    function($scope, $state, BugzillaService) {

        var order = ["SELECTED", "REWORK REQUIRED (REOPENED)", "DEVELOP TEST/CODE (ASSIGNED)", "DEVELOP DONE (RESOLVED)", "REVIEW REVIEWING", "REVIEW DONE (REVIEWED)", "TEST TESTING", "TEST DONE (VERIFIED)"];

        $scope.state = $state;

        BugzillaService.get({'method' : 'Product.get_selectable_products', params : {}}).then(function(response){
            BugzillaService.get({'method' : 'Product.get', params : { "ids":response.result.ids}}).then(function(response){
                $scope.products   = response.result.products;
                $scope.components = _.flatten($scope.products.map(function(product){return product.components}));
                $scope.milestones = _.uniq(_.flatten($scope.products.map(function(product){return product.milestones})), function(milestone) {return milestone.name})
            });

        });

        BugzillaService.get({'method' : 'Bug.search', params : { "status": order}}).then(function(bugs){
            $scope.groupedByStatus = d3.nest().key(function(d) { return d.status; }).entries(bugs.result.bugs);
            $scope.groupedByStatusIncludingStatusesWithNoBugs = [];

            /*This combines nest with the order array to effectively 'pivot' the bugs around the predefined status columns */
            order.forEach(function(status){
                var statusFoundInBugList = _($scope.groupedByStatus).find(function(group){return group.key == status});
                $scope.groupedByStatusIncludingStatusesWithNoBugs.push(statusFoundInBugList ? _($scope.groupedByStatus).find(function(group){return group.key == status}) : {key : status, values : []});
            });

            $scope.lengthOfLongestColumn = _($scope.groupedByStatusIncludingStatusesWithNoBugs).max(function(d){return d.values.length}).values.length;
        });

    }
]);


Application.Controllers.controller('BugzillaPreviewCtrl', ['$scope', '$state', '$stateParams',  'BugzillaService', '$q',
    function($scope, $state, $stateParams, BugzillaService, $q) {

        var timelineRequests  = [];
        $scope.params = $stateParams;

        BugzillaService.get({'method' : 'Bug.search', params : {  "id": $scope.params.bugid}}).then(function(response){
            $scope.bug = response.result.bugs[0];
        });

        timelineRequests.push(BugzillaService.get({'method' : 'Bug.comments', params : { "ids": $scope.params.bugid}}));
        timelineRequests.push(BugzillaService.get({'method' : 'Bug.history', params : { "ids": $scope.params.bugid}}));

        /*merge comments and histories together into one timeline list and sort descending*/
        $q.all(timelineRequests).then(function(responses) {
            $scope.timeline = [];

            var comments = responses[0].result.bugs[$scope.params.bugid].comments;
            var historys = responses[1].result.bugs[0].history;

            comments.forEach(function(comment){
                $scope.timeline.push({type : "comment",   author : comment.author, time : comment.time, preview :comment.text});
            });

            historys.forEach(function(history){
                $scope.timeline.push({ type : "history", author : history.who, time : history.when, preview :  history.changes});
            });

            $scope.timeline = _.sortBy($scope.timeline, function(timelineitem) {return timelineitem.time}).reverse();


        });

    }
]);

