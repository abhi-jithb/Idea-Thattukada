const storage = {
  local: {
    get: function(keys, callback) {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        // Real extension context
        chrome.storage.local.get(keys, callback);
      } else {
        // Fallback for local testing
        console.warn('⚠️ Using localStorage fallback. Load as extension for real chrome.storage!');
        const result = {};
        keys.forEach(key => {
          const data = localStorage.getItem(key);
          result[key] = data ? JSON.parse(data) : undefined;
        });
        callback(result);
      }
    },
    set: function(items, callback) {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set(items, callback);
      } else {
        // Fallback for local testing
        Object.keys(items).forEach(key => {
          localStorage.setItem(key, JSON.stringify(items[key]));
        });
        if (callback) callback();
      }
    }
  }
};

// Get DOM elements
const ideaInput = document.getElementById('ideaInput');
const addBtn = document.getElementById('addBtn');
const ideaList = document.getElementById('ideaList');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');
const ideaCount = document.getElementById('ideaCount');

// Load ideas when popup opens
document.addEventListener('DOMContentLoaded', loadIdeas);

// Add idea on button click
addBtn.addEventListener('click', addIdea);

// Add idea on Enter key
ideaInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addIdea();
});

// Export ideas
exportBtn.addEventListener('click', exportIdeas);

// Clear all ideas
clearBtn.addEventListener('click', clearAllIdeas);

function addIdea() {
  const text = ideaInput.value.trim();
  
  if (!text) {
    ideaInput.focus();
    return;
  }
  
  // Create idea object with timestamp
  const idea = {
    id: Date.now(), // Simple unique ID
    text: text,
    date: new Date().toLocaleString()
  };
  
  // Get existing ideas from storage
  storage.local.get(['ideas'], (result) => {
    const ideas = result.ideas || [];
    ideas.unshift(idea); // Add to beginning
    
    // Save back to storage
    storage.local.set({ ideas: ideas }, () => {
      ideaInput.value = '';
      ideaInput.focus();
      loadIdeas();
    });
  });
}

function loadIdeas() {
  storage.local.get(['ideas'], (result) => {
    const ideas = result.ideas || [];
    
    // Update count
    ideaCount.textContent = `${ideas.length} idea${ideas.length !== 1 ? 's' : ''} stored`;
    
    // Clear list
    ideaList.innerHTML = '';
    
    if (ideas.length === 0) {
      ideaList.innerHTML = '<div class="empty-state">No ideas yet. Start capturing! 🚀</div>';
      return;
    }
    
    // Render each idea
    ideas.forEach((idea) => {
      const ideaDiv = document.createElement('div');
      ideaDiv.className = 'idea-item';
      
      ideaDiv.innerHTML = `
        <div style="flex: 1;">
          <div class="idea-text">${escapeHtml(idea.text)}</div>
          <div class="idea-date">${idea.date}</div>
        </div>
        <button class="delete-btn" data-id="${idea.id}">Delete</button>
      `;
      
      // Add delete functionality
      ideaDiv.querySelector('.delete-btn').addEventListener('click', () => {
        deleteIdea(idea.id);
      });
      
      ideaList.appendChild(ideaDiv);
    });
  });
}

function deleteIdea(id) {
  storage.local.get(['ideas'], (result) => {
    const ideas = result.ideas || [];
    const filteredIdeas = ideas.filter(idea => idea.id !== id);
    
    storage.local.set({ ideas: filteredIdeas }, () => {
      loadIdeas();
    });
  });
}

function exportIdeas() {
  storage.local.get(['ideas'], (result) => {
    const ideas = result.ideas || [];
    
    if (ideas.length === 0) {
      alert('No ideas to export!');
      return;
    }
    
    // Format ideas as text
    let content = '💡 MY PROJECT IDEAS 💡\n';
    content += '='.repeat(50) + '\n\n';
    
    ideas.forEach((idea, index) => {
      content += `${index + 1}. ${idea.text}\n`;
      content += `   Added: ${idea.date}\n\n`;
    });
    
    content += '\n' + '='.repeat(50) + '\n';
    content += `Total: ${ideas.length} ideas\n`;
    content += `Exported: ${new Date().toLocaleString()}\n`;
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `ideas-${Date.now()}.txt`;
    a.click();
    
    // Cleanup
    URL.revokeObjectURL(url);
  });
}

function clearAllIdeas() {
  if (confirm('Are you sure you want to delete all ideas? This cannot be undone!')) {
    storage.local.set({ ideas: [] }, () => {
      loadIdeas();
    });
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}