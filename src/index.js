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
        return (
            <Provider store={createNewStore()}>
                <Slider {...this.props}>
                    {this.props.children}
                </Slider>
            </Provider>
        );    
    }
};