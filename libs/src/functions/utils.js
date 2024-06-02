/**
 * Traverse and process the document and its frames, adding or removing tags and attributes.
 *
 * @param {Object} params - The parameters for processing the document.
 * @param {Array<Object>} params.elements - The elements to process.
 * @param {string} params.className - The class name to use for tagging.
 * @param {boolean} params.shouldShowTags - Whether to show tags or not.
 */
export function traverseDocument({ elements = [], className, shouldShowTags = true } = {}) {
  processWindow({ currentWindow: window, elements, shouldShowTags });

  /**
   * Process a specific window and its frames.
   *
   * @param {Object} params - The parameters for processing the window.
   * @param {Window} params.currentWindow - The current window to process.
   * @param {Array<Object>} params.elements - The elements to process.
   * @param {boolean} params.shouldShowTags - Whether to show tags or not.
   */
  function processWindow({ currentWindow = window, elements = [], shouldShowTags }) {
    removeTags({ currentWindow });
    try {
      if (shouldShowTags) {
        elements.forEach(currentElement => {
          if (currentElement.type === "tag") {
            addCurrentTagToElements({
              currentWindow,
              currentElement,
            });
          } else if (currentElement.type === "attribute") {
            addCurrentAttributeToElements({
              currentWindow,
              currentElement,
            });
          }
        });
      }
      Array.from(currentWindow.frames).forEach(frame => {
        processWindow({ currentWindow: frame, elements, shouldShowTags });
      });
    } catch (error) {
      console.warn(error);
    }

    /**
     * Remove all elements with the specified class name from the current window.
     *
     * @param {Object} params - The parameters for removing tags.
     * @param {Window} params.currentWindow - The current window to process.
     */
    function removeTags({ currentWindow }) {
      const elementsWithClass = currentWindow.document.querySelectorAll(`.${ className }`);
      elementsWithClass.forEach(element => {
        element.remove();
      });
    }

    /**
     * Add tags to elements in the current window.
     *
     * @param {Object} params - The parameters for adding tags.
     * @param {Window} params.currentWindow - The current window to process.
     * @param {Object} params.currentElement - The current element to add tags to.
     */
    function addCurrentTagToElements({ currentWindow, currentElement }) {
      const FOUND_ELEMENTS = currentWindow.document.getElementsByTagName(currentElement.name);
      if (!FOUND_ELEMENTS?.length) {
        return;
      }

      if (currentElement.insertInParent) {
        Array.from(FOUND_ELEMENTS).forEach(element => {
          element.parentNode.insertBefore(createCurrentElement({ currentWindow, currentElement, slash: "" }), element);
          element.parentNode.insertBefore(createCurrentElement({ currentWindow, currentElement, slash: "/" }), element.nextSibling);
        });
      } else {
        Array.from(FOUND_ELEMENTS).forEach(element => {
          element.insertBefore(createCurrentElement({ currentWindow, currentElement, slash: "" }), element.firstChild);
          element.appendChild(createCurrentElement({ currentWindow, currentElement, slash: "/" }));
        });
      }
    }

    /**
     * Add attributes to elements in the current window.
     *
     * @param {Object} params - The parameters for adding attributes.
     * @param {Window} params.currentWindow - The current window to process.
     * @param {Object} params.currentElement - The current element to add attributes to.
     */
    function addCurrentAttributeToElements({ currentWindow, currentElement }) {
      const FOUND_ELEMENTS = currentWindow.document.querySelectorAll(currentElement.selector);

      if (!FOUND_ELEMENTS?.length) {
        return;
      }

      if (currentElement.insertInParent) {
        Array.from(FOUND_ELEMENTS).forEach(element => {
          element.parentNode.insertBefore(createCurrentElement({ currentWindow, currentElement, slash: "" }), element);
        });
      } else {
        Array.from(FOUND_ELEMENTS).forEach(element => {
          element.insertBefore(createCurrentElement({ currentWindow, currentElement, slash: "" }), element.firstChild);
        });
      }
    }

    /**
     * Create a new tag or attribute element.
     *
     * @param {Object} params - The parameters for creating a new element.
     * @param {Window} params.currentWindow - The current window to process.
     * @param {Object} params.currentElement - The current element to create.
     * @param {string} params.slash - The slash to use in the tag text.
     * @returns {HTMLElement} - The created span element.
     */
    function createCurrentElement({ currentWindow, currentElement, slash }) {
      const span = currentWindow.document.createElement("span");
      span.className = className;
      const style = span.style;
      style.color = currentElement.color;
      style.backgroundColor = "#fff";
      style.backgroundImage = "none";
      style.fontSize = currentElement.fontSize || "1.2rem";
      style.fontWeight = "bold";
      style.padding = "0.3rem";
      style.border = `1px solid ${ currentElement.color }`;
      let text = "";
      if (currentElement.type === "tag") {
        text = `<${ slash }${ currentElement.name }>`;
      } else if (currentElement.type === "attribute") {
        text = `${ currentElement.name }`;
      }
      const textNode = currentWindow.document.createTextNode(text);
      span.insertBefore(textNode, span.firstChild);

      return span;
    }
  }
}
