/**

 stepper.js - Copyright 2023 Harshad Joshi and Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/


module.exports = function(RED) {
    function StepperNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.from = Number(config.from);
        node.to = Number(config.to);
        node.step = Number(config.step);
        node.duration = Number(config.duration);
        node.currentValue = node.from;
        var intervalId = null;

        function startStepping() {
            if (intervalId !== null) {
                clearInterval(intervalId); // Ensure no intervals are already running
            }
            node.currentValue = node.from; // Reset to the starting value
            intervalId = setInterval(function() {
                if ((node.from < node.to && node.currentValue >= node.to) ||
                    (node.from > node.to && node.currentValue <= node.to)) {
                    clearInterval(intervalId);
                    intervalId = null;
                    node.send({payload: node.currentValue});
                    return;
                }
                node.send({payload: node.currentValue});
                node.currentValue += (node.from < node.to) ? node.step : -node.step;
            }, node.duration);
        }

        function stopStepping() {
            if (intervalId !== null) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        function resetStepping() {
            stopStepping(); // Stop any existing stepping process
            node.currentValue = node.from; // Reset the current value
            node.send({payload: node.currentValue, topic: "reset"});
        }

        node.on('input', function(msg) {
            if (typeof msg.payload === "boolean" && msg.payload === true) {
                switch (msg.topic) {
                    case "start":
                        startStepping();
                        break;
                    case "stop":
                        stopStepping();
                        break;
                    case "reset":
                        resetStepping();
                        break;
                    default:
                        node.warn("Received unknown topic or incorrect payload. Expected topics: start, stop, reset.");
                        break;
                }
            } else {
                node.warn("Ignoring input: payload must be boolean true.");
            }
        });

        node.on('close', function() {
            stopStepping(); // Clear interval on node redeployment or shutdown
        });
    }
    RED.nodes.registerType("stepper", StepperNode);
}

//stepper.js ends
