function categoryListItem(categoryItem) {
	return "<li class='CategoryListItem'>" + categoryItem.name + "</li>";
}
function categoriesList(categories, customID) {
	if (customID == null)
		customID = '';
	var list = "<ul class='SidebarContentList CategoryList' id='" + customID + "'>";
	alert(JSON.stringify(categories, null, 4));
	for (var i = 0; i < categories.length; i++)
		list += categoryListItem(categories[i]);
	list += "</ul>";
	return list;
}