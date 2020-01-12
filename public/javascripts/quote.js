$(document).ready(function () {
    $.ajax({
        url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", success: function (result) {
            $("#new_quote").html(result[0]['content']);
            $("#quote_by").html(": " +result[0]['title']);
        }
    });
});