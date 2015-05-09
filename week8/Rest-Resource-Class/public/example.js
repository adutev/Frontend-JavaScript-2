Resource.prototype.query = function() {
	return Q($.get(this.url))
};

Resource.prototype.create = function() {
	return Q($.ajax({
		    url: this.url,
		    method: "get",
		    dataType: "json"
		}))
};