// (a = 'a', b = 1 /* */ => a.id);


// VariableDeclaration


var util = 
{
	for: Array.prototype.forEach,
	any: Array.prototype.any
};

var settings =
{
	space: [0x20, 0x09, 0x0B, 0x0C, 0xA0, 0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF],
	line: [0x0A, 0x0D, 0x2028, 0x2029],
	key: ['if', 'in', 'do', 'var', 'for', 'new', 'try', 'let', 'this', 'else', 'case', 'void', 'with', 'enum', 'while', 'break', 'catch', 'throw', 'const', 'yield', 'class', 'super', 'return', 'typeof', 'delete', 'switch', 'export', 'import', 'default', 'finally', 'extends', 'function', 'continue', 'debugger', 'instanceof'],
	symbol: [0x28, 0x29, 0x3B]
}

var Token =
{
	EOF: 'EOF',
	'Punctuator' : 'Punctuator'
};

var checker;


(function init(key)
{
	if (!checker)
	{
		checker = {};
		checker.id = /^[\p{L}\p{Nl}$_][\p{L}\p{Nl}$\p{Mn}\p{Mc}\p{Nd}\p{Pc}]*$/gm;
		//checker.id = /^[$_\p{L}][$_\p{L}\p{Mn}\p{Mc}\p{Nd}\p{Pc}\u200C\u200D]*+$/gm;
		return Object.keys(settings).forEach(init);
	}

	var
		current = checker[key] = checker[key] || new Set(),
		func = function(item, index) { current.add(item); };

	if (typeof(settings[key][0]) === 'string')
		return settings[key].forEach(func);

	util.for.call(String.fromCharCode.apply(null, settings[key]), func);
}());

//^[\p{L}\p{Nl}$_][\p{L}\p{Nl}$\p{Mn}\p{Mc}\p{Nd}\p{Pc}]*$
//^[$_\p{L}][$_\p{L}\p{Mn}\p{Mc}\p{Nd}\p{Pc}\u200C\u200D]*+$


var parser = function(code)
{
	if (!this instanceof(parser))
		return new parser(code);

  if (typeof(code) !== 'string' && !(code instanceof String))
      code = String(code);

	var
		source = code,
		index = 0,
		startIndex = index,
		lastIndex,
		length = source.length,
		lookahead,
		scanning;

	var parse = function()
	{
		
	};


	var match = function(val)
	{
		if (val.length === 1) return source[index] === val;

		return !util.any.call(function(char, i)
		{
			return char !== source[index + i];
		})
	}

	var skip =
	{
		comment: function()
		{
			var char, start, hasLine = false;
			start = index === 0;

			while(index < length)
			{
				char = source[index];
				if (checker.space(char))
				{
					index++;
					continue;
				}

				if (checker.line(char))
				{
					index++;
					start = true;
					continue;
				}


				break;
			}
		},
		peek: function()
		{
			scanning = true;
			this.comment();

			startIndex = lastIndex = index;


			token = 

			scanning = false;
		},
		forward: function()
		{
			var char, token;
			if (index >= length) return { type: Token.EOF, start: index, end: index};

			char = source[index];

			if (checker.symbol.has(char))


		}
	};

	var scan =
	{
		identifier: function(){},
		punctuator: function()
		{
			var val, token = 
			{
				type: Token.Punctuator,
				start: index,
				end: index
			};
			if (checker.symbol.has())
		}
	};

};




var test = 'e => e.id';

var p = parser(test);


