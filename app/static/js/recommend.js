/**
 * Created by Administrator on 2017/4/15.
 */
function empty() {
    document.getElementById("keyword").value=""; //getElementById()方法可返回对拥有指定ID的第一个对象的引用。
}
function recuse() {
    document.getElementById("keyword").value="请输入关键字";
}
function getCity() {
    var type = $('#type option:selected').val();//选中的值
    $.ajax({
        url: '/recommend/select',
        type: 'GET',     // 请求类型，常用的有 GET 和 POST
        data: {
            'type': type
        },
        success: function (data) {
                $("#one option:not(:first)").remove();  //指定选中值
                for(var i = 0; i< data.length; i++){
                    $("<option value='"+data[i]+"'>"+data[i]+"</option>").appendTo("#one");
                }
        }
    });
}
function getData(){
    var type = $('#type option:selected').val(); //得到当前文本框的值
    var one = $('#one option:selected').val();
    var key = $("#keyword").val();
    if(key=="请输入关键字"||key=="")
    {
        key="empty";
    }
    recuse();
    $.ajax({
        url: '/recommend/detail',
        type: 'POST',
        data: {
            'type':type,
            'one':one,
            'key':key
        },// 请求类型，常用的有 GET 和 POST
        success: function(data){   //function(data)是执行click事件要触发的函数，data表示的就是服务器返回的json格式的数据
                if(data.length<=0)
                {
                    $("#detail  tr:not(:first)").remove();
                    $("#empty").show();
                    $("#empty").html("检索不到相关数据，请更换条件重新检索")
                }
                else {
                    $("#empty").hide();
                    $("#detail  tr:not(:first)").remove();
                    for(var i=0;i<data.length;i++){
                        var $trDetail = $("<tr></tr>");
                        $trDetail.append("<td>"+data[i][0]+"</td>"); //在被选元素的结尾插入内容
                        $trDetail.append("<td>"+data[i][1]+"</td>");
                        $trDetail.append("<td>"+data[i][2]+"</td>");
                        $trDetail.append("<td>"+data[i][3]+"</td>");
                        $trDetail.append("<td>"+"<a href="+data[i][4]+">"+'查看详情'+"</a></td>");
                        $trDetail.appendTo("#detail"); //jquery实现表格行动态增删
                    }
                    $("td>a").attr("target","_blank");
                }
        }
        }
    );

}

