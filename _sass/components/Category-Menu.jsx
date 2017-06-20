import React, { Component } from 'react';

export default class CategoryMenu extends Component {

  onCategorySelect(e){
    this.props.onSelect(e.target.dataset.code);
  }

  render() {
    var component = this;
    return (
      <div className="category-menu">
        <ul>
        {
          this.props.categories.map((category, index) => {
            return (
              <li
                id={"category-"+category.code}
                key={"menu-item-"+index}
                className={component.props.selectedCategory.code===category.code?"active":""}
                data-code={category.code}
                onClick={(e) => component.onCategorySelect(e)}>{category.localisedName || category.name}</li>);
          })
        }
        </ul>
      </div>);
  }
}
