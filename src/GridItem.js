export const GridItem = (src, alt, id) => {
  if(!src) return null;

  const divClasses = 'grid-gallery-item';
  const imageClasses = 'wp-image-' + id + ' grid-gallery-image'

  if(alt) {
    return (
      <div className={ divClasses }>
        <img
          className={ imageClasses }
          src={ src }
          data-id={ id }
          alt={ alt }
        />
      </div>
    );
  }

  // No alt set, so let's hide it from screen readers
  return (
    <div className={ divClasses }>
      <img
        className={ imageClasses }
        src={ src }
        data-id={ id }
        alt=""
        aria-hidden="true"
      />
    </div>
  );
};