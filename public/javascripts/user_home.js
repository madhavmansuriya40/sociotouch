$(document).ready(function () {


    var loc_id = "";
    var place_name = "";

    var multi_loc_id = "";
    var multi_place_name = "";

    //-----------------multi hide-----------------

    $("#div_multi_tag_ppls").hide(700);
    $("#srch_ppl").hide();
    $("#div_show_tag_ppls").hide();
    $("#show_tag_search_rslt").hide();
    $('#tags_div').hide();

    $("#div_multi_place_area").hide();
    $("#txt_multi_location_search_bar").hide();
    $("#multi_loc_ans").hide();
    $("#div_multi_show_search_loc_res").hide();


    //-------------multi hide over--------------------

    $("#srch_ppl").hide();
    $("#div_show_tag_ppls").hide();
    $("#show_tag_search_rslt").hide();
    $('#tags_div').hide();
    $("#txt_location_search_bar").hide();
    $("#div_show_search_loc_res").hide();
    $("#div_place_area").hide();

    $("#div_srch_data").hide(700);
    $(document).ready(function () {
        $("#user_search").keyup(function () {
            $("#drp_dwn_result").html("");
            if (!($("#user_search").val().trim() == 0)) {
                $.post('/users/search_user', {
                    'search_data': $(this).val(),
                }, function (data) {
                    var drp_dwn_data = "";
                    if (data['search_data_ans'] != "") {
                        for (var i = 0; i < data['search_data_ans'].length; i++) {
                            drp_dwn_data = drp_dwn_data + "<a href=/users/search/" + data['search_data_ans'][i]['user_uname'] + "><li style='margin: 5%;font-size: 1.2em;cursor: pointer' id=" + data['search_data_ans'][i]['_id'] + "><div><img src=" + data['search_data_ans'][i]['user_img_path'] + " style='border-radius: 50%' width='30' height='30' />&nbsp;&nbsp;<span style='margin-top: -12px'>" + data['search_data_ans'][i]['user_fname'] + " " + data['search_data_ans'][i]['user_lname'] + "</span><br><span style='margin-top: -12px;font-size: 0.8em;color: gray;'>" + data['search_data_ans'][i]['user_uname'] + "</span></div></li>";
                            drp_dwn_data = drp_dwn_data + "<div class='text-center' style='margin-left: 20px'> <div style='background: #0e2549;height: 1px;width: 90%;border-radius: 25px'></div></div></a>";
                        }
                    }
                    else {
                        drp_dwn_data = drp_dwn_data + "<li style='margin: 1%;font-size: 1.2em'><div class='text-center'>No Result found</div></li>";
                    }
                    $("#drp_dwn_result").append(drp_dwn_data);
                    $("#div_srch_data").slideDown(700);
                });
            }
            else {
                $("#div_srch_data").hide(700);
            }
        });
    });

//----------------------------  caption post script start       ----------------------

//*************     upload caption post start  (caption upload btn click)      **********************

    var arr_user_tag_id = Array();
    var arr_user_tag_name = Array();

    var multi_arr_user_tag_id = Array();
    var multi_arr_user_tag_name = Array();

    $("#div_show_tag_search_rslt").hide();
    $("#div_multi_show_tag_search_rslt").hide();


    $(document).on("click", "#btn_tags", function () {
        $('#srch_ppl').toggle(700);
        $("#div_show_tag_ppls").toggle(700);
    });


    $("#btn_add_location").click(function () {
        $("#txt_location_search_bar").toggle(700);
    });

    var name_to_search = "";
    $('#srch_ppl , #multi_srch_ppl').keyup(function () {

        $("#show_tag_search_rslt").html("");
        $("#show_multi_tag_search_rslt").html("");
        if (document.getElementById("srch_ppl").value != "") {
            name_to_search = document.getElementById("srch_ppl").value;
        }
        else {
            name_to_search = document.getElementById("multi_srch_ppl").value;
        }

        $.post('/users/search_user', {
            'search_data': name_to_search,
        }, function (data) {
            var drp_dwn_data = "";
            if (data['search_data_ans'] != "") {
                if (document.getElementById("srch_ppl").value != "") {

                    for (var i = 0; i < data['search_data_ans'].length; i++) {
                        drp_dwn_data = drp_dwn_data + "<li style='margin: 3.0%;font-size: 1em;cursor: pointer' class='get_user_for_tag' id=" + data['search_data_ans'][i]['_id'] + "><div><img src=" + data['search_data_ans'][i]['user_img_path'] + " style='border-radius: 50%' width='30' height='30' />&nbsp;&nbsp;<span style='margin-top: -12px'>" + data['search_data_ans'][i]['user_fname'] + " " + data['search_data_ans'][i]['user_lname'] + "</span><br></div></li>";
                        drp_dwn_data = drp_dwn_data + "<div class='text-center' style='margin-left: 10%'> <div style='background: #636363;height: 1px;width: 70%;border-radius: 25px'></div></div>";
                    }
                }
                else {
                    for (var i = 0; i < data['search_data_ans'].length; i++) {
                        drp_dwn_data = drp_dwn_data + "<li style='margin: 3.0%;font-size: 1em;cursor: pointer' class='get_multi_user_for_tag' id=" + data['search_data_ans'][i]['_id'] + "><div><img src=" + data['search_data_ans'][i]['user_img_path'] + " style='border-radius: 50%' width='30' height='30' />&nbsp;&nbsp;<span style='margin-top: -12px'>" + data['search_data_ans'][i]['user_fname'] + " " + data['search_data_ans'][i]['user_lname'] + "</span><br></div></li>";
                        drp_dwn_data = drp_dwn_data + "<div class='text-center' style='margin-left: 10%'> <div style='background: #636363;height: 1px;width: 70%;border-radius: 25px'></div></div>";
                    }
                }
            }
            else {
                drp_dwn_data = drp_dwn_data + "<li style='margin: 1%;font-size: 0.8em'><div class='text-center'>No Result found</div></li>";
            }

            if (document.getElementById("srch_ppl").value != "") {
                $("#show_tag_search_rslt").append(drp_dwn_data);
                $("#div_show_tag_search_rslt").show();
                $("#show_tag_search_rslt").slideDown(700);
            }
            else {
                $("#show_multi_tag_search_rslt").append(drp_dwn_data);
                $("#div_multi_show_tag_search_rslt").show();
                $("#show_multi_tag_search_rslt").slideDown(700);
            }
        });
    });

    $tag_count = 0;
    $multi_tag_count = 0;
    $("body").on("click", "#btn_rmv_member_tag", function () {
        if (!($tag_count == 0)) {
            var rem_id = $(this).closest(".user_tag").attr("id");
            if (arr_user_tag_id.includes(rem_id)) {
                var id_idx = arr_user_tag_id.indexOf(rem_id);
                arr_user_tag_id.splice(id_idx, 1);
            }
            $(this).closest(".user_tag").remove();
        }
        if ($tag_count == 0) {
            alert("All tag finish")
        }
    });

    $("body").on("click", "#btn_rmv_multi_member_tag", function () {
        if (!($multi_tag_count == 0)) {
            var rem_id = $(this).closest(".multi_user_tag").attr("id");
            if (multi_arr_user_tag_id.includes(rem_id)) {
                var id_idx = multi_arr_user_tag_id.indexOf(rem_id);
                multi_arr_user_tag_id.splice(id_idx, 1);
            }
            $(this).closest(".multi_user_tag").remove();
        }
        if ($multi_tag_count == 0) {
            alert("All tag finish")
        }
    });


    $(document).on("click", ".get_user_for_tag", function () {
        var u_id = $(this).attr("id");
        var u_name = $(this).children().eq(0).children().eq(1).html();
        var arr_check_res = arr_user_tag_id.includes(u_id);
        if (!(arr_check_res)) {
            arr_user_tag_id.push(u_id);
            arr_user_tag_name.push(u_name);

            $("#tags_div").show(500);
            $tag_count++;
            $("#show_tag_ppls").append('<span class="user_tag" id="' + u_id + '">' + u_name + ' <em class="fa fa-close color-orange" id="btn_rmv_member_tag"></em></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

            $("#srch_ppl").val("");
            $("#div_show_tag_search_rslt").hide();
            $("#show_tag_search_rslt").slideToggle(700);
        }
    });

    $(document).on("click", ".get_multi_user_for_tag", function () {
        var u_id = $(this).attr("id");
        var u_name = $(this).children().eq(0).children().eq(1).html();
        var arr_check_res = multi_arr_user_tag_id.includes(u_id);
        if (!(arr_check_res)) {
            multi_arr_user_tag_id.push(u_id);
            multi_arr_user_tag_name.push(u_name);

            $("#multi_tags_div").show(500);
            $multi_tag_count++;
            $("#show_multi_tag_ppls").append('<span class="multi_user_tag" id="' + u_id + '">' + u_name + ' <em class="fa fa-close color-orange" id="btn_rmv_multi_member_tag"></em></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

            $("#multi_srch_ppl").val("");
            $("#div_multi_show_tag_search_rslt").hide();
            $("#show_multi_tag_search_rslt").slideToggle(700);
        }
    });

    $(document).on("click", "#btn_caption_post", function () {

        var caption_post_upload_err = 0;

        var backy = $(".caption_text").css('background-image');
        var backy_path = backy.substring(5, backy.length - 2);
        var simp_cap = $(".caption_text").val();
        var caption_text = $(".caption_text").children().eq(0).html();


        var caption = "";
        var background = "";
        var tags = "";

        if (caption_text == "" || caption_text == undefined && simp_cap == "") {
            caption_post_upload_err++;
            $("#txt_caption_err").html("<span class='fa fa-warning text-danger'> Please share something here<br> </span>");
        }
        else {
            if (!(caption_text == "" || caption_text == undefined)) {
                caption = caption_text;
            }
            else {
                caption = simp_cap;
            }
        }

        if (backy_path != "ne") {
            background = backy_path;
        }

        if (arr_user_tag_id != "") {
            tags = arr_user_tag_id.toString();
        }

        if (caption_post_upload_err == 0) {
            $.post('/users/upload_caption_post', {
                'caption': caption,
                'background': background,
                'tags': tags,
                'loc_id': loc_id,
                'place_name': place_name,
                'media_path': "",
            }, function (data) {
                if (data == "posted") {
                    swal("Good job!", "You have a new feed on wall. go check!!!", "success");
                    //clearing normal post text
                    $(".caption_text").html('');
                    //clearing image background post text
                    $(".caption_text").children().eq(0).html('');
                    //clearing background image
                    $(".caption_text").css('background-image', '');
                    //clearing multi tags
                    $("#show_multi_tag_ppls").html('');
                    $("#multi_srch_ppl").val("");
                    //clearing single tags
                    $("#show_tag_ppls").html('');
                    $("#srch_ppl").val("");
                    //clearing tag search rslts
                    $("#show_tag_search_rslt").html("");
                    $("#show_multi_tag_search_rslt").html("");
                    //clearing location
                    $("#txt_place").html('');
                }
                else if (data == "no_file_suport") {
                    swal({
                        title: "Internal File support error",
                        type: "warning",
                        confirmButtonColor: '#88098d',
                        confirmButtonText: 'OK',
                    });
                }
                else if (data == "home") {
                    location.replace('/');
                }
                else {
                    swal({
                        title: "Internal error 500!!",
                        type: "warning",
                        confirmButtonColor: '#88098d',
                        confirmButtonText: 'OK',
                    });
                }
            });
        }
    });

    $(document).on('click', '.location_area', function () {

        $("#div_place_area").show(700);
        $("#txt_location_search_bar").toggle(700);
        $("#div_show_search_loc_res").slideUp(700);

        loc_id = $(this).attr('id');
        place_name = $(this).attr("title");

        $("#txt_place").html(place_name);
    });


//    --------------------------        multi pic upload        -----------------------
    $('#ico_multi_tag').click(function () {
        $("#div_multi_tag_ppls").toggle(700);
    });

    $(document).on('click', '.multi_location_area', function () {

        $("#div_multi_place_area").show(700);
        $("#txt_multi_location_search_bar").toggle(700);
        $("#div_multi_show_search_loc_res").slideUp(700);

        multi_loc_id = $(this).attr('id');
        multi_place_name = $(this).attr("title");

        $("#txt_muti_place").html(multi_place_name);
    });


    $('#ico_multi_location').click(function () {
        $("#txt_multi_location_search_bar").toggle(700);
    });

//    -------------------------         post media button click event start           ---------------------


    $("#post_media").click(function () {

        var mult_simp_cap = $(".multi_caption_text").val();
        var multi_caption_text = $(".multi_caption_text").children().eq(0).html();

        if (!(multi_caption_text == "" || multi_caption_text == undefined)) {
            caption = multi_caption_text;
        }
        else if (!(mult_simp_cap == "" || mult_simp_cap == undefined)) {
            caption = mult_simp_cap;
        }
        else {
            caption = "";
        }
        var multi_tags = "";
        if (multi_arr_user_tag_id != "") {
            multi_tags = multi_arr_user_tag_id.toString();
        }

        var multi_media = "";
        var form_data = new FormData();


        $.each($('#photos')[0].files, function (i, file) {
            form_data.append('file', file);
        });

        // alert(caption);
        form_data.append('caption', caption)
        form_data.append('background', "")
        form_data.append('tags', multi_tags)
        form_data.append('loc_id', multi_loc_id)
        form_data.append('place_name', multi_place_name)

        // alert("called by me");

        var contenttype = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };

        axios.post('/users/upload_multi_caption_post', form_data, contenttype)
            .then(function (response) {
                if (response.data == "uploaded") {
                    // alert("done");
                    swal("Good job!", "You have a new feed on wall. go check!!!", "success");
                    //clearing normal post text
                    $(".caption_text").html('');
                    //clearing image background post text
                    $(".caption_text").children().eq(0).html('');
                    //clearing background image
                    $(".caption_text").css('background-image', '');
                    //clearing multi tags
                    $("#show_multi_tag_ppls").html('');
                    $("#multi_srch_ppl").val("");
                    //clearing single tags
                    $("#show_tag_ppls").html('');
                    $("#srch_ppl").val("");
                    //clearing tag search rslts
                    $("#show_tag_search_rslt").html("");
                    $("#show_multi_tag_search_rslt").html("");
                    //clearing location
                    $("#txt_place").html('');
                    $("#txt_muti_place").html('');
                    $("#photos_clearing").html('');
                    $("#post_media").hide(700);
                    $("#txt_post_media_caption").hide(700);
                    $("#ico_multi_tag").hide(700);
                    $("#ico_multi_location").hide(700);
                    $("#div_multi_place_area").hide(700);
                    $("#div_multi_tag_ppls").hide(700);

                }
                else {
                    swal({
                        title: "Internal File support error",
                        type: "warning",
                        confirmButtonColor: '#88098d',
                        confirmButtonText: 'OK',
                    });
                }
            })
            .catch(function (error) {
                swal({
                    title: "Opps!! Internal error 500",
                    type: "warning",
                    confirmButtonColor: '#88098d',
                    confirmButtonText: 'OK',
                });
            });
    });


    $.post('/users/get_posts_all_frnd', {}, function (data) {
        // alert(data);
        console.log(data);
    })
//    -------------------------         post media button click event Over           ---------------------


});