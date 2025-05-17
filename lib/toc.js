/**
 * Extract headings from MDX content
 * @param {string} content - The MDX content
 * @returns {Array} - Array of heading objects with id, text, and level
 */
export function extractHeadings(content) {
  if (!content) return [];

  // Regular expression to match markdown headings (## Heading)
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    headings.push({
      id,
      text,
      level,
    });
  }

  return headings;
}

/**
 * Generate a table of contents from headings
 * @param {Array} headings - Array of heading objects
 * @returns {JSX.Element} - Table of contents component
 */
export function generateTableOfContents(headings) {
  if (!headings || headings.length === 0) {
    return null;
  }

  return {
    headings,
  };
}
