$(document).ready(function () {
    $('#btn_save_info').click(function () {
        $.post('/users/update_info',{
            'txt_watch':document.getElementById("txt_watch").value,
            'txt_fav_food':document.getElementById("txt_fav_food").value,
            'txt_place':document.getElementById("txt_place").value,
            'txt_read':document.getElementById("txt_read").value
        },function (data) {
            if(data == "success")
            {
                swal("Good job!", "user info updated", "success");
            }
            else
            {
                swal({
                    title: "Opps!!! Something went Wrong",
                    type: "warning",
                    confirmButtonColor: '#636363',
                    confirmButtonText: 'OK',
                });
            }
        })
    });
});