function loadAllCategories() {
	$.ajax({
		url: '/categories',
		type: 'GET',
		dataType: 'JSON',
		success: function(data) {
			var html = categoriesList(data.categories, 'sidebarCategories');
			$('#sidebarContent').html(html);
			$('#content').html(timelineHeader(2));
			drawTimelineForGroups(data.categories, 'Category', 2);
		}
	});
}
function loadAllPeople() {
	$.ajax({
		url: '/users',
		type: 'GET',
		dataType: 'JSON',
		success: function(data) {
			var html = usersList(data.users, 'sidebarCategories');
			$('#sidebarContent').html(html);
			$('#content').html(timelineHeader(2));
			$('#content').append(timelineForGroups(data.users, 'User', 2));
		}
	});
}
function toggleSidebarContent(content) {
	if (content == 'categories')
		loadAllCategories();
	else if (content == 'people')
		loadAllPeople();
	else
		console.log('toggle invalid content');
}
$('body').on('click', '#sidebarModeToggle .SegmentToggleItem', function() {
	$('#sidebarModeToggle .SegmentToggleItem').removeClass('Selected');
	$(this).addClass('Selected');
	toggleSidebarContent($(this).data('toggle'));
});

$('body').on('click', '.CategoryListItem', function() {
	if ($(this).hasClass('Selected')) {
		$(this).removeClass('Selected');
		$('#content').html(timelineHeader(2));
		return;
	}
	$('.CategoryListItem').removeClass('Selected');
	$(this).addClass('Selected');
	var type = $(this).data('type');
	if (type == 'Category') {
		var categoryID = $(this).data('category-id');
		$.ajax({
			url: '/category/' + categoryID + '/items',
			type: 'GET',
			dataType: 'JSON',
			success: function(data) {
				var html = itemsList(data.items, 'contentItems');
				$('#content').html(html);
			}
		})
	}
	else if (type == 'User') {
		var userID = $(this).data('user-id');
		$('#content').html(userItemsListFilter(0, userID));
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
});

function timebar() {
	return "<span id='timebar'></span>";
}
$('body').on('mouseleave', '#timelineHeader', function() {
	$('#timebar').remove();
});
$('body').on('mouseover', '.TimelineMarkerContainer', function() {
	if ($('#timebar').length == 0)
		$('#content').append(timebar());
	var left = $(this).find('.TimelineMarker').first().position().left + 1;
	setTimeout(function() {
		$('#timebar').attr('style', ('left: ' + left + 'px;'));
	}, 50);
});