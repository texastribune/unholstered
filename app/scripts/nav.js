// elements
const body = document.body
const navbar = document.querySelector('.masthead-sections')
const navbarDesktop = document.querySelector('.navbar--desktop')
const navbarMobile = document.querySelector('.navbar--mobile')
const navbarDesktopStories = navbarDesktop.querySelectorAll('.navbar__story')
const navbarMobileStories = navbarMobile.querySelectorAll('.navbar__story')
const desktopMastheadSection = document.querySelector('.masthead-sections__desktop')
const mobileMastheadSection = document.querySelector('.masthead-sections__mobile')

// states
const isStory = body.classList.contains('story-body')

// desktop masthead listener for nav trigger
desktopMastheadSection.addEventListener('mouseover', (e) => {
  if (e.target === e.currentTarget || e.target.nodeName !== 'LI') return

  for (let i = 0; i < navbarDesktopStories.length; i++) {
    navbarDesktopStories[i].classList.add('is-hidden')
  }

  const navbarWidth = navbar.getBoundingClientRect().width
  navbarDesktop.style.width = isStory ? `${navbarWidth + 12}px` : `${navbarWidth}px`

  const id = e.target.id
  navbarDesktop.querySelector(`#nav-${id}`).classList.remove('is-hidden')
  navbarDesktop.classList.remove('is-hidden')
})

// desktop masthead trigger for when the mouse leaves the nav
desktopMastheadSection.addEventListener('mouseleave', (e) => {
  const nextEl = document.elementFromPoint(e.clientX, e.clientY)

  if (nextEl.classList.contains('navbar__story')) {
    const nextElLeave = nextEl.addEventListener('mouseleave', (e) => {
      navbarDesktop.classList.add('is-hidden')
      nextEl.removeEventListener('mouseleave', nextElLeave)
    })
  } else {
    navbarDesktop.classList.add('is-hidden')
  }
})

mobileMastheadSection.addEventListener('click', () => {
  navbarMobile.classList.toggle('is-hidden')

  for (let i = 0; i < navbarMobileStories.length; i++) {
    navbarMobileStories[i].classList.toggle('is-hidden')
  }
})
