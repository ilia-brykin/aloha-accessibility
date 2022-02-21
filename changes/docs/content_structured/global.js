function addElement() {

  const LI = document.createElement("h3");
  const TEXT = document.createTextNode("New Element");
  LI.insertBefore(TEXT, LI.firstChild);
  document.body.appendChild(LI);
}
