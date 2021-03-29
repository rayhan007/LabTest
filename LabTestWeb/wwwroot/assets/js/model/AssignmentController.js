eSenderApp.controller("AssignmentController", function ($scope, $http, $rootScope, $window, $sce, $location) {

    $rootScope.loading = true;

    $scope.newAssignmentModel = Object.create(null);

    $scope.save = function () {
        var validator = $("#tempForm").parsley();

        validator.validate();

        if (validator.isValid()) {
        $scope.saveAfterValidate();
        }
    }

    $scope.submit = function () {
        //var validator = $("#tempForm").parsley();

        //validator.validate();

        //if (validator.isValid()) {
        $scope.submitAfterValidate();
        //}
    }

    $scope.saveAfterValidate = function () {
        $rootScope.loading = true;
        $scope.errorMessage = "";

        var model = angular.copy($scope.newAssignmentModel);
        if ($scope.newAssignmentModel.AssignmentDate != null && $scope.newAssignmentModel.AssignmentDate != "" && $scope.newAssignmentModel.AssignmentDate != null) {
            model.AssignmentDate = convertIntoSqlYYYYMMDD($scope.newAssignmentModel.AssignmentDate);
        }

        $http({
            url: '/api/Assignment/AddOrEdit',
            method: "POST",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            dataType: 'json'
        }).then(function (response) {

            if (response.data.isSuccess) {

                //$scope.showForm = false;
                $scope.successMessage = response.data.message;
                $scope.errorMessage = "";
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.successMessage));
                $scope.newAssignmentModel = Object.create(null);
                //window.scrollTo(0, 0);


            }
            else {
                $scope.errorMessage = response.data.message;
                // window.scrollTo(0, 0);
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
            }
            $rootScope.loading = false;

        });
    }

    $scope.submit = function () {


    }

    $scope.loadAssignmentType = function () {
        $rootScope.loading = true;
        $scope.AssignmentTypeList = [];
        $http.get("/api/Assignment/GetAllAssignmentTypeList").then(function (response) {
            $rootScope.loading = false;
            $scope.AssignmentTypeList = response.data;
        });
    }
    $scope.loadAssignmentType();


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