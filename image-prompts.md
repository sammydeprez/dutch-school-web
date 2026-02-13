# Image Generation Prompts

Detailed prompts for generating images to replace placeholders on the Dutch School Nairobi website. All images should maintain a consistent style: warm, welcoming, professional educational environment with bright natural lighting.

**Brand Colors Reference:**
- Primary Green: #4CAF50
- Secondary Orange: #FF9800
- Accent Blue: #2196F3

---

## 1. Homepage Hero Image

**Location:** `src/app/[locale]/page.tsx` - HeroSection
**Current:** Logo displayed in gradient box
**Dimensions:** 4:3 aspect ratio, recommended 1200x900px
**File:** `public/images/hero-main.jpg`

### Prompt:
```
A vibrant, welcoming photograph of a diverse group of primary school children (ages 5-10) in a lush green outdoor school compound in Nairobi, Kenya. The children are of mixed ethnicities including Dutch, Kenyan, and other international backgrounds. They are engaged in outdoor learning activities, some reading books under a tree, others exploring nature. The scene is bathed in warm African morning sunlight filtering through acacia trees. In the background, a modern but modest school building with Dutch architectural influences is visible. The atmosphere is joyful, educational, and multicultural. Professional educational photography style, shallow depth of field on the children, vibrant green grass and foliage. No text or logos.
```

---

## 2. Homepage About Section - Community Photo

**Location:** `src/app/[locale]/page.tsx` - AboutSection
**Current:** Users icon with "School community photo" text
**Dimensions:** Square (1:1), recommended 800x800px
**File:** `public/images/community.jpg`

### Prompt:
```
A warm, authentic group photograph of a diverse school community at Dutch School Nairobi. The image shows teachers (mix of Dutch and Kenyan educators), parents, and children of various ages (toddlers to pre-teens) gathered on a green lawn. Everyone is smiling naturally, not posed stiffly. Some children are wearing casual school attire in green and orange colors. A Dutch and Kenyan flag are subtly visible in the background. The setting is the school's green campus with tropical plants and a covered veranda visible. Golden hour lighting creates a warm, inviting atmosphere. Documentary-style photography, capturing genuine community connection. No text overlays.
```

---

## 3. Programs Page - Toddler Group (Ages 1½-4)

**Location:** `src/app/[locale]/programs/page.tsx` - ProgramsGrid (id: toddler)
**Current:** Baby emoji (👶) with gradient background
**Dimensions:** 4:3 aspect ratio, recommended 800x600px
**File:** `public/images/programs/toddler.jpg`

### Prompt:
```
A heartwarming photograph of toddlers (ages 2-4) engaged in play-based learning at an international school in Kenya. Three to four diverse children of different ethnicities are playing with colorful wooden educational toys in a bright, airy classroom. A caring female teacher with a warm smile is sitting at their level, guiding their play. The classroom has child-sized furniture in natural wood tones, soft play mats in green and orange colors, and educational posters with both Dutch and English words on the walls. Large windows let in abundant natural light. Soft, warm color palette with pops of primary colors from toys. Professional early childhood education photography style, focus on the children's engaged expressions.
```

---

## 4. Programs Page - Primary School (Ages 4-12)

**Location:** `src/app/[locale]/programs/page.tsx` - ProgramsGrid (id: primary)
**Current:** Books emoji (📚) with gradient background
**Dimensions:** 4:3 aspect ratio, recommended 800x600px
**File:** `public/images/programs/primary.jpg`

### Prompt:
```
A dynamic photograph of a small primary school classroom (8-10 students, ages 7-10) during an interactive lesson. Diverse students of Dutch, Kenyan, and international backgrounds are seated at modern group tables, actively participating in a lesson. A teacher stands at a whiteboard showing both Dutch and English text. The classroom is bright with large windows overlooking a green garden. Educational materials, world maps, and children's artwork decorate the walls. Students have tablets and traditional notebooks on their desks. The atmosphere is engaged and collaborative, not rigid. Small class size is evident. Professional educational photography with natural lighting, capturing active learning moments.
```

---

## 5. Programs Page - NTC Lessons (Ages 3.5-18)

**Location:** `src/app/[locale]/programs/page.tsx` - ProgramsGrid (id: ntc)
**Current:** Dutch flag emoji (🇳🇱) with gradient background
**Dimensions:** 4:3 aspect ratio, recommended 800x600px
**File:** `public/images/programs/ntc.jpg`

### Prompt:
```
A photograph of a Dutch language and culture lesson taking place in the afternoon. A small group of 5-6 students of varying ages (elementary to teenage) are seated around a table, practicing Dutch conversation with a native Dutch teacher. The setting is a cozy, well-lit classroom with Dutch cultural elements visible: a small Dutch flag, a map of the Netherlands, traditional Dutch items like wooden clogs or Delft blue pottery on a shelf. Students have Dutch language workbooks open. One student is pointing at flash cards with Dutch words. The atmosphere is intimate and focused but friendly. Warm afternoon light coming through windows. Professional educational photography capturing language learning in action.
```

---

## 6. Programs Page - Adult Dutch Lessons

**Location:** `src/app/[locale]/programs/page.tsx` - ProgramsGrid (id: adult)
**Current:** Graduation cap emoji (🎓) with gradient background
**Dimensions:** 4:3 aspect ratio, recommended 800x600px
**File:** `public/images/programs/adult.jpg`

### Prompt:
```
A professional photograph of an adult Dutch language class. Three to four adult learners (diverse group including expat professionals, a Kenyan businessman, a parent) are seated at a modern conference-style table with notebooks and coffee cups. A Dutch instructor is standing, gesturing while teaching. The setting is a bright, contemporary meeting room with a whiteboard showing Dutch vocabulary. Laptops and learning materials are visible. The adults are engaged and smiling, one is taking notes. Professional business-casual attire. The mood is relaxed yet focused, like a professional development session. Natural daylight from large windows. Corporate education photography style.
```

---

## 7. Programs Page - Extracurricular Activities

**Location:** `src/app/[locale]/programs/page.tsx` - ActivitiesSection
**Current:** Art palette emoji (🎨) with "Activities Image Placeholder"
**Dimensions:** Square (1:1), recommended 800x800px
**File:** `public/images/activities.jpg`

### Prompt:
```
A vibrant collage-style photograph or a dynamic action shot showing children engaged in various extracurricular activities at an international school in Kenya. The main focus could be children doing art and crafts - painting at easels with colorful artwork. In the background or as secondary elements: children in sports uniforms playing football on a green field, a child swimming in a pool, students playing musical instruments (recorder, drums). All children are diverse in ethnicity, ages 5-12. The setting is the school's outdoor campus with green grass, trees, and modern facilities visible. Bright, energetic, joyful atmosphere. Action photography style capturing movement and creativity. Saturated colors, dynamic composition.
```

---

## 8. Contact Page - Map Section

**Location:** `src/app/[locale]/contact/page.tsx` - MapSection
**Current:** MapPin icon with "Interactive Map Placeholder"
**Dimensions:** 16:9 or 21:9 aspect ratio, recommended 1400x600px
**File:** `public/images/map-static.jpg` (or integrate Google Maps)

### Prompt:
```
An illustrated or stylized aerial view map of the Makindi Road area in Nairobi, Kenya, showing the school location. The style should be clean and modern, like a custom illustrated map. Key landmarks visible: the school compound highlighted with a green marker, surrounding residential area with tree-lined streets, nearby main roads labeled. The color scheme uses greens, soft oranges, and blues matching the brand colors. The map has a hand-drawn, friendly quality rather than a stark Google Maps style. Include a subtle compass rose and a "Dutch School Nairobi" label with a small Dutch flag icon at the school location. Clean white background fading at edges. Illustration style, not photographic.
```

**Alternative:** Replace with embedded Google Maps iframe for interactive functionality.

---

## 9. Team Section - Staff Headshots (About Page)

**Location:** `src/app/[locale]/about/page.tsx` - TeamSection
**Current:** Initials in colored circles
**Dimensions:** Square (1:1), recommended 400x400px each
**Files:** `public/images/team/director.jpg`, `primary-head.jpg`, `early-years-head.jpg`, `operations.jpg`

### Prompt (for each staff member):
```
A professional headshot photograph of a [role description] at an international school. The subject is smiling warmly and approachably, wearing smart-casual professional attire. The background is a soft, blurred green (suggesting the school's garden) or a neutral office setting. Natural lighting from the side creates depth. The photo conveys warmth, professionalism, and approachability. Portrait photography style, head and shoulders framing, shallow depth of field on the background.

Specific subjects:
- School Director: Female, Dutch, 45-55 years old, confident and welcoming expression
- Head of Primary: Male, Dutch, 35-45 years old, enthusiastic and energetic
- Head of Early Years: Female, Dutch or international, 30-40 years old, nurturing expression
- Operations Manager: Male, Kenyan, 35-45 years old, professional and friendly
```

---

## 10. Homepage - Testimonials Section (Optional Enhancement)

**Location:** `src/app/[locale]/page.tsx` - TestimonialsSection
**Current:** Initials in gradient circles
**Dimensions:** Square (1:1), recommended 200x200px each
**Files:** `public/images/testimonials/parent1.jpg`, `parent2.jpg`, `parent3.jpg`

### Prompt:
```
A warm, natural headshot of a parent from the school community. The subject is [description below], photographed outdoors with a soft, blurred natural background. They have a genuine, happy smile. Natural lighting, casual but neat appearance. The photo should feel authentic and relatable, not stock photography. Portrait style, head and shoulders.

Subjects:
- Parent 1 (Maria van der Berg): Dutch woman, 35-45, blonde hair, warm smile
- Parent 2 (Peter & Anna Jansen): Dutch couple, 30-40s, photographed together, casual and friendly
- Parent 3 (Sarah Okonkwo): Kenyan woman, 30-40, professional appearance, confident smile
```

---

## Image Specifications Summary

| Image | Dimensions | Aspect Ratio | Format | Max File Size |
|-------|------------|--------------|--------|---------------|
| Hero Main | 1200x900 | 4:3 | JPG/WebP | 200KB |
| Community | 800x800 | 1:1 | JPG/WebP | 150KB |
| Program Images (4) | 800x600 | 4:3 | JPG/WebP | 120KB each |
| Activities | 800x800 | 1:1 | JPG/WebP | 150KB |
| Map | 1400x600 | 21:9 | JPG/PNG | 180KB |
| Team Headshots (4) | 400x400 | 1:1 | JPG/WebP | 50KB each |
| Testimonial Photos (3) | 200x200 | 1:1 | JPG/WebP | 30KB each |

---

## Style Guidelines

1. **Consistency:** All photos should have similar warmth and color grading
2. **Diversity:** Ensure representation of Dutch, Kenyan, and international community members
3. **Authenticity:** Prefer natural, candid moments over stiff posed shots
4. **Lighting:** Warm, natural lighting preferred; avoid harsh shadows
5. **Brand Alignment:** Subtle inclusion of green (primary) and orange (secondary) colors where possible
6. **Optimization:** Compress all images for web; provide WebP versions for modern browsers
7. **Accessibility:** Ensure sufficient contrast; avoid text in images (use alt text instead)
