var chat_user_details = "";
var chat_area_no_frnd = "";
var chat_box = "";
var onlineuser_id = "";
var user_name = "";

var clicked_user_img = "";
var clicked_user_id = "";
var own_img = "";
var chat_pops_user_side = "";

$("#li_loader_friend_list").show();
$("#online_user_list").hide();
$("#div_chat_room").fadeOut();

$(document).ready(function () {

    own_img = document.getElementById("own_img").src;

    $.post('/users/get_friends', {}, function (data) {
        if (data.length > 1) {
            chat_user_details = "";
            for (var i = 0; i < data.length; i++) {
                if (data[i] != "") {
                    chat_user_details = chat_user_details + "<li class='chact_profile' id=" + data[i][0]._id + ">\n" +
                        "<div class=\"usr-msg-details\">\n" +
                        "<div class=\"usr-ms-img\">\n" +
                        "<img style='height: 50px;width: 50px;border: #88098d solid 2px' src=" + data[i][0].user_img_path + " alt=\"\">\n" +
                        "</div>\n" +
                        "<div class=\"usr-mg-info\">\n" +
                        "<h3>" + data[i][0].user_fname + " " + data[i][0].user_lname + "</h3>\n" +
                        "<p><b>" + data[i][0].user_uname + "</b></p>" +
                        "</div><!--usr-mg-info end-->\n" +
                        "</div><!--usr-msg-details end-->\n" +
                        "</li>";
                }
            }

        }
        else {
            chat_user_details = chat_user_details + "<li>\n" +
                "<div class=\"roq col-sm-12 text-center\">\n" +
                "<div class=\"row text-center\" style='align-items: center;display: block;margin: 0 auto'>\n" +
                "<center><img width='180' src=\"/images/loader/notfrnd.gif\" class='text-center align-content-center img-responsive'  alt=\"\"></center>\n" +
                "</div>\n" +
                "<div class=\"usr-mg-info col-sm-12 text-center\">\n" +
                "<h3>Oppss!!</h3>\n" +
                "<p><b>You got no friends <br>to chat with</br></p>" +
                "</div><!--usr-mg-info end-->\n" +
                "</div><!--usr-msg-details end-->\n" +
                "</li>";

            chat_area_no_frnd = chat_area_no_frnd + "<div class='row cols-m-12 text-center'>" +
                "<div class='row text-center' style='align-items: center;display: block;margin: 0 auto'>" +
                "<center><img src='/images/loader/notfrnd.gif' class='text-center align-content-center img-responsive' width='350'/> </center></div>" +
                "<div class='col-sm-12 text-center'>" +
                "<h2 style='font-size: 2em' class='color-orange'>Oppss!!</h2>" +
                "<p><b style='font-size: 1.5em' class='color-blue'>You got no friends <br>to chat with</br></p>" +
                "</div>" +
                "</div>";
            $("#div_chat_room_loader").html(chat_area_no_frnd);
        }
        $("#online_user_list").html(chat_user_details);
        $("#li_loader_friend_list").hide(700);
        $("#online_user_list").show(700);
    });

    $(document).on('click', '.chact_profile', function () {
        clicked_user_img = "";
        clicked_user_id = "";
        $("#div_chat_room").fadeOut(200);
        chat_box = "";
        var chat_user_id = $(this).attr("id");

        $.post('/users/get_chat_user_details', {
            chat_user_id: chat_user_id
        }, function (data) {
            if (data) {

                $("#msg_box_show").html('');
                clicked_user_img = data.user_data[0].user_img_path;
                clicked_user_id = data.user_data[0]._id;

                $('#chat_img').html('<img style="border: #88098d solid 2px;" height="50px" width="50px" src=' + data.user_data[0].user_img_path + ' alt="">');
                $('#User_name').html('<h3>' + data.user_data[0].user_fname + ' ' + data.user_data[0].user_lname + '</h3>\n' +
                    '<p>Online</p>');
                $("#btn_send_div").html("<button id=" + data.user_data[0]._id + " class=\"btn bg_col_purple color-white btn_send_msg\" type=\"submit\">Send&nbsp;&nbsp; <em class=\"fa fa-send\"></em></button>")
                // $("#div_chat_room").html(chat_box);

                chat_pops_user_side = "";
                for (i = 0; i < data.user_msgs.length; i++) {
                    if (clicked_user_id == data.user_msgs[i].sender_id) {
                        chat_pops_user_side = chat_pops_user_side + "<div class=\"main-message-box st3\">\n" +
                            "<div class=\"message-dt st3\">\n" +
                            "<div class=\"message-inner-dt\">\n" +
                            "<p>" + data.user_msgs[i].msg + "</p>\n" +
                            "</div><!--message-inner-dt end-->\n" +
                            "</div><!--message-dt end-->\n" +
                            "<div class=\"messg-usr-img\">\n" +
                            "<img style='border: #88098d solid 2px;width: 40px;height: 40px' src=" + clicked_user_img + " alt=\"\" class=\"mCS_img_loaded\">\n" +
                            "</div><!--messg-usr-img end-->\n" +
                            "</div>";
                    }
                    else {
                        chat_pops_user_side = chat_pops_user_side + "<div class=\"main-message-box ta-right\">\n" +
                            "<div class=\"message-dt\" style='float: right;max-width: 850px;width: auto'>\n" +
                            "<div class=\"message-inner-dt\">\n" +
                            "<p>" + data.user_msgs[i].msg + "</p>\n" +
                            "</div><!--message-inner-dt end-->\n" +
                            "</div><!--message-dt end-->\n" +
                            "<div class=\"messg-usr-img\">\n" +
                            "<img style='border: #88098d solid 2px;width: 40px;height: 40px' src=" + own_img + " alt=\"\" class=\"mCS_img_loaded\">\n" +
                            "</div><!--messg-usr-img end-->\n" +
                            "</div>";

                    }
                }
                $("#msg_box_show").html(chat_pops_user_side);
                $("#div_chat_room_loader").fadeOut(700, function () {
                    $("#div_chat_room").fadeIn(700);
                });
                var elem = document.getElementById('msg_box_show');
                elem.scrollTop = elem.scrollHeight;

            }
        });
    });


    $(document).on('click', '.btn_send_msg', function () {

        // alert("send click");
        var caption = "";
        var recpt_id = $(this).attr('id');
        var mult_simp_cap = $(".message_box").val();
        var multi_caption_text = $(".message_box").children().eq(0).html();

        if (!(multi_caption_text == "" || multi_caption_text == undefined)) {
            caption = multi_caption_text;
        }
        else if (!(mult_simp_cap == "" || mult_simp_cap == undefined)) {
            caption = mult_simp_cap;
        }

        if (!(caption == "")) {
            $.post('/users/send_message', {
                recpt_id: recpt_id,
                caption: caption
            }, function (data) {
                caption = "";
                if (data == "sent") {
                    $(".message_box").html('');
                    $(".message_box").children().eq(0).html('');
                    $("#msg_box_show").fadeOut(200);
                    $.post('/users/get_messages', {
                        chat_user_id: recpt_id
                    }, function (data) {
                        if (data) {
                            $("#msg_box_show").html('');

                            chat_pops_user_side = "";
                            for (i = 0; i < data.user_msgs.length; i++) {
                                if (clicked_user_id == data.user_msgs[i].sender_id) {
                                    chat_pops_user_side = chat_pops_user_side + "<div class=\"main-message-box st3\">\n" +
                                        "<div class=\"message-dt st3\">\n" +
                                        "<div class=\"message-inner-dt\">\n" +
                                        "<p>" + data.user_msgs[i].msg + "</p>\n" +
                                        "</div><!--message-inner-dt end-->\n" +
                                        "</div><!--message-dt end-->\n" +
                                        "<div class=\"messg-usr-img\">\n" +
                                        "<img style='border: #88098d solid 2px;width: 40px;height: 40px' src=" + clicked_user_img + " alt=\"\" class=\"mCS_img_loaded\">\n" +
                                        "</div><!--messg-usr-img end-->\n" +
                                        "</div>";
                                }
                                else {
                                    chat_pops_user_side = chat_pops_user_side + "<div class=\"main-message-box ta-right\">\n" +
                                        "<div class=\"message-dt\" style='float: right;max-width: 850px;width: auto'>\n" +
                                        "<div class=\"message-inner-dt\">\n" +
                                        "<p>" + data.user_msgs[i].msg + "</p>\n" +
                                        "</div><!--message-inner-dt end-->\n" +
                                        "</div><!--message-dt end-->\n" +
                                        "<div class=\"messg-usr-img\">\n" +
                                        "<img style='border: #88098d solid 2px;width: 40px;height: 40px' src=" + own_img + " alt=\"\" class=\"mCS_img_loaded\">\n" +
                                        "</div><!--messg-usr-img end-->\n" +
                                        "</div>";

                                }
                            }
                            $("#msg_box_show").html(chat_pops_user_side);
                            $("#msg_box_show").fadeIn(700);


                            var elem = document.getElementById('msg_box_show');
                            elem.scrollTop = elem.scrollHeight;


                        }
                    });
                }
            });
        }
    });

    // function addMessages(message) {
    //     $("#messages").append('<h4> ${message.name} </h4><p>  ${message.message} </p>')
    // }
    //
    // function getMessages() {
    //     $.get('http://localhost:3000/messages', (data) => {
    //             data.forEach(addMessages);
    //         }
    //     )
    // }


});
