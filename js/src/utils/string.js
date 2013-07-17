app._transformify=function(s,re,rp){
	var x;
	while (s!=x) {
		x = s;
		s = x.toLowerCase().replace(re,rp);
	}
	return s.replace(/[^\w\s-]/gi,'');
};
app.dashify=function(s){
	return app._transformify(s,/( |_|\/|\\|--)/g,'-');
};
app.underscorify=function(s){
	return app._transformify(s,/( |-|\/|\\|__)/g,'_');
};
app.camelify=function(s){// Converts foo-bar-string to fooBarString
	var a = s.split(/( |-|_)/);
	var cameled = a[0];
	for(var i=2;i<a.length;i+=2) {
		cameled += a[i].charAt(0).toUpperCase() + a[i].substr(1).toLowerCase();
	}
	return cameled;
};
