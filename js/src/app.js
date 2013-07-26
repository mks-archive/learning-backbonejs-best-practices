/**
 * app.js - Application object to act as unofficial controller.
 */

if (typeof app == "undefined") var app={};
_.extend(app, Backbone.Events);

app.render = function(){
	window.app = app;
	app.editor = new app.EditorView();
	app.editor.render();
};
