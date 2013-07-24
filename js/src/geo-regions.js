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
