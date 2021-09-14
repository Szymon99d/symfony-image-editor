/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';


jQuery(function(){
    $("#imageField").on("change",function(){
        var uploadForm = $("#imgUploadForm");
        var formData = new FormData(uploadForm[0]);
            $.ajax({
                url: "/",
                method: "post",
                data: formData,
                processData: false,
                contentType: false,
                async: true,
                success: function(location)
                {
                    $("#imgIcon").remove();
                    $("#img").attr("src",location);
                },
                error: function(){
                    $("#resolutionError").addClass("show-msg");
                    $("#resolutionError").removeClass("hide-msg");
                    console.log("Img resolution is too high")
                }
                
            })     
    })
})

$("#hideMsgBtn").on("click",function(){
    $("#resolutionError").addClass("hide-msg");
    $("#resolutionError").removeClass("show-msg");
})


