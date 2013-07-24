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
	el:'#layouts-select',
	tagName: 'select',
	initialize: function(){
		this.template = _.template(app.loadTemplate('layouts-select'));
		this.options.viewType = "LayoutsSelect";
		this.options.selection = ""; // @todo Set this from stored value
		//_.bind(this,"render");
	},
	render: function(){
		this.$el.html(this.template({options:this.collection}));
		this.$el.find("option[value=\"layout-"+this.options.selection+"\"]").prop("selected",true);
		return this;
	}
});

