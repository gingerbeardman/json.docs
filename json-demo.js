//
// json-docs: generate dynamic docs from json data
// by Matt Sephton <http://www.gingerbeardman.com>
//

// search data
searchData.push({
	"id": "demo",
	"text": "demo"
}, {
	"id": "demo.module",
	"text": "demo.module"
}, {
	"id": "demo.module/FunctionName",
	"text": "FunctionName"
}, {
	"id": "demo.module/Module",
	"text": "module"
}, {
	"id": "demo.module/Module.ClassName",
	"text": "Module.ClassName"
});

// content data
var demoData = {
	"demo.main": {
		"breadcrumbs": [{
			"name": "demo",
			"link": ""
		}],
		"definition": [{
			"heading": "Module <strong>demo</strong>",
			"introduction": ""
		}]
	},
	"demo.contents": {},
	"demo.module.main": {
		"breadcrumbs": [{
			"name": "demo.module",
			"link": ""
		}],
		"definition": [{
			"heading": "Module <strong>demo.module</strong>",
			"introduction": "<p>Lorem ipsum dolor sit amet.</p>"
		}]
	},
	"demo.module.contents": {
		"globals": [{
			"name": "Test",
			"link": "Test"
		}],
		"functions": [{
			"name": "FunctionName",
			"link": "FunctionName"
		}],
		"classes": [{
			"name": "Module",
			"link": "Module"
		}, {
			"name": "Module.ClassName",
			"link": "Module.ClassName"
		}]
	},
	"demo.module.Module": {
		"breadcrumbs": [{
			"name": "demo.module",
			"link": "#"
		}, {
			"name": "Module",
			"link": "Module"
		}],
		"definition": [{
			"heading": "Class <strong>Module</strong>",
			"introduction": "<p>Lorem ipsum dolor sit amet.</p>",
			"example": "<p></p>"
		}]
	},
	"demo.module.Module.ClassName": {
		"breadcrumbs": [{
			"name": "demo.module",
			"link": "#"
		}, {
			"name": "Module.ClassName",
			"link": "Module.ClassName"
		}],
		"definition": [{
			"heading": "Method <strong>ClassName</strong>",
			"introduction": "",
			"syntax": "<p>Method <b>ClassName</b>()</p>",
			"description": "<p>Lorem ipsum dolor sit amet.</p>",
			"example": "<p><pre>source code</pre></p>"
		}]
	},
	"demo.module.FunctionName": {
		"breadcrumbs": [{
			"name": "demo.module",
			"link": "#"
		}, {
			"name": "FunctionName",
			"link": "FunctionName"
		}],
		"definition": [{
			"heading": "Function <strong>FunctionName</strong>",
			"introduction": "",
			"syntax": "<p>Function <b>FunctionName</b>:String()</p>",
			"description": "<p>Lorem ipsum dolor sit amet.</p>",
			"see also": "<p><b>ClassName</b></p>",
			"example": "<p><pre>source code</pre></p>"
		}]
	}
};

// module data
var demoModules = [{
	"name": "demo",
	"link": "demo"
}, {
	"name": "demo.module",
	"link": "demo.module"
}];

//
// note: do not modify the code below.
//
// this code extends the existing content with the new content
files = $.extend({}, files, demoData);
//
//this code merges the new modules into the existing nav data
oldModules = $.parseJSON(files["modules.list"]);
newModules = $.merge(oldModules.modules, demoModules);
files["modules.list"] = '{"modules":'+JSON.stringify(newModules)+'}';
