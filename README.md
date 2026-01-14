# Telegram Text Editor - JavaScript 2025 Contest Round 1

A modern, feature-rich text editor with Chat Folders UI, dark theme support, and animated backgrounds. Built as a submission for the JavaScript 2025 Contest Round 1.

## Features

### Task 1: Text Editor with Markdown Support
- **Rich Text Formatting**: Bold, Italic, Strike-through, Code blocks
- **Markdown Syntax**: Full markdown support for headings, quotes, lists
- **Real-time Preview**: Live markdown preview in split-screen view
- **Character Counter**: Display character count as you type
- **Undo/Redo**: Full undo/redo functionality with Ctrl+Z/Ctrl+Y
- **Auto-save**: Content automatically saved to localStorage every 10 seconds
- **Keyboard Shortcuts**:
  - `Ctrl+B` or `Cmd+B` - Bold
  - `Ctrl+I` or `Cmd+I` - Italic
  - `Ctrl+K` or `Cmd+K` - Code
  - `Ctrl+Z` or `Cmd+Z` - Undo
  - `Ctrl+Y` or `Cmd+Y` - Redo

### Task 2: Chat Folders UI
- **Folder Management**: Navigate between multiple chat folders
  - All Chats
  - Favorites
  - Groups
  - Channels
- **Interactive UI**: Click to switch between folders, active folder is highlighted
- **Settings Panel**: Access application settings
- **Responsive Design**: Adapts to different screen sizes

### Bonus Task: Animated Chat Backgrounds
- **Multiple Animations**:
  - Gradient Wave: Smooth color gradient animation
  - Animated Dots: Pulsing radial gradient effect
  - Waves: Wave pattern animation
- **Toggle Background**: Click "🎨 Background" button to cycle through animations
- **Smooth Transitions**: CSS animations for seamless background changes

### Additional Features
- **Dark Theme**: Toggle between light and dark modes
- **Persistent State**: All preferences saved to localStorage:
  - Editor content
  - Dark mode preference
  - Current folder
  - Background animation selection
- **Clean UI**: Telegram-inspired design with modern aesthetics

## Project Structure

```
telegram-text-editor-contest/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling with animations
├── app.js          # Core JavaScript application
├── package.json    # Project configuration
└── README.md       # This file
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No external dependencies required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JaideepMurthy/telegram-text-editor-contest.git
cd telegram-text-editor-contest
```

2. Open `index.html` in your web browser

No build process required! The application runs directly in the browser.

## Usage

### Basic Editing
1. Click in the text area and start typing
2. Use formatting buttons in the toolbar or keyboard shortcuts
3. Content is automatically saved to your browser's localStorage

### Markdown Formatting
- `**text**` for bold
- `*text*` for italic
- `~~text~~` for strike-through
- `` `text` `` for code
- `# Heading` for h1, `## Heading` for h2
- `> Quote` for blockquote
- `- Item` for list items

### Chat Folders
Click on any folder in the left sidebar to navigate:
- **All Chats**: View all communications
- **Favorites**: Quick access to favorite chats
- **Groups**: Group conversations
- **Channels**: Channel subscriptions

### Animated Backgrounds
Click the "🎨 Background" button to cycle through:
1. No background
2. Gradient Wave animation
3. Animated Dots effect
4. Waves animation

### Theme Toggle
Click "🌙 Theme" to switch between light and dark modes

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup structure
- **CSS3**: Flexbox layout, CSS animations, CSS variables
- **Vanilla JavaScript**: No frameworks or dependencies
- **localStorage API**: For persistence across sessions

### Browser Compatibility
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Optimizations
- Minimal DOM manipulation
- Efficient event delegation
- CSS-based animations (GPU accelerated)
- No unnecessary reflows/repaints

## Code Highlights

### Markdown Rendering
```javascript
updatePreview() {
  const text = this.editor.value;
  let html = text
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // ... more patterns
  this.preview.innerHTML = html;
}
```

### Text Formatting
```javascript
applyFormat(format) {
  const selected = this.getSelectedText();
  const formatted = this.wrapWithMarkdown(selected, format);
  this.updateEditor(formatted);
}
```

### Undo/Redo System
```javascript
undo() {
  if (this.undoStack.length > 0) {
    this.redoStack.push(this.editor.value);
    this.editor.value = this.undoStack.pop();
  }
}
```

## Testing Notes

### Key Issues to Avoid (from analyzing winning entries)
✅ Fixed: Text overlap in placeholder
✅ Fixed: Markdown formatting stability
✅ Fixed: Quote and list edge cases  
✅ Fixed: Theme consistency across all elements
✅ Fixed: Background animation performance

### Test Scenarios
1. **Text Input**: Type, paste, and manipulate text
2. **Formatting**: Apply all markdown formats individually and combined
3. **Folder Navigation**: Switch between all folder types
4. **Theme Toggle**: Ensure dark/light mode applies consistently
5. **Background Animations**: Cycle through all animation types
6. **LocalStorage**: Refresh page and verify content persists
7. **Keyboard Shortcuts**: Test all Ctrl/Cmd combinations

## Future Enhancements
- Syntax highlighting for code blocks
- Export to PDF/Markdown
- Cloud sync across devices
- Collaborative editing
- Custom themes
- Plugin system

## Contest Submission

**Contest**: JavaScript 2025 Contest Round 1  
**Task**: Rebuild Text Editor with Chat Folders and Animated Backgrounds  
**Prize Pool**: $30,000+  
**Submission Date**: January 2026  

## License

MIT License - Free to use and modify

## Author

**Jaideep Murthy**  
Early-career tech professional pursuing Product Management and AI roles  
Email: jaideep@example.com  
LinkedIn: [Profile](https://linkedin.com)  

---

**Thank you for reviewing this submission!**
