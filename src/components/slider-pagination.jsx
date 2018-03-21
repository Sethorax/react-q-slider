import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'unistore/react';

class SliderPagination extends React.Component {
    renderPaginationItem(key, isCurrent) {
        const props = {
            key,
            className: classNames('q-slider__pagination-item', { 'q-slider__pagination-item_is-current': isCurrent }),
            onClick: event => this.props.onPaginationItemClick(event, key)
        };

        return this.props.paginationItem ? React.cloneElement(this.props.paginationItem, props) : React.createElement('div', props);
    }

    render() {
        return (
            <div className="q-slider__pagination">
                {this.props.slides.map((slide, index) => this.renderPaginationItem(index, index === this.props.currentSlide))}
            </div>
        );
    }
}

export default connect(['slides', 'currentSlide'])(SliderPagination);