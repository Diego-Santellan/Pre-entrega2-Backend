document.querySelectorAll(".image-container img").forEach(el=>{
    el.addEventListener("click", function(ev){
        ev.stopPropagation();   //previene/Evita la propagcion de los eventos  de js
        this.parentNode.classList.add("active");
    })
});


document.querySelectorAll(".image-container").forEach(el=>{
    el.addEventListener("click", function(ev){
        this.classList.remove("active");

    })
});