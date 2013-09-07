function loadAllCategories() {
	$.ajax({
		url: '/categories',
		type: 'GET',
		dataType: 'JSON',
		success: function(data) {
			var html = categoriesList(data.categories, 'sidebarCategories');
			$('#sidebarContent').html(html);
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