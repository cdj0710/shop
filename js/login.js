$('.log_btn').click(function(e){
    e.preventDefault();
//   alert(1)
console.log($(['name=username']));
if($("[name=username]").val().trim() == ""){
   mui.toast('用户名不能为空');
   return;
}
//
if($("[name=password]").val().trim() == ""){
    mui.toast('密码不能为空');
    return;
 }
// 发送请求
$.ajax({
    url:'/user/login',
    type:'POST',
    data:$('.move_body form').serialize(),
    success:function(res){
      console.log(res);
      if(res.error == 403){
        mui.toast('用户名或密码错误');

      }
     
      if(res.success){
        var from = location.search.split('=')[1];
         if(from){
            location.href = location.search.split('=')[1];
         }else{
            //  也有可能不是从别的页面进来的
            location.href = 'login.html'
         }
      }
    }

})

})