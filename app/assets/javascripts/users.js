function userItemsListFilter(selectedIndex, userID) {
	if (selectedIndex == null)
		selectedIndex = 0;
	if (userID == null)
		userID = 0;
	// TODO: Use selectedIndex!
	return "\
		<ul class='SegmentToggle' id='userListItemFilter'>\
			<li class='SegmentToggleItem SegmentToggleItemSmall Selected' data-user-item-toggle='All' data-user-id='" + userID + "'>All</li>\
			<li class='SegmentToggleItem SegmentToggleItemSmall' data-user-item-toggle='Created' data-user-id='" + userID + "'>Created</li>\
			<li class='SegmentToggleItem SegmentToggleItemSmall' data-user-item-toggle='Assigned' data-user-id='" + userID + "'>Assigned</li>\
			<li class='SegmentToggleItem SegmentToggleItemSmall' data-user-item-toggle='Following' data-user-id='" + userID + "'>Following</li>\
		</ul>\
	";
}

function userListItem(user) {
	return "<li class='CategoryListItem' data-type='User' data-user-id='" + user.id + "'>" + user.fname + ' ' + user.lname + "</li>";
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