function get(){
    var history = localStorage.getItem('history') || "[]";
    var arr = JSON.parse(history)
  return arr;
}
function render(){
  var arr = get();
  var htmstr =  template("temp",{arr:arr});
  $('.main').html(htmstr);
  console.log({arr:arr})
}

render();

// 输入 转存本地stroge
$('.lt-body .mui-btn-primary').click(function(){
    //拿到输入框的值
    var val = $('.lt-body .top input ').val().trim()
    // 输入的值不为空
    if(val){
        // 输入框初始化
        $('.lt-body .top input ').val('');
        // 输入框的值, 加入到 本地 storage
        //先取值,拿到数组
        var list = get();
        // 判断数组中, 有没有刚输入的值
        var idx = list.indexOf(val) ;
        if( idx != -1){
         // 说明数组中有刚输入的值
        //  删除数组中原有的值
        list.splice(idx,1)
        }
        // 往数组中添加值, 
        list.unshift(val)
        // 将数组转变为字符串, 存进本地
        localStorage.setItem('history',JSON.stringify(list));
        // 带着搜索的字段, 跳转到搜索列表
        location.href = 'searchList.html?' + val;
    }
    

})

// 点击清除 localstorge
$('.lt-body .main').on('click','.clear_btn',function(){
//   alert(1)
localStorage.removeItem('history');
// 渲染
render();
})

// 点击单个清除 localstorge
$('.lt-body .main').on('click','.remove',function(){
//拿到data-idx
console.log($(this).data("idx"));
// 取localstroge  
var list = get();
// 删掉该数组的这一项
list.splice($(this).data("idx"),1);
// 重新存入 本地
localStorage.setItem('history',JSON.stringify(list));
// 渲染
render();
})

$('.lt-body .main').on('click','a',function(){
//   alert(1)
// 跳转页面, 带本条数据的内容

console.log($(this).text())
var txt = $(this).text();
location.href = 'searchList.html?' + txt;
})