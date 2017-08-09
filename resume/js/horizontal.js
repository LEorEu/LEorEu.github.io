$(function() {

	//获取当前分辨率宽度设置整体宽度
	var w = $(window).width();
    if (w < 1024) {
    	alert("移动端还在开发中，请随后再查看，谢谢~")
        return;
 	}
	var totalw = 0;
	if($("div.container main section").length>=1){
		totalw = w * parseInt($("div.container main section").length);
	}
	$("div.container main").css("width",totalw+"px");
	$("div.container main section").css("width",w+"px");
	$("div.scrollBar span").css("width",(100/$("div.container main section").length)+"%");

	// 根据当前分辨率调整布局
	$(window).resize(function(){
		nowPoint = $(window).width();
		// $("body").css("width",nowPoint+"px");
		$("div.container main section").css("width",nowPoint+"px");
		$("div.container main").css("width",(nowPoint*$("div.container main section").length)+"px");
		$("div.container main").css("marginLeft",-((maxpoint-c)*nowPoint)+"px");
	});

	// 初始化变量
	nowPoint = $(window).width();
	maxpoint = $("div.container main section").length;
	minpoint = 1;
	c = maxpoint;
	speed = 600;
	animation_complete = true;

	// 鼠标滚动条移动事件
	$('.container').mousewheel(function(event, delta) {

		// 若果动画还没完毕，禁止滚动
		if(animation_complete==false){
			return;
		}

		// 加载中
		animation_complete = false;

		if(parseInt(delta)==1){
			// 往上拉
			if(c<maxpoint){
				nPoint = maxpoint - c - 1;
				c++;
				sp = 0;
				if(nPoint<=0){
					nPoint = 0;
				}else{
					sp = -(nPoint * nowPoint);
				}
				$("div.container main").animate({marginLeft:sp+"px"},speed,function(){
					animation_complete = true;
				});
				$("div.scrollBar span").animate({"marginLeft":(maxpoint-c)*(100/maxpoint)+"%"},speed);
			}else{
				animation_complete = true;
			}
		}else{
			//往下拉
			if(c>minpoint){
				c--;
				$("div.container main").animate({marginLeft:-(nowPoint*(maxpoint-c))+"px"},speed,function(){
					animation_complete = true;
				});
				$("div.scrollBar span").animate({"marginLeft":(maxpoint-c)*(100/maxpoint)+"%"},speed);
			}else{
				animation_complete = true;
			}
		}
		event.preventDefault();
	});

	// 分页栏
	$("div.scrollBar").click(function(event){
		animation_complete = false;
		var x = getX(event);
		var a = parseInt(x/$(this).width() * 100);
		var ac = parseInt(a / (100 / maxpoint));
		console.log(ac);
		$("div.scrollBar span").animate({"marginLeft":ac*(100 / maxpoint)+"%"},speed);
		c = maxpoint - ac;
		$("div.container main").animate({marginLeft:-(ac*nowPoint)+"px"},speed,function(){
			animation_complete = true;
		});
	});

	var holding = false;

	// 移动自定义滚动条
	$("div.scrollBar span").mousedown(function(e){
		holding = true;
		x = e.pageX - $(this).offset().left; 
	});

	$("div.scrollBar span").mouseup(function(){
		holding = false;
	});

	$("div.scrollBar span").mouseout(function(event){
		// console.log();
		$("div.scrollBar span").animate({"marginLeft":(maxpoint-c)*(100 / maxpoint)+"%"},speed);
		holding = false;
	});

	$("div.scrollBar span").mousemove(function(event){
		if(holding){
			$("div.scrollBar span").css("marginLeft",event.pageX-x+"px");
		}
	});

	function getX(e) {
	  e = e || window.event;
	  return e.pageX || e.clientX + document.body.scroolLeft;
	}
	function getY(e) {
	  e = e|| window.event;
	  return e.pageY || e.clientY + document.body.scroolTop;
	}

});