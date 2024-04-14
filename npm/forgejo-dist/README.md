# forgejo-dist

Use [forgejo](http://forgejo.org) as an npm module for tighter integration with node apps (e.g. test fixtures). See the forgejo documentation for usage: https://forgejo.org/docs/latest/.

## Usage

`npm install forgejo-dist`

```javascript
import forgejo from "forgejo-dist";
const server = await forgejo();
// You can also pass in a custom environment or arguments
const server = await forgejo({
  MY_VARIABLE: "www.example.org",
}, [
  '--config' 'myconfig.ini'
]);

// And shut down when you are done
server.stop();
```
