document.addEventListener("DOMContentLoaded",function(){var e,t,i,d,a,n,o=null,r=0;function c(e,t,d){o=t,i=document.querySelectorAll('[data-lightbox-id="'+e+'"] .dLightbox_slider ul > li').length;var a=document.querySelector('.dLightbox_canvas[data-lightbox-id="'+e+'"]'),n=a.querySelector(".dLightbox_slider ul");if(n){var r=-(100*o);n.style.transform="translateX("+r+"%)";var c=document.querySelectorAll('[data-lightbox-id="'+e+'"] > figure');if(t<c.length){var l=c[t].querySelector("figcaption"),s=l?l.textContent:"",v=c[t].querySelector("img"),u=v?v.getAttribute("alt"):"";a.querySelector(".dL_count").innerHTML=t+1+"/"+i,a.querySelector(".dL_title").innerHTML=s||u}}}function l(e,t){var d;document.querySelector('.dLightbox_canvas.active[data-lightbox-id="'+e+'"]'),"prev"===t?d=o-1<0?i-1:o-1:"next"===t&&(d=(o+1)%i),c(e,d)}function s(e){var t=document.querySelector('.dLightbox_canvas.active[data-lightbox-id="'+e+'"]');t&&(t.classList.remove("active"),document.body.classList.remove("dL_noscroll"))}document.querySelectorAll(".dhn-lightbox").forEach(function(i,v){var u="dLightbox_"+v;i.setAttribute("data-lightbox-id",u),i.querySelector("a")&&i.addEventListener("click",function(v){v.preventDefault();var h,L,g,b,x,f=document.querySelector('.dLightbox_canvas[data-lightbox-id="'+u+'"]');f||(e=(f=(h=u,L=document.createElement("div"),L.classList.add("dLightbox_canvas","active"),L.setAttribute("data-lightbox-id",h),L.innerHTML='<div><div class="dL_count"></div><div class="dL_title"></div><div class="dL_close">&#x2715;</div></div><div><div class="dL_prev">&#8249;</div><div class="dLightbox_slider"><ul></ul></div><div class="dL_next">&#8250;</div></div>',document.body.appendChild(L),document.querySelectorAll('[data-lightbox-id="'+h+'"] > figure > a').forEach(function(e){var t=e.getAttribute("href"),i=document.createElement("li");i.innerHTML='<img src="'+t+'">',L.querySelector(".dLightbox_slider ul").appendChild(i)}),L)).querySelector(".dLightbox_slider"),t=document.querySelector('.dLightbox_canvas[data-lightbox-id="'+u+'"]'),g=u,b=document.querySelector('.dLightbox_canvas.active[data-lightbox-id="'+g+'"]'),x=document.querySelector('.dLightbox_canvas.active[data-lightbox-id="'+g+'"] .dLightbox_slider'),b.addEventListener("click",function(e){let t=e.target.classList;t.contains("dL_prev")?l(g,"prev"):t.contains("dL_next")?l(g,"next"):(t.contains("dL_close")||t.contains("dLightbox_canvas"))&&s(g)}),x.addEventListener("touchstart",function(e){d=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY}),x.addEventListener("touchmove",function(e){Math.abs(e.changedTouches[0].clientX-d)>Math.abs(e.changedTouches[0].clientY-a)&&e.preventDefault()}),x.addEventListener("touchend",function(e){let t=e.changedTouches[0].clientX-d;Math.abs(t)>50&&l(g,t>0?"prev":"next")}),document.body.addEventListener("keydown",function(e){document.querySelector('.dLightbox_canvas.active[data-lightbox-id="'+g+'"]')&&(27===e.keyCode?s(g):(37===e.keyCode||39===e.keyCode)&&l(g,37===e.keyCode?"prev":"next"))}),x.addEventListener("wheel",function(e){e.preventDefault(),l(g,e.deltaY>0?"next":"prev")}),x.addEventListener("mousedown",function(e){n=e.clientX,r=0}),x.addEventListener("mousemove",function(e){r=e.clientX-n}),x.addEventListener("mouseup",function(e){Math.abs(r)>50?l(g,r>0?"prev":"next"):c(g,o)})),document.body.classList.add("dL_noscroll"),f.classList.add("active");var y=v.target.closest("a");if(y){var q=Array.from(i.querySelectorAll("a")).indexOf(y),S=q>o?"next":"prev";c(u,q,S)}})})});