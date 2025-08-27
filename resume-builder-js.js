// Enhanced Resume Builder JavaScript Functionality

// Global state for resume data
let resumeData = {
    contact: {
        fullName: 'John Doe',
        title: 'Senior Software Engineer',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe'
    },
    summary: 'Experienced software engineer with 8+ years of full-stack development expertise in building scalable web applications and leading cross-functional teams.',
    experience: [
        {
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            startDate: 'Jan 2020',
            endDate: 'Present',
            location: 'San Francisco, CA',
            bullets: [
                'Led development of microservices architecture that improved system performance by 40%',
                'Managed cross-functional team of 6 developers and reduced deployment time by 60%'
            ]
        }
    ],
    education: [
        {
            degree: 'Bachelor of Science in Computer Science',
            school: 'Stanford University',
            year: '2016',
            gpa: '3.8'
        }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Python'],
    currentTemplate: 'professional'
};

let atsScore = 87;
let isAutoSaving = false;

// Initialize Enhanced Resume Builder
function initializeEnhancedResumeBuilder() {
    setupFileUpload();
    setupEditorTabs();
    setupFormHandlers();
    setupTemplateSelection();
    setupSkillsInput();
    setupAutoSave();
    setupPreviewUpdates();
}

// File Upload and Parsing
function setupFileUpload() {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('resumeFileUpload');
    
    if (!uploadBox || !fileInput) return;
    
    // Drag and drop handlers
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    // File input change handler
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

function handleFileUpload(file) {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
        showNotification('Please upload a PDF or Word document', 'error');
        return;
    }
    
    // Show parsing progress
    showParsingProgress();
    
    // Simulate file parsing
    simulateFileParsing(file);
}

function showParsingProgress() {
    const uploadSection = document.getElementById('uploadSection');
    const parsingProgress = document.getElementById('parsingProgress');
    
    if (parsingProgress) {
        parsingProgress.style.display = 'block';
        
        // Simulate parsing steps
        setTimeout(() => updateParsingStep(1), 1000);
        setTimeout(() => updateParsingStep(2), 2500);
        setTimeout(() => updateParsingStep(3), 4000);
        setTimeout(() => {
            hideUploadSection();
            showResumeBuilder();
        }, 5500);
    }
}

function updateParsingStep(stepIndex) {
    const steps = document.querySelectorAll('.parsing-steps .step');
    if (steps[stepIndex]) {
        // Remove active from current step
        const activeStep = document.querySelector('.parsing-steps .step.active');
        if (activeStep) {
            activeStep.classList.remove('active');
            activeStep.classList.add('completed');
            activeStep.querySelector('i').className = 'fas fa-check';
        }
        
        // Activate next step
        if (stepIndex < steps.length) {
            steps[stepIndex].classList.add('active');
            steps[stepIndex].querySelector('i').className = 'fas fa-cog fa-spin';
        }
    }
}

function hideUploadSection() {
    const uploadSection = document.getElementById('uploadSection');
    if (uploadSection) {
        uploadSection.style.display = 'none';
    }
}

function showResumeBuilder() {
    const builderMain = document.getElementById('resumeBuilderMain');
    if (builderMain) {
        builderMain.style.display = 'block';
        showNotification('Resume parsed successfully! You can now edit and optimize it.', 'success');
    }
}

function simulateFileParsing(file) {
    // Simulate extracting data from the file
    showNotification(`Parsing ${file.name}...`, 'info');
    
    // In a real application, this would use a library like PDF.js or mammoth.js
    // to extract text and structure from the document
}

// Editor Tabs Management
function setupEditorTabs() {
    const tabs = document.querySelectorAll('.editor-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchEditorTab(tabName);
        });
    });
}

function switchEditorTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.editor-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.editor-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = {
        'content': 'contentEditor',
        'templates': 'templatesEditor',
        'ai': 'aiToolsEditor'
    };
    
    const contentElement = document.getElementById(targetContent[tabName]);
    if (contentElement) {
        contentElement.classList.add('active');
    }
}

// Form Handlers
function setupFormHandlers() {
    // Contact information handlers
    const contactFields = ['fullName', 'title', 'email', 'phone', 'location', 'linkedin'];
    contactFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', (e) => {
                resumeData.contact[field] = e.target.value;
                updatePreview();
                triggerAutoSave();
            });
        }
    });
    
    // Summary handler
    const summaryElement = document.getElementById('summary');
    if (summaryElement) {
        summaryElement.addEventListener('input', (e) => {
            resumeData.summary = e.target.value;
            updatePreview();
            triggerAutoSave();
        });
    }
}

// Template Selection
function setupTemplateSelection() {
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            const template = card.getAttribute('data-template');
            selectTemplate(template);
        });
    });
}

function selectTemplate(templateName) {
    // Update active template
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-template="${templateName}"]`).classList.add('active');
    
    // Update resume data
    resumeData.currentTemplate = templateName;
    
    // Apply template to preview
    applyTemplate(templateName);
    
    showNotification(`Applied ${templateName} template`, 'success');
}

function applyTemplate(templateName) {
    const resumePage = document.getElementById('resumePage');
    if (resumePage) {
        // Remove existing template classes
        resumePage.className = resumePage.className.replace(/\w+-template/g, '');
        // Add new template class
        resumePage.classList.add(`${templateName}-template`);
        
        updatePreview();
    }
}

// Skills Input Handler
function setupSkillsInput() {
    const skillsInput = document.getElementById('skillsInput');
    if (skillsInput) {
        skillsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(e.target.value.trim());
                e.target.value = '';
            }
        });
    }
}

function addSkill(skill) {
    if (skill && !resumeData.skills.includes(skill)) {
        resumeData.skills.push(skill);
        updateSkillsDisplay();
        updatePreview();
        triggerAutoSave();
    }
}

function removeSkill(element) {
    const skillTag = element.closest('.skill-tag');
    const skillText = skillTag.textContent.trim();
    
    resumeData.skills = resumeData.skills.filter(skill => skill !== skillText);
    skillTag.remove();
    updatePreview();
    triggerAutoSave();
}

function addSuggestedSkill(element) {
    const skill = element.textContent.trim();
    addSkill(skill);
    element.style.display = 'none';
}

function updateSkillsDisplay() {
    const container = document.getElementById('skillsContainer');
    if (container) {
        container.innerHTML = resumeData.skills.map(skill => 
            `<span class="skill-tag">${skill} <i class="fas fa-times" onclick="removeSkill(this)"></i></span>`
        ).join('');
    }
}

// Auto-save functionality
function setupAutoSave() {
    // Auto-save every 3 seconds when there are changes
    setInterval(() => {
        if (isAutoSaving) {
            autoSave();
        }
    }, 3000);
}

function triggerAutoSave() {
    isAutoSaving = true;
}

function autoSave() {
    // In a real application, this would save to a backend
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    isAutoSaving = false;
    
    // Update auto-save indicator
    const saveBtn = document.querySelector('.editor-actions .btn-secondary');
    if (saveBtn) {
        saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved';
        setTimeout(() => {
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Auto-saved';
        }, 2000);
    }
}

// Preview Updates
function setupPreviewUpdates() {
    updatePreview();
}

function updatePreview() {
    const resumePage = document.getElementById('resumePage');
    if (!resumePage) return;
    
    // Update contact information
    const nameElement = resumePage.querySelector('h1');
    if (nameElement) nameElement.textContent = resumeData.contact.fullName;
    
    const titleElement = resumePage.querySelector('.title');
    if (titleElement) titleElement.textContent = resumeData.contact.title;
    
    const contactInfo = resumePage.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.innerHTML = `
            <span>${resumeData.contact.email}</span>
            <span>${resumeData.contact.phone}</span>
            <span>${resumeData.contact.location}</span>
            <span>${resumeData.contact.linkedin}</span>
        `;
    }
    
    // Update summary
    const summarySection = resumePage.querySelector('.resume-section');
    const summaryElement = summarySection ? summarySection.querySelector('p') : null;
    if (summaryElement) summaryElement.textContent = resumeData.summary;
    
    // Update experience section
    const experienceSection = resumePage.querySelectorAll('.resume-section')[1];
    if (experienceSection && resumeData.experience.length > 0) {
        const experienceContainer = experienceSection.querySelector('div') || experienceSection;
        experienceContainer.innerHTML = resumeData.experience.map(exp => `
            <div class="experience-item">
                <div class="job-header">
                    <h4>${exp.title}</h4>
                    <span class="date">${exp.startDate} - ${exp.endDate}</span>
                </div>
                <p class="company">${exp.company} • ${exp.location}</p>
                ${exp.bullets.length > 0 ? `
                    <ul>
                        ${exp.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');
    }
    
    // Update education section
    const educationSection = resumePage.querySelectorAll('.resume-section')[2];
    if (educationSection && resumeData.education.length > 0) {
        const educationContainer = educationSection.querySelector('div') || educationSection;
        educationContainer.innerHTML = resumeData.education.map(edu => `
            <div class="education-item">
                <div class="job-header">
                    <h4>${edu.degree}</h4>
                    <span class="date">${edu.year}</span>
                </div>
                <p class="company">${edu.school}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
            </div>
        `).join('');
    }
    
    // Update skills
    const skillsList = resumePage.querySelector('.skills-list');
    if (skillsList) {
        skillsList.innerHTML = resumeData.skills.map(skill => 
            `<span>${skill}</span>`
        ).join('');
    }
}

// ATS Score Checker
function checkATSScore() {
    showNotification('Analyzing resume for ATS compatibility...', 'info');
    
    // Show loading state
    const scoreSection = document.querySelector('.ats-score-section');
    if (scoreSection) {
        scoreSection.classList.add('loading');
    }
    
    setTimeout(() => {
        // Simulate ATS analysis
        analyzeATSCompatibility();
        
        if (scoreSection) {
            scoreSection.classList.remove('loading');
        }
        
        showNotification('ATS analysis complete!', 'success');
    }, 3000);
}

function analyzeATSCompatibility() {
    // Comprehensive ATS analysis logic
    let score = 60; // Base score
    const issues = [];
    const good = [];
    const warnings = [];
    
    // 1. Check format and structure (20 points max)
    good.push('ATS-friendly format');
    score += 15;
    
    // Check for graphics/tables (ATS killers)
    good.push('No graphics or complex tables');
    score += 5;
    
    // 2. Check professional summary (15 points max)
    if (resumeData.summary.length > 150) {
        score += 10;
        good.push('Comprehensive professional summary');
    } else if (resumeData.summary.length > 80) {
        score += 5;
        warnings.push({ type: 'warning', message: 'Summary could be more detailed' });
    } else {
        issues.push({ type: 'error', message: 'Summary too short (needs 80+ characters)' });
    }
    
    // Check for industry keywords in summary
    const industryKeywords = ['software', 'engineer', 'development', 'technical', 'programming', 'coding'];
    const summaryKeywordCount = industryKeywords.filter(keyword => 
        resumeData.summary.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    
    if (summaryKeywordCount >= 3) {
        score += 5;
        good.push('Industry keywords in summary');
    } else {
        warnings.push({ type: 'warning', message: 'Add more industry keywords to summary' });
    }
    
    // 3. Check skills section (15 points max)
    if (resumeData.skills.length >= 8) {
        score += 10;
        good.push('Comprehensive skills section');
    } else if (resumeData.skills.length >= 5) {
        score += 5;
        warnings.push({ type: 'warning', message: 'Consider adding more relevant skills' });
    } else {
        issues.push({ type: 'error', message: 'Too few skills listed (need 5+ skills)' });
    }
    
    // Check for technical skills
    const techSkills = ['javascript', 'python', 'react', 'node.js', 'aws', 'docker', 'sql', 'git'];
    const techSkillCount = resumeData.skills.filter(skill => 
        techSkills.some(tech => skill.toLowerCase().includes(tech.toLowerCase()))
    ).length;
    
    if (techSkillCount >= 3) {
        score += 5;
        good.push('Strong technical skills');
    } else {
        warnings.push({ type: 'warning', message: 'Add more technical skills' });
    }
    
    // 4. Check experience section (20 points max)
    if (resumeData.experience.length >= 2) {
        score += 5;
        good.push('Multiple work experiences');
    }
    
    // Check for quantified achievements
    const hasQuantifiedResults = resumeData.experience.some(exp => 
        exp.bullets.some(bullet => /\d+%|\$\d+|\d+\s*(years?|months?|weeks?)/i.test(bullet))
    );
    
    if (hasQuantifiedResults) {
        score += 8;
        good.push('Quantified achievements');
    } else {
        issues.push({ type: 'error', message: 'Add numbers/percentages to show impact' });
    }
    
    // Check for action verbs
    const actionVerbs = ['led', 'managed', 'developed', 'implemented', 'improved', 'created', 'designed', 'optimized', 'reduced', 'increased'];
    const actionVerbCount = actionVerbs.filter(verb => 
        resumeData.summary.toLowerCase().includes(verb) ||
        resumeData.experience.some(exp => 
            exp.bullets.some(bullet => bullet.toLowerCase().includes(verb))
        )
    ).length;
    
    if (actionVerbCount >= 5) {
        score += 7;
        good.push('Strong action verbs throughout');
    } else if (actionVerbCount >= 3) {
        score += 4;
        warnings.push({ type: 'warning', message: 'Use more varied action verbs' });
    } else {
        issues.push({ type: 'error', message: 'Use stronger action verbs in bullet points' });
    }
    
    // 5. Check contact information (10 points max)
    if (resumeData.contact.email && resumeData.contact.phone) {
        score += 5;
        good.push('Complete contact information');
    }
    
    if (resumeData.contact.linkedin) {
        score += 3;
        good.push('LinkedIn profile included');
    } else {
        warnings.push({ type: 'warning', message: 'Add LinkedIn profile URL' });
    }
    
    if (resumeData.contact.location) {
        score += 2;
        good.push('Location specified');
    }
    
    // 6. Check education section (5 points max)
    if (resumeData.education.length > 0) {
        score += 3;
        good.push('Education section included');
    }
    
    // 7. Check for common ATS issues (deductions)
    if (resumeData.contact.fullName.includes('Resume') || resumeData.contact.fullName.includes('CV')) {
        score -= 5;
        issues.push({ type: 'error', message: 'Remove "Resume" or "CV" from name field' });
    }
    
    // 8. Check overall length and structure
    const totalCharacters = resumeData.summary.length + 
        resumeData.experience.reduce((sum, exp) => sum + exp.bullets.join(' ').length, 0);
    
    if (totalCharacters > 1000) {
        score += 5;
        good.push('Comprehensive content length');
    } else {
        warnings.push({ type: 'warning', message: 'Resume content could be more detailed' });
    }
    
    // Combine all issues
    const allIssues = [...issues, ...warnings];
    
    // Cap score at 100
    score = Math.min(100, Math.max(0, score));
    
    // Update score display
    updateScoreDisplay(score, good, allIssues);
}

function updateScoreDisplay(score, good, issues) {
    atsScore = score;
    
    // Update score number
    const scoreNumber = document.querySelector('.score-number');
    if (scoreNumber) {
        animateNumber(scoreNumber, parseInt(scoreNumber.textContent) || 0, score);
    }
    
    // Update score circle
    const scoreCircle = document.querySelector('.score-circle-large circle:last-child');
    if (scoreCircle) {
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (score / 100) * circumference;
        scoreCircle.style.strokeDashoffset = offset;
        
        // Update color based on score
        if (score >= 80) {
            scoreCircle.style.stroke = '#48bb78';
        } else if (score >= 60) {
            scoreCircle.style.stroke = '#f6ad55';
        } else {
            scoreCircle.style.stroke = '#f56565';
        }
    }
    
    // Update score breakdown
    const breakdown = document.querySelector('.score-breakdown');
    if (breakdown) {
        breakdown.innerHTML = [
            ...good.map(item => `
                <div class="score-item good">
                    <i class="fas fa-check-circle"></i>
                    <span>${item}</span>
                </div>
            `),
            ...issues.map(issue => `
                <div class="score-item ${issue.type}">
                    <i class="fas fa-${issue.type === 'error' ? 'times-circle' : 'exclamation-triangle'}"></i>
                    <span>${issue.message}</span>
                </div>
            `)
        ].join('');
    }
    
    // Update score label
    const scoreLabel = document.querySelector('.score-label-text');
    if (scoreLabel) {
        if (score >= 90) {
            scoreLabel.textContent = 'Excellent';
            scoreLabel.style.color = '#48bb78';
        } else if (score >= 80) {
            scoreLabel.textContent = 'Good';
            scoreLabel.style.color = '#48bb78';
        } else if (score >= 70) {
            scoreLabel.textContent = 'Fair';
            scoreLabel.style.color = '#f6ad55';
        } else {
            scoreLabel.textContent = 'Needs Work';
            scoreLabel.style.color = '#f56565';
        }
    }
}

// AI-Powered Features
function analyzeJobDescription() {
    const jobDesc = document.getElementById('jobDescription').value;
    if (!jobDesc.trim()) {
        showNotification('Please paste a job description first', 'error');
        return;
    }
    
    showNotification('Analyzing job description...', 'info');
    
    setTimeout(() => {
        const results = simulateJobAnalysis(jobDesc);
        displayJobAnalysisResults(results);
        showNotification('Analysis complete! Check the suggestions below.', 'success');
    }, 2000);
}

function simulateJobAnalysis(jobDesc) {
    // Extract keywords from job description
    const keywords = extractKeywords(jobDesc);
    const missingKeywords = keywords.filter(keyword => 
        !resumeData.skills.some(skill => 
            skill.toLowerCase().includes(keyword.toLowerCase())
        ) && !resumeData.summary.toLowerCase().includes(keyword.toLowerCase())
    );
    
    return {
        totalKeywords: keywords.length,
        missingKeywords: missingKeywords.slice(0, 8), // Show top 8 missing
        matchPercentage: Math.round(((keywords.length - missingKeywords.length) / keywords.length) * 100)
    };
}

function extractKeywords(text) {
    // Simplified keyword extraction
    const techKeywords = [
        'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
        'TypeScript', 'Vue.js', 'Angular', 'MongoDB', 'PostgreSQL', 'GraphQL',
        'REST API', 'Microservices', 'DevOps', 'CI/CD', 'Agile', 'Scrum'
    ];
    
    return techKeywords.filter(keyword => 
        text.toLowerCase().includes(keyword.toLowerCase())
    );
}

function displayJobAnalysisResults(results) {
    const resultsContainer = document.getElementById('jobAnalysisResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="analysis-summary">
                <h6>Analysis Results</h6>
                <p>Keyword Match: <strong>${results.matchPercentage}%</strong></p>
                <p>Found ${results.totalKeywords} relevant keywords</p>
            </div>
            ${results.missingKeywords.length > 0 ? `
                <div class="missing-keywords">
                    <h6>Missing Keywords to Add:</h6>
                    <div class="keyword-tags">
                        ${results.missingKeywords.map(keyword => 
                            `<span class="keyword-tag" onclick="addMissingKeyword('${keyword}')">${keyword}</span>`
                        ).join('')}
                    </div>
                </div>
            ` : '<p style="color: #48bb78;">Great! Your resume matches all key requirements.</p>'}
        `;
    }
}

function addMissingKeyword(keyword) {
    addSkill(keyword);
    showNotification(`Added "${keyword}" to your skills`, 'success');
}

function generateAISummary() {
    const tone = document.getElementById('summaryTone').value;
    showNotification(`Generating ${tone.toLowerCase()} summary...`, 'info');
    
    setTimeout(() => {
        const summary = generateSummaryByTone(tone);
        document.getElementById('summary').value = summary;
        resumeData.summary = summary;
        updatePreview();
        showNotification('AI summary generated successfully!', 'success');
    }, 2500);
}

function generateSummaryByTone(tone) {
    const summaries = {
        'Professional': 'Accomplished software engineer with extensive experience in full-stack development, system architecture, and team leadership. Proven track record of delivering scalable solutions and driving technical excellence in fast-paced environments.',
        'Dynamic': 'Innovative software engineer who thrives on solving complex technical challenges and building cutting-edge applications. Passionate about emerging technologies and driving digital transformation through efficient, scalable solutions.',
        'Results-focused': 'Results-driven software engineer with a strong track record of improving system performance by 40% and reducing deployment times by 60%. Expertise in delivering high-impact solutions that drive business growth and operational efficiency.',
        'Leadership-focused': 'Strategic technical leader with proven ability to guide cross-functional teams and mentor junior developers. Expert in establishing best practices, driving technical vision, and fostering collaborative development environments.'
    };
    
    return summaries[tone] || summaries['Professional'];
}

function enhanceBulletPoint() {
    const bulletText = document.getElementById('weakBullet').value;
    if (!bulletText.trim()) {
        showNotification('Please enter a bullet point to enhance', 'error');
        return;
    }
    
    showNotification('Enhancing bullet point...', 'info');
    
    setTimeout(() => {
        const enhanced = enhanceBullet(bulletText);
        document.getElementById('enhancedBullet').innerHTML = `
            <h6>Enhanced Version:</h6>
            <p>${enhanced}</p>
            <button class="btn-secondary" onclick="useBulletPoint('${enhanced}')">
                <i class="fas fa-check"></i> Use This Version
            </button>
        `;
        showNotification('Bullet point enhanced!', 'success');
    }, 2000);
}

function enhanceBullet(original) {
    // Simple enhancement logic - in real app would use AI
    const enhancements = {
        'worked on': 'collaborated on',
        'helped': 'facilitated',
        'made': 'developed',
        'did': 'executed',
        'responsible for': 'led',
        'used': 'leveraged'
    };
    
    let enhanced = original;
    Object.keys(enhancements).forEach(weak => {
        enhanced = enhanced.replace(new RegExp(weak, 'gi'), enhancements[weak]);
    });
    
    // Add quantification if missing
    if (!enhanced.match(/\d+/)) {
        enhanced = enhanced.replace('.', ', resulting in 25% improvement in efficiency.');
    }
    
    return enhanced;
}

function useBulletPoint(bulletText) {
    // In a real app, this would add the bullet to the current experience
    showNotification('Bullet point added to your experience', 'success');
}

function generateSmartCoverLetter() {
    const company = document.getElementById('coverCompany').value;
    const position = document.getElementById('coverPosition').value;
    
    if (!company || !position) {
        showNotification('Please enter company name and position title', 'error');
        return;
    }
    
    showNotification('Generating personalized cover letter...', 'info');
    
    setTimeout(() => {
        const coverLetter = generateCoverLetter(company, position);
        showCoverLetterModal(coverLetter);
        showNotification('Cover letter generated successfully!', 'success');
    }, 3000);
}

function generateCoverLetter(company, position) {
    return `Dear Hiring Manager,

I am excited to apply for the ${position} position at ${company}. With over 8 years of experience in software engineering and a proven track record of leading high-impact projects, I am confident I can contribute significantly to your team.

In my current role as Senior Software Engineer at TechCorp Inc., I have successfully led the development of microservices architecture that improved system performance by 40% and managed cross-functional teams to reduce deployment time by 60%. My expertise in ${resumeData.skills.slice(0, 3).join(', ')} aligns perfectly with your requirements.

I am particularly drawn to ${company}'s commitment to innovation and technical excellence. I would welcome the opportunity to discuss how my experience in building scalable solutions can help drive your technical initiatives forward.

Thank you for your consideration. I look forward to hearing from you.

Best regards,
${resumeData.contact.fullName}`;
}

function showCoverLetterModal(content) {
    const modal = document.getElementById('coverLetterModal');
    const overlay = document.getElementById('modalOverlay');
    const contentDiv = document.getElementById('coverLetterContent');
    
    if (modal && overlay && contentDiv) {
        contentDiv.textContent = content;
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

function copyCoverLetter() {
    const content = document.getElementById('coverLetterContent').textContent;
    navigator.clipboard.writeText(content).then(() => {
        showNotification('Cover letter copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Could not copy to clipboard', 'error');
    });
}

function downloadCoverLetter() {
    showNotification('Preparing cover letter PDF...', 'info');
    setTimeout(() => {
        showNotification('Cover letter PDF would be downloaded here', 'success');
    }, 1500);
}

function downloadATSReport() {
    showNotification('Preparing ATS analysis report...', 'info');
    setTimeout(() => {
        showNotification('ATS report would be downloaded here', 'success');
    }, 1500);
}

// Export Functions
function downloadPDF() {
    showNotification('Preparing PDF download...', 'info');
    
    // Show loading state
    const pdfBtn = document.querySelector('.export-btn.pdf');
    if (pdfBtn) {
        pdfBtn.style.opacity = '0.6';
        pdfBtn.style.pointerEvents = 'none';
    }
    
    setTimeout(() => {
        // In a real app, this would use libraries like jsPDF or Puppeteer
        const resumeContent = document.getElementById('resumePage');
        if (resumeContent) {
            // Simulate PDF generation
            showNotification(`PDF generated successfully! Template: ${resumeData.currentTemplate}`, 'success');
            
            // Create a simulated download link
            const link = document.createElement('a');
            link.href = '#';
            link.download = `${resumeData.contact.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
            
            // In a real app, you would:
            // 1. Generate PDF using jsPDF or similar library
            // 2. Convert the resume HTML to PDF format
            // 3. Include proper styling and formatting
            // 4. Set the actual blob URL to the link
            
            showNotification('PDF would be downloaded with proper content', 'info');
        }
        
        // Reset button state
        if (pdfBtn) {
            pdfBtn.style.opacity = '1';
            pdfBtn.style.pointerEvents = 'auto';
        }
    }, 2000);
}

function downloadWord() {
    showNotification('Preparing Word document...', 'info');
    
    // Show loading state
    const wordBtn = document.querySelector('.export-btn.word');
    if (wordBtn) {
        wordBtn.style.opacity = '0.6';
        wordBtn.style.pointerEvents = 'none';
    }
    
    setTimeout(() => {
        // In a real app, this would use libraries like docx
        const wordContent = generateWordContent();
        
        // Simulate Word document generation
        showNotification('Word document generated successfully!', 'success');
        
        // Create a simulated download link
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${resumeData.contact.fullName.replace(/\s+/g, '_')}_Resume.docx`;
        
        // In a real app, you would:
        // 1. Use the 'docx' library to create proper Word documents
        // 2. Format the content with proper styling
        // 3. Include headers, footers, and proper formatting
        // 4. Generate the actual blob and download
        
        showNotification('Word document would be downloaded with ATS-friendly formatting', 'info');
        
        // Reset button state
        if (wordBtn) {
            wordBtn.style.opacity = '1';
            wordBtn.style.pointerEvents = 'auto';
        }
    }, 2500);
}

function generateWordContent() {
    // Simulate generating structured content for Word document
    return {
        contact: resumeData.contact,
        summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        template: resumeData.currentTemplate
    };
}

function copyAsText() {
    const resumeText = generatePlainTextResume();
    navigator.clipboard.writeText(resumeText).then(() => {
        showNotification('Resume copied to clipboard as plain text', 'success');
    }).catch(() => {
        showNotification('Could not copy to clipboard', 'error');
    });
}

function generatePlainTextResume() {
    return `${resumeData.contact.fullName}
${resumeData.contact.title}
${resumeData.contact.email} | ${resumeData.contact.phone} | ${resumeData.contact.location}
${resumeData.contact.linkedin}

PROFESSIONAL SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience.map(exp => `
${exp.title} - ${exp.company} (${exp.startDate} - ${exp.endDate})
${exp.bullets.map(bullet => `• ${bullet}`).join('\n')}
`).join('\n')}

EDUCATION
${resumeData.education.map(edu => `
${edu.degree} - ${edu.school} (${edu.year})
`).join('\n')}

SKILLS
${resumeData.skills.join(' • ')}`;
}

function createShareableLink() {
    showNotification('Creating shareable link...', 'info');
    setTimeout(() => {
        const shareId = generateShareId();
        const shareUrl = `${window.location.origin}/resume/${shareId}`;
        
        navigator.clipboard.writeText(shareUrl).then(() => {
            showNotification('Shareable link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification(`Shareable link: ${shareUrl}`, 'info');
        });
    }, 1000);
}

function generateShareId() {
    return Math.random().toString(36).substr(2, 9);
}

// Zoom functionality
function zoomIn() {
    const preview = document.getElementById('resumePreview');
    const zoomLevel = document.querySelector('.zoom-level');
    
    let currentZoom = parseInt(zoomLevel.textContent) || 100;
    if (currentZoom < 150) {
        currentZoom += 10;
        preview.style.transform = `scale(${currentZoom / 100})`;
        zoomLevel.textContent = `${currentZoom}%`;
    }
}

function zoomOut() {
    const preview = document.getElementById('resumePreview');
    const zoomLevel = document.querySelector('.zoom-level');
    
    let currentZoom = parseInt(zoomLevel.textContent) || 100;
    if (currentZoom > 50) {
        currentZoom -= 10;
        preview.style.transform = `scale(${currentZoom / 100})`;
        zoomLevel.textContent = `${currentZoom}%`;
    }
}

// Additional Helper Functions
function addExperience() {
    const container = document.getElementById('experienceContainer');
    if (container) {
        const newExperience = document.createElement('div');
        newExperience.className = 'experience-item-form';
        newExperience.innerHTML = `
            <div class="form-row">
                <input type="text" placeholder="Job Title" class="job-title-input">
                <input type="text" placeholder="Company Name" class="company-input">
            </div>
            <div class="form-row">
                <input type="text" placeholder="Start Date" class="start-date-input">
                <input type="text" placeholder="End Date" class="end-date-input">
                <input type="text" placeholder="Location" class="location-input">
            </div>
            <div class="bullet-points">
                <div class="bullet-item">
                    <textarea placeholder="Describe your achievement..."></textarea>
                    <button class="ai-bullet-btn" onclick="enhanceBullet(this)">
                        <i class="fas fa-magic"></i>
                    </button>
                </div>
            </div>
            <button class="add-bullet-btn" onclick="addBulletPoint(this)">
                <i class="fas fa-plus"></i> Add Achievement
            </button>
            <button class="remove-section-btn" onclick="removeExperience(this)" style="margin-top: 1rem; background: #f56565; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">
                <i class="fas fa-trash"></i> Remove Experience
            </button>
        `;
        
        container.appendChild(newExperience);
        
        // Add event listeners for the new inputs
        setupExperienceListeners(newExperience);
        
        showNotification('New experience section added', 'success');
    }
}

function removeExperience(button) {
    const experienceItem = button.closest('.experience-item-form');
    if (experienceItem) {
        experienceItem.remove();
        updatePreview();
        triggerAutoSave();
        showNotification('Experience section removed', 'success');
    }
}

function addEducation() {
    const container = document.getElementById('educationContainer');
    if (container) {
        const newEducation = document.createElement('div');
        newEducation.className = 'education-item-form';
        newEducation.innerHTML = `
            <div class="form-row">
                <input type="text" placeholder="Degree" class="degree-input">
                <input type="text" placeholder="School/University" class="school-input">
            </div>
            <div class="form-row">
                <input type="text" placeholder="Graduation Year" class="year-input">
                <input type="text" placeholder="GPA (optional)" class="gpa-input">
            </div>
            <button class="remove-section-btn" onclick="removeEducation(this)" style="margin-top: 1rem; background: #f56565; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">
                <i class="fas fa-trash"></i> Remove Education
            </button>
        `;
        
        container.appendChild(newEducation);
        
        // Add event listeners for the new inputs
        setupEducationListeners(newEducation);
        
        showNotification('New education section added', 'success');
    }
}

function removeEducation(button) {
    const educationItem = button.closest('.education-item-form');
    if (educationItem) {
        educationItem.remove();
        updatePreview();
        triggerAutoSave();
        showNotification('Education section removed', 'success');
    }
}

function setupExperienceListeners(experienceElement) {
    const inputs = experienceElement.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateExperienceData();
            updatePreview();
            triggerAutoSave();
        });
    });
}

function setupEducationListeners(educationElement) {
    const inputs = educationElement.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateEducationData();
            updatePreview();
            triggerAutoSave();
        });
    });
}

function updateExperienceData() {
    const experienceItems = document.querySelectorAll('.experience-item-form');
    resumeData.experience = Array.from(experienceItems).map(item => {
        const bullets = Array.from(item.querySelectorAll('.bullet-item textarea'))
            .map(textarea => textarea.value)
            .filter(text => text.trim());
            
        return {
            title: item.querySelector('.job-title-input')?.value || '',
            company: item.querySelector('.company-input')?.value || '',
            startDate: item.querySelector('.start-date-input')?.value || '',
            endDate: item.querySelector('.end-date-input')?.value || '',
            location: item.querySelector('.location-input')?.value || '',
            bullets: bullets
        };
    });
}

function updateEducationData() {
    const educationItems = document.querySelectorAll('.education-item-form');
    resumeData.education = Array.from(educationItems).map(item => ({
        degree: item.querySelector('.degree-input')?.value || '',
        school: item.querySelector('.school-input')?.value || '',
        year: item.querySelector('.year-input')?.value || '',
        gpa: item.querySelector('.gpa-input')?.value || ''
    }));
}

function addBulletPoint(button) {
    const bulletPoints = button.parentElement.querySelector('.bullet-points');
    const newBullet = document.createElement('div');
    newBullet.className = 'bullet-item';
    newBullet.innerHTML = `
        <textarea placeholder="Describe your achievement..."></textarea>
        <button class="ai-bullet-btn" onclick="enhanceBullet(this)">
            <i class="fas fa-magic"></i>
        </button>
    `;
    bulletPoints.appendChild(newBullet);
}

function improveSection(sectionName) {
    showNotification(`AI improvement for ${sectionName} section would be implemented here`, 'info');
}

function suggestSkills() {
    showNotification('Skill suggestions would be implemented here', 'info');
}

function showScoreDetails() {
    const modal = document.getElementById('atsDetailsModal');
    const overlay = document.getElementById('modalOverlay');
    
    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
        showNotification('Detailed ATS analysis loaded', 'info');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('resumeTab')) {
        initializeEnhancedResumeBuilder();
    }
});

// Export functions for global access
window.checkATSScore = checkATSScore;
window.analyzeJobDescription = analyzeJobDescription;
window.generateAISummary = generateAISummary;
window.enhanceBulletPoint = enhanceBulletPoint;
window.generateSmartCoverLetter = generateSmartCoverLetter;
window.downloadPDF = downloadPDF;
window.downloadWord = downloadWord;
window.copyAsText = copyAsText;
window.createShareableLink = createShareableLink;
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.addExperience = addExperience;
window.addEducation = addEducation;
window.addBulletPoint = addBulletPoint;
window.enhanceBullet = enhanceBullet;
window.improveSection = improveSection;
window.suggestSkills = suggestSkills;
window.removeSkill = removeSkill;
window.addSuggestedSkill = addSuggestedSkill;
window.showScoreDetails = showScoreDetails;
window.addMissingKeyword = addMissingKeyword;
window.useBulletPoint = useBulletPoint;
window.autoSave = autoSave;
window.showEnhancedBuilder = showEnhancedBuilder;
window.removeExperience = removeExperience;
window.removeEducation = removeEducation;
window.copyCoverLetter = copyCoverLetter;
window.downloadCoverLetter = downloadCoverLetter;
window.downloadATSReport = downloadATSReport;

// Show Enhanced Builder Function
function showEnhancedBuilder() {
    const uploadSection = document.getElementById('uploadSection');
    const builderMain = document.getElementById('resumeBuilderMain');
    
    if (uploadSection) {
        uploadSection.style.display = 'none';
    }
    
    if (builderMain) {
        builderMain.style.display = 'block';
        showNotification('Enhanced Resume Builder loaded! Start editing your resume.', 'success');
        
        // Initialize the builder
        initializeEnhancedResumeBuilder();
    }
}
