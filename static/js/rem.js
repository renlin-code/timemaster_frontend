function onRem () {
  let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  let iw = (iOS) ? screen.width : window.innerWidth, ih = (iOS) ? screen.height : window.innerHeight;

  let mobile_width = 428; //Ширина мобильного фрейма в фигме

  document.documentElement.style.fontSize = iw / mobile_width + 'px'
}

window.addEventListener('resize', onRem)

onRem()
