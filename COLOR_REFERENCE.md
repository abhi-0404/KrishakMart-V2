# KrishakMart Color Reference Guide

Quick reference for developers working on KrishakMart

## 🎨 Primary Colors

### Forest Green (Primary)
```css
/* Main - Use for primary buttons, headers, navigation */
#2f7c4f

/* Dark - Use for hover states */
#236240

/* Light - Use for highlights */
#56b886

/* Lightest - Use for backgrounds */
#f0f9f4

/* Borders - Use for card borders */
#bae5cd
```

### Soil Brown (Secondary)
```css
/* Main - Use for accents, secondary elements */
#b87a47

/* Dark - Use for footer borders, dark accents */
#855132

/* Light - Use for hover states */
#cd9968

/* Lightest - Use for backgrounds */
#f5ede3
```

## 🔧 Tailwind Classes

### Backgrounds
```jsx
className="bg-[#2f7c4f]"      // Forest green
className="bg-[#236240]"      // Dark forest green
className="bg-[#f0f9f4]"      // Light green background
className="bg-[#b87a47]"      // Soil brown
className="bg-[#f5ede3]"      // Light beige background
```

### Text Colors
```jsx
className="text-[#2f7c4f]"    // Forest green text
className="text-[#b87a47]"    // Soil brown text
className="text-[#f5ede3]"    // Light beige text (on dark)
```

### Borders
```jsx
className="border-[#bae5cd]"  // Light green border
className="border-[#2f7c4f]"  // Forest green border
className="border-[#b87a47]"  // Soil brown border
```

### Hover States
```jsx
className="hover:bg-[#236240]"     // Dark green hover
className="hover:bg-[#f0f9f4]"     // Light green hover
className="hover:text-[#2f7c4f]"   // Green text hover
```

## 📝 Common Patterns

### Primary Button
```jsx
<Button className="bg-[#2f7c4f] hover:bg-[#236240] text-white font-semibold">
  Click Me
</Button>
```

### Secondary Button
```jsx
<Button className="border-2 border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4] font-semibold">
  Click Me
</Button>
```

### Accent Button (Seasonal/Special)
```jsx
<Button className="bg-[#b87a47] hover:bg-[#855132] text-white font-semibold">
  Special Offer
</Button>
```

### Card with Border
```jsx
<div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#bae5cd]">
  Content
</div>
```

### Section Background
```jsx
<section className="py-16 bg-[#f0f9f4]">
  {/* Light green background section */}
</section>

<section className="py-16 bg-[#2f7c4f] text-white">
  {/* Forest green background section */}
</section>
```

### Gradient Backgrounds
```jsx
{/* Hero gradient */}
className="bg-gradient-to-r from-[#2f7c4f] to-[#236240]"

{/* Footer gradient */}
className="bg-gradient-to-b from-[#2f7c4f] to-[#236240]"

{/* Seasonal offer gradient */}
className="bg-gradient-to-r from-[#b87a47] to-[#855132]"
```

## 🎯 Component-Specific

### Navbar
- Background: `white`
- Border: `border-b-2 border-[#bae5cd]`
- Logo background: `bg-gradient-to-br from-[#2f7c4f] to-[#236240]`
- Links hover: `hover:text-[#2f7c4f]`

### Footer
- Background: `bg-gradient-to-b from-[#2f7c4f] to-[#236240]`
- Top border: `border-t-4 border-[#b87a47]`
- Text: `text-white`
- Icons: `text-[#f5ede3]`

### Hero Section
- Background: `bg-gradient-to-r from-[#2f7c4f] to-[#236240]`
- Tagline color: `text-[#f5ede3]`
- Button: `bg-white text-[#2f7c4f]`

### Trust Badges
- Background: `bg-white`
- Border: `border-2 border-[#bae5cd]`
- Icon: `text-[#2f7c4f]`

## 💡 Tips

1. **Always use hex codes** for brand colors (not Tailwind defaults)
2. **Add font-semibold** to buttons for better readability
3. **Use gradients** for hero sections and special areas
4. **Maintain contrast** - white text on dark green, dark text on light backgrounds
5. **Consistent borders** - Use #bae5cd for light borders, #b87a47 for accent borders

## 🚫 Don't Use

- ❌ `green-600`, `green-700` (use hex codes instead)
- ❌ `orange-500`, `amber-500` (use soil brown instead)
- ❌ Generic Tailwind greens (use brand colors)

## ✅ Do Use

- ✅ `#2f7c4f` for primary actions
- ✅ `#b87a47` for secondary accents
- ✅ `#f0f9f4` for light backgrounds
- ✅ Poppins font with appropriate weights
- ✅ "Mitti Se Digital Tak" tagline in italic

---

**Quick Copy-Paste Colors:**
```
Forest Green: #2f7c4f
Dark Green: #236240
Light Green BG: #f0f9f4
Light Green Border: #bae5cd
Soil Brown: #b87a47
Dark Brown: #855132
Light Beige: #f5ede3
```
