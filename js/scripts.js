window.addEvent('load', function() {
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

var meow = new Audio("meow.mp3");

var vig = $('#vig');
var vintage = $('#vintagebtn');
var noise = $('#noisebtn');
var tiltshift = $('#tiltshiftbtn');
var exporter = $('#exportbtn');
var reset = $('#resetbtn');
var brightup = $('#brightupbtn');
var brightdwn = $('#brightdwnbtn');
var greyscale = $('#greyscalebtn');
var invert = $('#invertbtn');
var sepia = $('#sepiabtn');
var pinhole = $('#pinholebtn');

$('input[type=range]').change(applyFilters);
    
reset.on('click', function(e) {
  Caman('#myCanvas',function() {
        this.revert();
        this.render();
  });
});
    
vintage.on('click', function(e) {
  Caman('#myCanvas',function() {
    this.vintage();
    this.render();
  });
});

pinhole.on('click', function(e) {
  Caman('#myCanvas',function() {
    this.pinhole();
    this.render();
  });
});

sepia.on('click', function(e) {
  Caman('#myCanvas',function() {
    this.sepia(40);
    this.render();
  });
});

    
invert.on('click', function(e) {
  Caman('#myCanvas',function() {
    this.invert();
    this.render();
  });
});
    
greyscale.on('click', function(e) {
  Caman('#myCanvas',function() {
    this.greyscale().render();
  });
});
    
    noise.on('click', function(e) {
  Caman('#myCanvas',function() {
    this.noise(10);
    this.render();
  });
});

tiltshift.on('click', function(e) {
  Caman('#myCanvas',function() {
    this.tiltShift({
      angle: 90,
      focusWidth: 600
    }).render();
  });
});
    
vig.on('click', function(e){
Caman("#myCanvas",function(){
this
    .vignette(300, 60)
    .render();
});
});
    
brightup.on('click', function(e){
Caman("#myCanvas",function(){
this.brightness(5).render();
});
});

brightdwn.on('click', function(e){
Caman("#myCanvas",function(){
this.brightness(-5).render();
});
});
    
function applyFilters() {
  var hue = parseInt($('#hue').val());
  var cntrst = parseInt($('#contrast').val());
     var bright = parseInt($('#brightness').val());
    var expose = parseInt($('#exposure').val());
    var saturn = parseInt($('#saturation').val());
    Caman('#myCanvas', function() {
      this.revert(false);
      this.hue(hue);
        this.brightness(bright);
        this.saturation(saturn);
        this.exposure(expose);
      this.contrast(cntrst);
      this.render();
    });
}
    
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}
document.getElementById('download').addEventListener('click', function() {
    
    meow.play();
    downloadCanvas(this, 'myCanvas', 'superkawaii.png');
    window.location.reload();
    
}, false);

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            c.width = img.width;
            c.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]); 
   document.getElementById('imageLoader').style.visibility = 'hidden';
   document.getElementById('sidebar-wrapper').style.visibility = 'visible';
}

});
