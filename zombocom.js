module.exports = {
    title: "Zombocom", 
    summary: "Browserpage test",
    author: "GiovanH",
    modVersion: 0.1,

    browserPages: {
        'ZOMBO': {
            component: {
                title: () => "ZOMBOCOM",
                theme(ctx){
                    return 'retro'
                },
                methods: {
                    buttonclick() {
                        const button = this.$refs.button
                        const icon = this.$refs.icon
                        const audio = this.$refs.audio
                        if (audio.paused) {
                            audio.volume = 0.2;
                            audio.play();
                            icon.classList.remove('fa-volume-up');
                            icon.classList.add('fa-volume-off');
                            
                         } else {
                            audio.pause();
                            icon.classList.remove('fa-volume-off');
                            icon.classList.add('fa-volume-up');
                        }
                        button.classList.add("fade");

                    }
                },
                template: `
<div>
<div align="center">
  <p><br /></p>
  <p><img src="https://www.zombo.com/images/zombocom.png" width="1199" height="217" alt="Zombocom" longdesc="http://zombo.com" /></p>
</div>
<div align="center">
   <div class="animate-flicker">
  <p><img src="https://www.zombo.com/images/pngwheel.png" class="rotate thefade"  /></p>
</div>
</div>
<audio ref='audio' loop autoplay src="https://www.zombo.com/zombo_words.mp3" type="audio/mpeg"></audio>
<!-- <button ref='button' id="button" @click="buttonclick">
  <i ref='icon' class="fa fa-volume-up"></i>
</button> -->
</div>`,
                scss: `
/* ~~ miscellaneous float/clear classes ~~ */
/* added to make rotate */
@keyframes rotation {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
/* ~~josh add ~~ */
@keyframes flickerAnimation {
    0% {opacity: 1;}
    50% {opacity: .1;}
    100% {opacity: 1;}
}
/* ~~josh add audio button stuff~~ */
/* ~~Z add responsive stuff~~ */
/* Media Queries: Tabled Portrait */
/* ~~Z add keep wheel in place stuff~~ */
& {
    font: 100%/1.4 Verdana, Arial, Helvetica, sans-serif;
    background-color: #FFFFFF;
    margin: 0;
    padding: 0;
    color: #333;
    background-image: url(https://www.zombo.com/images/zombo_bg.png);
    background-repeat: repeat-x;
}
ul {
    padding: 0;
    margin: 0;
}
ol {
    padding: 0;
    margin: 0;
}
dl {
    padding: 0;
    margin: 0;
}
h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    padding-right: 15px;
    padding-left: 15px;
}
p {
    margin-top: 0;
    padding-right: 15px;
    padding-left: 15px;
}
a {
    img {
        border: none;
    }
    &:link {
        color: #42413C;
        text-decoration: underline;
    }
    &:visited {
        color: #6E6C64;
        text-decoration: underline;
    }
    &:hover {
        text-decoration: none;
    }
    &:active {
        text-decoration: none;
    }
    &:focus {
        text-decoration: none;
    }
}
.container {
    width: 960px;
    background-color: #FFF;
    margin: 0 auto;
}
.content {
    padding: 10px 0;
}
.fltrt {
    float: right;
    margin-left: 8px;
}
.fltlft {
    float: left;
    margin-right: 8px;
}
.clearfloat {
    clear: both;
    height: 0;
    font-size: 1px;
    line-height: 0px;
}
.rotate {
    animation: rotation .5s infinite linear;
}
.animate-flicker {
    animation: flickerAnimation .3s infinite;
    margin-top: 13%;
}
audio {
    display: none;
}
button {
    font-size: 22px;
    color: #eee;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    padding: 5px;
    border: none;
    border-radius: 2px;
    outline: none;
    background: black;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    opacity: 0.8;
    cursor: pointer;
    transition: all 0.4s ease-out;
}
button.fade {
    &:hover {
        opacity: 0.8;
    }
}
.fade {
    opacity: 0.2;
    top: 0;
    left: 0;
    transform: translate(0, 0);
}
img {
    max-width: 100%;
    height: auto;
}
@media screen and (max-width: 1060px) {
    #primary {
        width: 67%;
    }
    #secondary {
        width: 30%;
        margin-left: 3%;
    }
}
@media screen and (max-width: 768px) {
    #primary {
        width: 80%;
    }
    #secondary {
        width: 80%;
        margin: 0;
        border: none;
    }
}
`
            },
        }   
    }
}
