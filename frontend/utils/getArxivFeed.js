// JavaScript widget to display list of articles associated with an
// arXiv author id. See https://arxiv.org/help/myarticles
//
// Copyright (C) 2009-2011 arXiv.org
//
// The JavaScript code in this page is free software: you can
// redistribute it and/or modify it under the terms of the GNU
// General Public License (GNU GPL) as published by the Free Software
// Foundation, either version 3 of the License, or (at your option)
// any later version.  The code is distributed WITHOUT ANY WARRANTY;
// without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
//
// As additional permission under GNU GPL version 3 section 7, you
// may distribute non-source (e.g., minimized or compacted) forms of
// that code without the copy of the GNU GPL normally required by
// section 4, provided you include this license notice and a URL
// through which recipients can access the Corresponding Source.


var arxiv_authorid='0000-0001-5137-828X';
var arxiv_format="arxiv";
var arxiv_max_entries=0;       //show all articles
var arxiv_includeSummary=1;    //show abstracts (default is 0)
var arxiv_includeComments=0;   //do not show comments (default is 1)

var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
var urlPrefix = 'https://arxiv.org/a/';

newScript.type = 'text/javascript';
if (typeof arxiv_authorid === 'undefined') {
	// At present support only list associated with author id
	// (maybe later list "latest papers" or something, for now we just dodge it)
	var arxiv_authorid="default";
} else if (typeof arxiv_authorid !== 'string') {
	arxiv_authorid="bad_authorid";
} else {
	// Get local part of author id from local part or complete arXiv author 
	// id (https://arxiv.org/a/local). Sanitize result.
	if (arxiv_authorid.indexOf(urlPrefix) === 0) {
	  arxiv_authorid=arxiv_authorid.substr(urlPrefix.length, 50);
	}
}
newScript.src = urlPrefix + arxiv_authorid + '.js';


headID.appendChild(newScript);


function manageDefaults()
{
	if (typeof arxiv_includeTitle === 'undefined') {
		arxiv_includeTitle = 1; }
	if (typeof arxiv_includeSummary === 'undefined') {
		arxiv_includeSummary = 0; }
	if (typeof arxiv_includeComments === 'undefined') {
		arxiv_includeComments = 1; }
	if (typeof arxiv_includeSubjects === 'undefined') {
		arxiv_includeSubjects = 1; }
	if (typeof arxiv_includeJournalRef === 'undefined') {
		arxiv_includeJournalRef = 1; }
	if (typeof arxiv_includeDOI === 'undefined') {
		arxiv_includeDOI = 1; }
	if (typeof arxiv_format === 'undefined') {
		arxiv_format='pretty'; }
	if (arxiv_format === 'pretty') {
	    //Check the color stuff ONLY if we're doing pretty format
	    if (typeof arxiv_bg_color === 'undefined') {
			arxiv_bg_color = "85BC8F"; }
	    if (typeof arxiv_border_color === 'undefined') {
			arxiv_border_color = "006400"; }
	    if (typeof arxiv_entry_color === 'undefined') {
			arxiv_entry_color = "FFFFFF"; }
	}
	if (typeof arxiv_max_entries === 'undefined') {
		arxiv_max_entries = 10;	}
	return 1;	
}


// IE doesn't like &apos; which we have in JSON data, so change to numeric entity
function htmlFix(html)
{
  	var re = new RegExp('&apos;', 'g');
	html = html.replace(re,'&#39;');
	return html;
}


function jsonarXivFeed(feed)
{
    //First get/set defaults
    manageDefaults();
    //Detect missing authorid
    if (arxiv_authorid === "default") {
	    var html = '<strong>missing the arxiv_authorid variable!</strong>';
	    document.getElementById('arxivfeed').innerHTML=html;
	    return 1;
    }
    //Switch based on the format type we're going after.
    if (arxiv_format === 'pretty') {
	    makePrettyarXiv(feed); }
    else {
	    makearXiv(feed); }
}

function makearXiv(feed)
{
    var x = 0;
    //Much of this style is taken from https://arxiv.org/arXiv.css
    var html = '<div id="arxivcontainer" style="font-family:Lucida Grande,helvetica, arial, verdana,sans-serif;margin:.7em;font-size:90%">\n';
    var format_name = '';
    //If title, add as an h3, similar to the arxiv.org/list/*subject*/new
    if (arxiv_includeTitle !== 0) {
	    //Title has an &apos; in it which won't display correctly on some browsers (IE being 
	    //the prime culprit this time), use htmlFix to fix that.
	    html += '<h3 style="padding-bottom:2px; margin-bottom:3px;">' + htmlFix(feed.title) + '</h3>\n';
    }
    //Everything is contained in a dl
    html += '<dl>\n';
    //Add each entry
    if (arxiv_max_entries === 0) {
	    num_entries = feed.entries.length;
	    extra_entries = false;
    }
    else if (arxiv_max_entries >= feed.entries.length) {
	    num_entries = feed.entries.length;
	    extra_entries = false;
    }
    else {
	    num_entries = arxiv_max_entries;
	    extra_entries = true;
    }
    for (x=0; x<num_entries; x++) {
	    //Add the numeral in brackets with a space
	    html += '<dt>['+(x+1)+']&nbsp\n';
	    //add a span with the ref to the id in it
	    html += '\t<span class="list-identifier" style="font-weight:bold"><a href="'+feed.entries[x].id+'" title="Abstract">'+feed.entries[x].id+'</a> [ ';
	    //now add the formats listed in the dictioary at feed.entries[x].formats
	    for (format_name in feed.entries[x].formats) {
		if (feed.entries[x].formats.hasOwnProperty(format_name)) {
		    var format_value = feed.entries[x].formats[format_name]
			html += '<a href="' + format_value 
			     +'" title="Download '+format_name+'">'+ format_name+'</a> ';
		}
	    }  
	    //Close the list of formats with the vrack and span
	    html += "]</span>\n</dt>\n";
	    //open a set of divs to contain the various fields
	    html+='<dd style="padding-bottom:1em;">\n\t<div class="meta" style="line-height:130%;">\n\t\t<div class="list-title" style="font-size:large;font-weight:bold;margin:0.25em 0 0 0;line-height:120%">\n'
	    //Add the title in a span
	    html += '\t\t\t'+ feed.entries[x].title+'\n\t\t</div>';
	    //add authors in a div
	    html += '\t\t<div class="list-authors" style="font-weight:normal;font-size:110%;text-decoration:none;">'+feed.entries[x].authors+'</div>\n';
	    //Add coments in a div only if available
	    if (arxiv_includeComments && feed.entries[x].comment && feed.entries[x].comment.length > 1) {
		    html += '\t\t<div class="list-comments" style="font-weight:normal;font-size:90%;"><span class="descriptor">Comments:</span> ' + feed.entries[x].comment + '</div>\n';
	    }
	    //Add the subject in a div
	    if (arxiv_includeSubjects) {
		    html += '\t\t<div class="list-subjects" style="font-size:90%;"><span class="descriptor">Subjects:</span> <span class="primary-subject" style="font-weight:bold;">' + feed.entries[x].subject + '</span>';
		    //Add non-primaries if available
		    if (feed.entries[x].categories && feed.entries[x].categories.length > 1) {
			    html += '; '+feed.entries[x].categories; }
		    //Close subjects div
		    html += '</div>\n';
	    }
	    //Add journal_ref if present and not disabled
	    if (arxiv_includeJournalRef && feed.entries[x].journal_ref && feed.entries[x].journal_ref.length > 1) {
		    html += '\t\t<div class="list-journal-ref" style="font-weight:normal;font-size:90%;"><span class="descriptor">Journal ref:</span> ' + feed.entries[x].journal_ref + '</div>\n';
	    }
	    //Add and link DOI if present and not disabled (there may be multiple, space separated entries)
	    if (arxiv_includeDOI && feed.entries[x].doi && feed.entries[x].doi.length > 0) {
		    html += '\t\t<div class="list-doi" style="font-weight:normal;font-size:90%;"><span class="descriptor">DOI:</span> ';
		    var dois = feed.entries[x].doi.split(' ');
		    for (var j in dois) {
		       html += '<a href="https://dx.doi.org/'+dois[j]+'">'+dois[j]+'</a> '; 
		    }
		    html += '</div>\n';
	    }
	    //Add summary in a paragraph if requested
	    if (arxiv_includeSummary != 0) {
		    html += '\t\t<p>' + feed.entries[x].summary + '</p>\n';
	    }
	    //close out the div and dd
	    html += '\t</div>\n</dd>';
    }
    if (extra_entries) {
	    html +='<br /><span style="font-size:80%">[ Showing '+num_entries+' of '+feed.entries.length+' total entries, additional <a href="https://arxiv.org/a/'+arxiv_authorid+'">'+(feed.entries.length-num_entries)+'</a> entries available at arXiv.org ]</span>';
    } else {
	    html +='<br /><span style="font-size:80%">[ Showing '+num_entries+' of '+feed.entries.length+' total entries]</span>\n';
    }
    html += '<br /><span id="authorid_hook" style="font-size:80%; padding-left:0px">[ This list is powered by an <a href="https://arxiv.org/a/'+arxiv_authorid + '">arXiv author id</a> and the <a href="https://arxiv.org/help/myarticles">myarticles</a> widget ]</span>';
    //close the arxiv container div
    html += '</dl>\n</div>\n'
    document.getElementById('arxivfeed').innerHTML=html;
}

function makePrettyarXiv(feed)
{
	//First add the feed title inside of a div
	var html = '<div id="arxivcontainer" style="width:250px; border:solid 1px #' + arxiv_border_color+';font-family:sans-serif;font-size:10px; background-color:#' + arxiv_bg_color +';">';
	if (arxiv_includeTitle == 1) {
		html += '<div id="feedtitle" style="font-size:14px; padding-top:5px; padding-bottom:5px; text-align:center;">';
		//Title has an &apos; in it which won't display correctly on some browsers (IE being 
		//the prime culprit this time), use htmlFix to fix that.
		html += htmlFix(feed.title)+'';
		html += '</div>';
	}

	//Add each entry
	if (arxiv_max_entries == 0) {
		num_entries = feed.entries.length;
	}
	else if (arxiv_max_entries > feed.entries.length) {
		num_entries = feed.entries.length;
	}
	else {
		num_entries = arxiv_max_entries;
	} 
	for (x=0; x<num_entries; x++) {
		//First add the title-link element as a entrytitle div
		html += '<div class="entry" style="padding-left:6px;width:244px;background-color:#'+arxiv_entry_color+'">';
		//Title and authors
		html += '<div class="entrytitle"><a href="' + feed.entries[x].id + '">' + feed.entries[x].title + '</a></div>';
		html += '<div class="entryauthors" style="margin-left:0.6em">' + feed.entries[x].authors+ '</div>';
		//add summary only if desired
		if (arxiv_includeSummary == 1)
		{
			html += '<div class="entrysummary" style="margin-left:0.6em">' + feed.entries[x].summary+ '</div>';
		}
		//end the entry div
		html +="</div>";
	}
	//Add a foooter div to hold the "powered by" link.
	//html += '<div id="feedtitle" style="font-size:10px; padding-top:5px; padding-bottom:5px; text-align:center;">Powered by the arXiv.org <a href="https://arxiv.org/help/myarticles">myarticles</a> widget</div>';
	html += '<div id="feedtitle" style="text-align:center; font-size:9px">';
	html += '<a href="https://arxiv.org/help/myarticles">myarticles</a> is powered by <a href="https://arxiv.org/a/'+arxiv_authorid + '">arXiv author id</a> data';
	html +='</div>';
	//End the container div
	html += "</div>"
	document.getElementById('arxivfeed').innerHTML=html;
}




