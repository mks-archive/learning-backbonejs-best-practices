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

