/**
 * app.js - Application object to act as unofficial controller.
 */

if (typeof app == "undefined") var app={};
_.extend(app, Backbone.Events);

app.assignElement = function(id) {
	var cameledId = app.camelify(id);
	app[cameledId+"Id"] = id;
	return $("#"+app[cameledId+"Id"]);
};

app.addLayer = function(){
	var layer = new app.Layer({
			contentType: $("#content-type-select").val(),
			layoutType: $("#layout-type-select").val(),
			container:this.stack
		});
	this.stack.add(layer);
	return this;
};
app.onLayerChanged = function(layer){
	var layers = _.map(app.stack.models,function(layer){
		var cloned = _.extend({},layer).attributes;
		delete cloned.container;
		return cloned;
	});
	$('#stack-json').val(JSON.stringify(layers));
};
app.execute = function(){
	app.$layerAdditionContainer = app.assignElement("layer-addition-container");
	app.$addLayerButton = app.assignElement("add-layer-button");
	app.$layerFormContainer = app.assignElement("layer-form-container");
	app.$layerIncludeTerms = app.assignElement("layer-include-terms");

	app.contentTypes = new app.ContentTypes([
		new app.ContentType({text:'Contact (e.g. People)', value:'contact'}),
		new app.ContentType({text:'Event'}),
		new app.ContentType({text:'Downloadable'}),
		new app.ContentType({text:'- Works'}),
		new app.ContentType({text:'-- Document'}),
		new app.ContentType({text:'-- Spreadsheet'}),
		new app.ContentType({text:'-- Presentation'}),
		new app.ContentType({text:'- Media'}),
		new app.ContentType({text:'-- Audio'}),
		new app.ContentType({text:'-- Video'}),
		new app.ContentType({text:'-- Image'}),
		new app.ContentType({text:'- Other'}),
		new app.ContentType({text:'Stack'}),
		new app.ContentType({text:'Mixed'}),
	]);

	app.contentTypeSelect = new app.ContentTypeSelect({
		collection: app.contentTypes
	});

	app.contentTypeSelect.render();

	app.layoutTypes = new app.LayoutTypes([
		new app.LayoutType({text:'Vertical List'}),
		new app.LayoutType({text:'Horizontal List'}),
		new app.LayoutType({text:'Stamp Grid'}),
		new app.LayoutType({text:'Featured'}),
		new app.LayoutType({text:'Featured + List'}),
		new app.LayoutType({text:'Hero'}),
	]);

	app.layoutTypeSelect = new app.LayoutTypeSelect({
		collection: app.layoutTypes
	});

	app.layoutTypeSelect.render();

	app.stack = new app.Stack();

	app.stackView = new app.StackView({
		collection: app.stack
	});

	app.stackView.sortable();

	app.$addLayerButton.click(function(){
		app.addLayer();
		return false;
	});

	app.on('layer:changed',this.onLayerChanged);

	window.app = app;
};

