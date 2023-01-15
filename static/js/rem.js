let isMob = false;

function onRem() {
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    let iw = (iOS) ? screen.width : window.innerWidth, ih = (iOS) ? screen.height : window.innerHeight;

    let container_width = 1820; //кол-во пикселей, меньше которого включается резиновость
    switch (true) {
        case (iw > container_width):
            document.documentElement.style.fontSize = '1px'
            break
        case (iw > 650):
            document.documentElement.style.fontSize = iw / container_width + 'px'
            break
        case (iw < 650):
            isMob = true;
            document.documentElement.style.fontSize = iw / 428 + 'px'
            break
    }
}

window.addEventListener('resize', onRem)

onRem()
