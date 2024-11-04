let tempid;

function changetemp(tempid) {
    document.getElementById("sidd").scrollIntoView(); 
    $('#signature-content-holder').html('<div class="spinner"> <div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
    
    $.ajax({
        type: 'post',
        url: '/get-template',
        data: {
            id: tempid
        },
        success: function (res) {
           
            
            $('#template_id').val(tempid);
            $('#resetbtn').click();
            $('#signature-content-holder').html(res.template);
            if (res.fields) {
                $('#accordion .form-group').hide();
                let fields = res.fields.split(",");
                fields.forEach(function (item, index) {
                    $('.' + item + 'div').show();
                })
            } else {
                $('#accordion .form-group').show();
            }
            var full_name = "SEPEHR “SEP” NIAKAN";
            var job_title = "Lic. Real Estate Sales Associate";
            var phone_number = "(305) 725-0566";
            var email_address = "sep@blackbookproperties.com";
            var company_address = "1900 N. Bayshore Dr. | Suite 1A #103 | Miami, FL 33132";
            var personal_address = "1900 N. Bayshore Dr. | Suite 1A #103 | Miami, FL 33132";
            var company_phone = "(305) 407-1699";
            var company_name = "OG Web Solutions";
            var company_search = "Homes | Condos";
            var disclaimer_text = "Aenean quam lacus, gravida vitae elementum a, pretium sed libero. Vivamus lacinia sagittis libero vitae tincidunt. In elementum magna quis nisl congue suscipit. Nulla ligula velit, molestie ac euismod auctor, fermentum et lacus. Ut egestas dolor tellus, ac efficitur ante tristique eu.";

            var company_url = "blackbookproperties.com";
            var facebook_link = "#";
            var instagram_link = "#";
            var youtube_link = "#";
            $('.full_name').text(full_name);
            $('.job_title').text(job_title);
            $('.phone_number').text(phone_number);
            $('.email_address').text(email_address);
            $('.company_address').text(company_address);
            $('.personal_address').text(personal_address);
            $('.company_phone').text(company_phone);
            $('.company_name').text(company_name);
            $('.company_search').text(company_search);
            $('.company_url').text(company_url);
            $('.disclaimer_text').text(disclaimer_text);
            $('.facebook_link').attr('href', facebook_link);
            $('.instagram_link').attr('href', instagram_link);
            $('.youtube_link').attr('href', youtube_link);
            $('.temname').text(res.template_name);
            $('.profile_pic').html('<img class="profile_picture" src="https://emailsignature.cloud/img/sepener.png"  alt="SEPEHR “SEP” NIAKAN" />');
            $('.company_logo').html('<img class="company_logo" class="dark-img" src="https://emailsignature.cloud/img/signature-11/images/logo.png"  />');
            $('.banner_img').html('<img class="banner_img" class="dark-img" src="https://emailsignature.cloud/img/signature-11/images/img1.jpg"  />');
            
        }
    })
}
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$(document).ready(function () {

    $.ajax({
        type: 'post',
        url: '/get-template',
        data: {
            id: 1
        },
        success: function (res) {

            $('#template_id').val(tempid);
            $('#resetbtn').click();
            $('#signature-content-holder').html(res.template);
            if (res.fields) {
                $('#accordion .form-group').hide();
                let fields = res.fields.split(",");
                fields.forEach(function (item, index) {
                    $('.' + item + 'div').show();
                })
            } else {
                $('#accordion .form-group').show();
            }
            var full_name = "SEPEHR “SEP” NIAKAN";
            var job_title = "Lic. Real Estate Sales Associate";
            var phone_number = "(305) 725-0566";
            var email_address = "sep@blackbookproperties.com";
            var company_address = "1900 N. Bayshore Dr. | Suite 1A #103 | Miami, FL 33132";
            var personal_address = "1900 N. Bayshore Dr. | Suite 1A #103 | Miami, FL 33132";
            var company_phone = "(305) 407-1699";
            var company_name = "OG Web Solutions";
            var company_search = "Homes | Condos";
            var disclaimer_text = "Aenean quam lacus, gravida vitae elementum a, pretium sed libero. Vivamus lacinia sagittis libero vitae tincidunt. In elementum magna quis nisl congue suscipit. Nulla ligula velit, molestie ac euismod auctor, fermentum et lacus. Ut egestas dolor tellus, ac efficitur ante tristique eu.";

            var company_url = "blackbookproperties.com";
            var facebook_link = "#";
            var instagram_link = "#";
            var youtube_link = "#";
            $('.full_name').text(full_name);
            $('.job_title').text(job_title);
            $('.phone_number').text(phone_number);
            $('.email_address').text(email_address);
            $('.company_address').text(company_address);
            $('.personal_address').text(personal_address);
            $('.company_phone').text(company_phone);
            $('.company_name').text(company_name);
            $('.company_search').text(company_search);
            $('.company_url').text(company_url);
            $('.disclaimer_text').text(disclaimer_text);
            $('.facebook_link').attr('href', facebook_link);
            $('.instagram_link').attr('href', instagram_link);
            $('.youtube_link').attr('href', youtube_link);
            $('.temname').text(res.template_name);
            $('.profile_pic').html('<img class="profile_picture" src="https://emailsignature.cloud/img/sepener.png"  alt="SEPEHR “SEP” NIAKAN" />');
            $('.company_logo').html('<img class="company_logo" class="dark-img" src="https://emailsignature.cloud/img/signature-11/images/logo.png"  />');
            $('.banner_img').html('<img class="banner_img" class="dark-img" src="https://emailsignature.cloud/img/signature-11/images/img1.jpg"  />');

        }
    })

});

// $('#profile_photo').on('change', function () {
//     readURL(this, $('.profile_picture'));
//     var data = new FormData();
//     data.append('image', $(this).prop('files')[0]);
//     $.ajax({
//         type: 'post',
//         url: '/upload-image',
//         data: data,
//         contentType: false,
//         processData: false,
//         success: function (res) {
//             $('[name=profile_pic]').val(res.image);
//         }
//     })
// })
// $('#company_logo').on('change', function () {
//     readURL(this, $('.company_logo'));
//     var data = new FormData();
//     data.append('image', $(this).prop('files')[0]);
//     $.ajax({
//         type: 'post',
//         url: '/upload-image',
//         data: data,
//         contentType: false,
//         processData: false,
//         success: function (res) {
//             $('[name=company_logo]').val(res.image);
//         }
//     })
// })
// $('#banner_img').on('change', function () {
//     readURL(this, $('.banner_img'));
//     var data = new FormData();
//     data.append('image', $(this).prop('files')[0]);
//     $.ajax({
//         type: 'post',
//         url: '/upload-image',
//         data: data,
//         contentType: false,
//         processData: false,
//         success: function (res) {
//             $('[name=banner_img]').val(res.image);
//         }
//     })
// })

let emval;
var validRegexemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var validRegexphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
var validRegexurl =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

function chkemail(emval) {
    if (!emval.match(validRegexemail)) {
        $('#email_address').css('border-color', 'red');
        return false;
    } else {
        $('#email_address').css('border-color', '#e8eef4');
    }
}

function chkphone(emval) {
    if (!emval.match(validRegexphone)) {
        $('#phone_number').css('border-color', 'red');
        return false;
    } else {
        $('#phone_number').css('border-color', '#e8eef4');
    }
}

function chkcmpphone(emval) {
    if (!emval.match(validRegexphone)) {
        $('#company_phone').css('border-color', 'red');
        return false;
    } else {
        $('#company_phone').css('border-color', '#e8eef4');
    }
}

function chkweb(emval) {
    if (!emval.match(validRegexurl)) {
        $('#company_url').css('border-color', 'red');
        return false;
    } else {
        $('#company_url').css('border-color', '#e8eef4');
    }
}

function chkfa(emval) {
    if (!emval.match(validRegexurl)) {
        $('#facebook_link').css('border-color', 'red');
        return false;
    } else {
        $('#facebook_link').css('border-color', '#e8eef4');
    }
}

function chkin(emval) {
    if (!emval.match(validRegexurl)) {
        $('#linkedin_link').css('border-color', 'red');
        return false;
    } else {
        $('#linkedin_link').css('border-color', '#e8eef4');
    }
}

function chktw(emval) {
    if (!emval.match(validRegexurl)) {
        $('#twitter_link').css('border-color', 'red');
        return false;
    } else {
        $('#twitter_link').css('border-color', '#e8eef4');
    }
}

function chkyu(emval) {
    if (!emval.match(validRegexurl)) {
        $('#youtube_link').css('border-color', 'red');
        return false;
    } else {
        $('#youtube_link').css('border-color', '#e8eef4');
    }
}
