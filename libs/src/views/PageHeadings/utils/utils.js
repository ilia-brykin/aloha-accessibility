export function utilsHeading({ collect = false, analyze = false }) {
  if (analyze) {
    const result = analyzeHeadings();
    chrome.runtime.sendMessage({ type: "HEADINGS_ANALYZED", result });
    return;
  }

  if (collect) {
    const result = collectHeadings();
    chrome.runtime.sendMessage({ type: "HEADINGS_COLLECTED", result });
  }

  /**
   * Generates a unique CSS selector for a given element.
   * @param {HTMLElement} element - The element to generate the selector for.
   * @returns {string} - The unique CSS selector.
   */
  function generateUniqueSelector(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error("Invalid element provided.");
    }

    const parts = [];

    while (element.parentElement) {
      let selector = element.tagName.toLowerCase();

      if (element.id) {
        selector += `#${ element.id }`;
        parts.unshift(selector);
        break;
      } else {
        let sibling = element;
        let nthChild = 1;
        while (sibling.previousElementSibling) {
          sibling = sibling.previousElementSibling;
          if (sibling.tagName.toLowerCase() === selector) {
            nthChild++;
          }
        }
        selector += `:nth-of-type(${ nthChild })`;
      }
      parts.unshift(selector);
      element = element.parentElement;
    }

    return parts.join(" > ");
  }

  function collectHeadings() {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6, [role='heading']"));

    return headings.map(heading => {
      let level;
      if (heading.tagName.toLowerCase().startsWith("h") && heading.tagName.length === 2) {
        level = parseInt(heading.tagName[1], 10);
      } else if (heading.getAttribute("role") === "heading" && heading.hasAttribute("aria-level")) {
        level = parseInt(heading.getAttribute("aria-level"), 10);
      }

      const rect = heading.getBoundingClientRect();
      const isVisible = rect.width > 0 && rect.height > 0;

      let ariaHidden = false;
      let currentElement = heading;
      while (currentElement) {
        if (currentElement.getAttribute("aria-hidden") === "true") {
          ariaHidden = true;
          break;
        }
        currentElement = currentElement.parentElement;
      }

      const id = heading.getAttribute("id") || undefined;
      const className = heading.getAttribute("class") || undefined;
      const ariaLevel = heading.getAttribute("aria-level") || undefined;
      const role = heading.getAttribute("role") || undefined;
      const ariaLabel = heading.getAttribute("aria-label") || undefined;
      const ariaDescribedBy = heading.getAttribute("aria-describedby") || undefined;
      const title = heading.getAttribute("title") || undefined;

      // Collect other attributes
      const otherAttributes = {};
      Array.from(heading.attributes).forEach(attr => {
        const name = attr.name;
        if (!["id", "class", "aria-level", "role", "aria-label", "aria-describedby", "title"].includes(name)) {
          otherAttributes[name] = attr.value;
        }
      });

      // Get inner HTML and text with tags
      const html = heading.innerHTML;
      const text = heading.innerText || heading.textContent;
      const textWithTags = `<${ heading.tagName.toLowerCase() }${ role ? ` role="${ role }"` : "" }${ ariaLevel ? ` aria-level="${ ariaLevel }"` : "" }>${ text }</${ heading.tagName.toLowerCase() }>`;

      // Generate unique selector
      const uniqueSelector = generateUniqueSelector(heading);

      return {
        element: heading,
        text: text,
        tag: heading.tagName.toLowerCase(),
        level: level,
        isVisible: isVisible,
        ariaHidden: ariaHidden,
        id: id,
        class: className,
        ariaLevel: ariaLevel,
        role: role,
        ariaLabel: ariaLabel,
        ariaDescribedBy: ariaDescribedBy,
        title: title,
        otherAttributes: otherAttributes,
        html: html,
        textWithTags: textWithTags,
        uniqueSelector: uniqueSelector,
      };
    });
  }

  /**
   * Analyzes the accessibility of headings in the document.
   * Checks for the following issues:
   * - Incorrect heading order.
   * - Heading levels greater than 6.
   * - Multiple level 1 headings.
   * - Visibility and ARIA hidden attributes (as warnings).
   * @returns {Object} An object containing arrays of errors and warnings.
   * - {Array<string>} errors: An array of error messages.
   * - {Array<string>} warnings: An array of warning messages.
   */
  function analyzeHeadings() {
    const ERROR_WARNING_TEXTS = {
      levelGreater6: "_ERROR_HEADER_GREATER_6_{{text}}_",
      multipleLevel1: "_ERROR_HEADER_MULTIPLE_LEVEL_1_{{text}}_",
      headingOrder: "_ERROR_HEADER_HEADING_ORDER_{{text}}_",
      displayNone: "_WARNING_HEADER_DISPLAY_NONE_{{text}}_",
      ariaHidden: "_WARNING_HEADER_ARIA_HIDDEN_{{text}}_",
    };
    const headings = collectHeadings();
    const errors = [];
    const warnings = [];
    let lastLevel = 0;
    let h1Count = 0;

    headings.forEach(heading => {
      const {
        level,
        isDisplayNone,
        ariaHidden,
      } = heading;

      // Check if the heading level is greater than 6
      if (level > 6) {
        errors.push({
          key: ERROR_WARNING_TEXTS.levelGreater6,
          text: heading.text,
        });
      }

      // Check if there are multiple level 1 headings
      if (level === 1) {
        h1Count++;
        if (h1Count > 1) {
          errors.push({
            key: ERROR_WARNING_TEXTS.multipleLevel1,
            text: heading.text,
          });
        }
      }

      // Check for incorrect heading order
      if (level > lastLevel + 1) {
        errors.push({
          key: ERROR_WARNING_TEXTS.headingOrder,
          text: heading.text,
        });
      }

      // Check if the heading is not visible
      if (isDisplayNone) {
        warnings.push({
          key: ERROR_WARNING_TEXTS.displayNone,
          text: heading.text,
        });
      }

      // Check if the heading is hidden with aria-hidden
      if (ariaHidden) {
        warnings.push({
          key: ERROR_WARNING_TEXTS.ariaHidden,
          text: heading.text,
        });
      }

      lastLevel = level;
    });

    return { errors, warnings };
  }
}

