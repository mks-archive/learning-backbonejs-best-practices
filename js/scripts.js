/**
 * prefix.combinejs - Opening wrapper for use with CombineJS to wrap all Javascript code into a single /js/scripts.js
 */
jQuery(function($) {
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
app.loadTemplate = function(template) {
	if (typeof app.templates=="undefined") {
		app.templates = eval("(" + $("#backbone-templates").text() + ")");
	}
	return app.templates[template];
}
app._transformify=function(s,re,rp){
	var x;
	while (s!=x) {
		x = s;
		s = x.toLowerCase().replace(re,rp);
	}
	return s.replace(/[^\w\s-]/gi,'');
};
app.dashify=function(s){
	return app._transformify(s,/( |_|\/|\\|--)/g,'-');
};
app.underscorify=function(s){
	return app._transformify(s,/( |-|\/|\\|__)/g,'_');
};
app.camelify=function(s){// Converts foo-bar-string to fooBarString
	var a = s.split(/( |-|_)/);
	var cameled = a[0];
	for(var i=2;i<a.length;i+=2) {
		cameled += a[i].charAt(0).toUpperCase() + a[i].substr(1).toLowerCase();
	}
	return cameled;
};
/**
 * brands.js - Backbone Model and basic View for "Brands"
 *
 * A Brand is a type of product manufactured by under a particular name, i.e. "Diet Coke" or "Coke Zero."
 */
app.Brand = Backbone.Model.extend({
	defaults:{
		modelType:"Brand",
		title:"Untitled",
		container:null // ???
	},
	initialize: function(options) {
		this.attributes.title += " #" +(app.stack.length+1).toString();
		this.id = app.dashify(this.attributes.title);
	}
});
app.BrandView = Backbone.View.extend({
	tagName: 'div',
	className: "brand",
	initialize: function(options){
		this.options.viewType = "BrandView";
		this.model.bind('change',_.bind(this.render,this));
	},
	render: function(){
		var html = app.loadTemplate('brand-view');
		this.template = _.template(html);
		this.$el.attr('id',this.model.id);
		this.$el.attr('data-cid',this.model.cid);
		this.$el.html(this.template({brand:this.model}));
		return this;
	}
});
/**
 * geo-regions.js - Backbone Model and basic View for Geographic Regions
 *
 * A GeoRegion will be used to represent regions like North America, South America, etc.
 */
app.GeoRegion = Backbone.Model.extend({
	defaults:{
		modelType: "GeoRegion",
		title:"Untitled",
		container:null // ???
	},
	initialize: function(options) {
		this.attributes.title += " #" +(app.stack.length+1).toString();
		this.id = app.dashify(this.attributes.title);
	}
});
app.GeoRegionView = Backbone.View.extend({
	tagName: 'div',
	className: "region",
	initialize: function(options){
		this.options.viewType = "GeoRegionView";
		this.model.bind('change',_.bind(this.render,this));
	},
	render: function(){
		var html = app.loadTemplate('region-view');
		this.template = _.template(html);
		this.$el.attr('id',this.model.id);
		this.$el.attr('data-cid',this.model.cid);
		this.$el.html(this.template({region:this.model}));
		return this;
	}
});
/**
 * content-types.js - Backbone Model and basic View for Types of Content used for HTML <select>
 *
 * A Content Type is a type of content that can be presented in a "Layer", i.e. document, spreadsheet, video, etc.
 */
app.ContentType = Backbone.Model.extend({
	defaults:{
		modelType: "ContentType",
		title: "Untitled"
	},
	initialize: function(){
		this.id = "content-type-"+app.dashify(this.attributes.title.replace('+','plus'));
	}
});
app.ContentTypeOptionList = Backbone.Collection.extend({
	collectionType: "ContentTypeOptionList",
	model: app.ContentType
});
app.ContentTypeSelect = Backbone.View.extend({
	tagName: 'select',
	initialize: function(options){
		this.options.viewType = "ContentTypeSelect";
		this.options.selection = ""; // @todo Set this from stored value
		_.bind(this,"render");
	},
	render: function(){
		this.template = _.template(app.loadTemplate("content-type-select"));
		this.$el.html(this.template({options:this.collection}));
		this.$el.find("option[value=\"content-type-"+this.options.selection+"\"]").prop("selected",true);
		return this;
	}
});
/**
 * layout-types.js - Backbone Model and basic View for Types of Content used for HTML <select>
 *
 * A Content Type is a type of content that can be presented in a "Layer", i.e. document, spreadsheet, video, etc.
 *
 */
app.LayoutType = Backbone.Model.extend({
	defaults:{
		modelType: "LayoutType",
		title: "Untitled"
	},
	initialize: function(){
		this.id = "layout-type-"+app.dashify(this.attributes.title.replace('+','plus'));
	}
});
app.LayoutTypes = Backbone.Collection.extend({
	collectionType: "LayoutTypes",
	model: app.LayoutType
});
app.LayoutTypeSelect = Backbone.View.extend({
	tagName: 'select',
	initialize: function(options){
		this.options.viewType = "LayoutTypeSelect";
		this.options.selection = ""; // @todo Set this from stored value
		_.bind(this,"render");
	},
	render: function(){
		this.template = _.template(app.loadTemplate("layout-type-select"));
		this.$el.html(this.template({options:this.collection}));
		this.$el.find("option[value=\"layout-type-"+this.options.selection+"\"]").prop("selected",true);
		this.$el.change(function(){ alert('Layout Types Selected!');});
		return this;
	}
});
/**
 * layers.js - Backbone Model and Views for Layer display and edit form.
 *
 * A "Layer" is one of many that can be added to a "Stack" and for which criteria can be added to the layer.
 */
app.Layer = Backbone.Model.extend({
	defaults:{
		modelType: "Layer",
		title:"Untitled",
		container:null, // Stack
		form:null,	// LayerForm
		taxonomy:{},
		orderby:"most-recent",
		includeTerms:[],
		excludeTerms:[],
		includePosts:[],
		excludePosts:[]
	},
	initialize: function(options) {
		this.taxonomy = {
			brands:[],
			regions:[]
		};
		this.attributes.title += " #" +(app.stack.length+1).toString();
		this.id = app.dashify(this.attributes.title);
		this.form = new app.LayerForm({model:this});
	}
});
app.LayerForm = Backbone.View.extend({
	tagName: 'form',
	className: "layer-form",
	initialize: function(options){
		this.options.viewType = "LayerForm";
		this.id = this.className;
		this.options.htmlName = app.underscorify(this.id);
	},
	render: function(){
		var html = app.loadTemplate('layer-form');
		this.template = _.template(html);
		this.$el.hide();
		this.$el.attr('id',this.id);
		this.$el.attr('name',this.options.htmlName);
		this.$el.html(this.template({
			id:this.id,
			layer:this.model.attributes
		}));
		this.$el.effect("highlight", {}, 1500);
		return this;
	}
});
app.LayerView = Backbone.View.extend({
	tagName: 'div',
	className: "layer",
	initialize: function(options){
		this.options.viewType = "LayerView";
		this.options.selected = false;
		this.options.form = new app.LayerForm({
			model:this.model,
			el:app.$layerFormContainer[0]
		});
		this.listenTo(this.model,'change',this.render);
	},
	render: function(){
		var html = app.loadTemplate('layer');
		this.template = _.template(html);
		if (this.options.selected) {
			this.$el.hide();
		}
		this.$el.attr('id',this.model.id);
		this.$el.attr('data-cid',this.model.cid);
		if ( this.options.selected ) {
			this.$el.addClass('selected');
		} else {
			this.$el.removeClass('selected');
		}
		this.$el.html(this.template({layer:this.model.attributes}));
		if (this.options.selected) {
			this.$el.fadeIn();
		}
		return this;
	}
});
/**
 * stack.js - Backbone Model and basic Views for a "Stack".
 *
 * A Stack cab have one of more veritcally displayed layers for which criteria can be added to the layer.
 */
app.Stack = Backbone.Collection.extend({
	modelType: "Stack",
	model: app.Layer
});
app.StackView = Backbone.View.extend({
	events:{
		'click .layer':'onLayerClick'
	},
	initialize: function(options) {
		this.options.viewType = "StackView";
		if (!("collection" in this)) {
			this.collection = new app.Stack();
		}
		this.listenTo(this.collection,'add',this.onAdd,this);
		this._layerViews = [];
	},
	onAdd: function(layer){
		var layerView = this._layerViews[layer.cid] = new app.LayerView({model:layer});
		this.select(layerView).render();
	},
	getLayerView: function(layer){
		var cid = _.isObject(layer) ? layer.cid : layer;
		return cid in this._layerViews ? this._layerViews[cid] : null;
	},
	render: function() {
		var layerView,that = this;
		this.$el.empty();	// @todo Render only what is needed
		this.$el.attr('data-cid',this.cid);
		this.collection.each(function(layer){
			layerView = that._layerViews[layer.cid];
			that.$el.append(layerView.render().el);
		});
		that.$el.append("<div class=\"clear\"></div>");
		return this;
	},
	onLayerClick:function(event){
		app.stackView.select(this.getLayerView(event.target.dataset.cid)).render();
	},
	select:function(layerView){
		var that = this;
		this.collection.each(function(layer){
			that.getLayerView(layer.cid).options.selected = false;
		});
		layerView.options.selected = true;
		layerView.options.form.render();
		return this;
	}
});
/**
 * postfix.combinejs - Closing wrapper for use with CombineJS to wrap all Javascript code into a single /js/scripts.js
 */
  app.execute();
});
//@ sourceMappingURL=scripts.js.map
