angular.module('app.services', [])

.factory('Api', function ($http, $q) {

// Direccion donde se piden los datos
var url = "http://localhost:8000/";
// var url = "http://192.168.8.101:8080/farmacia/public/";

    return {
        data:{
        },
        all: function(ruta) {
            defer = $q.defer();
            $http.get( url + ruta)
              .success(function (data){
                defer.resolve(data);
              })
              .error(function (data){
                defer.reject();
              })
            return defer.promise; 
        },    
        get: function(ruta, valor) {
            defer = $q.defer();
            $http.get( url + ruta + valor)
              .success(function (data){
                defer.resolve(data);
              })
              .error(function (data){
                defer.reject();
              })
            return defer.promise; 
        },
        departamentos: function(ruta) {
            defer = $q.defer();
            $http.get( url + ruta)
              .success(function (data){
                defer.resolve(data);
              })
              .error(function (data){
                defer.reject();
              })
            return defer.promise; 
        }   
        // [
        //     {"id":1,"nombre":"Ahuachapán"},{"id":2,"nombre":"Santa Ana"},{"id":3,"nombre":"Sonsonate"},
        //     {"id":4,"nombre":"La Libertad"},{"id":5,"nombre":"Chalatenango"},{"id":6,"nombre":"San Salvador"},
        //     {"id":7,"nombre":"Cuscatlán"},{"id":8,"nombre":"La Paz"},{"id":9,"nombre":"Cabañas"},{"id":10,"nombre":"San Vicente"},
        //     {"id":11,"nombre":"Usulután"},{"id":12,"nombre":"Morazán"},{"id":13,"nombre":"San Miguel"},{"id":14,"nombre":"La Unión"}
        // ]
    }
});
