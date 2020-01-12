var saved_post = "";
$(document).ready(function () {
    $.post('/users/get_saved', {}, function (data) {
        if (data) {
            for (var i = 0; i < data.length; i++) {
                // user_tag_array = data.user_post_info[i].user_post_tags;

                saved_post = saved_post + "<div class=\"posts-section\">\n" +
                    "<div class=\"post-bar\">\n" +
                    "<div class=\"post_topbar\">\n" +
                    "<div class=\"usy-dt\">\n" +
                    "<image src=''\n" +
                    "style=\"width: 60px;height: 60px; border-radius: 50%; border: #88098d solid 2px\"/>\n" +
                    "<div class=\"usy-name\">\n" +
                    "<h3><b style=\"font-weight: bolder\">" + + "</b>";
                if (data[i].user_post_loc_place != "") {
                    saved_post = saved_post + "<span style='font-weight: lighter'> is at " + data[i].user_post_loc_place + " <span></span>";
                }

                saved_post = saved_post + "</h3>\n";


                saved_post = saved_post + "\n" +
                    "<span><img src=\"/home_assets/img/clock.png\"\n" +
                    "alt=\"\">" + data[i].user_post_created_at.slice(0, 10) + "\n" +
                    "</span>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "<div class=\"ed-opts\">\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "<div class=\"job_descp\">\n" +
                    "<div style=\"\">\n";
                if (data[i].user_post_caption) {
                    if (!(data[i].user_post_caption_bg_path == "")) {
                        saved_post = saved_post + "<p class=\"text-center color-white\"\n" +
                            "style=\"padding-top: 25px;font-size: 25px;background-image: url(" + data[i].user_post_caption_bg_path + " );height: 100px;width:inherit;background-repeat: no-repeat;background-size: cover\">\n" +
                            data[i].user_post_caption + "</p>\n";
                    }
                    else {
                        saved_post = saved_post + "<p class=\"\"\n" +
                            "style=\"padding-top: 25px;font-size: 25px;background-image: url();height: 100px;width:inherit;background-repeat: no-repeat;background-size: cover\">\n" +
                            data[i].user_post_caption + "</p>\n";
                    }

                }
                saved_post = saved_post +
                    "</div>\n" +
                    "<div style=\"\">\n" +
                    "<!-- outermost container element -->\n";
                var imgs_pths = data[i].user_post_media_path;
                if (data[i].user_post_media_path) {
                    imgs_pths = imgs_pths.split(",");

                    if (imgs_pths.length == 1) {
                        imgs_pths.forEach((pth) => {
                            var ext = pth.split('.').pop();
                            if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                                saved_post = saved_post +
                                    "<img src=" + pth + "\n" +
                                    "style=\"margin:0.5%;background: white\"\n" +
                                    "class=\"col-sm-12 shown_media\" alt=\"Image\"/>\n";
                            }
                            if (ext == "mp4" || ext == "avi" || ext == "mov") {
                                saved_post = saved_post +
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
                                saved_post = saved_post +
                                    "<img src=" + pth + "\n" +
                                    "style=\"margin:0.5%;background: white\"\n" +
                                    "class=\"col-sm-5 shown_media\" alt=\"Image\"/>\n";
                            }
                            if (ext == "mp4" || ext == "avi" || ext == "mov") {
                                saved_post = saved_post +
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
                                saved_post = saved_post +
                                    "<img src=" + pth + "\n" +
                                    "style=\"background: white\"\n" +
                                    "class=\"img_col-sm-4 shown_media\" alt=\"Image\"/>\n";
                            }
                            if (ext == "mp4" || ext == "avi" || ext == "mov") {
                                saved_post = saved_post +
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
                                saved_post = saved_post +
                                    "<img src=" + imgs_pths[k] + "\n" +
                                    "style=\"border: solid 2px #fff;background: white\"\n" +
                                    "class=\"img_col-sm-4 shown_media\" alt=\"Image\"/>\n";
                            }
                            if (ext == "mp4" || ext == "avi" || ext == "mov") {
                                saved_post = saved_post +
                                    "<video controls controlsList=\"nodownload\" src=" + imgs_pths[k] + "\n" +
                                    "style=\"border: solid 2px #fff;\"\n" +
                                    "class=\"img_col-sm-4 shown_media\" alt=\"Image\"/>\n";
                            }
                        }
                        var rem = (imgs_pths.length - 5);
                        var ext = imgs_pths[5].split('.').pop();
                        if (ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif") {
                            saved_post = saved_post +
                                "<img src=" + imgs_pths[k] + "\n" +
                                "style=\"background: white;border: solid 2px #fff;-webkit-filter: blur(5px);filter: blur(5px);\"\n" +
                                "class=\"img_col-sm-4 \" alt=\"Image\"/><div id=" + data[i]._id + " class='a_pointer fa fa-plus fa-2x' style='opacity: 0.9;font-size: 2em;font-weight:bolder;position:relative;left: 74%;bottom: 120px;'>" + rem + " more</div>\n";
                        }
                        if (ext == "mp4" || ext == "avi" || ext == "mov") {
                            saved_post = saved_post +
                                "<video controls controlsList=\"nodownload\" src=" + imgs_pths[k] + "\n" +
                                "style=\"border: solid 2px #fff-webkit-filter: blur(5px);filter: blur(5px);\"\n" +
                                "class=\"img_col-sm-4 \" alt=\"Image\"/><div id=" + data[i]._id + " class='a_pointer fa fa-plus fa-2x' style='opacity: 0.9;font-size: 2em;font-weight:bolder;position:relative;left: 74%;bottom: 120px;'>" + rem + " more</div>\n";
                        }
                    }
                }
                saved_post = saved_post +
                    "</div></div>\n" +
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
                    "<a style='cursor: pointer' class='save_post' id=" + data[i]._id + "><i class=\"far fa-bookmark\"></i>Save</a>\n" +
                    "</div>\n" +
                    "</div><!--post-bar end-->\n" +
                    "</div><!--posts-section end-->";

            }
            $("#saved_post_list").html(saved_post);
        }
    });
});