// Import
import Tween    from 'gsap'
import Bigwheel from 'bigwheel'
// Let
let el = null;
let stage = null;

// Section
class notFound extends Bigwheel {
  
  init(req, done) {
    el = this.render(req);
    this.events(req);
    done();
  }
  events(req) {
    el.onclick = function(e) {
      framework.go('/');
    };
  }

  resize(width, height) {
    var fontSize = width / 500 * 30;
    el.style.fontSize = fontSize + 'px';
    el.style.top = Math.round(( height - fontSize ) * 0.5) + 'px';
  }
  
  animateIn(req, done) {
    Tween.from(el, 1, {
      x: -500, 
      opacity: 1,
      ease: Quad.easeInOut, 
      overwrite: 3,
      onComplete: done
    });
    Tween.to(el, 1, {
      x: 0, 
      opacity: 1,
      className: '',
      ease: Quad.easeInOut, 
      overwrite: 3,
      onComplete: done
    });
    Tween.to('body', 1, {
      backgroundColor: '#000000',
      color: '#ffffff',
      overwrite: 3,
      ease: Quad.easeInOut
    });
  }
  animateOut(req, done) {
    Tween.to(el, 0.25, {
      x: 100, 
      opacity: 0, 
      ease: Quad.easeInOut, 
      overwrite: 3,
      onComplete: done
    });
  }
  render(req) {
    var el = document.createElement('div');
    el.className = 'loading';
    el.innerHTML = '404';
    el.style.position = 'absolute';
    el.style.cursor = 'pointer';
    return document.body.appendChild(el);
  }
  destroy(req, done) {
    el.parentNode.removeChild(el);
  }
}

export default notFound;