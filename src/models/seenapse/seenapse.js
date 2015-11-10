let data = { ids: [] };
// Search
class Model {
  constructor(props) {
    this.props = props;
  }
  detail(req, callback) {
    data.hitsPerPage = 100;
    let circles = 8;
    let url = 'http://api.seenapse.net/section/seenapse/'+req.params.title+'/';
    $.ajax(url, data, function(r, err) {
      if (r) {
        r.children.count = r.children.data.length;
        if (r.children.data && r.children.count < circles) {
          let limit = circles-r.children.count;
          let fill = Array.apply(null, new Array(limit)).map(function() { 
            return null;
          });
          r.children.data = r.children.data.concat(fill);
        } else if (r.children.data && r.children.count > circles){
          r.children.data = r.children.data.slice(0, circles);
          console.log(r.children.data);
        }
      }
      return callback(err, r);
    });
  }
  random(req, callback) {
    let self = this;
    data.ids = [].concat.apply([], data.ids);
    data.hitsPerPage = 40;
    let url = 'http://api.seenapse.net/section/'+req.params.title;
    $.ajax(url, data, function(r, err){
      if (r) {
        r.title = req.params.id || req.params.title;
        r.label = r.title.capitalize();
        data.ids.push(r.ids);
      }
      return callback(err, r);
    });
  }
  staff(req, callback) {
    let url = 'http://api.seenapse.net/section/staff';
    data.hitsPerPage = 40;
    $.ajax(url, data, function(r, err){
      if (r) {
        r.title = req.params.id || req.params.title;
        r.label = r.title.capitalize();
      }
      return callback(err, r);
    });
  }
  followees(req, callback) {
    let url = 'http://api.seenapse.net/section/fromfollowees';
    data.hitsPerPage = 40;
    $.ajax(url, data, function(r, err){
      if (r) {
        r.title = req.params.id || req.params.title;
        r.label = r.title.capitalize();
      }
      return callback(err, r);
    });
  }
}
// Export
export default Model