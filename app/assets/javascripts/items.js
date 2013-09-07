function itemListItem(item) {
	return "<li class='ItemListItem' data-user-id='" + item.id + "'>" + item.name + "</li>";
}
function itemsList(items, customID) {
	if (customID == null)
		customID = '';
	var list = "<ul class='MainContentList ItemsList' id='" + customID + "'>";
	for (var i = 0; i < items.length; i++)
		list += itemListItem(items[i]);
	list += "</ul>";
	return list;
}

$('body').on('click', '#userListItemFilter .SegmentToggleItem', function() {
	if ($(this).hasClass('Selected'))
		return;

	$('#userListItemFilter .SegmentToggleItem').removeClass('Selected');
	$(this).addClass('Selected');

	var content = $(this).data('user-item-toggle');
	var userID = $(this).data('user-id');

	$('#contentItems').remove();
	if (content == 'All') {
		$.ajax({
			url: '/user/' + userID + '/all_items',
			type: 'GET',
			dataType: 'JSON',
			success: function(data) {
				var html = itemsList(data.items, 'contentItems');
				$('#content').append(html);
			}
		});
	}
	else if (content == 'Created') {
		$.ajax({
			url: '/user/' + userID + '/created_items',
			type: 'GET',
			dataType: 'JSON',
			success: function(data) {
				var html = itemsList(data.items, 'contentItems');
				$('#content').append(html);
			}
		});
	}
	else if (content == 'Assigned') {
		$.ajax({
			url: '/user/' + userID + '/assigned_items',
			type: 'GET',
			dataType: 'JSON',
			success: function(data) {
				var html = itemsList(data.items, 'contentItems');
				$('#content').append(html);
			}
		});
	}
	else if (content == 'Following') {
		$.ajax({
			url: '/user/' + userID + '/followed_items',
			type: 'GET',
			dataType: 'JSON',
			success: function(data) {
				var html = itemsList(data.items, 'contentItems');
				$('#content').append(html);
			}
		});
	}
	else
		return;
});