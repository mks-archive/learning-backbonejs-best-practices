/**
 * editor.js - Backbone Model and View for the Editor of a Editor.
 */
app.Editor = Backbone.Model.extend({
	modelType: "Editor",
	defaults:{
		stack: new app.Stack()
	},
	initialize: function(){

	}
});
app.EditorView = Backbone.View.extend({
	viewType: "EditorView",
	el:"#editor-container",
	template: _.template(app.loadTemplate('editor')),
	layerAdditionForm: new app.LayerAdditionForm,
	stackView: false,
	initialize: function(options) {
		this.model = new app.Editor();
		this.stackView = new app.StackView({
			collection: this.model.get('stack')
		});
	},
	addLayer: function() {
		this.stackView.addLayer();
	},
	setLayerForm: function(form){
		$('#layer-form-container').empty().append(form.render().el);
		form.highlight();
	},
	render: function() {
		this.$el.html(this.template());
		this.layerAdditionForm.render();
		this.stackView.render().sortable();
		return this;
	}
});



