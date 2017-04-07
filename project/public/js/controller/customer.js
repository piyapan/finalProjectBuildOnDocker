app.controller('CustomerFromController', ['$scope', '$http', function ($scope, $http) {
  $scope.type = [{tc_id: 1, tc_name: 'BANK'}, {tc_id: 2, tc_name: 'NON-BANK'}]
  $scope.temp

  $scope.check = false
  $scope.success = false
  $scope.with = false
  $scope.add = function (value) {
    if (isValid(value.c_name)) {
      $scope.check = true
    } else {
      $scope.check = false
      var number = $scope.type.find((item) => {
        return item.tc_id == value.c_type
      })

      $http.post('/setting/customer/save', value).then(
          value => {
            $scope.temp.push(value.data[0])
            $scope.success = true
            $scope.with = false
            $scope.check = false
            $scope.data = null
          }, error => {
        $scope.with = true
        $scope.success = false
      })
    }
  }
  $scope.check_e = false
  $scope.success_e = false
  $scope.error_e = false
  $scope.edit = function (index) {
    $scope.select = $scope.temp[index]

    showEdite()
    $scope.update = function () {
      if (isValid($scope.select['c_name'])) {
        $scope.check_e = true
      } else {
        $http.post('/setting/customer/editcus', $scope.select).then(value => {
          hideEdite()
          $scope.temp[index]['c_name'] = $scope.select['c_name']
          $scope.temp[index]['c_type'] = $scope.select['c_type']
          let name = $scope.type.find((item) => {
            return item.tc_id == $scope.select['c_type']
          })
          $scope.temp[index]['tc_id'] = $scope.select['c_type']
          $scope.temp[index]['tc_name'] = name['tc_name']
          $scope.error_e = false
          $scope.success_e = true
        }, error => {
          $scope.success_e = false
          $scope.msg = error
          $scope.error_e = true
        })
      }
    }
  }
  $scope.delete = function (index) {
    $http.get('/setting/customer/deletecus/' + $scope.temp[index]['c_id']).then(value => {
      $scope.temp.splice(index, 1)
    }, error => {
      alert('server error')
    })
  }

  $http.get('/setting/customer/list').then(value => {
    $scope.temp = value.data
  }, error => {
    alert('ระบบขัดข้อง')
  })
}])
function hideEdite () {
  $('#CusEdit').modal('hide')
}

function showEdite () {
  $('#CusEdit').modal('show')
}
