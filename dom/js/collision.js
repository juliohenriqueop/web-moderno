export default function isColliding(elementA, elementB) {
  const rectA = elementA.getBoundingClientRect()
  const rectB = elementB.getBoundingClientRect()

  const collidingHorizontally = (rectA.left + rectA.width) >= rectB.left &&
    (rectB.left + rectB.width) >= rectA.left

  const collidingVertically = (rectA.top + rectA.height) >= rectB.top &&
    (rectB.top + rectB.height) >= rectA.top

  const colliding = collidingHorizontally && collidingVertically

  return colliding
}