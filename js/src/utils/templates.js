app.loadTemplate = function(template) {
	if (app._templates==undefined) {
		app._templates = eval("(" + $("#backbone-templates").text() + ")");
	}
	if ( ! app._templates.hasOwnProperty(template) ) {
		return '<div class="error">ERROR: Template [%s] not found!</div>'.replace('%s',template);
	} else {
		return app._templates[template];
	}
};
