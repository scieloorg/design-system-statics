var ads__datepicker = {
	globalConfigs: function() {
		jQuery.extend( jQuery.fn.pickadate.defaults, {
			monthsFull: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
			monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
			weekdaysFull: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
			weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
			labelMonthNext: 'Próximo',
			labelMonthPrev: 'Anterior',
			today: 'hoje',
			clear: 'limpar',
			close: 'fechar',
			format: 'dd/mm/yyyy',
			formatSubmit: 'dd/mm/yyyy',
			onOpen: function() { document.querySelectorAll('pre').forEach(function() {
				this.style.overflow = 'hidden';
			})},
			onClose: function() { document.querySelectorAll('pre').forEach(function() {
				this.style.overflow = '';
			}) }
		});
	},
	Init: function() {
		if(typeof Picker != "undefined")
			this.globalConfigs();
	}
}