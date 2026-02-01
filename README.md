# Idea തട്ടുകട ✍🏻💡 - Chrome Extension

> Never lose a brilliant idea again! Capture your thoughts instantly while browsing, researching, or working on projects.

## 🎯 Why I Built This

**Personal Problem**: While working on projects or researching, I get amazing ideas that I want to build. But these ideas disappear faster than they come! I needed a simple, always-accessible place to capture them before they vanish.

This extension is my solution - and a learning project to understand Chrome extension development.

## ✨ Features

- **⚡ Quick Capture**: Press `Alt+I` (or `Cmd+I` on Mac) to open instantly
- **💾 Persistent Storage**: Your ideas are saved locally and persist forever
- **📥 Export**: Download all your ideas as a text file
- **🎨 Clean UI**: Beautiful, distraction-free interface
- **🔒 Privacy-First**: All data stored locally on your device - nothing leaves your computer
- **• Bullet List Format**: Ideas displayed in clean dot-list format

- 
<img width="386" height="454" alt="Screenshot From 2026-02-01 19-12-01" src="https://github.com/user-attachments/assets/80ca38c7-78ca-4e25-bd22-ffedba8ea0e1" />

## 🚀 Installation

### Option 1: Load Unpacked (For Development/Testing)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `Idea തട്ടുകട ✍🏻💡` folder
6. Done! Click the extension icon or press `Alt+I` to start capturing ideas

### Option 2: From Chrome Web Store (Coming Soon)
*Once published, you'll be able to install with one click*

## 🎹 Keyboard Shortcuts

- **`Alt+I`** (Windows/Linux) or **`Cmd+I`** (Mac) - Open Idea Keeper popup
- **`Enter`** - Add idea (when input is focused)
- **`Esc`** - Close popup

### Customizing the Shortcut

1. Go to `chrome://extensions/shortcuts`
2. Find "Idea Keeper"
3. Click the pencil icon to change the shortcut
4. Set it to whatever you prefer!

## 📖 How to Use

1. **Add an Idea**: 
   - Press `Alt+I` to open
   - Type your idea
   - Press `Enter` or click "Add"

2. **View Ideas**: 
   - All ideas shown in chronological order (newest first)
   - Each idea shows when it was added

3. **Delete an Idea**: 
   - Click the "Delete" button next to any idea

4. **Export All Ideas**: 
   - Click "📥 Export" to download a text file
   - File includes timestamps and idea count

5. **Clear All**: 
   - Click "🗑️ Clear All" to start fresh
   - Confirmation required to prevent accidents

## 📁 Project Structure

```
idea-thattukada/
├── manifest.json      # Extension configuration
├── popup.html         # User interface
├── popup.js           # Logic and storage handling
├── README.md          # This file
```

## 🎓 Learning Notes

This project teaches several key concepts:

### 1. Chrome Extension Basics
- Manifest V3 structure
- Popup UI creation
- Extension permissions

### 2. Chrome Storage API
```javascript
// Save data
chrome.storage.local.set({ ideas: [...] });

// Retrieve data
chrome.storage.local.get(['ideas'], (result) => {
  // Use result.ideas
});
```

### 3. Keyboard Commands
- Using `commands` API for global shortcuts
- Platform-specific keybindings

### 4. File Export
- Creating downloadable files from JavaScript
- Blob API usage

### 5. Security Best Practices
- HTML escaping to prevent XSS
- Input validation

## 🔧 Technical Details

**Storage**: Uses `chrome.storage.local` API
- **Capacity**: ~10MB (approximately 100,000 text ideas)
- **Persistence**: Data survives browser restarts, extension updates
- **Privacy**: Stored locally only, never transmitted

**Compatibility**: Chrome, Edge, Brave, and other Chromium-based browsers

## 🛡️ Privacy

- ✅ All data stored **locally on your device**
- ✅ No analytics, tracking, or telemetry
- ✅ No internet connection required
- ✅ No data collection by developer
- ✅ Open source - verify the code yourself

## 🚧 Future Enhancements

Ideas for future versions:
- [ ] Categories/tags for organizing ideas
- [ ] Search functionality
- [ ] Sync across devices (via `chrome.storage.sync`)
- [ ] Markdown support for rich formatting
- [ ] Dark mode
- [ ] Import ideas from file
- [ ] Filter by date range
- [ ] Pin important ideas

## 🐛 Troubleshooting

### Extension doesn't load
- Make sure Developer mode is enabled
- Check for errors in `chrome://extensions/`
- Verify all files are in the same folder

### Keyboard shortcut doesn't work
- Check `chrome://extensions/shortcuts`
- Ensure no conflict with other extensions
- Try customizing to a different key combination

### Data not persisting
- Ensure you've loaded it as an extension (not just opening HTML file)
- Check if extension is enabled
- Don't use Incognito mode (data won't persist)

### Can't see console logs
- Right-click extension popup
- Select "Inspect"
- Open Console tab

## 📝 License

MIT License - Feel free to use, modify, and learn from this project!

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome! 

## 👨‍💻 Author

Built as a personal learning project to solve a real problem: capturing fleeting ideas before they disappear!

## 🙏 Acknowledgments

- Built while learning Chrome extension development
- Inspired by the need to remember all those 3 AM project ideas
- Thanks to the Chrome Extensions documentation

---

**Remember**: The best ideas often come when you're least expecting them. Keep Idea Keeper handy! 💡✨

## 📚 Learning Resources

Want to build your own extensions? Check these out:
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

---

*Happy idea capturing! 🚀*
