/**
 * Created by manuel on 4/24/18.
 */
angular.module('MessageApp').controller('GroupsMessagesController', ['$http', '$log', '$scope', '$location', '$routeParams',
    function($http, $log, $scope, $location, $routeParams) {
        // This variable lets you access this controller
        // from within the callbacks of the $http object

        console.log(this);
        var thisCtrl = this;

        // This variable hold the information on the part
        // as read from the REST API
        var groupsMessages = {};
        this.messagesList = [];

        this.loadGroupMessages = function(){
            // Get the target part id from the parameter in the url
            // using the $routerParams object
            var gid = $routeParams.gid;

            // Now create the url with the route to talk with the rest API
            var reqURL = "http://localhost:5000/MessageApp/groups/" + gid +"/messages";
            console.log("reqURL: " + reqURL);
            // Now issue the http request to the rest API
            $http.get(reqURL).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    // assing the part details to the variable in the controller
                    thisCtrl.messagesList = response.data.Messages_in_group;
                    console.log(response.data.Messages_in_group);
                }, //Error function
                function (response) {
                    // This is the error function
                    // If we get here, some error occurred.
                    // Verify which was the cause and show an alert.
                    var status = response.status;
                    //console.log("Error: " + reqURL);
                    //alert("Cristo");
                    if (status == 0) {
                        alert("No hay conexion a Internet");
                    }
                    else if (status == 401) {
                        alert("Su sesion expiro. Conectese de nuevo.");
                    }
                    else if (status == 403) {
                        alert("No esta autorizado a usar el sistema.");
                    }
                    else if (status == 404) {
                        alert("No se encontro la informacion solicitada.");
                    }
                    else {
                        alert("Error interno del sistema.");
                    }
                }
            );
        };

        this.postNewMessage = function(){

            var chat = document.getElementById("chat");
            var sender = document.getElementById("sender");
            var content = document.getElementById("content");

            if(sender && content != null){
                $("#chat").append("<tr><th>Sent by: </th><th>"+sender.value+"</th></tr><tr><th>Content: </th><th>"+content.value+"</th></tr><tr><th>Date: </th><th>"+new Date()+"</th></tr>");
            }

            /*
            // Get the target part id from the parameter in the url
            // using the $routerParams object
            var gid = $routeParams.gid;

            var sender = document.getElementById("sender");
            var content = document.getElementById("content");

            if(sender && content != null){
                // Now create the url with the route to talk with the rest API
                var reqURL = "http://localhost:5000/MessageApp/messages";
                console.log("reqURL: " + reqURL);
                // Now issue the http request to the rest API
                data = {sender: sender, content: content, gid:gid, a:33, b:44}
                $http.post(reqURL, data).then(
                    // Success function
                    function (response) {
                        $location.url('/groups/' + gid + '/messages');
                    }, //Error function
                    function (response) {
                        // This is the error function
                        // If we get here, some error occurred.
                        // Verify which was the cause and show an alert.
                        var status = response.status;
                        //console.log("Error: " + reqURL);
                        //alert("Cristo");
                        if (status == 0) {
                            alert("No hay conexion a Internet");
                        }
                        else if (status == 401) {
                            alert("Su sesion expiro. Conectese de nuevo.");
                        }
                        else if (status == 403) {
                            alert("No esta autorizado a usar el sistema.");
                        }
                        else if (status == 404) {
                            alert("No se encontro la informacion solicitada.");
                        }
                        else {
                            alert("Error interno del sistema.");
                        }
                    }
                );
            }*/
        };

        this.loadGroupMessages();
}]);