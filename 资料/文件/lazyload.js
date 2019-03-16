 define(function() {
     function Lazyload(options) {
         this.opts = options;
         this.els = [...document.querySelectorAll(this.opts.el)];
         this.load();
     }
     Lazyload.prototype.load = function() {
         var that = this;
         var winHei = window.outerHeight;
         this.els.forEach(function(item) {
             var elTop = item.getBoundingClientRect();
             if (elTop.top < winHei) {
                 (function(el) {
                     setTimeout(function() {
                         var getSrc = el.getAttribute(that.opts.attr);
                         el.src = getSrc;
                     }, 1000)
                 })(item)
             }
         })
     }
     return Lazyload;
 })