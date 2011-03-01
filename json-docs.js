//
// json-docs: generate dynamic docs from json data
// by Matt Sephton <http://www.gingerbeardman.com>
//
$(document).ready(function() {
	var start = "modules.list";

	buildFromHash();	// let's go!

	$.ajaxSetup({"error":function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus);
		alert(errorThrown);
		alert(XMLHttpRequest.responseText);
	}});

	function buildPage(a, b, c) {
		if (typeof b == "undefined") $('#trail').html('');
		if (typeof c == "undefined") c = "main";

		// modules
		if (files[a] != null && files[a].constructor == Object) {
			data = files[a];
		} else {
			data = $.parseJSON(files[a]);
		}
		var current = a;
		var source = active = '';
		$.each(data.modules, function(i,item) {
			active = (item.name == b) ? 'active ' : '';
			indent = (item.name.indexOf('.') > 0) ? 'indent ' : '';
			source += '<li class="'+active+indent+'"><a href="#/' + item.link + '">' + item.name + '</a></li>';
			$('#modules').html(source);
		});

		// nav & subnav
		if (b) {
			$('#content .wrap').hide();

			if (files[b+'.contents'] != null && files[b+'.contents'].constructor == Object) {
				data = files[b+'.contents'];
			} else {
				data = $.parseJSON(files[b+'.contents']);
			}
			var source = active = indent = '';
			$.each(data, function(s,section) {
				active = indent = '';
				source += '<h3>'+s+'</h3><ul>';
				$.each(section, function(i,item) {
					active = (item.name == c) ? 'active ' : '';
					indent = (item.name.indexOf('.') > 0) ? 'indent ' : '';
					source += '<li class="'+active+indent+'"><a href="#/' + b +'/'+ item.link + '">' + item.name + '</a></li>';
				});
				source += '</ul>';
			});
			$('#additional').html(source).show();

			// content
			if (files[b+'.'+c] != null && files[b+'.'+c].constructor == Object) {
				data = files[b+'.'+c];
			} else {
				data = $.parseJSON(files[b+'.'+c]);
			}
			var source = '';
			$.each(data, function(s,section) {
				source = '';
				switch (s) {
				case "breadcrumbs":
					$.each(section, function(i,item) {
						link = (item.link == '#') ? b : b +'/'+ c;
						sep = (i < section.length -1) ? ' &nbsp;&gt;' : '';
						source += '<li><a href="#/' + link + '">' + item.name + '</a>' + sep + '</li>';
						$('#trail').html(source);
					});
					break;
				case "definition":
					$.each(section, function(i,item) {
						$.each(item, function(p,part) {
							if (part) {
								pUC = p.charAt(0).toUpperCase() + p.substring(1);
								switch (p) {
								case "heading":
									source += '<h1>' + part + '</h1>';
									break;
								case "syntax":
									source += '<h2>' + pUC + '</h2>';
									source += '<div class="rounded">' + part + '</div>';
									break;
								case "parameters":
									source += '<h2>' + pUC + '</h2>';
									source += '<div class="rounded outline">' + part + '</div>';
									break;
								case "example":
									source += '<h2>'+pUC+'</h2>';
									source += part;
									break;
								default:
									source += '<h2>'+pUC+'</h2>';
									source += '<div class="text">' + part + '</div>';
									break;
								}
							}
						});
					});
					break;
				default:
					break;
				}
			});
			$('#details').html(source).show();
			$('html,body').animate({scrollTop:0}, 'fast');
		}
		$('div.text p b').each(function() {
			if (closestSearch($(this).text()))
				$(this).replaceWith('<a href="#?'+ $(this).text() +'">'+ $(this).text() +'</a>');
		});
		
	}

	function buildFromHash() {
		var hash = window.location.hash;
		if (hash) {
			if(hash[1]=='?')	//search
			{
				var res = closestSearch(hash.slice(2));
				if (typeof res == "undefined") res = '';
				window.location.hash = '/'+res;
				var parts = res.split('/');
				var module = parts[0];
				var sub = parts[1];
			}
			else
			{
				var parts = hash.split('/');
				var module = parts[1];
				var sub = parts[2];
			}
		} else {
			var module = "";
			var sub = "";
		}
		if (sub == "") $('#additional,#details').hide();

		buildPage(start, module, sub);
	}

	function closestSearch(str)
	{
		var re = new RegExp(str,'i');
		for(var i=0;i<searchData.length;i++)
		{
			if(searchData[i].id.match(re))
			{
				return searchData[i].id;
			}
		}
	}

	$('a').live('click', function(e) {
		href = $(this).attr('href');
		var parts = href.split('/');
		$('#details').hide();

		buildPage(start, parts[1], parts[2]);
	});

	$('#hidenotice').bind("click", function(e) {
		$('#notice').slideUp();
		e.preventDefault();
		return false;
	});

	$("form").bind("keypress", function(e) {
		switch (e.keyCode) {
			case 13: // return key
				return false;
			case 27: //escape key
				$('#search').attr('value', '');
				return false;
			default:
				return true;
		}
	});

	$('input#search').blur(function() {
		$('#searchlabel').css('color', '#999');
	});

	$('input#search').focus(function() {
		$('#searchlabel').css('color', '#333');
	});

	function callbackSearchResultChosen(item) {
		window.location.hash = '#/'+item.id;
		$('#search').attr('value', '');
	}

	searchData = $(searchData).sort("text", "asc");

	$('input#search').jsonSuggest({data:searchData, onSelect:callbackSearchResultChosen});

	$(window).bind('hashchange', buildFromHash);
});
