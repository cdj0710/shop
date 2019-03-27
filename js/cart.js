$.ajax({
  url: '/cart/queryCart',
  type: 'get',
  success: function (res) {
    if (res.error == 400) {
      location.href = 'login.html?form=' + location.href
      return;
    }
    console.log({ list: res })
    $(".move_body").html(template('temp', { list: res }))

  }
})


mui.init();
(function ($) {
  //拖拽后显示操作图标，点击操作图标删除元素；
  $('.move_body').on('tap', '.mui-btn', function (event) {
    var elem = this;
    var li = elem.parentNode.parentNode;
    mui.confirm('确认删除该商品？', '温馨提示', btnArray, function (e) {
      if (e.index == 0) {

        console.log(elem.dataset.id);
        $.ajax({
          url: '/cart/deleteCart',
          type: 'get',
          data: {
            id: [elem.dataset.id]
          },
          success: function (res) {
            console.log(res);
            if (res.success) {
              li.parentNode.removeChild(li);
            }
          }
        })

      } else {
        setTimeout(function () {
          $.swipeoutClose(li);
        }, 0);
      }
    });
  });
  var btnArray = ['确认', '取消'];
})(mui);
