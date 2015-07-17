

var config =
{
	whiteSpaces: [' ', '	']
}

var checker = {};

Object.keys(config).forEach(function(key)
{
	checker[key] = checker[key] || new Set();

	config[key].forEach(function(item)
	{
		checker[key].add(item);
	});
});


var Finder = function()
{



	var skipSpaces = function(txt, index, count)
	{

		while(index < count)
		{
			if (!checker.whiteSpaces.has(txt[index])) return index;
			index++;
		}
		return index;
	};


	var boundarySingle = function(txt, range, left, right)
	{
		var index = range[0], result = [];

		do
		{
			if (txt[index] === left)
			{
				if (result[0] === undefined)
					result[0] = index + 1;
				else
		      index = txt.indexOf(right, index);
		    continue
		  }

			if (txt[index] === right)
			{
				 result[1] = index;
				 return result;
			}

		} while(index++ < range[1]);

		return range;
	};

	var some = Array.prototype.some;

	var match = function(txt, index, val)
	{
		if (val.length === 1) return txt[index] === val;

		if (val.length > (txt.length - index)) return false;

		return !some.call(val, function(item, i)
		{
			return item != txt[i + index];
		});
	}


	var jump = function(txt, index, count, pair)
	{
		var item, i = pair.length, r;
		while(i--)
		{
			item = pair[i];
			if (match(txt, index, item.left))
			{
				r = txt.indexOf(item.right, index);
				if (r !== -1) return r;
			}
		}
		return index;
	};

	var skipPair =  [{left: "'", right: "'"}, {left: '"', right: '"'}, {left: '//', right: '\n'}, {left: '/*', right: '*/'}];


	var boundary = function(txt, range, left, right)
	{
		var index = range[0], count = range[1], result = [];

		do
		{
			index = skipSpaces(txt, index, count);
			index = jump(txt, index, count, skipPair);
			if (match(txt, index, left))
			{
				if (result[0] === undefined)
					result[0] = index + left.length;
				else
				{
		      index = txt.indexOf(right, index);
				}
		    if (index === -1) return range;
		    continue;
		  }

			if (match(txt, index, right))
			{
				 result[1] = index;
				 return result;
			}

		} while(index++ < range[1]);


		return range;
	};


	var split = function(txt, range, char)
	{
		var index = range[0], count = range[1], skip, node, result = [];
		node = range.slice();
		do
		{
			index = skipSpaces(txt, index, count);
			index = jump(txt, index, count, skipPair);

			if (txt[index] === char)
			{
					node[1] = index;
					result.push(node.slice());
					index = index + char.length
					index = skipSpaces(txt, index, count);
					node[0] = index;
			}
		} while(index++ <= count);

		if (node[0] != range[0])
		{
			node[1] = count;
			result.push(node.slice());
		}
		return result;
	};


	this.pair = function()
	{

	};

	var display = function(txt, args)
	{
		if (Array.isArray(args[0]))
			return args.forEach(display.bind(null, txt));

		console.log(args, txt.substring(args[0], args[1]));
		
	};

	var print = function(txt)
	{
		Array.prototype.forEach.call(txt, function(item, i)
		{
			console.log(i, item);
		});
	}

	this.parse = function(value)
	{
		this.start = 0;
		this.end = value.length;
		this.lookup = value;
		print(value);
		var args = boundary(value, [0, value.length], '(', ')');



		display(value, args);
		display(value, split(value, args, ','));

	};


};

var t = function()
{

};
console.log(t.toString());

var test = '(eee = string(")1") // {xxx:1, bbb:2} \n,k = "2" /* a:b, c:d */,    ddd) => e.id';

var finder = new Finder();
finder.parse(test);