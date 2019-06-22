/**
 * Created by Administrator on 2017/4/19.
 */
function show1() {
    $("#show").show();
}
function show() {
    setTimeout("show1()",500);
}

function hide() {
    $("#show").hide();
}