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

