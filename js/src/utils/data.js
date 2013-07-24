app.loadData = function(dataType) {
	if (typeof app._data=="undefined") {
		app._data = eval("(" + $("#backbone-data").text() + ")");
	}
	return app._data[dataType];
}
