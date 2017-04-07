var app = angular.module('ip', [])

app.controller('ipController', ['$scope', '$http', function ($scope, $http) {
  $scope.state = true
  $scope.type = [{tc_id:1, tc_name:'BANK'}, {tc_id:2, tc_name:'NONE BANK'}];
  $scope.listCustomer;
  $scope.getCustomer = function(id){
    $http.get('/ip/customer/'+id).then(value => {
      console.log(value.data);
      $scope.listCustomer = value.data;
      console.log($scope.listCustomer);
    },error=>{
      console.log(error);
    })
  }
  $http.get('/ip/use').then(value => {
    $scope.use = value.data;
  },error => {
    console.log(error);
  })
  $scope.clear = function(){
    $scope.chosseAis = null;
    $scope.chosseDtac = null;
    $scope.idCustomer = null;
  }
  $scope.save = function(){

    let data = {
      save:{
        uc_ai:$scope.chosseAis['ai_id'],
        uc_dt:$scope.chosseDtac['dt_id'],
        uc_cu:Number($scope.idCustomer),
        uc_name:$scope.chosseAis['ai_name']+"-"+$scope.chosseDtac['dt_name']
      },
      update:{
        ai_id:$scope.chosseAis['ai_id'],
        dt_id:$scope.chosseDtac['dt_id']
      },
      list:{
        dtac:$scope.chosseDtac['ai_ip'],
        ais:$scope.chosseAis['ai_ip']
      }
    }
    console.log(data);
    $http.post('/ip/pack',data).then(value => {
      console.log(value.data);
      window.location = window.location.pathname;
      $scope.clear();
    }, error=>{
      console.log(error);
    });
  }
  $scope.check = false
  $scope.aisCl = function (dal) {

    if (checkip(dal.ip)) {
      $scope.check = false
      var ValDate = document.getElementById('ipais')
      dal.date = ValDate.value
      dal.type = 1
      $scope.ais = null
      ValDate.value = null
      saveIp(dal, function (err, value) {
        if (err == null) {
          location.reload();
        } else {
          alert('server error ')
        }
      })

    } else {
      $scope.check = true;
    }

  }

  $scope.addPackageAis =(index)=>{
    $scope.chosseAis = $scope.dataAis[index];
  }
  $scope.addPackageDtac = (index) => {
    $scope.chosseDtac = $scope.dataDtac[index];
  }
  $scope.useIP = ()=>{
    chang();
  };
  getData(1, function (err, value) {
    let data = (err == null && value.length > 0 ) ? value : null

    $scope.dataAis = data
  })
  getData(2, function (err, value) {
    let data = (err == null && value.length > 0) ? value : err

      $scope.dataDtac = data;




  })
  $scope.check_d = false
  $scope.dtacCl = function (dal) {
    if (checkip(dal.ip)) {
      $scope.check_d = false

      var ValDate = document.getElementById('ipdtac')
      dal.date = ValDate.value
      dal.type = 2
      ValDate.value = null
      $scope.dtac = null

      saveIp(dal, function (err, value) {
        if (err == null) {

              location.reload();


        } else {
          alert('server error')
        }
      })
    } else {
      $scope.check_d = true
    }

  }
  function saveIp (data, cb) {
    $http.post('/ip/save', data).then(function (value) {
      console.log(value)
      cb(null, value.data)
    }, function (err) {
      console.log(err)
      cb(err, null)
    })
  }
  function getData (type, cb) {
    $http.get('/ip/type/' + type).then((val) => { cb(null, val.data) }, (error) => { cb(error, null) })
  }
}])
