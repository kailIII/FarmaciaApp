
angular.module('app', ['ionic', 'app.controllers', 'app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tab.inicio', {
      url: '/inicio',
      views: {
        'inicio': {templateUrl: 'templates/inicio.html', controller: 'InicioCtrl'}
      }
    })
    .state('tab.productos', {
      url: '/productos',
      views: {
        'productos': {templateUrl: 'templates/productos.html', controller: 'ProductosCtrl'}
      }
    })
    .state('tab.producto-detalle', {
      url: '/producto/:productoId',
      views: {'productos': {templateUrl: 'templates/producto-detalle.html', controller: 'ProductoDetalleCtrl'}
      }
    })
    .state('tab.farmacias', {
      url: '/farmacias',
      views: {
        'farmacias': {templateUrl: 'templates/farmacias.html', controller: 'FarmaciasCtrl'}
      }
    })
    .state('tab.farmacia-detalle', {
      url: '/farmacia/:farmaciaId',
      views: {
        'farmacias': {templateUrl: 'templates/farmacia-detalle.html', controller: 'FarmaciaDetalleCtrl'}
      }
    })
    .state('tab.sucursal-detalle', {
      url: '/sucursal/:sucursalId',
      views: {
        'farmacias': {templateUrl: 'templates/sucursal-detalle.html', controller: 'SucursalDetalleCtrl'}
      }
    });

  $urlRouterProvider.otherwise('/tab/inicio');

});

