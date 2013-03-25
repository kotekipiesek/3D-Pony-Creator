var scripts = [
        'js/core/main.js',
        'js/jquery/plugins/spin.min.js',
        'bootstrap/js/bootstrap-colorpicker.js',
        'js/UI/interface.js',
        'js/UI/sidebar.js',
        'js/UI/menu.js',
        'js/core/functions.js',
		'js/core/spawner.js',
        'js/core/save.js',
        'js/core/load.js',
        'js/core/selector.js',
        'js/filesaver/FileSaver.min.js',
        'js/filesaver/BlobBuilder.min.js',
        'js/filesaver/canvas2blob.min.js',
	];

Modernizr.load({
  load: [
    'js/jquery/jquery.ui.js'
  ],
  complete: function () {
    if ( window.jQuery ) {
		Modernizr.load(
		{
			load: [
			  'js/core/errorhandler.js'
			],
			complete: function(){
			
				if ( typeof(errorHandler) == "undefined" )
				{
					console.warn('Standard errorHandler is not defined, used secondary method');
					errorHandler = (function(){
						function fatal(msg)
						{
							document.body.innerHTML = "<h2>Fatal Error: "+msg+"</h2><h3>Standard errorHandler is not defined, used secondary method</h3>";
						}
						return {
							fatal : fatal
						}
					})();							
				}				

				Modernizr.load(
				{
					load: [
					  'js/UI/progressbar.js'
					],
					complete: function(){
					
						if( typeof(progressbar) == "undefined" )
						{	
							errorHandler.fatal('progressbar is not defined');
						}
						else
						{

							var l=0;
							for(var i in scripts){
								l +=1;
								
								errorHandler.writeDebug("["+l+"] Loading "+scripts[i]);
								
															
								Modernizr.load({ 
									load: [
										scripts[i]
									],
									complete: function(){						
										progressbar.setProgress(l,scripts.length);
									}								
								});
							}

						
						}
						
					}				
				});
				
			}	
		});
		
    } else {
		document.body.innerHTML = "<h2>Fatal Error: jQuery is not loaded</h2>";
    }
  }
});