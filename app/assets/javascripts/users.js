function userListItem(user) {
	return "<li class='CategoryListItem' data-user-id='" + user.id + "'>" + user.fname + ' ' + user.lname + "</li>";
}
function usersList(users, customID) {
	if (customID == null)
		customID = '';
	var list = "<ul class='SidebarContentList CategoryList' id='" + customID + "'>";
	for (var i = 0; i < users.length; i++)
		list += userListItem(users[i]);
	list += "</ul>";
	return list;
}