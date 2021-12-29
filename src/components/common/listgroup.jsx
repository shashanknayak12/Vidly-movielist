import React, { Component } from 'react';
const ListGroup = (props) => {
    const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props
    return (

        <ul className="list-group">
            {items.map(item =>
                <li
                    style={{ cursor: 'pointer' }}
                    key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                    className={item === selectedItem ? "list-group-item active" : "list-group-item"}>
                    {item[textProperty]}
                </li>)}

        </ul>
    )
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;