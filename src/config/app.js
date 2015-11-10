import Bigwheel from 'bigwheel'
import Utils    from './utils'
import Routes   from './routes'
// create our framework instance
window.framework = Bigwheel(function(done) {
  done(Routes);
});

framework.init();