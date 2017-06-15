/**
 * Helping scripts, hacks and etc
 */

$.expr[':'].attrNoCase = function(node, stackIndex, properties){
    var args = properties[3].split(',').map(function(arg) {
        return arg.replace(/^\s*["']|["']\s*$/g, '');  
    });
    if ($(node).attr(args[0])) {
        return $(node).attr(args[0]).toLowerCase() == args[1].toLowerCase();
    }
};

$.expr[':'].contains = function(a, i, m) {
  return $(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

$.expr[':'].iAttrEnd = function(obj, params, meta, stack) {
    var opts = meta[3].match(/(.*)\s*,\s*(.*)/);
    return (opts[1] in obj) && (obj[opts[1]].toLowerCase().indexOf(opts[2].toLowerCase()) === 0);
};

console.log('helpers')