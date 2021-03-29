eSenderApp.controller("myStoryController", function ($scope, $http, $rootScope, $window, $sce, $location, fileUpload) {

    $rootScope.loading = true;
    $scope.editReporterStory = false;
    $scope.myStory = true;

    // $scope.myStoryModel = Object.create(null);

    $scope.save = function () {
        //var validator = $("#tempForm").parsley();

        //validator.validate();

        //if (validator.isValid()) {
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

            }
            if (isValid) {
                $scope.saveAfterValidate();
            }
        }

        //}
    }
    $scope.submit = function () {
        //var validator = $("#tempForm").parsley();

        //validator.validate();

        //if (validator.isValid()) {

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

            }
            if (isValid) {
                $scope.SubmitAfterValidate();
            }
        }

        //}
    }

    $scope.Back = function () {
        $scope.myStory = true;
        $scope.editReporterStory = false;
    }

    $scope.saveAfterValidate = function () {
        $rootScope.loading = true;
        $scope.errorMessage = "";
        $scope.successMessage = "";

        var model = angular.copy($scope.myStoryModel);

        $http({
            url: '/api/ReporterStory/AddOrEdit',
            method: "POST",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            dataType: 'json'
        }).then(function (response) {

            if (response.data.isSuccess) {
                var reporterId = model.reporterStoryId;
                var header = model.reporterStoryHeading;
                var file = $scope.AttachmentUrl
                if (file != null && file != "" && file.size != null) {
                    $scope.uploadAfterValidate(reporterId, header);

                }
                else {
                    $scope.successMessage = response.data.message;
                    $scope.errorMessage = "";
                    $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.successMessage));
                    $scope.editReporterStory = false;
                    $scope.myStory = true;
                    $scope.loadAllReporterStorylist();
                    window.scrollTo(0, 0);  
                    window.location.href = "/Home/index";
                }




            }
            else {
                $scope.successMessage = "";
                $scope.errorMessage = response.data.message;
                // window.scrollTo(0, 0);
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
                $scope.editReporterStory = false;
                $scope.myStory = true;
                $scope.loadAllReporterStorylist();
            }
            $rootScope.loading = false;

        });
    }

    $scope.SubmitAfterValidate = function () {
        $rootScope.loading = true;
        $scope.errorMessage = "";
        $scope.successMessage = "";

        var model = angular.copy($scope.myStoryModel);

        $http({
            url: '/api/ReporterStory/Submit',
            method: "POST",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            dataType: 'json'
        }).then(function (response) {

            if (response.data.isSuccess) {
                var reporterId = model.reporterStoryId;
                var header = model.reporterStoryHeading;
                var file = $scope.AttachmentUrl
                if (file != null && file != "" && file.size != null) {
                    $scope.uploadAfterValidate(reporterId, header);
                    $scope.successMessage = response.data.message;
                    $scope.errorMessage = "";
                    $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.successMessage));
                    $scope.editReporterStory = false;
                    $scope.myStory = true;
                    $scope.loadAllReporterStorylist();
                }
                else {
                    $scope.successMessage = response.data.message;
                    $scope.errorMessage = "";
                    $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.successMessage));
                    $scope.editReporterStory = false;
                    $scope.myStory = true;
                    $scope.loadAllReporterStorylist();
                    window.location.href = "/Home/index";
                }
                


            }
            else {
                $scope.errorMessage = response.data.message;
                $scope.successMessage = "";
                // window.scrollTo(0, 0);
                $scope.MessageHtml = $sce.trustAsHtml(angular.copy($scope.errorMessage));
                $scope.editReporterStory = false;
                $scope.myStory = true;
                $scope.loadAllReporterStorylist();
            }
            $rootScope.loading = false;

        });
    }

    $scope.loadAllReporterStorylist = function () {
        $scope.ReporterStoryList = [];
        $rootScope.loading = true;
        $http({
            url: '/api/ReporterStory/GetAllReporterMyStoryList',
            method: "GET"
        }).then(function (response) {
            $scope.ReporterStoryList = response.data;
            $rootScope.loading = false;
        });

    };

    $scope.loadAllReporterStorylist();

    $scope.Search = function () {
        $scope.ReporterStoryList = [];
        $rootScope.loading = true;
        //if ($scope.DateFrom = 'undefined') {

        //    $scope.DateFrom = '0';
        //}
        //if ($scope.DateTo = 'undefined') {

        //    $scope.DateTo = '0';
        //}
        //var model = {};
        // var To = {};
        if ($scope.DateFrom != null) {
            var DateFrom = convertIntoSqlYYYYMMDD($scope.DateFrom);
        }
        if ($scope.DateTo != null) {
            var DateTo = convertIntoSqlYYYYMMDD($scope.DateTo);
        }
        //var DateFrom = convertIntoSqlYYYYMMDD($scope.DateFrom);
        //var DateTo = convertIntoSqlYYYYMMDD($scope.DateTo);

        $http.get("/api/ReporterStory/GetReporterStorySearchList?ReporterStoryHeadingSearch=" + $scope.reporterStoryHeadingSearch + "&From=" + DateFrom + "&To=" + DateTo).then(function (response) {
            //$http.get("/api/SectionInfo/GetSectionsByFilter?departmentId=" + $scope.DepartmentId + "&courseId=" + $scope.newSection.CourseId + "&semesterId=" + $scope.SemesterId)
            $rootScope.loading = false;
            $scope.ReporterStoryList = response.data;
        });
        //$http.get("/api/RoomBooking/GetSearchRoutineByRoomBookingRoomList?RoomId=" + $scope.newSearchRoutine.RoomId + "&semesterId=" + $scope.newSearchRoutine.SemesterId).then(function (response) {
        //    //$http.get("/api/SectionInfo/GetSectionsByFilter?departmentId=" + $scope.DepartmentId + "&courseId=" + $scope.newSection.CourseId + "&semesterId=" + $scope.SemesterId)
        //    $rootScope.loading = false;
        //    $scope.RoutineByRoomBookingRoomList = response.data;
        //});
    };

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

    $scope.edit = function (reporterStoryId) {
        $scope.editReporterStory = true;
        $scope.myStory = false;
        //$scope.myStoryModel = Object.create(null);

        $rootScope.loading = true;
        //$scope.myStoryModel = [];

        $http.get("/api/ReporterStory/GetReporterStoryById/" + reporterStoryId).then(function (response) {

            $scope.myStoryModel = response.data;
            if (response.data.reporterStoryType == "Open") {
                //$("input[name='radiostory'][value='Open']").prop("checked") == true



                $scope.myStoryModel.reporterStoryType == "Open";


            }
            if (response.data.reporterStoryType == "Exclusive") {

                $scope.myStoryModel.reporterStoryType = "Exclusive";

                // $("input[name='radiostory'][value='Exclusive']").prop("checked") == true
            }

            // $scope.myStoryModel.ReporterStoryHeading = response.data.ReporterStoryHeading;
            //$scope.selectedCourse.FacultyInfoId = '' + $scope.selectedCourse.FacultyInfoId + '';
            //$scope.OldSeatCapacity = $scope.selectedCourse.SeatCapacity;
            //$scope.FacultyInfoId = $scope.selectedCourse.FacultyInfoId;

            $rootScope.loading = false;
            // $('#editRoutineModal').modal('show');
            //  $scope.editReporterStory = false;
            //$scope.myStory = true;

        });

        $http.get("/api/ReporterPhoto/GetReporterPhotoListEdit/" + reporterStoryId).then(function (response) {

            $scope.ReporterPhotoListEditList = response.data;

            // $scope.myStoryModel.ReporterStoryHeading = response.data.ReporterStoryHeading;
            //$scope.selectedCourse.FacultyInfoId = '' + $scope.selectedCourse.FacultyInfoId + '';
            //$scope.OldSeatCapacity = $scope.selectedCourse.SeatCapacity;
            //$scope.FacultyInfoId = $scope.selectedCourse.FacultyInfoId;

            $rootScope.loading = false;
            // $('#editRoutineModal').modal('show');
            //  $scope.editReporterStory = false;
            //$scope.myStory = true;

        });

    }

    $scope.view = function (reporterStoryId) {
        $scope.editReporterStory = false;
        $scope.myStory = true;
        //$scope.myStoryModel = Object.create(null);

        $rootScope.loading = true;
        //$scope.myStoryModel = [];

        $http.get("/api/ReporterStory/GetReporterStoryById/" + reporterStoryId).then(function (response) {

            $scope.View = response.data.reporterStoryBody;
            // $scope.myStoryModel.ReporterStoryHeading = response.data.ReporterStoryHeading;
            //$scope.selectedCourse.FacultyInfoId = '' + $scope.selectedCourse.FacultyInfoId + '';
            //$scope.OldSeatCapacity = $scope.selectedCourse.SeatCapacity;
            //$scope.FacultyInfoId = $scope.selectedCourse.FacultyInfoId;

            $rootScope.loading = false;
            // $('#editRoutineModal').modal('show');
            //  $scope.editReporterStory = false;
            //$scope.myStory = true;

        });

    }

    $scope.uploadAfterValidate = function (reporterId, header) {

        var isValid = true;
        var counter = 1;
        var file = $scope.AttachmentUrl;


        // if (isValid) {
        var modelData = angular.copy($scope.myStoryModel);


        var uploadUrl = "/api/UploadPhoto/Upload";


        var d = new Date();
        var tempFileId = d.getTime();

        var fileUploadPromise = fileUpload.uploadMultipleFilesToUrl($scope.files, uploadUrl, 0, tempFileId, counter, "");

        fileUploadPromise.then(function (response) {

            if (response.status = "200") {
                var model = angular.copy($scope.myStoryModel);
                model.reporterphotoidComma = response.data;
                model.ReporterStoryId = reporterId;
                model.PhotoAlbum = header;


                $http({
                    url: '/api/UploadPhoto/UpdatePhotoInfo',
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
                        $scope.successMessage = "";
                        $scope.errorMessage = response.data.message;
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