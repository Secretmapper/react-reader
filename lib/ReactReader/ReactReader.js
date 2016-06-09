'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('..');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactReader = function (_Component) {
  _inherits(ReactReader, _Component);

  function ReactReader(props) {
    _classCallCheck(this, ReactReader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactReader).call(this, props));

    var location = _this.props.location;

    _this.state = {
      expanedToc: false,
      toc: false,
      location: location
    };
    return _this;
  }

  _createClass(ReactReader, [{
    key: 'toggleToc',
    value: function toggleToc() {
      this.setState({
        expanedToc: !this.state.expanedToc
      });
    }
  }, {
    key: 'next',
    value: function next() {
      this.refs.reader.nextPage();
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.refs.reader.prevPage();
    }
  }, {
    key: 'onTocChange',
    value: function onTocChange(toc) {
      var tocChanged = this.props.tocChanged;

      this.setState({
        toc: toc
      }, function () {
        return tocChanged && tocChanged(toc);
      });
    }
  }, {
    key: 'onLocationChange',
    value: function onLocationChange(loc) {
      var locationChanged = this.props.locationChanged;

      return locationChanged && locationChanged(loc);
      /* Should we update location?
      this.setState({
        location: loc
      }, () => locationChanged && locationChanged(loc))
      */
    }
  }, {
    key: 'renderToc',
    value: function renderToc() {
      var _this2 = this;

      var toc = this.state.toc;
      var styles = this.props.styles;

      return _react2.default.createElement(
        'div',
        { style: styles.tocArea },
        _react2.default.createElement(
          'div',
          { style: styles.toc },
          toc.map(function (item, i) {
            return _react2.default.createElement(
              'button',
              { key: item.href, onClick: _this2.setLocation.bind(_this2, item.href), style: styles.tocAreaButton },
              item.label
            );
          })
        )
      );
    }
  }, {
    key: 'setLocation',
    value: function setLocation(loc) {
      this.setState({
        location: loc,
        expanedToc: false
      });
    }
  }, {
    key: 'renderTocToggle',
    value: function renderTocToggle() {
      var expanedToc = this.state.expanedToc;
      var styles = this.props.styles;

      return _react2.default.createElement(
        'button',
        { style: Object.assign({}, styles.tocButton, expanedToc ? styles.tocButtonExpaned : {}), onClick: this.toggleToc.bind(this) },
        _react2.default.createElement('span', { style: Object.assign({}, styles.tocButtonBar, styles.tocButtonBarTop) }),
        _react2.default.createElement('span', { style: Object.assign({}, styles.tocButtonBar, styles.tocButtonBottom) })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var url = _props.url;
      var title = _props.title;
      var showToc = _props.showToc;
      var loadingView = _props.loadingView;
      var _state = this.state;
      var toc = _state.toc;
      var location = _state.location;
      var expanedToc = _state.expanedToc;
      var styles = this.props.styles;

      return _react2.default.createElement(
        'div',
        { style: styles.container },
        _react2.default.createElement(
          'div',
          { style: Object.assign({}, styles.readerArea, expanedToc ? styles.containerExpaned : {}) },
          showToc && this.renderTocToggle(),
          _react2.default.createElement(
            'div',
            { style: styles.titleArea },
            title
          ),
          _react2.default.createElement(
            'div',
            { style: styles.reader },
            _react2.default.createElement(_.EpubView, {
              ref: 'reader',
              url: url,
              location: location,
              loadingView: loadingView,
              tocChanged: this.onTocChange.bind(this),
              locationChanged: this.onLocationChange.bind(this)
            })
          ),
          _react2.default.createElement(
            'button',
            { style: Object.assign({}, styles.arrow, styles.prev), onClick: this.prev.bind(this) },
            '‹'
          ),
          _react2.default.createElement(
            'button',
            { style: Object.assign({}, styles.arrow, styles.next), onClick: this.next.bind(this) },
            '›'
          )
        ),
        showToc && toc && this.renderToc()
      );
    }
  }]);

  return ReactReader;
}(_react.Component);

var LoadingView = function (_Component2) {
  _inherits(LoadingView, _Component2);

  function LoadingView() {
    _classCallCheck(this, LoadingView);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LoadingView).apply(this, arguments));
  }

  _createClass(LoadingView, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: _style2.default.loadingView },
        'Loading…'
      );
    }
  }]);

  return LoadingView;
}(_react.Component);

ReactReader.defaultProps = {
  loadingView: _react2.default.createElement(LoadingView, null),
  locationChanged: null,
  tocChanged: null,
  showToc: true,
  styles: _style2.default
};

ReactReader.propTypes = {
  title: _react.PropTypes.string,
  loadingView: _react.PropTypes.element,
  url: _react.PropTypes.string,
  showToc: _react.PropTypes.bool,
  location: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  locationChanged: _react.PropTypes.func,
  tocChanged: _react.PropTypes.func,
  styles: _react.PropTypes.object
};

exports.default = ReactReader;