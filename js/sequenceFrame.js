function SequenceFrame(options){
	this.options = {
		id: options.id,
		width: options.width,
		height: options.height,
		speed: options.speed,
		loop: options.loop,
		imgArr: options.imgArr,
		callback: options.callback
	};
	this.source = {};
	this.index = 1;
	this.imgNum = 1;
	this.timer = null;
	this.imgLoad();
}

SequenceFrame.prototype = {
	constructor : SequenceFrame,

	imgLoad: function(){
		this.source[this.index] = new Image();
		this.source[this.index].src = this.options.imgArr[this.index-1];
		this.source[this.index].onload = function(){
			this.index++;
			if(this.index > this.options.imgArr.length){
				this.render();
			}else{
				this.imgLoad();
			}
		}.bind(this);
	},

	render: function(){
		var canvas = this.options.id;
		var ctx = canvas.getContext('2d');
		var imgLength = this.options.imgArr.length;
		canvas.width = this.options.width;
		canvas.height = this.options.height;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			if(this.imgNum == imgLength && this.options.loop){
				this.imgNum = 1;
			}else if(this.imgNum == imgLength && !this.loop){
				clearInterval(this.timer);
				if(typeof this.options.callback === 'function'){
                    this.options.callback()
				}
			}else{
				ctx.clearRect(0,0,this.options.width,this.options.height);
            	ctx.drawImage(this.source[this.imgNum],0,0,this.options.width,this.options.height);
            	this.imgNum++;
			}
		}.bind(this),this.options.speed);
	}
}
