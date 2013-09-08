function inboxListItem(item) {
	return "<li class='InboxListItem'>" + item.name + "</li>";
}

function inboxList(items, customID) {
	if (customID == null)
		customID = '';
	var list = "<ol class='InboxList ItemsList' id='" + customID + "'>";
	for (var i = 0; i < items.length; i++)
		list += inboxListItem(items[i]);
	list += "</ol>";
	return list;
}