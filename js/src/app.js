/**
 * app.js - Application object to act as unofficial controller.
 */

if (typeof app == "undefined") app={};
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
	var layerView = new app.LayerView({model:layer,selected:true});
	this.stack.add(layerView);
	return this;
};
app.execute = function(){
	app.$layoutTypeSelect = app.assignElement("layout-type-select");
	app.$contentTypeSelect = app.assignElement("content-type-select");
	app.$stackContainer = app.assignElement("stack-container");
	app.$layerAdditionContainer = app.assignElement("layer-addition-container");
	app.$addLayerButton = app.assignElement("add-layer-button");
	app.$layerFormContainer = app.assignElement("layer-form-container");

	app.contentTypes = new app.ContentTypeOptionList([
		new app.ContentType({title:'Document'}),
		new app.ContentType({title:'Spreadsheet'}),
		new app.ContentType({title:'Presentation'}),
		new app.ContentType({title:'Audio'}),
		new app.ContentType({title:'Video'}),
		new app.ContentType({title:'Image'}),
		new app.ContentType({title:'Stack'}),
		new app.ContentType({title:'Other'}),
	]);

	app.contentTypeSelect = new app.ContentTypeSelect({
		collection: app.contentTypes,
		el: app.$contentTypeSelect[0]
	});

	app.contentTypeSelect.render();

	app.layoutTypes = new app.LayoutTypes([
		new app.LayoutType({title:'Vertical List'}),
		new app.LayoutType({title:'Horizontal List'}),
		new app.LayoutType({title:'Stamp Grid'}),
		new app.LayoutType({title:'Featured'}),
		new app.LayoutType({title:'Featured + List'}),
		new app.LayoutType({title:'Hero Image'}),
	]);

	app.layoutTypeSelect = new app.LayoutTypeSelect({
		collection: app.layoutTypes,
		el: app.$layoutTypeSelect[0]
	});

	app.layoutTypeSelect.render();

	app.stack = new app.Stack();

	app.stackView = new app.StackView({
		collection: app.stack,
		el: app.$stackContainer[0]
	});

	app.$stackContainer.sortable({
		items:"div.layer",
		cursor:"move",
		opacity:0.6,
		update:function(event,ui){
			// Code to run when dropped.
		}
	});

	app.$addLayerButton.click(function(){
		app.addLayer();
		return false;
	});
};

