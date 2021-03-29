eSenderApp.controller("UploadPhotoController", function ($scope, $http, $rootScope, $window, $sce, $location, fileUpload) {

    // $rootScope.loading = true;
    $scope.editReporterStory = false;
    $scope.myStory = true;


    $scope.upload = function () {
       
        var validator = $("#tempForm").parsley();

        validator.validate();

        if (validator.isValid()) {
            var file = $scope.AttachmentUrl;
            if (file != null && file != "" && file.size != null && file != "unidefined") {
                $rootScope.loading = true;
                $scope.uploadAfterValidate();
            }
            else {

                //$scope.successMessage = response.data.message;
                $scope.errorMessage = "Please Upload Photo";
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
                $rootScope.loading = false;
            }
        }
       
    }
    $scope.getFileDetails = function (e) {
        var fileInput =
            document.getElementById('upload-files');

        var filePath = fileInput.value;

        // Allowing file type 
        var allowedExtensions =
            /(\.jpg|\.jpeg)$/i;

        if (!allowedExtensions.exec(filePath)) {
            $scope.errorMessage = "Only JPG/JPEG images files are allowed. Please upload JPEG/JPG files";
            $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
            fileInput.value = '';
            window.scrollTo(0, 0);
            return false;
        }
        else {
            $scope.files = [];

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }
        }
       

    };
    
    $scope.uploadAfterValidate = function () {

        
     
            var modelData = angular.copy($scope.newPhotoModel);

            var uploadUrl = "/api/UploadPhoto/Upload";
            var counter = 1;

            var d = new Date();
            var tempFileId = d.getTime();
            var model = angular.copy($scope.newPhotoModel);
            var fileUploadPromise = fileUpload.uploadMultipleFilesToUrlWithData($scope.files, uploadUrl, 0, tempFileId, counter, "", model);

            fileUploadPromise.then(function (response) {

                if (response.status = "200") {
                    var model = angular.copy($scope.newPhotoModel);
                    model.ReporterPhotoIdComma = response.data;
                    $http({
                        url: '/api/UploadPhoto/AddPhotoInfo',
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

                            //document.getElementById('attachment').value = null;
                            //$scope.AttachmentUrl = null;
                            $scope.newPhotoModel = Object.create(null);
                            $rootScope.loading = false;
                            window.location.href = "/Home/index";
                        }

                        else {
                            $scope.errorMessage = response.data.message;
                            window.scrollTo(0, 0);
                            $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
                            $rootScope.loading = false;
                            //location.reload();
                        }



                    });

                }
                else if (response.status = "413") {

                    $scope.errorMessage = "Upload size limit exceeded";
                    window.scrollTo(0, 0);
                    $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
                    $rootScope.loading = false;
                }
                else {

                    $rootScope.loading = false;
                }

            });

        

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








