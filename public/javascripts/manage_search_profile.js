var post_html_data = "";
var searched_user_all_post = "";
var button_add_friend = "";
var u_name = "";
var u_img_path = "";
var user_tag_array = "";

$(document).ready(function () {
    post_html_data = "";
    button_add_friend = "";
    var searched_user_id = $(".btn_user_id").attr("id");
    $.post('/users/get_searched_user_profile', {
        searched_user_id: searched_user_id
    }, function (data) {

        post_html_data = "";
        button_add_friend = "";

        if (data == "self") {
            window.location = "/users/myprofile";
        }
        else {
            for (var i = 0; i < data.searched_user_info.length; i++) {
                u_name = data.searched_user_info[i].user_fname + ' ' + data.searched_user_info[i].user_lname;
                u_img_path = data.searched_user_info[i].user_img_path;
            }


            if (data.request_data == "unfriend") {
                button_add_friend = button_add_friend + "<div class=\"dropdown\">\n" +
                    "<button class=\"btn bg_col_purple color-white dropdown-toggle fa fa-check\" type=\"button\" data-toggle=\"dropdown\" id=" + searched_user_id + ">Friends\n" +
                    "<span class=\"caret\"></span></button>\n" +
                    "<ul class=\"dropdown-menu\" style='border: none;border-bottom: 2px solid #0e2549; border-top: 2px solid #0e2549;cursor: pointer'>\n" +
                    "<li><a id=" + searched_user_id + " class='unfriend text-center'><em class='fa fa-users color-blue'></em></em>Unfriend</a></li>\n" +
                    "<li><a id=" + searched_user_id + " class='block text-center'><em class='fa fa-ban color-red'></em></em>Black</a></li>\n" +
                    "</ul>\n" +
                    "</div>";
            }

            if (data.request_data == "sent") {
                button_add_friend = button_add_friend + "<div class=\"dropdown\">\n" +
                    "<button class=\"btn bg_col_purple color-white dropdown-toggle fa fa-check\" type=\"button\" data-toggle=\"dropdown\" id=" + searched_user_id + ">Request Sent\n" +
                    "<span class=\"caret\"></span></button>\n" +
                    "<ul class=\"dropdown-menu\" style='border: none;border-bottom: 2px solid #0e2549; border-top: 2px solid #0e2549;cursor: pointer'>\n" +
                    "<li><a id=" + searched_user_id + " class='cancel_req text-center'>Cancel request</a></li>\n" +
                    "</ul>\n" +
                    "</div>";
                post_html_data = "<div class='col-sm-12'><img src='/images/loader/notfrnd.gif' style='width: 100%'> </div> <div class='fa-2x color-purple text-center'><span class='color-orange'>Opps!!!</span> Not friends yet<br><span style='font-size: 20px' class='color-green'>Nothing to show!!!</span></div>" +
                    "<div class='col-sm-12 text-center'><div class=\"dropdown\">" +
                    "<button class=\"btn bg_col_purple color-white dropdown-toggle fa fa-check\" type=\"button\" data-toggle=\"dropdown\" id=\" + searched_user_id + \">Request Sent" +
                    "<span class=\"caret\"></span></button>" +
                    "<ul class=\"dropdown-menu\" style='border: none;border-bottom: 2px solid #0e2549; border-top: 2px solid #0e2549;cursor: pointer'>" +
                    "<li><a id=" + searched_user_id + " class='cancel_req text-center'>Cancel request</a></li>" +
                    "</ul>" +
                    "</div></div>"
            }

            if (data.request_data == "accept") {
                button_add_friend = button_add_friend + "<button class=\"accept_req btn bg_col_purple color-white\" id=" + searched_user_id + " title=\"\"><i\n" +
                    "class=\"fa fa-user-check\"></i> Accept Request\n" +
                    "</button>";
                post_html_data = "<div class='col-sm-12'><img src='/images/loader/notfrnd.gif' style='width: 100%'> </div> <div class='fa-2x color-purple text-center'><span class='color-orange'>Opps!!!</span> Not friends yet<br><span style='font-size: 20px' class='color-green'>Nothing to show!!!</span></div>" +
                    "<div class='col-sm-12 text-center'><button id=" + searched_user_id + " class=\"text-center dup_accept_req btn bg_col_purple color-white\" title=\"\"><i\n" +
                    "class=\"fa fa-user-check\"></i> Accept Request\n" +
                    "</button></div>"
            }

            if (data.request_data == "add_friend") {
                button_add_friend = button_add_friend + "<button class=\"add_friend btn bg_col_purple color-white\" id=" + searched_user_id + " title=\"\"><i\n" +
                    "class=\"fa fa-user-plus\"></i> Add Friend\n" +
                    "</button>";

                post_html_data = "<div class='col-sm-12'><img src='/images/loader/notfrnd.gif' style='width: 100%'> </div> <div class='fa-2x color-purple text-center'><span class='color-orange'>Opps!!!</span> Not friends yet<br><span style='font-size: 20px' class='color-green'>Nothing to show!!!</span></div>" +
                    "<div class='col-sm-12 text-center'><button class=\"text-center add_friend btn bg_col_purple color-white\" id=" + searched_user_id + " title=\"\"><i\n" +
                    "class=\"fa fa-user-plus\"></i> Add Friend\n" +
                    "</button></div>"
            }

            var post_pic_data = "";
            if (data.searched_user_post_detail) {
                if (!(data.searched_user_post_detail.length == 0)) {

                    var imgs_pths = "";
                    var img_arr = new Array();
                    for (var j = 0; j < data.searched_user_post_detail.length; j++) {
                        if (data.searched_user_post_detail[j].user_post_media_path) {
                            imgs_pths = data.searched_user_post_detail[j].user_post_media_path;
                            imgs_pths = imgs_pths.split(",");
                            imgs_pths.forEach(pth => {
                                img_arr.push(pth);
                            });
                        }
                    }
                    for (var k = 0; k < img_arr.length; k++) {
                        var ext = img_arr[k].split('.').pop();
                        if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                            searched_user_all_post = searched_user_all_post + " <div class=\"col-lg-4 col-md-4 col-sm-6 col-6\">\n" +
                                "<div class=\"gallery_pt\">\n" +
                                "<img style='height: 174px;max-height: 174px;width: 156px;max-width: 156px;' src=" + img_arr[k] + " alt=\"\">\n" +
                                "<a href=\"#\"\n" +
                                "title=\"\"><em class='fa fa-expand'></em> </a>\n" +
                                "</div><!--gallery_pt end-->\n" +
                                "</div>"
                        }
                        if (ext == "mp4" || ext == "avi" || ext == "mov") {
                            searched_user_all_post = searched_user_all_post + " <div class=\"col-lg-4 col-md-4 col-sm-6 col-6\">\n" +
                                "<div class=\"gallery_pt\">\n" +
                                "<video autoplay controls muted style='height: 100%;width: 100%;' src=" + img_arr[k] + " alt=\"\">\n" +
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

                        post_pic_data = post_pic_data + "<div class='col-sm-12 text-center searched_user_more_imgs'> <span class='color-violet' style='font-size: 1.2em;font-weight: bolder;cursor: pointer'>More...</span> </div>"
                    }

                    for (var i = 0; i < data.searched_user_post_detail.length; i++) {

                        // user_tag_array = data.searched_user_post_detail[i].user_post_tags;

                        post_html_data = post_html_data + "<div class=\"posts-section\">\n" +
                            "<div class=\"post-bar\">\n" +
                            "<div class=\"post_topbar\">\n" +
                            "<div class=\"usy-dt\">\n" +
                            "<image src=" + u_img_path + "\n" +
                            "style=\"width: 60px;height: 60px; border-radius: 50%; border: #88098d solid 2px\"/>\n" +
                            "<div class=\"usy-name\">\n" +
                            "<h3><b style=\"font-weight: bolder\">" + u_name + "</b>";
                        if (data.searched_user_post_detail[i].user_post_loc_place != "") {
                            post_html_data = post_html_data + "<span style='font-weight: lighter'> is at " + data.searched_user_post_detail[i].user_post_loc_place + " <span></span>";
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
                            "alt=\"\">" + data.searched_user_post_detail[i].user_post_created_at.slice(0, 10) + "\n" +
                            "</span>\n" +
                            "</div>\n" +
                            "</div>\n" +
                            "<div class=\"ed-opts\">\n" +
                            "<a href=\"#\" title=\"\" class=\"ed-opts-open\"><i\n" +
                            "class=\"fa fa-ellipsis-v\"></i></a>\n" +
                            "<ul class=\"ed-options\">\n" +
                            "<li class='' style='cursor: pointer'><em class='color-orange fa fa-info-circle'></em> <a id=''>Report Post</a></li>\n" +
                            "<li class='' style='cursor: pointer'><em class='color-teal fa fa-share'></em> <a id=''>Share Post</a></li>\n" +
                            "</ul>\n" +
                            "</div>\n" +
                            "</div>\n" +
                            "<div class=\"job_descp\">\n" +
                            "<div style=\"\">\n";
                        if (data.searched_user_post_detail[i].user_post_caption) {
                            if (!(data.searched_user_post_detail[i].user_post_caption_bg_path == "")) {
                                post_html_data = post_html_data + "<p class=\"text-center color-white\"\n" +
                                    "style=\"padding-top: 25px;font-size: 25px;background-image: url(" + data.searched_user_post_detail[i].user_post_caption_bg_path + " );height: 100px;width:inherit;background-repeat: no-repeat;background-size: cover\">\n" +
                                    data.searched_user_post_detail[i].user_post_caption + "</p>\n";
                            }
                            else {
                                post_html_data = post_html_data + "<p class=\"\"\n" +
                                    "style=\"padding-top: 25px;font-size: 25px;background-image: url();height: 100px;width:inherit;background-repeat: no-repeat;background-size: cover\">\n" +
                                    data.searched_user_post_detail[i].user_post_caption + "</p>\n";
                            }

                        }
                        post_html_data = post_html_data +
                            "</div>\n" +
                            "<div style=\"\">\n" +
                            "<!-- outermost container element -->\n";
                        var imgs_pths = data.searched_user_post_detail[i].user_post_media_path;
                        if (data.searched_user_post_detail[i].user_post_media_path) {
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
                                        "class=\"img_col-sm-4 \" alt=\"Image\"/><div id=" + data.searched_user_post_detail[i]._id + " class='a_pointer fa fa-plus fa-2x' style='opacity: 0.9;font-size: 2em;font-weight:bolder;position:relative;left: 74%;bottom: 120px;'>" + rem + " more</div>\n";
                                }
                                if (ext == "mp4" || ext == "avi" || ext == "mov") {
                                    post_html_data = post_html_data +
                                        "<video controls controlsList=\"nodownload\" src=" + imgs_pths[k] + "\n" +
                                        "style=\"border: solid 2px #fff-webkit-filter: blur(5px);filter: blur(5px);\"\n" +
                                        "class=\"img_col-sm-4 \" alt=\"Image\"/><div id=" + data.searched_user_post_detail[i]._id + " class='a_pointer fa fa-plus fa-2x' style='opacity: 0.9;font-size: 2em;font-weight:bolder;position:relative;left: 74%;bottom: 120px;'>" + rem + " more</div>\n";
                                }
                            }
                        }
                        post_html_data = post_html_data + "</div></div>\n" +
                            "<div class=\"job-status-bar\">\n" +
                            "<ul class=\"like-com\">\n" +
                            "<li>\n" +
                            "<a href=\"#\"><i class=\"fa fa-heart\"></i> Like</a>\n" +
                            "<img src=\"/home_assets/img/liked-img.png\" alt=\"\">\n" +
                            "<span>25</span>\n" +
                            "</li>\n" +
                            "<li><a href=\"#\" title=\"\" class=\"com\"><img\n" +
                            "src=\"/home_assets/img/com.png\"\n" +
                            "alt=\"\"> Comment 15</a></li>\n" +
                            "</ul>\n" +
                            "<a style='cursor: pointer' class='save_oth_post' id=" + data.searched_user_post_detail[i]._id + "><i class=\"far fa-bookmark\"></i> Save</a>\n" +
                            "</div>\n" +
                            "</div><!--post-bar end-->\n" +
                            "</div><!--posts-section end-->";
                    }
                }
                else {

                    post_html_data = "<div class='col-sm-12'><img src='/images/loader/no_post.gif' style='width: 100%'> </div> <div class='fa-2x color-purple text-center'><span class='color-orange'>Opps!!!</span> Not posted anything yet!!</div>"
                }
            }


        }


        $("#searched_user_all_pic").html(searched_user_all_post);
        $("#searched_user_imgs").html(post_pic_data);
        $("#searched_user_post_display").html(post_html_data);
        $("#btn_add_friend_status").html(button_add_friend);
        $("#searched_user_post_loader").hide(700);
        $("#searched_user_post_display").show(700);
    });

    $(document).on('click', '.searched_user_more_imgs', function (data) {
        $("#search_sr_all_post").click();
    });

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

    var autoCloseTimeout;

    $('.js-alert').on('click', '.js-force-close', function (e) {
        $(this).parents('.alert').removeClass('is-shown');
        clearTimeout(autoCloseTimeout);
    });

    $('.js-js-alert-un').on('click', '.js-force-close', function (e) {
        $(this).parents('.alert').removeClass('is-shown');
        clearTimeout(autoCloseTimeout);
    });

    $(document).on('click', '.save_oth_post', function () {
        var id = $(this).attr('id');
        $(".save_oth_post").fadeOut(400);
        $.post('/users/save_post', {
            post_id: id
        }, function (data) {
            if (data == "saved") {
                $(".save_oth_post").fadeIn(400);
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
                $(".save_oth_post").fadeIn(400);
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