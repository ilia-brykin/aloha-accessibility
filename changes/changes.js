MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const OBSERVER = new MutationObserver(function(mutations, observer) {
  console.log("Aloha");
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
OBSERVER.observe(document, {
  subtree: true,
  attributes: true
});

javascript:(function () {
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
        CURRENT_TAGS[i].insertBefore(cT(w,  tag, ""), CURRENT_TAGS[i].firstChild);
        CURRENT_TAGS[i].appendChild(cT(w,  tag, "/"));
      } else {
        CURRENT_TAGS[i].parentNode.insertBefore(cT(w,  tag, ""), CURRENT_TAGS[i]);
        CURRENT_TAGS[i].parentNode.insertBefore(cT(w,  tag, "/"), CURRENT_TAGS[i].nextSibling);
      }
    }
  }

  function cT(w, tag, slash) {
    const SPAN = w.document.createElement("span");
    var z = SPAN.style;
    z.color = tag.color;
    z.backgroundColor = "#fff";
    z.backgroundImage = "none";
    z.fontSize = "14px";
    z.fontWeight = "bold";
    var tn = w.document.createTextNode("%C2%A0[" + slash + tag.name + "]%C2%A0");
    SPAN.insertBefore(tn, SPAN.firstChild);
    return SPAN;
  }

  function traverse(w) {
    try {
      for (let i = 0; i < TAGS.length; i++)
        insertTag(w, TAGS[i]);
      for (let i = 0; i < w.frames.length; i++)
        traverse(w.frames[i]);
    } catch (e) {

    }
  }

  traverse(window);
})();


javascript:(function(){var to=new Array({n:'H1',c:'#ff0000',p:0},{n:'H2',c:'#713939',p:0},{n:'H3',c:'#00aa00',p:0},{n:'H4',c:'#054164',p:0},{n:'H5',c:'#7F0A7F',p:0},{n:'H6',c:'#01D901',p:0},{n:'P',c:'#1515C0',p:0},{n:'B',c:'#00D400',p:0},{n:'I',c:'#5A005A',p:0},{n:'EM',c:'#4E6401',p:0},{n:'TABLE',c:'#365F5F',p:1},{n:'LEGEND',c:'#28025D',p:0},{n:'STRONG',c:'#DE1A00',p:0},{n:'FIELDSET',c:'#800000',p:1});function%20hT(w,to){var%20t=w.document.getElementsByTagName(to.n);for(var%20i=0;i%3Ct.length;i++){if(to.p==0){t[i].insertBefore(cT(w,to,''),t[i].firstChild);t[i].appendChild(cT(w,to,'/'));}else{t[i].parentNode.insertBefore(cT(w,to,''),t[i]);t[i].parentNode.insertBefore(cT(w,to,'/'),t[i].nextSibling);}}}function%20cT(w,to,slash){var%20s=w.document.createElement('span');var%20z=s.style;z.color=to.c;z.backgroundColor='#fff';z.backgroundImage='none';z.fontSize='14px';z.fontWeight='bold';var%20tn=w.document.createTextNode('%C2%A0['+slash+to.n+']%C2%A0');s.insertBefore(tn,s.firstChild);return%20s;}function%20traverse(w){try{for(var%20i=0;i%3Cto.length;i++)hT(w,to[i]);for(var%20i=0;i%3Cw.frames.length;i++)traverse(w.frames[i]);}catch(e){}}traverse(window);})();
