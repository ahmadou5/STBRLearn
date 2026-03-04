# Strapi CMS Setup Guide

Complete guide to set up Strapi CMS for Superteam Academy content management.

---

## 🎯 Overview

Strapi will manage all course content including:
- **Courses** - Course metadata and settings
- **Modules** - Course sections/chapters
- **Lessons** - Individual lessons with content
- **Challenges** - Coding challenges with test cases

---

## 📦 Installation

### Step 1: Create Strapi Project

```bash
# In your project root, create a strapi subdirectory
npx create-strapi-app@latest strapi --quickstart

# Or with specific options
npx create-strapi-app@latest strapi \
  --no-run \
  --typescript \
  --template @strapi/template-default
```

This will create:
```
strapi/
├── config/
├── src/
│   ├── api/
│   └── admin/
├── database/
├── public/
└── package.json
```

### Step 2: Configure Database

For production, use PostgreSQL:

```bash
cd strapi
npm install pg
```

Edit `strapi/config/database.ts`:

```typescript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'superteam_academy'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'password'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true)
      },
    },
    debug: false,
  },
});
```

### Step 3: Environment Variables

Create `strapi/.env`:

```bash
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-key-1,your-app-key-2
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=superteam_academy
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
DATABASE_SSL=false
```

Generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🏗️ Content Type Schemas

### Schema 1: Course

Create `strapi/src/api/course/content-types/course/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "courses",
  "info": {
    "singularName": "course",
    "pluralName": "courses",
    "displayName": "Course",
    "description": "Solana learning courses"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "description": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "difficulty": {
      "type": "enumeration",
      "enum": ["beginner", "intermediate", "advanced"],
      "default": "beginner",
      "required": true
    },
    "track": {
      "type": "enumeration",
      "enum": ["development", "defi", "nfts", "security"],
      "default": "development",
      "required": true
    },
    "trackId": {
      "type": "integer",
      "default": 1,
      "required": true
    },
    "trackLevel": {
      "type": "integer",
      "default": 1,
      "required": true
    },
    "duration": {
      "type": "integer",
      "default": 0,
      "required": true
    },
    "xpReward": {
      "type": "integer",
      "default": 0,
      "required": true
    },
    "xpPerLesson": {
      "type": "integer",
      "default": 100,
      "required": true
    },
    "creatorRewardXp": {
      "type": "integer",
      "default": 50
    },
    "minCompletionsForReward": {
      "type": "integer",
      "default": 3
    },
    "prerequisite": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::course.course"
    },
    "modules": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::module.module",
      "mappedBy": "course"
    },
    "thumbnail": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "instructor": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "tags": {
      "type": "json"
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "onChainCourseId": {
      "type": "string",
      "unique": true
    }
  }
}
```

### Schema 2: Module

Create `strapi/src/api/module/content-types/module/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "modules",
  "info": {
    "singularName": "module",
    "pluralName": "modules",
    "displayName": "Module",
    "description": "Course modules/sections"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "description": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "order": {
      "type": "integer",
      "default": 0,
      "required": true
    },
    "course": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::course.course",
      "inversedBy": "modules"
    },
    "lessons": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::lesson.lesson",
      "mappedBy": "module"
    }
  }
}
```

### Schema 3: Lesson

Create `strapi/src/api/lesson/content-types/lesson/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "lessons",
  "info": {
    "singularName": "lesson",
    "pluralName": "lessons",
    "displayName": "Lesson",
    "description": "Individual lessons"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "content": {
      "type": "richtext",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "type": {
      "type": "enumeration",
      "enum": ["lesson", "challenge"],
      "default": "lesson",
      "required": true
    },
    "duration": {
      "type": "integer",
      "default": 0
    },
    "xpReward": {
      "type": "integer",
      "default": 50
    },
    "order": {
      "type": "integer",
      "default": 0,
      "required": true
    },
    "module": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::module.module",
      "inversedBy": "lessons"
    },
    "videoUrl": {
      "type": "string"
    },
    "codeSnippet": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "challenge": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::challenge.challenge"
    }
  }
}
```

### Schema 4: Challenge

Create `strapi/src/api/challenge/content-types/challenge/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "challenges",
  "info": {
    "singularName": "challenge",
    "pluralName": "challenges",
    "displayName": "Challenge",
    "description": "Coding challenges"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "description": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "starterCode": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "solution": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "testCases": {
      "type": "json",
      "required": true
    },
    "hints": {
      "type": "json",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "difficulty": {
      "type": "enumeration",
      "enum": ["easy", "medium", "hard"],
      "default": "medium"
    }
  }
}
```

---

## 🚀 Start Strapi

```bash
cd strapi
npm run develop
```

Visit: http://localhost:1337/admin

Create your admin user on first visit.

---

## 📝 Creating Content in Strapi

### 1. Enable i18n Plugin

In Strapi admin:
1. Go to **Settings** → **Internationalization**
2. Add locales: `pt-BR`, `es`, `en` (default)
3. Click Save

### 2. Create Your First Course

1. Go to **Content Manager** → **Courses**
2. Click **Create new entry**
3. Fill in:
   - **Title**: "Solana Fundamentals"
   - **Slug**: "solana-fundamentals"
   - **Description**: "Learn the basics of Solana..."
   - **Difficulty**: "beginner"
   - **Track**: "development"
   - **Track ID**: 1
   - **Track Level**: 1
   - **Duration**: 120 (minutes)
   - **XP Reward**: 500
   - **XP Per Lesson**: 50
   - **Is Active**: true
   - **On Chain Course ID**: "solana-fundamentals"

4. Save as Draft or Publish

### 3. Add Localization

1. After creating the course, click **Locales** dropdown
2. Select **Portuguese (pt-BR)**
3. Click **Create new locale**
4. Translate the title and description
5. Save

Repeat for Spanish (es).

### 4. Create Modules

1. Go to **Content Manager** → **Modules**
2. Create Module 1:
   - **Title**: "Introduction to Solana"
   - **Description**: "Understanding Solana's architecture"
   - **Order**: 1
   - **Course**: Select "Solana Fundamentals"
3. Save and Publish

### 5. Create Lessons

1. Go to **Content Manager** → **Lessons**
2. Create Lesson:
   - **Title**: "What is Solana?"
   - **Content**: (Rich text editor)
   - **Type**: "lesson"
   - **Duration**: 15
   - **XP Reward**: 50
   - **Order**: 1
   - **Module**: Select the module you created
3. Save and Publish

### 6. Create Challenges

1. Go to **Content Manager** → **Challenges**
2. Create Challenge:
   - **Title**: "Create Your First Account"
   - **Description**: "Write a program to create a Solana account"
   - **Starter Code**:
   ```rust
   // TODO: Create an account
   ```
   - **Test Cases** (JSON):
   ```json
   [
     {
       "input": "test input",
       "expected": "test output",
       "description": "Should create account"
     }
   ]
   ```
   - **Hints** (JSON):
   ```json
   [
     "Remember to use SystemProgram",
     "Check the account size"
   ]
   ```
3. Link to a lesson if needed
4. Save and Publish

---

## 🔌 API Integration

### Install Strapi SDK in Next.js

```bash
npm install @strapi/sdk-js
```

### Create Strapi Client

Create `lib/strapi/client.ts`:

```typescript
import { Strapi } from '@strapi/sdk-js';

const strapi = new Strapi({
  url: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  apiToken: process.env.STRAPI_API_TOKEN,
});

export default strapi;
```

### Fetch Courses

```typescript
// lib/strapi/courses.ts
import strapi from './client';

export async function getAllCourses(locale = 'en') {
  const { data } = await strapi.find('courses', {
    locale,
    populate: ['modules', 'thumbnail'],
    filters: {
      isActive: {
        $eq: true,
      },
    },
  });
  
  return data;
}

export async function getCourseBySlug(slug: string, locale = 'en') {
  const { data } = await strapi.find('courses', {
    locale,
    populate: ['modules.lessons', 'thumbnail'],
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });
  
  return data[0];
}
```

---

## 🔐 API Tokens

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Name: "Next.js Frontend"
4. Token type: "Read-only"
5. Copy the token
6. Add to `.env.local`:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

---

## 📚 Next Steps

- See [STRAPI_CONTENT_GUIDE.md](./STRAPI_CONTENT_GUIDE.md) for detailed content creation
- See [I18N_SETUP.md](./I18N_SETUP.md) for next-intl configuration
- See [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) for Sentry/GA4/PostHog

---

**Strapi setup complete! 🎉**
