document.addEventListener('DOMContentLoaded', () => {

    //nav menu

    const burger = document.querySelector('.header__burger');
    const close = document.querySelector('.navigation__close');
    
    const navMenu = (trigger) => {

        trigger.addEventListener('click', () => {
            const navigation = document.querySelector('.navigation');
     
            navigation.classList.toggle('navigation_active')

            if (navigation.classList.contains('navigation_active')) {
                document.querySelector('body').style.overflow = 'hidden'
            } else {
                document.querySelector('body').style.overflow = 'visible'
            }
    
        })
    }
    navMenu(burger)
    navMenu(close)

    //flexible img

    const imgHeight = document.querySelector('.main-page__mac').height
    const mt = document.querySelector('.main-page__advantages')

    mt.style.marginTop = `${imgHeight+39+63}px`;

    window.addEventListener('resize', (e) => {
        const imgHeight = document.querySelector('.main-page__mac').height
        const mt = document.querySelector('.main-page__advantages')

        mt.style.marginTop = `${imgHeight+39+63}px`;
      });

    // slider

    const lines = document.querySelectorAll('.mac-view__line')
    const slider = document.querySelector('.mac-view__wrapper');
    const slideWrapper = document.querySelector('.mac-view__slider');

    let startX = 0;
    let currentTranslate = 0;
    let currentSlide = 1;
    let isDragging = false;
    let currentPosition = 0;

    let slideTransformValue = 0;
    let lock = true;

    slider.addEventListener('click', (e) => {
        if (e.target.classList.contains('mac-view__line')){

            lines.forEach((item, i) => {
                if (item == e.target) {   

                    currentSlide = i+1;

                    currentTranslate += (330*(i+1))
                    const sliderWrapper = document.querySelector('.mac-view__slider');

                    sliderWrapper.style.transform = `translateX(${-330*i}px)`
                    lines.forEach(line => {
                        line.style.backgroundColor = 'white';
                    })
                    item.style.backgroundColor = '#a0a0a0';

                }
            })
        } 

    })

    //touch slider

    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);

    const selectLine = (currentslide) => {
        lines.forEach((item) => {
            item.style.backgroundColor = 'white'
        })

        lines[currentslide].style.backgroundColor = '#a0a0a0'
    }

    function touchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        lock = false
    }
      
    function touchMove(e) {
        if (!isDragging) return;

        currentPosition = e.touches[0].clientX;
        console.log(currentPosition)
        currentTranslate = (startX - currentPosition) + slideTransformValue;



        if (currentSlide>1 && currentSlide<4) {
            slideWrapper.style.transform = `translateX(${-currentTranslate}px)`; 
        }
        
        
    }
      
    function touchEnd() {
        console.log(startX - currentPosition)
        isDragging = false;

        /* if (lock == false) { */

            /* if (currentPosition != 0) { */

                if ((startX - currentPosition >= 60) && (currentSlide>=1 && currentSlide<4)) {
                    currentSlide+=1
                    slideTransformValue+=330;
                    slideWrapper.style.transform = `translateX(${-330*(currentSlide-1)}px)`;
                    selectLine(currentSlide-1)
                    
                } else if((startX - currentPosition <= -60) && (currentSlide>1 && currentSlide<=4)) {
                    currentSlide-=1
                    slideTransformValue-=330;
                    slideWrapper.style.transform = `translateX(${-330*(currentSlide-1)}px)`;
                    selectLine(currentSlide-1)

                } else {
                    slideWrapper.style.transform = `translateX(${-330*(currentSlide-1)}px)`;
                }
            /* } */ 
        /* } */

        lock = true;
        
    }

    //deadline

    const addZeroInTimer = (arg) => {
        if (arg < 10) {
            return `0${arg}`
        } else {
            return arg
        }
        
    }

    let deadLine = '2024-02-13';

    const countdownTimer = setInterval(() => {

        let distance = Date.parse(deadLine) - new Date()


        let hours = addZeroInTimer(Math.floor((distance / (1000*60*60))))
        let minutes = addZeroInTimer(Math.floor((distance / (1000*60)) % 60))
        let seconds = addZeroInTimer(Math.floor((distance / 1000) % 60))

        const timer = document.querySelector('#timer');

        timer.innerHTML = `${hours}:${minutes}:${seconds}`;

        if (distance < 0) {
            clearInterval(countdownTimer);
            timer.innerHTML = "00:00:00";
        }

    },1000)

    //dropdown

    const dropDown = document.querySelector('.mac-view__shipping')
    const dropDownArrow = document.querySelector('.mac-view__arrow')
    const dropDownElement = document.querySelector('.mac-view__dropDown')
    const dropDownWrapper = document.querySelector('.mac-view__dropDown-wrapper')

    dropDown.addEventListener('click',() => {

        dropDownArrow.classList.toggle('mac-view__arrow_active') 
        dropDownElement.classList.toggle('mac-view__dropDown_active')
        dropDownWrapper.classList.toggle('mac-view__dropDown-wrapper_active')

    })

    const footer = document.querySelector('.footer__terms-of-use')
    const footerBtn = document.querySelector('.footer__btn')

    

    // footer dropdown

    footerBtn.addEventListener('click', (e) => {
        if (e.target.textContent == 'Read more') {
            footer.textContent = "*Information is not a public offer This site is not part of the Facebook or Facebook Inc. website. Also, this site is not endorsed by Facebook in any way FACEBOOK is a trademark of FACEBOOK, Inc. Facebook provides a platform for serving advertising, but the opinions and/or views expressed on this website are not  representative of Facebook, Inc. Opinions and/or views expressed on our website's social media platforms, including but not limited to our blogs and Facebook pages, represent the thoughts of individual bloggers and online communities, and not necessarily those of our website or any of its business partners, affiliates or any of their respective officers, employees, staff or board members. The views and opinions expressed on these pages do not in any way reflect the opinions of the site on which they are published, other sites affiliated with the site, the personnel involved in the maintenance of the site or any member of the site. Any opinions or views expressed on this website's social media platforms are not representative of Facebook, Inc. Although our website makes reasonable efforts to monitor and/or moderate content posted on its social media platforms, we do not moderate all comments and cannot always respond to online inquiries in a timely manner. All new customers are entered into the raffle for the displayed campaign product. If you are the lucky winner, you will be contacted directly by email. This special offer includes a three-day trial to an affiliated service, after which the subscription fee will be thirty-three euros every fourteen days - automatically deducted from your credit card. If for any reason you are not satisfied with the service, you can cancel your account within three days. The service will renew every thirty days until cancelled. This campaign will expire on December 31 of this year. If you would like to participate without signing up for a three-day trial at Toolsandtoys, please email."

            footerBtn.innerHTML = 'Read less';
        } else {
            footer.textContent = '*Information is not a public offer This site is not part of the Facebook or Facebook Inc. website. Also, this site is not endorsed by Facebook in any way FACEBOOK is a trademark of FACEBOOK, Inc...'
            footerBtn.innerHTML = 'Read more'
        }
    })

    //pop-up

    const popUpBtn = document.querySelector('.mac-view__btn-buy')
    const popUpClose = document.querySelector('.pop-up__close')

    const popUpFrame = document.querySelector('.pop-up');
    const popUpContainer = document.querySelector('.pop-up__container')

    const popUp = (trigger) => {
        trigger.addEventListener('click', () => {

            popUpFrame.classList.toggle('pop-up_active');
            popUpContainer.classList.toggle('pop-up__container_active')

            if (popUpFrame.classList.contains('pop-up_active')) {
                document.querySelector('body').style.overflow = 'hidden'
            } else {
                document.querySelector('body').style.overflow = 'visible'
            }
    
        })
    }
 
    popUp(popUpBtn)
    popUp(popUpClose)

    popUpFrame.addEventListener('click', (e) => {
        if (e.target.classList.contains('pop-up')){
            popUpFrame.classList.remove('pop-up_active')
            popUpContainer.classList.remove('pop-up__container_active')
            document.querySelector('body').style.overflow = 'visible'
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' ){
            popUpFrame.classList.remove('pop-up_active')
            popUpContainer.classList.remove('pop-up__container_active')
            document.querySelector('body').style.overflow = 'visible'
        }
    })

    //scrollby

    anchor = document.querySelector('.main-page__anchor')

    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        let href = this.getAttribute('data-anchor');

        const scrollTarget = document.getElementById(href);

        const topOffset = 0;  
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
    

})

