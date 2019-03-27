$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function(res){
      console.log(res);
      $('.move_body').html(template('user',res))
      
    }
})

// 点击退出
$('.lt-body').on('click','button',function(){
//   alert(1)
$.ajax({
    url:'/user/logout',
    type:'get',
    success:function(res){
        console.log(res);
        location.href= 'login.html?from=' + location.href;
    }
})
})