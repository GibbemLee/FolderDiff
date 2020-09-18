This is Folder Diff program.

How To Use

[cmd input mode]
1. node main_input.js 
2. enter the 3 folder name. target folder, compare folder, and result saved folder. if you don't want to save results, then empty the saved folder.
4. show the result.
	△	: same file(folder). executed the 'diff'.
	++	: added file(folder).
	--	: deleted file(folder).
5. the detail diff result is in the saved folder. file name in this folder is the path of the target file.
	△	: same contents.
	++	: added.
	--	: deleted.

[server mode]
1. node server.js
2. connect 'localhost:8888' (if you want to change the port, you can modify at server.js)
3. enter the 3 folder name. target folder, compare folder, and result saved folder. if you don't want to save results, then empty the saved folder.
4. click 'diff' button.
5. show the result.