export function traverse(tags = [], className, stop = false) {
  traverseNew(window, tags, stop);

  function traverseNew(currentWindow = window, tags = [], stop) {
    deleteTags(currentWindow);
    try {
      if (!stop) {
        for (let i = 0; i < tags.length; i++) {
          insertTag(currentWindow, tags[i]);
        }
      }
      for (let i = 0; i < currentWindow.frames.length; i++) {
        traverseNew(currentWindow.frames[i], tags, stop);
      }
    } catch (e) {
      console.warn(e);
    }

    function deleteTags(currentWindow) {
      const ALL_TAGS = currentWindow.document.querySelectorAll(`.${ className }`);
      ALL_TAGS.forEach(element => {
        element.parentNode.removeChild(element);
      });
    }

    function insertTag(w, tag) {
      const CURRENT_TAGS = w.document.getElementsByTagName(tag.name);
      for (let i = 0; i < CURRENT_TAGS.length; i++) {
        if (!tag.insertInParent) {
          CURRENT_TAGS[i].insertBefore(createTag(w, tag, ""), CURRENT_TAGS[i].firstChild);
          CURRENT_TAGS[i].appendChild(createTag(w, tag, "/"));
        } else {
          CURRENT_TAGS[i].parentNode.insertBefore(createTag(w, tag, ""), CURRENT_TAGS[i]);
          CURRENT_TAGS[i].parentNode.insertBefore(createTag(w, tag, "/"), CURRENT_TAGS[i].nextSibling);
        }
      }
    }

    function createTag(w, tag, slash) {
      const SPAN = w.document.createElement("span");
      SPAN.className = className;
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
  }
}
