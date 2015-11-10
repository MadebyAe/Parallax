// Import
import algoliasearch from 'algoliasearch'
// Config Algolia
let client = algoliasearch(
  '9JE76GX7DN', 
  'a1f28047f7a936635d54af561e0a68f0'
);
// Search
class Model {
  constructor(props) {
    this.props = props;
  }
  hits(req, callback) {
    let exactOptions = {
      'queryType'      : 'prefixNone',
      'typoTolerance'  : 'false',
      'ignorePlurals'  : false,
      'advancedSyntax' : true,
      'synonyms'       : false,
      'hitsPerPage'    : req.params.page,
      'page'           : req.params.index
    };
    let aproxOptions = {
      'queryType'      : 'prefixAll',
      'typoTolerance'  : 'true',
      'ignorePlurals'  : true,
      'advancedSyntax' : true,
      'synonyms'       : true,
      'hitsPerPage'    : req.params.page,
      'page'           : req.params.index

    };
    let queries = [{
      indexName   : 'seenapsesv4',
      query       : req.params.title,
      params      : exactOptions
    },
    {
      indexName : 'seenapsesv4',
      query     : req.params.title,
      params    : aproxOptions
    },
    {
      indexName : 'users',
      query     : req.params.title,
      params    : exactOptions
    }];

    let meta = [{
      model: 'exact',
      label:'Exact matches',
      color: '#D4E245'
    },{
      model: 'approximate',
      label:'Approximate matches',
      color: '#91CAE5'
    },{
      model: 'people',
      label:'People',
      color: '#9C7BC9'
    }];
    
    client.search(queries, function(err, r) {
      if (r && r.results) {
        r.results.forEach(function(item, i){
          item.label = meta[i].label;
          item.model = meta[i].model;
          item.color = meta[i].color;
        });
      }
      return callback(err, r);
    });
  }
  exact(req, callback) {
    let exactOptions = {
      'queryType'      : 'prefixNone',
      'typoTolerance'  : 'false',
      'ignorePlurals'  : false,
      'advancedSyntax' : true,
      'synonyms'       : false,
      'hitsPerPage'    : req.params.page,
      'page'           : req.params.index
    };
    let query = [{
      indexName   : 'seenapsesv4',
      query       : req.params.title,
      params      : exactOptions
    }];
    client.search(query, function(err, r){
      if (r && r.results) {
        r.totalPages = Math.ceil(r.results[0].nbHits/req.params.page)-1;
      }
      return callback(err, r);
    });
  }
  approximate(req, callback) {
    let aproxOptions = {
      'queryType'      : 'prefixAll',
      'typoTolerance'  : true,
      'ignorePlurals'  : true,
      'advancedSyntax' : true,
      'synonyms'       : true,
      'hitsPerPage'    : req.params.page,
      'page'           : req.params.index
    };
    let query = [{
      indexName   : 'seenapsesv4',
      query       : req.params.title,
      params      : aproxOptions
    }];
    client.search(query, callback);
  }
  
  people(req, callback) {
    console.log(req);
    let exactOptions = {
      'queryType'      : 'prefixNone',
      'typoTolerance'  : 'false',
      'ignorePlurals'  : false,
      'advancedSyntax' : true,
      'synonyms'       : false,
      'hitsPerPage'    : req.params.page,
      'page'           : req.params.index
    };
    let query = [{
      indexName : 'users',
      query     : req.params.title,
      params    : exactOptions
    }];
    client.search(query, callback);
  }
}
// Export
export default Model