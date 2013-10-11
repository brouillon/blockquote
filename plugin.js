/*
* blockquote plugin
* v1.0
* Written by brouillon
* https://github.com/brouillon/blockquote
* Date 09/10/2013
* Released under LGPL License.
*/
tinymce.PluginManager.requireLangPack('blockquote');
tinymce.PluginManager.add('blockquote', function(editor) {

	var selectedNode 	= false,
		hadSelection	= false,
		settings 		= {};

	function showDialog() {

		var selection 			= editor.selection,
			dom 				= editor.dom,
			selectionContent 	= selection.getContent(),
			child,
			i,
			a;

		settings = {
			quote: 		'',
			author: 	'',
			linkLabel:	'',
			linkUrl:	''
		};

		selectedNode = selection.getNode();

		//there is no selection
		if (selectedNode.nodeName == 'BODY' && selectionContent.length == 0) {
			hadSelection = false;
		}
		else {
			hadSelection = true;
			//try to find a blockquote
			try {
				while (dom.getParent(selectedNode).parentNode)
				{
					if (selectedNode.nodeName == 'BLOCKQUOTE') {
						for (i = 0; i < selectedNode.childNodes.length; i++)
						{
							child = selectedNode.childNodes[ i ];
							if (child.nodeName != 'CITE') {
								settings.quote += child.textContent;
							} else {
								//search for link
								a = child.getElementsByTagName('a');
								if (a.length > 0) {
									settings.linkUrl = a[0].href;
									settings.linkLabel = a[0].textContent;
								}
								//store author
								settings.author = child.textContent;
								//remove link
								if (settings.linkLabel != '') {
									settings.author = settings.author.replace(settings.linkLabel, '');
								}
							}
						}
						break;
					}
					selectedNode = dom.getParent(selectedNode).parentNode;
				}
			} catch(e) {
				//Reset selection node
				selectedNode = selection.getNode();
				if (selectedNode.nodeName == 'BODY') {
					selectedNode = selection.getSelectedBlocks();
					settings.quote = selectionContent.replace(/<br \/>/g, "\r\n").replace(/<\/p>/g, "\r\n").replace(/(<[^>]*>)/g, '').replace(/&nbsp;/g, '');
				}
				else {
					selectedNode = dom.getParent(selection.getNode());
					settings.quote = selectedNode.innerHTML.replace(/<br \/>/g, "\r\n").replace(/(<[^>]*>)/g, '').replace(/&nbsp;/g, '');
				}
			}
		}

		editor.windowManager.open({
			title: 'Quote',
			data: settings,
			body: [
				{
					type: 'label',
					text: 'Quote :'
				},
				{
					name: 'quote',
					type: 'textbox',
					minHeight: 150,
					minWidth: 500,
					multiline: true
				},
				{
					type: 'label',
					text: 'Cite :'
				},
				{
					name: 'author',
					type: 'textbox'
				},
				{
					type: 'label',
					text: 'Link label :'
				},
				{
					name: 'linkLabel',
					type: 'textbox'
				},
				{

					type: 'label',
					text: 'Link url :'
				},
				{
					name: 'linkUrl',
					type: 'textbox'
				}
			],
			onsubmit: function(e) {

				var quote 		= e.data.quote.replace(/(\r|\r\n|\n)/g, '<br />'),
					author 		= e.data.author,
					linkLabel 	= e.data.linkLabel,
					linkUrl 	= e.data.linkUrl;

				author 		= (author != '') ? author + ' ' : '';
				linkLabel 	= (linkLabel != '') ? linkLabel : linkUrl;
				linkLabel 	= (linkUrl != '') ? '<a href="'+linkUrl+'">'+linkLabel+'</a>' : '';

				if (author != '' || linkLabel != '' || linkUrl != '') {
					author = '<cite>'+author+linkLabel+'</cite>';
				}

				//if there was a selection before open
				if (hadSelection == true) {
					//remove content
					editor.dom.remove(selectedNode);
				}

				//append new content into tinyMCE
				editor.insertContent('<blockquote><p>'+quote+'</p>'+author+'</blockquote><p>&nbsp;</p>', {format: 'raw'});

			}
		});
	}
	editor.addButton('blockquote', {
		icon: 'blockquote',
		tooltip: 'Insert Quote',
		onclick: function() {
			showDialog();
        }
	});
    editor.addMenuItem('blockquote', {
        text: 'Quote',
		icon: 'blockquote',
        context: 'insert',
        onclick: function() {
			showDialog();
        }
    });
});