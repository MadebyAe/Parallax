class Model {
  constructor(props) {
    this.props = props;
  }
  submit(req, callback) {
    let url = 'http://api.seenapse.net/data/'+req.params.title+'/';
    $.ajax(url, req.params.data, function(r, err) {
      if (r) {
        return callback(r);
      } else {
        return callback(err);
      }
    });
  }
  random(req, callback) {
    let self = this;
    self.data.ids = [].concat.apply([], self.data.ids);
    console.log( self.data.ids);
    let url = 'http://api.seenapse.net/section/'+req.params.title;
    $.ajax(url, self.data, function(r, err){
      if (r) {
        r.title = req.params.id || req.params.title;
        r.label = r.title.capitalize();
        self.data.ids.push(r.ids);
        return callback(r);
      } else {
        return callback(err);
      }
      
    });
  }
  staff(req, callback) {
    let url = 'http://api.seenapse.net/section/staff';
    $.ajax(url, function(r, err){
      if (r) {
        r.title = req.params.id || req.params.title;
        r.label = r.title.capitalize();
      }
      return callback(r, err);
    });
  }
  followees(req, callback) {
    let url = 'http://api.seenapse.net/section/followees';
    $.ajax(url, function(r, err){
      if (r) {
        r.title = req.params.id || req.params.title;
        r.label = r.title.capitalize();
      }
      return callback(r, err);
    });
  }
}
// Export
export default Model