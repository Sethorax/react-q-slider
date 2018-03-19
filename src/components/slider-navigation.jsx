import React from 'react';
import PropTypes from 'prop-types';

class SliderNavigation extends React.Component {
    render() {
        const NextArrow = this.props.nextArrow ? React.cloneElement(this.props.nextArrow, { onClick: this.props.onNextClick }) : <div className="q-slider__arrow q-slider__arrow_next" onClick={this.props.onNextClick}></div>;
        const PrevArrow = this.props.prevArrow ? React.cloneElement(this.props.prevArrow, { onClick: this.props.onPrevClick }) : <div className="q-slider__arrow q-slider__arrow_prev" onClick={this.props.onPrevClick}></div>;

        return (
            <div className="q-slider__navigation">
                {PrevArrow}
                {NextArrow}
            </div>
        );
    }
}

export default SliderNavigation;