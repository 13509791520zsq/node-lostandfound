Array.prototype.indexOf = function(val) { 
  for (var i = 0; i < this.length; i++) { 
  if (this[i] == val) return i; 
  } 
  return -1; 
};
Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
    this.splice(index, 1); 
    } 
};
var emp = [{name:'1'},{name:'2'},{name:'3'},{name:'4'},{name:'5'},]
var a = [1,2,3,4,5,6]
console.log(a.indexOf(4))
console.log(emp.indexOf({'name':'5'}))
emp.remove({name: '1'})
console.log(emp)