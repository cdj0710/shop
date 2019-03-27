// 路径中的数据, 存入input显示
var url = location.search;// 获得路径?
var search = decodeURI(url)// 解密
$('.top input').val(search.slice(1))// 显示

// 请求查询商品 渲染, 请求参数不一定
function list(){
    $('.main .pro_cont').html('<div class="load"></div>')
    var obj = {
        proName:$('.top input').val(),
        page:1,
        pageSize:100,
    }
    // 判断是否有active
    var lgt = $('.main').find('.active').length;
    if(lgt != 0){
        // 说明有  拿到哪一个排序
       console.log($('.active').data('type')) 
       console.log($('.active span').hasClass('fa-chevron-down'))
       var value = $('.active span').hasClass('fa-chevron-down')? 2:1;
       obj[($('.active').data('type'))] = value;
    }
    
    $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data:obj,
        success:function(res){
          console.log(res)
          if(res.data.length == 0){
              return;
          }
          setTimeout(function(){
            $('.main .pro_cont').html(template('pro',res)) 
          },500)
        }
    
    })
    console.log(obj)
}
list();

// 搜索框搜索,添加到localstroge
$('.mui-btn-primary').click(function(){
    var txt = $('.top input').val().trim();
    if(txt){
        // 拿到stroge数组
        var arr = get();
        // 判断 有没有重复的搜索
        console.log(arr.indexOf(txt))
        if(arr.indexOf(txt) != -1){
            // != -1 说明数组有这个值
            // 删除
            arr.splice(arr.indexOf(txt),1)
        }
        // 添加
        arr.unshift(txt);
        // 新数组, 添加到本地
        localStorage.setItem('history',JSON.stringify(arr))
    }
    list();
})

// 点击立即购买,进入商品详情页, 带id

$('.pro_cont').on('click','.buy',function(){
//   alert(1)
location.href = "product.html?"+$(this).data("id");

})

// 排序的样式切换

$('.main [data-type]').click(function(){
    // 给 有 data-type的元素注册同样的事件
    var cur = $(this)
    if(cur.hasClass('active')){
        cur.children('span').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
    }else{
        cur.addClass('active').siblings().removeClass('active');
        cur.siblings().find('span').removeClass('fa-chevron-up').addClass('fa-chevron-down')
    
    }
    list();
// 判断排序, 发送请求, 渲染
})

// 
    
