/**
 * stack.js - Backbone Model and basic Views for a "Stack".
 *
 * A Stack cab have one of more veritcally displayed layers for which criteria can be added to the layer.
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
	el:"#stack-container",
	initialize: function(options) {
		this.options.viewType = "StackView";
		this.options.selected = null;
		if (!("collection" in this)) {
			this.collection = new app.Stack();
		}
		this.listenTo(this.collection,'add',this.onAddLayer,this);
		this._layerViews = [];
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
		//this.$el.empty();	// @todo Render only what is needed
		this.$el.attr('data-cid',this.cid);
		this.collection.each(function(layer){
			layerView = outerThis._layerViews[layer.cid];
			outerThis.$el.append(layerView.render().el);
		});
		this.$el.append("<div class=\"clear\"></div>");
		return this;
	},
	select:function(layerView){
		if (this.options.selected)
			this.options.selected.deselect();
		var form = new app.LayerForm({
			model:layerView.model
		});
		app.$layerFormContainer.empty().append(form.render().el);
		form.highlight();
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

