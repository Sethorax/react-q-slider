import React from 'react';
import { connect } from 'unistore/react';
import actions from '../actions';
import Util from '../utils';

/**
 * @todo Move option-type props to the store
 * 
 * @class DraggableTrack
 * @extends {React.Component}
 */
class DraggableTrack extends React.Component {
    componentWillMount() {
        this.grabbedStartingX = 0;
    }

    handleMouseTouchDown(event) {
        const clientX = Util.getClientPosFromTouchOrMouseEvent(event, this.props.vertical);

        this.grabbedStartingX = clientX;
        this.props.setGrabbingState(true);
    }

    handleMouseTouchMove(event) {
        if (!this.props.isGrabbing) return;

        const clientX = Util.getClientPosFromTouchOrMouseEvent(event, this.props.vertical);
        const distance = (this.grabbedStartingX - clientX) * 100 / this.props.getSliderWidth();
        this.props.setGrabbedTrackOffset(distance);
    }

    handleMouseTouchUp() {
        this.grabbedStartingX = 0;

        let draggedSlides = parseFloat(this.props.grabbedTrackOffset) / (100 / parseInt(this.props.slidesToShow));
        draggedSlides = (draggedSlides > 0) ? Math.ceil(draggedSlides) : Math.floor(draggedSlides);

        if (draggedSlides !== 0) {
            this.props.gotoSlide(this.props.currentSlide + draggedSlides);
        }
        this.props.setGrabbedTrackOffset(0);
        this.props.setGrabbingState(false);
    }

    render() {
        return (
            <div
                className="q-slider__draggable-track"
                onMouseDown={this.handleMouseTouchDown.bind(this)}
                onTouchStart={this.handleMouseTouchDown.bind(this)}
                onMouseMove={this.handleMouseTouchMove.bind(this)}
                onTouchMove={this.handleMouseTouchMove.bind(this)}
                onMouseUp={this.handleMouseTouchUp.bind(this)}
                onMouseOut={this.handleMouseTouchUp.bind(this)}
                onTouchEnd={this.handleMouseTouchUp.bind(this)}
            >
                {this.props.children}
            </div>
        );
    }
}

export default connect(['isGrabbing', 'grabbedTrackOffset', 'currentSlide'], actions)(DraggableTrack);