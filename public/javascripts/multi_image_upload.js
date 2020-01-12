$box_count = 0;
$ext_err = 0;
$("#post_media").hide();
$("#ico_multi_tag").hide();
$("#ico_multi_location").hide();
$("#txt_post_media_caption").hide();
$("#select_media").click(function (e) {
    $("#photos").click();
});

$("body").on("click", "#btn_remove_image", function () {
    if (!($box_count == 0)) {
        $(this).closest(".con").remove();
        $box_count = $box_count - 1;
        $("#select_media").show(700);
    }
    if ($box_count == 0) {
        $("#post_media").hide(700);
        $("#txt_post_media_caption").hide(700);
        $("#ico_multi_tag").hide(700);
        $("#ico_multi_location").hide(700);

    }
});


(function () {
    // Display the images to be uploaded.
    var multiPhotoDisplay;

    $('#photos').on('change', function (e) {
        return multiPhotoDisplay(this);
    });

    this.readURL = function (input) {
        var reader;

        // Read the contents of the image file to be uploaded and display it.

        if (input.files && input.files[0]) {
            reader = new FileReader();
            reader.onload = function (e) {
                var $preview;
                $('.image_to_upload').attr('src', e.target.result);
                $preview = $('.preview');
                if ($preview.hasClass('hide')) {
                    return $preview.toggleClass('hide');
                }
            };
            return reader.readAsDataURL(input.files[0]);
        }
    };

    multiPhotoDisplay = function (input) {
        var file, i, len, reader, ref;
        // Read the contents of the image file to be uploaded and display it.
        var img_count = 0;
        $('.post_uploaded_image').each(function () {
            img_count++;
        });
        if (!(img_count < 9)) {
            $("#select_media").hide(700);
        }
        if (img_count < 10) {
            if (input.files && input.files[0]) {
                ref = input.files;
                if ((ref.length + img_count) > 10) {
                    if ((ref.length + img_count) == 10) {
                        $("#select_media").hide(700);
                    }
                    swal({
                        title: "Maximum 10 files only!!!",
                        type: "warning",
                        confirmButtonColor: '#88098d',
                        confirmButtonText: 'OK',
                    });
                }
                else {
                    if ((ref.length + img_count) == 10) {
                        $("#select_media").hide(700);
                    }
                    for (i = 0, len = ref.length; i < len; i++) {
                        file = ref[i];
                        var file_ext = file['name'];
                        var ext = file_ext.split('.').pop();
                        if (!(ext == "png" || ext == "jpg" || ext == "jpeg" | ext == "svg" || ext == "gif" || ext == "mp4" || ext == "avi" || ext == "mov")) {
                            $ext_err++;
                        }
                        else {
                            $ext_err = 0;
                        }
                        if ($ext_err == 0) {
                            $box_count++;
                            reader = new FileReader();
                            reader.onload = function (e) {
                                var image_html;
                                image_html = `<div class="col-sm-2 con bg_col_blue" style="margin: 1%;"><img width="80" height="70" class="post_uploaded_image" src="${e.target.result}"  style="border: #8c98ab solid 5px;border-radius: 20px"/><em class="fa fa-close text-danger" style="cursor: pointer" id="btn_remove_image"></em></div>`;
                                $('#photos_clearing').append(image_html);
                                if ($('.pics-label.hide').length !== 0) {
                                    $('.pics-label').toggle('hide').removeClass('hide');
                                }
                                return $(document).foundation('reflow');
                            };
                            reader.readAsDataURL(file);
                            $("#post_media").show(700);
                            $("#txt_post_media_caption").show(700);
                            $("#ico_multi_tag").show(700);
                            $("#ico_multi_location").show(700);

                        }
                        else {
                            swal({
                                title: "File not allowed with extension ." + ext,
                                type: "warning",
                                confirmButtonColor: '#88098d',
                                confirmButtonText: 'OK',
                            });
                        }

                    }
                    if ($ext_err == 0) {
                        window.post_files = input.files;
                        if (window.post_files !== void 0) {
                            return input.files = $.merge(window.post_files, input.files);
                        }
                    }

                }
            } else {
                swal({
                    title: "No files selected",
                    type: "warning",
                    confirmButtonColor: '#88098d',
                    confirmButtonText: 'OK',
                });
            }
        }
        else {
            swal({
                title: "Maximum 10 files only!!!",
                type: "warning",
                confirmButtonColor: '#88098d',
                confirmButtonText: 'OK',
            });
            $("#select_media").hide(700);
        }

    };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQTtBQUFBLE1BQUE7O0VBQ0EsQ0FBQSxDQUFFLFNBQUYsQ0FBWSxDQUFDLEVBQWIsQ0FBZ0IsUUFBaEIsRUFBMEIsUUFBQSxDQUFDLENBQUQsQ0FBQTtXQUN4QixpQkFBQSxDQUFrQixJQUFsQjtFQUR3QixDQUExQjs7RUFHQSxJQUFDLENBQUEsT0FBRCxHQUFXLFFBQUEsQ0FBQyxLQUFELENBQUE7QUFJVCxRQUFBLE1BQUE7Ozs7SUFBQSxJQUFJLEtBQUssQ0FBQyxLQUFOLElBQWUsS0FBSyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQS9CO01BQ0UsTUFBQSxHQUFTLElBQUksVUFBSixDQUFBO01BRVQsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsUUFBQSxDQUFDLENBQUQsQ0FBQTtBQUNkLFlBQUE7UUFBQSxDQUFBLENBQUUsa0JBQUYsQ0FBcUIsQ0FBQyxJQUF0QixDQUEyQixLQUEzQixFQUFrQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQTNDO1FBQ0EsUUFBQSxHQUFXLENBQUEsQ0FBRSxVQUFGO1FBQ1gsSUFBRyxRQUFRLENBQUMsUUFBVCxDQUFrQixNQUFsQixDQUFIO2lCQUNFLFFBQVEsQ0FBQyxXQUFULENBQXFCLE1BQXJCLEVBREY7O01BSGM7YUFNaEIsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsS0FBSyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQWpDLEVBVEY7O0VBSlM7O0VBZVgsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUlsQixRQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxHQUFBOzs7O0lBQUEsSUFBSSxLQUFLLENBQUMsS0FBTixJQUFlLEtBQUssQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUEvQjtBQUNFO01BQUEsS0FBQSxxQ0FBQTs7UUFDRSxNQUFBLEdBQVMsSUFBSSxVQUFKLENBQUE7UUFFVCxNQUFNLENBQUMsTUFBUCxHQUFnQixRQUFBLENBQUMsQ0FBRCxDQUFBO0FBQ2QsY0FBQTtVQUFBLFVBQUEsR0FBYSxDQUFBLHdCQUFBLENBQUEsQ0FBNkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUF0QyxDQUE2Qyx1QkFBN0MsQ0FBQSxDQUFzRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQS9FLENBQXNGLFdBQXRGO1VBRWIsQ0FBQSxDQUFFLGtCQUFGLENBQXFCLENBQUMsTUFBdEIsQ0FBNkIsVUFBN0I7VUFFQSxJQUFHLENBQUEsQ0FBRSxrQkFBRixDQUFxQixDQUFDLE1BQXRCLEtBQWdDLENBQW5DO1lBQ0UsQ0FBQSxDQUFFLGFBQUYsQ0FBZ0IsQ0FBQyxNQUFqQixDQUF3QixNQUF4QixDQUErQixDQUFDLFdBQWhDLENBQTRDLE1BQTVDLEVBREY7O2lCQUdBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxVQUFaLENBQXVCLFFBQXZCO1FBUmM7UUFVaEIsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsSUFBckI7TUFiRjtNQWVBLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLEtBQUssQ0FBQztNQUMxQixJQUFHLE1BQU0sQ0FBQyxVQUFQLEtBQXFCLE1BQXhCO2VBQ0UsS0FBSyxDQUFDLEtBQU4sR0FBYyxDQUFDLENBQUMsS0FBRixDQUFRLE1BQU0sQ0FBQyxVQUFmLEVBQTJCLEtBQUssQ0FBQyxLQUFqQyxFQURoQjtPQWpCRjs7RUFKa0I7QUFuQnBCIiwic291cmNlc0NvbnRlbnQiOlsiIyBEaXNwbGF5IHRoZSBpbWFnZXMgdG8gYmUgdXBsb2FkZWQuXG4kKCcjcGhvdG9zJykub24gJ2NoYW5nZScsIChlKSAtPlxuICBtdWx0aVBob3RvRGlzcGxheSh0aGlzKTtcblxuQHJlYWRVUkwgPSAoaW5wdXQpIC0+XG4gICNcbiAgIyBSZWFkIHRoZSBjb250ZW50cyBvZiB0aGUgaW1hZ2UgZmlsZSB0byBiZSB1cGxvYWRlZCBhbmQgZGlzcGxheSBpdC5cbiAgI1xuICBpZiAoaW5wdXQuZmlsZXMgJiYgaW5wdXQuZmlsZXNbMF0pXG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuXG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSAtPlxuICAgICAgJCgnLmltYWdlX3RvX3VwbG9hZCcpLmF0dHIoJ3NyYycsIGUudGFyZ2V0LnJlc3VsdClcbiAgICAgICRwcmV2aWV3ID0gJCgnLnByZXZpZXcnKVxuICAgICAgaWYgJHByZXZpZXcuaGFzQ2xhc3MoJ2hpZGUnKVxuICAgICAgICAkcHJldmlldy50b2dnbGVDbGFzcygnaGlkZScpO1xuXG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoaW5wdXQuZmlsZXNbMF0pO1xuICAgIFxubXVsdGlQaG90b0Rpc3BsYXkgPSAoaW5wdXQpIC0+XG4gICNcbiAgIyBSZWFkIHRoZSBjb250ZW50cyBvZiB0aGUgaW1hZ2UgZmlsZSB0byBiZSB1cGxvYWRlZCBhbmQgZGlzcGxheSBpdC5cbiAgI1xuICBpZiAoaW5wdXQuZmlsZXMgJiYgaW5wdXQuZmlsZXNbMF0pXG4gICAgZm9yIGZpbGUgaW4gaW5wdXQuZmlsZXNcbiAgICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcblxuICAgICAgcmVhZGVyLm9ubG9hZCA9IChlKSAtPlxuICAgICAgICBpbWFnZV9odG1sID0gXCJcIlwiPGxpPjxhIGNsYXNzPVwidGhcIiBocmVmPVwiI3tlLnRhcmdldC5yZXN1bHR9XCI+PGltZyB3aWR0aD1cIjc1XCIgc3JjPVwiI3tlLnRhcmdldC5yZXN1bHR9XCI+PC9hPjwvbGk+XCJcIlwiXG5cbiAgICAgICAgJCgnI3Bob3Rvc19jbGVhcmluZycpLmFwcGVuZChpbWFnZV9odG1sKVxuXG4gICAgICAgIGlmICQoJy5waWNzLWxhYmVsLmhpZGUnKS5sZW5ndGggIT0gMFxuICAgICAgICAgICQoJy5waWNzLWxhYmVsJykudG9nZ2xlKCdoaWRlJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKVxuXG4gICAgICAgICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oJ3JlZmxvdycpXG5cbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpXG5cbiAgICB3aW5kb3cucG9zdF9maWxlcyA9IGlucHV0LmZpbGVzXG4gICAgaWYgd2luZG93LnBvc3RfZmlsZXMgIT0gdW5kZWZpbmVkXG4gICAgICBpbnB1dC5maWxlcyA9ICQubWVyZ2Uod2luZG93LnBvc3RfZmlsZXMsIGlucHV0LmZpbGVzKSJdfQ==
//# sourceURL=coffeescript