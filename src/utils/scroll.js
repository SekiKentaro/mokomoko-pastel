// スクロールの速度（ミリ秒）をここで調整できます
export const SCROLL_DURATION = 800;

export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const targetY = element.offsetTop;
  const startY  = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  // イージング関数 (easeInOutCubic)
  function ease(t, b, c, d) {
    t /= d/2;
    if (t < 1) return (c/2)*t*t*t + b;
    t -= 2;
    return (c/2)*(t*t*t + 2) + b;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const nextY = ease(timeElapsed, startY, distance, SCROLL_DURATION);
    window.scrollTo(0, nextY);
    if (timeElapsed < SCROLL_DURATION) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
