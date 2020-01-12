var post_html_data = "";
var post_pic_data = "";
var post_all_img = "";
var u_name = "";
var u_img_path = "";
var user_tag_array = "";

$(document).ready(function () {
    $("#post_display").hide();
    $.post('/users/ajaxmyprofile', {}, function (data) {

        for (var i = 0; i < data['user_info'].length; i++) {
            u_name = data.user_info[i].user_fname + ' ' + data.user_info[i].user_lname;
            u_img_path = data.user_info[i].user_img_path;
        }

        if (!(data['user_post_info'].length == 0)) {

            var imgs_pths = "";
            var img_arr = new Array();
            for (var j = 0; j < data.user_post_info.length; j++) {
                if (data.user_post_info[j].user_post_media_path) {
                    imgs_pths = data.user_post_info[j].user_post_media_path;
                    imgs_pths = imgs_pths.split(",");
                    imgs_pths.forEach(pth => {
                        img_arr.push(pth);
                    });
                }
            }

            for (var k = 0; k < img_arr.length; k++) {
                var ext = img_arr[k].split('.').pop();
                if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                    post_all_img = post_all_img + " <div class=\"col-lg-4 col-md-4 col-sm-6 col-6\">\n" +
                        "<div class=\"gallery_pt\">\n" +
                        "<img style='height: 174px;max-height: 174px;width: 156px;max-width: 156px;' src=" + img_arr[k] + " alt=\"\">\n" +
                        "<a href=\"#\"\n" +
                        "title=\"\"><em class='fa fa-expand'></em> </a>\n" +
                        "</div><!--gallery_pt end-->\n" +
                        "</div>"
                }
                if (ext == "mp4" || ext == "avi" || ext == "mov") {
                    post_all_img = post_all_img + " <div class=\"col-lg-4 col-md-4 col-sm-6 col-6\">\n" +
                        "<div class=\"gallery_pt\">\n" +
                        "<video autoplay muted controls style='height: 100%;width: 100%;' src=" + img_arr[k] + " alt=\"\">\n" +
                        "<a href=\"#\"\n" +
                        "title=\"\"><em class='fa fa-expand'></em> </a>\n" +
                        "</div><!--gallery_pt end-->\n" +
                        "</div>"
                }
            }

            if (imgs_pths.length == 0) {

                post_pic_data = post_pic_data +
                    "<div class='col-sm-12 text-center color-blue' style='font-size: 1.2em;font-weight: bold'><span style='font-size: 1.5em' class='color-pink'>Opps!!!</span><br> no image <br>ask them to<br> share some movements <br><em class='fa fa-smile-o color-orange fa-2x'></em></div>";

            }
            else if (imgs_pths.length <= 9) {
                for (var i = 0; i < img_arr.length; i++) {
                    var ext = img_arr[i].split('.').pop();
                    if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                        post_pic_data = post_pic_data + "<li><a href=\"#\"\n" +
                            "title=\"\"><img style='width: 70px;max-width: 70px;height: 90px;max-height: 90px;' src=" + img_arr[i] + "\n" +
                            "alt=\"\"></a></li>";
                    }
                    if (ext == "mp4" || ext == "avi" || ext == "mov") {
                        post_pic_data = post_pic_data + "<li><a href=\"#\"\n" +
                            "title=\"\"><video autoplay controls muted style='width: 70px;max-width: 70px;height: 90px;max-height: 90px;' src=" + img_arr[i] + "\n" +
                            "alt=\"\"></a></li>";
                    }

                }
            }
            else {
                for (var i = 0; i < 9; i++) {
                    var ext = img_arr[i].split('.').pop();
                    if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                        post_pic_data = post_pic_data + "<li><a href=\"#\"\n" +
                            "title=\"\"><img style='width: 70px;max-width: 70px;height: 90px;max-height: 90px;' src=" + img_arr[i] + "\n" +
                            "alt=\"\"></a></li>";
                    }
                    if (ext == "mp4" || ext == "avi" || ext == "mov") {
                        post_pic_data = post_pic_data + "<li><a href=\"#\"\n" +
                            "title=\"\"><video autoplay controls muted style='width: 70px;max-width: 70px;height: 90px;max-height: 90px;' src=" + img_arr[i] + "\n" +
                            "alt=\"\"></a></li>";
                    }
                }

                post_pic_data = post_pic_data + "<div class='col-sm-12 text-center more_imgs'> <span class='color-violet' style='font-size: 1.2em;font-weight: bolder;cursor: pointer'>More...</span> </div>"
            }


            for (var i = 0; i < data['user_post_info'].length; i++) {
                // user_tag_array = data.user_post_info[i].user_post_tags;

                post_html_data = post_html_data + "<div class=\"posts-section\">\n" +
                    "<div class=\"post-bar\">\n" +
                    "<div class=\"post_topbar\">\n" +
                    "<div class=\"usy-dt\">\n" +
                    "<image src=" + u_img_path + "\n" +
                    "style=\"width: 60px;height: 60px; border-radius: 50%; border: #88098d solid 2px\"/>\n" +
                    "<div class=\"usy-name\">\n" +
                    "<h3><b style=\"font-weight: bolder\">" + u_name + "</b>";
                if (data.user_post_info[i].user_post_loc_place != "") {
                    post_html_data = post_html_data + "<span style='font-weight: lighter'> is at " + data.user_post_info[i].user_post_loc_place + " <span></span>";
                }

                post_html_data = post_html_data + "</h3>\n";
                //------------      was for user tags (working but problem in displaying)      ---------------
                // $.post('/users/get_users_from_tags', {
                //     'user_tag_array': user_tag_array
                // }, function (data) {
                //     if (data != "") {
                //         post_html_data = post_html_data + " <span><b> with </b> ";
                //         for (var i = 0; i < data.length; i++) {
                //             post_html_data = post_html_data + "<a href=" + data[0][i]._id + ">" + data[0][i].user_uname + "</a>";
                //         }
                //         post_html_data = post_html_data + " </span> ";
                //     }
                //     else
                //     {
                //         post_html_data = post_html_data + " <span>Hello from me</span> ";
                //     }
                // });
                //------------      user post tag display over  ---------------------------------


                post_html_data = post_html_data + "\n" +
                    "<span><img src=\"/home_assets/img/clock.png\"\n" +
                    "alt=\"\">" + data.user_post_info[i].user_post_created_at.slice(0, 10) + "\n" +
                    "</span>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "<div class=\"ed-opts\">\n" +
                    "<a href=\"#\" title=\"\" class=\"ed-opts-open\"><i\n" +
                    "class=\"fa fa-ellipsis-v\"></i></a>\n" +
                    "<ul class=\"ed-options\">\n" +
                    "<li class='edit_post' style='cursor: pointer'><em class='color-orange fa fa-edit'></em> <a id=" + data.user_post_info[i]._id + ">Edit Post</a></li>\n" +
                    "<li class='delete_post' style='cursor: pointer'><em class='color-red fa fa-close'></em> <a id=" + data.user_post_info[i]._id + "  >Delete Post</a></li>\n" +
                    "<li class='hide_post'style='cursor: pointer'><em class='color-blue fa fa-eye-slash'></em> <a id=" + data.user_post_info[i]._id + " >Hide Post</a></li>\n" +
                    "</ul>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "<div class=\"job_descp\">\n" +
                    "<div style=\"\">\n";
                if (data.user_post_info[i].user_post_caption) {
                    if (!(data.user_post_info[i].user_post_caption_bg_path == "")) {
                        post_html_data = post_html_data + "<p class=\"text-center color-white\"\n" +
                            "style=\"padding-top: 25px;font-size: 25px;background-image: url(" + data.user_post_info[i].user_post_caption_bg_path + " );height: 100px;width:inherit;background-repeat: no-repeat;background-size: cover\">\n" +
                            data.user_post_info[i].user_post_caption + "</p>\n";
                    }
                    else {
                        post_html_data = post_html_data + "<p class=\"\"\n" +
                            "style=\"padding-top: 25px;font-size: 25px;background-image: url();height: 100px;width:inherit;background-repeat: no-repeat;background-size: cover\">\n" +
                            data.user_post_info[i].user_post_caption + "</p>\n";
                    }

                }
                post_html_data = post_html_data +
                    "</div>\n" +
                    "<div style=\"\">\n" +
                    "<!-- outermost container element -->\n";
                var imgs_pths = data.user_post_info[i].user_post_media_path;
                if (data.user_post_info[i].user_post_media_path) {
                    imgs_pths = imgs_pths.split(",");

                    if (imgs_pths.length == 1) {
                        imgs_pths.forEach((pth) => {
                            var ext = pth.split('.').pop();
                            if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                                post_html_data = post_html_data +
                                    "<img src=" + pth + "\n" +
                                    "style=\"margin:0.5%;background: white\"\n" +
                                    "class=\"col-sm-12 shown_media\" alt=\"Image\"/>\n";
                            }
                            if (ext == "mp4" || ext == "avi" || ext == "mov") {
                                post_html_data = post_html_data +
                                    "<video controls controlsList=\"nodownload\" src=" + pth + "\n" +
                                    "style=\"margin:0.5%;\"\n" +
                                    "class=\"col-sm-12 shown_media\" alt=\"Image\"/>\n";
                            }
                        });
                    }
                    else if (imgs_pths.length == 2) {
                        imgs_pths.forEach((pth) => {
                            var ext = pth.split('.').pop();
                            if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                                post_html_data = post_html_data +
                                    "<img src=" + pth + "\n" +
                                    "style=\"margin:0.5%;background: white\"\n" +
                                    "class=\"col-sm-5 shown_media\" alt=\"Image\"/>\n";
                            }
                            if (ext == "mp4" || ext == "avi" || ext == "mov") {
                                post_html_data = post_html_data +
                                    "<video controls controlsList=\"nodownload\" src=" + pth + "\n" +
                                    "style=\"margin:0.5%;\"\n" +
                                    "class=\"col-sm-5 shown_media\" alt=\"Image\"/>\n";
                            }
                        });
                    }
                    else if (imgs_pths.length < 6) {

                        imgs_pths.forEach((pth) => {
                            var ext = pth.split('.').pop();
                            if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                                post_html_data = post_html_data +
                                    "<img src=" + pth + "\n" +
                                    "style=\"background: white\"\n" +
                                    "class=\"img_col-sm-4 shown_media\" alt=\"Image\"/>\n";
                            }
                            if (ext == "mp4" || ext == "avi" || ext == "mov") {
                                post_html_data = post_html_data +
                                    "<video controls src=" + pth + "\n" +
                                    "style=\"\"\n" +
                                    "class=\"img_col-sm-4 shown_media\" alt=\"Image\"/>\n";
                            }

                        });
                    }
                    else {
                        var k;
                        for (k = 0; k < 5; k++) {
                            var ext = imgs_pths[k].split('.').pop();
                            if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                                post_html_data = post_html_data +
                                    "<img src=" + imgs_pths[k] + "\n" +
                                    "style=\"border: solid 2px #fff;background: white\"\n" +
                                    "class=\"img_col-sm-4 shown_media\" alt=\"Image\"/>\n";
                            }
                            if (ext == "mp4" || ext == "avi" || ext == "mov") {
                                post_html_data = post_html_data +
                                    "<video controls controlsList=\"nodownload\" src=" + imgs_pths[k] + "\n" +
                                    "style=\"border: solid 2px #fff;\"\n" +
                                    "class=\"img_col-sm-4 shown_media\" alt=\"Image\"/>\n";
                            }
                        }
                        var rem = (imgs_pths.length - 5);
                        var ext = imgs_pths[5].split('.').pop();
                        if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                            post_html_data = post_html_data +
                                "<img src=" + imgs_pths[k] + "\n" +
                                "style=\"background: white;border: solid 2px #fff;-webkit-filter: blur(5px);filter: blur(5px);\"\n" +
                                "class=\"img_col-sm-4 \" alt=\"Image\"/><div id=" + data.user_post_info[i]._id + " class='a_pointer fa fa-plus fa-2x' style='opacity: 0.9;font-size: 2em;font-weight:bolder;position:relative;left: 74%;bottom: 120px;'>" + rem + " more</div>\n";
                        }
                        if (ext == "mp4" || ext == "avi" || ext == "mov") {
                            post_html_data = post_html_data +
                                "<video controls controlsList=\"nodownload\" src=" + imgs_pths[k] + "\n" +
                                "style=\"border: solid 2px #fff-webkit-filter: blur(5px);filter: blur(5px);\"\n" +
                                "class=\"img_col-sm-4 \" alt=\"Image\"/><div id=" + data.user_post_info[i]._id + " class='a_pointer fa fa-plus fa-2x' style='opacity: 0.9;font-size: 2em;font-weight:bolder;position:relative;left: 74%;bottom: 120px;'>" + rem + " more</div>\n";
                        }
                    }
                }
                post_html_data = post_html_data +
                    "</div></div>\n" +
                    "<div class=\"job-status-bar\">\n" +
                    "<ul class=\"like-com\">\n" +
                    "<li>\n" +
                    "<a class='btn_like_post' id=" + data.user_post_info[i]._id + " ><i class=\"fa fa-heart\"></i> Like</a>\n" +
                    "<img src=\"/home_assets/img/liked-img.png\" alt=\"\">\n" +
                    "<span>25</span>\n" +
                    "</li>\n" +
                    "<li><a href=\"#\" title=\"\" class=\"com\"><img\n" +
                    "src=\"/home_assets/img/com.png\"\n" +
                    "alt=\"\"> Comment 15</a></li>\n" +
                    "</ul>\n" +
                    "<a style='cursor: pointer' class='save_post' id=" + data.user_post_info[i]._id + "><i class=\"far fa-bookmark\"></i>Save</a>\n" +
                    "</div>\n" +
                    "</div><!--post-bar end-->\n" +
                    "</div><!--posts-section end-->";

            }
        }
        else {

            post_html_data = "<div class='col-sm-12'><img src='/images/loader/no_post.gif' style='width: 100%'> </div> <div class='fa-2x color-purple text-center'><span class='color-orange'>Opps!!!</span> Not posted anything yet!!</div>"
        }

        $("#user_al_pic").html(post_all_img);
        $("#disp_user_img").html(post_pic_data);
        $("#post_display").html(post_html_data);
        $("#user_post_loader").hide(700);
        $("#post_display").show(700);
    });

    $(document).on('click', '.more_imgs', function (data) {
        $("#user_photos").click();
    });

    var slider_data = "";
    $(document).on("click", ".a_pointer", function () {
        slider_data = "";
        var selected_post_id = $(this).attr('id');
        $.post('/users/get_post_more_images', {
            'selected_post_id': selected_post_id
        }, function (data) {
            var imgs_pths = data["0"].user_post_media_path;
            imgs_pths = imgs_pths.split(",");

            for (var j = 0; j < data.length; j++) {
                slider_data = slider_data + "<div class=\"post_topbar\">\n" +
                    "<div class=\"usy-dt\">\n" +
                    "<image src=" + data[j].user_post_user_id.user_img_path + "\n" +
                    "style=\"width: 60px;height: 60px; border-radius: 50%; border: #88098d solid 2px\"/>\n" +
                    "<div class=\"usy-name\">\n" +
                    "<h3><b style=\"font-weight: bolder\" class=\"color-white\">" + data[j].user_post_user_id.user_fname + " " + data[j].user_post_user_id.user_lname + "</b>";
                if (data[j].user_post_loc_place != "") {
                    slider_data = slider_data + "<span style='font-weight: lighter'> is at " + data[j].user_post_loc_place + " <span></span>";
                }
                slider_data = slider_data + "</h3>\n" +
                    "<div class='text-left color-white'> <em class='fa fa-clock-o'></em> " + data[j].user_post_created_at.slice(0, 10) + "\n" +
                    "<span>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div><!--post-bar end-->\n";
            }


            for (var i = 0; i < imgs_pths.length; i++) {
                var ext = imgs_pths[i].split('.').pop();
                if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                    slider_data = slider_data +
                        "<img class=\"mySlides\" src=" + imgs_pths[i] + " style=\"width:auto;max-width:100%;max-height:500px\">";
                }
                if (ext == "mp4" || ext == "avi" || ext == "mov") {
                    slider_data = slider_data +
                        "<video controls class=\"mySlides\" src=" + imgs_pths[i] + " style=\"width:auto;max-width:100%;max-height:500px\">";
                }
            }

            $("#medial_show_model").html(slider_data);
            $("#show_more_media").modal('show');
            $(".media_modal_button_left").click();
            $(".media_modal_button_right").click();

        });
    });

    $(document).on('click', '.shown_media', function () {
        var src_pth = $(this).attr('src');
        var img_data = "";
        var ext = src_pth.split('.').pop();
        if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
            img_data = img_data +
                "<img class=\"mySlides\" src=" + src_pth + " style=\"width:auto;max-width:100%;height:550px;max-height:500px\">";
        }
        if (ext == "mp4" || ext == "avi" || ext == "mov") {
            img_data = img_data +
                "<video controls autoplay class=\"mySlides\" src=" + src_pth + " style=\"width:auto;max-width:100%;height:550px;max-height:500px\">";
        }
        $("#selected_modal_media").html(img_data);
        $("#show_selected_media").modal('show');
        $(".media_modal_button_right").click();
    });

    $(document).on('click', '.delete_post', function () {
        $("#post_display").hide(700);
        var id = $(this).children().eq(1).attr('id');
        $.post('/users/delete_user_post', {
            'id': id
        }, function (data) {
            if (data == "del_success") {
                swal("Good job!", "Post deleted", "success");
                location.reload();
                $("#post_display").show(700);
            }
            else {
                $("#post_display").show(700);
                swal({
                    title: "Opps!!! Something went Wrong",
                    type: "warning",
                    confirmButtonColor: '#636363',
                    confirmButtonText: 'OK',
                });
            }
        });
    });

    var autoCloseTimeout;

    $('.js-alert').on('click', '.js-force-close', function (e) {
        $(this).parents('.alert').removeClass('is-shown');
        clearTimeout(autoCloseTimeout);
    });

    $('.js-js-alert-un').on('click', '.js-force-close', function (e) {
        $(this).parents('.alert').removeClass('is-shown');
        clearTimeout(autoCloseTimeout);
    });

    $(document).on('click', '.save_post', function () {
        var id = $(this).attr('id');
        $(".save_post").fadeOut(400);
        $.post('/users/save_post', {
            post_id: id
        }, function (data) {
            if (data == "saved") {
                $(".save_post").fadeIn(400);
                // e.preventDefault();
                autoClose({
                    contextual: 'success',
                    target: $('.js-alert'),
                    timeout: 2000
                });
            }
            if (data == "un_saved") {
                //e.preventDefault();
                autoClose({
                    contextual: 'primary',
                    target: $('.js-alert-un'),
                    timeout: 2000
                });
                $(".save_post").fadeIn(400);
            }
        });
    });


    $(document).on('click', '.btn_like_post', function () {
        var id = $(this).attr('id');
        $(".save_post").fadeOut(400);
        $.post('/users/like_post', {
            post_id: id
        }, function (data) {
            if (data == "liked") {
                $(".like_post").fadeIn(400);
                // e.preventDefault();
                autoClose({
                    contextual: 'success',
                    target: $('.js-alert-liked'),
                    timeout: 2000
                });
            }
            if (data == "un_liked") {
                //e.preventDefault();
                autoClose({
                    contextual: 'primary',
                    target: $('.js-alert-unliked'),
                    timeout: 2000
                });
                $(".like_post").fadeIn(400);
            }
        });
    });

    function autoClose(options) { // eslint-disable-line
        // set defaults
        const defaults = {
            contextual: 'success',
            timeout: 4000
        };
        // apply options
        const $obj = options.target;
        const contextual = options.contextual || defaults.contextual;
        const timeout = options.timeout || defaults.timeout;
        let type = 'modal';

        if ($obj.hasClass('alert')) {
            type = 'alert';
            $obj.removeClass('alert-danger alert-info alert-success alert-warning').addClass('alert-' + contextual);
        }

        // trigger modal or show alert
        type === 'modal' ? $obj.modal('show') : $obj.addClass('is-shown');

        clearTimeout(autoCloseTimeout); // eslint-disable-line

        autoCloseTimeout = setTimeout(function () { // eslint-disable-line
            type === 'modal' ? $obj.modal('hide') : $obj.removeClass('is-shown');
        }, timeout);
    }
});


