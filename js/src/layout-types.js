/**
 * layout-types.js - Backbone Model and basic View for Types of Content used for HTML <select>
 *
 * A Layout Type is a type of content that can be presented in a "Layer", i.e. horizontal list, vertical list, etc.
 */
app.LayoutType = Backbone.Model.extend({
	defaults:{
		modelType: "LayoutType",
		text: "Untitled",
		value: false
	},
	initialize: function(){
		this.id = app.dashify(this.get('text').replace('+','plus')).replace(/^-+\s*(.*)$/,'$1');
		if ( ! this.get('value') )
			this.set('value',this.id);
	}
});
app.LayoutTypes = Backbone.Collection.extend({
	collectionType: "LayoutTypes",
	model: app.LayoutType
});
app.LayoutTypeSelect = Backbone.View.extend({
	el:'#layout-type-select',
	tagName: 'select',
	initialize: function(options){
		this.options.viewType = "LayoutTypeSelect";
		this.options.selection = ""; // @todo Set this from stored value
		//_.bind(this,"render");
	},
	render: function(){
		this.template = _.template(app.loadTemplate("layout-type-select"));
		this.$el.html(this.template({options:this.collection}));
		this.$el.find("option[value=\"layout-type-"+this.options.selection+"\"]").prop("selected",true);
		return this;
	}
});

