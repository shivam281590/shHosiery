jQuery(document).ready(function($){
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    /*-- Glabal Variables --*/
    var full_name = "SEPEHR “SEP” NIAKAN";
    var job_title = "Lic. Real Estate Sales Associate";
    var phone_number = "(305) 725-0566";
    var email_address = "sep@blackbookproperties.com";
    var company_address = "1900 N. Bayshore Dr. | Suite 1A #103 | Miami, FL 33132";
    var company_phone = "(305) 407-1699";
    var compamy_search = "Homes | Condos";
    var company_url = "blackbookproperties.com";
    var facebook_link = "#";
    var instagram_link = "#";
    var youtube_link = "#";

    var element = $("#signature-content-holder"); // global variable
    var getCanvas; // global variable
    


    /*----- Header Fix -----*/
	$(window).on("scroll", function() {
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
        $("header").removeClass("fixed-top");
        } else {
        $("header").addClass("fixed-top");
        }
    });
	
    /* Choose signature Template Slider */
    $('.choose-signature-template-slider').owlCarousel({
        items:5,
        loop:true,
        margin:5,
        nav:false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        dots:false,
    });

    /* Sidebar Accordion */
    // $("#accordion .accordion-head").click(function(){
    //     $(this).siblings().removeClass("caret-sign");
    //     $(this).siblings().next().removeClass("d-block");
    //     $(this).toggleClass("caret-sign");
    //     $(this).next().toggleClass("d-block");
    // });

    $('.clear-fields').on('click', function() {
        $('.full_name').text(full_name);
        $('.job_title').text(job_title);
        $('.phone_number').text(phone_number);
        $('.email_address').text(email_address);
        $('.company_address').text(company_address);
        $('.company_phone').text(company_phone);
        $('.compamy_search').text(compamy_search);
        $('.company_url').text(company_url);
        $('.facebook_link').attr('href', facebook_link);
        $('.instagram_link').attr('href', instagram_link);
        $('.youtube_link').attr('href', youtube_link);
        return false;
    });
    

    $('#accordion').find('input[type=text]').on('keyup', function() {
        $('.'+$(this).attr('id')).text($(this).val());
    });
    $('#accordion').find('textarea').on('keyup', function() {
      $('.'+$(this).attr('id')).text($(this).val());
  });

    
 
    $("#btn-Preview-Image").on('click', function () {
         html2canvas(element, {
         onrendered: function (canvas) {
                $("#previewImage").append(canvas);
                getCanvas = canvas;
             }
         });
    });

    $("#btn-Convert-Html2Image").on('click', function () {
        var imgageData = getCanvas.toDataURL("image/png");
        // Now browser starts downloading it instead of just showing it
        var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
        $("#btn-Convert-Html2Image").attr("download", "your_pic_name.png").attr("href", newData);
    });
    /////////////////////////////////////////////////////////////////////////////

    $('#create-signature').on('click', function() {
        var data = new FormData($('#signature-inputs')[0]);
        // var data = $('#signature-inputs').serialize();
        $.ajax({
            type: 'post',
            url : '/save-current-data',
            data : data,
            cache: false,
            processData: false,
            contentType : false,
            success: function(res) {
                window.location = '/download';
            }
        })
        return false;
        //window.location = '/download';
    })
	

/* Function written for image preview */
function readURL(input, element) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      element.attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

});



jQuery(document).ready(function($) {
$(".menuBars").click(function(){
  $(".navigation").slideToggle();
$(this).toggleClass('open')
});

});

jQuery(document).ready(function($){
  // When the checkbox state changes
  $('input[type="checkbox"]').change(function(){
      // If the checkbox is checked
      if($(this).is(":checked")){
          // Show yearly section and hide monthly section
          $(".yearly-section").show();
          $(".monthly-section").hide();
      } else {
          // Show monthly section and hide yearly section
          $(".yearly-section").hide();
          $(".monthly-section").show();
      }
  });

  // Your existing code...
});




/*Owl Slider*/
$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
  }
});

// $(document).ready(function(){
// 	$('.form-input').on('keyup, paste, cut, focusout', function(){
// 		var $parent = $(this).parents('.form-line');
// 		var input_value = $.trim($(this).val());
// 		var required = $(this).is(':required');

// 		if (input_value.length > 0) {
// 			$parent.find('label').addClass('top');

// 			$parent
// 				.removeClass('error')
// 				.addClass('success');
// 		}	else {
// 			$parent.find('label').removeClass('top');
// 			$parent.removeClass('success')

// 			if (required) {
// 				$parent.addClass('error');
// 			}
// 		}
// 	});
// });


