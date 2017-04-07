let app = angular.module('config',[])
app.controller('controllerConfig',['$scope','$http', function ($scope, $http) {
  let _this = new Object()
   _this.new = $scope;
   _this.service = $http;
      _this.service.get('/config/name').then(value => {
          _this.new.router = value['data'];
      })
     _this.new.getItem = (id, index)=>{
          _this.service.get('/config/name/'+id).then(value => {
            _this.new.pack = _this.new.router[index]
            _this.new.temp = value['data']
          }, error => {
            console.log(error);
            alert('error server');
          })
     }
     _this.service.get('/setting/customer/status').then(value => {
       _this.new.status = value['data']
     },error=>{
       console.log(error);
       alert('error server get status');
     })
     _this.new.OtherItem = (id, index) =>{
       _this.service.get('/config/name/'+id).then(value => {
         _this.new.OtherPaack = _this.new.router[index]
         _this.new.OtherTemp = value['data']
       },error=>{
         console.log(error);
         alert('error server Other router');
       })
     }
     _this.new.base = (routerId, pack)=>{
       _this.service.post('/config/save/'+routerId,pack).then(value => {
         _this.new.cisco = null; // clear form data cisco
         _this.new.airr = null; // clear from data air300
         _this.new.temp.push(value['data'][0])
       }, error=>{
         console.log(error);
         alert('error server temp by save base');
       })
     }
    _this.new.save = (routerId, pack)=>{
      pack['ar_rt'] = routerId;
      _this.service.post('/config/save/'+routerId,pack).then(res => {
        _this.new.simple = null // clear data daat Ohter router
        _this.new.OtherTemp.push(res['data'][0])
      }, err=>{
        console.log(err);
        alert('error server save OtherTemp');
      })
    }
   _this.new.chang = (id, table,index)=>{
     let current = {
       content_id:id,
       table_id:table,
       index:index
     }
     _this.new.current = current;
     console.log(_this.new.current);
     AirrChangModal()
   }
   _this.new.update = ()=>{
     _this.new.current['id_cs'] = Number(_this.new.idStatus);

     $http.post('/config/chang', _this.new.current).then(value => {
       location.reload();
     },error=>{
       alert('server error chang config');
     })
   }
}])





function CommentCisco() {
  $('#CiscoModal').modal('toggle');
}
function ChangCisco() {
  $('#CiscoChangModal').modal('toggle');
}
function AirrComment() {
  $('#AirrModal').modal('toggle');
}
function AirrChangModal() {
  $('#AirrChangModal').modal('toggle');
}
