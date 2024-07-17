let fb_images = [];
let screen_nav = {};
let started = false;
let ready = false;
let image;

async function loadData(callback) {
    if (started) return;
    started = true;
    fetch('../data/fb_images.json')
        .then((response) => response.json())
        .then((json) => {
            screen_nav = json.screen_nav;
            for (const img of json.images) {
                fb_images.push(img);
                if (img.name == "Start") { image = img; }
            }
            ready = true;
            console.log(ready);
            console.log(image);
        }).then(callback);
}

function loadImage() {
    let imageHtml = '<h2 class="centerlabel">'+ image.name +'</h2><img class="big-image" src="' + image.location + '" alt="' + image.name + '">';
    loadHtmlToElt('main-image-repl',imageHtml);
    let descHtml = '<p>' + image.description + '</p>';
    loadHtmlToElt('main-desc-repl', descHtml);
}

function loadNextImages() {
    const nextImages = fb_images.filter((img)=>screen_nav[image.screen].includes(img.screen));
    let imgHtml = "";
    for (const img of nextImages) {
        if (img == image) continue;
        imgHtml += 
            '<div class="img-select" onclick="changeImage(\'' + img.name + '\')">' +
                '<img class="small-image" src="' + img.location + '" alt="' + img.name + '">' +
                '<h6 class="small-image-lbl">' + img.name + '</h6>' +
            '</div>';
    }
    loadHtmlToElt('next-images-repl',imgHtml);
}

function changeImage(img) {
    image = fb_images.filter((i)=>i.name==img)[0];
    loadImage();
    loadNextImages();
}

async function loadFbPage() {
    loadData(() => {
        loadImage();
        loadNextImages();
    });
}