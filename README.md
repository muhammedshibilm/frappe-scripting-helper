# Frappe Scripting Helper

**Frappe Scripting Helper** is a Visual Studio Code extension that delivers **IntelliSense, auto-completion, and snippets** for both client-side (JavaScript/TypeScript) and server-side (Python) scripting in the [Frappe Framework](https://frappeframework.com).

***

## Features

### Form Event IntelliSense  
Inside a `frappe.ui.form.on('Doctype', { … })` block, get a contextual dropdown of all standard form events with inline documentation:

- setup  
- before_load  
- onload  
- refresh  
- onload_post_render  
- validate  
- before_save  
- after_save  
- before_submit  
- on_submit  
- before_cancel  
- after_cancel  
- before_discard  
- after_discard  
- timeline_refresh  

### Boilerplate Snippets  
Type snippet prefixes and hit **Tab**:

- `frappeform` → Scaffold a complete form script  
```js
frappe.ui.form.on('My DocType', {
    refresh(frm) {
        $0
    }
});
```

- `fcall` → Server-call snippet  
```js
frappe.call({
    method: "app.module.method_name",
    callback: function(r) {
        if (r.message) {
            $0
        }
    }
});
```

- `frmcall` → In-form call snippet  
```js
frm.call({
    method: "app.module.method_name",
    callback: function(r) {
        if (r.message) {
            $0
        }
    }
});
```

### Inline Documentation  
Hover over any event or method to view its definition and usage examples directly within VS Code.

***

## Installation

1. Clone the repo or download ZIP:  
   ```bash
   git clone https://github.com/muhammedshibilm/frappe-scripting-helper.git
   cd frappe-scripting-helper
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Build & launch:  
   ```bash
   npm run watch
   ```
   Then press **F5** in VS Code to open the Extension Development Host.

***

## Usage

1. Open or create a Frappe client script (`.js` or `.ts`) in your app.  
2. Inside a `frappe.ui.form.on('Doctype', { … })` block, start typing any event name or prefix.  
3. Press **Ctrl+Space** (Windows/Linux) or **Cmd+Space** (macOS) to trigger suggestions.  
4. Select your snippet or event, then use **Tab** to navigate through placeholders.

***

## Contribution

Contributions and suggestions are very welcome! Feel free to:

- Add new `frm.` methods (e.g., `frm.set_value`, `frm.toggle_enable`, etc.)  
- Provide server-side Python hook snippets (`@frappe.whitelist`, etc.)  
- Improve documentation, tests, and examples  

Please submit pull requests against the `main` branch.

***

## License

This project is licensed under the **MIT License**. See [LICENSE.txt](LICENSE.txt) for details.

***

## Acknowledgements

Inspired by the official [Frappe Documentation](https://frappeframework.com/docs) and powered by the vibrant Frappe developer community.

***

