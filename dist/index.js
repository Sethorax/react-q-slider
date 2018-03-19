'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _slider = require('./components/slider.jsx');

var _slider2 = _interopRequireDefault(_slider);

var _react3 = require('unistore/react');

var _store = require('./store');

require('./styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Export Slider and initialize new store
 * 
 * @export
 * @class QSlider
 * @extends {React.Component}
 */
var QSlider = function (_React$Component) {
    _inherits(QSlider, _React$Component);

    function QSlider(props) {
        _classCallCheck(this, QSlider);

        var _this = _possibleConstructorReturn(this, (QSlider.__proto__ || Object.getPrototypeOf(QSlider)).call(this, props));

        var initialProps = _extends({}, props, {
            slidesToScroll: props.fade ? 1 : props.slidesToScroll,
            slidesToShow: props.fade ? 1 : props.slidesToShow
        });

        _this.state = {
            ready: false,
            initialProps: _extends({}, initialProps),
            currentProps: initialProps
        };
        return _this;
    }

    _createClass(QSlider, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.watchBreakpoints();
        }
    }, {
        key: 'watchBreakpoints',
        value: function watchBreakpoints() {
            var _this2 = this;

            if (this.props.breakpoints) {
                var onMediaQueryChange = function onMediaQueryChange(mediaQuery, settings) {
                    if (!mediaQuery.matches) return;

                    var newProps = settings !== null ? settings : _this2.state.initialProps;
                    _this2.setState({ currentProps: Object.assign(_this2.state.currentProps, newProps) });
                };

                var registerMediaQuery = function registerMediaQuery(queryString, settings) {
                    var mediaQuery = window.matchMedia(queryString);
                    mediaQuery.addListener(function () {
                        return onMediaQueryChange(mediaQuery, settings);
                    });
                    onMediaQueryChange(mediaQuery, settings);
                };

                var lastBreakpoint = -1;
                var breakpoints = Object.keys(this.props.breakpoints).sort(function (a, b) {
                    return a - b;
                });
                breakpoints.forEach(function (key, index) {
                    registerMediaQuery('(min-width: ' + (parseInt(lastBreakpoint) + 1) + 'px) and (max-width: ' + key + 'px)', _this2.props.breakpoints[key]);
                    lastBreakpoint = key;
                });

                registerMediaQuery('(min-width: ' + (parseInt(lastBreakpoint) + 1) + 'px)', null);
            }

            this.setState({ ready: true });
        }
    }, {
        key: 'render',
        value: function render() {
            return this.state.ready && _react2.default.createElement(
                _react3.Provider,
                { store: (0, _store.createNewStore)() },
                _react2.default.createElement(
                    _slider2.default,
                    this.state.currentProps,
                    this.props.children
                )
            );
        }
    }]);

    return QSlider;
}(_react2.default.Component);

exports.default = QSlider;
;