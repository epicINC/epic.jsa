"use strict";

var args = require('../index');

var test0 = function() {};

var test1 = function(a) {};

var test2 = function(a /* value:1, type:'string' */) {};

var test3 = function(
  a // value:1, type:'string'
  ) {};



var test4 = function(a, b) {};

var test5 = function(a /* value:1, type:'string' */, b) {};

var test6 = function(
  a // value:1, type:'string'
  ,b
  ) {};

var test7 = function(a, b, c) {};

var test8 = function(a /* value:1, type:'string' */, b, c) {};

var test9 = function(
  a // value:1, type:'string'
  ,b
  ,c
  ) {};


var test10 = function(a, b /* value:1, type:'string' */, c) {};

//test
var test11 = function(
  a,b // value:1, type:'string'
  ,c
  ) {};

var test12 = function(a, b, c /* value:1, type:'string' */) {};

//test
var test13 = function(
  a,b,c // value:1, type:'string'
  ) {};


var funcs = [test0, test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11, test12, test13]

funcs.forEach(function(func, index)
{
  console.log("%d: %j", index, args(func).params.params);
});

