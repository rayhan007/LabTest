LabTestApp.controller("indexController", function ($scope, $http, $rootScope, $window, $sce, $location) {

    

    $scope.newIndexModel = Object.create(null);

    $scope.loadBuildingList = function () {
        $rootScope.loading = true;
        $scope.BuildingList = [];
        $http.get("/api/index/GetBuilding").then(function (response) {
           
            $scope.BuildingList = response.data;
            $rootScope.loading = false;
        });
    }
    $scope.loadBuildingList();

    $scope.loadObjectList = function () {
        $rootScope.loading = true;
        $scope.ObjectList = [];
        $http.get("/api/index/GetMyObjects").then(function (response) {
           
            $scope.ObjectList = response.data;
            $rootScope.loading = false;
        });
    }
    $scope.loadObjectList();

    $scope.loadDataFields = function () {
        $rootScope.loading = true;
        $scope.DatafieldList = [];
        $http.get("/api/index/GetDataFields").then(function (response) {
          
            $scope.DatafieldList = response.data;
            $rootScope.loading = false;
        });
       
    }
    $scope.loadDataFields();
    
    $scope.search = function () {
        $scope.searchListData = [];
        $rootScope.loading = true;
        if ($scope.newIndexModel.TimestampFrom != null) {
            var TimestampFrom = convertIntoSqlYYYYMMDD($scope.newIndexModel.TimestampFrom);
        }
        if ($scope.newIndexModel.TimestampTo != null) {
            var TimestampTo = convertIntoSqlYYYYMMDD($scope.newIndexModel.TimestampTo);
        }

        $http.get("/api/index/GetSearchList?buildingid=" + $scope.newIndexModel.BuildingId + "&timestampfrom=" + TimestampFrom + "&timestampto=" + TimestampTo + "&objectid=" + $scope.newIndexModel.ObjectId + "&datafieldid=" + $scope.newIndexModel.DatafieldId).then(function (response) {
           
            $scope.searchListData = response.data;

             // Load Chart Data
            var y = 0;
            var data = [];
            var dataSeries = { type: "line" };
            var dataPoints = [];

            // Start creating some random datas
            var limit = 1000;
            for (var i = 0; i < limit; i += 1) {
                y += (Math.random() * 10 - 5);
                dataPoints.push({
                    x: i - limit / 2,
                    y: y
                });
            }

            dataSeries.dataPoints = dataPoints;
            // End creating some random datas

            //dataSeries.dataPoints = $scope.searchListData;
  


            data.push(dataSeries);

            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                zoomEnabled: true,
                title: {
                    text: "Timeseries Data"
                },
                data: data  // random generator below
            });
            chart.render();
            $rootScope.loading = false;
        });


       
    };

jQuery(document).ready(function () {

    //alert("called this");

    $("#PageForm").wrap("<form id='tempForm'></form>");


    var options = {
        uiEnabled: true,
        errorsWrapper: '',
        excluded: '.inActive'
    };

    // create the validator
    $("#tempForm").parsley(options);


});




});