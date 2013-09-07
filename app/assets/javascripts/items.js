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

function dateStringFromDate(date) {
	return ((date.getMonth() + 1) + '/' + date.getDate());
}
function headerMarkersForZoomLevel(zoomLevel) {
	if (zoomLevel == null)
		return null;

	markers = [];
	date = new Date();
	switch (zoomLevel) {
		case 1:    // Week
			for (var i = 1; i <= 7; i++) {
				if (date.getDay() == 0) {	// Is Sunday
					markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker TimelineTextMarker'>" + dateStringFromDate(date) + "</span></span>");
				}
				else
					markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker' data-date-string='" + dateStringFromDate(date) + "'></span></span>");

				markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker TimelineSubmarker data-date-string='Afternoon'></span></span>");
				date.setDate(date.getDate() + 1);	// http://stackoverflow.com/a/3818198/472768
			}
			break;
		case 2:    // Two weeks
			for (var i = 1; i <= 14; i++) {
				if (date.getDay() == 0) {	// Is Sunday
					markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker TimelineTextMarker'>" + dateStringFromDate(date) + "</span></span>");
				}
				else
					markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker' data-date-string='" + dateStringFromDate(date) + "'></span></span>");

				markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker TimelineSubmarker' data-date-string='Afternoon'></span></span>");
				date.setDate(date.getDate() + 1);
			}
			break;
		case 3:    // Month
			for (var i = 1; i <= 31; i++) {
				if (date.getDay() == 0) {	// Is Sunday
					markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker TimelineTextMarker'>" + dateStringFromDate(date) + "</span></span>");
				}
				else
					markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker' data-date-string='" + dateStringFromDate(date) + "'></span></span>");

				date.setDate(date.getDate() + 1);
			}
			break;
		case 4:    // Quarter
			for (var i = 1; i <= 92; i++) {
				if (date.getDay() == 0)
					markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker TimelineTextMarker'>" + dateStringFromDate(date) + "</span></span>");
				else if (date.getDate() != 6 && date.getDate() != 1)
					markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker TimelineSubmarker' data-date-string='" + dateStringFromDate(date) + "'></span></span>");
				else
					markers.push("<span class='TimelineMarkerContainer'><span class='TimelineMarker TimelineHiddenMarker' data-date-string='" + dateStringFromDate(date) + "'></span></span>");

				date.setDate(date.getDate() + 1);
			}
			break;
	}
	return markers;
}
function timelineHeader(zoomLevel) {
	if (zoomLevel == null)
		zoomLevel = 2;

	var markers = headerMarkersForZoomLevel(zoomLevel);
	var divisor;
	switch (zoomLevel) {
		case 1:
			divisor = 14;
			break;
		case 2:
			divisor = 28;
			break;
		case 3:
			divisor = 31;
			break;
		case 4:
			divisor = 92;
			break;
	}
	var width = $('#content').width();
	var str = '';
	var w = 1 / divisor * width;
	for (var i = 0; i < markers.length; i++) {
		console.log(i);
		var m = markers[i];
		var style = "style='width: " + w + 'px' + "' ";
		m = m.slice(0, 6) + style + m.slice(6);
		str += m;
	}
	var html = "\
		<div id='timelineHeader'>\
			<div id='timelineHeaderMeta'>\
				<div class='IconButtonGroup' id='headerNavGroup'>\
					<span class='Icon Button' id='headerNavLeft'>&#xE809;</span>\
					<span class='Icon Button' id='headerNavRight'>&#xE80A;</span>\
				</div>\
				<div class='IconButtonGroup' id='headerZoomGroup'>\
					<span class='Icon Button' id='headerZoomIn'>&#xE80B;</span>\
					<span class='Icon Button' id='headerZoomOut'>&#xE80C;</span>\
				</div>\
			</div>\
			<div id='timelineHeaderMarks'>" + str + "</div>\
		</div>";
	return html;
}