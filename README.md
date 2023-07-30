# SignalWireML

Provides a convenient way to create SignalWire Markup Language documents for controlling call flows.

## Installation

You can install the SignalWireML library via npm. Open your terminal or command prompt and run the following command:

```bash
npm install signalwireml
```

## Usage

Follow these steps to create a SWML document using the SignalWireML library:

1. Import SignalWireML:

```javascript
import { SignalWireML } from "signalwireml";
```

2. Start a new SWML document:

```javascript
let swml = new SignalWireML();
```

3. Add a new section to the document. A section allows you to group instructions together:

```javascript
let mainSection = swml.addSection('main');
```

4. Add instructions to the section. Instructions define actions to be performed during a call:

```javascript
mainSection.addInstruction('answer');

mainSection.addInstruction({
    play: {
        urls: [
            'say:Hello from SignalWire!'
        ],
        say_voice: 'en-US-Neural2-A'
    }
});
```

5. Once you have added all the desired sections and instructions, you can get the full JSON document:

```javascript
const json = swml.toJSON();
```

Alternatively, you can get the YAML version instead:

```javascript
const yaml = swml.toYAML();
```

If you wish, you can set up a web server and respond to SignalWire's HTTP requests using valid SWML in JSON/YAML format.

## Contributing

We welcome contributions to the SignalWireML library. If you find any issues or want to add new features, please open an issue or submit a pull request.

## License

This library is licensed under the [MIT License](LICENSE).

---

Feel free to reach out to us if you have any questions or need further assistance. Happy coding!