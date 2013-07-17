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
