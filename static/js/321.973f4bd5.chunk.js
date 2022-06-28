/*! For license information please see 321.973f4bd5.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[321],{49105:function(e,t,n){var o=n(34807);e.exports=function(e){return o(e)||"function"===typeof e||Array.isArray(e)}},34807:function(e,t,n){var o=n(68863);function i(e){return!0===o(e)&&"[object Object]"===Object.prototype.toString.call(e)}e.exports=function(e){var t,n;return!1!==i(e)&&("function"===typeof(t=e.constructor)&&(!1!==i(n=t.prototype)&&!1!==n.hasOwnProperty("isPrototypeOf")))}},68863:function(e){e.exports=function(e){return null!=e&&"object"===typeof e&&!1===Array.isArray(e)}},27373:function(e,t,n){var o=n(49105);e.exports=function(e,t,n){if(!o(e))return{};"function"===typeof t&&(n=t,t=[]),"string"===typeof t&&(t=[t]);for(var i="function"===typeof n,r=Object.keys(e),s={},u=0;u<r.length;u++){var a=r[u],c=e[a];t&&(-1!==t.indexOf(a)||i&&!n(c,a,e))||(s[a]=c)}return s}},77021:function(e,t,n){n.d(t,{Z:function(){return N}});var o=n(72791),i=n(52007),r=n.n(i),s=n(31725),u=n.n(s),a=n(27373),c=n.n(a),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var h=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=t}return l(e,[{key:"getDocumentRelativeElementOffset",value:function(e){var t=this.getRootOfEl(e).getBoundingClientRect(),n=t.left,o=t.top,i=e.getBoundingClientRect(),r=i.left,s=i.top;return{x:Math.abs(n)+r,y:Math.abs(o)+s}}},{key:"getRootOfEl",value:function(e){return e.parentElement?this.getRootOfEl(e.parentElement):e}},{key:"getComputedElementRelativeCursorPosition",value:function(e,t){this.lastEvent=e;var n=this.getDocumentRelativeCursorPosition(e),o=n.x,i=n.y,r=t.x,s=t.y;return{x:Math.round(o-r),y:Math.round(i-s)}}},{key:"getDocumentRelativeCursorPosition",value:function(e){return{x:e.pageX,y:e.pageY}}},{key:"getCursorPosition",value:function(e){return this.getComputedElementRelativeCursorPosition(e,this.documentRelativeElementOffset)}},{key:"documentRelativeElementOffset",get:function(){return this.elementOffset||(this.elementOffset=this.getDocumentRelativeElementOffset(this.el)),this.elementOffset}}]),e}();function f(e,t,n,o){return e.addEventListener(t,n,o),{removeEventListener:function(){e.removeEventListener(t,n,o)}}}var v="touch",p="tap",y="press",d="click",b="hover",m=function(){},g=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();function E(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var C=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.onIsActiveChanged;if(E(this,e),"function"!==typeof n)throw new Error("onIsActiveChanged should be a function");this.onIsActiveChanged=n,this.isActive=!1,this.timers=[]}return g(e,[{key:"activate",value:function(){this.isActive=!0,this.onIsActiveChanged({isActive:!0})}},{key:"deactivate",value:function(){this.isActive=!1,this.onIsActiveChanged({isActive:!1}),this.clearTimers()}},{key:"toggleActivation",value:function(){this.isActive?this.deactivate():this.activate()}},{key:"clearTimers",value:function(){for(var e=this.timers;e.length;){var t=e.pop();clearTimeout(t.id)}}},{key:"clearTimer",value:function(e){this.timers.forEach((function(t){t.name===e&&clearTimeout(t.id)}))}}]),e}(),T=C,O=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var M=function(e){function t(e){var n=e.onIsActiveChanged;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{onIsActiveChanged:n}));return o.initialElTop=0,o.currentElTop=0,o}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),O(t,[{key:"touchStarted",value:function(){}},{key:"touchMoved",value:function(){}},{key:"touchEnded",value:function(){this.deactivate()}},{key:"touchCanceled",value:function(){this.deactivate()}}]),t}(T),k=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var w=function(e){function t(e){var n=e.onIsActiveChanged,o=e.pressDurationInMs,i=e.pressMoveThreshold;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{onIsActiveChanged:n}));return r.pressDurationInMs=o,r.pressMoveThreshold=i,r}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),k(t,[{key:"touchStarted",value:function(e){var t=e.position;this.initPressEventCriteria(t),this.setPressEventTimer()}},{key:"touchMoved",value:function(e){var t=e.position;this.isActive||this.setPressEventCriteria(t)}},{key:"setPressEventTimer",value:function(){var e=this;this.timers.push({name:"pressEvent",id:setTimeout((function(){Math.abs(e.currentElTop-e.initialElTop)<e.pressMoveThreshold&&e.activate()}),this.pressDurationInMs)})}},{key:"setPressEventCriteria",value:function(e){this.currentElTop=e.y}},{key:"initPressEventCriteria",value:function(e){var t=e.y;this.initialElTop=t,this.currentElTop=t}}]),t}(M),P=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var A=function(e){function t(e){var n=e.onIsActiveChanged;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{onIsActiveChanged:n}))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),P(t,[{key:"touchStarted",value:function(e){e.e.preventDefault(),this.activate()}}]),t}(M),D=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var I=function(e){function t(e){var n=e.onIsActiveChanged,o=e.tapDurationInMs,i=e.tapMoveThreshold;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{onIsActiveChanged:n}));return r.hasTapGestureEnded=!1,r.tapDurationInMs=o,r.tapMoveThreshold=i,r}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),D(t,[{key:"touchStarted",value:function(e){var t=e.position;this.hasTapGestureEnded=!1,this.initMoveThreshold(t),this.setTapEventTimer()}},{key:"touchMoved",value:function(e){var t=e.position;this.isActive||this.setMoveThresholdCriteria(t)}},{key:"touchEnded",value:function(){this.hasTapGestureEnded=!0}},{key:"setTapEventTimer",value:function(){var e=this;this.timers.push({name:"tap",id:setTimeout((function(){e.isTapGestureActive&&e.toggleActivation()}),this.tapDurationInMs)})}},{key:"setMoveThresholdCriteria",value:function(e){this.currentElTop=e.y}},{key:"initMoveThreshold",value:function(e){var t=e.y;this.initialElTop=t,this.currentElTop=t}},{key:"hasPassedMoveThreshold",get:function(){return Math.abs(this.currentElTop-this.initialElTop)>this.tapMoveThreshold}},{key:"isTapGestureActive",get:function(){return!this.hasPassedMoveThreshold&&this.hasTapGestureEnded}}]),t}(M),_=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var j=function(e){function t(e){var n=e.onIsActiveChanged;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{onIsActiveChanged:n}))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),_(t,[{key:"mouseEntered",value:function(){}},{key:"mouseMoved",value:function(){}},{key:"mouseLeft",value:function(){}},{key:"mouseClicked",value:function(){}}]),t}(T),S=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var R=function(e){function t(e){var n=e.onIsActiveChanged,o=e.hoverDelayInMs,i=e.hoverOffDelayInMs;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{onIsActiveChanged:n}));return r.hoverDelayInMs=o,r.hoverOffDelayInMs=i,r}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),S(t,[{key:"mouseEntered",value:function(){this.clearTimers(),this.schedulActivation(this.hoverDelayInMs)}},{key:"mouseLeft",value:function(){this.clearTimers(),this.scheduleDeactivation(this.hoverOffDelayInMs)}},{key:"schedulActivation",value:function(e){var t=this,n=setTimeout((function(){t.activate()}),e);this.timers.push({id:n,name:"setHovering"})}},{key:"scheduleDeactivation",value:function(e){var t=this,n=setTimeout((function(){t.deactivate()}),e);this.timers.push({id:n,name:"unsetHovering"})}}]),t}(j),x=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var L=function(e){function t(e){var n=e.onIsActiveChanged;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{onIsActiveChanged:n}))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),x(t,[{key:"mouseClicked",value:function(){this.toggleActivation()}}]),t}(j),G=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var Z=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return B.call(n),n.state={detectedEnvironment:{isMouseDetected:!1,isTouchDetected:!1},elementDimensions:{width:0,height:0},isActive:!1,isPositionOutside:!0,position:{x:0,y:0}},n.shouldGuardAgainstMouseEmulationByDevices=!1,n.eventListeners=[],n.timers=[],n.elementOffset={x:0,y:0},n.onTouchStart=n.onTouchStart.bind(n),n.onTouchMove=n.onTouchMove.bind(n),n.onTouchEnd=n.onTouchEnd.bind(n),n.onTouchCancel=n.onTouchCancel.bind(n),n.onMouseEnter=n.onMouseEnter.bind(n),n.onMouseMove=n.onMouseMove.bind(n),n.onMouseLeave=n.onMouseLeave.bind(n),n.onClick=n.onClick.bind(n),n.onIsActiveChanged=n.onIsActiveChanged.bind(n),n.setTouchActivationStrategy(e.activationInteractionTouch),n.setMouseActivationStrategy(e.activationInteractionMouse),n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),G(t,[{key:"onIsActiveChanged",value:function(e){e.isActive?this.activate():this.deactivate()}},{key:"onTouchStart",value:function(e){this.init(),this.onTouchDetected(),this.setShouldGuardAgainstMouseEmulationByDevices();var t=this.core.getCursorPosition(this.getTouchEvent(e));this.setPositionState(t),this.touchActivation.touchStarted({e:e,position:t})}},{key:"onTouchMove",value:function(e){if(this.isCoreReady){var t=this.core.getCursorPosition(this.getTouchEvent(e));this.touchActivation.touchMoved({e:e,position:t}),this.state.isActive&&(this.setPositionState(t),e.preventDefault(),this.props.shouldStopTouchMovePropagation&&e.stopPropagation())}}},{key:"onTouchEnd",value:function(){this.touchActivation.touchEnded(),this.unsetShouldGuardAgainstMouseEmulationByDevices()}},{key:"onTouchCancel",value:function(){this.touchActivation.touchCanceled(),this.unsetShouldGuardAgainstMouseEmulationByDevices()}},{key:"onMouseEnter",value:function(e){this.shouldGuardAgainstMouseEmulationByDevices||(this.init(),this.onMouseDetected(),this.setPositionState(this.core.getCursorPosition(e)),this.mouseActivation.mouseEntered())}},{key:"onMouseMove",value:function(e){if(this.isCoreReady){var t=this.core.getCursorPosition(e);this.setPositionState(t),this.mouseActivation.mouseMoved(t)}}},{key:"onMouseLeave",value:function(){this.mouseActivation.mouseLeft(),this.setState({isPositionOutside:!0})}},{key:"onClick",value:function(e){this.setPositionState(this.core.getCursorPosition(e)),this.mouseActivation.mouseClicked(),this.onMouseDetected()}},{key:"onTouchDetected",value:function(){var e={isTouchDetected:!0,isMouseDetected:!1};this.setState({detectedEnvironment:e}),this.props.onDetectedEnvironmentChanged(e)}},{key:"onMouseDetected",value:function(){var e={isTouchDetected:!1,isMouseDetected:!0};this.setState({detectedEnvironment:e}),this.props.onDetectedEnvironmentChanged(e)}},{key:"componentDidMount",value:function(){this.props.isEnabled&&this.enable()}},{key:"componentWillReceiveProps",value:function(e){var t=e.isEnabled;this.props.isEnabled!==t&&(t?this.enable():this.disable())}},{key:"componentWillUnmount",value:function(){this.disable()}},{key:"enable",value:function(){this.addEventListeners()}},{key:"disable",value:function(){this.removeEventListeners()}},{key:"init",value:function(){this.core=new h(this.el),this.setElementDimensionsState(this.getElementDimensions(this.el))}},{key:"setTouchActivationStrategy",value:function(e){var t=this.props,n=t.pressDurationInMs,o=t.pressMoveThreshold,i=t.tapDurationInMs,r=t.tapMoveThreshold;switch(e){case y:this.touchActivation=new w({onIsActiveChanged:this.onIsActiveChanged,pressDurationInMs:n,pressMoveThreshold:o});break;case p:this.touchActivation=new I({onIsActiveChanged:this.onIsActiveChanged,tapDurationInMs:i,tapMoveThreshold:r});break;case v:this.touchActivation=new A({onIsActiveChanged:this.onIsActiveChanged});break;default:throw new Error("Must implement a touch activation strategy")}}},{key:"setMouseActivationStrategy",value:function(e){var t=this.props,n=t.hoverDelayInMs,o=t.hoverOffDelayInMs;switch(e){case b:this.mouseActivation=new R({onIsActiveChanged:this.onIsActiveChanged,hoverDelayInMs:n,hoverOffDelayInMs:o});break;case d:this.mouseActivation=new L({onIsActiveChanged:this.onIsActiveChanged});break;default:throw new Error("Must implement a mouse activation strategy")}}},{key:"reset",value:function(){var e=this.core,t=(e=void 0===e?{}:e).lastEvent;this.init(),t&&this.setPositionState(this.core.getCursorPosition(t))}},{key:"activate",value:function(){this.setState({isActive:!0}),this.props.onActivationChanged({isActive:!0})}},{key:"deactivate",value:function(){var e=this;this.setState({isActive:!1},(function(){var t=e.state,n=t.isPositionOutside,o=t.position;e.props.onPositionChanged({isPositionOutside:n,position:o}),e.props.onActivationChanged({isActive:!1})}))}},{key:"setPositionState",value:function(e){var t=this.getIsPositionOutside(e);this.setState({isPositionOutside:t,position:e},this.onPositionChanged)}},{key:"setElementDimensionsState",value:function(e){this.setState({elementDimensions:e})}},{key:"setShouldGuardAgainstMouseEmulationByDevices",value:function(){this.shouldGuardAgainstMouseEmulationByDevices=!0}},{key:"unsetShouldGuardAgainstMouseEmulationByDevices",value:function(){var e=this;this.timers.push({name:"mouseEmulation",id:setTimeout((function(){e.shouldGuardAgainstMouseEmulationByDevices=!1}),0)})}},{key:"getElementDimensions",value:function(e){var t=e.getBoundingClientRect();return{width:t.width,height:t.height}}},{key:"getIsPositionOutside",value:function(e){var t=e.x,n=e.y,o=this.state.elementDimensions,i=o.width,r=o.height;return t<0||n<0||t>i||n>r}},{key:"getTouchEvent",value:function(e){return e.touches[0]}},{key:"getIsReactComponent",value:function(e){return"function"===typeof e.type}},{key:"shouldDecorateChild",value:function(e){return!!e&&this.getIsReactComponent(e)&&this.props.shouldDecorateChildren}},{key:"decorateChild",value:function(e,t){return(0,o.cloneElement)(e,t)}},{key:"decorateChildren",value:function(e,t){var n=this;return o.Children.map(e,(function(e){return n.shouldDecorateChild(e)?n.decorateChild(e,t):e}))}},{key:"addEventListeners",value:function(){this.eventListeners.push(f(this.el,"touchstart",this.onTouchStart,{passive:!1}),f(this.el,"touchmove",this.onTouchMove,{passive:!1}),f(this.el,"touchend",this.onTouchEnd),f(this.el,"touchcancel",this.onTouchCancel),f(this.el,"mouseenter",this.onMouseEnter),f(this.el,"mousemove",this.onMouseMove),f(this.el,"mouseleave",this.onMouseLeave),f(this.el,"click",this.onClick))}},{key:"removeEventListeners",value:function(){for(;this.eventListeners.length;)this.eventListeners.pop().removeEventListener()}},{key:"getPassThroughProps",value:function(){var e=Object.keys(this.constructor.propTypes);return c()(this.props,e)}},{key:"render",value:function(){var e=this,t=this.props,n=t.children,i=t.className,r=t.mapChildProps,s=t.style,a=u()({},r(this.state),this.getPassThroughProps());return o.createElement("div",{className:i,ref:function(t){return e.el=t},style:u()({},s,{WebkitUserSelect:"none"})},this.decorateChildren(n,a))}},{key:"isCoreReady",get:function(){return!!this.core}}]),t}(o.Component);Z.displayName="ReactCursorPosition",Z.propTypes={activationInteractionMouse:r().oneOf([d,b]),activationInteractionTouch:r().oneOf([y,p,v]),children:r().any,className:r().string,hoverDelayInMs:r().number,hoverOffDelayInMs:r().number,isEnabled:r().bool,mapChildProps:r().func,onActivationChanged:r().func,onDetectedEnvironmentChanged:r().func,onPositionChanged:r().func,pressDurationInMs:r().number,pressMoveThreshold:r().number,shouldDecorateChildren:r().bool,shouldStopTouchMovePropagation:r().bool,style:r().object,tapDurationInMs:r().number,tapMoveThreshold:r().number},Z.defaultProps={activationInteractionMouse:b,activationInteractionTouch:y,hoverDelayInMs:0,hoverOffDelayInMs:0,isEnabled:!0,mapChildProps:function(e){return e},onActivationChanged:m,onDetectedEnvironmentChanged:m,onPositionChanged:m,pressDurationInMs:500,pressMoveThreshold:5,shouldDecorateChildren:!0,shouldStopTouchMovePropagation:!1,tapDurationInMs:180,tapMoveThreshold:5};var B=function(){var e=this;this.onPositionChanged=function(){(0,e.props.onPositionChanged)(e.state)}},N=Z},43668:function(e,t,n){n.d(t,{Z:function(){return a}});var o=n(61120),i=n(78814);function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}var s=n(97326);function u(e,t){if(t&&("object"===r(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return(0,s.Z)(e)}function a(e){var t=(0,i.Z)();return function(){var n,i=(0,o.Z)(e);if(t){var r=(0,o.Z)(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return u(this,n)}}},61120:function(e,t,n){function o(e){return o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},o(e)}n.d(t,{Z:function(){return o}})},60136:function(e,t,n){n.d(t,{Z:function(){return i}});var o=n(89611);function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&(0,o.Z)(e,t)}},78814:function(e,t,n){function o(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}n.d(t,{Z:function(){return o}})},98737:function(e,t,n){n.d(t,{Z:function(){return u}});var o=n(61120),i=n(89611);var r=n(78814);function s(e,t,n){return s=(0,r.Z)()?Reflect.construct:function(e,t,n){var o=[null];o.push.apply(o,t);var r=new(Function.bind.apply(e,o));return n&&(0,i.Z)(r,n.prototype),r},s.apply(null,arguments)}function u(e){var t="function"===typeof Map?new Map:void 0;return u=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!==typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return s(e,arguments,(0,o.Z)(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),(0,i.Z)(r,e)},u(e)}}}]);
//# sourceMappingURL=321.973f4bd5.chunk.js.map