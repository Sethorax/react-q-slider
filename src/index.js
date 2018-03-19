import React from 'react';
import Slider from './components/slider.jsx';
import { Provider } from 'unistore/react';
import { createNewStore } from './store';
import './styles.scss';

/**
 * Export Slider and initialize new store
 * 
 * @export
 * @class QSlider
 * @extends {React.Component}
 */
export default class QSlider extends React.Component {
    render() {
        const props = {
            ...this.props,
            slidesToScroll: this.props.fade ? 1 : this.props.slidesToScroll,
            slidesToShow: this.props.fade ? 1 : this.props.slidesToShow
        };

        return (
            <Provider store={createNewStore()}>
                <Slider {...props}>
                    {this.props.children}
                </Slider>
            </Provider>
        );    
    }
};