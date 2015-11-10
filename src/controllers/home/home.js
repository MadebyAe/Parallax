// Import
import { dom, render } from 'core'
import { Tween }       from 'gsap'
import views           from '../../views/'

let html = null

// Home
class Home {
  init(req, done) {
    this.el = render.model(req, views, views.home.home, null, done);
  }
  events(req) {
    $('.search-form').on('submit', this.handlerSubmit.bind(this));
  }
  handlerSubmit(e) {
    e.preventDefault();
    let input = this.el.querySelector('.search-form>form>input');
    let value = input.value.stringToSlug();
    framework.go('/screen/');
  }
  resize(width, height) {
    html = {};
    html.fontSize = width / 980 * 20;
    html.search = this.el.querySelector('#home-search');
    html.search.style.fontSize = html.fontSize + 'px';
    html.bg = this.el.querySelector('.bg');
    html.bg.style.width  = width + 'px';
    html.bg.style.height = height + 'px';
    html.search.style.top = Math.round(( height - html.search.offsetHeight ) * 0.5) + 'px';
    html.search.style.left = Math.round(( width - html.search.offsetWidth ) * 0.5) + 'px';
  }

  animateIn(req, done) {
    // Header
    let self = this;
    let callback = () => { this.el.className = ''; self.events(req); done(); }
    Tween.from(this.el, 0.5, { x: -200, opacity: 0, ease: Quad.easeInOut });
    Tween.to(this.el, 0.5, { x: 0, opacity: 1, className: '', ease: Quad.easeInOut, onComplete: callback });
  }
  animateOut(req, done) {
    Tween.to(this.el, 0.5, { x: 100, opacity: 0, ease: Quad.easeInOut, overwrite: 3, onComplete: done });
  }
  destroy(req, done) {
    this.el.parentNode.removeChild(this.el);
  }
}

export default Home
