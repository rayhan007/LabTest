eSenderApp.controller("ChangePasswordController", function ($scope, $http, $sce, $rootScope, $window) {
  
    $scope.successMessage = "";
    $scope.successMessageHtml = "";
    $scope.errorMessage = "";
    $scope.errorMessageHtml = "";
    $scope.newChangePassword = Object.create(null);
    $scope.showForm = false;
    
    $scope.generateOTP = function () {
      
        $rootScope.loading = true;

        $scope.errorMessage = "";

        var model = angular.copy($scope.newChangePassword);

        $http({
            url: '/api/UserManagement/SendOTP',
            method: "POST",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            dataType: 'json'
        }).then(function (response) {

            if (response.data.isSuccess) {
               
                $scope.successMessage = response.data.message;
                $scope.errorMessage = "";
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.successMessage));
                //$scope.newChangePassword = Object.create(null);
                $scope.showForm = true;
                $rootScope.loading = false;
            }
            else {
                window.scrollTo(0, 0);
                $scope.errorMessage = response.data.message;
                $scope.successMessage = "";
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
                $scope.showForm = false;
                $rootScope.loading = false;
                $scope.newChangePassword = Object.create(null);
            }


        });
    };
    

    $scope.changepassword = function () {

        $rootScope.loading = true;

        $scope.errorMessage = "";

        var model = angular.copy($scope.newChangePassword);

        $http({
            url: '/api/UserManagement/ChangePasswordPasswordForUser',
            method: "POST",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            dataType: 'json'
        }).then(function (response) {

            if (response.data.isSuccess) {
                $rootScope.loading = false;
                $scope.successMessage = response.data.message;
                $scope.errorMessage = "";
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.successMessage));
                $scope.newChangePassword = Object.create(null);
               
                $window.location.href = "/account/login";
            }
            else {
                window.scrollTo(0, 0); 
                $scope.errorMessage = response.data.message;
                $scope.successMessage = "";
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
              
                $rootScope.loading = false;
            }
           

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

    function destroyParsley() {
        var validator = $("#tempForm").parsley();
        validator.reset();
    }
});