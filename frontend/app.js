// Page Navigation Logic
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');
    document.getElementById(`${pageId}-page`).style.display = 'block';

    if (pageId === 'dashboard') {
        loadDocuments();
    }
}

// Upload Form Submission
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('upload-file');
    const status = document.getElementById('upload-status');
    const formData = new FormData();

    if (!fileInput.files[0]) return alert('Please select a file!');

    formData.append('document', fileInput.files[0]);
    status.innerText = "Uploading to Blockchain...";

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (response.ok) {
            status.style.color = '#2e7d32';
            status.innerHTML = `Success! Document Hashed: <br><strong>${data.hash.substring(0, 20)}...</strong>`;
            fileInput.value = ''; // Reset
        } else {
            status.style.color = '#c62828';
            status.innerText = data.message || "Upload failed.";
        }
    } catch (err) {
        status.innerText = "Error connecting to server.";
    }
});

// Verify Form Submission
document.getElementById('verify-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('verify-file');
    const resultDiv = document.getElementById('verify-result');
    const formData = new FormData();

    if (!fileInput.files[0]) return alert('Please select a file!');

    formData.append('document', fileInput.files[0]);
    resultDiv.innerHTML = "Verifying integrity...";
    resultDiv.className = "result";

    try {
        const response = await fetch('/verify', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.isOriginal) {
            resultDiv.innerHTML = "Original Document ✅";
            resultDiv.classList.add('original');
        } else {
            resultDiv.innerHTML = "Tampered Document ❌";
            resultDiv.classList.add('tampered');
        }
    } catch (err) {
        resultDiv.innerText = "Error verifying document.";
    }
});

// Load Dashboard History
async function loadDocuments() {
    const listBody = document.getElementById('document-list');
    listBody.innerHTML = "<tr><td colspan='3'>Loading data...</td></tr>";

    try {
        const response = await fetch('/documents');
        const docs = await response.json();

        listBody.innerHTML = "";
        docs.forEach(doc => {
            const row = `
                <tr>
                    <td>${doc.document_name}</td>
                    <td title="${doc.hash}">${doc.hash.substring(0, 32)}...</td>
                    <td>${new Date(doc.upload_date).toLocaleString()}</td>
                </tr>
            `;
            listBody.innerHTML += row;
        });

        if (docs.length === 0) {
            listBody.innerHTML = "<tr><td colspan='3'>No documents found.</td></tr>";
        }
    } catch (err) {
        listBody.innerHTML = "<tr><td colspan='3'>Failed to load dashboard.</td></tr>";
    }
}
