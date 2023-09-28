# Feutils 🛠️

**A collection of useful front-end web development utility functions.**

## Usage Example 🚀

```js
import { delay } from 'feutils'

..

await delay(2)
```

## Content 📦

- Storage Manager
- Theme Manager
- Query String Manager
- Scroll Back
- Delay
- Add Plural Suffix
- Get Ordinal Suffix
- Select Random in Array
- Copy to Clipboard
- Sort Array of Objects
- Arrange an Array
- Remove Duplicates
- Format Numbers with Commas
- Get Uploaded Image Details
- Audio Player
- Request Module
- Fuzzy Search in Array of Objects

> Everything in less than <5KB.

## Helpers 🛠️

### Storage Manager 🗄️

The Storage Manager helpers streamline the process of reading and writing various data types to local storage, eliminating the need for manual stringification and parsing. Additionally, it handles any potential errors that may arise during these operations.

```js
// Set data
storageManager.set('my-data', { name: 'neilveil' })

// Read data -> "neilveil"
storageManager.get('my-data')

// Return default value if not defined -> "User"
storageManager.get('my-data-2', 'User')

// Clear only 1 key
storageManager.clear('my-data')

// Clear all data
storageManager.clear()
```

### Theme Manager 🎨

The Theme Manager provides seamless control over both light and dark themes for your application.

```js
// Set last used theme if exists or set user preferred theme based on OS
themeManager.init()

// Get current theme
themeManager.get()

// Set light theme
themeManager.set('light')

// Set dark theme
themeManager.set('dark')

// Toggle theme
themeManager.toggle()
```

HTML structure

```html
<html>
  <body data-theme="light">
</html>
```

> Theme manager saves theme in local storage key 'APP_THEME'.

### Query String Manager 🧮

Enables the seamless passage of object data across pages via URL query strings.

```js
// Generate query string to append in path
qsm.gen({ a: 1 }) // -> ?eyJhIjoxfQ==
```

Append it in path

```html
<a href="/my-page?eyJhIjoxfQ==">New page</a>
```

Read data in `/my-page`

```js
// Read data
console.log(qsm.read()) // -> { a: 1 }

// Read key "a"
console.log(qsm.read('a')) // -> 1

// Read key "b" & return default value 2 if not found
console.log(qsm.read('b', 2)) // -> 2
```

Append query string in url

```js
qsm.gen({ a: 1 }, '/my-page') // -> /my-page?eyJhIjoxfQ==
```

React example

```jsx
function MyPage() {
  const [a, setA] = useState(qsm.read('a', 0))

  return (
    <div>
      <Link to={qsm.gen({ a: 1 }, '/my-page')}>Profile</Link>
    </div>
  )
}
```

### Scroll Back 🔄

Preserve the scroll position when revisiting the same page.

```js
// Save scroll position before navigating to a different page
scrollBack.save()

// Scroll back to the last position
scrollBack.init()
```

React example

```jsx
function Component() {
  useEffect(() => {
    scrollBack.init()
  }, [])

  return (
    <div>
      <Link to='/profile' onClick={() => scrollBack.save()}>
        Profile
      </Link>
    </div>
  )
}
```

### Delay ⏳

Allow your code to pause execution for a specified duration. This is valuable for displaying loaders, preventing action clicks, implementing custom animations, and more.

```js
// Wait for 2 seconds
await delay(2)

or

await delay(2000, true)
```

### Add Plural Suffix 📚

Maintains code cleanliness by handling the addition of plural suffixes (`s` & `ies`) without the need for extra conditional operators.

```jsx
<div>0 {addPluralSuffix('apple', 0)}</div> // 0 apples
<div>1 {addPluralSuffix('apple', 1)}</div> // 1 apple
<div>2 {addPluralSuffix('apple', 2)}</div> // 2 apples

<div>0 {addPluralSuffix('entry', 0)}</div> // 0 entries
<div>1 {addPluralSuffix('entry', 1)}</div> // 1 entry
<div>2 {addPluralSuffix('entry', 2)}</div> // 2 entries
```

### Get Ordinal Suffix of a Number 🥇

Streamlines your code by handling the addition of ordinal suffixes (e.g., "st", "nd", "rd", "th") without the need for extra conditional operators.

```jsx
<div>1{getOrdinalSuffix(1)}</div> // 1st
<div>2{getOrdinalSuffix(1)}</div> // 2nd
<div>3{getOrdinalSuffix(1)}</div> // 3rd
<div>4{getOrdinalSuffix(1)}</div> // 4th

<div>101{getOrdinalSuffix(1)}</div> // 101st
<div>102{getOrdinalSuffix(1)}</div> // 102nd
<div>103{getOrdinalSuffix(1)}</div> // 103rd
<div>104{getOrdinalSuffix(1)}</div> // 104th
```

### Select Random in Array 🎲

Allows you to pick a random value from an array. This is handy for displaying diverse texts, values, colors, etc., each time a user loads the application.

```jsx
const lines = ['Awesome product', 'Try once', 'Wonderful!']

..

<div>{getRandomInArray(lines)}</div>
```

### Copy to Clipboard 📋

Copy any text value to clipboard.

```js
copyText('This is some text!')
```

### Sort Array of Objects 🔄

```js
const data = [
  { id: 4, name: 'Neil Arya' },
  { id: 1, name: 'Jon Doe' }
]

sortObjects(data, 'id') // by "id"
sortObjects(data, 'name') // by "name"
```

### Arrange an Array 🔄

```js
const data = [
  { id: 4, name: 'Neil Arya' },
  { id: 1, name: 'Jon Doe' }
]

arrangeObjects([1, 4], data, 'id')
```

### Remove Duplicates from an Array

🔄

```js
const data = [
  { id: 4, name: 'Neil Arya' },
  { id: 1, name: 'Jon Doe' },
  { id: 1, name: 'Jon Doe' }
]

removeDuplicates(data)
```

### Format Numbers with Commas 💹

```js
formatNumber(1000000) // 1,000,000

// Indian style formatting
formatNumber(1000000, true) // 10,00,000
```

### Get Uploaded Image Width, Height & Size 🖼️

Get uploaded image details to validate resolution & size.

```js
getImgDetails(imageBlob) // { width: 1920, height: 1080, size: 1000000 }
```

### Audio Player 🎵

Pre-load & play sound in different browsers.

```js
// Pre-load
audioPlayer('https://www.example.com/sound.mp3', 'load')

// Play
audioPlayer('https://www.example.com/sound.mp3')
// or
audioPlayer('https://www.example.com/sound.mp3', 'play')

// Pause
audioPlayer('https://www.example.com/sound.mp3', 'pause')

// Stop
audioPlayer('https://www.example.com/sound.mp3', 'stop')
```

### Request Module 📡

```js
await request({
  method: 'get', // 'get' | 'post'
  host: 'https://www.example.com',
  path: '/api/profile',
  args: { a: 1 }, // Used as "params" if get requests & "data" if post request
  headers: { authorization: 'Basic jgjklewr423452vnjas==' },
  params: { b: 2 }, // Get request parameters
  data: { c: 3 } // Post request data
})
```

Dependency [axios](https://www.npmjs.com/package/axios)

```html
<script src="https://cdn.jsdelivr.net/npm/axios@1.5.1/dist/axios.min.js"></script>
```

### Fuzzy Search in Array of Objects 🔍

```js
const data = [
  { id: 4, name: 'Neil Arya', keywords: ['developers', 'open-source'] },
  { id: 1, name: 'Jon Doe', keywords: ['dummy', 'user'] }
]

const searchKeys = ['name', 'keywords']

const searchString = 'neel ara'

console.log(fuse(data, searchKeys, searchString))

// Fuse options
const fuseOptions = {}
console.log(fuse(data, searchKeys, searchString, fuseOptions))
```

Dependency [fuse.js](https://www.npmjs.com/package/fuse.js)

```html
<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js"></script>
```

## Contributing 🤝

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License 📜

This project is licensed under the [MIT License](./license.txt).

## Developer 👨‍💻

Developed & maintained by [neilveil](https://github.com/neilveil).
