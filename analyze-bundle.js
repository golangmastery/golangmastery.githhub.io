const { resolve } = require('path');
const fs = require('fs');

console.log('Starting bundle analysis...');

// Find the most recent Next.js build manifest
const buildManifestPath = resolve('.next', 'build-manifest.json');

console.log(`Checking for build manifest at: ${buildManifestPath}`);

if (!fs.existsSync(buildManifestPath)) {
  console.error('Build manifest not found. Run `npm run build` first.');
  process.exit(1);
}

console.log('Found build manifest. Loading...');
const buildManifest = require(buildManifestPath);

// Extract all JavaScript chunks
const jsFiles = new Set();

// Process polyfillFiles, devFiles, etc.
const manifestCategories = [
  'polyfillFiles',
  'devFiles',
  'ampDevFiles',
  'lowPriorityFiles',
  'rootMainFiles'
];

manifestCategories.forEach(category => {
  if (buildManifest[category] && Array.isArray(buildManifest[category])) {
    buildManifest[category].forEach(file => {
      if (file.endsWith('.js')) {
        jsFiles.add(file);
      }
    });
  }
});

// Process pages
if (buildManifest.pages) {
  Object.values(buildManifest.pages).forEach(filesArray => {
    if (Array.isArray(filesArray)) {
      filesArray.forEach(file => {
        if (file.endsWith('.js')) {
          jsFiles.add(file);
        }
      });
    }
  });
}

console.log(`Found ${jsFiles.size} JavaScript files in the build manifest.`);

// Create stats for files
const fileStats = Array.from(jsFiles).map(file => {
  const fullPath = resolve('.next', file);
  console.log(`Checking file size for: ${fullPath}`);
  
  let size = 0;
  try {
    const stat = fs.statSync(fullPath);
    size = stat.size;
    console.log(`File size: ${size} bytes`);
  } catch (e) {
    console.warn(`Couldn't find file: ${fullPath}`, e);
  }
  
  // Extract chunk name from path
  const name = file.split('/').pop();
  
  return {
    path: file,
    name: name,
    size: size,
    sizeKB: (size / 1024).toFixed(2)
  };
});

// Sort by size, largest first
fileStats.sort((a, b) => b.size - a.size);

// Group by directories
const groupedStats = {};
fileStats.forEach(stat => {
  const parts = stat.path.split('/');
  const dir = parts.length > 2 ? parts.slice(0, -1).join('/') : 'root';
  
  if (!groupedStats[dir]) {
    groupedStats[dir] = [];
  }
  
  groupedStats[dir].push(stat);
});

// Calculate total size
const totalSize = fileStats.reduce((sum, file) => sum + file.size, 0);
const totalSizeKB = (totalSize / 1024).toFixed(2);
const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

// Generate HTML report
const htmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Next.js Bundle Analysis</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1, h2 {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    th, td {
      text-align: left;
      padding: 12px;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    .group-header {
      margin-top: 30px;
      font-weight: bold;
      background-color: #e6e6e6;
      padding: 10px;
    }
    .bar {
      height: 20px;
      background-color: #4CAF50;
      display: inline-block;
    }
    .summary {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
      border-left: 5px solid #4CAF50;
    }
  </style>
</head>
<body>
  <h1>Next.js Bundle Analysis</h1>
  
  <div class="summary">
    <h2>Summary</h2>
    <p>Total JavaScript size: ${totalSizeKB} KB (${totalSizeMB} MB)</p>
    <p>Total chunks: ${fileStats.length}</p>
  </div>
  
  <h2>All Chunks by Size</h2>
  <table>
    <thead>
      <tr>
        <th>File</th>
        <th>Size (KB)</th>
        <th>Percentage</th>
      </tr>
    </thead>
    <tbody>
      ${fileStats.map(file => {
        const percentage = ((file.size / totalSize) * 100).toFixed(2);
        const barWidth = Math.max(1, percentage);
        return `
          <tr>
            <td>${file.path}</td>
            <td>${file.sizeKB} KB</td>
            <td>
              <div class="bar" style="width: ${barWidth}%"></div>
              ${percentage}%
            </td>
          </tr>
        `;
      }).join('')}
    </tbody>
  </table>
  
  <h2>Chunks by Directory</h2>
  ${Object.entries(groupedStats).map(([dir, files]) => {
    const dirSize = files.reduce((sum, file) => sum + file.size, 0);
    const dirSizeKB = (dirSize / 1024).toFixed(2);
    const dirPercentage = ((dirSize / totalSize) * 100).toFixed(2);
    
    return `
      <div class="group-header">${dir} (${dirSizeKB} KB, ${dirPercentage}% of total)</div>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Size (KB)</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          ${files.map(file => {
            const percentage = ((file.size / dirSize) * 100).toFixed(2);
            const barWidth = Math.max(1, percentage);
            return `
              <tr>
                <td>${file.name}</td>
                <td>${file.sizeKB} KB</td>
                <td>
                  <div class="bar" style="width: ${barWidth}%"></div>
                  ${percentage}%
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }).join('')}
</body>
</html>
`;

// Write HTML report
const reportPath = 'bundle-report.html';
fs.writeFileSync(reportPath, htmlReport);

console.log(`Bundle analysis report generated: ${reportPath}`);
console.log('Open this file in your browser to view the report.')