
var holder = document.getElementById('upload');

var uploadFile = function(file) {
	var formData = new FormData();
	formData.append('file', file);
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/uploads');
	xhr.send(formData);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var response = JSON.parse(xhr.response);
				window.location = '/' + encodeURI(response.firstComponent.href);
			}
		}
	};
};



holder.ondragover = function() { $(this).addClass('hover'); return false; };
holder.ondragend = function() { $(this).removeClass('hover'); return false; };
holder.ondrop = function(e) {
	e.preventDefault();
	$(this).removeClass('hover');
	
	uploadFile(e.dataTransfer.files[0]);
};
