const fs = require('fs');
const path = require('path');

const fbScripts = `
    <!-- Firebase SDK Compat -->
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>`;

function inject(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            inject(full);
        } else if (full.endsWith('.html')) {
            let content = fs.readFileSync(full, 'utf8');
            if (!content.includes('firebase-app-compat')) {
                content = content.replace('</head>', fbScripts + '\n</head>');
                fs.writeFileSync(full, content);
                console.log('Injected into ' + full);
            }
        }
    }
}

inject('c:\\\\Users\\\\SYAFIQ\\\\OneDrive\\\\Documents\\\\TUGAS FILE SEMUA SYAFIQ AQIL\\\\COPY APLIKASI KP - Copy\\\\renderer');
