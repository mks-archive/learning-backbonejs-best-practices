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

