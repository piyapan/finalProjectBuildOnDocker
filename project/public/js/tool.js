function isValid(str){

  if (befor(str)) {
        return true;
  } else {
    if (befor(str)) {
      return true;
    } else {
        if (searchPosition (str)) {
          return true;
        } else {
            return false;
        }
    }

  }
}
function after(str) {
   return /[~`!#$%\^&*+=\-\[\]\\;,/{}|\\":<>\?]/.test(str);
}
function befor(str) {
  return /[~`!#$%\^&*+=\-\[\]\\;,/{}|\\":<>\?]/g.test(str);
}
function searchPosition (str) {
  if (str.search('"')<0) {
    if (str.search("'")<0) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function checkip(str) {
    if (validator.isIP(pre(str),4)) {

        if (checksub(str)) {

            return true
        }else {

          return false
        }
    } else {

      return false
    }
}
function checksub(str){
  return Number(post(str))>=1 && Number(post(str)) <=32 ;
}
function post(str) {
    return str.substring(str.indexOf('/')+1, str.length);
}
function pre(str) {
return str.substring(0, str.indexOf('/'));
}
