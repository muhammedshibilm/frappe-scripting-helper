import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Frappe Scripting Helper is now active!');


  const formEventsProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'javascript', scheme: 'file' },
    {
      provideCompletionItems(document, position) {


        const textBefore = document.getText(new vscode.Range(new vscode.Position(0, 0), position));



        const formEvents = [
          { label: 'setup', detail: 'Triggered once when the form is created for the first time' },
          { label: 'before_load', detail: 'Triggered before the form is about to load' },
          { label: 'onload', detail: 'Triggered when the form is loaded and is about to render' },
          { label: 'refresh', detail: 'Triggered when the form is loaded and rendered' },
          { label: 'onload_post_render', detail: 'Triggered after the form is loaded and rendered' },
          { label: 'validate', detail: 'Triggered before before_save' },
          { label: 'before_save', detail: 'Triggered before save is called' },
          { label: 'after_save', detail: 'Triggered after form is saved' },
          { label: 'before_submit', detail: 'Triggered before submit is called' },
          { label: 'on_submit', detail: 'Triggered after form is submitted' },
          { label: 'before_cancel', detail: 'Triggered before cancel is called' },
          { label: 'after_cancel', detail: 'Triggered after form is cancelled' },
          { label: 'before_discard', detail: 'Triggered before discard is called' },
          { label: 'after_discard', detail: 'Triggered after form is discarded' },
          { label: 'timeline_refresh', detail: 'Triggered after form timeline is rendered' },


          { label: 'company', detail: 'Triggered when company field is changed' },
          { label: 'customer', detail: 'Triggered when customer field is changed' },
          { label: 'item_code', detail: 'Triggered when item_code field is changed' },


          { label: 'items_add', detail: 'Triggered when a row is added to items child table' },
          { label: 'items_move', detail: 'Triggered when a row is moved in items child table' },
          { label: 'before_items_remove', detail: 'Triggered before a row is removed from items child table' },
          { label: 'items_remove', detail: 'Triggered when a row is removed from items child table' },
          { label: 'items_on_form_rendered', detail: 'Triggered when a row is opened as a form in items table' },

        ];



        return formEvents.map(ev => {
          const item = new vscode.CompletionItem(ev.label, vscode.CompletionItemKind.Function);
          item.detail = ev.detail;
          item.insertText = new vscode.SnippetString(`${ev.label}(frm){\n\t$0\n},`);
          item.documentation = new vscode.MarkdownString(ev.detail);
          item.sortText = '000_' + ev.label;
          item.preselect = true;
          item.filterText = ev.label;
          return item;
        });
      }
    },

  );


  const frappeApiProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'javascript', scheme: 'file' },
    {
      provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);

        if (!linePrefix.endsWith('frappe.')) {
          return undefined;
        }

        const frappeMainApi = [

          { label: 'session', kind: vscode.CompletionItemKind.Property, detail: 'Current user session information', insertText: 'session' },
          { label: 'user', kind: vscode.CompletionItemKind.Property, detail: 'Current user information', insertText: 'user' },
          { label: 'user_roles', kind: vscode.CompletionItemKind.Property, detail: 'Array of current user roles', insertText: 'user_roles' },
          { label: 'user_info', kind: vscode.CompletionItemKind.Property, detail: 'Current user info object', insertText: 'user_info' },
          { label: 'defaults', kind: vscode.CompletionItemKind.Property, detail: 'User defaults', insertText: 'defaults' },
          { label: 'boot', kind: vscode.CompletionItemKind.Property, detail: 'Boot information', insertText: 'boot' },
          { label: 'sys_defaults', kind: vscode.CompletionItemKind.Property, detail: 'System defaults', insertText: 'sys_defaults' },
          { label: 'form_dict', kind: vscode.CompletionItemKind.Property, detail: 'Request parameters', insertText: 'form_dict' },
          { label: 'datetime', kind: vscode.CompletionItemKind.Property, detail: 'DateTime utilities', insertText: 'datetime' },
          { label: 'quick_entry', kind: vscode.CompletionItemKind.Property, detail: 'Current Quick Entry object', insertText: 'quick_entry' },
          { label: 'route_options', kind: vscode.CompletionItemKind.Property, detail: 'Route options for navigation', insertText: 'route_options' },


          {
            label: 'get_doc', kind: vscode.CompletionItemKind.Method, detail: 'Get document from server',
            insertText: 'get_doc("${1:doctype}", "${2:name}")'
          },
          {
            label: 'new_doc', kind: vscode.CompletionItemKind.Method, detail: 'Create new document',
            insertText: 'new_doc("${1:doctype}")'
          },
          {
            label: 'get_list', kind: vscode.CompletionItemKind.Method, detail: 'Get document list',
            insertText: 'get_list("${1:doctype}")'
          },
          {
            label: 'get_all', kind: vscode.CompletionItemKind.Method, detail: 'Get all documents (no permissions)',
            insertText: 'get_all("${1:doctype}", {filters: {${2:field}: "${3:value}"}})'
          },
          {
            label: 'get_value', kind: vscode.CompletionItemKind.Method, detail: 'Get field value',
            insertText: 'get_value("${1:doctype}", "${2:name}", "${3:fieldname}")'
          },
          {
            label: 'set_value', kind: vscode.CompletionItemKind.Method, detail: 'Set field value',
            insertText: 'set_value("${1:doctype}", "${2:name}", "${3:fieldname}", "${4:value}")'
          },
          {
            label: 'get_meta', kind: vscode.CompletionItemKind.Method, detail: 'Get doctype meta',
            insertText: 'get_meta("${1:doctype}")'
          },
          {
            label: 'get_last_doc', kind: vscode.CompletionItemKind.Method, detail: 'Get last created document',
            insertText: 'get_last_doc("${1:doctype}")'
          },
          {
            label: 'get_single', kind: vscode.CompletionItemKind.Method, detail: 'Get single doctype document',
            insertText: 'get_single("${1:doctype}")'
          },
          {
            label: 'get_installed_apps', kind: vscode.CompletionItemKind.Method, detail: 'Get list of installed apps',
            insertText: 'get_installed_apps()'
          },


          {
            label: 'call', kind: vscode.CompletionItemKind.Method, detail: 'Make server calls',
            insertText: 'call({\n\tmethod: "${1:method_name}",\n\tcallback: function(r) {\n\t\t$0\n\t}\n})'
          },
          {
            label: 'msgprint', kind: vscode.CompletionItemKind.Method, detail: 'Show message to user',
            insertText: 'msgprint("${1:message}")'
          },
          {
            label: 'throw', kind: vscode.CompletionItemKind.Method, detail: 'Throw an error',
            insertText: 'throw("${1:error_message}")'
          },
          {
            label: 'confirm', kind: vscode.CompletionItemKind.Method, detail: 'Show confirmation dialog',
            insertText: 'confirm("${1:message}", function() {\n\t$0\n})'
          },
          {
            label: 'prompt', kind: vscode.CompletionItemKind.Method, detail: 'Show prompt dialog',
            insertText: 'prompt("${1:message}")'
          },
          {
            label: 'show_alert', kind: vscode.CompletionItemKind.Method, detail: 'Show alert message',
            insertText: 'show_alert("${1:message}")'
          },
          {
            label: 'hide_msgprint', kind: vscode.CompletionItemKind.Method, detail: 'Hide message print',
            insertText: 'hide_msgprint()'
          },


          {
            label: 'set_route', kind: vscode.CompletionItemKind.Method, detail: 'Set route/navigate',
            insertText: 'set_route("${1:route}")'
          },
          {
            label: 'get_route', kind: vscode.CompletionItemKind.Method, detail: 'Get current route',
            insertText: 'get_route()'
          },


          {
            label: 'format_currency', kind: vscode.CompletionItemKind.Method, detail: 'Format currency',
            insertText: 'format_currency(${1:value}, "${2:currency}")'
          },
          {
            label: 'format_date', kind: vscode.CompletionItemKind.Method, detail: 'Format date',
            insertText: 'format_date("${1:date}")'
          },
          {
            label: 'run_serially', kind: vscode.CompletionItemKind.Method, detail: 'Run tasks serially',
            insertText: 'run_serially([\n\t$0\n])'
          },
          {
            label: 'xcall', kind: vscode.CompletionItemKind.Method, detail: 'Make async server call',
            insertText: 'xcall("${1:method}")'
          },


          { label: 'db', kind: vscode.CompletionItemKind.Property, detail: 'Database operations', insertText: 'db' },
          { label: 'ui', kind: vscode.CompletionItemKind.Property, detail: 'UI components and methods', insertText: 'ui' },
          { label: 'utils', kind: vscode.CompletionItemKind.Property, detail: 'Utility functions', insertText: 'utils' },
          { label: 'model', kind: vscode.CompletionItemKind.Property, detail: 'Model utilities', insertText: 'model' },
          { label: 'request', kind: vscode.CompletionItemKind.Property, detail: 'Request utilities', insertText: 'request' },
          { label: 'pages', kind: vscode.CompletionItemKind.Property, detail: 'Page registry', insertText: 'pages' },
          { label: 'views', kind: vscode.CompletionItemKind.Property, detail: 'View registry', insertText: 'views' },
          { label: 'desk', kind: vscode.CompletionItemKind.Property, detail: 'Desk utilities', insertText: 'desk' },
          { label: 'workspace', kind: vscode.CompletionItemKind.Property, detail: 'Workspace methods', insertText: 'workspace' },
        ];

        return frappeMainApi.map(api => {
          const item = new vscode.CompletionItem(api.label, api.kind);
          item.detail = api.detail;
          item.insertText = new vscode.SnippetString(api.insertText);
          item.documentation = new vscode.MarkdownString(api.detail);
          item.sortText = '000_' + api.label;
          item.preselect = true;
          item.filterText = api.label;
          return item;
        });
      }
    },
    '.'
  );


  const frappeSessionProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'javascript', scheme: 'file' },
    {
      provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);

        if (!linePrefix.endsWith('frappe.session.')) {
          return undefined;
        }

        const sessionProperties = [
          { label: 'user', detail: 'Current user ID', insertText: 'user' },
          { label: 'user_fullname', detail: 'Current user full name', insertText: 'user_fullname' },
          { label: 'user_email', detail: 'Current user email', insertText: 'user_email' },
          { label: 'user_image', detail: 'Current user image', insertText: 'user_image' },
          { label: 'sid', detail: 'Session ID', insertText: 'sid' },
          { label: 'csrf_token', detail: 'CSRF token', insertText: 'csrf_token' },
        ];

        return sessionProperties.map(prop => {
          const item = new vscode.CompletionItem(prop.label, vscode.CompletionItemKind.Property);
          item.detail = prop.detail;
          item.insertText = prop.insertText;
          item.documentation = new vscode.MarkdownString(prop.detail);
          item.sortText = '000_' + prop.label;
          item.preselect = true;
          item.filterText = prop.label;
          return item;
        });
      }
    },
    '.'
  );


  const frappeDbProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'javascript', scheme: 'file' },
    {
      provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);

        if (!linePrefix.endsWith('frappe.db.')) {
          return undefined;
        }

        const dbMethods = [
          {
            label: 'get_value', detail: 'Get single field value',
            insertText: 'get_value("${1:doctype}", "${2:filters}", "${3:fieldname}")'
          },
          {
            label: 'get_single_value', detail: 'Get single doctype field value',
            insertText: 'get_single_value("${1:doctype}", "${2:field}")'
          },
          {
            label: 'get_doc', detail: 'Get document by name',
            insertText: 'get_doc("${1:doctype}", "${2:name}")'
          },
          {
            label: 'get_list', detail: 'Get document list with filters',
            insertText: 'get_list("${1:doctype}", {fields: [${2:"name"}], limit: ${3:20}})'
          },
          {
            label: 'exists', detail: 'Check if document exists',
            insertText: 'exists("${1:doctype}", "${2:name}")'
          },
          {
            label: 'insert', detail: 'Insert new document',
            insertText: 'insert({\n\tdoctype: "${1:doctype}",\n\t$0\n})'
          },
          {
            label: 'delete_doc', detail: 'Delete document',
            insertText: 'delete_doc("${1:doctype}", "${2:name}")'
          },
          {
            label: 'count', detail: 'Count documents',
            insertText: 'count("${1:doctype}", {${2:args}})'
          },
        ];

        return dbMethods.map(method => {
          const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
          item.detail = method.detail;
          item.insertText = new vscode.SnippetString(method.insertText);
          item.documentation = new vscode.MarkdownString(method.detail);
          item.sortText = '000_' + method.label;
          item.preselect = true;
          item.filterText = method.label;
          return item;
        });
      }
    },
    '.'
  );


  const frappeUiProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'javascript', scheme: 'file' },
    {
      provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);

        if (!linePrefix.endsWith('frappe.ui.')) {
          return undefined;
        }

        const uiProperties = [
          { label: 'form', detail: 'Form utilities and methods', insertText: 'form' },
          { label: 'toolbar', detail: 'Toolbar methods', insertText: 'toolbar' },
          { label: 'Dialog', detail: 'Dialog class for creating dialogs', insertText: 'Dialog' },
          { label: 'make_app', detail: 'Make app method', insertText: 'make_app' },
          { label: 'Page', detail: 'Page class', insertText: 'Page' },
          { label: 'Field', detail: 'Field class', insertText: 'Field' },
        ];

        return uiProperties.map(prop => {
          const item = new vscode.CompletionItem(prop.label, vscode.CompletionItemKind.Property);
          item.detail = prop.detail;
          item.insertText = prop.insertText;
          item.documentation = new vscode.MarkdownString(prop.detail);
          item.sortText = '000_' + prop.label;
          item.preselect = true;
          item.filterText = prop.label;
          return item;
        });
      }
    },
    '.'
  );


  const frmProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'javascript', scheme: 'file' },
    {
      provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);

        if (!linePrefix.endsWith('frm.')) {
          return undefined;
        }

        const frmMethods = [

          { label: 'doc', kind: vscode.CompletionItemKind.Property, detail: 'Current document object', insertText: 'doc' },
          { label: 'doctype', kind: vscode.CompletionItemKind.Property, detail: 'Document type', insertText: 'doctype' },
          { label: 'docname', kind: vscode.CompletionItemKind.Property, detail: 'Document name', insertText: 'docname' },
          { label: 'fields_dict', kind: vscode.CompletionItemKind.Property, detail: 'Dictionary of form fields', insertText: 'fields_dict' },
          { label: 'meta', kind: vscode.CompletionItemKind.Property, detail: 'Document meta information', insertText: 'meta' },


          { label: 'is_new', kind: vscode.CompletionItemKind.Method, detail: 'Check if document is new', insertText: 'is_new()' },
          { label: 'is_dirty', kind: vscode.CompletionItemKind.Method, detail: 'Check if form is dirty', insertText: 'is_dirty()' },

          {
            label: 'set_value', kind: vscode.CompletionItemKind.Method, detail: 'Set field value',
            insertText: 'set_value("${1:fieldname}", "${2:value}")'
          },
          {
            label: 'get_field', kind: vscode.CompletionItemKind.Method, detail: 'Get field object',
            insertText: 'get_field("${1:fieldname}")'
          },
          {
            label: 'set_query', kind: vscode.CompletionItemKind.Method, detail: 'Set field query/filter',
            insertText: 'set_query("${1:fieldname}", function() {\n\treturn {\n\t\tfilters: {\n\t\t\t$0\n\t\t}\n\t};\n})'
          },
          {
            label: 'set_df_property', kind: vscode.CompletionItemKind.Method, detail: 'Set docfield property',
            insertText: 'set_df_property("${1:fieldname}", "${2:property}", ${3:value})'
          },


          {
            label: 'toggle_display', kind: vscode.CompletionItemKind.Method, detail: 'Toggle field display',
            insertText: 'toggle_display("${1:fieldname}", ${2:show})'
          },
          {
            label: 'toggle_reqd', kind: vscode.CompletionItemKind.Method, detail: 'Toggle field required',
            insertText: 'toggle_reqd("${1:fieldname}", ${2:required})'
          },
          {
            label: 'toggle_enable', kind: vscode.CompletionItemKind.Method, detail: 'Toggle field enable',
            insertText: 'toggle_enable("${1:fieldname}", ${2:enable})'
          },
          {
            label: 'set_intro', kind: vscode.CompletionItemKind.Method, detail: 'Set form intro message',
            insertText: 'set_intro("${1:message}")'
          },
          {
            label: 'clear_intro', kind: vscode.CompletionItemKind.Method, detail: 'Clear form intro',
            insertText: 'clear_intro()'
          },


          {
            label: 'add_custom_button', kind: vscode.CompletionItemKind.Method, detail: 'Add custom button',
            insertText: 'add_custom_button("${1:label}", function() {\n\t$0\n})'
          },
          {
            label: 'remove_custom_button', kind: vscode.CompletionItemKind.Method, detail: 'Remove custom button',
            insertText: 'remove_custom_button("${1:label}")'
          },
          {
            label: 'clear_custom_buttons', kind: vscode.CompletionItemKind.Method, detail: 'Clear all custom buttons',
            insertText: 'clear_custom_buttons()'
          },


          {
            label: 'save', kind: vscode.CompletionItemKind.Method, detail: 'Save form',
            insertText: 'save()'
          },
          {
            label: 'submit', kind: vscode.CompletionItemKind.Method, detail: 'Submit form',
            insertText: 'submit()'
          },
          {
            label: 'cancel', kind: vscode.CompletionItemKind.Method, detail: 'Cancel form',
            insertText: 'cancel()'
          },
          {
            label: 'reload_doc', kind: vscode.CompletionItemKind.Method, detail: 'Reload document',
            insertText: 'reload_doc()'
          },
          {
            label: 'refresh', kind: vscode.CompletionItemKind.Method, detail: 'Refresh form',
            insertText: 'refresh()'
          },
          {
            label: 'refresh_field', kind: vscode.CompletionItemKind.Method, detail: 'Refresh specific field',
            insertText: 'refresh_field("${1:fieldname}")'
          },
          {
            label: 'refresh_fields', kind: vscode.CompletionItemKind.Method, detail: 'Refresh multiple fields',
            insertText: 'refresh_fields(["${1:fieldname1}", "${2:fieldname2}"])'
          },


          {
            label: 'call', kind: vscode.CompletionItemKind.Method, detail: 'Call server method',
            insertText: 'call({\n\tmethod: "${1:method_name}",\n\tcallback: function(r) {\n\t\t$0\n\t}\n})'
          },
          {
            label: 'trigger', kind: vscode.CompletionItemKind.Method, detail: 'Trigger field event',
            insertText: 'trigger("${1:fieldname}")'
          },


          {
            label: 'add_child', kind: vscode.CompletionItemKind.Method, detail: 'Add child table row',
            insertText: 'add_child("${1:fieldname}")'
          },
          {
            label: 'clear_table', kind: vscode.CompletionItemKind.Method, detail: 'Clear child table',
            insertText: 'clear_table("${1:fieldname}")'
          },


          { label: 'layout', kind: vscode.CompletionItemKind.Property, detail: 'Form layout object', insertText: 'layout' },
          { label: 'sidebar', kind: vscode.CompletionItemKind.Property, detail: 'Form sidebar', insertText: 'sidebar' },
          { label: 'toolbar', kind: vscode.CompletionItemKind.Property, detail: 'Form toolbar', insertText: 'toolbar' },
          { label: 'dashboard', kind: vscode.CompletionItemKind.Property, detail: 'Form dashboard', insertText: 'dashboard' },
          { label: 'page', kind: vscode.CompletionItemKind.Property, detail: 'Page object', insertText: 'page' },


          {
            label: 'set_title', kind: vscode.CompletionItemKind.Method, detail: 'Set page title',
            insertText: 'set_title("${1:title}")'
          },
        ];

        return frmMethods.map(method => {
          const item = new vscode.CompletionItem(method.label, method.kind);
          item.detail = method.detail;
          item.insertText = new vscode.SnippetString(method.insertText);
          item.documentation = new vscode.MarkdownString(method.detail);
          item.sortText = '000_' + method.label;
          item.preselect = true;
          item.filterText = method.label;
          return item;
        });
      }
    },
    '.'
  );



  const globalsProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'javascript', scheme: 'file' },
    {
      provideCompletionItems() {
        const items = [
          { label: 'frappe', detail: 'Main Frappe object' },
          { label: 'cur_frm', detail: 'Current form object' },
          { label: 'cur_list', detail: 'Current list object' },
          { label: 'cur_dialog', detail: 'Current open dialog' },
          { label: 'cur_page', detail: 'Current page object' },
          { label: 'locals', detail: 'All loaded documents and DocTypes' },
        ];

        return items.map(g => {
          const item = new vscode.CompletionItem(g.label, vscode.CompletionItemKind.Variable);
          item.detail = g.detail;
          item.documentation = new vscode.MarkdownString(g.detail);
          item.sortText = '000_' + g.label;
          item.preselect = true;
          item.filterText = g.label;
          return item;
        });
      }
    },
    'f', 'c', 'l'
  );


  context.subscriptions.push(
    formEventsProvider,
    frappeApiProvider,
    frappeSessionProvider,
    frappeDbProvider,
    frappeUiProvider,
    frmProvider,
    globalsProvider
  );
}

export function deactivate() { }