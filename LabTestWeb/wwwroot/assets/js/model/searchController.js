eSenderApp.controller("searchController", function ($scope, $http, $rootScope, $window, $sce, $location) {

    $rootScope.loading = true;

    $scope.newStoryModel = Object.create(null);

    $scope.save = function () {
        //var validator = $("#tempForm").parsley();

        //validator.validate();

        //if (validator.isValid()) {
        $scope.saveAfterValidate();
        //}
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

        var model = angular.copy($scope.newStoryModel);

        $http({
            url: '/api/ReporterStory/AddOrEdit',
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
    $scope.loadAllReporterStorylist = function () {
        $scope.ReporterStoryList = [];
      
        $http({
            url: '/api/ReporterStory/GetAllReporterStoryList',
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
        if ($scope.DateFrom != null) {
            var DateFrom = convertIntoSqlYYYYMMDD($scope.DateFrom);
        }
        if ($scope.DateTo != null) {
            var DateTo = convertIntoSqlYYYYMMDD($scope.DateTo);
        }

        if ($("input[name='SearchRadio'][value='Story']").prop("checked") == true) {
            $http.get("/api/ReporterStory/GetReporterStoryTagSearchList?ReporterStoryHeadingSearch=" + $scope.reporterStoryHeadingSearch + "&From=" + DateFrom + "&To=" + DateTo + "&reporterStoryTag=" + $scope.reporterStoryTag).then(function (response) {
                //$http.get("/api/SectionInfo/GetSectionsByFilter?departmentId=" + $scope.DepartmentId + "&courseId=" + $scope.newSection.CourseId + "&semesterId=" + $scope.SemesterId)
                $rootScope.loading = false;
                $scope.ReporterStoryList = response.data;
            });

        }

        
        if ($("input[name='SearchRadio'][value='Photo']").prop("checked") == true) {
            $http.get("/api/ReporterPhoto/GetReporterPhotoTagSearchList?ReporterStoryHeadingSearch=" + $scope.reporterStoryHeadingSearch + "&From=" + DateFrom + "&To=" + DateTo + "&reporterStoryTag=" + $scope.reporterStoryTag).then(function (response) {
                //$http.get("/api/SectionInfo/GetSectionsByFilter?departmentId=" + $scope.DepartmentId + "&courseId=" + $scope.newSection.CourseId + "&semesterId=" + $scope.SemesterId)
                $rootScope.loading = false;
                $scope.ReporterPhotoList = response.data;
            });

        }
        if ($("input[name='SearchRadio'][value='Video']").prop("checked") == true) {
            $http.get("/api/ReporterVideo/GetReporterVideoTagSearchList?ReporterStoryHeadingSearch=" + $scope.reporterStoryHeadingSearch + "&From=" + DateFrom + "&To=" + DateTo + "&reporterStoryTag=" + $scope.reporterStoryTag).then(function (response) {
                //$http.get("/api/SectionInfo/GetSectionsByFilter?departmentId=" + $scope.DepartmentId + "&courseId=" + $scope.newSection.CourseId + "&semesterId=" + $scope.SemesterId)
                $rootScope.loading = false;
                $scope.ReporterVideoList = response.data;
            });
        }

        $rootScope.loading = false;
    //if ($scope.Story = 'Story') {

    //    $http.get("/api/ReporterStory/GetReporterStoryTagSearchList?ReporterStoryHeadingSearch=" + $scope.reporterStoryHeadingSearch + "&From=" + DateFrom + "&To=" + DateTo + "&reporterStoryTag" + $scope.reporterStoryTag).then(function (response) {
    //        //$http.get("/api/SectionInfo/GetSectionsByFilter?departmentId=" + $scope.DepartmentId + "&courseId=" + $scope.newSection.CourseId + "&semesterId=" + $scope.SemesterId)
    //        $rootScope.loading = false;
    //        $scope.ReporterStoryList = response.data;
    //    });
    //}
    //if ($scope.Photo = 'Photo') {

    //    $http.get("/api/ReporterPhoto/GetReporterPhotoTagSearchList?ReporterStoryHeadingSearch=" + $scope.reporterStoryHeadingSearch + "&From=" + DateFrom + "&To=" + DateTo + "&reporterStoryTag" + $scope.reporterStoryTag).then(function (response) {
    //        //$http.get("/api/SectionInfo/GetSectionsByFilter?departmentId=" + $scope.DepartmentId + "&courseId=" + $scope.newSection.CourseId + "&semesterId=" + $scope.SemesterId)
    //        $rootScope.loading = false;
    //        $scope.ReporterPhotoList = response.data;
    //    });
    //}
    //$http.get("/api/RoomBooking/GetSearchRoutineByRoomBookingRoomList?RoomId=" + $scope.newSearchRoutine.RoomId + "&semesterId=" + $scope.newSearchRoutine.SemesterId).then(function (response) {
    //    //$http.get("/api/SectionInfo/GetSectionsByFilter?departmentId=" + $scope.DepartmentId + "&courseId=" + $scope.newSection.CourseId + "&semesterId=" + $scope.SemesterId)
    //    $rootScope.loading = false;
    //    $scope.RoutineByRoomBookingRoomList = response.data;
    //});
    };

    $scope.view = function (reporterStoryId) {
        $rootScope.loading = true;
        $scope.editReporterStory = false;
        $scope.myStory = true;
        //$scope.myStoryModel = Object.create(null);

       
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