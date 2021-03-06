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

