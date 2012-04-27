all:
	@wget -nc http://code.jquery.com/jquery.min.js \
		-P ./js/jquery/
	-git clone https://github.com/JeffreyZhao/jscex.git \
		./js/jscex
