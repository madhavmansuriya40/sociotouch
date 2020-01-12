$(document).ready(function () {

    $("#div_reg").hide();
    $("#div_login_pass_box").hide();
    $("#show_uname").hide();
    $("#user").focus();
    $("#forgot_pass_box").hide();
    $("#reset_password").hide();
    $("#div_otp_check").hide();
    $('#mail_sending_loader').hide();
    $("#div_reg_form_loader").hide();
    $("#div_reg_otp_check").hide();

    var reg_err = 0;

    //----------------- login validation starts -----------------
    $(document).on('click', "#btn_next", function () {
        $("#pass").focus();
        var log_uid = document.getElementById("user").value;
        if (log_uid.trim() == 0) {
            $("#user").focus();
            document.getElementById("user").classList.add('error');
            setTimeout(function () {
                document.getElementById("user").classList.remove('error');
            }, 300);
            $("#user").css("border", "red solid 1px");
            $("#div_login_img").hide(300);
            $("#img_login_user").attr("src", "");
            $("#login_box").attr("height", "auto");
            $("#txt_login_uname_error").html("<span class='fa fa-warning text-danger'> Invalid Credentials <br> </span>");
        } else {
            document.getElementById("user").classList.remove('error');
            $("#user").css("border", "none");
            $("#txt_login_uname_error").html("");

            var temp_name = document.getElementById("user").value;
            $("#temp_uname").html(temp_name);

            $.post('/get_profile', {
                'id': document.getElementById("user").value,
                '_csrf': document.getElementById('_csrf').value
            }, function (data) {
                if (data['img_path'] === "no_user") {
                    $("#user").focus();
                    document.getElementById("user").classList.add('error');
                    setTimeout(function () {
                        document.getElementById("user").classList.remove('error');
                    }, 300);
                    $("#user").css("border", "red solid 1px");
                    $("#div_login_img").hide(300);
                    $("#img_login_user").attr("src", "");
                    $("#txt_login_uname_error").html("<span class='fa fa-warning text-danger'> User Authentication failed <br> </span>");
                }
                else {
                    $("#div_login_img").show(300);
                    $("#div_login_uname_box").hide(300);
                    $("#div_login_pass_box").show(300);
                    $("#lbl_help").hide(300);
                    $("#show_uname").show(300);

                    $("#pass").focus();
                    for (var i = 0; i < data['img_path'].length; i++) {
                        $("#img_login_user").attr("src", data['img_path'][i]['user_img_path']);
                    }
                }


            });
        }
    });

    $(document).on("click", "#btn_prev", function () {
        $("#div_login_img").hide(300);
        $("#div_login_uname_box").show(300);
        $("#div_login_pass_box").hide(300);
        $("#lbl_help").show(300);
        $("#show_uname").hide(300);
        $("#pass").val("");
        $("#user").val("");
    });
    //----------------- login validation ends -----------------


    //----------------- login button click event start -----------------
    $(document).on("click", "#login", function () {
        var login_err = 0;
        var pass = document.getElementById("pass").value;
        if (pass.trim() == 0) {
            login_err++;
            document.getElementById("pass").classList.add('error');
            setTimeout(function () {
                document.getElementById("pass").classList.remove('error');
            }, 300);
            $("#pass").css("border", "red solid 1px");
            $("#txt_login_pass_error").html("<span class='fa fa-warning text-danger'> Invalid <br> </span>");
        }
        else {
            if (document.getElementById("user").value == "") {
                $("#div_login_img").hide(300);
                $("#div_login_uname_box").show(300);
                $("#div_login_pass_box").hide(300);
                $("#lbl_help").show(300);
                $("#show_uname").hide(300);
                $("#pass").val("");
                $("#txt_login_uname_error").html("<span class='fa fa-warning text-danger'> All fields are mandatory <br> </span>");
                login_err++;
            } else if (document.getElementById("user").value == "") {
                $("#txt_login_uname_error").html("");
                login_err++;
                $("#txt_login_pass_error").html("<span class='fa fa-warning text-danger'> All fields are mandatory <br> </span>");
            }
            else {
                if (login_err == 0) {
                    $("#txt_login_uname_error").html("");
                    $("#txt_login_pass_error").html("");
                    $.post('http://localhost:30000/login', {
                        'id': document.getElementById("user").value,
                        'pass': document.getElementById("pass").value,
                        '_csrf': document.getElementById('_csrf').value
                    }, function (data) {
                        if (data['msg'] == "Auth Successful") {
                            location.assign('/users/home');
                            // alert("Auth Successful");
                        }
                        else {
                            login_err++;
                            document.getElementById("pass").classList.add('error');
                            setTimeout(function () {
                                document.getElementById("pass").classList.remove('error');
                            }, 300);
                            $("#pass").css("border", "red solid 1px");
                            $("#txt_login_pass_error").html("<span class='fa fa-warning text-danger'> Invalid <br> </span>");
                        }
                    });
                } else {
                    login_err = 0;
                    alert(login_err);
                }
            }
        }
    });
    //----------------- login button click event over -----------------
    $(document).on("click", "#btn_reg", function () {
        closeLoginInfo();
        $("#div_reg").slideToggle('700');
        $("#div_login").slideToggle('700');
    });

    $(document).on("click", "#already_reg", function () {
        $("#div_reg").hide('700');
        $("#div_login").slideToggle('700');
    });

    openLoginInfo();
    setTimeout(closeLoginInfo, 1000);
});

function openLoginInfo() {
    $(document).ready(function () {
        $('.b-form').css("opacity", "0.01");
        $('.box-form').css("left", "-37%");
        $('.box-info').css("right", "-37%");
    });
}

function closeLoginInfo() {
    $(document).ready(function () {
        $('.b-form').css("opacity", "1");
        $('.box-form').css("left", "0px");
        $('.box-info').css("right", "-5px");
    });
}

$(window).on('resize', function () {
    closeLoginInfo();
});

$("#drp_dwn_state").change(function () {
    var id = $("#drp_dwn_state option:selected").val();
    $.post('http://localhost:30000/get_citys', {
        'state_id': id,
        '_csrf': document.getElementById('_csrf').value
    }, function (data) {
        $("#drp_dwn_citys").html('');
        var city_list = "";
        for (var i = 0; i < data['doc'].length; i++) {
            city_list = city_list + "<option value=" + data['doc'][i]['city_id'] + ">" + data['doc'][i]['city_name'] + "</option>"
        }
        $("#drp_dwn_citys").append(city_list);
    });
});

// Registration form validation starts  //


$(document).on("change", "#imageUpload", function () {
    var img_path = document.getElementById("imageUpload").value;
    var ext = img_path.split('.').pop();
    if (img_path.length == 0) {
        $("#txt_image_error").html("<span class='fa fa-warning text-warning'> You have Preferred Default Image !! and its looking awesome <br> </span>");
    } else {
        if (!(ext.toLowerCase() == "gif" || ext.toLowerCase() == "jpg" || ext.toLowerCase() == "png" || ext.toLowerCase() == "jpeg")) {
            $("#txt_image_error").html("<span class='fa fa-exclamation text-danger'> Image type invalid <br></span>");
        } else {
            $("#txt_image_error").html("");
        }
    }
});

$(document).on("focusout", "#txt_fname", function () {
    var fname = document.getElementById("txt_fname").value;
    if (fname.length == 0) {
        $("#txt_fname_error").html("<span class='fa fa-warning text-danger'> First name can't be empty <br> </span>");
    } else if (!(/^([A-Z]{1})[a-z]+$/.test(fname))) {
        $("#txt_fname_error").html('<span class="fa fa-exclamation text-danger"> Invalid First Name</span>');
    } else {
        $("#txt_fname_error").html("");
    }
});

$(document).on("focusout", "#txt_lname", function () {
    var lname = document.getElementById("txt_lname").value;
    if (lname.length == 0) {
        $("#txt_lname_error").html("<span class='fa fa-warning text-danger'> Last name can't be empty <br> </span>");
    } else if (!(/^([A-Z]{1})[a-z]+$/.test(lname))) {
        $("#txt_lname_error").html('<span class="fa fa-exclamation text-danger"> Invalid Last Name</span>');
    } else {
        $("#txt_lname_error").html("");
    }
});

$(document).on("focusout", "#txt_uname", function () {
    var uname = document.getElementById("txt_uname").value;
    if (uname.length == 0) {
        $("#txt_uname_error").html("<span class='fa fa-warning text-danger'> User name can't be empty <br> </span>");
    } else if (!(/^[a-zA-Z0-9._]+$/.test(uname))) {
        $("#txt_uname_error").html('<span class="fa fa-exclamation text-danger"> Invalid Uast Name</span>');
    } else {
        var user_name_check = $("#txt_uname").val();
        $.post('http://localhost:30000/checkusername', {
            'check_user_name': user_name_check,
            '_csrf': document.getElementById('_csrf').value
        }, function (data) {
            if (data['doc'] == "allow") {
                $("#txt_uname_error").html("<span class='fa fa-check text-success'> nice choice <br> </span>");
            } else {
                $("#txt_uname_error").html("<span class='fa fa-exclamation text-danger'> Try something unique <br> </span>");
            }
        });
    }
});

$(document).on('focusout', '#datepicker', function () {
    var date = document.getElementById("datepicker").value;
    if (date.length == 0) {
        $("#txt_bdate_error").html("<span class='fa fa-exclamation text-danger'> Invalid Date <br> </span>");
    }
    else {
        $("#txt_bdate_error").html("");
    }
});

$(document).on('focusout', '#drp_dwn_gen', function () {
    var drp_gen = document.getElementById("drp_dwn_gen").value;
    if (drp_gen.length == 0) {
        $("#txt_gen_error").html("<span class='fa fa-exclamation text-danger'> Please specify gender <br> </span>");
    } else {
        $("#txt_gen_error").html("");
    }
});

$("#txt_cont_no").focusout(function () {
    var cont = document.getElementById("txt_cont_no").value;
    if (cont.trim() == 0) {
        $("#txt_cont_error").html('<span class="fa fa-exclamation text-danger"> Enter Faculty Contact</span>');
    } else if (!(/^\+(?:[0-9] ?){6,14}[0-9]$/.test(cont))) {
        $("#txt_cont_error").html('<span class="fa fa-exclamation text-danger"> yoy might be entering wrong contact no <p class="text-info" style="margin:2%">EX: +91 99*****999 for india</p></span>');
    } else {
        $("#txt_cont_error").html('');
    }
});

$(document).on('focusout', '#drp_dwn_gen', function () {
    var drp_gen = document.getElementById("drp_dwn_gen").value;
    if (drp_gen.length == 0) {
        $("#txt_gen_error").html("<span class='fa fa-exclamation text-danger'> Please specify gender <br> </span>");
    } else {
        $("#txt_gen_error").html("");
    }
});

$("#txt_email").focusout(function () {

    var email = document.getElementById("txt_email").value;

    if (email.trim() == 0) {
        $("#txt_email_error").html('<span class="fa fa-exclamation text-danger"> Enter Email ID</span>');
    } else if (!(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email))) {
        $("#txt_email_error").html('<span class="fa fa-exclamation text-danger"> Invalid Email ID</span>');
    } else {
        $.post('/check_mail/user', {
            'email': email,
            '_csrf': document.getElementById('_csrf').value
        }, function (data) {
            if (data['email_check'] == "exist") {
                $("#txt_email_error").html('<span class="fa fa-exclamation text-danger"> Seems Email adress already exist please recheck</span>');
            } else {
                $("#txt_email_error").html('');
            }
        });
    }
});


$(document).on('focusout', '#drp_dwn_state', function () {
    var drp_state = document.getElementById("drp_dwn_state").value;
    if (drp_state.length == 0) {
        $("#txt_state_error").html("<span class='fa fa-exclamation text-danger'> Please select State <br> </span>");
    } else {
        $("#txt_state_error").html("");
    }
});


$(document).on('focusout', '#drp_dwn_citys', function () {
    var drp_city = document.getElementById("drp_dwn_citys").value;
    if (drp_city.length == 0) {
        $("#txt_city_error").html("<span class='fa fa-exclamation text-danger'> Please select ciity <br> </span>");
    } else {
        $("#txt_city_error").html("");
    }
});

$("#txt_pass").focusout(function () {
    var pass = document.getElementById("txt_pass").value;
    if (pass.trim() == 0) {
        $("#txt_pass_error").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
    }
    else {
        if (pass.length > 5) {
            if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/.test(pass)) {
                $("#txt_pass_error").html('');
            }
            else {
                $("#txt_pass_error").html('<span class="fa fa-exclamation text-danger"> Password should contain <br><b>Capital Letter</b> <br><b>Small Letter</b><br><b>Number</b><br><b>Special character (!@#$%^&*)</b></span>');
            }
        }
        else {
            $("#txt_pass_error").html('<span class="fa fa-exclamation text-danger"> Password length too short atleast 5 character</span>');
        }
    }
});
$("#txt_confi_pass").focusout(function () {
    var confi_pass = document.getElementById("txt_confi_pass").value;
    if (confi_pass.trim() == 0) {
        $("#txt_confipass_error").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
    }
    else {
        if (confi_pass.length > 5) {
            if (document.getElementById("txt_pass").value == document.getElementById("txt_confi_pass").value) {
                if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/.test(confi_pass)) {
                    $("#txt_confipass_error").html('');
                }
                else {
                    $("#txt_confipass_error").html('<span class="fa fa-exclamation text-danger"> Password should contain <br><b>Capital Letter</b> <br><b>Small Letter</b><br><b>Number</b><br><b>Special character (!@#$%^&*)</b></span>');
                }
            }
            else {
                $("#txt_confipass_error").html('<span class="fa fa-exclamation text-danger"> Password and Re-entered password do not match</span>');
            }

        }
        else {
            $("#txt_confipass_error").html('<span class="fa fa-exclamation text-danger"> Password length not match</span>');
        }

    }
});

// Registration form validation ends  //
$(document).on('click', '#btn_verify_reg_otp', function () {
    if (reg_err == 0) {
        $.post('/reg_checkotp', {
            'otp': document.getElementById("txt_reg_otp").value
        }, function (data) {
            if (data == "done") {
                if (reg_err == 0) {
                    reg_user();
                }
                else {
                    alert("err");
                }
            }
            else {
                swal({
                    title: "Enter valid OTP",
                    type: "warning",
                    confirmButtonColor: '#88098d',
                    confirmButtonText: 'OK',
                });
            }
        });
    }
    else {
        swal({
            title: "Opps!! Something went wrong",
            type: "warning",
            confirmButtonColor: '#88098d',
            confirmButtonText: 'OK',
        });
    }
});

$(document).on('click', '#register', function () {

    $("#div_reg_form").hide(700);
    $("#div_reg_form_loader").show(700);

    reg_err = 0;

    var img_path = document.getElementById("imageUpload").value;
    var ext = img_path.split('.').pop();
    if (img_path.length == 0) {
        $("#txt_image_error").html("<span class='fa fa-warning text-warning'> You have Preferred Default Image !! and its looking awesome <br> </span>");
    } else {
        if (!(ext.toLowerCase() == "gif" || ext.toLowerCase() == "jpg" || ext.toLowerCase() == "png" || ext.toLowerCase() == "jpeg")) {
            reg_err++;
            $("#txt_image_error").html("<span class='fa fa-exclamation text-danger'> Image type invalid <br></span>");
        } else {
            $("#txt_image_error").html("");
        }
    }

    var fname = document.getElementById("txt_fname").value;
    if (fname.length == 0) {
        reg_err++;
        $("#txt_fname_error").html("<span class='fa fa-exclamation text-danger'> First name can't be empty <br> </span>");
    } else if (!(/^([A-Z]{1})[a-z]+$/.test(fname))) {
        reg_err++;
        $("#txt_fname_error").html('<span class="fa fa-exclamation text-danger"> Invalid First Name</span>');
    } else {
        $("#txt_fname_error").html("");
    }

    var lname = document.getElementById("txt_lname").value;
    if (lname.length == 0) {
        reg_err++;
        $("#txt_lname_error").html("<span class='fa fa-exclamation text-danger'> Last name can't be empty <br> </span>");
    } else if (!(/^([A-Z]{1})[a-z]+$/.test(lname))) {
        reg_err++;
        $("#txt_lname_error").html('<span class="fa fa-exclamation text-danger"> Invalid Last Name</span>');
    } else {
        $("#txt_lname_error").html("");
    }

    var uname = document.getElementById("txt_uname").value;
    if (uname.length == 0) {
        reg_err++;
        $("#txt_uname_error").html("<span class='fa fa-exclamation text-danger'> User name can't be empty <br> </span>");
    } else if (!(/^[a-zA-Z0-9._]+$/.test(uname))) {
        reg_err++;
        $("#txt_uname_error").html('<span class="fa fa-exclamation text-danger"> Invalid Uast Name</span>');
    } else {
        var user_name_check = $("#txt_uname").val();
        $.post('http://localhost:30000/checkusername', {
            'check_user_name': user_name_check,
            '_csrf': document.getElementById('_csrf').value
        }, function (data) {
            if (data['doc'] == "allow") {
                $("#txt_uname_error").html("<span class='fa fa-check text-success'> nice choice <br> </span>");
            } else {
                reg_err++;
                $("#txt_uname_error").html("<span class='fa fa-exclamation text-danger'> Try something unique <br> </span>");
            }
        });
    }

    var date = document.getElementById("datepicker").value;
    if (date.length == 0) {
        reg_err++;
        $("#txt_bdate_error").html("<span class='fa fa-exclamation text-danger'> Invalid Date <br> </span>");
    }
    else {
        $("#txt_bdate_error").html("");
    }

    var drp_gen = document.getElementById("drp_dwn_gen").value;
    if (drp_gen.length == 0) {
        reg_err++;
        $("#txt_gen_error").html("<span class='fa fa-exclamation text-danger'> Please specify gender <br> </span>");
    } else {
        $("#txt_gen_error").html("");
    }

    var cont = document.getElementById("txt_cont_no").value;
    if (cont.trim() == 0) {
        reg_err++;
        $("#txt_cont_error").html('<span class="fa fa-exclamation text-danger"> Enter Faculty Contact</span>');
    } else if (!(/^\+(?:[0-9] ?){6,14}[0-9]$/.test(cont))) {
        reg_err++;
        $("#txt_cont_error").html('<span class="fa fa-exclamation text-danger"> yoy might be entering wrong contact no <p class="text-info" style="margin:2%">EX: +91 99*****999 for india</p></span>');
    } else {
        $("#txt_cont_error").html('');
    }

    var drp_gen = document.getElementById("drp_dwn_gen").value;
    if (drp_gen.length == 0) {
        reg_err++;
        $("#txt_gen_error").html("<span class='fa fa-exclamation text-danger'> Please specify gender <br> </span>");
    } else {
        $("#txt_gen_error").html("");
    }

    var email = document.getElementById("txt_email").value;

    if (email.trim() == 0) {
        reg_err++;
        $("#txt_email_error").html('<span class="fa fa-exclamation text-danger"> Enter Email ID</span>');
    } else if (!(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email))) {
        reg_err++;
        $("#txt_email_error").html('<span class="fa fa-exclamation text-danger"> Invalid Email ID</span>');
    } else {
        $.post('/check_mail/user', {
            'email': email,
            '_csrf': document.getElementById('_csrf').value
        }, function (data) {
            if (data['email_check'] == "exist") {
                reg_err++;
                $("#txt_email_error").html('<span class="fa fa-exclamation text-danger"> Seems Email adress already exist please recheck</span>');
            } else {
                $("#txt_email_error").html('');
            }
        });
    }

    var drp_state = document.getElementById("drp_dwn_state").value;
    if (drp_state.length == 0) {
        reg_err++;
        $("#txt_state_error").html("<span class='fa fa-exclamation text-danger'> Please select State <br> </span>");
    } else {
        $("#txt_state_error").html("");
    }

    var drp_city = document.getElementById("drp_dwn_citys").value;
    if (drp_city.length == 0) {
        reg_err++;
        $("#txt_city_error").html("<span class='fa fa-exclamation text-danger'> Please select ciity <br> </span>");
    } else {
        $("#txt_city_error").html("");
    }


    var pass = document.getElementById("txt_pass").value;
    if (pass.trim() == 0) {
        reg_err++;
        $("#txt_pass_error").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
    }
    else {
        if (pass.length > 5) {
            if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/.test(pass)) {
                $("#txt_pass_error").html('');
            }
            else {
                reg_err++;
                $("#txt_pass_error").html('<span class="fa fa-exclamation text-danger"> Password should contain <br><b>Capital Letter</b> <br><b>Small Letter</b><br><b>Number</b><br><b>Special character (!@#$%^&*)</b></span>');
            }
        }
        else {
            reg_err++;
            $("#txt_pass_error").html('<span class="fa fa-exclamation text-danger"> Password length too short atleast 5 character</span>');
        }
    }

    var confi_pass = document.getElementById("txt_confi_pass").value;
    if (confi_pass.trim() == 0) {
        reg_err++;
        $("#txt_confipass_error").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
    }
    else {
        if (confi_pass.length > 5) {
            if (document.getElementById("txt_pass").value == document.getElementById("txt_confi_pass").value) {
                if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/.test(confi_pass)) {
                    $("#txt_confipass_error").html('');
                }
                else {
                    reg_err++;
                    $("#txt_confipass_error").html('<span class="fa fa-exclamation text-danger"> Password should contain <br><b>Capital Letter</b> <br><b>Small Letter</b><br><b>Number</b><br><b>Special character (!@#$%^&*)</b></span>');
                }
            }
            else {
                reg_err++;
                $("#txt_confipass_error").html('<span class="fa fa-exclamation text-danger"> Password and Re-entered password do not match</span>');
            }

        }
        else {
            reg_err++;
            $("#txt_confipass_error").html('<span class="fa fa-exclamation text-danger"> Password length not match</span>');
        }

    }

    if (reg_err > 0) {
        $("#div_reg_form").show(700);
        $("#div_reg_form_loader").hide(700);
        reg_err = 0;
    }

    else {
        $.post('/reg_send_otp', {
            'email': document.getElementById('txt_email').value,
            'name': document.getElementById('txt_fname').value + ' ' + document.getElementById('txt_lname').value
        }, function (data) {
            if (data == "done") {
                $("#div_reg_form_loader").hide(700);
                $("#div_reg_otp_check").show(700);
            }
            else if (data == "failed") {
                $("#div_reg_form").show(700);
                $("#div_reg_form_loader").hide(700);

                swal({
                    title: "Opps!! Check your network first",
                    type: "warning",
                    confirmButtonColor: '#88098d',
                    confirmButtonText: 'OK',
                });
            }
            else {
                $("#div_reg_form").show(700);
                $("#div_reg_form_loader").hide(700);
                swal({
                    title: "Opps!! Something went wrong try again",
                    type: "warning",
                    confirmButtonColor: '#88098d',
                    confirmButtonText: 'OK',
                });
            }
        });
    }
});

function reg_user() {

    var fname = document.getElementById("txt_fname").value;
    var lname = document.getElementById("txt_lname").value;
    var uname = document.getElementById("txt_uname").value;
    var date = document.getElementById("datepicker").value;
    var drp_gen = document.getElementById("drp_dwn_gen").value;
    var cont = document.getElementById("txt_cont_no").value;
    var email = document.getElementById("txt_email").value;
    var drp_state = document.getElementById("drp_dwn_state").value;
    var drp_city = document.getElementById("drp_dwn_citys").value;
    var confi_pass = document.getElementById("txt_confi_pass").value;
    var pass = document.getElementById("txt_pass").value;

    // var image = $("#imageUpload")[0].files[0];

    var formdata = new FormData();

    $.each($('#imageUpload')[0].files, function (i, file) {
        formdata.append('file', file);
    });

    // formdata.append('image', image);
    formdata.append('txt_fname', fname);
    formdata.append('txt_lname', lname);
    formdata.append('txt_uname', uname);
    formdata.append('datepicker', date);
    formdata.append('drp_dwn_gen', drp_gen);
    formdata.append('txt_cont_no', cont);
    formdata.append('txt_email', email);
    formdata.append('drp_dwn_state', drp_state);
    formdata.append('drp_dwn_citys', drp_city);
    formdata.append('txt_pass', pass);
    formdata.append('txt_confi_pass', confi_pass);

    var contenttype = {
        headers: {
            "content-type": "multipart/form-data"
        }
    };

    axios.post('/register', formdata, contenttype)
        .then(function (response) {
            if (response.data == "done") {
                swal("Good job!", "You are successfully registered with Socio Touch \n Happy Socializing", "success");
                location.reload();
            }
            else {

                $("#div_reg_form").show(700);
                $("#div_reg_form_loader").hide(700);
                $("#div_reg_otp_check").hide(700);

                swal({
                    title: "Image file too large",
                    type: "warning",
                    confirmButtonColor: '#88098d',
                    confirmButtonText: 'OK',
                });
            }
        })
        .catch(function (error) {

            $("#div_reg_form").show(700);
            $("#div_reg_form_loader").hide(700);
            $("#div_reg_otp_check").hide(700);

            swal({
                title: "Opps!! Internal error 500",
                type: "warning",
                confirmButtonColor: '#88098d',
                confirmButtonText: 'OK',
            });
        });

}

$("#btn_forgot_password").click(function () {
    $("#div_login_box").hide(700);
    $("#forgot_pass_box").show(700);
    $("#lbl_tab_label").html("  &nbsp;PASSWORD");
    $("#txt_forgt_pass_email").focus();
});

$("#btn_frgt_pass_back").click(function () {
    $("#forgot_pass_box").hide(700);
    $("#div_login_box").show(700);
    $("#lbl_tab_label").html("  &nbsp;LOGIN");
});

$("#btn_frgt_pass_send_email").click(function () {

    $("#div_reset_password_send_otp").hide(700);
    $("#mail_sending_loader").show(700);


    var frgt_pass_email = document.getElementById("txt_forgt_pass_email").value;
    var err = 0;
    if (frgt_pass_email.trim() == 0) {
        err++;
        $("#err_txt_frgt_pass_email").html('<span class="fa fa-exclamation text-danger"> Enter Email ID</span>');
    } else if (!(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(frgt_pass_email))) {
        err++;
        $("#err_txt_frgt_pass_email").html('<span class="fa fa-exclamation text-danger"> Invalid Email ID</span>');
    } else {
        $.post('/check_mail/user', {
            'email': frgt_pass_email,
        }, function (data) {
            if (data['email_check'] == "exist") {
                $("#err_txt_frgt_pass_email").html('');
            } else {
                err++;
                $("#err_txt_frgt_pass_email").html('<span class="fa fa-exclamation text-danger"> Please enter registered Email </span>');
            }
        });

        if (err == 0) {
            $.post('/users/send_forgot_password_mail', {
                'email': frgt_pass_email
            }, function (data) {
                if (data == "done") {
                    $("#div_otp_check").show(700);
                    $("#div_reset_password_send_otp").hide(700);
                    $("#mail_sending_loader").hide(700);
                }
                if (data == "nw_prb") {
                    alert("network problem");
                }
                if (data == "error") {
                    alert("internal problem");
                }
            });
        }
        else {
            $("#div_reset_password_send_otp").show(700);
            $("#mail_sending_loader").hide(700);
            swal({
                title: "Opps!!! Something went Wrong",
                type: "warning",
                confirmButtonColor: '#636363',
                confirmButtonText: 'OK',
            });
        }
    }
});

$("#btn_check_otp").click(function () {

    $("#mail_sending_loader").show(700);
    $("#div_otp_check").hide(700);

    var otp = document.getElementById("txt_otp").value;
    var otp_err = 0;
    if (otp.length == 6) {
        $("#txt_city_error").html("");
    } else {
        otp_err++;
        $("#err_txt_otp").html("<span class='fa fa-exclamation text-danger'> Invalid OTP <br> </span>");
    }

    if (otp_err == 0) {
        $.post('/users/checkotp', {
            otp: otp
        }, function (data) {
            if (data == "done") {
                $("#mail_sending_loader").hide(700);
                $("#reset_password").show(700);
            }
            else {
                $("#mail_sending_loader").hide(700);
                $("#div_otp_check").show(700);
                $("#err_txt_otp").html("<span class='fa fa-exclamation text-danger'> Invalid OTP <br> </span>");
                swal({
                    title: "Opps!!! Something went Wrong",
                    type: "warning",
                    confirmButtonColor: '#636363',
                    confirmButtonText: 'OK',
                });
            }
        });
    }
    else {
        $("#mail_sending_loader").hide(700);
        $("#div_otp_check").show(700);
    }
});

$("#btn_change_pass").click(function () {
    var res_pass = document.getElementById("txt_frgt_new_pass").value;
    var updt_pass_err = 0;
    if (res_pass.trim() == 0) {
        updt_pass_err++;
        $("#err_txt_frgt_new_pass").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
    }
    else {
        if (res_pass.length > 5) {
            if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/.test(res_pass)) {
                $("#err_txt_frgt_new_pass").html('');
            }
            else {
                updt_pass_err++;
                $("#err_txt_frgt_new_pass").html('<span class="fa fa-exclamation text-danger"> Password should contain <br><b>Capital Letter</b> <br><b>Small Letter</b><br><b>Number</b><br><b>Special character (!@#$%^&*)</b></span>');
            }
        }
        else {
            updt_pass_err++;
            $("#txt_pass_error").html('<span class="fa fa-exclamation text-danger"> Password length too short atleast 5 character</span>');
        }
    }

    var res_confi_pass = document.getElementById("txt_confi_frgt_new_pass").value;
    if (res_confi_pass.trim() == 0) {
        updt_pass_err++;
        $("#err_txt_confi_frgt_new_pass").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
    }
    else {
        if (res_confi_pass.length > 5) {
            if (document.getElementById("txt_frgt_new_pass").value == document.getElementById("txt_confi_frgt_new_pass").value) {
                if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/.test(res_confi_pass)) {
                    $("#err_txt_confi_frgt_new_pass").html('');
                }
                else {
                    updt_pass_err++;
                    $("#err_txt_confi_frgt_new_pass").html('<span class="fa fa-exclamation text-danger"> Password should contain <br><b>Capital Letter</b> <br><b>Small Letter</b><br><b>Number</b><br><b>Special character (!@#$%^&*)</b></span>');
                }
            }
            else {
                updt_pass_err++;
                $("#err_txt_confi_frgt_new_pass").html('<span class="fa fa-exclamation text-danger"> Password and Re-entered password do not match</span>');
            }
        }
        else {
            updt_pass_err++;
            $("#err_txt_confi_frgt_new_pass").html('<span class="fa fa-exclamation text-danger"> Password length not match</span>');
        }
    }

    if (updt_pass_err == 0) {
        var frgt_pass_email = document.getElementById("txt_forgt_pass_email").value;
        $.post('/users/update_password', {
                'updt_pass': res_confi_pass,
                'email': frgt_pass_email
            }, function (data) {
                if (data == "done") {
                    swal("Good job!", "password Updated Successfully", "success");
                    location.reload();
                }
                else {
                    swal({
                        title: "Opps!!! Something went Wrong",
                        type: "warning",
                        confirmButtonColor: '#636363',
                        confirmButtonText: 'OK',
                    });
                }
            }
        )
        ;
    }
});

$("#user").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#btn_next").click();
    }
});
$("#pass").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#login").click();
    }
});