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

