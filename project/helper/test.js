let model = require('../model/member')
model.useMember({mem_username:'admidn', mem_password:'password56'},function (err, value) {
  if (err) {
    console.log(err);
  } else {
    console.log(value.length);
  }
})
