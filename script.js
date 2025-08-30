// Global state management
let currentScreen = 'login';
let currentTab = 'progress';
let userData = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    profileComplete: false,
    resumeScore: 87,
    progressPercentage: 65,
    digitalPresenceScore: 72
};

// Debug function to manually test tab switching
window.testTab = function(tabName) {
    console.log(`🧪 Testing tab: ${tabName}`);
    showTab(tabName);
    
    // Force show the tab content
    const targetTab = document.getElementById(`${tabName}Tab`);
    if (targetTab) {
        targetTab.style.display = 'block';
        targetTab.style.opacity = '1';
        targetTab.classList.add('active');
        console.log(`✅ Forced ${tabName} tab to be visible`);
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Show login screen by default
    showScreen('loginScreen');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize dynamic content
    updateProgressCircles();
    setupFileUpload();
    
    // Debug: Check if all tabs exist
    console.log('🔍 Checking tab availability...');
    const expectedTabs = ['progress', 'resume', 'jobs', 'counseling', 'interviews', 'digital'];
    expectedTabs.forEach(tabName => {
        const tabElement = document.getElementById(`${tabName}Tab`);
        if (tabElement) {
            console.log(`✅ ${tabName}Tab found`);
        } else {
            console.error(`❌ ${tabName}Tab missing`);
        }
    });
}

function setupEventListeners() {
    // Resume upload file input
    const resumeUpload = document.getElementById('resumeUpload');
    if (resumeUpload) {
        resumeUpload.addEventListener('change', handleResumeUpload);
    }
    
    // Add click handlers for job actions
    setupJobActionHandlers();
    
    // Add search handlers
    setupSearchHandlers();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Screen Management
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show selected screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }
}

// Authentication Functions
function login(provider) {
    // Simulate OAuth login
    showNotification(`Authenticating with ${provider}...`, 'info');
    
    setTimeout(() => {
        showNotification(`Successfully logged in with ${provider}!`, 'success');
        showScreen('profileSetup');
    }, 1500);
}

function importLinkedIn() {
    showNotification('Connecting to LinkedIn...', 'info');
    
    setTimeout(() => {
        showNotification('LinkedIn profile imported successfully!', 'success');
        userData.profileComplete = true;
        showDashboard();
    }, 2000);
}

function handleResumeUpload(event) {
    const file = event.target.files[0];
    if (file) {
        showNotification(`Uploading ${file.name}...`, 'info');
        
        setTimeout(() => {
            showNotification('Resume uploaded and analyzed successfully!', 'success');
            userData.profileComplete = true;
            showDashboard();
        }, 2000);
    }
}

function showDashboard() {
    showScreen('dashboard');
    // Ensure the progress tab is properly initialized
    setTimeout(() => {
        showTab('progress');
        
        // Debug: Temporarily show all tabs to verify content exists
        console.log('🔍 Debug: Checking if all tab content exists...');
        const allTabs = document.querySelectorAll('.tab-content');
        allTabs.forEach((tab, index) => {
            console.log(`Tab ${index + 1}: ${tab.id} - Content length: ${tab.innerHTML.length} characters`);
            if (tab.innerHTML.length < 100) {
                console.warn(`⚠️ ${tab.id} seems to have very little content!`);
            }
        });
    }, 100);
}

// Tab Management
function showTab(tabName) {
    console.log('🎯 showTab called with:', tabName);
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeNavItem = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Update content - use both class and style
    const tabContents = document.querySelectorAll('.tab-content');
    console.log('📋 Found', tabContents.length, 'tab contents');
    tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
        console.log('❌ Hidden tab:', content.id);
    });
    
    const targetTab = document.getElementById(`${tabName}Tab`);
    if (targetTab) {
        targetTab.classList.add('active');
        targetTab.style.display = 'block';
        currentTab = tabName;
        console.log('✅ Tab activated:', tabName, 'ID:', targetTab.id);
        
        // Trigger any tab-specific initializations
        onTabChange(tabName);
    } else {
        console.error('❌ Tab not found:', `${tabName}Tab`);
        // List all available tabs for debugging
        const allTabs = document.querySelectorAll('.tab-content');
        console.log('🔍 Available tabs:', Array.from(allTabs).map(tab => tab.id));
    }
}

function onTabChange(tabName) {
    switch(tabName) {
        case 'progress':
            updateProgressCircles();
            break;
        case 'resume':
            updateResumeScore();
            break;
        case 'jobs':
            // Could trigger job search refresh
            break;
        case 'digital':
            updateDigitalPresenceScore();
            break;
    }
}

// Resume Builder Functions
function generateResume() {
    showNotification('Generating AI-powered resume...', 'info');
    
    setTimeout(() => {
        showNotification('Resume generated successfully!', 'success');
        userData.resumeScore = Math.min(100, userData.resumeScore + Math.floor(Math.random() * 10));
        updateResumeScore();
    }, 3000);
}

function generateCoverLetter() {
    const companyName = document.querySelector('.cover-letter-form input[placeholder="Company Name"]').value;
    const position = document.querySelector('.cover-letter-form input[placeholder="Position Title"]').value;
    
    if (!companyName || !position) {
        showNotification('Please fill in company name and position title', 'error');
        return;
    }
    
    showNotification('Generating personalized cover letter...', 'info');
    
    setTimeout(() => {
        showNotification('Cover letter generated successfully!', 'success');
    }, 2000);
}

function updateResumeScore() {
    const scoreElement = document.querySelector('.resume-score .score');
    if (scoreElement) {
        scoreElement.textContent = `${userData.resumeScore}/100`;
    }
    
    // Update score bars
    const scoreBars = document.querySelectorAll('.score-fill');
    scoreBars.forEach((bar, index) => {
        const scores = [90, 85, 88]; // ATS, Content, Keywords
        bar.style.width = `${scores[index]}%`;
    });
}

// Job Discovery Functions
function quickApply() {
    const modal = document.getElementById('quickApplyModal');
    const overlay = document.getElementById('modalOverlay');
    
    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

function saveJob() {
    showNotification('Job saved to your favorites!', 'success');
}

function findReferral() {
    showNotification('Searching for referrals at this company...', 'info');
    
    setTimeout(() => {
        showNotification('Found 3 potential referrals! Check your network tab.', 'success');
    }, 2000);
}

function submitApplication() {
    showNotification('Submitting application...', 'info');
    
    setTimeout(() => {
        showNotification('Application submitted successfully!', 'success');
        closeModal();
        
        // Update progress
        userData.progressPercentage = Math.min(100, userData.progressPercentage + 5);
        updateProgressCircles();
    }, 2000);
}

// Career Counseling Functions
function bookSession(counselor) {
    showNotification(`Booking session with ${counselor}...`, 'info');
    
    setTimeout(() => {
        showNotification('Session booked successfully! Check your calendar.', 'success');
    }, 1500);
}

// Mock Interview Functions
function bookInterview(type) {
    showNotification(`Booking ${type} interview session...`, 'info');
    
    setTimeout(() => {
        showNotification('Interview session booked! You will receive a confirmation email.', 'success');
    }, 1500);
}

function viewRecording() {
    showNotification('Opening interview recording...', 'info');
    // In a real app, this would open a video player or redirect to recording
}

function downloadFeedback() {
    showNotification('Downloading feedback report...', 'info');
    // In a real app, this would trigger a file download
}

// Digital Presence Functions
function optimizeLinkedIn() {
    showNotification('Starting LinkedIn profile optimization...', 'info');
    
    setTimeout(() => {
        showNotification('LinkedIn optimization recommendations generated!', 'success');
        updateDigitalPresenceScore();
    }, 2500);
}

function optimizeGitHub() {
    showNotification('Analyzing GitHub profile...', 'info');
    
    setTimeout(() => {
        showNotification('GitHub optimization plan created!', 'success');
    }, 2000);
}

function createWebsite() {
    showNotification('Launching website builder...', 'info');
    
    setTimeout(() => {
        showNotification('Website template selected! Customization options available.', 'success');
    }, 2000);
}

function generateContent(type) {
    const contentTypes = {
        'linkedin-post': 'LinkedIn post',
        'blog-article': 'blog article',
        'industry-insight': 'industry insight'
    };
    
    showNotification(`Generating ${contentTypes[type]}...`, 'info');
    
    setTimeout(() => {
        showNotification(`${contentTypes[type]} generated successfully!`, 'success');
    }, 3000);
}

function createOutreach() {
    showNotification('Creating personalized outreach message...', 'info');
    
    setTimeout(() => {
        showNotification('Outreach message created! Ready to send.', 'success');
    }, 2000);
}

function manageSequences() {
    showNotification('Opening sequence manager...', 'info');
    // In a real app, this would open a sequence management interface
}

function viewFullCalendar() {
    showNotification('Opening full calendar view...', 'info');
    // In a real app, this would open a calendar interface
}

// Progress Update Functions
function updateProgressCircles() {
    const progressCircles = document.querySelectorAll('.circle-progress');
    progressCircles.forEach(circle => {
        const progress = circle.getAttribute('data-progress') || userData.progressPercentage;
        const percentage = parseInt(progress);
        const degrees = (percentage / 100) * 360;
        
        // Update the conic gradient
        circle.style.background = `conic-gradient(#667eea 0deg ${degrees}deg, #e2e8f0 ${degrees}deg 360deg)`;
        
        const progressText = circle.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${percentage}%`;
        }
    });
}

function updateDigitalPresenceScore() {
    const scoreElement = document.querySelector('.score-circle.large .score');
    if (scoreElement) {
        userData.digitalPresenceScore = Math.min(100, userData.digitalPresenceScore + Math.floor(Math.random() * 8));
        scoreElement.textContent = `${userData.digitalPresenceScore}/100`;
        
        const degrees = (userData.digitalPresenceScore / 100) * 360;
        const scoreCircle = document.querySelector('.score-circle.large');
        if (scoreCircle) {
            scoreCircle.style.background = `conic-gradient(#f6ad55 0deg ${degrees}deg, #e2e8f0 ${degrees}deg 360deg)`;
        }
    }
}

// Modal Management
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('modalOverlay');
    
    modals.forEach(modal => modal.classList.remove('active'));
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        'success': '#48bb78',
        'error': '#f56565',
        'warning': '#f6ad55',
        'info': '#667eea'
    };
    return colors[type] || colors.info;
}

// File Upload Setup
function setupFileUpload() {
    // Add drag and drop functionality for resume upload
    const uploadArea = document.querySelector('.import-card');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.background = '#f0f8ff';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.background = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.background = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.includes('pdf') || file.type.includes('doc')) {
                    handleResumeUpload({ target: { files: [file] } });
                } else {
                    showNotification('Please upload a PDF or DOC file', 'error');
                }
            }
        });
    }
}

// Job Action Handlers
function setupJobActionHandlers() {
    // Add event delegation for dynamically added job cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.job-actions .btn-primary')) {
            e.preventDefault();
            quickApply();
        } else if (e.target.closest('.job-actions .btn-secondary[onclick*="saveJob"]')) {
            e.preventDefault();
            saveJob();
        } else if (e.target.closest('.job-actions .btn-secondary[onclick*="findReferral"]')) {
            e.preventDefault();
            findReferral();
        }
    });
}

// Search Handlers
function setupSearchHandlers() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(handleSearch, 300));
    });
}

function handleSearch(e) {
    const query = e.target.value;
    if (query.length > 2) {
        showNotification(`Searching for "${query}"...`, 'info');
        // In a real app, this would trigger an API call
    }
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Tab navigation shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const tabs = ['progress', 'resume', 'jobs', 'counseling', 'interviews', 'digital'];
        const tabIndex = parseInt(e.key) - 1;
        if (tabs[tabIndex]) {
            showTab(tabs[tabIndex]);
        }
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Animation helpers
function animateNumber(element, start, end, duration = 1000) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Data simulation for demo purposes
function simulateJobMatching() {
    const jobs = [
        {
            title: "Senior Full Stack Engineer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            type: "Full-time • Remote",
            salary: "$120k - $160k",
            posted: "2 days ago",
            match: 95,
            tags: ["React", "Node.js", "AWS", "Python"]
        },
        {
            title: "Software Engineer II",
            company: "InnovateTech",
            location: "Austin, TX",
            type: "Full-time • Hybrid",
            salary: "$100k - $130k",
            posted: "5 days ago",
            match: 88,
            tags: ["JavaScript", "React", "MongoDB"]
        },
        {
            title: "Lead Developer",
            company: "StartupXYZ",
            location: "New York, NY",
            type: "Full-time • On-site",
            salary: "$110k - $140k",
            posted: "1 week ago",
            match: 82,
            tags: ["Vue.js", "Python", "Docker"]
        }
    ];
    
    return jobs;
}

function simulateProgressData() {
    return {
        jobsApplied: 23,
        interviewsScheduled: 5,
        coachingSessions: 3,
        milestones: {
            resumeCreated: true,
            profileOptimized: true,
            jobApplications: 'in-progress',
            interviewPrep: false,
            offerNegotiation: false
        },
        recentActivity: [
            {
                type: 'resume',
                action: 'Resume updated',
                detail: 'Software Engineer version',
                time: '2 hours ago'
            },
            {
                type: 'application',
                action: 'Applied to Senior Developer',
                detail: 'at TechCorp',
                time: '1 day ago'
            },
            {
                type: 'interview',
                action: 'Mock interview completed',
                detail: 'with Sarah Johnson',
                time: '3 days ago'
            }
        ]
    };
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.login = login;
window.importLinkedIn = importLinkedIn;
window.showDashboard = showDashboard;
window.showTab = showTab;
window.generateResume = generateResume;
window.generateCoverLetter = generateCoverLetter;
window.quickApply = quickApply;
window.saveJob = saveJob;
window.findReferral = findReferral;
window.submitApplication = submitApplication;
window.closeModal = closeModal;
window.bookSession = bookSession;
window.bookInterview = bookInterview;
window.viewRecording = viewRecording;
window.downloadFeedback = downloadFeedback;
window.optimizeLinkedIn = optimizeLinkedIn;
window.optimizeGitHub = optimizeGitHub;
window.createWebsite = createWebsite;
window.generateContent = generateContent;
window.createOutreach = createOutreach;
window.manageSequences = manageSequences;
window.viewFullCalendar = viewFullCalendar;
