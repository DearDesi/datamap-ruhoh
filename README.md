# Moved

Now at <https://git.coolaj86.com/coolaj86/desirae-datamap-ruhoh.js>

# datamap-ruhoh

A ruhoh-compatible data mapper for [desirae](http://dear.desi)

This mapper attempts to map both `ruhoh@1.0` (ruhoh-twitter)
and `ruhoh@2.6` (ruhoh-bootstrap-2) views onto the same object.

As it turns out, there don't seem to be any conflicts,
but if we find out there are, we can separate into two functions.

```bash
npm install --save desirae-datamap-ruhoh

bower install --save desirae-datamap-ruhoh
```

### browser

```javascript
Desirae.registerDataMapper('ruhoh', exports.DesiraeDatamapRuhoh);
Desirae.registerDataMapper('ruhoh@1.0', exports.DesiraeDatamapRuhoh);
Desirae.registerDataMapper('ruhoh@2.6', exports.DesiraeDatamapRuhoh);
```

### io.js / node.js

```javascript
Desirae.registerDataMapper('ruhoh', require('desirae-datamap-ruhoh').DesiraeDatamapRuhoh);
Desirae.registerDataMapper('ruhoh@1.0', require('desirae-datamap-ruhoh').DesiraeDatamapRuhoh);
Desirae.registerDataMapper('ruhoh@2.6', require('desirae-datamap-ruhoh').DesiraeDatamapRuhoh);
```
