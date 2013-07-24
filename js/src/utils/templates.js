app.loadTemplate = function(template) {
	if (typeof app._templates=="undefined") {
		app._templates = eval("(" + $("#backbone-templates").text() + ")");
	}
	return app._templates[template];
}
