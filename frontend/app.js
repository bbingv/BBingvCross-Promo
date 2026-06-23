// Global App Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Authentication
class Auth {
  static getToken() {
    return localStorage.getItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static logout() {
    localStorage.clear();
    window.location.href = 'index.html';
  }

  static isAuthenticated() {
    return !!this.getToken();
  }
}

// API Client
class ApiClient {
  static async request(endpoint, options = {}) {
    const token = Auth.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
      });

      if (response.status === 401) {
        Auth.logout();
      }

      const data = await response.json();
      return { success: response.ok, data, status: response.status };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: error.message };
    }
  }

  static get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  static post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  }

  static put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  }

  static delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Navigation Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Register Button
  const registerBtn = document.getElementById('registerBtn');
  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      window.location.href = 'register.html';
    });
  }

  // Browse Button
  const browseBtn = document.getElementById('browseBtn');
  if (browseBtn) {
    browseBtn.addEventListener('click', () => {
      window.location.href = 'cases.html';
    });
  }

  // Profile Button
  const profileBtn = document.getElementById('profileBtn');
  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'stats.html';
    });
  }

  // Logout Button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout();
    });
  }
});

// Utility Functions
function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-TW');
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD'
  }).format(amount);
}

// Initialize
console.log('BBingV Cross-Promo System Loaded');
