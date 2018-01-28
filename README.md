# Composables

Primitives to compose React component behavior.

# Render prop pattern

This package makes heavy use of the render prop pattern. See the
[React docs](https://reactjs.org/docs/render-props.html) for more details.

# Component Reference

## `State`

Add React state to a component.

### Example

```js
import { State } from 'composables';

<State
  initial={{ open: false }}
  render={({ open }) => (
    <Menu>
      <Button onClick={() => open.set(!open.value)}>Toggle</Button>
      {open.value && <MenuItems />}
    </Menu>
  )}
/>;
```

### Props

#### initial - object - required

The `initial` state.

#### render - function - required

Function to display or further process the state. `render` is called with
the `value` and a `set` function for each entry in the `initial` state object.

## `Result`

Convert a promise to a result. The content of the result object depends on the
state of the promise.

### Example

```js
import { Result } from 'composables';

<Result
  promise={promise}
  render={({ value, pending, error, done }) => (
    <Page>
      {pending && <Loader />}
      {error && <Error error={value} />}
      {done && <View value={value} />}
    </Page>
  )}
/>;
```

### Props

#### promise - Promise - required

Promise to convert to a result.

#### render - function - required

Function to display or further process the `result` object

## `With`

Produce side effects based on the component's lifecycle and props.

### Example

```js
import { With } from 'composables';

const FileImage = ({ file, ...props }) => (
  <With
    input={file}
    enter={input => URL.createObjectURL(input)}
    exit={output => URL.revokeObjectURL(output)}
    render={url => <Image src={url} {...props} />}
  />
);
```

### Props

#### input - any

The `input` arguments for the `enter` function.

#### enter - function(`input`)

The `enter` function can be used to safely produce side effects. `enter` is
called before the component mounts and when the `input` prop changes. The return
value of this function is used as `output`.

#### exit - function(`output`, `input`)

The `exit` function is primarily used to cleanup any side effects produced by
the `enter` function. `exit` is called when the component will unmount and when
the `input` prop changes. Make sure that any side effects you produce in `exit`
do not require cleanup.

#### render - function(`output`)

function to display or further process the produced `output`.

#### shouldUpdate - function(`previousInput`, `nextInput`)

Predicate function to determine whether a change in the `input` prop constitutes
calling `exit` and `enter` again. Defaults to a negative shallow equal check.

#### lazy - boolean

When `lazy` is true, the `enter` function will be called after the component has
mounted. This can be beneficial to the speed of your component's first render
and is especially useful when your `enter` function performs a slow synchronous
operation (e.g local storage access). A consequence of delaying the `enter`
function is that `render` can be called with `undefined` output.
