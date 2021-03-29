eSenderApp.controller("newStoryController", function ($scope, $http, $rootScope, $window, $sce, $location, fileUpload) {

    //$rootScope.loading = true;

    $scope.newStoryModel = Object.create(null);

    $scope.save = function () {
        var validator = $("#tempForm").parsley();

        validator.validate();

        if (validator.isValid()) {
            var isValid = true;
            var file = $scope.AttachmentUrl;
            if (file == undefined) {
                $scope.saveAfterValidate();
            }
            else {

                if (file.type == "image/jpeg" || file.type == "image/jpg") {
                    isValid = true;
                }
                else {
                    isValid = false;
                    $scope.errorMessage = "Only JPG/JPEG images files are allowed. Please upload JPEG/JPG files";
                    $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
                    window.scrollTo(0, 0);
                }
                if (isValid) {
                    $scope.saveAfterValidate();

                }
            }
        }
    }

    $scope.Submit = function () {
        var validator = $("#tempForm").parsley();

        validator.validate();

        if (validator.isValid()) {

            var isValid = true;
            var file = $scope.AttachmentUrl;
            if (file == undefined) {
                $scope.SubmitAfterValidate();
            }
            else {

                if (file.type == "image/jpeg" || file.type == "image/jpg") {
                    isValid = true;
                }
                else {
                    isValid = false;
                    $scope.errorMessage = "Only JPG/JPEG images files are allowed. Please upload JPEG/JPG files";
                    $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
                    window.scrollTo(0, 0);
                }
                if (isValid) {
                    $scope.SubmitAfterValidate();

                }
            }


        }
    }

    $scope.saveAfterValidate = function () {
        $rootScope.loading = true;
        $scope.errorMessage = "";

        var model = angular.copy($scope.newStoryModel);

        if ($("input[name='radiostory'][value='Open']").prop("checked") == true) {
            model.ReporterStoryType = 'Open';
        }

        if ($("input[name='radiostory'][value='Exclusive']").prop("checked") == true) {
            model.ReporterStoryType = 'Exclusive';
        }


        $http({
            url: '/api/ReporterStory/AddOrEdit',
            method: "POST",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            dataType: 'json'
        }).then(function (response) {

            if (response.data.isSuccess) {
                var reporterId = response.data.result.reporterStoryId;
                var header = response.data.result.reporterStoryHeading;
                var file = $scope.AttachmentUrl



                if (file != null && file != "" && file.size != null) {
                    $scope.uploadAfterValidate(reporterId, header);
                }
                //$scope.showForm = false;
                $scope.successMessage = response.data.message;
                $scope.errorMessage = "";
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.successMessage));
                $scope.newStoryModel = Object.create(null);
                window.scrollTo(0, 0);              
                $rootScope.loading = false;
                window.location.href = "/Home/index";

            }
            else {
                $scope.successMessage = "";
                $scope.errorMessage = response.data.message;
                window.scrollTo(0, 0);
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
            }
            $rootScope.loading = false;

        });
    }
    $scope.SubmitAfterValidate = function () {
        $rootScope.loading = true;
        $scope.errorMessage = "";

        var model = angular.copy($scope.newStoryModel);
        if ($("input[name='radiostory'][value='Open']").prop("checked") == true) {
            model.ReporterStoryType = 'Open';
        }
        //else {
        //    model.isDrop = false;
        //}
        if ($("input[name='radiostory'][value='Exclusive']").prop("checked") == true) {
            model.ReporterStoryType = 'Exclusive';
        }

        $http({
            url: '/api/ReporterStory/Submit',
            method: "POST",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            dataType: 'json'
        }).then(function (response) {

            if (response.data.isSuccess) {
                var reporterId = response.data.result.reporterStoryId;
                var header = response.data.result.reporterStoryHeading;
                var file = $scope.AttachmentUrl



                if (file != null && file != "" && file.size != null) {
                    $scope.uploadAfterValidate(reporterId, header);
                }
                //$scope.showForm = false;
                $scope.successMessage = response.data.message;
                $scope.errorMessage = "";
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.successMessage));
                $scope.newStoryModel = Object.create(null);
                //window.scrollTo(0, 0);


            }
            else {
                $scope.successMessage = "";
                $scope.errorMessage = response.data.Message;
                // window.scrollTo(0, 0);
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
            }
            $rootScope.loading = false;

        });
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
    $scope.uploadAfterValidate = function (reporterId, header) {

        var isValid = true;
        var counter = 1;
        var file = $scope.AttachmentUrl;


        // if (isValid) {
        var modelData = angular.copy($scope.newStoryModel);


        var uploadUrl = "/api/UploadPhoto/Upload";


        var d = new Date();
        var tempFileId = d.getTime();

        var fileUploadPromise = fileUpload.uploadMultipleFilesToUrl($scope.files, uploadUrl, 0, tempFileId, counter, "");

        fileUploadPromise.then(function (response) {

            if (response.status = "200") {
                var model = angular.copy($scope.newStoryModel);
                model.reporterphotoidComma = response.data;
                model.ReporterStoryId = reporterId;
                model.PhotoAlbum = header;


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


                        window.scrollTo(0, 0);

                       // document.getElementById('attachment').value = null;

                        window.location.href = "/Home/index";
                    }

                    else {
                        $scope.errorMessage = response.data.message;
                        $scope.successMessage = "";
                        window.scrollTo(0, 0);
                        $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
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