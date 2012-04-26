jQuery Tweets
======

This plugin was built to be displayed in a jQuery presentation for javascriptU.
This should be cleaned up and minified for production usage.

Usage:
-------

Default `Options`

<!-- highlight:Options language:console -->

 $('selector').tweetHash([options]);

<!-- language:console -->

    {
      pollInterval     : 60, //Seconds
      hashTag          : false, //# lookup
      mention          : false, //@ lookup
      resultType       : "recent",
      tweetsPerRequest : 10,
      lang             : "en" //ISO 639-1
    }

Check Out the example, `example/index.html`, which includes basic styling.

<!-- highlight:example/index.html -->

MIT License
-----------
Copyright (c) 2012 javascriptU

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
