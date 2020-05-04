# LiteDB

> Lightweight storage utility for web.

Designed for easy to extend without using IndexedDB or cookies for simple webapp.
It's uses *localStorage* for storing plain JavaScript objects.

## Usage

Everything inside LiteDB is an collections and documents
One collection contain multiple documents and each document have their own unique key.

Here is an example

    framework (collection): {
        angular (document): { ... },
        react (document): { ... }
    }

 First of all we need to get reference of specified collection
```javascript
const framework = LiteDB.collection("framework");
```

 now, framework variable refer to framework collection and similar for other collection every variable will refer to their own collection instance.

 And now we going to insert own first document to our collection, therefor we also need a reference of the document
```javascript
const angular = framework.doc("angular");
```
 similar to framework collection angular constant refer to "angular" document and they are children of framework collection

```javascript
angular.set({
    developedBy: "Google",
    writtenIn: "JavaScript",
    initialRelease: "October 20, 2010",
    platform: "JavaScript engine"
});
```
 After this statement LiteDB will store document with symbolic unique key
```javascript
console.log(angular.metadata.dockey) // To see document's symbolic key
```

 For accessing document use **get()** method of document reference
```javascript
angular.get();
```

> LiteDB not syncing data with web server or cloud. so data will no longer available if user clear threir site data.

[![Tweeting](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/Rajat04500210)
 