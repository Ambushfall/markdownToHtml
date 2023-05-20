let CHEATSHEET;

loadMDs('MD_CHEATSHEET.md')

function loadMDs(file) {
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", file, true);
    txtFile.onreadystatechange = function () {
        if (txtFile.readyState === 4) { // Makes sure the document is ready to parse.
            if (txtFile.status === 200) { // Makes sure the file exists.
                allText = txtFile.responseText;
                //lines = txtFile.responseText.split("\n"); // Will separate each line into an array
                //var customTextElement2 = document.getElementById('f0');
                //customTextElement2.innerHTML = txtFile.responseText;



                var parsed = DOMPurify.sanitize(
                    marked.parse(txtFile.responseText)
                ) // parsed is a 'Node' tree

                CHEATSHEET = parsed
            }
        }
    }
    txtFile.send(null);

}