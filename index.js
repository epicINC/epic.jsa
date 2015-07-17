"use strict";

(function (window, factory)
{
    if (module)
     module.exports = factory();
    else if (typeof define === 'function' && define.amd)
    	define(factory);
    else
     window.eventUtil = factory();
})(this, function()
{

  var spliter = { params: new RegExp(), body: null };

  spliter.params.compile(/(\w+)\s*(\/\*([\s\S]*?)\*\/)*\s*,?\s*((\/\/(.*)$)|(\/\*([\s\S]*?)\*\/))*/gm);

	var analyser =
	{
		parse: function(fn)
		{
      var result = { body: fn.toString() };
      result.params = this.params.parse(fn.toString())
			return result;
		},
		strip: function(code)
		{
			if (typeof(code) === 'function')
				return this.strip(code.toString());

			return code.replace(STRIP_COMMENTS, '');
		},
    body:
    {
      parse: function(code)
      {

      }
    },
    params:
    {
      parse: function(code)
      {
        if (typeof(code) === 'function')
          return this.parse(code.toString());

        return this.item.parse(this.strip(code));
      },
      strip: function(code)
      {
        var start = code.indexOf('function') + 8, end;
        start = code.indexOf('(', 8);
        end = this.boundary(code, start);
        return code.substring(start +1, end);
      },
      boundary: function(code, index)
      {
        while(index++)
        {
          if (code[index] === ')') return index;
          if (code[index] === '(')
            index = code.indexOf(')', index);
        }
        throw new Error('unknow args format');
      },
      item:
      {
        parse: function(body)
        {
          return this.pair(body);
        },
        pair: function(code)
        {
          if (!code || code.length === 0) return [];

          var match, index = 0, item, result = [];

          while((match = spliter.params.exec(code)) !== null)
          {
            item = {name: RegExp.$1, index: index++};
            if (RegExp.$3)
              item.comment = RegExp.$3;
            else if (RegExp.$6)
              item.comment = RegExp.$6;
            else if (RegExp.$8)
              item.comment = RegExp.$8;

            result.push(item);
            //console.log('1:%s, 2:%s, 3:%s, 4:%s, 5:%s, 6:%s, 7:%s, 8:%s', RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$7, RegExp.$8);
          }
          return result;
        }
      }

    }

	};



  var test = '() => e.id';

  var result = analyser.params.item.parse('eee = string(")1") // {xxx:1, bbb:2} \n,k = "2" /* a:b, c:d */,    ddd');
  console.log(result);

  return analyser;

});



/*



var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var $injectorMinErr = minErr('$injector');

function annotate(fn, strictDi, name) {
  var $inject,
      fnText,
      argDecl,
      last;

  if (typeof fn === 'function') {
    if (!($inject = fn.$inject)) {
      $inject = [];
      if (fn.length) {
        if (strictDi) {
          if (!isString(name) || !name) {
            name = fn.name || anonFn(fn);
          }
          throw $injectorMinErr('strictdi',
            '{0} is not using explicit annotation and cannot be invoked in strict mode', name);
        }
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        argDecl = fnText.match(FN_ARGS);
        forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
          arg.replace(FN_ARG, function(all, underscore, name) {
            $inject.push(name);
          });
        });
      }
      fn.$inject = $inject;
    }
  } else if (isArray(fn)) {
    last = fn.length - 1;
    assertArgFn(fn[last], 'fn');
    $inject = fn.slice(0, last);
  } else {
    assertArgFn(fn, 'fn', true);
  }
  return $inject;
}

*/