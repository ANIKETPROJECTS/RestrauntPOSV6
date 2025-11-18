# Restaurant POS System - Design Guidelines

## Design Approach
**System:** Custom design system based on user specifications with Material Design principles for data-heavy enterprise UI patterns. This is a utility-focused, professional business application prioritizing efficiency, clarity, and consistent workflows.

## Color System
**Primary Palette:**
- Primary Red: `#E74C3C` (main brand color, CTAs, alerts)
- Secondary Blue: `#3498DB` (informational elements, links)
- Success Green: `#27AE60` (confirmations, available states)
- Warning Yellow: `#F39C12` (alerts, pending states)
- Danger Red: `#E74C3C` (errors, critical actions)
- White: `#FFFFFF` (backgrounds, cards)

**Neutral Grays:**
- Gray-50: `#F8F9FA` (subtle backgrounds)
- Gray-100: `#F1F5F9` (secondary backgrounds)
- Gray-200: `#E0E0E0` (borders)
- Gray-300: `#CBD5E1` (dividers)
- Gray-500: `#7F8C8D` (secondary text)
- Gray-700: `#2C3E50` (sidebar, primary text)
- Gray-900: `#1A1A2E` (headings)

**Background Applications:**
- Primary: `#FFFFFF` (main content areas)
- Secondary: `#F8F9FA` (alternate sections)
- Sidebar: `#2C3E50` (navigation sidebar)

**Status Colors:**
- Available/Active: Green `#27AE60`
- Occupied/Pending: Yellow `#F39C12`
- Reserved/Warning: Blue `#3498DB`
- Billed/Complete: Red `#E74C3C`

## Typography
**Font Families:** 'Inter', 'Poppins', 'Roboto', sans-serif (load via Google Fonts CDN)

**Scale:**
- xs: `text-xs` (12px) - labels, badges, metadata
- sm: `text-sm` (14px) - secondary text, table content
- base: `text-base` (16px) - body text, form inputs
- lg: `text-lg` (18px) - section subheadings
- xl: `text-xl` (20px) - card titles
- 2xl: `text-2xl` (24px) - page headings
- 3xl: `text-3xl` (28px) - dashboard headers

**Weights:**
- Regular: `font-normal` (400) - body text
- Medium: `font-medium` (500) - emphasized text
- Semibold: `font-semibold` (600) - headings, buttons
- Bold: `font-bold` (700) - primary headings

## Layout System
**Spacing Units:** Use Tailwind spacing scale consistently: `p-2, p-4, p-6, m-2, m-4, gap-4, gap-6`

**Common Patterns:**
- Card padding: `p-4` to `p-6`
- Section spacing: `py-6` to `py-8`
- Grid gaps: `gap-4` or `gap-6`
- Button padding: `px-4 py-2` or `px-6 py-3`

**Critical Layouts:**

**Three-Column Billing Screen:**
- Left sidebar (categories): `w-48` to `w-56`, fixed scroll
- Center panel (menu items): Flex-grow, grid layout
- Right sidebar (cart): `w-80` to `w-96`, fixed scroll
- All columns full-height with independent scrolling

**Grid Systems:**
- Menu items: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Dashboard cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Table floor plan: Flexible grid with drag-drop positioning
- Reports: `grid-cols-1 lg:grid-cols-2` for charts

**Border Radius:**
- sm: `rounded` (4px) - input fields, small buttons
- md: `rounded-lg` (8px) - cards, modals
- lg: `rounded-xl` (12px) - featured cards
- full: `rounded-full` - avatars, icon buttons, badges

**Shadows:**
- sm: `shadow-sm` - subtle elevation
- md: `shadow-md` - cards, dropdowns
- lg: `shadow-lg` - modals, popovers
- xl: `shadow-xl` - overlays, important dialogs

## Component Library

**Navigation:**
- Sidebar: Fixed left, dark background (`#2C3E50`), white text, icons from Lucide React
- Top bar: White background, contains quick actions, user profile, date/time
- Info bar: Secondary background, displays context (table number, user, date)
- Breadcrumbs: For multi-level navigation in settings/reports

**Buttons:**
- Primary: Red background, white text, `rounded-lg px-6 py-3`
- Secondary: Blue background, white text
- Success: Green background for confirmations
- Outline: Border with color fill, transparent background
- Icon buttons: `rounded-full p-2` with single icon

**Cards:**
- Menu item cards: Image top, title, price, action button
- Order cards (KDS): Header with order number, item list, timer, status badge
- Dashboard cards: Icon, metric value, label, trend indicator
- Table cards: Shape representation, table number, status color border

**Forms:**
- Input fields: `border border-gray-300 rounded-lg px-4 py-2`
- Select dropdowns: React Select with custom styling
- Search bars: Icon prefix, clear button, real-time filtering
- Quantity controls: Minus button, number display, plus button in horizontal layout
- Validation: Red border on error, helper text below field

**Tables:**
- Header: Gray background, semibold text, sortable columns
- Rows: Zebra striping (alternate `bg-gray-50`), hover highlight
- Actions: Icon buttons in last column
- Pagination: Bottom-aligned, page numbers with prev/next

**Data Display:**
- Badges: `rounded-full px-3 py-1 text-sm` with status colors
- Status indicators: Colored dot + text label
- Charts: Recharts with brand color palette
- Metrics: Large number, label below, optional trend arrow
- Progress bars: Height `h-2`, rounded, colored fill

**Modals & Overlays:**
- Modal: Centered, `max-w-2xl`, white background, shadow-xl
- Drawer: Slide from right, full height, for detailed views
- Toast notifications: Top-right position, auto-dismiss, React Hot Toast
- Confirmation dialogs: Simple centered modal with two-button layout

**Lists:**
- Order items: Item name, quantity badge, price, modifier chips
- Category list: Vertical, active state highlighted
- Search results: Hover highlight, click to select

## Interaction Patterns

**Minimal Animations:**
- Hover states: Subtle color darkening (`hover:bg-opacity-90`)
- Active states: Slight scale reduction (`active:scale-95`)
- Modal entry: Fade in (200ms)
- Toast slides: Slide from right (300ms)
- NO complex animations or transitions

**Real-time Updates:**
- New orders: Toast notification + count badge update
- KDS status changes: Card color transitions
- Table status: Immediate color update

**Keyboard Shortcuts:**
- Display shortcuts in tooltips
- Support common actions (Enter to confirm, Esc to cancel)

## Images
No hero images required. This is a business application focused on functionality. Use icons from Lucide React library throughout for visual hierarchy and quick recognition. Table management may include simple shape representations (SVG) for table visualization in floor plans.

## Accessibility
- High contrast ratios for all text
- Focus indicators on all interactive elements (`focus:ring-2 focus:ring-blue-500`)
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Screen reader friendly status updates