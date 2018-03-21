import React from 'react';
import ReactDOM from 'react-dom';
import QSlider from '../src/index';

ReactDOM.render(
    <QSlider
        slidesToShow={3}
        slidesToScroll={1}
        rewindOnEnd={true}
        onSlideClick={(event, index) => console.log(event)}
        breakpoints={{
            1200: { slidesToShow: 2, slidesToScroll: 2 },
            600: { slidesToShow: 1 }
        }}
    >
        <img src="https://picsum.photos/900/600/?image=174" />
        <img src="https://picsum.photos/900/600/?image=542" />
    </QSlider>
, document.querySelector('.imageslider'));

ReactDOM.render(
    <QSlider
        slidesToShow={1}
        slidesToScroll={1}
        rewindOnEnd={true}
        fade={true}
        fadeDuration={1000}
        autoplay={true}
        breakpoints={{ 1000: { autoplay: false } }}
        slidesHTML={`<img src="https://picsum.photos/900/600/?image=174" /><img src="https://picsum.photos/900/600/?image=542" /><img src="https://picsum.photos/900/600/?image=347" /><img src="https://picsum.photos/900/600/?image=75" />`}
    >
    </QSlider>
, document.querySelector('.imageslider2'));