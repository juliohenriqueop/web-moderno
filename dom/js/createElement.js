function createElement(elementName, className) {
  const element = document.createElement(elementName)
  element.classList.add(className)

  return element
}

export default createElement