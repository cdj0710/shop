// var gallery = mui('.mui-slider');
// gallery.slider({
//   interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
// });

//路径中的id
console.log(location.search);
console.log(location.search.slice(1))
// 发送请求, 请求商品页面

$.ajax({
  url: '/product/queryProductDetail',
  type: 'get',
  data: {
    id: location.search.slice(1),
  },
  success: function (res) {
    console.log(res);
    $('.move_body').html(template('cont', res))
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    // 手动初始化 数字输入框
    mui('.mui-numbox').numbox()
  }
})


// 手动初始化 数字输入框
// mui('.mui-numbox').numbox()


// 注册尺码选择,添加active类名
$('.move_body').on('click', '.size-item', function () {
  // console.log($(this).text())
  $(this).addClass('active').siblings().removeClass('active');
})

// 点击加入购物车
$('.pro-footer .mui-btn-danger').click(function () {
  // alert(1);
  // 拿到数量
  // 产品id
  //产品尺码
  if (!$('.size-item').hasClass('active')) {
    mui.toast('请选择尺码');
    return;
  }
  var id = + location.search.slice(1);
  var num = mui('.mui-numbox').numbox().getValue();
  var size = + $('.size-item.active').text()

  $.ajax({
    type:'post',
    url:'/cart/addCart',
    data:{
      productId:id,
      num:num,
      size:size
    },
    success:function(res){
      console.log(res);
      if(res.error == 400){
        location.href = "login.html?form="+location.href;
      }
      if(res.success){
        // 根据提示信息,点击进入不同页面
        mui.confirm('购物车添加成功',"提示信息",['去购物车',"继续浏览"],function(e){
          console.log(e);
          if(e.index == 0){
            location.href = "cart.html"
          }
        });
      }
    }
  })

})
