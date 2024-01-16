var ads__organism = {
	Init: function() {
			this.Organism();
	},
	Organism: function() {
		var year = document.querySelector(".ads__footter-year");
		
		if(year !== null) {
			var d = new Date();
			year.innerHTML = d.getFullYear();
		}
	}
};