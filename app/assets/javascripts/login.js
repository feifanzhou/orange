$('body').on('click', '#createAccount', function() {
	$('#newAccountNames').slideDown();
	$('#createAccount').addClass('Hidden');
	$('#goLogin').removeClass('Hidden');
});
$('body').on('click', '#goLogin', function() {
	$('#newAccountNames').slideUp();
	$('#createAccount').removeClass('Hidden');
	$('#goLogin').addClass('Hidden');
});