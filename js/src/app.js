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
			contentType: $("#content-types-select").val(),
			layout: $("#layouts-select").val(),
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

	app.contentTypes = app.ContentTypes.load();
	app.contentTypesSelect = new app.ContentTypesSelect({
		collection: app.contentTypes
	});
	app.contentTypesSelect.render();

	app.layouts = app.Layouts.load();
	app.layoutsSelect = new app.LayoutsSelect({
		collection: app.layouts
	});
	app.layoutsSelect.render();

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

