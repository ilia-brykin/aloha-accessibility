let timer = undefined;
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const OBSERVER = new MutationObserver(function(mutations, observer) {
  console.log("timer", timer);
  if (timer) {
    return;
  }
  timer = setTimeout(() => {
    stopObserver();
    console.log("Aloha");
    traverse(window);
    timer = undefined;
    startObserver();
  }, 1000);
});

startObserver();

function startObserver() {
  OBSERVER.observe(document, {
    childList: true,
    subtree: true,
    attributes: true
  });
}

function stopObserver() {
  OBSERVER.disconnect();
}


const TAGS = [
  {
    name: "H1",
    color: "#ff0000",
    insertInParent: false,
  },
  {
    name: "H2",
    color: "#713939",
    insertInParent: false,
  },
  {
    name: "H3",
    color: "#00aa00",
    insertInParent: false,
  },
  {
    name: "H4",
    color: "#054164",
    insertInParent: false,
  },
  {
    name: "H5",
    color: "#7F0A7F",
    insertInParent: false,
  },
  {
    name: "H6",
    color: "#01D901",
    insertInParent: false,
  },
  {
    name: "P",
    color: "#1515C0",
    insertInParent: false,
  },
  {
    name: "B",
    color: "#00D400",
    insertInParent: false,
  },
  {
    name: "I",
    color: "#5A005A",
    insertInParent: false,
  },
  {
    name: "EM",
    color: "#4E6401",
    insertInParent: false,
  },
  {
    name: "TABLE",
    color: "#365F5F",
    insertInParent: true,
  },
  {
    name: "LEGEND",
    color: "#28025D",
    insertInParent: false,
  },
  {
    name: "STRONG",
    color: "#DE1A00",
    insertInParent: false,
  },
  {
    name: "FIELDSET",
    color: "#800000",
    insertInParent: true,
  },
];

function insertTag(w, tag) {
  const CURRENT_TAGS = w.document.getElementsByTagName(tag.name);
  for (let i = 0; i < CURRENT_TAGS.length; i++) {
    if (!tag.insertInParent) {
      CURRENT_TAGS[i].insertBefore(createTag(w,  tag, ""), CURRENT_TAGS[i].firstChild);
      CURRENT_TAGS[i].appendChild(createTag(w,  tag, "/"));
    } else {
      CURRENT_TAGS[i].parentNode.insertBefore(createTag(w,  tag, ""), CURRENT_TAGS[i]);
      CURRENT_TAGS[i].parentNode.insertBefore(createTag(w,  tag, "/"), CURRENT_TAGS[i].nextSibling);
    }
  }
}

function createTag(w, tag, slash) {
  const SPAN = w.document.createElement("span");
  SPAN.className = "a11y_content_structured";
  const STYLE = SPAN.style;
  STYLE.color = tag.color;
  STYLE.backgroundColor = "#fff";
  STYLE.backgroundImage = "none";
  STYLE.fontSize = "14px";
  STYLE.fontWeight = "bold";
  const TEXT_NODE = w.document.createTextNode("<" + slash + tag.name + ">");
  SPAN.insertBefore(TEXT_NODE, SPAN.firstChild);
  return SPAN;
}

function deleteTags(currentWindow) {
  const ALL_TAGS = currentWindow.document.querySelectorAll(".a11y_content_structured");
  ALL_TAGS.forEach(element => {
    element.parentNode.removeChild(element);
  });
}

function traverse(w) {
  try {
    deleteTags(w);
    for (let i = 0; i < TAGS.length; i++) {
      insertTag(w, TAGS[i]);
    }
    for (let i = 0; i < w.frames.length; i++) {
      traverse(w.frames[i]);
    }
  } catch (e) {

  }
}

traverse(window);
