
# node-red-contrib-stepper

This Node-RED node facilitates the generation of stepped numerical sequences with user-defined parameters. It is ideal for scenarios where a controlled sequence of numbers is required, such as in simulations, iterative testing, or gradual value changes in automation tasks.

## Installation

Install the node directly by using the Node-RED Palette Manager or by running the following command in your Node-RED installation directory:

```bash
npm install node-red-contrib-stepper
```

## Features

- **Configurable Range**: Set start and end points for the sequence.
- **Step Control**: Define the increment or decrement step size.
- **Timing Adjustment**: Specify the duration for each step.
- **Dynamic Control**: Start, stop, and reset the sequence dynamically with input messages.

## Usage

Configure the node with the following settings:

- `From`: The initial value of the sequence.
- `To`: The final value of the sequence.
- `Step`: The value by which to increment or decrement.
- `Duration`: The delay between steps in milliseconds.

Control the node by sending a message with a boolean `true` payload and one of the following topics:

- `start`: Initiates the sequence.
- `stop`: Halts the sequence.
- `reset`: Resets the sequence to the initial `From` value.

## Example

Here is a JSON representation of an example flow:

```json
[
  {
    "id": "1",
    "type": "stepper",
    "z": "",
    "name": "stepper",
    "from": "0",
    "to": "100",
    "step": "1",
    "duration": "1000",
    "wires": [[]]
  }
]
```

Copy and import the above flow into your Node-RED environment to see the `stepper` node in action.

## Issues and Support

For bug reports, feature requests, or any other queries, please open an issue on the GitHub repository:

[Issue Tracker for node-red-contrib-stepper](https://github.com/hj91/node-red-contrib-stepper/issues)

## Contributing

Feel free to dive in! [Open an issue](https://github.com/hj91/node-red-contrib-stepper/issues) or submit PRs. Contributions should be made via a GitHub pull request with a clear list of what you've done.

## License

`node-red-contrib-stepper` is available under the GNU General Public License v3.0. See the [LICENSE](https://github.com/hj91/node-red-contrib-stepper/blob/master/LICENSE) for more details.

## Acknowledgments

This node was developed by Harshad Joshi. Contributions and feedback are always welcome to improve the tool's capabilities.
