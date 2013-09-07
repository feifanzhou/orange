function itemListItem(item) {
	var itemIcon;
	var checkIcon;
	
	if (item.type == 'Event')
		itemIcon = '&#xE805';	// Calendar
	else if (item.type == 'Note')
		itemIcon = '&#xE806';	// Note
	else
		itemIcon = '';

	checkIcon = '&#xE808';	// Unchecked box
	if (item.status == 'Completed')
		checkIcon = '&#xE807';	// Checked box

	return "<li class='ItemListItem' data-item-id='" + item.id + "' data-user-id='" + item.id + "'><span class='ItemListItemIcon Icon'>" + itemIcon + "</span><span class='ItemListItemCheckbox Icon'>" + checkIcon + "</span><span class='ItemListItemTitle'>" + item.name + "</span></li>";
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