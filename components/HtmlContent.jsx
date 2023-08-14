import React from 'react';

const HtmlContent = ({ html }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default HtmlContent;