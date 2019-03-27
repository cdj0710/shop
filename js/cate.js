// 获取一级分类数据

$.ajax({
    url:'/category/queryTopCategory',
    type:'GET',
    success:function(res){
    //   console.log(res)
      $('.cate_one ul').html(template('temp',res));
      two_cate();
    }
})

// 根据一级id 获取二级分类
function two_cate(){
    $.ajax({
        url:'/category/querySecondCategory',
        type:'get',
        data:{
            id:$('.cate_one li.active').data('id'),
        },
        success:function(res){
          console.log(res);
          $('.cate_two .mui-scroll').html(template('temp2',res))
        }
    })
}

// 注册点击事件
$('.cate_one ul').on('click','li',function(){
$(this).addClass('active').siblings().removeClass('active');
two_cate();
})