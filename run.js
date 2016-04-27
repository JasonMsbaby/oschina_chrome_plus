//document.write("<script language=javascript src=’http://apps.bdimg.com/libs/jquery/1.6.4/jquery.min.js’></script>");
var table = $(".single tbody tr");
$.each(table,function(index,ele){
	var name = $(ele).find("td").find("item").find("a").html();
	var td = $(ele).find("td")[1];
	$(td).append("<input style='margin-left:20px;' type='text' value='' placeholder='请输入备注名称' />");
	$(td).append("<input style='margin-left:10px;' type='button' value='更改'/>");
});
