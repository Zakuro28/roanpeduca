/** Ask the butterfly swarm to fly from a point on screen (the butterfly that was clicked) */
export function releaseButterflies(x: number, y: number) {
  window.dispatchEvent(new CustomEvent('butterflies', { detail: { x, y } }))
}
