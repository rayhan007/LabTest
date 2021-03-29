eSenderApp.controller("indexController", function ($scope, $http, $rootScope, $window, $sce, $location) {

    //$rootScope.loading = true;

    $scope.newStoryModel = Object.create(null);

    
    


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