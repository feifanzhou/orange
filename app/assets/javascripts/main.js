function loadAllCategories() {
	var categoriesJSON;
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
function toggleSidebarContent(content) {
	if (content == 'categories')
		loadAllCategories();
	else if (content == 'people')
		alert('toggling people');
	else
		console.log('toggle invalid content');
}
$('body').on('click', '.SegmentToggleItem', function() {
	$('.SegmentToggleItem').removeClass('Selected');
	$(this).addClass('Selected');
	toggleSidebarContent($(this).data('toggle'));
});