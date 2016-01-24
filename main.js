panel.onclick = function(event) {
    var firstPage = 1;

    if (event.target.getAttribute('data-index') === 'next-dots') {
        pageNumber = Math.floor((paginatedContent.length - pageNumber) / 2) + pageNumber;
    } else if (event.target.getAttribute('data-index') === 'prev-dots') {
        pageNumber = Math.floor((pageNumber - 1) / 2) + firstPage;
    } else {
        pageNumber = Number(event.target.getAttribute('data-index'));
    }
    clearItems(items);
    addContentToPage(paginateContent(arrangedContent)[pageNumber]);
    clearItems(panel);
    showPaginationPanel(pageNumber);
};

var arrangedContent = [],
    perPage = 20, // it might be whatever value you want
    totalItems = 400, // it might be whatever value you want
    pageNumber = 0,  //default index for page number
    paginatedContent = [];

window.onload = function() {
    for (var i = 0; i < totalItems; i++) {
        arrangedContent.push({
            id: i + 1,
            postName: 'name'
        })
    }

    addContentToPage(paginateContent(arrangedContent)[pageNumber]);
    showPaginationPanel(pageNumber);
};

function addContentToPage(content) {
    //document fragment in order to draw dom once
    var docfrag = document.createDocumentFragment();

    for (var i = 0; i < content.length; i++) {
        var div = document.createElement('div');
        div.innerHTML = content[i].id + " " + content[i].postName;
        docfrag.appendChild(div);
    }
    items.appendChild(docfrag);
}

function paginateContent(content) {
    while(content.length > 0) {
        paginatedContent.push(content.splice(0, perPage));
    }
    return paginatedContent;
}

function showPaginationPanel(index) {
    var lastFiveElements = paginatedContent.length - 5;

    if (index < 5 && index !== 4) {
        showFirstTemplate(index);
    } else if ((index >= 5 && index < lastFiveElements) || (index === 4 || index === lastFiveElements)) {
        showSecondTemplate(index);
    } else if (index >= lastFiveElements) {
        showThirdTemplate(index);
    }
}

function clearItems(items) {
    items.innerHTML = '';
}

function showFirstTemplate(index) {
    var lastIndex = paginatedContent.length - 1,
        docfrag = document.createDocumentFragment();

    for (var i = 0; i < 5; i++) {
        var span = document.createElement('span');

        span.innerHTML = i + 1;
        span.setAttribute('data-index', i);
        span.className =  i === index ? 'link active' : 'link';
        docfrag.appendChild(span);
    }

    var threeDots = document.createElement('span');
    threeDots.innerHTML = '...';
    threeDots.setAttribute('data-index', 'next-dots');
    threeDots.className = 'link';
    docfrag.appendChild(threeDots);

    var lastElement = document.createElement('span');
    lastElement.innerHTML = lastIndex + 1;
    lastElement.setAttribute('data-index', lastIndex);
    lastElement.className = 'link';
    docfrag.appendChild(lastElement);

    panel.appendChild(docfrag);
}

function showSecondTemplate(index) {
    var lastIndex = paginatedContent.length - 1,
        prevIndex = index - 1,
        nextIndex = index + 1,
    //document fragment in order to draw dom once
        docfrag = document.createDocumentFragment(),
        range = 3; //length of brougham

    var span = document.createElement('span');
    span.innerHTML = 1;
    span.setAttribute('data-index', 0);
    span.className = 'link';
    docfrag.appendChild(span);

    var threeDots = document.createElement('span');
    threeDots.innerHTML = '...';
    threeDots.setAttribute('data-index', 'prev-dots');
    threeDots.className = 'link';
    docfrag.appendChild(threeDots);

    for (var i = 0; i < range; i++) {
        var page = document.createElement('span');
        if (i === 0) {
            page.innerHTML = prevIndex + 1;
            page.setAttribute('data-index', prevIndex);
        } else if (i === 1) {
            page.innerHTML = index + 1;
            page.setAttribute('data-index', index);
        } else if (i === 2) {
            page.innerHTML = nextIndex + 1;
            page.setAttribute('data-index', nextIndex);
        }
        page.className = i === 1 ? 'link active' : 'link';
        docfrag.appendChild(page);
    }

    var nextDots = document.createElement('span');
    nextDots.innerHTML = '...';
    nextDots.setAttribute('data-index', 'next-dots');
    nextDots.className = 'link';
    docfrag.appendChild(nextDots);

    var lastElement = document.createElement('span');
    lastElement.innerHTML = lastIndex + 1;
    lastElement.setAttribute('data-index', lastIndex);
    lastElement.className = 'link';
    docfrag.appendChild(lastElement);

    panel.appendChild(docfrag);
}

function showThirdTemplate(index) {
    var lastIndex = paginatedContent.length - 1,
        lastFiveElements = paginatedContent.length - 5,
    //document fragment in order to draw dom once
        docfrag = document.createDocumentFragment();

    var firstElement = document.createElement('span');
    firstElement.innerHTML = 1;
    firstElement.setAttribute('data-index', 0);
    firstElement.className = 'link';
    docfrag.appendChild(firstElement);

    var threeDots = document.createElement('span');
    threeDots.innerHTML = '...';
    threeDots.setAttribute('data-index', 'prev-dots');
    threeDots.className = 'link';
    docfrag.appendChild(threeDots);

    for (var i = lastFiveElements; i <= lastIndex; i++) {
        var span = document.createElement('span');

        span.innerHTML = i + 1;
        span.setAttribute('data-index', i);
        span.className =  i === index ? 'link active' : 'link';
        docfrag.appendChild(span);
    }
    panel.appendChild(docfrag);
}

