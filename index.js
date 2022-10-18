const onInit = () => {
    document.getElementById('md').style.resize = 'none'
    document.getElementById('md').style.width = '50rem'
    document.getElementById('md').style.height = '25rem'
    document.getElementById('md').addEventListener('input', (e) => {
        document.getElementById('result').innerHTML = DOMPurify.sanitize(marked.parse(e.target.value));
    });
}

onInit();
// function download

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
