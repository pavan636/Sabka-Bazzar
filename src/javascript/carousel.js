function slide(slider,items) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      translate=0,
      slides = items.getElementsByClassName('slider_img'),
      slidesLength = slides.length,
      index = 0,
      allowShift = true;
  const MaxCarouselSlides = 5;
   // Mouse and Touch events
  //items.onmousedown = dragStart;
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    console.log("posinitial ",posInitial)
    if (posFinal - posInitial < -threshold) {
      alert('dfghjk')
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      shiftSlide(1,'drag');
    }
    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    //items.classList.add('shifting');
    checkIndex();
    //debugger;
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }
      if (dir == 1) {
        translate-=100
        if(index==slidesLength-1){
          slider.style.transition='0s';
          items.style.transform = "translateX(0px)";
          
        }
        else{
          slider.style.transition='0.7s';
          items.style.transform = "translateX("+translate+"%)";
        }
        index++;
        setIndicator();
      } else if (dir == -1) {
        translate=translate+100 
        if(index==0){
          slider.style.transition='0s';
          items.style.transform = "translateX(-400%)";
        }
        else{
          slider.style.transition='0.7s';
          items.style.transform = "translateX("+translate+"%)";
        }
        index--;
        setIndicator();
      }
    };
    
    allowShift = false;
  }
  
  function checkIndex (){
    if (index < 0) {
      index = slidesLength - 1;
      translate=-400
    }
    if (index == slidesLength) {
      index = 0;
      translate=0;
    }
    
    allowShift = true;
  }

  //sets current active indicator
  function setIndicator(){
    const indicator=document.getElementsByClassName('sb-carousel__indicator_span');
    for(let i=0;i<indicator.length;i++){
      indicator[i].classList.remove('active');
    }
    index>MaxCarouselSlides-1?indicator[0].classList.add('active'):index;
    index<0?indicator[MaxCarouselSlides-1].classList.add('active'):index;
    index<MaxCarouselSlides&&index>-1?indicator[index].classList.add('active'):index;
  }

  function slideDot(){
    var slide = document.getElementById("slider");
        var slide = document.getElementById("slider");
        var btn1 = document.getElementById('sb-carousel__btn1');
        var btn2 = document.getElementById('sb-carousel__btn2');
        var btn3 = document.getElementById('sb-carousel__btn3');
        var btn4 = document.getElementById('sb-carousel__btn4');
        var btn5 = document.getElementById('sb-carousel__btn5');

        btn1.onclick = function () {
            slide.style.transform = "translateX(0px)";
            btn1.classList.add('active');
            btn2.classList.remove('active');
            btn3.classList.remove('active');
            btn4.classList.remove('active');
            btn5.classList.remove('active');
            index=0
            translate=0;
        };
        btn2.onclick = function () {
            slide.style.transform = "translateX(-100%)";
            btn1.classList.remove('active');
            btn2.classList.add('active');
            btn3.classList.remove('active');
            btn4.classList.remove('active');
            btn5.classList.remove('active');
            index=1
            translate=-100;
        };
        btn3.onclick = function () {
            slide.style.transform = "translateX(-200%)";
            btn1.classList.remove('active');
            btn2.classList.remove('active');
            btn3.classList.add('active');
            btn4.classList.remove('active');
            btn5.classList.remove('active');
            index=2;
            translate=-200;
        };
        btn4.onclick = function () {
            slide.style.transform = "translateX(-300%)";
            btn1.classList.remove('active');
            btn2.classList.remove('active');
            btn3.classList.remove('active');
            btn4.classList.add('active');
            btn5.classList.remove('active');
            index=3;
            translate=-300;
        };
        btn5.onclick = function () {
            slide.style.transform = "translateX(-400%)";
            btn1.classList.remove('active');
            btn2.classList.remove('active');
            btn3.classList.remove('active');
            btn4.classList.remove('active');
            btn5.classList.add('active');
            index=4;
            translate=-400;
        };
  }
  return {
      shiftSlide,
      dragAction,
      dragEnd,
      dragStart,
      checkIndex,
      slideDot
  }
}

export default slide;