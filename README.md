json-docs
=========

## Overview

This is the modules documentation system provided with the monkey programming language. It uses JavaScript and JSON data to build the page.

Benefits of this approach are: speed, flexibility, smaller data size, the ability to bookmark specific pages, and also to search through the data locally.

The system is also extensible, in that if you write your own module you can also add your it's documentation to the system. This is shown in the `json-demo.js` file. You'll probably want to write some sort of converter to take a text file and spit out JSON.

## Usage

To add your own docs to the system, we do the following:

1. push new content onto the searchData array
2. define new content data to be included in the navigation
3. define new modules to be included in the navigation
4. include this .js file in the main doc .html file, using:  
`<script type="text/javascript" charset="utf-8" src="json-demo.js"></script>`  

...and that's it!

**Note** it might be easier if you auto generate your JSON data!

### Search data
Search data consists of an array of id/text pairs.  
`id` is the link that is followed for search results  
`text` is the text that will appear in the search list

### Content data
Content data is an array of content entries. For each content entry there must be at least one .main and one .contents entry:  

- `.main` contains the breadcrumb trail and the definition of the module

 * `breadcrumbs` is an array of name/link pairs
 * `definition` consists of arbritrary fields, usually a heading/introductory pair

- `.contents` is an array of sub nav items, each containing name/link pairs. It can contain as many sections as you wish in this example `demo.module` has three: `globals`, `functions` and `classes` - but they can be named whatever you wish.

Each sub nav item also needs a content entry, consisting of the main page content. Again, definition can contain arbritrarily named fields but there are special names:

- `heading` becomes the page heading
- `syntax` presented as a prominent highlight
- `parameters` presented as a second level highlight
- `example` presented in a way that allows &lt;pre&gt; formatted source code.

### Module data
Module data is an array of top level module names as name/link pairs.

- `name` is the display name
- `link` is the url slug

Both are currently the same, but may become different in future.


## License

json-docs is made available under a [Creative Commons Attribution-Share Alike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0).

## Support
You can talk about the documentation system on the [official monkey forum](http://www.monkeycoder.co.nz/Community/posts.php?topic=61).  
Please report any problems in the documentation itself in [the documentation problems thread](http://www.monkeycoder.co.nz/Community/posts.php?topic=54)


## Requirements
- TextMate [http://macromates.com](http://macromates.com)
- monkey [http://www.monkeycoder.co.nz](http://www.monkeycoder.co.nz)

## Changelog

**1.0** (2011-03-01)

- github release to coincide with monkey launch

**0.9**

- defaults to index if user searches for something that does not exist
- added selected text css styles for pre-formatted code elements
- added style for cross-reference hyperlinks
- cross-reference hyperlinks now result in the correct, longer, url hash
- cross-reference hyperlinks only created if they exist in the search data

**0.8**

- updated to jsonSuggest search plugin to version 2.0.1/2011-02-22
- "see also" bold keywords are now converted into clickable search links 
- added json-demo.js showing how you can add your own docs to the system

**0.7**

- sections headers now only inserted if there is section content to insert
- added indentation for modules lists
- added IE8 compatibility meta tag

**0.6**

- merged in Warpy's search code: #?searchterm for monk context help
- fixed notice panel closing so content is not hidden

**0.5**

- content is now in one .js file, not lots of .json files

**0.4**

- nav will jump to top of new content
- ucfirst subheadings in js rather than css

**0.3**

- more generic handling of contents.json files
- simplified html and json handling
- added indentation for nav lists
- alert on JSON parse error
- moved search suggestion trigger code into main js
- minor fixes and improvements

**0.2**

- added search form with suggestions
- added handling of back button
- added buildFromHash function
- renamed some files to be more consistent
- cleaned up appearance of elements during loading
- fixed functions and classes nav not behaving as they should

**0.1**

- Initial release

## Todo
- simple markdown to JSON converter