const btn_bar = document.querySelector('.btn-bar');
const link_container = document.querySelector('.links-container');
const links = document.querySelector('.links');
const nav = document.getElementById('nav');
const top_link = document.querySelector('.top-link');
const scroll_links = document.querySelectorAll('.scroll-link');

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
});

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
            console.log('zz');
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