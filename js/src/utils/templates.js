app.loadTemplate = function(template) {
	if (typeof app.templates=="undefined") {
		app.templates = eval("(" + $("#backbone-templates").text() + ")");
	}
	return app.templates[template];
}
