export function playAnimation(container, animation) {
    container.classList.remove(animation);
    void container.offsetWidth;
    container.classList.add(animation);
}

export function resetAnimation(container, animation) {
    container.classList.remove(animation);
}