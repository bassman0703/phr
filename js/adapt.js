$(document).ready(function(){

    $('#adjust').on('click', function (e) {
        e.preventDefault()
        var element = document.querySelector("body");
        element.classList.toggle("adjust-background");

        var element1 = document.querySelector(".page-header__middle");
        element1.classList.toggle("adjust-background");

        var element2 = document.querySelector(".form--search");
        element2.classList.toggle("adjust-background");
        var element3 = document.querySelector(".lang-li");
        element3.classList.toggle("adjust-background");
        var element4 = document.querySelector(".lang-a");
        element4.classList.toggle("adjust-background");
        var element5 = document.querySelector(".lang-b");
        element5.classList.toggle("adjust-background");
        var element6 = document.querySelector(".border-lang");
        element6.classList.toggle("adjust-background");

    })

    $('#font').on('click', function (e) {
        e.preventDefault()
        var element = document.querySelector("html");
        element.classList.toggle("adjust-font-size");
        var element1 = document.querySelector("card-title");
        element.classList.toggle("adjust-font-size");
        var element2 = document.querySelector(".sidebar ul li");
        element.classList.toggle("adjust-font-size");
    })



});


var workerLink = window.location.origin + '/espeak/espeak.worker.js';
var soundLink = window.location.origin + '/espeak/church-schellingwoude.ogg';

function initApp() {
    function Espeak(worker_path, ready_cb) {
        this.worker = new Worker(worker_path);
        this.ready = false;
        this.worker.onmessage = function (e) {
            if (e.data !== 'ready') return;
            this.worker.onmessage = null;
            this.worker.addEventListener('message', this);
            this.ready = true;
            if (ready_cb) {
                ready_cb();
            }
        }.bind(this);
    }

    Espeak.prototype.handleEvent = function (evt) {
        var callback = evt.data.callback;
        if (callback && this[callback]) {
            this[callback].apply(this, evt.data.result);
            if (evt.data.done) delete this[callback];
            return;
        }
    };

    function _createAsyncMethod(method) {
        return function () {
            var lastArg = arguments[arguments.length - 1];
            var message = {method: method, args: Array.prototype.slice.call(arguments, 0)};
            if (typeof lastArg == 'function') {
                var callback = '_' + method + '_' + Math.random().toString().substring(2) + '_cb';
                this[callback] = lastArg;
                message.args.pop();
                message.callback = callback;
            }
            this.worker.postMessage(message);
        };
    }

    var _arr = ['listVoices', 'get_rate', 'get_pitch', 'set_rate', 'set_pitch', 'setVoice', 'synth'];
    for (var _i = 0; _i < _arr.length; _i++) {
        var method = _arr[_i];
        Espeak.prototype[method] = _createAsyncMethod(method);
    }

    /* An audio node that can have audio chunks pushed to it */

    function PushAudioNode(context, start_callback, end_callback) {
        this.start_callback = start_callback;
        this.end_callback = end_callback;
        this.samples_queue = [];
        this.context = context;
        this.scriptNode = context.createScriptProcessor(1024, 1, 1);
        this.connected = false;
        this.sinks = [];
        this.startTime = 0;
        this.closed = false;
        this.track_callbacks = new Map();
    }

    PushAudioNode.prototype.push = function (chunk) {
        if (this.closed) throw "can't push more chunks after node was closed";
        this.samples_queue.push(chunk);
        if (!this.connected) {
            if (!this.sinks.length) throw "No destination set for PushAudioNode";
            this._do_connect();
        }
    };

    PushAudioNode.prototype.close = function () {
        this.closed = true;
    };

    PushAudioNode.prototype.connect = function (dest) {
        this.sinks.push(dest);
        if (this.samples_queue.length) {
            this._do_connect();
        }
    };

    PushAudioNode.prototype._do_connect = function () {
        if (this.connected) return;
        this.connected = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.sinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var dest = _step.value;

                this.scriptNode.connect(dest);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.scriptNode.onaudioprocess = this.handleEvent.bind(this);
    };

    PushAudioNode.prototype.disconnect = function () {
        this.scriptNode.onaudioprocess = null;
        this.scriptNode.disconnect();
        this.connected = false;
    };

    PushAudioNode.prototype.addTrackCallback = function (aTimestamp, aCallback) {
        var callbacks = this.track_callbacks.get(aTimestamp) || [];
        callbacks.push(aCallback);
        this.track_callbacks.set(aTimestamp, callbacks);
    };

    PushAudioNode.prototype.handleEvent = function (evt) {
        if (!this.startTime) {
            this.startTime = evt.playbackTime;
            if (this.start_callback) {
                this.start_callback();
            }
        }

        var currentTime = evt.playbackTime - this.startTime;
        var playbackDuration = this.scriptNode.bufferSize / this.context.sampleRate;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.track_callbacks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var entry = _step2.value;

                var timestamp = entry[0];
                var callbacks = entry[1];
                if (timestamp < currentTime) {
                    this.track_callbacks.delete(timestamp);
                } else if (timestamp < currentTime + playbackDuration) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = callbacks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var cb = _step3.value;

                            cb();
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    this.track_callbacks.delete(timestamp);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var offset = 0;
        while (this.samples_queue.length && offset < evt.target.bufferSize) {
            var chunk = this.samples_queue[0];
            var to_copy = chunk.subarray(0, evt.target.bufferSize - offset);
            if (evt.outputBuffer.copyToChannel) {
                evt.outputBuffer.copyToChannel(to_copy, 0, offset);
            } else {
                evt.outputBuffer.getChannelData(0).set(to_copy, offset);
            }
            offset += to_copy.length;
            chunk = chunk.subarray(to_copy.length);
            if (chunk.length) this.samples_queue[0] = chunk; else this.samples_queue.shift();
        }

        if (!this.samples_queue.length && this.closed) {
            if (this.end_callback) {
                this.end_callback(evt.playbackTime - this.startTime);
            }
            this.disconnect();
        }
    };

    // MAIN JS

    var espeak;
    var pusher;
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var convolver = ctx.createConvolver();
    convolver.connect(ctx.destination);

    this.stop = function () {
        if (pusher) {
            pusher.disconnect();
            pusher = null;
        }
    };

    this.speak = function (value, preach) {
        this.stop();

        var now = Date.now();
        var samples_queue = [];

        espeak.set_rate(135);
        espeak.set_pitch(50);
        espeak.setVoice('ka+f5');

        pusher = new PushAudioNode(ctx, function () {
            console.log('started!', ctx.currentTime, pusher.startTime);
        }, function () {
            console.log('ended!', ctx.currentTime - pusher.startTime);
        });

        if (preach) {
            pusher.connect(convolver);
        } else {
            pusher.connect(ctx.destination);
        }

        espeak.synth(value, function (samples, events) {
            if (!samples) {
                pusher.close();
                return;
            }

            pusher.push(new Float32Array(samples));

            if (now) {
                console.log('latency:', Date.now() - now);
                now = 0;
            }
        });
    };

    // INIT
    espeak = new Espeak(workerLink, function cb() {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', soundLink, true);
        xhr.responseType = 'arraybuffer';

        function convolverLoadFail(e) {
            console.log("Error with decoding audio data", e);
            document.getElementById('preachit').disabled = true;
            document.body.classList.remove('loading');
        }

        xhr.onerror = convolverLoadFail;

        xhr.onload = function () {
            var audioData = xhr.response;
            ctx.decodeAudioData(audioData, function (buffer) {
                convolver.buffer = buffer;
                document.body.classList.remove('loading');
            }, convolverLoadFail);
        };
        xhr.send();
    });
}

jQuery(document).ready(function ($) {
    $.ajax(workerLink);
    $.ajax(soundLink);

    var app;
    var isLoaded = false;
    var isMuted = false;
    var microphoneOn = '/themes/images/microphone.svg';
    var microphoneOff = '/themes/images/microphone-muted.svg';
    var elements = ['.news_title', '.logo a', '.slogan', '.nav-item' , '.info-ul li', 'block-header', '.donate-btn','.card-title h5', '.carousel-caption']
    $('body').on('focus', elements.join(','), function (e) {
        var text = e.target.title || e.target.innerText;

        if (isLoaded && !isMuted) {
            app.speak(text);
        }
    })

    $('.js-toggle-sound').on('click', function (event) {
        event.preventDefault();

        if ($(this).hasClass('init')) {
            $(this).removeClass('init').addClass('stop');
            app = new initApp();
            isLoaded = true;
        } else {
            if ($(this).hasClass('stop')) {
                isMuted = true;
                app.stop();
                $(this).removeClass('stop').addClass('start');
            } else {
                isMuted = false;
                $(this).removeClass('start').addClass('stop');
            }
        }
    });
});

