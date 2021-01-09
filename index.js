const btn_bar = document.querySelector('.btn-bar');
const link_container = document.querySelector('.links-container');
const links = document.querySelector('.links');
const nav = document.getElementById('nav');
const top_link = document.querySelector('.top-link');
const scroll_links = document.querySelectorAll('.scroll-link');
const sections = [...document.querySelectorAll('section')];
btn_bar.addEventListener('click',()=>{
    let height=links.getBoundingClientRect().height;
    let heightContainer = link_container.getBoundingClientRect().height;
    console.log(heightContainer);
    if(!heightContainer){
        link_container.style.height=`${height}px`;
    }
    else{
        link_container.style.height=0;
    }

})

window.addEventListener('scroll',()=>{
    let heightNav = nav.getBoundingClientRect().height;
    let heightWindow = window.pageYOffset;
    //console.log(heightWindow);
    if(heightWindow>heightNav){
        nav.classList.add('fixnav');
    }
    else{
        nav.classList.remove('fixnav');
    }
    if(heightWindow>500){
        top_link.classList.add('showlink');
    }
    else{
        top_link.classList.remove('showlink');
    }
    let section=getSectionTop(heightWindow);
    const a_active = document.querySelector(`a[href="#${section.getAttribute('id')}"]`);
   
    scroll_links.forEach((link)=>{
        if (link!==a_active){
            //console.log(link);
            link.classList.remove('active');
        }
    })
    a_active.classList.add('active');
});
function getSectionTop(windowY){
    let heightNav = nav.getBoundingClientRect().height;
    if(nav.classList.contains('fixnav')){
        windowY = windowY + heightNav + 2;
    }
   let section= sections.filter(function(section) {
        if(windowY>section.offsetTop){
            return section;
        }
    });
    if(section.length===1){
        return section[0];
    }
    else if(section.length>1){
       section = section.reduce((acc,current)=>{
           if(acc>current){
               return acc;
           }
            return current;
       })
       return section;
    }
    else{
        return section = document.querySelector('header');
    }
    
}
scroll_links.forEach((link)=>{
    link.addEventListener('click',(e)=>{
        e.preventDefault();
        let id = e.target.getAttribute('href').split('#');
        let target = document.getElementById(id[1]);
        let targetTop = target.offsetTop;
        
        let heightNav = nav.getBoundingClientRect().height;
        let position = targetTop - heightNav;
        let heightContainer = link_container.getBoundingClientRect().height;

        if(!nav.classList.contains('fixnav')){
            position = position - heightNav;
        }
       
        if(heightContainer){
            link_container.style.height=`0px`;
            console.log(heightContainer);
            position = position + 180;
        }
       

        window.scrollTo(0,position);
    })
})