const CSS_LINKS = [`https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css`];

const CHEATSHEET = fetch("https://ambushfall-next13-app.vercel.app/MD_CHEATSHEET.MD").then(res => res.text())


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

    editorPreview.body.innerHTML = DOMPurify.sanitize(
        marked.parse(editor.getValue())
    );

    editor.onDidChangeModelContent(() => {
        editorPreview.body.innerHTML = DOMPurify.sanitize(
            marked.parse(editor.getValue())
        );
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