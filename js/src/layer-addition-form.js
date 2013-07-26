/**
 * layer-addition-form.js -
 */
app.LayerAdditionForm = Backbone.View.extend({
	viewType: "LayerAdditionForm",
	tagName: 'form',
	template: _.template(app.loadTemplate('layer-addition-form')),
	contentTypesSelect: false,
	layoutsSelect: false,
	addLayerButton: new app.AddLayerButton(),
	initialize: function(options) {
		this.contentTypesSelect = new app.ContentTypesSelect({
			collection: app.contentTypes
		});
		this.layoutsSelect = new app.LayoutsSelect({
			collection: app.layouts
		});
		this.addLayerButton = new app.AddLayerButton();
	},
	render: function() {
		this.setElement('#layer-addition-form');
		this.$el.html(this.template());
		this.contentTypesSelect.render();
		this.layoutsSelect.render();
		this.addLayerButton.render();
		return this;
	}
});
