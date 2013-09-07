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
function divisorForZoomLevel(zoomLevel) {
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
	return divisor;
}
function timelineHeader(zoomLevel) {
	if (zoomLevel == null)
		zoomLevel = 2;

	var markers = headerMarkersForZoomLevel(zoomLevel);
	var divisor = divisorForZoomLevel(zoomLevel);
	var width = $('#content').width();
	var str = '';
	var w = 1 / divisor * width;
	for (var i = 0; i < markers.length; i++) {
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

var _MS_PER_DAY = 1000 * 60 * 60 * 24;
var _MS_PER_HOUR = 1000 * 60 * 60;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
function dateDiffInHours(a, b) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());

  return Math.floor((utc2 - utc1) / _MS_PER_HOUR);
}
function dateDiffInMS(a, b) {
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());

  return utc2 - utc1;
}
function drawTimelineForGroups(groups, groupType, zoomLevel) {
	var rootPath = groupType.toLowerCase();
	// TODO: Limit items by zoomLevel. Don't get every single item ever associated with group
	var html = '';
	var inners = new Array();
	var counter = 0;
	var doubleZoom = (zoomLevel == 1 || zoomLevel == 2) ? true : false
	var hues = new Array();
	for (var i = 0; i < groups.length; i++)
		hues.push(Math.round(Math.random() * 360));
	var seenIDs = [];
	var duplicateIDs = [];
	
	for (var i = 0; i < groups.length; i++) {
		$.ajax({
			url: '/' + rootPath + '/' + groups[i].id + '/all_items',
			type: 'GET',
			dataType: 'JSON',
			success: function(data) {
				counter += 1;
				inners.push([]);
				var id = groups[counter - 1].id;
				var items = data.items;

				var endDays;
				switch (zoomLevel) {
					case 1:
						endDays = 7;
						break;
					case 2:
						endDays = 14;
						break;
					case 3:
						endDays = 31;
						break;
					case 4:
						endDays = 92;
						break;
				}
				var sortedItems = new Array();
				for (var j = 0; j < items.length; j++) {
					var item = items[j];
					var end_at = new Date(item.end_at);
					if (end_at <= new Date())
						continue;
					var start_at = new Date(item.start_at);
					if (start_at >= new Date().setDate(new Date().getDate() + endDays))
						continue;

					var level = 0;	// Start at lowest level
					var sorted = false
					while (!sorted) {
						if (sortedItems[level] == null || sortedItems[level].length == 0) {
							// Creating a new level if needed
							sortedItems[level] = [item];
							sorted = true;
							break;
						}
						var levelOpen = true;
						for (var k = 0; k < sortedItems[level].length; k++) {	// Check for any overlapping at this level
							var start = new Date((sortedItems[level][k]).start_at);
							var end = new Date((sortedItems[level][k]).end_at);
							if (start_at >= start && end_at <= end)		// completely overlapping
								levelOpen = false;
							if (start_at < start && end_at > start && end_at <= end)	// Overlap beginning of existing
								levelOpen = false;
							if (start_at > start && start_at < end && end_at > end)		// Overlap end of existing
								levelOpen = false;
						}
						if (levelOpen) {	// If no overlap, add to current level
							sortedItems[level].push(item);
							sorted = true;
							break;
						}
						else {
							level += 1;		// If overlapped, increment level and try again
							continue;
						}
					}
				}

				var ROW_HEIGHT = 60;
				var LEVEL_HEIGHT = 60 / sortedItems.length;
				var width = $('#content').width();
				var divisor = divisorForZoomLevel(zoomLevel);
				var markerWidth = 1 / divisor * width;
				var markerOffset = 0.5 * markerWidth;	// To line up with marker, in middle of block;
				var hourDivisor = (zoomLevel == 1 || zoomLevel == 2) ? 12 : 24;
				var now = new Date();
				for (var j = 0; j < sortedItems.length; j++) {
					var rowHTML = "<div style='height: " + LEVEL_HEIGHT + "px' class='TimelineRowLevel'>";
					for (var k = 0; k < sortedItems[j].length; k++) {
						var item = sortedItems[j][k];
						var start_at = new Date(item.start_at);
						var end_at = new Date(item.end_at);
						var daysDiff = dateDiffInDays(now, start_at);
						var left = (doubleZoom) ? (daysDiff * 2 * markerWidth) : (daysDiff * markerWidth);
						if (doubleZoom) {
							if (start_at.getHours() >= 12)
								left += markerWidth;
							left += (start_at.getHours() % 12) / 12 * markerWidth;
						}
						else {
							left += (start_at.getHours() / 24) * markerWidth;
						}
						left += markerOffset;

						var durationDays = dateDiffInDays(start_at, end_at);
						var msdelta = dateDiffInMS(start_at, end_at);
						var iWidth;
						if (doubleZoom)
							iWidth = msdelta / (1000 * 3600 * 12) * markerWidth;
						else
							iWidth = msdelta / (1000 * 3600 * 24) * markerWidth;

						var sat = (item.status == 'Completed') ? 89 : 9;
						var lit = (item.status == 'Completed') ? 51 : 30;
						var hsl = 'hsl(' + hues[counter - 1] + ', ' + sat + ', ' + lit + ')';
						var color = tinycolor(hsl);

						rowHTML += "<div style='background: " + color.toHexString() + "; left: " + left + "px; margin-top: " + ((LEVEL_HEIGHT - 8) / 2) + "px; width: " + iWidth + "px' data-item-id='" + item.id + "' class='TimelineItem'></div>";
						
						if ($.inArray(item.id, seenIDs) > -1) {
							if ($.inArray(item.id, duplicateIDs) < 0) {
								duplicateIDs.push(item.id);
							}
						}
						else
							seenIDs.push(item.id);
					}
					rowHTML += '</div>';
					inners[counter - 1].push(rowHTML);
				}

				if (counter >= (groups.length)) {
					for (var x = 0; x < inners.length; x++) {
						html += "<div class='TimelineRow' data-group-type='" + groupType + "'>";
						for (var y = 0; y < inners[x].length; y++)
							html += inners[x][y];
						html += '</div>';
					}
					$('#content').append(html);

					// Draw vertical lines between the same items
					for (var i = 0; i < duplicateIDs.length; i++) {
						var offsets = [];
						var currID = duplicateIDs[i];
						var selector = "[data-item-id='" + currID + "']";
						var left;
						$(selector).each(function() {
							var offset = $(this).offset();
							offsets.push(offset.top);
							left = offset.left;
						});
						offsets.sort();
						var height = offsets[offsets.length - 1] - offsets[0];
						var bar = "<span class='SameItemBar' style='height: " + height + "px; left: " + left + "px; top: " + offsets[0] + "px'>";
						$('body').append(bar);
					}
				}
			}
		});
	}
}

$('body').on('click', '#content, html, body', function() {
	$('.TimelineItem').popover('destroy');
});
$('body').on('click', '.TimelineItem', function() {
	$('.TimelineItem').popover('destroy');
	var item = $(this);
	var itemID = $(item).data('item-id');
	var path = '/items/' + itemID;
	$.ajax({
		url: path,
		type: 'GET',
		success: function(data) {
			var cutStart = data.indexOf('<!-- BEGIN_MODAL -->');
			var cutEnd = data.indexOf('<!-- END_MODAL -->');
			var html = data.slice(cutStart, cutEnd);
			$(item).popover({
				content: html,
				html: true
			}).popover('show');
		}
	});
});