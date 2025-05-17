# Contributing to Golang Mastery

Thank you for your interest in contributing to Golang Mastery! This document provides guidelines and instructions for contributing to our project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Setting Up the Development Environment](#setting-up-the-development-environment)
- [Content Guidelines](#content-guidelines)
  - [Creating a New Lab](#creating-a-new-lab)
  - [Creating a New Project](#creating-a-new-project)
  - [Using MDX Components](#using-mdx-components)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [maintainers@golangmastery.com](mailto:maintainers@golangmastery.com).

## How Can I Contribute?

There are many ways to contribute to Golang Mastery:

1. **Content Creation**: Create new labs, projects, or courses
2. **Content Improvement**: Enhance existing content with better explanations, examples, or exercises
3. **Bug Fixes**: Fix issues with the website or content
4. **Feature Development**: Add new features to the website
5. **Documentation**: Improve documentation for contributors or users

## Setting Up the Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/golangmastery.githhub.io.git
   cd golangmastery.githhub.io
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Content Guidelines

### Creating a New Lab

1. Use the lab template in `content/templates/lab-template.mdx` as a starting point
2. Save your lab in the `content/labs` directory with a descriptive slug (e.g., `your-first-go-program.mdx`)
3. Fill in the frontmatter with appropriate metadata:
   ```yaml
   ---
   title: 'Lab Title Here'
   slug: 'lab-slug-here'
   description: 'A brief description of the lab (1-2 sentences)'
   duration: '30 minutes' # Estimated time to complete
   level: 'Beginner' # Beginner, Intermediate, or Advanced
   tags: ['Go', 'Tag2', 'Tag3']
   prerequisites: ['prerequisite-lab-slug'] # Slugs of prerequisite labs
   ---
   ```
4. Structure your lab with clear sections:
   - Introduction
   - Learning Objectives
   - Prerequisites
   - Step-by-step instructions
   - Explanations
   - Exercises
   - Summary

### Creating a New Project

1. Use the project template in `content/templates/project-template.mdx` as a starting point
2. Save your project in the `content/projects` directory with a descriptive slug (e.g., `build-a-cli-task-manager.mdx`)
3. Fill in the frontmatter with appropriate metadata:
   ```yaml
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
   ```
4. Structure your project with clear sections:
   - Project Overview
   - Learning Objectives
   - Prerequisites
   - Implementation steps
   - Testing
   - Challenges
   - Summary

### Using MDX Components

We provide several custom MDX components to enhance your content:

#### Code Block

````markdown
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```
````

#### Callout

```jsx
<Callout type="info" title="Optional Title">
  This is an informational callout.
</Callout>
```

Types: `info`, `warning`, `error`, `tip`

#### Step

```jsx
<Step number="1" title="Step Title">
  Step content goes here.
</Step>
```

#### Terminal

```jsx
<Terminal>
npm install
npm run dev
</Terminal>
```

#### FileTree

```jsx
<FileTree>
project/
├── main.go
├── go.mod
└── go.sum
</FileTree>
```

## Pull Request Process

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test your changes locally
4. Commit your changes with a descriptive commit message:
   ```bash
   git commit -m "Add new lab: Your First Go Program"
   ```
5. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a pull request from your fork to the main repository
7. Wait for review and address any feedback

## Style Guide

### Code Style

- Follow the [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments) for Go code
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for JavaScript/React code

### Content Style

- Use clear, concise language
- Explain concepts thoroughly but avoid unnecessary verbosity
- Include practical examples and exercises
- Use proper formatting for code, commands, and file paths
- Break down complex topics into manageable steps
- Include diagrams or images where appropriate

Thank you for contributing to Golang Mastery!
