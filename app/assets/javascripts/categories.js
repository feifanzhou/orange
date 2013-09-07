function categoryListItem(categoryItem) {
	return "<li class='CategoryListItem' data-category-id='" + categoryItem.id + "'>" + categoryItem.name + "</li>";
}
function categoriesList(categories, customID) {
	if (customID == null)
		customID = '';
	var list = "<ul class='SidebarContentList CategoryList' id='" + customID + "'>";
	for (var i = 0; i < categories.length; i++)
		list += categoryListItem(categories[i]);
	list += "</ul>";
	return list;
}