var HomePageControls = {
	navControl:function(){
		$('#feed-search').click(function(e){
			e.stopPropagation();
			$('#feed-dd1').slideDown();
			$('.feed-nav').slideUp();
		});
		$(document).click(function(){
			HomePageControls.hideDropDown();
			$('.feed-nav').slideDown();

		});
		$('#feed-dd1,#feed-dd2').click(function(e){
			e.stopPropagation();			
		});
		$('#feed-filter').click(function(e){
			e.stopPropagation();
			$('#feed-dd2').slideDown();
			$('.feed-nav').slideUp();
		});
		$('.feed-back-btn').click(function(){
			HomePageControls.hideDropDown();
			$('.feed-home .feed-nav').slideDown();

		});
	},
	hideDropDown:function(){
		$('#feed-dd1,#feed-dd2').slideUp();
	}
}
;

$(document).ready(function(){
	HomePageControls.navControl();
});