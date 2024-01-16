var ads__chart = {
	Colors: function(type, idx, rgba) {
		var rtn = [];

		colorsTypes = {
			bar: [
				'rgb(0, 176, 234)',
				'rgb(17, 50, 116)',
				'rgb(0, 62, 120)',
				'rgb(246, 168, 84)',
				'rgb(255, 216, 98)',
				'rgb(255, 216, 98)',
				'rgb(0, 92, 168)',
				'rgb(90, 196, 241)',
				'rgb(160, 217, 247)',
				'rgb(93, 96, 97)',
				'rgb(77, 77, 77)'
			],
			line: [
				'rgb(0, 52, 117)',
			],
			radar: [
				'rgb(102, 110, 122)',
				'rgb(0, 176, 230)'
			]
		}

		if(type == 'bar'|| type == 'pie' || type == 'doughnut') {
		   rtn = colorsTypes.bar;
		} else if(type == 'radar') {
			if(rgba === true)
				rtn = b3__chart.ConvertRGBToRGBA(colorsTypes.radar[idx]);
			else
				rtn = colorsTypes.radar[idx];
		} else
			rtn = colorsTypes.line;

		return rtn 
	},
	ConvertRGBToRGBA: function(color){
		var newColor = color.replace(/rgb/i, "rgba");

		newColor = newColor.replace(/\)/i,',0.2)');

		return newColor;
	},
	Init: function() {
		if(typeof Chart != "undefined") {
			Chart.defaults.global.defaultFontFamily = '"Muli",sans-serif';
			Chart.defaults.global.elements.arc.borderWidth = 0;
			Chart.defaults.global.elements.arc.hoverBorderWidth = 0;
		}
	}
}