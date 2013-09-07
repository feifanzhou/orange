function loadAllCategories() {
	$.ajax({
		url: '/categories',
		type: 'GET',
		dataType: 'JSON',
		success: function(data) {
			var html = categoriesList(data.categories, 'sidebarCategories');
			$('#sidebarContent').html(html);
			$('#content').html('<p>Timeline view</p>');
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
			$('#content').html('<p>Timeline view</p>');
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
$('body').on('click', '.SegmentToggleItem', function() {
	$('.SegmentToggleItem').removeClass('Selected');
	$(this).addClass('Selected');
	toggleSidebarContent($(this).data('toggle'));
});

$('body').on('click', '.CategoryListItem', function() {
	if ($(this).hasClass('Selected')) {
		$(this).removeClass('Selected');
		$('#content').html('<p>Timeline view</p>');
		return;
	}
	$('.CategoryListItem').removeClass('Selected');
	$(this).addClass('Selected');
	$('#content').html('<p>List view</p>');
});