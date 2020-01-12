$("#profileImage").click(function(e) {
    $("#imageUpload").click();
});

function fasterPreview( uploader ) {
    if ( uploader.files && uploader.files[0] ){
        $('#profileImage').attr('src',
            window.URL.createObjectURL(uploader.files[0]) );
    }
}

$("#imageUpload").change(function(){
    fasterPreview( this );
});

$("#profile-container").mouseover(function(){
    $("#info").show(200);
});
$("#profile-container").mouseout(function(){
    $("#info").hide(200);
});