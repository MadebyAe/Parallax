// Import
import { Tween } from 'gsap'
import { dom }   from 'core'
// Preload
class Preload {
  constructor(done){
    this.onPreloadComplete = done;
  }
  init(req, done) {
    let el = this.el = document.createElement('div');
    el.style.background = '#717171';
    el.style.position = 'fixed';
    el.style.height = '1px';
    el.style.width = '0px';
    el.style.top   = '50%';
    el.style.left  = '25%';
    el.style.zIndex = 100;
    document.body.appendChild(el);
    //this.events();
    //this.debug();
    done();
  }

  submitHandler(e) {
    e.preventDefault();
    let value = this.input.value.stringToSlug();
    framework.go(`/search/${value}/`);
  }
  animateIn(req, done) {
    let self = this;
    Tween.to(this.el, 0.5, { width: '50%', ease: Quad.easeInOut, onComplete: self.onPreloadComplete });
    done();
  }

  animateOut(req, done) {
    this.el.style.display = 'none';
    done();
  }

  destroy() {
    this.el.parentNode.removeChild(this.el);
  }
}

export default Preload
