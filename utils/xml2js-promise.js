const xml2jsParser = require('xml2js').parseString;

async function xml2jsParseString(raw) {
  return new Promise(function(resolve, reject) {
    xml2jsParser(raw, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = xml2jsParseString;
