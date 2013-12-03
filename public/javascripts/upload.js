
var holder = document.getElementById('upload');

var uploadFile = function(file) {
	var formData = new FormData();
	formData.append('file', file);
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/uploads');
	xhr.send(formData);
};



holder.ondragover = function() { $(this).addClass('hover'); return false; };
holder.ondragend = function() { $(this).removeClass('hover'); return false; };
holder.ondrop = function(e) {
	e.preventDefault();
	$(this).removeClass('hover');
	
	uploadFile(e.dataTransfer.files[0]);
};
