$("#btn_save_profile").hide();

$("#profileImage").click(function (e) {
    $("#imageUpload").click();
});

function fasterPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#profileImage').attr('src',
            window.URL.createObjectURL(uploader.files[0]));
    }
}

$("#imageUpload").change(function () {
    fasterPreview(this);
});

$("#imageUpload").change(function () {
    $("#btn_save_profile").fadeIn(700);
});

$(document).on("click","#btn_save_profile",function () {
    alert("clicked save changes");
});