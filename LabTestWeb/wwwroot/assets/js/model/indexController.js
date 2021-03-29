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
        $scope.searchList = [];
        $rootScope.loading = true;
        if ($scope.newIndexModel.TimestampFrom != null) {
            var TimestampFrom = convertIntoSqlYYYYMMDD($scope.newIndexModel.TimestampFrom);
        }
        if ($scope.newIndexModel.TimestampTo != null) {
            var TimestampTo = convertIntoSqlYYYYMMDD($scope.newIndexModel.TimestampTo);
        }

        $http.get("/api/index/GetSearchList?buildingid=" + $scope.newIndexModel.BuildingId + "&timestampfrom=" + TimestampFrom + "&timestampto=" + TimestampTo + "&objectid=" + $scope.newIndexModel.ObjectId + "&datafieldid=" + $scope.newIndexModel.DatafieldId).then(function (response) {
            $rootScope.loading = false;
            $scope.searchList = response.data;
        });

        $rootScope.loading = false;
        
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