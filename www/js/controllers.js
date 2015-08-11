angular.module('app.controllers', ['ionic'])

// Inicio
.controller('InicioCtrl', function($scope, $log, $ionicPopover, Api) {

    // Varible para mostrar y ocultar el logo y el loading
    $scope.isLoading = false;
    $scope.departamentos = [];
    $scope.bydepartamento =  window.localStorage['farmacia_ubicacion'];

    $scope.cargarProductos = function(valor){
        $scope.isLoading = true;
        if(valor){
            $scope.productos = Api.get('app/busquedaproductos/', valor).then(function (data) {
                $scope.productos = data;
                $scope.isLoading = false;
            }); 
        }
        else{
            $scope.isLoading = false;
            $scope.productos = [];
        }
    };

    // Popover
        // Abrir y cargar ubicaciones 
        $ionicPopover.fromTemplateUrl('/templates/slices/departamentos.html', { scope: $scope, }).then(function(popover) {$scope.popover = popover; });
        $scope.openPopover = function(){
            Api.departamentos('app/ubicaciones').then(function (data) {$scope.departamentos = data; });
            $scope.popover.show();
        };
        // Guardar Ubicacion
        $scope.select = function(depid, depnom){
            $scope.bydepartamento = window.localStorage['farmacia_ubicacion'] = depnom;
            window.localStorage['farmacia_ubicacion_id'] = depid;
            $scope.popover.hide();
        };

})

// Productos

.controller('ProductosCtrl', function($scope, $ionicPopover, $log, Api) {

    $scope.productos = [];
    $scope.page = 1;
    $ionicPopover.fromTemplateUrl('templates/slices/opcionesProductos.html', {scope: $scope, }).then(function(popover) {$scope.popover = popover; });
    
    $scope.loadMore = function() {
        Api.all('app/productos?page='+ $scope.page).then(function (items) {
            $scope.productos = $scope.productos.concat(items.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (items.last_page == $scope.page) {$scope.noMoreItemsAvailable = true};
            $scope.page += 1;            
        }); 
    };

})

.controller('ProductoDetalleCtrl', function($scope, $log, $ionicPopover,$stateParams, Api) {

    $scope.producto = [];
    $scope.sucursales = [];
    $scope.departamentos = [];

    Api.get('app/producto/', $stateParams.productoId).then(function (data) {
         $scope.producto = data;
         $scope.disponible(window.localStorage['farmacia_ubicacion_id']);// En el back-end 0 = a todos los departamentos
    });  
    
    $scope.disponible = function(dep) { // Carga las sucursales que tienen el producto
        Api.all('app/productodetalle/' + $stateParams.productoId + '/' + dep).then(function (data) {
         $scope.sucursales = data;
        });
    };

    // Popover
        // Abrir y cargar ubicaciones 
        $ionicPopover.fromTemplateUrl('/templates/slices/departamentos.html', { scope: $scope, }).then(function(popover) {$scope.popover = popover; });
        $scope.openPopover = function(){
            Api.departamentos('app/ubicaciones').then(function (data) {$scope.departamentos = data; });
            $scope.popover.show();
        };
        // Guardar Ubicacion
        $scope.select = function(depid, depnom){
            $scope.disponible(depid);// Filtra por el id del departamento seleccionado.
            $scope.bydepartamento = window.localStorage['farmacia_ubicacion'] = depnom;
            window.localStorage['farmacia_ubicacion_id'] = depid;
            $scope.popover.hide();
        };

})

// Farmacias

.controller('FarmaciasCtrl', function($scope, $ionicPopover, Api) {

    $scope.farmacias = [];
    $scope.page=1;
    $ionicPopover.fromTemplateUrl('templates/slices/opcionesFarmacias.html', {scope: $scope, }).then(function(popover) {$scope.popover = popover; });
    
    $scope.loadMore = function() {
        Api.all('app/farmacias?page='+$scope.page).then(function (items) {
            $scope.farmacias = $scope.farmacias.concat(items.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (items.last_page == $scope.page) {$scope.noMoreItemsAvailable = true};
            $scope.page +=1;
        });
    };


})

.controller('FarmaciaDetalleCtrl', function($scope, $stateParams, Api) {

    $scope.farmacia = [];
    $scope.sucursales = [];

    $scope.farmacias = Api.get('app/farmacia/', $stateParams.farmaciaId).then(function (data) {
        $scope.farmacia = data;
        $scope.fSucursales();
    });

    $scope.fSucursales = function(){
        Api.get('app/sucursales/', $stateParams.farmaciaId).then(function (data) {
            $scope.sucursales = data;
        });
    };
   
})

.controller('SucursalDetalleCtrl', function($scope, $stateParams, Api) {

    $scope.sucursal = [];

    Api.get('app/sucursal/', $stateParams.sucursalId).then(function (data) {
        $scope.sucursal = data;
    });

   
});