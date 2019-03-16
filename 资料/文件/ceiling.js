define(function() {
    var navarr = {};

    navarr.ceiling = function(opts) {
        var els = document.querySelector(opts.el),
            top = els.offsetTop;

        window.addEventListener("scroll", function() {
            var tops = document.documentElement.scrollTop || document.body.scrollTop;
            if (tops > top) {
                els.classList.add(opts.cname);
            } else {
                els.classList.remove(opts.cname);
            }
        })
    }
    return navarr;
})