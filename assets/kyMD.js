// KyMD.js By CKylin


$(function() {
	$(window).scroll(function() {
		let scrollHeight = $(document).scrollTop();
		if (scrollHeight > 240 ) {
			$('#headbar').addClass('show');
		} else {
			$('#headbar').removeClass('show');
		}
	});
});
$(document).ready(function(){
	$('#headbar').click(function(){
		$('html,body').animate({scrollTop:0},'slow');
	});
	document.title = _pageTitle;
	domclass.remove(document.body,"preload");
});
