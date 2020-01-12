var req_list = "";
$(document).ready(function () {
    $.post('/users/get_request', {}, function (data) {
        req_list="";
        if (data.req_users == null) {
            req_list = req_list + "<div class='col-sm-12 text-center color-blue fa-2x' >No Requests Yet</div><br><br><br>" +
                "<div class='color-purple text-center' style='font-size: 1em'>lets! find some friends</div>";
        }
        else {
            for (var i = 0; i < data.req_users.length; i++) {
                req_list = req_list + "<div class=\"request-details\">\n" +
                    "<div class=\"noty-user-img\">\n" +
                    "<img style='border-radius: 50px;height: 50px;width: 50px; border: 2px solid #88098d' src=" + data.req_users[i].user_img_path + " alt=\"\">\n" +
                    "</div>\n" +
                    "<div style='padding-left: 30px' class=\"request-info\">\n" +
                    "<h3 style='font-size: 25px'>" + data.req_users[i].user_fname + " " + data.req_users[i].user_lname + "</h3>\n" +
                    "<a href='/users/search/" + data.req_users[i].user_uname + "' style='font-size: 20px'>" + data.req_users[i].user_uname + "</a>\n" +
                    "</div>\n" +
                    "<div class=\"accept-feat\">\n" +
                    "<ul>\n" +
                    "<li>\n" +
                    "<button id=" + data.req_users[i]._id + " class=\"accept_req btn bg_col_purple color-white\">Accept</button>\n" +
                    "</li>\n" +
                    "<li>\n" +
                    "<button id=" + data.req_users[i]._id + " class=\"del_req btn bg-danger color-white\"><i class=\"fa fa-close\"></i></button>\n" +
                    "</li>\n" +
                    "</ul>\n" +
                    "</div><!--accept-feat end-->\n" +
                    "</div>";
            }

        }
        $("#req_list").html(req_list);
    });

    $(document).on('click', '.accept_req', function () {
        var accept_id = $(this).attr('id');
        $.post('/users/accept_req', {
            'accept_id': accept_id
        }, function (data) {
            if (data == "accepted") {
                window.location.reload();
            }
        });
    });

    $(document).on('click', '.del_req', function () {
        var cancel_req_id = $(this).attr('id');
        $.post('/users/delete_req', {
            'cancel_req_id': cancel_req_id
        }, function (data) {
            if (data == "canceled") {
                swal("Canceled", 10000);
                location.reload();
            }
            else {
                alert("some internal error");
            }

        });

    });
});