app.AddLayerButton = Backbone.View.extend({
	viewType: 'AddLayerButton',
	tagName: 'button',
	template: _.template('Add Layer'),
	events:{
		'click':'onClick'
	},
	onClick: function(){
		app.editor.addLayer();
		return false;
	},
	render: function(){
		this.setElement('#add-layer-button');
		this.$el.html(this.template());
		return this;
	}
});
