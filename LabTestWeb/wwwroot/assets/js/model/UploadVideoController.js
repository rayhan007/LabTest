

eSenderApp.controller("UploadVideoController", function ($scope, $http, $rootScope, $window, $sce, $location, fileUpload) {

    //$rootScope.loading = true;
    $scope.editReporterStory = false;
    $scope.myStory = true;

    
    $scope.upload = function () {
        $rootScope.loading = true;
        var validator = $("#tempForm").parsley();

        validator.validate();

        if (validator.isValid()) {
            var file = $scope.AttachmentUrl;
            if (file != null && file != "" && file.size != null && file != "unidefined") {
                $scope.uploadAfterValidate();
               
            }
            else {

                //$scope.successMessage = response.data.message;
                $scope.errorMessage = "Please Upload Video";
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));

            }
        }

        else {
            $rootScope.loading = false;
        }
      
       
        
    }
    $scope.getFileDetails = function (e) {

        $scope.files = [];

        // STORE THE FILE OBJECT IN AN ARRAY.
        for (var i = 0; i < e.files.length; i++) {
            $scope.files.push(e.files[i])
        }
    };    
    $scope.uploadAfterValidate = function () {
      
        var isValid = true;
        var counter = 1;
        var file = $scope.AttachmentUrl;

        
        // if (isValid) {
        var modelData = angular.copy($scope.newVideoModel);

       

        var uploadUrl = "/api/UploadVideo/Upload";


        var d = new Date();
        var tempFileId = d.getTime();
        var model = angular.copy($scope.newVideoModel);
        var fileUploadPromise = fileUpload.uploadMultipleFilesToUrlWithData($scope.files, uploadUrl, 0, tempFileId, counter, "", model);

        fileUploadPromise.then(function (response) {

            if (response.status = "200") {
                var model = angular.copy($scope.newVideoModel);  
                model.ReporterVideoIdComma = response.data;


                $http({
                    url: '/api/UploadVideo/AddVideoInfo',
                    method: "POST",
                    data: JSON.stringify(model),
                    contentType: "application/json;charset=utf-8",
                    dataType: 'json'
                }).then(function (response) {

                    if (response.data.isSuccess) {

                      
                        $scope.successMessage = response.data.message;
                        $scope.errorMessage = "";
                        $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.successMessage));
                      //  $scope.newPhotoModel = Object.create(null);

                        window.scrollTo(0, 0);

                        document.getElementById('upload-files').value = null;
                        $scope.newVideoModel = Object.create(null);
                        //$scope.AttachmentUrl = null;
                      
                        $rootScope.loading = false;

                        window.location.href = "/Home/index";
                    }

                    else {
                        $scope.errorMessage = response.data.message;
                        window.scrollTo(0, 0);
                        $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
                        $rootScope.loading = false;
                        
                    }

               

                });

            }



        });





        // }

    }

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








