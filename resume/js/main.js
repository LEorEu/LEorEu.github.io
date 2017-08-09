$(window).load(function() {
	$(".status").fadeOut("slow"); 
	$(".preloader").delay(500).fadeOut("slow").remove();       
})

$(document).ready(function(){
	// wheelmenu初始化
	$(".wheel-button").wheelmenu({
		trigger: "hover",
		animation: "fly",
		animationSpeed: "fast"
	});

	// P1信息切换
	$("#p1 .tabbox .info-box ul li a").live("mouseover",function(){
		$("#p1 .tabbox .info-box ul li a").removeClass("info-focus");
		$(this).addClass("info-focus");
		$("#p1 .tabbox .info-box ul li .box").css("display","none");
		$(this).next().css("display","block");

		
		var plen = $(this).next().find("p").length;
		if (plen < 4) {
			$("#p1 .tabbox .info-box ul li .box").css("paddingTop","30px");
		}else{
			$("#p1 .tabbox .info-box ul li .box").css("paddingTop","20px");
		}
	});
});

// SVG技能展示
var o = {
	init: function(){
		this.diagram();
	},
	random: function(l, u){
		return Math.floor((Math.random()*(u-l+1))+l);
	},
	diagram: function(){
		var r = Raphael('diagram', 600, 600),
			rad = 73,
			defaultText = 'SKILLS',
			speed = 250;
		
		r.circle(300, 300, 85).attr({ stroke: 'none', fill: '#193340' });
		
		var title = r.text(300, 300, defaultText).attr({
			font: '20px Arial',
			fill: '#fff'
		}).toFront();
		
		r.customAttributes.arc = function(value, color, rad){
			var v = 3.6*value,
				alpha = v == 360 ? 359.99 : v,
				random = o.random(91, 240),
				a = (random-alpha) * Math.PI/180,
				b = random * Math.PI/180,
				sx = 300 + rad * Math.cos(b),
				sy = 300 - rad * Math.sin(b),
				x = 300 + rad * Math.cos(a),
				y = 300 - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}
		
		$('.get').find('.arc').each(function(i){
			var t = $(this), 
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();
			
			rad += 30;	
			var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 26 });
			
			z.mouseover(function(){
                this.animate({ 'stroke-width': 50, opacity: .75 }, 1000, 'elastic');
                if(Raphael.type != 'VML') //solves IE problem
				this.toFront();
				title.stop().animate({ opacity: 0 }, speed, '>', function(){
					this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, speed, '<');
				});
            }).mouseout(function(){
				this.stop().animate({ 'stroke-width': 26, opacity: 1 }, speed*4, 'elastic');
				title.stop().animate({ opacity: 0 }, speed, '>', function(){
					title.attr({ text: defaultText }).animate({ opacity: 1 }, speed, '<');
				});	
            });
		});
		
	}
}
$(function(){ o.init(); });

// 作品图片动画
var flow = $("#p4 .work-hex .work-list .work .overflow");
flow.mouseover(function(){
	$(this).prev().css("transform","scale(1.2)");
	$(this).prev().css("transition","all 0.8s");
});
flow.mouseout(function(){
	$(this).prev().css("transform","scale(1)");
	$(this).prev().css("transition","all 0.8s");
})

// P3时间轴
var btn = $("#p3 .time .timeline .time-list ul li .time-btn");
$(function(){
	btn.each(function(index){
		$(this).click(function(){
			$("#p3 .time .timeline .time-list ul .time-focus").removeClass("time-focus");
			$("#p3 .time .event-main .event-list .event-focus").removeClass("event-focus");
			$("#p3 .time .time-top .title-focus").removeClass("title-focus");
			$(this).parent().addClass("time-focus");
			$("#p3 .time .event-main .event-list > li:eq("+index+")").addClass("event-focus");
			$("#p3 .time .time-top > h3:eq("+index+")").addClass("title-focus");
		});
	});
});

