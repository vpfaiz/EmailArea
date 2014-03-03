EmailArea
=========

Converts email addresses in your Text Area to email tags after validation.

![notes marker](http://i.imgur.com/PtslZgP.png)
![notes marker](http://i.imgur.com/oSmSehe.png)

Web visitors can either type in the emails or paste a large list. You can configure delimiters (, ; \n) for separating emails.

###[Demo] (http://jsfiddle.net/vpfaiz/pD49Q/)

Note
----
HTML/Javascript/CSS is not my primary field. This is something that I created as part of a project. Thought of sharing it with you.. Will be willing to learn from you Gurus out there but please do not expect high quality stuff here. I have done some fair testing on this but use it on your own risk... :)

Usage
-----
```JavaScript
emailArea($("#textAreaID"), [',',';',' ']);
```
1. First parameter is the JQuery object for TextArea element that you want to convert to EmailArea
2. Second optional parameter is the array of separators that you want to use to separate email addresses as you type in. The default set is ``` [',',';','\r','\n',' '] ```.

Useful information
------------------
- Your TextArea's ID and name will be changed, item will be hidden ($.hide) and a new text area with same ID and name will be created for use in forms. The control will also copy styles from your TextArea item (most of them).
- It uses a code (function isValidEmail) from SO user **aSeptik (http://stackoverflow.com/a/2855946/82961)** for email validation. You may want to change this with your own function (even change it to validate something other than email)
