// Import
import { dom, render } from 'core'
import Tween           from 'gsap'
import views           from '../../views/'
let data = null
// Screen
class Screen {
  
  init(req, done) {
    this.el = render.model(req, views, views.screen.screen, null, done);
  }

  play() {
    Tween.to('#background', 50, {x:0});
    Tween.to('#foreground', 30, {x:-20});
    Tween.to('#character', 30, {x:200});
    Tween.to('#fx', 40, {x:-200});
  }

  resize(width, height) {
    let fontSize = width / 980 * 20;
    let background_w = width * 1.5;
    let background_l = width * 0.5;
    Tween.set('#background', {x:-background_l, width: background_w});


  }

  animateIn(req, done) {
    let self = this;
    let callback = () => {
      self.play();
      done();
    }
    Tween.from(this.el, 1, { x: -200, opacity: 0, ease: Quad.easeInOut });
    Tween.to(this.el, 0.5, { x: 0, opacity: 1, ease: Quad.easeInOut, onComplete: callback });
  }

  animateOut(req, done) {
    TweenMax.to(this.el, 0.25, {opacity: 0, ease: Quad.easeInOut, onComplete: done});
  }

  destroy() {
    this.el.parentNode.removeChild(this.el);
  }
  
}
// Export
export default Screen
