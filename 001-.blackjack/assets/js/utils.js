const $ = (el, node = document) => {
  return node.querySelector(el)
}

const $$ = (el, node = document) => {
  return node.querySelectorAll(el)
}
