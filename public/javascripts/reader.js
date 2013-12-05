document.onkeydown = function(e) {
	if (e.which == 37) {
		if (componentPrev) {
			window.location = '/' + encodeURI(componentPrev.href);
		}
	}
	else if (e.which == 39) {
		if (componentNext) {
			window.location = '/' + encodeURI(componentNext.href);
		}
	}
	else if (e.which == 27) {
		localStorage.clear();
		window.location = '/';
	}
	else if (e.which == 46) {
		localStorage.clear();
	}
	else if (e.which == 80) {
		var out = {};
		for (var i = 0; i < localStorage.length; i++) {
			out[localStorage.key(i)] = JSON.parse(localStorage[localStorage.key(i)]);
		}
		out = JSON.stringify(out, null, '  ');
		console.log(out);
	}
};


document.onmouseup = function(e) {
	var selection = window.getSelection();
	if (selection.toString()) {
		var range = selection.getRangeAt(0);
		var segment = {
			position: getPathTo(range.startContainer) + ':' + range.startOffset + ',' + getPathTo(range.endContainer) + ':' + range.endOffset,
			text: range.toString()
		};
		console.log(segment);
		
		var segments = (localStorage[component.id]) ? JSON.parse(localStorage[component.id]) : [];
		segments.push(segment);
		localStorage[component.id] = JSON.stringify(segments);
	}
};



function getPathTo(element) {
	if (element.tagName == undefined) {
		return getPathTo(element.parentNode);
	}	
	var siblings = element.parentNode.childNodes;
	for (var i = 0; i < siblings.length; i++) {
		if (siblings[i] === element) {
			if (element.parentNode.tagName == 'BODY') {
				return i;
			}
			else {
				return getPathTo(element.parentNode) + '/' + i;
			}
		}
	}
}
