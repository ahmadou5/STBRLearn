# Strapi Content Creation Guide

Step-by-step guide to creating and managing content in Strapi CMS for Superteam Academy.

---

## 🎯 Quick Start

1. **Start Strapi**: `cd strapi && npm run develop`
2. **Open Admin**: http://localhost:1337/admin
3. **Login** with your admin credentials
4. Start creating content!

---

## 📝 Content Creation Workflow

### Step 1: Create a Course

1. Navigate to **Content Manager** → **Courses**
2. Click **Create new entry**

**Required Fields:**
- **Title**: Course name (e.g., "Solana Fundamentals")
- **Slug**: URL-friendly identifier (auto-generated from title)
- **Description**: Course overview (supports rich text)
- **Difficulty**: Select from dropdown (beginner/intermediate/advanced)
- **Track**: Select category (development/defi/nfts/security)
- **Track ID**: Numeric identifier (1 = dev, 2 = defi, 3 = nfts, 4 = security)
- **Track Level**: Course level within track (1, 2, 3...)
- **Duration**: Total course duration in minutes
- **XP Reward**: Total XP for completing the course
- **XP Per Lesson**: XP earned per lesson completion
- **Is Active**: Toggle to publish/unpublish

**Optional Fields:**
- **Creator Reward XP**: XP given to course creator
- **Min Completions For Reward**: Minimum completions before creator gets reward
- **Prerequisite**: Link to another course (if required)
- **Thumbnail**: Upload course image
- **Instructor**: Instructor name
- **Tags**: Array of tags (e.g., ["rust", "anchor", "beginner"])
- **On Chain Course ID**: Course ID on Solana program

**Example:**
```
Title: Solana Fundamentals
Slug: solana-fundamentals
Description: Learn the basics of Solana blockchain...
Difficulty: beginner
Track: development
Track ID: 1
Track Level: 1
Duration: 120
XP Reward: 500
XP Per Lesson: 50
Creator Reward XP: 50
Min Completions For Reward: 3
Is Active: true
On Chain Course ID: solana-fundamentals
```

3. Click **Save** (draft) or **Publish**

---

### Step 2: Add Localization

1. After creating the course, find the **Locales** dropdown (top right)
2. Select **Portuguese (pt-BR)**
3. Click **Create new locale**
4. Translate:
   - Title
   - Description
   - Instructor name (if needed)
5. Click **Save** and **Publish**

Repeat for **Spanish (es)**

---

### Step 3: Create Modules

Modules organize lessons into sections.

1. Navigate to **Content Manager** → **Modules**
2. Click **Create new entry**

**Fields:**
- **Title**: Module name (e.g., "Introduction to Solana")
- **Description**: Module overview
- **Order**: Number for ordering (1, 2, 3...)
- **Course**: Select the course this module belongs to

**Example Module 1:**
```
Title: Introduction to Solana
Description: Understanding Solana's architecture and key concepts
Order: 1
Course: Solana Fundamentals
```

**Example Module 2:**
```
Title: Building Your First Program
Description: Hands-on development with Solana programs
Order: 2
Course: Solana Fundamentals
```

3. **Add Localization** for pt-BR and es
4. Click **Save** and **Publish**

---

### Step 4: Create Lessons

Lessons are the core learning content.

1. Navigate to **Content Manager** → **Lessons**
2. Click **Create new entry**

**Fields:**
- **Title**: Lesson name (e.g., "What is Solana?")
- **Content**: Main lesson content (rich text editor)
- **Type**: lesson or challenge
- **Duration**: Lesson duration in minutes
- **XP Reward**: XP earned for completing
- **Order**: Number for ordering within module (1, 2, 3...)
- **Module**: Select the module this lesson belongs to
- **Video URL**: Optional video link (YouTube, Vimeo, etc.)
- **Code Snippet**: Optional code example
- **Challenge**: Link to challenge (if type is "challenge")

**Example Theory Lesson:**
```
Title: What is Solana?
Content: 
# What is Solana?

Solana is a high-performance blockchain supporting builders around the world...

## Key Features
- Fast transactions (65,000 TPS)
- Low fees (< $0.01)
- Proof of History consensus

Type: lesson
Duration: 15
XP Reward: 50
Order: 1
Module: Introduction to Solana
Video URL: https://youtube.com/watch?v=...
```

**Example Challenge Lesson:**
```
Title: Create Your First Account
Content:
# Challenge: Create Your First Account

In this challenge, you'll write a Solana program to create an account...

Type: challenge
Duration: 30
XP Reward: 100
Order: 5
Module: Building Your First Program
Challenge: (link to challenge entry)
```

3. **Add Localization** for pt-BR and es
4. Click **Save** and **Publish**

---

### Step 5: Create Challenges

For coding challenges with test cases.

1. Navigate to **Content Manager** → **Challenges**
2. Click **Create new entry**

**Fields:**
- **Title**: Challenge name
- **Description**: What the learner needs to do
- **Starter Code**: Initial code template
- **Solution**: Correct solution (hidden from learners)
- **Test Cases**: JSON array of test cases
- **Hints**: JSON array of hints
- **Difficulty**: easy/medium/hard

**Example:**
```
Title: Create a Token Account
Description: Write a function to create a new token account using Anchor

Starter Code:
```rust
use anchor_lang::prelude::*;

#[program]
pub mod token_account {
    use super::*;
    
    pub fn create_account(ctx: Context<CreateAccount>) -> Result<()> {
        // TODO: Implement account creation
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateAccount<'info> {
    // TODO: Define accounts
}
```

Solution:
```rust
use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

#[program]
pub mod token_account {
    use super::*;
    
    pub fn create_account(ctx: Context<CreateAccount>) -> Result<()> {
        // Account is automatically created by Anchor
        msg!("Token account created: {}", ctx.accounts.token_account.key());
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateAccount<'info> {
    #[account(
        init,
        payer = user,
        token::mint = mint,
        token::authority = user,
    )]
    pub token_account: Account<'info, TokenAccount>,
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}
```

Test Cases (JSON):
```json
[
  {
    "description": "Should create token account",
    "input": {
      "mint": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      "authority": "user_pubkey"
    },
    "expected": "success",
    "points": 50
  },
  {
    "description": "Should fail without authority",
    "input": {
      "mint": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
    },
    "expected": "error",
    "points": 25
  }
]
```

Hints (JSON):
```json
[
  "Remember to use the Token program",
  "The #[account(init)] attribute creates the account",
  "Don't forget to specify the payer",
  "Token account needs mint and authority"
]
```

Difficulty: medium
```

3. **Add Localization** (description and hints only)
4. Click **Save** and **Publish**

---

## 🌍 Localization Best Practices

### What to Translate:
✅ **Title**
✅ **Description**
✅ **Content** (lesson text)
✅ **Instructor name** (if culturally relevant)
✅ **Hints** (in challenges)

### What NOT to Translate:
❌ **Code** (keep in English)
❌ **Slug** (use English for URLs)
❌ **Numeric values** (XP, duration, etc.)
❌ **Tags** (keep in English)
❌ **Test cases** (code remains English)

### Translation Tips:
- Use native speakers or professional translation
- Maintain technical accuracy
- Keep code examples in English
- Adapt examples to local context when relevant

---

## 📊 Content Structure Example

```
Course: Solana Fundamentals
├── Module 1: Introduction to Solana
│   ├── Lesson 1: What is Solana?
│   ├── Lesson 2: Solana vs Ethereum
│   └── Lesson 3: Accounts and Programs
├── Module 2: Development Environment
│   ├── Lesson 4: Setting Up Your Environment
│   ├── Lesson 5: Solana CLI Basics
│   └── Challenge 1: Deploy Your First Program
└── Module 3: Building Programs
    ├── Lesson 6: Anchor Framework Intro
    ├── Challenge 2: Create a Token Account
    └── Lesson 7: Testing Programs
```

---

## 🔄 Bulk Import (Advanced)

### Import from JSON

1. Prepare your JSON file:

```json
{
  "data": [
    {
      "title": "Advanced Solana Programming",
      "slug": "advanced-solana",
      "description": "Deep dive into Solana...",
      "difficulty": "advanced",
      "track": "development",
      "trackId": 1,
      "trackLevel": 3,
      "duration": 240,
      "xpReward": 1000,
      "xpPerLesson": 100,
      "isActive": true
    }
  ]
}
```

2. Use Strapi's Import/Export plugin or API:

```bash
curl -X POST http://localhost:1337/api/courses \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d @courses.json
```

---

## 🎨 Rich Text Editor Tips

### Markdown Support

The content field supports rich text/markdown:

```markdown
# Heading 1
## Heading 2

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Numbered item

`inline code`

```rust
// Code block
pub fn example() {}
```

[Link text](https://example.com)

![Image](image-url.png)
```

### Embed Videos

```markdown
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" allowfullscreen>
</iframe>
```

### Code Snippets

Use the **Code Snippet** field for syntax-highlighted code that can be copied.

---

## ✅ Publishing Checklist

Before publishing content:

- [ ] All required fields filled
- [ ] Spell check completed
- [ ] Code examples tested
- [ ] Translations added (pt-BR, es)
- [ ] Thumbnail uploaded (if applicable)
- [ ] Preview content looks correct
- [ ] XP values are reasonable
- [ ] Lesson order is correct
- [ ] Challenge test cases work
- [ ] Related content linked (prerequisites, etc.)

---

## 🔗 API Access

Once published, content is available via API:

```bash
# Get all courses
GET http://localhost:1337/api/courses?populate=*&locale=en

# Get course by slug
GET http://localhost:1337/api/courses?filters[slug][$eq]=solana-fundamentals&populate=deep

# Get modules for a course
GET http://localhost:1337/api/modules?filters[course][slug][$eq]=solana-fundamentals&populate=*
```

---

## 🆘 Troubleshooting

**Problem**: Content not appearing in API
**Solution**: Make sure it's **Published** (not Draft)

**Problem**: Localization not working
**Solution**: Check i18n plugin is enabled and locale exists

**Problem**: Images not uploading
**Solution**: Check `strapi/public/uploads` permissions

**Problem**: Rich text not rendering
**Solution**: Ensure you're using the correct field type (richtext)

---

## 📚 Next Steps

- See [STRAPI_SETUP.md](./STRAPI_SETUP.md) for installation
- See [I18N_SETUP.md](./I18N_SETUP.md) for next-intl integration
- Check Strapi docs: https://docs.strapi.io

---

**Happy content creating! 📝**
