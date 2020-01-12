$(document).ready(function () {
    $("#div_mood_feelings").hide();
});

$(document).on("click", "#btn_feel", function () {
    $("#div_mood_feelings").toggle(700);
});

$(document).on("click", ".feel", function () {
    $("#div_mood_feelings").slideToggle();
    var add_fell = $(this).html();
    $('.textarea-control').html("<span style='font-weight: bolder'>"+ add_fell + " - " + "</span> ");
});

$(document).on('click', '.post_back_img', function () {
    var img_id = ($(this).attr("id"));
    var img_path = "/images/post_back/" + img_id + ".jpg";

    //setting css for text area
    var chck_img = img_id.substr(-1);
    if (chck_img == "0") {
        alert("0 selected");
        $('.textarea-control').css('color', 'black');
        $('.textarea-control').css('font-size', '25px');
        $('.textarea-control').css('font-weight', 'bolder');
        $('.textarea-control').css('background-image', 'none');
        $('.textarea-control').css('background-size', 'cover');
    }
    else if (chck_img == "1" || chck_img == "3" || chck_img == "5" || chck_img == "6") {
        $('.textarea-control').css('color', 'white');
        $('.textarea-control').css('background-image', 'url(' + img_path + ')');
        $('.textarea-control').css('background-size', 'cover');
        $('.textarea-control').css('font-size', '25px');
        $('.textarea-control').css('font-weight', 'bolder');
    }
    else {
        $('.textarea-control').css('color', 'black');
        $('.textarea-control').css('background-image', 'url(' + img_path + ')');
        $('.textarea-control').css('background-size', 'cover');
        $('.textarea-control').css('font-size', '25px');
        $('.textarea-control').css('font-weight', 'bolder');
    }
    $(".modal-backdrop").remove();
    $("#modal_post_background").modal("hide");
});