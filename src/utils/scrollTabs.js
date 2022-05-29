
export function scrollActive(container, sections, activeClass){
  const scrollY = window.pageYOffset
  console.log('sds')
  sections.forEach(current =>{
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
        container.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add(activeClass)
      }else{
        container.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove(activeClass)
      }
  })
}