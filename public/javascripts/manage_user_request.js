$(document).ready(function () {
    $(document).on('click', '.add_friend', function () {
        var frnd_id = $(this).attr('id');
        $.post('/users/add_friend', {
            'frnd_id': frnd_id
        }, function (data) {
            if (data == "sent") {
                window.location.reload();
            }
            else if (data == "requested") {
                swal("Request already sent!", "do you want to cancel");
            }
        });
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

    $(document).on('click', '.cancel_req', function () {
        var cancel_req_id = $(this).attr('id');
        $.post('/users/cancel_req', {
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

    $(document).on('click', '.unfriend', function (data) {
        var unfrnd_id = $(this).attr('id');
        $.post('/users/unfriend_user', {
            unfrnd_id: unfrnd_id
        }, function (data) {
            if (data == "unfriended") {
                location.reload();
            }
            else {
                alert("inter unfirend error");
            }
        });
    });
});
