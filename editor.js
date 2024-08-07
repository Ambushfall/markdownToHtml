const CSS_LINKS = [`https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css`];

const CHEATSHEET = fetch("https://ambushfall.com/MD_CHEATSHEET.MD").then(res => res.text())

const MD_CFG = {
    // async: true,
    // pedantic: false,
    gfm: true,
    mangle: false,
    headerIds: false
}

marked.use(MD_CFG);

const MD_PARSER = (rawMD) => DOMPurify.sanitize(marked.parse(rawMD));

// Elements
const editorCode = document.getElementById("editorCode");
const editorPreview =
    document.getElementById("editorPreview").contentWindow.document;
const editorCopyButton = document.getElementById("editorCopyClipboard");
const downloadButton = document.getElementById('downloadFile');

if (typeof CSS_LINKS !== 'undefined') {
    CSS_LINKS.forEach(linkURL => {
        const link = document.createElement('link');
        link.href = linkURL;
        link.rel = "stylesheet";
        editorPreview.head.appendChild(link);
    })
}


createEditor(editorCode);

async function createEditor(editorContainer) {
    // console.log(CHEATSHEET)
    let editor = monaco.editor.create(editorContainer, {
        value: typeof CHEATSHEET !== 'undefined' ? await CHEATSHEET : '',
        language: "markdown",
        theme: "vs-dark",
        minimap: { enabled: false },
        automaticLayout: true,
        contextmenu: false,
        fontSize: 16,
        scrollbar: {
            useShadows: false,
            vertical: "visible",
            horizontal: "visible",
            horizontalScrollbarSize: 12,
            verticalScrollbarSize: 12,
        },

    });
    const download = (data, filename, type) => {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    editorPreview.body.innerHTML = MD_PARSER(editor.getValue())

    editor.onDidChangeModelContent(() => {
        editorPreview.body.innerHTML = MD_PARSER(editor.getValue())
    });

    editorCopyButton.onclick = () => {
        // copyToClipboard(editorPreview.body.innerHTML);
        navigator.clipboard.writeText(editorPreview.body.innerHTML)
            .then(() => {
                const editorCopyButtonText = editorCopyButton.innerHTML;
                editorCopyButton.innerHTML = "Copied!";
                editorCopyButton.disabled = true;
                setTimeout(() => {
                    editorCopyButton.disabled = false;
                    editorCopyButton.innerHTML = editorCopyButtonText;
                }, 500);
            })
            .catch(() => {
                alert("something went wrong");
            });

    };
    downloadButton.onclick = () => download(editorPreview.body.innerHTML, 'page', 'text/html')

}