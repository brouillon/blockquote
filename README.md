Blockquote
=======

Blockquote est un plugin pour TinyMCE 4.x, permettant d'insérer facilement une citation en précisant l'auteur et / ou un lien.

Installation
-------

* Plugin externe :
Mettez le dossier blockquote sur votre serveur web
```js
tinymce.init({
	[...]
	external_plugins: {
		"blockquote": "PathToBlockquote/plugin.min.js"
	},
	toolbar: "[...] blockquote",
	[...]
});
```
Remplacez 'PathToBlockquote' par l'adresse du dossier blockquote

* Plugin interne :
Ajoutez le dossier blockquote dans le dossier des plugins de TinyMCE ('tinymce/plugins/')
```js
tinymce.init({
	[...]
	plugins: "[...] blockquote",
	toolbar: "[...] blockquote",
	[...]
});
```

-----------------------------------------------------------------------------

Licence
-------
Blockquote est disponible sous licence GNU LESSER GENERAL PUBLIC LICENSE v3
http://www.gnu.org/licenses/lgpl.html