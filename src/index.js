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
    constructor(props) {
        super(props);

        const initialProps = {
            ...props,
            slidesToScroll: props.fade ? 1 : props.slidesToScroll,
            slidesToShow: props.fade ? 1 : props.slidesToShow
        };

        this.state = {
            ready: false,
            initialProps: {...initialProps},
            currentProps: initialProps
        };
    }

    componentDidMount() {
        this.watchBreakpoints();
    }

    watchBreakpoints() {
        if (this.props.breakpoints) {
            const onMediaQueryChange = (mediaQuery, settings) => {
                if (!mediaQuery.matches) return;
                
                let newProps = (settings !== null) ? settings : this.state.initialProps;
                this.setState({ currentProps: Object.assign(this.state.currentProps, newProps) });
            };

            const registerMediaQuery = (queryString, settings) => {
                const mediaQuery = window.matchMedia(queryString);
                mediaQuery.addListener(() => onMediaQueryChange(mediaQuery, settings));
                onMediaQueryChange(mediaQuery, settings);
            }

            let lastBreakpoint = -1;
            const breakpoints = Object.keys(this.props.breakpoints).sort((a, b) => a - b);
            breakpoints.forEach((key, index) => {
                registerMediaQuery(`(min-width: ${parseInt(lastBreakpoint) + 1}px) and (max-width: ${key}px)`, this.props.breakpoints[key]);
                lastBreakpoint = key;
            });

            registerMediaQuery(`(min-width: ${parseInt(lastBreakpoint) + 1}px)`, null);
        }

        this.setState({ ready: true });
    }

    render() {
        return (
            this.state.ready && (
                <Provider store={createNewStore()}>
                    <Slider {...this.state.currentProps}>
                        {this.props.children}
                    </Slider>
                </Provider>
            )
        );    
    }
};