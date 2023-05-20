let CHEATSHEET;

loadMDs('MD_CHEATSHEET.md')

function loadMDs(file) {
    // fetch(`https://raw.githubusercontent.com/Ambushfall/markdownToHtml/master/${file}`).then(res => res.text()).then(data => console.log(data))
    fetch("https://raw.githubusercontent.com/Ambushfall/markdownToHtml/master/MD_CHEATSHEET.MD", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9,hr;q=0.8,sr;q=0.7,bs;q=0.6,ja;q=0.5",
    "cache-control": "max-age=0",
    "if-none-match": "W/\"b25cb6a9d03d66364f7a7fee781310971087cc5604299ae3afd9f15245f1044f\"",
    "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "cross-site",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "https://github.com/Ambushfall/markdownToHtml/blob/master/MD_CHEATSHEET.MD",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}).then(res => res.text()).then(data => console.log(data))
}