var ads__datagrid = {
	Init: function() {
		var _self = this;

		if(typeof $.fn.dataTable != "undefined")
			_self.GlobalConfigs();
	},
	GlobalConfigs: function() {
		Object.assign($.fn.dataTable.defaults, {
			"language": {
				"lengthMenu": "Exibindo: _MENU_",
				"zeroRecords": "Nenhum resultado encontrado",
				"info": "Página _PAGE_ de _PAGES_",
				"infoEmpty": "Sem resultado disponível",
				"infoFiltered": "(filtered from _MAX_ total records)",
				"search": "",
				"paginate": {
					"previous": "Anterior",
					"next": "Próximo"
				  }
			}
		} );
	}
}