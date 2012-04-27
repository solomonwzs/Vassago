VasFlipStr=function(obj)
{
	this.str=obj.str || " ";
	this.len=obj.len || this.str.length || 1;
	this.pos=obj.pos || $('body');
	this.width=obj.width || 10;
	this.height=obj.height || 20;
	this.fontSize=obj.fontSize || this.width;

	if ($.browser.mozilla)
	{
		this.transform='-moz-transform';
	}
	else if ($.browser.webkit)
	{
		this.transform='-webkit-transform';
	}
	else if ($.browser.opera)
	{
		this.transform='-o-transform';
	}
	else
	{
		this.transform='transform';
	}

	for (var i=0; i<this.len; i++)
	{
		var ch=this.str[i] || ' ';
		this._newChar(ch, i);
	}
}

VasFlipStr.prototype={
	_newChar:function(ch, id)
	{
		var html=
			'<div class="vas_flip_ch_'+id+' vas_flip_ch">'+
				'<div class="vas_flip_ch_p vas_flip_ch_p0">'+
					'<div class="vas_flip_ch_f vas_flip_ch_f0">'+
						'<div>'+ch+'</div>'+
					'</div>'+
					'<div class="vas_flip_ch_f vas_flip_ch_f1">'+
						'<div>'+ch+'</div>'+
					'</div>'+
				'</div>'+
				'<div class="vas_flip_ch_p vas_flip_ch_p1">'+
					'<div class="vas_flip_ch_f vas_flip_ch_f0">'+
						'<div>'+ch+'</div>'+
					'</div>'+
					'<div class="vas_flip_ch_f vas_flip_ch_f1">'+
						'<div>'+ch+'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
		$(html).css({
			'width':this.width+'px', 
			'height':this.height+'px',
			'line-height':this.height+'px'
		}).appendTo(this.pos).find('.vas_flip_ch_p').css({
			'width':this.width+'px', 
			'height':this.height+'px'
		}).find('.vas_flip_ch_f').css({
			'width':this.width+'px',
			'height':(this.height/2)+'px'
		}).find('div').css({
			'width':this.width+'px', 
			'height':this.height+'px',
			'font-size':this.fontSize+'px'
		});
	},
	_flip:eval(Jscex.compile('async', function(obj, nextCh, time)
	{
		var d=10;
		var dt=time/d;

		var p1=obj.find('.vas_flip_ch_p1');
		var p1_f0=p1.find('.vas_flip_ch_f0');
		var p1_f1=p1.find('.vas_flip_ch_f1');
		var p0_f0=obj.find('.vas_flip_ch_p0 .vas_flip_ch_f0');
		var p0_f1=obj.find('.vas_flip_ch_p0 .vas_flip_ch_f1');

		p1_f1.css('opacity', 0);
		p0_f0.find('div').html(nextCh);
		for (var i=1; i<=d/2; i++)
		{
			var deg=180*(i/d);
			p1.css(this.transform, 'rotateX('+deg+'deg)');
			$await(Jscex.Async.sleep(dt));
		}
		p1.css(this.transform, 'rotateX(270deg)');
		p1_f1.css('opacity', 1).find('div').html(nextCh);
		p1_f0.css('opacity', 0);
		for (var i=d/2+1; i<=d; i++)
		{
			var deg=180*(i/d)+180;
			p1.css(this.transform, 'rotateX('+deg+'deg)');
			$await(Jscex.Async.sleep(dt));
		}
		p1_f0.css('opacity', 1).find('div').html(nextCh);
		p0_f1.find('div').html(nextCh);
	})),
	_flipNext:eval(Jscex.compile('async', function(nextStr, time)
	{
		for (var i=0; i<this.len; i++)
		{
			var j=i-this.len+nextStr.length;
			this._flip(
				this.pos.find('.vas_flip_ch_'+i),
				nextStr[j] || ' ',
				200).start();
			$await(Jscex.Async.sleep(10));
		}
	})),
	flipNext:function(nextStr, time)
	{
		//this._flipNext(nextStr, time).start();
		for (var i=0; i<this.len; i++)
		{
			var j=i-this.len+nextStr.length;
			this._flip(
				this.pos.find('.vas_flip_ch_'+i),
				nextStr[j] || ' ',
				100).start();
		}
	}
}
