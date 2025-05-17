# Golang Mastery

A website for learning Golang with interactive labs and projects, similar to labex.io/skilltrees/python.

## Features

- Structured learning path for Golang
- Interactive labs and projects
- Enhanced MDX content with custom components
- Responsive design
- GitHub Pages deployment

## Getting Started

### Prerequisites

- Node.js 16 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/golangmastery/golangmastery.githhub.io.git
   cd golangmastery.githhub.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To build the website for production:

```bash
npm run build
```

The static files will be generated in the `out` directory.

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Adding Content

We provide templates to make it easy to add new content:

- Lab template: `content/templates/lab-template.mdx`
- Project template: `content/templates/project-template.mdx`

### Adding a New Lab

1. Create a new MDX file in `content/labs/` using the template:
   ```mdx
   ---
   title: 'Lab Title Here'
   slug: 'lab-slug-here'
   description: 'A brief description of the lab (1-2 sentences)'
   duration: '30 minutes' # Estimated time to complete
   level: 'Beginner' # Beginner, Intermediate, or Advanced
   tags: ['Go', 'Tag2', 'Tag3']
   prerequisites: ['prerequisite-lab-slug'] # Slugs of prerequisite labs
   ---

   # Lab Content
   ```

### Adding a New Project

1. Create a new MDX file in `content/projects/` using the template:
   ```mdx
   ---
   title: 'Project Title Here'
   slug: 'project-slug-here'
   coverImage: '/images/projects/project-image.png'
   description: 'A brief description of the project (1-2 sentences)'
   duration: '2-3 hours' # Estimated time to complete
   level: 'Intermediate' # Beginner, Intermediate, or Advanced
   tags: ['Go', 'Tag2', 'Tag3']
   prerequisites: ['prerequisite-lab-slug'] # Slugs of prerequisite labs
   githubRepo: 'username/repo-name' # Optional GitHub repository
   ---

   # Project Content
   ```

### Adding a New Course

1. Create a new MDX file in `content/courses/` with the following frontmatter:
   ```mdx
   ---
   title: 'Course Title'
   slug: 'course-slug'
   coverImage: '/images/courses/course-image.png'
   description: 'Course description'
   level: 'Beginner' | 'Intermediate' | 'Advanced'
   tags: ['Tag1', 'Tag2']
   labs:
     - title: 'Lab Title'
       slug: 'lab-slug'
       description: 'Lab description'
   ---

   # Course Content
   ```

## Enhanced MDX Components

We provide several custom MDX components to enhance your content:

### Code Block with Line Numbers and Copy Button

````markdown
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```
````

### Callout Component

```jsx
<Callout type="info" title="Optional Title">
  This is an informational callout.
</Callout>
```

Types: `info`, `warning`, `error`, `tip`

### Step Component

```jsx
<Step number="1" title="Step Title">
  Step content goes here.
</Step>
```

### Terminal Output Component

```jsx
<Terminal>
npm install
npm run dev
</Terminal>
```

### File Tree Component

```jsx
<FileTree>
project/
├── main.go
├── go.mod
└── go.sum
</FileTree>
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed information on how to contribute to this project.

## License

This project is licensed under the ISC License - see the LICENSE file for details.