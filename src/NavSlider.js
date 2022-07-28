function NavSlider(props) {
  return (
    <>
      <div
        onMouseEnter={() => props.onMouseEnter()}
        onMouseLeave={() => props.onMouseLeave()}
        className={`${props.name}-slider-pointer`}
      ></div>
      <div
        onMouseEnter={() => props.onMouseEnter()}
        onMouseLeave={() => props.onMouseLeave()}
        className={`${props.name}-slider`}
      >
        {props.sections.map(section =>
          section === 'Categories' ? (
            <label
              onMouseEnter={() => props.showCategories()}
              onMouseLeave={() => props.removeCategories()}
            >
              {section}
            </label>
          ) : (
            <label>{section}</label>
          )
        )}
      </div>
      {props.isCategories && (
        <div
          onMouseEnter={() => {
            props.showCategories();
            props.onMouseEnter();
          }}
          onMouseLeave={() => {
            props.removeCategories();
            props.onMouseLeave();
          }}
          className={`${props.categoryName}-slider`}
        >
          {props.categoriesSections.map(category => (
            <label>{category}</label>
          ))}
        </div>
      )}
    </>
  );
}

export default NavSlider;
