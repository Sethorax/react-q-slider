'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draggableTrack = require('./draggable-track.jsx');

var _draggableTrack2 = _interopRequireDefault(_draggableTrack);

var _slideTrack = require('./slide-track.jsx');

var _slideTrack2 = _interopRequireDefault(_slideTrack);

var _sliderNavigation = require('./slider-navigation.jsx');

var _sliderNavigation2 = _interopRequireDefault(_sliderNavigation);

var _react3 = require('unistore/react');

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Slider Component
 * 
 * This is the main component
 * 
 * @class Slider
 * @extends {React.Component}
 */
var Slider = function (_React$Component) {
    _inherits(Slider, _React$Component);

    function Slider() {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this));

        _this.state = {
            renderChildren: false
        };

        _this.gotoNext = _this.gotoNext.bind(_this);
        _this.gotoPrev = _this.gotoPrev.bind(_this);
        _this.gotoSlide = _this.gotoSlide.bind(_this);
        return _this;
    }

    _createClass(Slider, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.slider = null;

            this.setMaxSlideOffset();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.setMaxSlideOffset();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.children) {
                this.setState({ renderChildren: true });
                this.props.setSlides(this.props.children);
            }
        }
    }, {
        key: 'setMaxSlideOffset',
        value: function setMaxSlideOffset() {
            this.maxSlideOffset = this.props.slides.length - this.props.slidesToShow;
        }
    }, {
        key: 'canGoPrev',
        value: function canGoPrev() {
            return this.props.currentSlide > 0;
        }
    }, {
        key: 'canGoNext',
        value: function canGoNext() {
            return this.props.currentSlide < this.maxSlideOffset;
        }
    }, {
        key: 'gotoNext',
        value: function gotoNext() {
            if (this.props.isFading) return;

            var slidesToAdvance = void 0;

            if (this.props.currentSlide + this.props.slidesToScroll <= this.maxSlideOffset) {
                slidesToAdvance = this.props.slidesToScroll;
            } else if (this.props.rewindOnEnd && this.props.currentSlide === this.maxSlideOffset) {
                slidesToAdvance = this.props.currentSlide * -1;
            } else {
                slidesToAdvance = this.maxSlideOffset - this.props.currentSlide;
            }

            this.props.setCurrentSlide(this.props.currentSlide + slidesToAdvance);
        }
    }, {
        key: 'gotoPrev',
        value: function gotoPrev() {
            if (this.props.isFading) return;

            var slidesToGoBack = void 0;

            if (this.props.currentSlide - this.props.slidesToScroll >= 0) {
                slidesToGoBack = this.props.slidesToScroll;
            } else if (this.props.rewindOnEnd && this.props.currentSlide === 0) {
                slidesToGoBack = this.maxSlideOffset * -1;
            } else {
                slidesToGoBack = this.props.currentSlide;
            }

            this.props.setCurrentSlide(this.props.currentSlide - slidesToGoBack);
        }
    }, {
        key: 'gotoSlide',
        value: function gotoSlide(slideIndex) {
            var returnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (this.props.isFading) return;

            var nextSlide = void 0;

            if (slideIndex < 0) {
                nextSlide = this.props.fade ? this.maxSlideOffset : 0;
            } else if (slideIndex > this.maxSlideOffset) {
                nextSlide = this.props.fade ? 0 : this.maxSlideOffset;
            } else {
                nextSlide = slideIndex;
            }

            if (returnIndex) {
                return nextSlide;
            } else {
                this.props.setCurrentSlide(nextSlide);
            }
        }
    }, {
        key: 'handlePrevClick',
        value: function handlePrevClick() {
            if (this.props.rewindOnEnd || this.canGoPrev()) this.gotoPrev();
        }
    }, {
        key: 'handleNextClick',
        value: function handleNextClick() {
            if (this.props.rewindOnEnd || this.canGoNext()) this.gotoNext();
        }
    }, {
        key: 'getSliderWidth',
        value: function getSliderWidth() {
            return this.slider.getBoundingClientRect().width;
        }
    }, {
        key: 'handleSliderRef',
        value: function handleSliderRef(element) {
            this.slider = element;
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.slides.length > 0 && _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('q-slider__slider', { 'q-slider__slider_is-vertical': this.props.vertical }), ref: this.handleSliderRef.bind(this) },
                _react2.default.createElement(
                    _draggableTrack2.default,
                    {
                        vertical: this.props.vertical,
                        getSliderWidth: this.getSliderWidth.bind(this),
                        slidesToScroll: this.props.slidesToScroll,
                        slidesToShow: this.props.slidesToShow,
                        gotoSlide: this.gotoSlide
                    },
                    _react2.default.createElement(_slideTrack2.default, {
                        vertical: this.props.vertical,
                        fade: this.props.fade,
                        slidesToShow: this.props.slidesToShow,
                        fadeDuration: this.props.fadeDuration
                    })
                ),
                this.props.showArrows && _react2.default.createElement(_sliderNavigation2.default, {
                    onNextClick: this.handleNextClick.bind(this),
                    onPrevClick: this.handlePrevClick.bind(this),
                    nextArrow: this.props.nextArrow,
                    prevArrow: this.props.prevArrow
                })
            );
        }
    }]);

    return Slider;
}(_react2.default.Component);

Slider.propTypes = {
    slidesToShow: _propTypes2.default.number,
    slidesToScroll: _propTypes2.default.number,
    rewindOnEnd: _propTypes2.default.bool,
    fade: _propTypes2.default.bool,
    fadeDuration: _propTypes2.default.number,
    showArrows: _propTypes2.default.bool,
    nextArrow: _propTypes2.default.element,
    prevArrow: _propTypes2.default.element
};

Slider.defaultProps = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    fadeDuration: 500,
    showArrows: true
};

exports.default = (0, _react3.connect)(['slides', 'isGrabbing', 'currentSlide', 'grabbedTrackOffset', 'isFading'], _actions2.default)(Slider);