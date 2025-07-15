// DOM Elements
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const uploadBtn = document.getElementById('uploadBtn');
const uploadProgress = document.getElementById('uploadProgress');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const filesList = document.getElementById('filesList');
const loadingFiles = document.getElementById('loadingFiles');
const messageModal = document.getElementById('messageModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

// API Endpoints
const API_URL = '/api/files';
const UPLOAD_URL = `${API_URL}/upload`;
const DOWNLOAD_URL = `${API_URL}/download`;
const HEALTH_URL = `${API_URL}/health`;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    checkServerHealth();
    setupEventListeners();
    loadFiles();
});

// Check if the server is running
function checkServerHealth() {
    fetch(HEALTH_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Server is not responding');
            }
            return response.json();
        })
        .then(data => {
            console.log('Server health check:', data);
        })
        .catch(error => {
            showModal('Server Error', `
                <div class="error-message">
                    <p>Could not connect to the server. Please make sure the server is running.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `);
        });
}

// Set up event listeners
function setupEventListeners() {
    // File selection via click
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });

    // File selection change
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop events
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('dragover');

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect();
        }
    });

    // Upload button
    uploadBtn.addEventListener('click', uploadFile);

    // Close modal
    closeModal.addEventListener('click', () => {
        messageModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            messageModal.style.display = 'none';
        }
    });
}

// Handle file selection
function handleFileSelect() {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        uploadBtn.disabled = false;
    } else {
        resetFileInfo();
    }
}

// Reset file info
function resetFileInfo() {
    fileName.textContent = 'None';
    fileSize.textContent = '0 KB';
    uploadBtn.disabled = true;
    fileInput.value = '';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Upload file
function uploadFile() {
    if (fileInput.files.length === 0) {
        showModal('Error', '<div class="error-message">Please select a file first.</div>');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    // Show progress bar
    uploadProgress.style.display = 'block';
    uploadBtn.disabled = true;

    // Create a new XMLHttpRequest to track upload progress
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            progressBar.style.width = percentComplete + '%';
            progressText.textContent = percentComplete + '%';
        }
    });

    // Handle completion
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            console.log('Upload response:', data);

            if (data.success) {
                showModal('Success', `
                    <div class="success-message">
                        <p>${data.message}</p>
                        <p>File: ${data.data.fileName}</p>
                    </div>
                `);
                resetFileInfo();
                loadFiles(); // Refresh the file list
            } else {
                showModal('Error', `<div class="error-message">${data.message}</div>`);
            }
        } else {
            console.error('Upload error:', xhr.statusText);
            showModal('Upload Error', `<div class="error-message">Failed to upload file: ${xhr.statusText}</div>`);
        }

        // Reset progress bar
        uploadProgress.style.display = 'none';
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        uploadBtn.disabled = false;
    });

    // Handle errors
    xhr.addEventListener('error', () => {
        console.error('Upload error: Network error');
        showModal('Upload Error', `<div class="error-message">Failed to upload file: Network error</div>`);

        // Reset progress bar
        uploadProgress.style.display = 'none';
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        uploadBtn.disabled = false;
    });

    // Open and send the request
    xhr.open('POST', UPLOAD_URL, true);
    xhr.send(formData);
}

// Load files
function loadFiles() {
    loadingFiles.style.display = 'block';

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Files data:', data);
            displayFiles(data.data || []);
        })
        .catch(error => {
            console.error('Error loading files:', error);
            filesList.innerHTML = `
                <div class="error-message" style="margin: 20px;">
                    Failed to load files: ${error.message}
                </div>
            `;
        })
        .finally(() => {
            loadingFiles.style.display = 'none';
        });
}

// Display files
function displayFiles(files) {
    if (files.length === 0) {
        filesList.innerHTML = `
            <div style="padding: 20px; text-align: center; color: var(--gray-color);">
                No files found. Upload your first file!
            </div>
        `;
        return;
    }

    let filesHTML = '';

    files.forEach(file => {
        filesHTML += `
            <div class="file-item" data-file-id="${file.fileName}">
                <div class="file-name" title="${file.originalFileName}">${file.originalFileName}</div>
                <div class="file-size">${formatFileSize(file.size)}</div>
                <div class="file-date">${file.uploadDate ? formatDate(file.uploadDate) : 'N/A'}</div>
                <div class="file-actions">
                    <button class="btn download-btn action-btn" onclick="downloadFile('${file.fileName}', '${file.originalFileName}')">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn delete-btn action-btn" onclick="deleteFile('${file.fileName}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    filesList.innerHTML = filesHTML;
}

// Download file
function downloadFile(fileId, originalFileName) {
    window.location.href = `${DOWNLOAD_URL}/${fileId}`;
}

// Delete file
function deleteFile(fileId) {
    if (confirm(`Are you sure you want to delete this file?`)) {
        fetch(`${API_URL}/${fileId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Delete response:', data);

            if (data.success) {
                showModal('Success', `<div class="success-message">${data.message}</div>`);
                loadFiles(); // Refresh the file list
            } else {
                showModal('Error', `<div class="error-message">${data.message}</div>`);
            }
        })
        .catch(error => {
            console.error('Delete error:', error);
            showModal('Delete Error', `<div class="error-message">Failed to delete file: ${error.message}</div>`);
        });
    }
}

// Show modal with message
function showModal(title, content) {
    modalBody.innerHTML = `
        <h3>${title}</h3>
        ${content}
    `;
    messageModal.style.display = 'flex';
}
