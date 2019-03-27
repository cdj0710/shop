function get(){
    var history = localStorage.getItem('history') || "[]";
    var arr = JSON.parse(history)
  return arr;
}