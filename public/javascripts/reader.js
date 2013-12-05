document.onkeydown = function(e) {
	if (e.which == 37) {
		if (componentPrev) {
			window.location = '/' + componentPrev.href;
		}
	}
	else if (e.which == 39) {
		if (componentNext) {
			window.location = '/' + componentNext.href;
		}
	}
};