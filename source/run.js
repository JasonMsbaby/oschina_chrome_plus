//document.write("<script language=javascript src=’http://apps.bdimg.com/libs/jquery/1.6.4/jquery.min.js’></script>");
AV.initialize('1sApnvsOhfpRpq3Axs8E9tPe-gzGzoHsz', 'YEEASr75SLVa35a424CWYto9');
// 初始化 param1：应用 id、param2：应用 key
// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   testabc: 'abc123'
// }).then(function() {
//   alert('LeanCloud works!');
// }).catch(function(err) {
//   alert('error:' + err);
// });

$(function(){

	//当前用户
	var currentUser = $("#git-nav-user").attr("alt");
	var User = AV.Object.extend('user');
	var Relation = AV.Object.extend('releation');
	//保存关系
	var saveRelationShip = function(username,mark){
		var query = new AV.Query('releation');
		query.equalTo('userId',currentUser);
		query.equalTo('friendId',username);
		query.find().then(function(rel){
			var rela = new Relation();
			rela.set('objectId',rel.objectId);
			rela.set('userId',currentUser);
			rela.set('friendId',username);
			rela.set('mark',mark);
			rela.save().then(function(success){
				alert("保存成功");
			},function(error){
				alert(error.message);
			});
		},function(error){
			alert(error.message);
		});
	};
	//查询关系
	var fetchFriendShip = function(){
		var query = new AV.Query('releation');
		query.equalTo('userId',currentUser);
		query.find().then(function(result){
			$.each(result,function(index,ele){
				$(".friendId_"+ele.get('friendId')).val(ele.get('mark'));
			});
		},function(error){
			alert(error.message);
		});
	};


	if (currentUser != null && currentUser != undefined) {
		//解析html页面
		var table = $(".single tbody tr");
		$.each(table,function(index,ele){
			var name = $(ele).find("td").find("item").find("a").html();
				var td = $(ele).find("td")[1];
				$(td).append("<input class='markName friendId_"+name+"' style='margin-left:20px;' type='text' value='' placeholder='请输入备注名称' />");
				$(td).append("<input class='btnSubmit' style='margin-left:10px;' type='button' friendId='"+name+"' value='更改'/>");
		});
		fetchFriendShip();
	}

	




	
	

	//点击提交事件
	$(".btnSubmit").click(function(){
		var friendId = $(this).attr("friendId");
		var mark = $(this).parent().find(".markName").val();
		if (mark == "") {
			alert("备注不能为空");
		}else{
			saveRelationShip(friendId,mark);
		}
	});

});


