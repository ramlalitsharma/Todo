// Task Management System
class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.categories = JSON.parse(localStorage.getItem('categories')) || [
            { id: 1, name: 'Personal', color: '#FF5722' },
            { id: 2, name: 'Work', color: '#2196F3' },
            { id: 3, name: 'Shopping', color: '#4CAF50' }
        ];
        
        this.initializeApp();
        this.loadEventListeners();
    }

    initializeApp() {
        this.loadCategories();
        this.loadTasks();
        this.updateStatistics();
        this.initializeTheme();
    }

    loadEventListeners() {
        // Add Task
        document.getElementById('addTask').addEventListener('click', () => this.addTask());
        
        // Filter Changes
        document.getElementById('filterPriority').addEventListener('change', () => this.filterTasks());
        document.getElementById('filterCategory').addEventListener('change', () => this.filterTasks());
        document.getElementById('filterDate').addEventListener('change', () => this.filterTasks());
        
        // Theme Toggle
        document.getElementById('themeSwitch').addEventListener('click', () => this.toggleTheme());
        
        // Category Management
        document.getElementById('addCategory').addEventListener('click', () => this.showAddCategoryModal());
    }

    addTask() {
        const input = document.getElementById('todoInput');
        const date = document.getElementById('todoDate');
        const priority = document.getElementById('todoPriority');
        const category = document.getElementById('todoCategory');

        if (!this.validateInput(input.value, date.value)) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        const task = {
            id: Date.now(),
            title: input.value,
            date: date.value,
            priority: priority.value,
            categoryId: parseInt(category.value),
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.loadTasks();
        this.updateStatistics();
        
        // Clear inputs
        input.value = '';
        date.value = '';
        priority.value = 'low';
        
        this.showNotification('Task added successfully', 'success');
    }

    filterTasks() {
        const priorityFilter = document.getElementById('filterPriority').value;
        const categoryFilter = document.getElementById('filterCategory').value;
        const dateFilter = document.getElementById('filterDate').value;

        let filteredTasks = this.tasks;

        if (priorityFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
        }

        if (categoryFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.categoryId === parseInt(categoryFilter));
        }

        if (dateFilter) {
            filteredTasks = filteredTasks.filter(task => task.date === dateFilter);
        }

        this.renderTasks(filteredTasks);
    }

    toggleTheme() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }

    updateStatistics() {
        const stats = {
            total: this.tasks.length,
            completed: this.tasks.filter(task => task.completed).length,
            high: this.tasks.filter(task => task.priority === 'high').length,
            medium: this.tasks.filter(task => task.priority === 'medium').length,
            low: this.tasks.filter(task => task.priority === 'low').length
        };

        // Update stats display
        this.renderStatistics(stats);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // ... Additional methods for task management, category management, etc.
}

// Initialize the app
const todoApp = new TodoApp();
