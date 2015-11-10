// Search
class Model {
  constructor(props) {
    this.props = props;
  }
  find(req, callback) {
    let url = 'http://api.seenapse.net/section/user/'+req.params.id+'/';
    $.ajax(url, function(err, r) {
      if (r) {
        
      } 
      return callback(err, r);
    });
  }
}
// Export
export default Model