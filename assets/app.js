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

var canvas = document.getElementById('image');
var ctx = canvas.getContext('2d');
var img = new Image();

jQuery(function(){
    //if the file was selected, send a request to the server
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
                success: function(imgPath)
                {
                    $("#imgIcon").remove();
                    img.src = imgPath;
                    img.onload = function() {
                        //set the canvas size to the image size
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img,0,0);
                    }
                    
                },
                error: function(){
                    $("#resolutionError").addClass("show-msg");
                    $("#resolutionError").removeClass("hide-msg");
                }
                
            })     
    })
})

$("#hideMsgBtn").on("click",function(){
    $("#resolutionError").addClass("hide-msg");
    $("#resolutionError").removeClass("show-msg");
})


var filtersNames = ['contrast','sepia','grayscale','blur','brightness'];
var filtersValues = [1,0,0,0,1];


function setFilters()
{
    var filters="";
    for(var i=0; i<filtersValues.length; i++)
        filters+=filtersNames[i]+"("+filtersValues[i]+")"+" ";

    ctx.filter = filters; //apply filters to canvas
    ctx.drawImage(img,0,0); //draw an image on canvas with filters
}


$('input[type=range]').on('input', function () {
    
    var x = (element)=>element==this.id;
    if(this.id=="blur")
        filtersValues[filtersNames.findIndex(x)] = this.value+"px";
    else
        filtersValues[filtersNames.findIndex(x)] = this.value;
    setFilters();

});