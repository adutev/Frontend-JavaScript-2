$(document).ready(function(){
	var data = {
        		name: "Gosho OtI Pochivka",
        		email: "jivka@gmail.com",
        		gitRepo: "malaga-baby",
        		hobbyProject: "The Famous Song"
    		}

	function Resource (url) {
		this.url = 'http://192.168.0.66:3000' + url;
	}

	Resource.prototype.query = function() {
		Q($.get(this.url));
	}

	Resource.prototype.view = function(id) {
		Q($.ajax({
		    url: this.url + '/' + id, // api endpoint
		    method: "get",          // method
		    dataType: "json"        // data type
		}));
	};

	Resource.prototype.create = function(data) {
		Q($.ajax({
		    url: this.url,
		    method: "post",  
		    data : data,
		    dataType: "json"
		}))
	};
	Resource.prototype.update = function(id, data) {
		Q($.ajax({
		    url: this.url + '/' + id,
		    method: "put",  
		    data : data,
		    dataType: "json"
		}))
	};

	Resource.prototype.delete = function(id) {
		Q($.ajax({
		    url: this.url + '/' + id,
		    method: "delete"
		}));
	};

	var student = new Resource('/api/students');
	student.query();
	// student.view('554ced73ccc854b667a23377');
	// student.update('554ced73ccc854b667a23377', update);
	// student.delete('554cebfec23b62f14096f062');	
	// student.view('554ced73ccc854b667a23377');
	// student.create(data)
	
});