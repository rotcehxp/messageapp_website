/**
 * Created by manuel on 4/24/18.
 */
angular.module('messageapp').controller('GroupsController', ['$http', '$log', '$scope', '$location',
    function($http, $log, $scope, $location) {
        var thisCtrl = this;

        this.groupList = [];
        this.counter  = 2;
        this.newText = "";

        this.groups = function(){
            // Get the list of groups from the servers via REST API

            // First set up the url for the route
            var url = "http://localhost:5000/messageapp/groups";

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.groupList = response.data.Groups;

            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){
                    alert("No se encontro la informacion solicitada.");
                }
                else {
                    alert("Error interno del sistema.");
                }
            });

            $log.error("Groups Loaded: ", JSON.stringify(thisCtrl.groupList));
        };
        this.partDetails = function (pid) {
            $location.url('/partsdetails/' + pid);
        }
        this.loadParts();

}]);
