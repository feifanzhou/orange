function inboxListItem(item) {
	return "<li class='InboxListItem'>" + item.body + "</li>";
}

function inboxList(items, customID) {
	if (customID == null)
		customID = '';
	var list = "<button class='btn' id='composeMessageButton'>Compose Message</button>";
	list += "<ol class='InboxList ItemsList' id='" + customID + "'>";
	if (items.length > 0) {
		for (var i = 0; i < items.length; i++)
			list += inboxListItem(items[i]);
	}
	else {
		list += "<li class='InboxListItem'>Nothing in your inbox :)</li>";
	}
	list += "</ol>";
	return list;
}