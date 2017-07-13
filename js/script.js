var URL = window.location.href;
var BASE_PATH = URL.substring(0, URL.lastIndexOf('/') + 1);
var realLoadingNum = 0;
var fakeLoadingNum = 0;
var myLoadingInterval = null;

/**
 * 图片预加载 
 */
$(function() {
	bgm_init();
	// prevent iphone touchmove
	$(".p1").on("touchmove", function(event) {
		event.preventDefault();
	});

	var loader = new PxLoader(),
		// 把页面的图片列在这里
		fileList = [
			'img/loading.jpg',
			'img/loadingDrip.png',
			'img/loadingText1.png',
			'img/loadingText2.png',
			'img/logo.png',
			'img/kuang.png',
			'img/text.png',
		];
	for(var i = 60; i <= 94; i++) {
		fileList.push("images/1-3_000"+i+".jpg");
	}
	for(var i = 0; i <= 9; i++) {
		fileList.push("images/1003_0000"+i+".jpg");
	}
	for(var i = 10; i <= 99; i++) {
		fileList.push("images/1003_000"+i+".jpg");
	}
	for(var i = 100; i <= 121; i++) {
		fileList.push("images/1003_00"+i+".jpg");
	}
	//把图片载入加载器
	for(var i = 0; i < fileList.length; i++) {
		var pxImage = new PxLoaderImage(BASE_PATH + fileList[i]);

		pxImage.imageNumber = i + 1;
		loader.add(pxImage);
	}

	//当加载完成时
	loader.addCompletionListener(function() {
		console.log("预加载图片：" + fileList.length + "张");
		loadingFinish();
	});
	//loading 进度监听
	loader.addProgressListener(function(e) {
		var percent = Math.round((e.completedCount / e.totalCount) * 100); //正序, 1-100
		realLoadingNum = percent;
		//      console.log(percent);
	});
	var realLoadingNum = 0;
	var fakeLoadingNum = 0;
	var myLoadingInterval = setInterval(function() {
		fakeLoadingNum++;
		if(realLoadingNum > fakeLoadingNum) {
			if(fakeLoadingNum > 50) {
				$(".loadingText2").removeClass("opacity0");
				$(".loadingText1").addClass("opacity0");
			}
			$(".loadingNob").html("Loading..." + fakeLoadingNum + "%");
			$(".loadingDrip2").css("height", fakeLoadingNum + "%");

		} else {
			if(realLoadingNum > 50) {
				$(".loadingText2").removeClass("opacity0");
				$(".loadingText1").addClass("opacity0");
			}
			$(".loadingNob").html("Loading..." + realLoadingNum + "%");
			$(".loadingDrip2").css("height", realLoadingNum + "%");
		}
		if(fakeLoadingNum >= 100 && realLoadingNum == 100) {
			isIntervalFinish = true;
			loadingFinish();
			clearInterval(myLoadingInterval);
		}
	}, 30);
	//下面的参数测试时改为true by sl
	var isIntervalFinish = false;
	// var isIntervalFinish=true;
	function loadingFinish() {
		if(isIntervalFinish == false) {
			return;
		}
		isIntervalFinish = true;
		//BGM.play();
		__isAnimate = false;

		loadingClose = false;
		$(".loading-container").addClass("loading_amin");
		setTimeout(function() {
			$(".loading").hide();
			xuliezhen();

		}, 600);
		$(".content").show();

	}

	//启动
	loader.start();
	//	 * ios 手机不能自动播放声音
// */
	function bgm_init(){
		var video = document.getElementById('video');
		document.addEventListener("WeixinJSBridgeReady", function () {
			video.play();
		}, false);
		window.addEventListener('touchstart', function firstTouch(){
			video.play();
			this.removeEventListener('touchstart', firstTouch);
		});
	}
});

function mobilecheck() {
	var check = false;
	(function(a) { if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}
//第一段序列帧加载
function xuliezhen() {
	var frame1 = new SequenceFrame({
		id: $('#canvas')[0],
		width: 640,
		height: 1038,
		speed: 100,
		loop: false,
		callback: function() {
			$('.content').one('click',function(){
				console.log(545);
				frame2();
			})
		},
		imgArr: [
			"images/1003_00000.jpg",
			"images/1003_00001.jpg",
			"images/1003_00002.jpg",
			"images/1003_00003.jpg",
			"images/1003_00004.jpg",
			"images/1003_00005.jpg",
			"images/1003_00006.jpg",
			"images/1003_00007.jpg",
			"images/1003_00008.jpg",
			"images/1003_00009.jpg",
			"images/1003_00010.jpg",
			"images/1003_00011.jpg",
			"images/1003_00012.jpg",
			"images/1003_00013.jpg",
			"images/1003_00014.jpg",
			"images/1003_00015.jpg",
			"images/1003_00016.jpg",
			"images/1003_00017.jpg",
			"images/1003_00018.jpg",
			"images/1003_00019.jpg",
			"images/1003_00020.jpg",
			"images/1003_00021.jpg",
			"images/1003_00022.jpg",
			"images/1003_00023.jpg",
			"images/1003_00024.jpg",
			"images/1003_00025.jpg",
			"images/1003_00026.jpg",
			"images/1003_00027.jpg",
			"images/1003_00028.jpg",
			"images/1003_00029.jpg",
			"images/1003_00030.jpg",
			"images/1003_00031.jpg",
			"images/1003_00032.jpg",
			"images/1003_00033.jpg",
			"images/1003_00034.jpg",
			"images/1003_00035.jpg",
			"images/1003_00036.jpg",
			"images/1003_00037.jpg",
		]
	});
}



function frame2(){
	var frame2 = new SequenceFrame({
		id: $('#canvas1')[0],
		width: 640,
		height: 1038,
		speed: 50,
		loop: false,
		callback: function() {

			$('.textPic').fadeIn(500);

		},
		imgArr: [
			"images/1003_00038.jpg",
			"images/1003_00039.jpg",
			"images/1003_00040.jpg",
			"images/1003_00041.jpg",
			"images/1003_00042.jpg",
			"images/1003_00043.jpg",
			"images/1003_00044.jpg",
			"images/1003_00045.jpg",
			"images/1003_00046.jpg",
			"images/1003_00047.jpg",
			"images/1003_00048.jpg",
			"images/1003_00049.jpg",
			"images/1003_00050.jpg",
			"images/1003_00051.jpg",
			"images/1003_00052.jpg",
			"images/1003_00053.jpg",
			"images/1003_00054.jpg",
			"images/1003_00055.jpg",
			"images/1003_00056.jpg",
			"images/1003_00057.jpg",
			"images/1003_00058.jpg",
			"images/1003_00059.jpg",
			"images/1003_00060.jpg",
			"images/1003_00061.jpg",
			"images/1003_00062.jpg",
			"images/1003_00063.jpg",
			"images/1003_00064.jpg",
			"images/1003_00065.jpg",
			"images/1003_00066.jpg",
			"images/1003_00067.jpg",
			"images/1003_00068.jpg",
			"images/1003_00069.jpg",
			"images/1003_00070.jpg",
			"images/1003_00071.jpg",
			"images/1003_00072.jpg",
			"images/1003_00073.jpg",
			"images/1003_00074.jpg",
			"images/1003_00075.jpg",
			"images/1003_00076.jpg",
			"images/1003_00077.jpg",
			"images/1003_00078.jpg",
			"images/1003_00079.jpg",
			"images/1003_00080.jpg",
			"images/1003_00081.jpg",
			"images/1003_00082.jpg",
			"images/1003_00083.jpg",
			"images/1003_00084.jpg",
			"images/1003_00085.jpg",
			"images/1003_00086.jpg",
			"images/1003_00087.jpg",
			"images/1003_00088.jpg",
			"images/1003_00089.jpg",
			"images/1003_00090.jpg",
			"images/1003_00091.jpg",
			"images/1003_00092.jpg",
			"images/1003_00093.jpg",
			"images/1003_00094.jpg",
			"images/1003_00095.jpg",
			"images/1003_00096.jpg",
			"images/1003_00097.jpg",
			"images/1003_00098.jpg",
			"images/1003_00099.jpg",
			"images/1003_00100.jpg",
			"images/1003_00101.jpg",
			"images/1003_00102.jpg",
			"images/1003_00103.jpg",
			"images/1003_00104.jpg",
			"images/1003_00105.jpg",
			"images/1003_00106.jpg",
			"images/1003_00107.jpg",
			"images/1003_00108.jpg",
			"images/1003_00109.jpg",
			"images/1003_00110.jpg",
			"images/1003_00111.jpg",
			"images/1003_00112.jpg",
			"images/1003_00113.jpg",
			"images/1003_00114.jpg",
			"images/1003_00115.jpg",
			"images/1003_00116.jpg",
			"images/1003_00117.jpg",
			"images/1003_00118.jpg",
			"images/1003_00119.jpg",
			"images/1003_00120.jpg",
			"images/1003_00121.jpg",
			"images/1-3_00060.jpg",
			"images/1-3_00061.jpg",
			"images/1-3_00062.jpg",
			"images/1-3_00063.jpg",
			"images/1-3_00064.jpg",
			"images/1-3_00065.jpg",
			"images/1-3_00066.jpg",
			"images/1-3_00067.jpg",
			"images/1-3_00068.jpg",
			"images/1-3_00068.jpg",
			"images/1-3_00070.jpg",
			"images/1-3_00071.jpg",
			"images/1-3_00072.jpg",
			"images/1-3_00073.jpg",
			"images/1-3_00074.jpg",
			"images/1-3_00075.jpg",
			"images/1-3_00076.jpg",
			"images/1-3_00077.jpg",
			"images/1-3_00078.jpg",
			"images/1-3_00079.jpg",
			"images/1-3_00080.jpg",
			"images/1-3_00081.jpg",
			"images/1-3_00082.jpg",
			"images/1-3_00083.jpg",
			"images/1-3_00084.jpg",
			"images/1-3_00085.jpg",
			"images/1-3_00086.jpg",
			"images/1-3_00087.jpg",
			"images/1-3_00088.jpg",
			"images/1-3_00089.jpg",
			"images/1-3_00090.jpg",
			"images/1-3_00091.jpg",
			"images/1-3_00092.jpg",
			"images/1-3_00093.jpg",
			"images/1-3_00094.jpg",
			

		]
	});
}


