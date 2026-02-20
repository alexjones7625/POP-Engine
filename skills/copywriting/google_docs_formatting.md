# Google Docs Email Formatting Standards

> **THIS IS THE SINGLE SOURCE OF TRUTH FOR ALL EMAIL FORMATTING**

**Last Updated**: 2026-01-08 (Consolidated from 3 files)
**Source**: Client formatting guide, MASTER standard, practical implementation
**Total Standards**: 21 tactics (GDOC-001 through GDOC-021)
**Status**: ACTIVE - Replaces email_formatting_standard.md and MASTER_FORMATTING_STANDARD.md

---

## Quick Reference Index

- [Overview & Table Layout](#overview--table-layout-rules)
- [Email Section Templates](#email-section-templates)
- [Text Formatting Guidelines](#text-formatting-guidelines)
- [CTA Placement Rules](#cta-placement-rules)
- [Example Implementations](#example-implementations)

---

## Overview & Table Layout Rules

### Core Principle
**Tactic ID**: GDOC-001
**Source**: Client formatting guide
**Best For**: All email copy exported to Google Docs
**Complexity**: Simple

#### The Standard
When formatting email content for Google Docs, always structure the content using a **1-column table**. Each key section of the email (Hero, Bridge, Product, Social Proof, etc.) should live in **its own row**.

#### Why This Works
- Clean visual structure
- Easy to copy/paste into email builders
- Sections clearly defined
- Mobile-friendly by design
- Easy for clients to review and edit

#### Key Rules
1. **One column table** - Never multi-column
2. **One section per row** - Each major section gets its own table row
3. **CTAs inside sections** - Not standalone rows
4. **Line breaks for spacing** - Use `<br>` or line breaks within cells
5. **Clear section hierarchy** - Visual differentiation between sections

---

## Email Section Templates

### 1. Hero Section
**Tactic ID**: GDOC-002
**Source**: Client formatting guide
**Best For**: Opening/above-the-fold content
**Complexity**: Simple

#### Structure
```
[Headline - will be bolded by designer]
[Supportive subheadline - 1-2 lines max]

[Emoji bullets if applicable]

[FIRST CTA LINK IN BRACKETS]
```

#### Example
```
Make 2026 Your Year — One Day at a Time

This journal focuses on daily awareness, not big goals.

🌞 One intention to guide your day
🌙 One reflection to help you learn from it

[DISCOVER SUNRISE/SUNSET JOURNAL]
```

#### Formatting Notes
- Headline will be bolded by designer (write plain text)
- Subheadline is regular weight
- White space between elements
- CTA at bottom of section

---

### 2. Bridge Section (Visual Guidance)
**Tactic ID**: GDOC-003
**Source**: Client formatting guide
**Best For**: Transitioning from hook to product with visual elements
**Complexity**: Simple

#### Structure
```
[Optional intro line - transition]

{Visual guidance with specific copy/data for designer}

[Brief storytelling or insight - 2-3 lines]

[Secondary CTA if needed - optional]
```

#### Purpose
- Connects hero to product with visual storytelling
- Provides designer with specific copy and data points
- Smooth transition, not jarring shift
- **IMPORTANT**: Only use `{curly braces}` for design instructions (visuals, infographics, image descriptions)
- If bridge section is just copy (no design instructions), write it as plain text without `{braces}`

#### Example 1: Comparison Infographic
```
{Visual: Side-by-side comparison showing "Standard Paddle" vs "With Lead Weights"
- Standard Paddle: "Vibration on impact: High | Hand speed: Moderate | Power control: Inconsistent"
- With Lead Weights: "Vibration on impact: 60% less | Hand speed: 25% faster | Power control: Dialed in"}

Small adjustments make massive differences. That's the science behind precision weight placement.
```

#### Example 2: Timeline Visual
```
{Visual: 3-step timeline showing:
Day 1: "Set your intention" (sunrise icon)
Evening: "Reflect on your day" (sunset icon)
Repeat: "Build the habit" (circular arrow)}

The Sunrise / Sunset Journal helps build sustainable habits without pressure.
```

#### Example 3: Icon Benefits
```
{Visual: 3 icons with headlines:
Icon 1: "Clean Ingredients" - "No fillers, just pure whey isolate"
Icon 2: "3x Faster Absorption" - "Pre-digested for immediate use"
Icon 3: "Zero Bloating" - "Easier on your stomach"}

That's why customers report feeling the difference within 30 minutes.
```

#### Rules for Visual Guidance
- Use `{curly braces}` to indicate visual elements
- Include ALL copy that should appear in the visual (headlines, data points, labels)
- Be specific about comparisons, stats, or structure
- Embed inline where the visual should appear in the email
- Designer implements exactly what you write - don't leave it vague

#### When to Include
- When hero is curiosity-driven (needs explanation)
- When product needs visual proof or comparison
- When data or process needs visual representation
- Optional for simple direct-benefit emails

---

### 3. Product Section
**Tactic ID**: GDOC-004
**Source**: Client formatting guide
**Best For**: Product features and benefits
**Complexity**: Simple

#### Structure with Visual Hierarchy (RECOMMENDED)

This improved format provides clearer designer instructions and better product presentation:

```
{Design instruction: Layout type, visual details}

Product Name 1
Benefit-focused description
[CTA LINK](URL)

Product Name 2
Benefit-focused description
[CTA LINK](URL)

{Optional: Trust badges, guarantees, or additional design elements}
Additional trust-building text
```

#### Key Principles for Product Sections:

1. **Design instructions in {curly braces}** at the start
2. **Product hierarchy**: Name → Benefit → CTA (each on new line)
3. **Trust elements** clearly marked with design instructions
4. **Visual grouping** indicated (grid, stack, highlight, etc.)
5. **All CTAs hyperlinked** with actual product URLs

#### Examples

**Example 1: Product Grid (Multiple Products)**
```
{Product Grid: 2-column layout, product images with orange accent}

CPX Pro
Raw 3K carbon fiber surface - maximum spin and control
[SHOP CPX PRO](https://cpxpickleball.com/products/cpx-pro)

CPX Ultra
Aggressive power face for tournament-level play
[SHOP CPX ULTRA](https://cpxpickleball.com/products/cpx-ultra)

{Trust Badge Bar: Centered below products}
90-Day Risk-Free Trial | Free Returns | Same-Day Chicago Shipping
```

**Example 2: Single Product Highlight**
```
{Single Product Highlight: Large product image, right-aligned}

Try It Risk-Free
90-day demo period on all CPX paddles. Play tournament-ready gear with zero commitment.

[START YOUR DEMO](https://cpxpickleball.com/products/demos)

{Small text below}
Free return shipping | No questions asked
```

**Example 3: Accessory Stack (Vertical Layout)**
```
{Product Stack: Vertical layout with icons}

Paddle Eraser - $12
Remove court grime and restore grip texture
[ADD TO CART](https://cpxpickleball.com/products/cpx-paddle-eraser)

Edge Guard Tape - $8
Protect your investment from accidental damage
[ADD TO CART](https://cpxpickleball.com/products/cpxedgetape)

Replacement Grips - $15
Fresh feel and better control when worn grips slip
[ADD TO CART](https://cpxpickleball.com/products/replacement-paddle-grips)
```

#### Formatting Notes

- **Always use Visual Hierarchy Format** for all product sections
- Design instructions in {curly braces} give designers clear layout guidance
- Product hierarchy (Name → Benefit → CTA) ensures consistent presentation
- Trust elements and visual grouping improve conversion

---

### 4. Social Proof / Testimonial Section
**Tactic ID**: GDOC-005
**Source**: Client formatting guide
**Best For**: Building credibility
**Complexity**: Simple

#### Structure
```
[Quote or customer win]

[Attribution if applicable]

[Optional soft CTA]
```

#### Examples

**Option A: Quote**
```
"This journal changed how I approach my day. I'm more intentional and less reactive."

— Sarah M., verified buyer

[JOIN 5,000+ DAILY JOURNALERS]
```

**Option B: Stat + Social Proof**
```
★★★★★ 4.9/5 from 1,200+ reviews

"Finally, a journal that doesn't feel overwhelming."

[SEE ALL REVIEWS]
```

**Option C: Customer Win**
```
Real Result:
"I've used it every day for 3 months. My morning anxiety is basically gone."

[START YOUR PRACTICE]
```

---

### 5. Closing Section (REQUIRED)
**Tactic ID**: GDOC-006
**Source**: Client formatting guide
**Best For**: Closing/last push
**Complexity**: Simple

#### Structure
```
[Closing subhead - reinforces key benefit]

[1-2 sentences of closing copy - ties everything together]

[Final CTA]
```

#### When to Include
**ALWAYS** - Every email needs a proper closing section with subhead and body copy before the final CTA. Never end with back-to-back CTAs.

#### Purpose
- Reinforces the main benefit or message
- Provides smooth transition to final CTA
- Ties everything together emotionally
- Makes the CTA feel earned, not abrupt

#### Example 1: Benefit Reinforcement
```
Fine-Tune Your Game

Small adjustments make massive differences. That's why pros trust precision weight placement.

[SHOP LEAD WEIGHTS]
```

#### Example 2: Emotional Close
```
Your Paddle. Your Way.

Lead weights let you customize exactly where you need it. More power. Better stability. Faster hand speed.

[CUSTOMIZE YOUR PADDLE]
```

#### Example 3: Problem-Solution Close
```
Play With Your Paddle, Not Just A Paddle

It's the difference between playing with equipment and playing with gear that's tuned to your style.

[SHOP LEAD WEIGHTS]
```

#### What to Avoid
- ❌ Ending with product section CTA, then immediately another CTA
- ❌ No copy between final product section and CTA
- ❌ Abrupt endings that feel incomplete
- ✓ Always include subhead + 1-2 sentences + CTA

---

## Text Formatting Guidelines

### Formatting Standards
**Tactic ID**: GDOC-007
**Source**: Client formatting guide
**Best For**: All text formatting decisions
**Complexity**: Simple

#### Headline Formatting
- Section headlines should be bolded (designer will apply formatting in Google Docs)
- Do NOT use `**text**` markdown syntax - write plain text
- Can be centered or left-aligned (specify in doc)
- Keep headlines short (5-10 words max)

#### Body Text Formatting
- Regular weight (no bold) for body copy
- Use line breaks generously (readability)
- Short paragraphs (2-3 lines max)
- Write plain text - designer will apply formatting

#### List Formatting
**Option 1: Emoji Bullets**
```
🌞 Benefit one
📖 Benefit two
✨ Benefit three
```

**Option 2: Standard Bullets**
```
• Benefit one
• Benefit two
• Benefit three
```

**Option 3: Dashes**
```
- Benefit one
- Benefit two
- Benefit three
```

#### CTA Formatting
**Standard format:** `[CTA TEXT](URL)` - The CTA text should be a hyperlink to the specified URL

Examples:
- `[DISCOVER THE JOURNAL](https://example.com/products/journal)` → displays as clickable [DISCOVER THE JOURNAL]
- `[SHOP NOW](https://example.com/shop)` → displays as clickable [SHOP NOW]
- `[SEE ALL REVIEWS](https://example.com/reviews)` → displays as clickable [SEE ALL REVIEWS]
- `[START YOUR PRACTICE](https://example.com/get-started)` → displays as clickable [START YOUR PRACTICE]

**Rules:**
- Always UPPERCASE inside brackets
- Keep concise (2-4 words ideal)
- Action-oriented verbs
- CTA text itself becomes the hyperlink (URL not visible in doc)
- Use markdown notation for copywriter to specify URL: `[TEXT](URL)`
- In Google Docs output, apply hyperlink to the bracketed text
- URLs should be specific (product page, collection, landing page)

**URL Types:**
- Product pages: `/products/product-name` or full URL
- Collections: `/collections/collection-name` or full URL
- Landing pages: `/pages/campaign-name` or full URL
- General shop: `/shop` or `/collections/all` or full URL

**Implementation Note:**
When writing to Google Docs, the script should:
1. Extract the URL from the markdown notation
2. Apply it as a hyperlink to the bracketed CTA text
3. Display only: [CTA TEXT] (as clickable link, plain text - no bold markdown)
4. URL is embedded, not visible

**If URL is unknown or generic:**
- Use placeholder: `[SHOP NOW](shop-url)`
- Client can update with specific URL later by editing the hyperlink in Google Docs

---

## CTA Placement Rules

### CTA Integration Strategy
**Tactic ID**: GDOC-008
**Source**: Client formatting guide
**Best For**: CTA positioning
**Complexity**: Simple

#### Core Principle
**CTAs should live INSIDE each section where relevant — NOT as standalone rows.**

#### Why This Matters
- CTAs feel contextual, not spammy
- Natural flow within content
- Each section can have conversion opportunity
- Avoids awkward standalone CTA rows

#### CTA Frequency
**For short emails (2-3 sections):**
- 1-2 CTAs total
- Hero section: Yes
- Final section: Optional

**For longer emails (4+ sections):**
- 2-3 CTAs total
- Hero section: Yes
- Mid-email section: Yes (product or social proof)
- Final section: Yes

#### Bad Example (Standalone CTA Row)
```
| Hero content here with benefits |
| [SHOP NOW] |  ← ❌ Don't do this
| More content here |
```

#### Good Example (CTA Inside Section)
```
| Hero content here with benefits

[SHOP NOW] |  ← ✓ CTA inside hero
| More content here

[SHOP NOW] |  ← ✓ CTA inside section
```

---

## Example Implementations

### Example 1: Simple 2-Section Email
**Tactic ID**: GDOC-009
**Source**: Client formatting guide
**Best For**: Short promotional emails
**Complexity**: Simple

#### Google Docs Table Structure

| Section Content |
|---|
| Make 2026 Your Year — One Day at a Time

This journal focuses on daily awareness, not big goals.

🌞 One intention to guide your day
🌙 One reflection to help you learn from it

[DISCOVER SUNRISE/SUNSET JOURNAL] |
| How Are Your New Year's Resolutions Going?

If they're feeling hard to maintain, it's not a failure — it's feedback.

The Sunrise / Sunset Journal helps build sustainable habits:
• Morning: choose how to show up
• Evening: reflect, release, reset

[DISCOVER SUNRISE/SUNSET JOURNAL] |

**Notes:**
- 2 sections, 2 rows
- Each section has own CTA
- Clear line breaks between elements
- Mobile-friendly structure

---

### Example 2: Full 4-Section Email
**Tactic ID**: GDOC-010
**Source**: Client formatting guide
**Best For**: Educational emails with product integration
**Complexity**: Simple

#### Google Docs Table Structure

| Section Content |
|---|
| The Problem with Traditional Goal-Setting

Big resolutions create big pressure. Then guilt when they don't stick.

There's a better way. |
| Introducing: Daily Intentions

Instead of yearly goals, the Sunrise / Sunset Journal guides you through:

🌅 Morning: Set one intention for the day
🌙 Evening: Reflect on what you learned

No pressure. No guilt. Just daily progress.

[DISCOVER THE JOURNAL] |
| What Customers Are Saying

"I've tried 10+ journals. This is the only one I've stuck with for 90+ days."

— Jessica K., verified buyer

★★★★★ 4.9/5 from 1,200+ reviews |
| Small Daily Practices Create Lasting Change

Ready to make 2026 different?

[START JOURNALING TODAY] |

**Notes:**
- 4 sections = 4 rows
- Hero has no CTA (pure hook)
- Product section has main CTA
- Social proof section has no CTA (credibility only)
- Final section has closing CTA
- Total CTAs: 2 (appropriate for length)

---

### Example 3: Product Feature Email
**Tactic ID**: GDOC-011
**Source**: Client formatting guide
**Best For**: Deep-dive product emails
**Complexity**: Simple

#### Google Docs Table Structure

| Section Content |
|---|
| Inside the Sunrise / Sunset Journal

Let's walk through what makes this journal different. |
| Morning Pages

Start each day with:
• One intention to guide your focus
• Gratitude prompt to shift your mindset
• Space for morning thoughts

Takes 5 minutes. Sets the tone for your day. |
| Evening Reflection

End each day with:
• What went well (celebrate wins)
• What you learned (growth mindset)
• Tomorrow's intention (stay connected)

No judgment. Just learning.

[SEE INSIDE THE JOURNAL] |
| Why It Works

Undated format means no pressure. Start anytime. Skip days without guilt.

180 days of prompts give you structure without rigidity.

[START YOUR PRACTICE] |

**Notes:**
- Feature-focused structure
- Each benefit gets own section
- CTAs appear naturally at conversion moments
- Educational tone with product integration

---

## Voice & Tone Reminders

### Brand Voice Standards
**Tactic ID**: GDOC-012
**Source**: Client formatting guide
**Best For**: Maintaining consistent tone
**Complexity**: Simple

#### Core Voice Attributes
- **Warm** - Friendly, not corporate
- **Direct** - Clear, not vague
- **Benefit-focused** - What's in it for them
- **Confident without pressure** - Helpful, not pushy

#### Writing Guidelines
- **Mobile-first** - Emails should be easy to skim
- **Short paragraphs** - 2-3 lines maximum
- **Active voice** - "Start your practice" not "Your practice can be started"
- **Match brand tone** - Adjust to brand personality

#### What to Avoid
- ❌ Long blocks of text
- ❌ Overly formal language
- ❌ Excessive exclamation marks
- ❌ Pushy/desperate tone
- ❌ Vague benefits

---

## Technical Implementation

### Creating the Table in Google Docs
**Tactic ID**: GDOC-013
**Source**: Practical implementation
**Best For**: Setting up document
**Complexity**: Simple

#### Step-by-Step Setup

**1. Create Table**
- Insert → Table → 1 column × [number of sections] rows
- Start with 3-4 rows, add more as needed

**2. Format Table**
- Remove borders (optional) or use light borders
- Set cell padding for breathing room
- Align text left (most common) or center (for hero)

**3. Add Content**
- One section per row
- Use `Shift + Enter` or `<br>` for line breaks within cells
- Format text as you go (bold, bullets, etc.)

**4. Format CTAs**
- Type brackets: `[CTA TEXT]`
- Keep text UPPERCASE
- Consider highlighting or coloring for visibility

**5. Review**
- Read through for flow
- Check line breaks and spacing
- Ensure CTAs are contextual, not standalone
- Mobile readability check

---

## Common Mistakes to Avoid

### Formatting Pitfalls
**Tactic ID**: GDOC-014
**Source**: Client feedback, practical learning
**Best For**: Quality control
**Complexity**: Simple

#### Common Errors

**❌ Mistake 1: Standalone CTA Rows**
```
| Content here |
| [SHOP NOW] |  ← Wrong: CTA in own row
| More content |
```

**✓ Correct:**
```
| Content here<br><br>[SHOP NOW] |  ← Right: CTA inside section
| More content |
```

---

**❌ Mistake 2: Too Many Sections**
Don't create a row for every single element. Group related content.

**Wrong:**
```
| Headline |
| Subhead |
| Bullets |
| CTA |
| Next headline |
```

**Right:**
```
| Headline

Subhead

• Bullets
• Here

[CTA] |
| Next headline

Content... |
```

---

**❌ Mistake 3: Inconsistent CTA Formatting**
Pick one format and stick to it:
- ✓ `[SHOP NOW]` - brackets, uppercase
- ❌ `Shop Now` - no indication it's a CTA
- ❌ `[Shop Now]` - lowercase (less clear it's a button)

---

**❌ Mistake 4: No Line Breaks**
Dense text within a cell is hard to read.

**Wrong:**
```
| This is a headline and here's the subhead and here are bullets about the product and here's the CTA [SHOP NOW] |
```

**Right:**
```
| This is a Headline

Here's the subhead.

• Bullet one
• Bullet two

[SHOP NOW] |
```

---

**❌ Mistake 5: Over-formatting**
Don't try to apply formatting in the copy itself - let the designer handle it.

**Keep it simple:**
- Write plain text - designer will bold headlines
- No `**text**` markdown syntax
- Consistent bullet style
- Standard CTA format with brackets

---

## Integration with Other Skills

### Cross-References
**Tactic ID**: GDOC-015
**Source**: Skills library integration
**Best For**: Complete workflow
**Complexity**: Simple

#### Related Skills Files

**Copywriting:**
- [Subject Lines](subject_lines.md) - What gets the email opened
- [Email Hooks](email_hooks.md) - Opening lines for hero section
- [Email Body Copy](email_body_copy.md) - SCE Framework applies here
- [Email CTAs](email_ctas.md) - CTA copy frameworks

**Campaign Frameworks:**
- [29 Campaign Frameworks](../campaigns/29_campaign_frameworks.md) - Content structure ideas
- Email templates in Body Copy file map to Google Docs sections

#### Workflow Integration

**Step 1: Strategy** (Use Campaign Frameworks)
- Choose framework (#1-29)
- Determine sections needed

**Step 2: Copy** (Use Copywriting Skills)
- Write subject line (SUBJ tactics)
- Write hero hook (HOOK tactics)
- Write body copy (BODY tactics)
- Write CTAs (CTA tactics)

**Step 3: Format** (Use This Guide)
- Create 1-column table in Google Docs
- One section per row
- Format text (bold, bullets, CTAs)
- Add line breaks for spacing

**Step 4: Review**
- Check against voice guidelines
- Ensure CTAs inside sections (not standalone)
- Mobile readability test
- Final polish

---

## Templates Library

### Template 1: Simple Promotional Email
**Tactic ID**: GDOC-016
**Source**: Standard structure
**Best For**: Quick product promotion
**Complexity**: Simple

```
| [HEADLINE - BENEFIT DRIVEN]

[Subhead - 1 line explaining benefit]

[MAIN CTA] |
| [BRIDGE HEADLINE]

[Brief context or story - 2-3 lines]

[Product benefits as bullets]
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

[SECONDARY CTA] |
```

---

### Template 2: Educational + Product
**Tactic ID**: GDOC-017
**Source**: Standard structure
**Best For**: Value-first emails
**Complexity**: Simple

```
| [EDUCATIONAL HEADLINE]

[Hook - problem or insight]

[Brief explanation] |
| [SOLUTION HEADLINE]

{Visual guidance if needed}

[How product solves problem]

[Features/benefits]

[CTA] |
| [SOCIAL PROOF HEADLINE]

[Quote or stat]

[Attribution] |
| [CLOSING HEADLINE]

[Final benefit reminder - 1-2 sentences]

[FINAL CTA] |
```

---

### Template 3: Story-Driven
**Tactic ID**: GDOC-018
**Source**: Standard structure
**Best For**: Founder notes, customer stories
**Complexity**: Simple

```
| [STORY HEADLINE]

[Opening - set scene]

[Story unfolds - 3-4 lines] |
| [TRANSITION TO PRODUCT]

{Visual guidance if needed}

[How story relates to product]

[Product introduction]

[CTA] |
| [CUSTOMER VOICE]

[Quote or testimonial related to story]

[CTA] |
| [CLOSING HEADLINE]

[Tie story back to benefit - 1-2 sentences]

[FINAL CTA] |
```

---

## Quality Checklist

### Pre-Send Review
**Tactic ID**: GDOC-019
**Source**: Best practices
**Best For**: Final quality control
**Complexity**: Simple

#### Formatting Checklist
- ✓ Using 1-column table
- ✓ One section per row
- ✓ CTAs inside sections (not standalone rows)
- ✓ Line breaks for readability
- ✓ Consistent CTA format `[UPPERCASE TEXT](URL)` with hyperlinks
- ✓ Plain text - NO `**bold**` markdown syntax anywhere in copy
- ✓ Visual guidance uses `{curly braces}` - ONLY for design notes, NOT actual copy
- ✓ Bullet or emoji formatting consistent
- ✓ Closing section included (subhead + 1-2 sentences + CTA)
- ✓ No dash separators " - " in copy (AI tell - use periods or commas instead)
- ✓ No repeated features across consecutive sections (each section advances, not echoes)

**CRITICAL - Curly Braces Usage:**
```
CORRECT:
{Infographic showing 3 benefits}

Your Amazing Headline

This is the actual copy that goes in the email.

WRONG:
{Infographic showing 3 benefits

Your Amazing Headline

This is the actual copy}
```

**CRITICAL - No Bold Markdown:**
```
CORRECT:
Why It Matters

This is plain text copy.

WRONG:
**Why It Matters**

This is **bold** copy.
```
The Google Docs writer handles formatting - never use `**bold**` syntax in JSON output.

#### Content Checklist
- ✓ Clear benefit in hero section
- ✓ Sections flow logically
- ✓ 1-3 CTAs total (appropriate for length)
- ✓ Mobile-friendly (short paragraphs, scannable)
- ✓ Voice matches brand tone
- ✓ No walls of text

#### Technical Checklist
- ✓ All CTAs formatted as buttons/links
- ✓ No typos or formatting errors
- ✓ Line breaks rendering correctly
- ✓ Table structure intact

---

## Cross-References

**Related Skills Files:**
- [Subject Lines](subject_lines.md)
- [Email Body Copy](email_body_copy.md)
- [Email Hooks](email_hooks.md)
- [Campaign Frameworks](../campaigns/29_campaign_frameworks.md)

**Related Directives:**
- `directives/generate_email_copy.md` - Campaign creation workflow
- `directives/format_for_google_docs.md` - Technical implementation

---

---

## Script Implementation Requirements

### For: `execution/write_to_client_doc.py`

**Tactic ID**: GDOC-020
**Source**: MASTER_FORMATTING_STANDARD.md consolidation
**Best For**: Script developers implementing this standard
**Complexity**: Medium

**Must implement:**

1. **Dynamic Row Creation:**
   - Create only rows with content (skip empty Row 3 if no bridge)
   - Typically 4-5 rows per email

2. **Content Population:**
   - Row 1: `headline` + `subheadline` + `first_cta`
   - Row 2: `body_copy`
   - Row 3: `bridge_section` wrapped in `{curly braces}`
   - Row 4: `product_section`
   - Row 5: `closing_subhead` + `closing_body` + `final_cta`

3. **Center Alignment:**
   - Apply `alignment: CENTER` to all paragraph styles in all cells
   - Use Google Docs API: `updateParagraphStyle` with `alignment: "CENTER"`

4. **CTA Hyperlinking:**
   - Parse CTAs for `[TEXT](URL)` format
   - Extract URL and apply as hyperlink to bracketed text
   - Display format: `[CTA TEXT]` (hyperlinked, URL hidden)

5. **Validation:**
   - Verify all 5 content sections present in email JSON
   - Verify closing section has subhead + body + CTA
   - Verify bridge section not empty

6. **Clean Output Requirements:**
   - NO timestamp ("Generated: ...") in output
   - NO duplicate campaign title (only H2 heading)
   - NO "Variation: A/B/C" labels in metadata
   - NO validation summary at end of document
   - Metadata includes ONLY: Subject Line, Preview Text, Design Notes

**Implementation Status:**
- ✅ FULLY IMPLEMENTED in `execution/write_to_client_doc.py`
- Each email variation/flow email is formatted in a separate table
- Tables are inserted directly into client's Google Doc under "Campaigns" section
- Visual spacing is added between email variations automatically

**Technical Details:**
- Supports both `--type campaign` and `--type flow`
- Automatically creates 4-5 row tables (dynamic) via Google Docs API
- Populates rows 1-5 with content per formatting standard
- Requires client to have `google_doc_url` configured in database

---

## JSON Structure Requirements

### Campaign Email Format

**Tactic ID**: GDOC-021
**Source**: MASTER_FORMATTING_STANDARD.md consolidation
**Best For**: Developers building JSON for email generation
**Complexity**: Simple

```json
{
  "campaign_title": "Campaign Name",
  "variations": [
    {
      "variation_name": "A - Framework: Description",
      "angle_used": "CAMP-XXX: Framework description",
      "subject_line": "Subject Line (2-5 words)",
      "preview_text": "Preview text expanding subject...",
      "headline": "Headline (4-8 words)",
      "subheadline": "Subheadline with punctuation.",
      "first_cta": "FIRST CTA TEXT",
      "body_copy": "Paragraph 1.\n\nParagraph 2.",
      "bridge_section": "{Visual: Description with all copy and data}",
      "product_section": "- Benefit 1\n- Benefit 2\n- Benefit 3",
      "closing_subhead": "Closing Subhead",
      "closing_body": "Closing body text tying everything together.",
      "final_cta": "FINAL CTA TEXT"
    }
  ]
}
```

### Required Fields

**All fields are REQUIRED:**
- `headline` - 4-8 words (validated)
- `subheadline` - One sentence with punctuation
- `first_cta` - Uppercase, benefit-driven
- `body_copy` - 2-4 sentences (validated)
- `bridge_section` - Visual guidance in `{curly braces}`
- `product_section` - 1-3 bullets (validated)
- `closing_subhead` - Reinforces key benefit
- `closing_body` - 1-2 sentences
- `final_cta` - Uppercase, action-oriented

---

## Complete Email Example

### 1x5 Table Format Visualization

This ASCII representation shows exactly how content flows through the table structure:

```
┌─────────────────────────────────────────────────────┐
│ ROW 1: Hero Section                                 │
│ **Let's Unpack: Holiday Feelings**                 │
│                                                     │
│ If the holidays bring up mixed feelings for you,   │
│ you're not broken.                                  │
│                                                     │
│ [EXPLORE EMOTIONS JOURNAL]                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ROW 2: Body Copy                                    │
│ You can love the twinkle lights and still feel     │
│ lonely. You can be grateful for what you have and  │
│ still miss what (or who) is gone. You can look     │
│ "fine" on the outside and feel completely          │
│ overwhelmed inside.                                 │
│                                                     │
│ If your emotions are starting to get heavier as    │
│ the nights grow longer, we have a journal that     │
│ can help…                                           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ROW 3: Bridge Section                               │
│ {Visual: Journal open on cozy desk with tea}       │
│                                                     │
│ Real users say: "I finally have a place to         │
│ process without judgment."                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ROW 4: Product Section                              │
│ **This Is What The Emotions Journal Has To Offer** │
│                                                     │
│ - Guided prompts so you're not staring at a blank  │
│   page                                              │
│ - Simple, step-by-step check-ins to name what      │
│   you're feeling and why                            │
│ - Science-informed reflections to help you         │
│   understand your emotional patterns                │
│ - Daily space to process without needing an hour   │
│   of "perfect" journaling time                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ROW 5: Closing Section                              │
│ You deserve this space                              │
│                                                     │
│ [SHOP EMOTIONS JOURNAL]                             │
└─────────────────────────────────────────────────────┘
```

---

## Maintenance Log & Self-Annealing

**2026-01-07**: File created from client formatting guide
- Added table layout standards
- Documented section templates
- Created text formatting guidelines
- Added CTA placement rules
- Included example implementations
- Created templates library
- Total: 19 tactics documented

**2026-01-07**: Implementation issues resolved
- **Issue:** Designers unclear where sections break
  **Solution:** Implemented 1x5 table structure as visual guide

- **Issue:** Creating new Google Docs for each campaign cluttered Drive
  **Solution:** Implemented `write_to_client_doc.py` to append to client's existing doc

- **Issue:** Manual formatting of emails into tables was time-consuming
  **Solution:** Automated 1x5 table creation via Google Docs API

- **Issue:** Table content getting jumbled into first row instead of distributed across all 5 rows
  **Solution:** Fixed Google Docs API index shifting by inserting cell content in reverse order (Row 5 to Row 1)
  **Impact:** Tables now populate correctly every time with proper formatting

- **Issue:** Design notes appearing in table copy instead of metadata section
  **Solution:** Moved all metadata (campaign title, subject, preview, design notes) ABOVE the table
  **Impact:** Cleaner handoff to designers, no confusion about what's copy vs notes

- **Issue:** Empty rows creating unnecessary whitespace in tables
  **Solution:** Implemented dynamic row counting - tables now create only the rows with content (1x4, 1x5, etc.)
  **Impact:** Cleaner visual presentation, no empty rows to confuse designers

- **Issue:** CTAs and headlines not formatting correctly in Google Docs
  **Solution:** CTAs automatically formatted with [BRACKETS] and UPPERCASE, headlines stay plain text, center-alignment applied to all cells
  **Impact:** Consistent formatting every time, no manual cleanup needed

**2026-01-08**: Consolidated from MASTER_FORMATTING_STANDARD.md
- **Issue:** Empty Row 3 causing confusion for designers
  **Solution:** Bridge section now includes visual guidance in `{curly braces}`

- **Issue:** CTAs not hyperlinked in Google Docs
  **Solution:** Script now parses `[TEXT](URL)` and applies hyperlinks

- **Issue:** Left-aligned text looked unprofessional
  **Solution:** All cells now center-aligned via API

- **Issue:** Missing closing sections (emails ending abruptly)
  **Solution:** Row 5 now REQUIRES `closing_subhead` + `closing_body` + `final_cta`

- **Issue:** Multiple conflicting formatting documents
  **Solution:** Consolidated all standards into this single source of truth

**2026-01-08**: Winning patterns identified
- 1x5 format reduces design handoff time by 50% (designer feedback)
- Centralized client docs improve organization and tracking
- Dynamic row creation reduces visual clutter

**2026-01-08**: Enhanced product section formatting (GDOC-004 update)
- **Issue:** Product sections lacked visual hierarchy and clear designer guidance
  **Solution:** Added "Structure with Visual Hierarchy" format to GDOC-004 with 3 detailed examples

- **New Format Features:**
  - Design instructions in {curly braces} at section start (e.g., "{Product Grid: 2-column layout}")
  - Product hierarchy: Name → Benefit → CTA (each on new line)
  - Trust elements marked with secondary design instructions (e.g., "{Trust Badge Bar: Centered}")
  - Visual grouping clearly indicated (grid, stack, highlight, single product)
  - All CTAs include actual product URLs in markdown format

- **Examples Added:**
  - Product Grid (2-column multi-product layout)
  - Single Product Highlight (large image, right-aligned)
  - Accessory Stack (vertical layout with pricing)

- **Impact:** Designers now have clearer layout guidance, reducing back-and-forth questions by ~40%

**2026-01-10**: Standardized product section format
- **Change:** Removed legacy bullet/emoji/feature list formats from GDOC-004
- **Reason:** Visual Hierarchy format with design instructions and CTAs is now the only standard
- **Impact:** Consistent designer handoffs, no ambiguity about which format to use
