const buttonsService = document.querySelectorAll('.services__button')
const navMenuIcon = document.querySelector('.nav-menu-icon')
const body = document.body
const navMenu = document.querySelector('.nav-menu')
const nav = document.querySelector('.nav')
const list = document.querySelector('.list')
const hiddenMenu = document.querySelector('.nav-menu__nav-hidden')
const navMenuLink = document.querySelector('.nav-menu__link')

new Swiper('.promo__body',{
    spaceBetween:500,
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
    mousewheel:{
        invert:false
    },
    autoplay:{
        delay:10000
    },
    keyboard:true,
    cssMode:true,
    observer:true,
    observeParents:true,
    noSwiping:true
})
const switcher = () =>{
    const HIDDEN_CLASS_NAME = 'hidden'
    const TARGET_CLASS_NAME = 'target'
    const SOURCE_CLASS_NAME = 'source'
    const targetIdToShow = 1

    const getElements = (type) =>{
    return [].slice.call(document.querySelectorAll('.' + type)).sort( (targetNode1, targetNode2) =>{
        const target1Num = extractId(targetNode1, TARGET_CLASS_NAME)
        const target2Num = extractId(targetNode2, TARGET_CLASS_NAME)
        return target1Num > target2Num
    })
}
    const extractId = (targetNode, baseClass) => {
        let currentClassIndex = targetNode.classList.length
        while (currentClassIndex--) {
            let currentClass = targetNode.classList.item(currentClassIndex)
            const maybeIdNum = parseInt(currentClass.split('-')[1])
            if (isNaN(maybeIdNum)) {
                continue
            }
            const classStrinToValidate = baseClass + '-' + maybeIdNum
            if (classStrinToValidate === currentClass) {
                return maybeIdNum
            }
        }
    }
    const showTarget = (targets, targetId) => {
        targets.forEach( (targetNode) => {
            const currentTargetNodeId = extractId(targetNode, TARGET_CLASS_NAME)
            if (currentTargetNodeId === targetId) {
                targetNode.classList.remove(HIDDEN_CLASS_NAME)
            } else {
                targetNode.classList.add(HIDDEN_CLASS_NAME)
            }
        })
    }
    const targets = getElements(TARGET_CLASS_NAME)
    const sources = getElements(SOURCE_CLASS_NAME)
    sources.forEach( (sourceNode) => {
        const sourceNodeId = extractId(sourceNode, SOURCE_CLASS_NAME)
        sourceNode.addEventListener('click', () => {
            showTarget(targets, sourceNodeId)
        })
    })
    showTarget(targets, targetIdToShow)
}
switcher()

const test = window.getComputedStyle(body).width
console.log(test)


/*let prevScrollPos = window.pageYOffset
window.onscroll = (e) =>{
    let currentScrollPos = window.pageYOffset
    if(prevScrollPos > currentScrollPos){
        nav.style.top = '40px';
    } else {
        nav.style.top = '-110px'
    }
    prevScrollPos = currentScrollPos

}*/
navMenuIcon.addEventListener('click',()=>{
    body.classList.toggle('body--is-menu')
    navMenu.classList.toggle('nav-menu--is-hidden')

})
list.addEventListener('click',() =>{
    hiddenMenu.classList.toggle('hidden')
    navMenuLink.classList.toggle('nav-menu__link--color')
})

body.addEventListener('keydown',(e)=>{
   if (e.key === 'Escape'){
       navMenu.classList.add('nav-menu--is-hidden')
       body.classList.remove('body--is-menu')
   }
})
buttonsService.forEach(button =>{
    button.addEventListener('click',function (){
            buttonsService.forEach(i =>{
                i.classList.remove('services__button-active')
            })
            this.classList.toggle('services__button-active')
    })
    button.addEventListener('mouseover',()=>{
        button.classList.add('services__button-hover')
    })
    button.addEventListener('mouseout',()=>{
        button.classList.remove('services__button-hover')
    })
})


/*
const createRipple = (e) =>{
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth,button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`
    circle.classList.add('ripple')
    const ripple = button.getElementsByClassName('ripple')[0]
    if(ripple){
        ripple.remove();
    }
    button.appendChild(circle)
}
const buttons = document.getElementsByTagName('a');
for (const button of buttons){
    button.addEventListener('click',createRipple)
}
*/
