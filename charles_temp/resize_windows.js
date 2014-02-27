    // position the window on the screen
    
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    // alert(x);
    
    var winHeight = win.offsetHeight;
    var winWidth = win.offsetWidth;

    var top = (y / 2) - winHeight;
    var left = (x / 2) - winWidth;
    
    alert( y + "x" + x + " - " + top + "x" + left);
    alert( winHeight + 'x' + winWidth );

    win.style.left = left + 'px';
    win.style.top = top + 'px'; 
    
