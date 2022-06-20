// add event listener on select content input
const contentTypeInput = document.getElementById('content-type');
contentTypeInput.addEventListener('change', showHelpInfos);

// initialize contentType globally
let contentType;

function showHelpInfos() { 
    // hide all infos (back to default)
    const contentInfos = document.getElementsByClassName('content-infos');
    for(let i = 0; i < contentInfos.length; i++) {
        contentInfos[i].hidden = true;
    }

    // get contentType value
    contentType = contentTypeInput.value;

    // close help error
    document.getElementById('open-help-error').hidden = true;

    // show contentType infos
    document.getElementById(contentType+'-content-infos').removeAttribute('hidden');
}

// show contentType infos on button click
const openHelpButton = document.getElementById('open-help');
openHelpButton.addEventListener('click', openHelp);
    
function openHelp() {
    if(contentType != null) {
        document.getElementById(contentType+'-content-infos').removeAttribute('hidden');
    }
    else {
        document.getElementById('open-help-error').removeAttribute('hidden');
    }
}

// close contentType infos on button click
const closeHelpButton = document.getElementById('close-help');
closeHelpButton.addEventListener('click', closeHelp);

function closeHelp() {
    document.getElementById(contentType+'-content-infos').hidden = true;
}

// check if contentType corresponds to contentURL
// when contentURLInput changes
let contentURLInput = document.getElementById('content-url');
let contentURL;

contentURLInput.addEventListener('input', checkContentURL)

// check if it corresponds to expected contentType

function checkContentURL() {
    //get contentURL
    contentURL = contentURLInput.value;

    // regex
    const youtubePattern = /^https:\/\/youtu.be\/([a-z0-9-]+)$/i;
    const dailymotionPattern = /^https:\/\/dai.ly\/([a-z0-9]+)$/i;
    const vimeoPattern = /^https:\/\/vimeo.com\/([a-z0-9]+)$/i;
    const creacastPattern = /^https:\/\/www.creacast.com\/.*$/i;

    if(contentType == 'youtube') {
        if(youtubePattern.test(contentURL)) {
            contentURLInput.setCustomValidity("");
        }
        else {
            contentURLInput.setCustomValidity("Invalid field.");
        }
    }
    else if(contentType == 'dailymotion') {
        if(dailymotionPattern.test(contentURL)) {
            contentURLInput.setCustomValidity("");
        }
        else {
            contentURLInput.setCustomValidity("Invalid field.");
        }
    }
    else if(contentType == 'vimeo') {
        if(vimeoPattern.test(contentURL)) {
            contentURLInput.setCustomValidity("");
        }
        else {
            contentURLInput.setCustomValidity("Invalid field.");
        }
    }
    else {
        if(creacastPattern.test(contentURL)) {
            contentURLInput.setCustomValidity("");
        }
        else {
            contentURLInput.setCustomValidity("Invalid field.");
        }
    }
}

// add event listener on form
const form = document.getElementById('form');
form.addEventListener('submit', generateCode);

// generate code
function generateCode(event) {
    event.preventDefault();

    // get content type
    const contentType = document.getElementById('content-type').value; 

    // get content URL
    contentURL = document.getElementById('content-url').value;

    // get content id

    function getContentId() {
        let n;

        if(contentType == 'youtube') {
            n = contentURL.replace('https://youtu.be/', '');
        }
        else if(contentType == 'dailymotion') {
            n = contentURL.replace('https://dai.ly/', '');
        }
        else if(contentType == 'vimeo') {
            n = contentURL.replace('https://vimeo.com/', '');
        }
        else {
            n = null;
        }

        return n;
    }
    
    const contentId = getContentId();

    // get content title
    const contentTitle = document.getElementById('content-title').value;

    // get content size
    const contentSize = document.getElementById('content-size').value;

    // get / set content margin
    const isCentered = document.getElementById('content-center');

    isCentered.addEventListener('change', switchEvent);

    function switchEvent() {
        let n;

        if (isCentered.checked) {
            n = 'margin: auto; ';
          } else {
            n = '';
          }

        return n;
    }

    const contentMargin = switchEvent();

    // generate code

    function generateCode() {
        let n;

        if(contentType == 'youtube' || contentType == 'dailymotion' || contentType == 'vimeo') {
            n = '<style>.iframe-container {'+contentMargin+'max-width: '+contentSize+'px; width: 100%;} .iframe-container__wrapper {position: relative; overflow: hidden; width: 100%; padding-top: 56.25%;} .responsive-iframe {position: absolute; top: 0; left: 0; bottom: 0; right: 0;}</style><div class="iframe-container"><div class="iframe-container__wrapper"><div class="'+contentType+'_player responsive-iframe" videoID="'+contentId+'" width="100%" height="100%" title="'+contentTitle+' (Vidéo '+contentType+')"></div></div></div>';
        }
        else {
            n = '<style>.iframe-container {'+contentMargin+'max-width: '+contentSize+'px; width: 100%;} .iframe-container__wrapper {position: relative; overflow: hidden; width: 100%; padding-top: 56.25%;} .responsive-iframe {position: absolute; top: 0; left: 0; bottom: 0; right: 0;}</style><div class="iframe-container"><div class="iframe-container__wrapper"><iframe class="responsive-iframe" src="'+contentURL+'" width="100%" height="100%" title="'+contentTitle+' (player vidéo)" allowfullscreen frameborder="0"></iframe</div></div>';
        }

        return n;
    }

    const generatedCode = generateCode();

    // insert code
    const codeBlock = document.getElementById('code');
    codeBlock.textContent = generatedCode;

    // create preview
    const preview = document.getElementById('preview');

    function createPreview() {
        let n;

        if(contentType == 'youtube') {
            n = 'https://www.youtube.com/embed/';
        }
        else if(contentType == 'dailymotion') {
            n = 'https://www.dailymotion.com/embed/video/';
        }
        else if(contentType == 'vimeo') {
            n = 'https://player.vimeo.com/video/';
        }
        else {
            n = contentURL;
        }

        return n;
    }

    const contentPreviewURL = createPreview()+contentId;

    const previewCode = '<style>.iframe-container {'+contentMargin+'max-width: '+contentSize+'px; width: 100%;} .iframe-container__wrapper {position: relative; overflow: hidden; width: 100%; padding-top: 56.25%;} .responsive-iframe {position: absolute; top: 0; left: 0; bottom: 0; right: 0;}</style><div class="iframe-container"><div class="iframe-container__wrapper"><iframe class="responsive-iframe" src="'+contentPreviewURL+'" width="100%" height="100%" allowfullscreen frameborder="0"></iframe</div></div>';

    preview.innerHTML = previewCode;

    // show result code
    const result = document.getElementById('result');
    result.removeAttribute('hidden');
}

// copy generated code
const copyButton = document.querySelector("#copy-btn");
copyButton.addEventListener("click", copyGeneratedCode);

function copyGeneratedCode() {
    // get generated code
    var copyText = document.getElementById('code');
    // copy code
    navigator.clipboard.writeText(copyText.textContent);
    // change copy button to "copied!"
    copyButton.textContent = 'Copié !';
}
  
// clear all data
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', function clearData() {
    location.reload();
});
