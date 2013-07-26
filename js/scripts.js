/**
 * prefix.combinejs - Opening wrapper for use with CombineJS to wrap all Javascript code into a single /js/scripts.js
 */
(function($) {
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
app.loadData = function(dataType) {
	if (typeof app._data=="undefined") {
		app._data = eval("(" + $("#backbone-data").text() + ")");
	}
	return app._data[dataType];
}
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
app.DivElement = Backbone.View.extend({
	initialize: function(options){
		if(!options.template) {
			this.template = _.template(app.loadTemplate(options.id));
		} else {
			this.template = _.template(options.template);
		}
	},
	render: function(){
		this.$el.attr('id',this.id);
		this.$el.attr('class',this.className);
		this.$el.html(this.template(this.options));
		return this;
	}
});

app.DivWrapper = app.DivElement.extend({
	className:'wrapper clearfix'
});

app.SideBySideDivWrapper = app.DivWrapper.extend({
	className:this.className+' side-by-side'
});
app.AddLayerButton = Backbone.View.extend({
	viewType: 'AddLayerButton',
	tagName: 'button',
	template: _.template('Add Layer'),
	events:{
		'click':'onClick'
	},
	onClick: function(){
		app.editor.addLayer();
		return false;
	},
	render: function(){
		this.setElement('#add-layer-button');
		this.$el.html(this.template());
		return this;
	}
});
/**
 * layer-addition-form.js -
 */
app.LayerAdditionForm = Backbone.View.extend({
	viewType: "LayerAdditionForm",
	tagName: 'form',
	template: _.template(app.loadTemplate('layer-addition-form')),
	contentTypesSelect: false,
	layoutsSelect: false,
	addLayerButton: new app.AddLayerButton(),
	initialize: function(options) {
		this.contentTypesSelect = new app.ContentTypesSelect({
			collection: app.contentTypes
		});
		this.layoutsSelect = new app.LayoutsSelect({
			collection: app.layouts
		});
		this.addLayerButton = new app.AddLayerButton();
	},
	render: function() {
		this.setElement('#layer-addition-form');
		this.$el.html(this.template());
		this.contentTypesSelect.render();
		this.layoutsSelect.render();
		this.addLayerButton.render();
		return this;
	}
});
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
	template: false,
	initialize: function(){
		this.template||(this.template=_.template(app.loadTemplate('brand-view')));
		this.options.viewType = "BrandView";
		this.model.on('change',this.render);
	},
	render: function(){
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
	template: false,
	initialize: function(){
		this.template||(this.template=_.template(app.loadTemplate('region-view')));
		this.options.viewType = "GeoRegionView";
		this.model.bind('change',_.bind(this.render,this));
	},
	render: function(){
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
		text: "Untitled",
		value: false
	},
	initialize: function(){
		this.id = app.dashify(this.get('text').replace('+','plus')).replace(/^-+\s*(.*)$/,'$1');
		if ( ! this.get('value') )
			this.set('value',this.id);
	}
});
app.ContentTypes = Backbone.Collection.extend({
	collectionType: "ContentTypes",
	model: app.ContentType
},{/* @todo Try passing .load() in here */});
app.ContentTypes.load = function(){
	return new app.ContentTypes(app.loadData('content-types-select'));
};

app.ContentTypesSelect = Backbone.View.extend({
	viewType: "ContentTypesSelect",
	tagName: 'select',
	initialize: function(){
		this.template = _.template(app.loadTemplate('content-types-select'));
		this.options.selection = ""; // @todo Set this from stored value
	},
	render: function(){
		this.setElement('#content-types-select');
		this.$el.html(this.template({options:this.collection}));
		this.$el.find("option[value=\"content-type-"+this.options.selection+"\"]").prop("selected",true);
		return this;
	},
	getValue: function(){
		return this.$el.val();
	}
});
app.contentTypes = app.ContentTypes.load();
/**
 * layouts.js - Backbone Model and basic View for Types of Content used for HTML <select>
 *
 * A Layout is a type of content that can be presented in a "Layer", i.e. horizontal list, vertical list, etc.
 */
app.Layout = Backbone.Model.extend({
	defaults:{
		modelType: "Layout",
		text: "Untitled",
		value: false
	},
	initialize: function(){
		this.id = app.dashify(this.get('text').replace('+','plus')).replace(/^-+\s*(.*)$/,'$1');
		if ( ! this.get('value') )
			this.set('value',this.id);
	}
});
app.Layouts = Backbone.Collection.extend({
	collectionType: "Layouts",
	model: app.Layout
	/**
	 * Load Layouts for HTML Select
	 *
	 * @example data
	 * 	new app.Layout({text:'Vertical List'}),
	 * 	new app.Layout({text:'Horizontal List'}),
	 * 	new app.Layout({text:'Stamp Grid'}),
	 * 	new app.Layout({text:'Featured'}),
	 * 	new app.Layout({text:'Featured + List'}),
	 * 	new app.Layout({text:'Hero'}),
	 *
	 * @returns {app.Layouts}
	 */
});

app.Layouts.load = function(){
	return new app.Layouts(app.loadData('layouts-select'));
};

app.LayoutsSelect = Backbone.View.extend({
	tagName: 'select',
	template: _.template(app.loadTemplate('layouts-select')),
	initialize: function(){
		this.options.viewType = "LayoutsSelect";
		this.options.selection = ""; // @todo Set this from stored value
		//_.bind(this,"render");
	},
	render: function(){
		this.setElement('#layouts-select');
		this.$el.html(this.template({options:this.collection}));
		this.$el.find("option[value=\"layout-"+this.options.selection+"\"]").prop("selected",true);
		return this;
	},
	getValue: function(){
		return this.$el.val();
	}
});
/**
 * layers.js - Backbone Model and Views for Layer display and edit form.
 *
 * A "Layer" is one of many that can be added to a "Stack" and for which criteria can be added to the layer.
 *
 * @see http://stackoverflow.com/questions/13269071/howto-bind-a-click-event-in-a-backbone-subview
 */
app.Layer = Backbone.Model.extend({
	id:false,
	defaults:{
		modelType: "Layer",
		contentType:false,
		layout:false,
		title:"Untitled",
		container:false, // Stack
		form:false,	// LayerForm
		related:{},
		orderby:"most-recent",
		includeTerms:[],
		excludeTerms:[],
		includePosts:[],
		excludePosts:[],
		order:0
	},
	onChange: function(layer) {
		app.trigger('layer:changed');
	},
	initialize: function(attributes) {
		this.related = {
			brands:[],
			regions:[]
		};
		app.trigger('layer:nextId',this);
		if (!this.id)
			this.id = _.uniqueId('untitled-');
		this.on('change',this.onChange);
	}
});

app.LayerForm = Backbone.View.extend({
	tagName: 'form',
	className: "layer-form",
	template: false,
	events:{
		'keyup #layer-title': 'onUpdateTitle'
	},
	initialize: function(){
		this.template||(this.template=_.template(app.loadTemplate('layer-form')));
		this.options.viewType = "LayerForm";
		this.id = this.className;
		this.options.htmlName = app.underscorify(this.className);
	},
	onUpdateTitle: function(event){
		this.model.set('title', $(event.target).val() );
	},
	highlight: function(){
		this.$el.effect("highlight",{},1500);
	},
	render: function(){
		this.$el.hide();
		this.$el.attr('id',this.id);
		this.$el.attr('name',this.options.htmlName);
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	close:function() {
		this.remove();
		this.unbind();
		this.stopListening();
	}
});
app.LayerView = Backbone.View.extend({
	tagName: 'div',
	className: 'layer',
	template: false,
	events:{
		'click':'onClick'
	},
	initialize: function(options){
		this.template||(this.template=_.template(app.loadTemplate('layer')));
		this.options.viewType = "LayerView";
		if (typeof options.container=="undefined")
			this.options.container = app.stackView;
		this.listenTo(this.model,'change',this.render);
	},
	onClick: function(){
		this.select();
	},
	select: function(){
		app.stackView.select(this).render();
	},
	deselect: function(){
		this.options.form.close();
		this.$el.removeClass("selected");
	},
	isSelected: function() {
		return this===this.options.container.options.selected;
	},
	render: function(){
		var isSelected;
		this.$el.attr('id',this.model.id);
		/**
		 * @todo this next does not work but the one after it
		 * does and I don't understand what the difference is.
		 */
		//this.$el.data('cid',this.model.cid);
		this.$el.attr('data-cid',this.model.cid);
		if (isSelected = this.isSelected()) {
			this.$el.addClass('selected');
		}
		this.$el.html(this.template(this.model.toJSON()));
		if (isSelected) {
			this.$el.fadeIn();
		}
		return this;
	}
});
app.layouts = app.Layouts.load();
/**
 * stack.js - Backbone Model and basic Views for a "Stack".
 *
 * A Stack can have one of more veritcally displayed layers for which criteria can be added to the layer.
 */
app.Stack = Backbone.Collection.extend({
	modelType: "Stack",
	model: app.Layer,
	initialize: function(){
		this.on('add',function(){ app.trigger('layer:changed') });
	},
	comparator: function(layer) {
		return layer.get('order');
	}
});
app.StackView = Backbone.View.extend({
	viewType: 'StackView',
	events: {
		'layer:changed': 'onLayerChanged',
		'layer:nextId': 'onNextId'
	},
	initialize: function(options) {
		this.options.selected = null;
		if (!("collection" in this)) {
			this.collection = new app.Stack();
		}
		this.listenTo(this.collection,'add',this.onAddLayer,this);
		this._layerViews = [];
	},
	onNextId: function(layer){
		layer.id = _.uniqueId(app.dashify(layer.title)+'-');
	},
	onLayerChanged: function(layer){
		var layers = _.map(this.model.stack.models,function(layer){
			var cloned = _.extend({},layer).attributes;
			delete cloned.container;
			return cloned;
		});
		/**
		 * @todo This should be handled by it's own view.
		 */
		$('#stack-json').val(JSON.stringify(layers));
	},
	addLayer: function() {
		var form = app.editor.layerAdditionForm;
		var layer = new app.Layer({
			contentType: form.contentTypesSelect.getValue(),
			layout: form.layoutsSelect.getValue(),
			container: this
		});
		this.collection.add(layer);
		return this;
	},
	onAddLayer: function(layer){
		var layerView = this._layerViews[layer.cid] = new app.LayerView({
			model:layer,
			container:this
		});
		this.select(layerView).render();
	},
	getLayerView: function(layer){
		var cid = _.isObject(layer) ? layer.cid : layer;
		return cid in this._layerViews ? this._layerViews[cid] : null;
	},
	render: function() {
		var layerView,outerThis = this;
		// @todo Render only what is needed
		this.$el.attr('data-cid',this.cid);
		this.setElement('#stack-container');
		this.collection.each(function(layer){
			layerView = outerThis._layerViews[layer.cid];
			outerThis.$el.append(layerView.render().el);
		});
		return this;
	},
	select:function(layerView){
		if (this.options.selected)
			this.options.selected.deselect();
		var form = new app.LayerForm({
			model:layerView.model
		});
		app.editor.setLayerForm(form);
		layerView.options.form = form;
		this.options.selected = layerView;
		return this;
	},
	sortable:function(options){
		var outerThis = this;
		this.$el.sortable(_.extend({},options,{
			items:"div.layer",
			cursor:"move",
			opacity:0.6,
			update:function(event,ui){
				var i= 1;
				_(outerThis.$el.sortable("toArray",{attribute:"data-cid"})).each(function(cid){
					outerThis._layerViews[cid].model.set('order',i++);
				});
				outerThis.collection.sort();
				outerThis.render();
			}
		}));
	}
});
/**
 * editor.js - Backbone Model and View for the Editor of a Editor.
 */
app.Editor = Backbone.Model.extend({
	modelType: "Editor",
	defaults:{
		stack: new app.Stack()
	},
	initialize: function(){

	}
});
app.EditorView = Backbone.View.extend({
	viewType: "EditorView",
	el:"#editor-container",
	template: _.template(app.loadTemplate('editor')),
	layerAdditionForm: new app.LayerAdditionForm,
	stackView: false,
	initialize: function(options) {
		this.model = new app.Editor();
		this.stackView = new app.StackView({
			collection: this.model.get('stack')
		});
	},
	addLayer: function() {
		this.stackView.addLayer();
	},
	setLayerForm: function(form){
		$('#layer-form-container').empty().append(form.render().el);
		form.highlight();
	},
	render: function() {
		this.$el.html(this.template());
		this.layerAdditionForm.render();
		this.stackView.render().sortable();
		return this;
	}
});
/**
 * postfix.combinejs - Closing wrapper for use with CombineJS to wrap all Javascript code into a single /js/scripts.js
 */
  app.render();
})(jQuery);
//@ sourceMappingURL=scripts.js.map
