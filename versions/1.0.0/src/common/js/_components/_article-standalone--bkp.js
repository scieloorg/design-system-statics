var scielo__articleStandAlone = {
	Init: function() {
			this.MathJax();
			this.CopyLink();
			this.Tooltip();
			this.TooltipRef();
			this.ArticleCloseAuthors();
			
	},
	MathJax: function() {
		/*
		Script carregado direto no html do artigo
		<script type="text/javascript" id="MathJax-script" async="true" src="https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/tex-mml-svg.js"></script>
		*/
		
		MathJax = {
			tex: {
				inlineMath: [['$', '$'], ['\\(', '\\)']]
			},
			svg: {
				fontCache: 'global'
			}
		};
	},
	CopyLink: function() {
		/*
		Comportamento com foco em link com a classe copylink
		- prever elementos diferente de botoes na hora de criar o js genérico
		*/
		var linkTrigger = document.querySelector('a.copyLink');

		linkTrigger.addEventListener('click', function () {
			this.classList.add('copyFeedback');

			setTimeout(function() {
				linkTrigger.classList.remove('copyFeedback');
			},2000);
		});
	},
	Tooltip: function() {
		// inicia tooltip bootstrap 5
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		   return new bootstrap.Tooltip(tooltipTriggerEl)
		})
	},
	TooltipRef: function() {
		var RefToolTip = {

			open: function(t) {
	
				var s = $(".xref",t),
					d = s.next("span:eq(0)"),
					p = t.position(),
					supHeight = s.outerHeight(),
					supPositionLeft = p.left,
					li = t.closest("li");
	
				if(li.length > 0)
					li.addClass("zindexFix");
	
				d.removeClass("closed").addClass("opened").css({
					"left": (supPositionLeft > 300) ? (-supPositionLeft/3) : 0
				}).fadeIn("fast");
	
			},
			close: function(t) {
	
				var s = $(".xref",t),
					d = s.next("span:eq(0)"),
					li = t.closest("li");
	
				if(li.length > 0)
					li.removeClass("zindexFix");
	
				d.removeClass("opened").addClass("closed");
			}
		};
	
		// Tablet or Mobile
		/*
		if(Article.IsTablet || Article.IsMobile) {
	
		var isTooltipOpen = false;
		var actualOpened = null;
	
		$('html').on('touchstart', function(e) {
	
			$(".ref").each(function() {
	
				var t = $(this);
				RefToolTip.close(t);
	
				isTooltipOpen = false;
			});
	
		});
		*/
		$(".ref").on("mouseenter mouseleave",function(e) {
			e.preventDefault();
	
			var t = $(this);
	
			if(e.type === "mouseenter") {
	
				RefToolTip.open(t);
	
			} else {
	
				RefToolTip.close(t);
			}
		});
	},
	ArticleCloseAuthors: function() {
		var autoresGrupo = $(".scielo__contribGroup");
		var autores = $(".scielo__contribGroup .dropdown");
		var qtdAutores = autores.length;

		if(qtdAutores >= 10) {

			var AuthorsQTDTooltip = null;

			var btnSobre = $(".outlineFadeLink");
			var primeiro = autores[0];
			var ultimo = autores[qtdAutores -1];

			// Code added to control authors quantity tooltip
			var authorsQTDToShowInsideBracktes = qtdAutores - 2;

			//var linkToggleOn = $('<a data-toggle="tooltip" data-placement="top" title="+'+authorsQTDToShowInsideBracktes+'"></a>');
			var linkToggleOn = $('<a class="btn btn-sm btn-primary scielo__btn-with-icon--only" data-bs-toggle="tooltip" data-bs-placement="top" title="+'+authorsQTDToShowInsideBracktes+'"><span class="material-icons-outlined">more_horiz</span></a>');

			//linkToggleOn.text("[...]");
			//style
			//linkToggleOn.css({ padding : "10px" , cursor : "pointer" });
			linkToggleOn.addClass("btn-open"); 
			linkToggleOn.addClass("btn");
			linkToggleOn.addClass("btn-primary");
			//linkToggleOn.css({ margin : "0 auto" });

			var boxToggleOff = $('<div></div>');
			var linkToggleOff = $('<button type="button" class="btn btn-secondary scielo__btn-with-icon--only"><i class="material-icons-outlined">close</i></button>');

			linkToggleOff.addClass("btn-fechar");
			linkToggleOff.addClass("btn-sm");

			var spanOff = $('<span></span>');
			//spanOff.addClass("sci-ico-floatingMenuClose");

			linkToggleOff.append(spanOff);
			boxToggleOff.append(linkToggleOff);

			var autoresResumo = $('<div></div>');
			autoresResumo.append(primeiro);
			autoresResumo.append(linkToggleOn);
			autoresResumo.append(ultimo);
			autoresResumo.append(btnSobre);

			//substitui o conteudo pelo resumo
			autoresGrupo.text("");
			autoresGrupo.append(autoresResumo);

			//ao clicar em abrir
			linkToggleOn.on("click",function() {

				AuthorsQTDTooltip.tooltip('disable')
				autoresGrupo.textContent = "";
				
				for (var i = 0; i < qtdAutores; i++){
					autoresGrupo.append(autores[i]);
				}

				autoresGrupo.append(btnSobre);
				autoresGrupo.append(boxToggleOff);

				// linkToggleOn.removeClass('btn-primary');
				linkToggleOn.addClass('disabled');

			});

			//ao clicar em fechar
			linkToggleOff.on("click",function() {
				
				AuthorsQTDTooltip.tooltip('enable');

				// Article.fechaAutores();
				//fechaAutores();
				scielo__articleStandAlone.ArticleCloseAuthors();

				linkToggleOn.removeClass('disabled');
 
			});

			// Initialize tooltip
			AuthorsQTDTooltip = $('[data-toggle="tooltip"]').tooltip();
		}
		autoresGrupo.css("opacity","1");
	}
};