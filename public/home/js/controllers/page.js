 app.controller('PrivacyCtrl', function($scope,$rootScope, Pages,$sce) {
    $scope.params={};
    $scope.params.type="Privacy Policy"; 
    Pages.all($scope.params).then(function(res) {         
        $scope.aboutus = res.data; 
        $scope.myHtmlVar= $sce.trustAsHtml($scope.aboutus[0].description);
        $scope.heading= $sce.trustAsHtml($scope.aboutus[0].type);
    });
});


app.controller('AboutusCtrl', function($scope,$rootScope, Pages,$sce) {
    $scope.params={};
    $scope.params.type="About Us"; 
    Pages.all($scope.params).then(function(res) {         
        $scope.aboutus = res.data; 
        $scope.myHtmlVar= $sce.trustAsHtml($scope.aboutus[0].description);
        $scope.heading= $sce.trustAsHtml($scope.aboutus[0].type);
    });
});

app.controller('TermsCtrl', function($scope,$rootScope, Pages,$sce) {
    $scope.params={};
    $scope.params.type="Terms And Conditions"; 
    Pages.all($scope.params).then(function(res) {         
        $scope.aboutus = res.data; 
        $scope.myHtmlVar= $sce.trustAsHtml($scope.aboutus[0].description);
        $scope.heading= $sce.trustAsHtml($scope.aboutus[0].type);
    });
});


app.controller('ContactCtrl', function($scope,$rootScope, Pages,$sce) {
    
    $scope.errormessage= "";
    $scope.successmessage= "";

    $scope.sendcontat=function(){
        
        Pages.contact(this.user).then(function(res) {

          if (res.error==0) {
            $scope.successmessage="User registered successfully.";
            console.log(res);
          } else {
            $scope.errormessage=res.message;
            console.log(res);
          }
        });  
        
      }  
});