// Telegram Text Editor - Main Application
// Features: Text Editing, Markdown Support, Chat Folders, Dark Theme, Animated Backgrounds

class TextEditor {
  constructor() {
    this.editor = document.getElementById('editor');
    this.preview = document.getElementById('preview');
    this.charCount = document.querySelector('.char-count');
    this.bgOverlay = document.getElementById('bg-overlay');
    this.undoStack = [];
    this.redoStack = [];
    this.currentFolder = 'all';
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.bgAnimation = localStorage.getItem('bgAnimation') || 'none';
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.applyTheme();
    this.setupFolders();
    this.setupToolbar();
    this.setupBackground();
  }

  setupEventListeners() {
    // Text editing
    this.editor.addEventListener('input', () => this.handleInput());
    this.editor.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.editor.addEventListener('selectionchange', () => this.updateToolbar());
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
    
    // Background toggle
    document.getElementById('bg-toggle').addEventListener('click', () => this.toggleBackground());
  }

  setupFolders() {
    const folderItems = document.querySelectorAll('.folder-item');
    folderItems.forEach(item => {
      item.addEventListener('click', (e) => this.switchFolder(e.currentTarget));
    });
    
    const settingsBtn = document.getElementById('settings-toggle');
    settingsBtn.addEventListener('click', () => this.showSettings());
  }

  setupToolbar() {
    const buttons = document.querySelectorAll('.toolbar-btn[data-format]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => this.applyFormat(btn.dataset.format));
    });
    
    document.getElementById('undo-btn').addEventListener('click', () => this.undo());
    document.getElementById('redo-btn').addEventListener('click', () => this.redo());
  }

  setupBackground() {
    const animations = ['none', 'gradient-wave', 'animated-dots', 'waves'];
    // Apply saved background animation
    if (this.bgAnimation !== 'none') {
      this.bgOverlay.classList.add('active', this.bgAnimation);
    }
  }

  handleInput() {
    const text = this.editor.value;
    
    // Update character count
    this.charCount.textContent = `${text.length} characters`;
    
    // Auto-save to localStorage
    localStorage.setItem('editorContent', text);
    
    // Update preview
    this.updatePreview();
  }

  handleKeydown(e) {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          this.applyFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          this.applyFormat('italic');
          break;
        case 'k':
          e.preventDefault();
          this.applyFormat('code');
          break;
        case 'z':
          if (!e.shiftKey) {
            e.preventDefault();
            this.undo();
          }
          break;
        case 'y':
          e.preventDefault();
          this.redo();
          break;
      }
    }
  }

  applyFormat(format) {
    const text = this.editor.value;
    const start = this.editor.selectionStart;
    const end = this.editor.selectionEnd;
    const selected = text.substring(start, end);
    
    if (!selected) return;
    
    let formatted = selected;
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    switch(format) {
      case 'bold':
        formatted = `**${selected}**`;
        break;
      case 'italic':
        formatted = `*${selected}*`;
        break;
      case 'strike':
        formatted = `~~${selected}~~`;
        break;
      case 'code':
        formatted = `\`${selected}\``;
        break;
      case 'h1':
        formatted = `# ${selected}`;
        break;
      case 'h2':
        formatted = `## ${selected}`;
        break;
      case 'quote':
        formatted = `> ${selected}`;
        break;
      case 'list':
        formatted = `- ${selected}`;
        break;
    }
    
    this.undoStack.push(text);
    this.editor.value = before + formatted + after;
    this.handleInput();
  }

  undo() {
    if (this.undoStack.length > 0) {
      this.redoStack.push(this.editor.value);
      this.editor.value = this.undoStack.pop();
      this.handleInput();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(this.editor.value);
      this.editor.value = this.redoStack.pop();
      this.handleInput();
    }
  }

  updatePreview() {
    const text = this.editor.value;
    let html = text
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<s>$1</s>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.*?)$/gm, '<li>$1</li>')
      .replace(/(?:\r\n|\r|\n)/g, '<br>');
    
    this.preview.innerHTML = html || '<p>Preview will appear here...</p>';
  }

  updateToolbar() {
    // Update button states based on selection
    const buttons = document.querySelectorAll('.toolbar-btn[data-format]');
    buttons.forEach(btn => btn.classList.remove('active'));
  }

  switchFolder(element) {
    document.querySelectorAll('.folder-item').forEach(item => {
      item.classList.remove('active');
    });
    element.classList.add('active');
    this.currentFolder = element.dataset.folder;
    
    // Save folder preference
    localStorage.setItem('currentFolder', this.currentFolder);
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    localStorage.setItem('darkMode', this.darkMode);
  }

  applyTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleBackground() {
    const animations = ['none', 'gradient-wave', 'animated-dots', 'waves'];
    const currentIndex = animations.indexOf(this.bgAnimation);
    const nextIndex = (currentIndex + 1) % animations.length;
    this.bgAnimation = animations[nextIndex];
    
    // Update overlay
    this.bgOverlay.className = 'bg-overlay';
    if (this.bgAnimation !== 'none') {
      this.bgOverlay.classList.add('active', this.bgAnimation);
    }
    
    localStorage.setItem('bgAnimation', this.bgAnimation);
  }

  showSettings() {
    alert(`Settings:\n- Current Folder: ${this.currentFolder}\n- Dark Mode: ${this.darkMode}\n- Background Animation: ${this.bgAnimation}`);
  }
}

// Initialize editor on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TextEditor();
  });
} else {
  new TextEditor();
}

// Restore content from localStorage
window.addEventListener('load', () => {
  const editor = document.getElementById('editor');
  const saved = localStorage.getItem('editorContent');
  if (saved) {
    editor.value = saved;
  }
});

// Auto-save every 10 seconds
setInterval(() => {
  const editor = document.getElementById('editor');
  localStorage.setItem('editorContent', editor.value);
}, 10000);
