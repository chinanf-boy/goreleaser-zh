
/**
 * Setup.
 */

const items = document.querySelectorAll('.Page')
let links = document.querySelectorAll('.Menu a')
links = Array.from(links).slice(1)

/**
 * Check if `el` is out of view.
 */

function isLooking(el) {
	let pos = el.getBoundingClientRect()
  return pos.top < 0 && pos.bottom > 0
}

/**
 * Activate item `i`.
 */

function activateItem(i) {
  links.forEach(e => e.classList.remove('active'))
  links[i].classList.add('active')
}

/**
 * Activate the correct menu item for the
 * contents in the viewport.
 */

function activate() {
  let i = 0

  for (; i < items.length; i++) {
    if (isLooking(items[i])) {
      break
    }
  }

  if(i < items.length){
	  activateItem(i)
  }
}

/**
 * Activate scroll spy thingy.
 */

window.addEventListener('scroll', e => activate())
