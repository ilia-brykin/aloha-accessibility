// (function(arr) {
//   arr.forEach(function(item) {
//     if (item.hasOwnProperty("prepend")) {
//       return;
//     }
//     Object.defineProperty(item,"prepend",{
//       configurable:true,
//       enumerable:true,
//       writable:true,
//       value: function prepend() {
//         const argArr = Array.prototype.slice.call(arguments);
//         const docFrag = document.createDocumentFragment();
//         argArr.forEach(function(argItem) {
//           const isNode = argItem instanceof Node;
//           docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
//         });
//         this.insertBefore(docFrag, this.firstChild);
//       }
//     });
//   });
// })([
//   Element.prototype,
//   Document.prototype,
//   DocumentFragment.prototype,
// ]);
// (function(){
//   const css = "html{background-color:#333;color:#ddd;}a {color:#cde;}";
//   frame(document);
//   function frame(d){
//     const style = d.createElement("style");
//     style.className = "wcagstyle";
//     const styleContent = d.createTextNode(css);
//     style.appendChild(styleContent);
//     d.getElementsByTagName("head")[0].prepend(style);
//     const elem = d.querySelectorAll("iframe,frame");
//     for(let i=0;i<elem.length;i++){
//       d = elem[i].contentWindow.document;
//       frame(d);
//     }
//   }
// })();
//
// console.log("chrome", chrome);

// let timer = undefined;
// MutationObserver = window.MutationObserver;
//
// const OBSERVER = new MutationObserver(() => {
//   console.log("timer", timer);
//   if (timer) {
//     return;
//   }
//   timer = setTimeout(() => {
//     stopObserver();
//     console.log("Aloha");
//     // traverse(window);
//     timer = undefined;
//     startObserver();
//   }, 1000);
// });
//
// function startObserver() {
//   OBSERVER.observe(document, {
//     childList: true,
//     subtree: true,
//     attributes: true
//   });
// }
//
// function stopObserver() {
//   OBSERVER.disconnect();
// }
