function deviceResize(){
    let width = document.documentElement.clientWidth || window.innerWidth;
    width = width > 750 ? 750 : width;
    width = width < 320 ? 320 : width;
    document.documentElement.style.fontSize = ( width / 7.5 ) + 'px';
    document.querySelector('body').style.fontSize = '0.4' + 'rem';
}
deviceResize();
window.addEventListener('resize', () => {
    deviceResize();
})