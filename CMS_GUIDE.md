# CMS Guide - Superteam Academy

## Overview

This guide explains how to create and manage course content for Superteam Academy using a headless CMS approach.

## Recommended CMS: Strapi

We recommend **Strapi** (cloud or self-hosted) for course content management due to:

- Open-source and customizable
- Built-in media library
- REST & GraphQL APIs
- Role-based access control
- Great developer experience

## Content Schema

### Course Collection

**Collection Name:** `courses`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| slug | Text (unique) | ✅ | URL-friendly identifier (e.g., "solana-fundamentals") |
| title | Text | ✅ | Course title |
| description | Long Text | ✅ | Course description (supports markdown) |
| difficulty | Enum | ✅ | Options: "beginner", "intermediate", "advanced" |
| duration | Number | ✅ | Estimated minutes to complete |
| xpReward | Number | ✅ | Total XP earned on completion |
| track | Text | ✅ | Learning track (e.g., "fundamentals", "defi", "nft") |
| thumbnail | Media | ❌ | Course thumbnail image |
| published | Boolean | ✅ | Whether course is live |
| modules | Relation | ✅ | One-to-many with Module collection |

### Module Collection

**Collection Name:** `modules`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | Text | ✅ | Module title |
| description | Long Text | ✅ | Module description |
| order | Number | ✅ | Display order within course |
| course | Relation | ✅ | Many-to-one with Course |
| lessons | Relation | ✅ | One-to-many with Lesson |

### Lesson Collection

**Collection Name:** `lessons`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | Text | ✅ | Lesson title |
| type | Enum | ✅ | Options: "content", "challenge" |
| content | Rich Text | ✅ | Lesson content (markdown/HTML) |
| order | Number | ✅ | Display order within module |
| xpReward | Number | ✅ | XP earned on completion |
| module | Relation | ✅ | Many-to-one with Module |
| starterCode | Text (code) | ❌ | For challenges: initial code |
| solution | Text (code) | ❌ | For challenges: solution code |
| hints | Component | ❌ | Array of hint texts |
| testCases | Component | ❌ | Array of test cases (for challenges) |

### Test Case Component

**Component Name:** `test-case`

**Fields:**

| Field | Type | Required |
|-------|------|----------|
| description | Text | ✅ |
| input | Text | ✅ |
| expectedOutput | Text | ✅ |

## Content Creation Workflow

### 1. Create a Course

Navigate to **Courses** → **Create New Entry**

```yaml
Title: "Solana Fundamentals"
Slug: "solana-fundamentals"
Difficulty: "beginner"
Duration: 240
XP Reward: 500
Track: "fundamentals"
Description: |
  Learn the basics of Solana blockchain development from scratch.
  Perfect for developers new to Solana.
Published: true
```

### 2. Create Modules

Navigate to **Modules** → **Create New Entry**

```yaml
Title: "Introduction to Solana"
Description: "Understanding Solana's architecture and key concepts"
Order: 1
Course: [Select: Solana Fundamentals]
```

Repeat for each module in the course.

### 3. Create Lessons

Navigate to **Lessons** → **Create New Entry**

**Content Lesson Example:**

```yaml
Title: "What is Solana?"
Type: "content"
Order: 1
XP Reward: 25
Module: [Select: Introduction to Solana]
Content: |
  # What is Solana?
  
  Solana is a high-performance blockchain designed for mass adoption.
  
  ## Key Features
  - **Fast**: 400ms block times
  - **Cheap**: <$0.01 per transaction
  - **Scalable**: 50,000+ TPS
  
  ## Architecture
  Solana uses Proof of History (PoH) to create a cryptographic clock...
```

**Challenge Lesson Example:**

```yaml
Title: "Your First Transaction"
Type: "challenge"
Order: 2
XP Reward: 50
Module: [Select: Introduction to Solana]
Content: |
  # Challenge: Send a Transaction
  
  Create and send your first Solana transaction on devnet.
  
  ## Objectives
  - Connect to Solana devnet
  - Create a new keypair
  - Request an airdrop
  - Send SOL to another address
  
Starter Code: |
  import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
  
  // TODO: Create a connection to devnet
  const connection = ;
  
  // TODO: Generate a new keypair
  const keypair = ;

Hints:
  - "Use clusterApiUrl('devnet') to get the devnet URL"
  - "Keypair.generate() creates a new keypair"

Test Cases:
  - Description: "Connection is to devnet"
    Input: "connection.rpcEndpoint"
    Expected Output: "https://api.devnet.solana.com"
```

## Markdown Support

Lessons support full Markdown syntax:

```markdown
# Heading 1
## Heading 2

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list
2. Another item

`inline code`

\`\`\`rust
// Code block
fn main() {
    println!("Hello, Solana!");
}
\`\`\`

[Link text](https://solana.com)

> Blockquote for important notes
```

## Media Management

### Uploading Images

1. Navigate to **Media Library**
2. Click **Upload**
3. Drag & drop or select files
4. Images are automatically optimized

### Using Images in Content

```markdown
![Alt text](https://your-strapi-url.com/uploads/image.png)
```

Or use Strapi's rich text editor to insert images directly.

## Publishing Workflow

### Draft → Review → Publish

1. **Draft**: Create content with `published: false`
2. **Review**: Preview content in development environment
3. **Publish**: Set `published: true` to make live

### Versioning

Strapi supports draft/publish workflow:

- Save draft while editing
- Preview changes before publishing
- Publish when ready
- Unpublish to hide from users

## API Integration

### Fetching Course Data

**REST API:**
```typescript
const response = await fetch('https://your-strapi.com/api/courses?populate=modules.lessons')
const { data } = await response.json()
```

**GraphQL:**
```graphql
query {
  courses {
    data {
      attributes {
        slug
        title
        modules {
          data {
            attributes {
              title
              lessons {
                data {
                  attributes {
                    title
                    content
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Next.js Integration

**Server Component:**
```typescript
// app/courses/page.tsx
async function getCourses() {
  const res = await fetch('https://your-strapi.com/api/courses?populate=*', {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  return res.json()
}

export default async function CoursesPage() {
  const courses = await getCourses()
  return <CourseGrid courses={courses} />
}
```

## Best Practices

### Content Writing

1. **Clear Objectives**: Start each lesson with what students will learn
2. **Progressive Difficulty**: Build on previous concepts
3. **Code Examples**: Include working code snippets
4. **Visual Aids**: Use diagrams and screenshots
5. **Practice Exercises**: End modules with challenges

### Challenge Design

1. **Clear Instructions**: Specify exactly what to build
2. **Starter Code**: Provide scaffolding to reduce friction
3. **Incremental Hints**: Guide without giving away solution
4. **Test Cases**: Verify correctness programmatically
5. **Solution Code**: Show best practices

### XP Rewards

Recommended XP values:

| Lesson Type | XP Range |
|-------------|----------|
| Short reading | 10-25 XP |
| Long reading | 25-50 XP |
| Simple challenge | 25-50 XP |
| Medium challenge | 50-100 XP |
| Complex challenge | 100-200 XP |
| Course completion bonus | 500-2000 XP |

### SEO Optimization

1. **Descriptive Titles**: Use keywords naturally
2. **Meta Descriptions**: Write compelling summaries
3. **Alt Text**: Describe all images
4. **Structured Data**: Use course schema markup

## Localization (i18n)

### Multi-Language Content

Strapi supports i18n plugin:

1. Install i18n plugin
2. Enable for Course, Module, Lesson collections
3. Create translations for each locale (pt-BR, es, en)

**Example:**

```yaml
# English (default)
Title: "Solana Fundamentals"
Description: "Learn the basics of Solana..."

# Portuguese
Title: "Fundamentos de Solana"
Description: "Aprenda os fundamentos de Solana..."

# Spanish
Title: "Fundamentos de Solana"
Description: "Aprende los fundamentos de Solana..."
```

## Backup & Version Control

### Exporting Content

Strapi supports content export:

```bash
npm run strapi export -- --file backup.tar.gz
```

### Importing Content

```bash
npm run strapi import -- --file backup.tar.gz
```

### Git-Based Content

Alternative: Use markdown files in Git:

```
content/
├── courses/
│   └── solana-fundamentals/
│       ├── meta.json
│       ├── module-1/
│       │   ├── lesson-1.md
│       │   └── lesson-2.md
│       └── module-2/
│           └── lesson-1.md
```

## Strapi Cloud Setup

### Quick Start

1. Go to [cloud.strapi.io](https://cloud.strapi.io)
2. Create new project
3. Choose region (São Paulo for LATAM)
4. Deploy
5. Access admin panel
6. Create collections per schema above

### Environment Variables

```env
STRAPI_URL=https://your-project.strapiapp.com
STRAPI_API_TOKEN=your-api-token
```

## Self-Hosted Strapi

### Docker Setup

```yaml
# docker-compose.yml
version: '3'
services:
  strapi:
    image: strapi/strapi
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
    ports:
      - '1337:1337'
    volumes:
      - ./app:/srv/app
```

```bash
docker-compose up -d
```

Access at http://localhost:1337/admin

---

**Questions?** Refer to [Strapi Documentation](https://docs.strapi.io) or ask in the Superteam Discord.
