import controllers from '../controllers'

export default {
  initSection : controllers.preload,
  routes : {
    '/'                   : { section: controllers.home },
    '/screen/'            : { section: controllers.screen },
    '404'                 : { section: controllers.notfound }
  }
}
