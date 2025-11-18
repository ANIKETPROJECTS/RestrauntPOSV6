# **COMPLETE RESTAURANT POS SYSTEM - REPLIT DEVELOPMENT PROMPT**

## **PROJECT OVERVIEW**
Create a comprehensive, full-featured restaurant Point of Sale (POS) and management system web application that matches or exceeds PetPooja software in functionality and design. You must research PetPooja's interface, features, and user experience for EACH page before implementing it.

---

## **CRITICAL INSTRUCTIONS**

### **RESEARCH REQUIREMENT:**
**BEFORE building ANY page or feature, you MUST:**
1. Research PetPooja's implementation of that specific feature
2. Study the UI/UX patterns they use
3. Understand the workflow and user interactions
4. Identify pain points and areas for improvement
5. Then build a BETTER version with improved UX

### **DESIGN PHILOSOPHY:**
- **Match the layout structure** of PetPooja (three-column for billing, visual layouts for tables, etc.)
- **Improve the aesthetics** with modern design trends
- **Enhance usability** with better interactions and feedback
- **Maintain single-window application** principle - no page reloads
- **Professional, clean, minimalist** design approach

---

## **TECHNOLOGY STACK**

### **Frontend:**
- **Framework:** React.js with TypeScript (preferred) or JavaScript
- **Styling:** Tailwind CSS (for rapid, consistent styling)
- **Icons:** Lucide React
- **State Management:** React Context API + Redux Toolkit
- **Routing:** React Router (for SPA navigation)
- **HTTP Client:** Axios
- **Date Handling:** date-fns or dayjs
- **Forms:** React Hook Form + Yup validation
- **Charts:** Recharts or Chart.js
- **Tables:** React Table (TanStack Table)

### **Backend Ready:**
- **Database:** MongoDB
- Structure all data models for MongoDB from the start
- Create proper schemas and relationships
- Plan for API endpoints (RESTful)

### **Additional Libraries:**
- **React Hot Toast** - for notifications
- **Framer Motion** - for smooth animations
- **React Select** - for advanced dropdowns
- **React Dropzone** - for file uploads
- **jsPDF / react-pdf** - for PDF generation
- **React QR Code** - for QR generation
- **Socket.io-client** - for real-time updates (KDS, orders)

---

## **DESIGN SYSTEM**

### **Color Palette:**
```javascript
// Light Theme (Primary)
const colors = {
  primary: {
    50: '#fef2f2',
    500: '#E74C3C', // Main red
    600: '#dc2626',
    700: '#b91c1c',
  },
  secondary: {
    500: '#3498DB', // Blue
    600: '#2563eb',
  },
  success: '#27AE60',
  warning: '#F39C12',
  danger: '#E74C3C',
  gray: {
    50: '#F8F9FA',
    100: '#F1F5F9',
    200: '#E0E0E0',
    300: '#CBD5E1',
    500: '#7F8C8D',
    700: '#2C3E50',
    900: '#1A1A2E',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    sidebar: '#2C3E50',
  }
}
```

### **Typography:**
```javascript
const typography = {
  fontFamily: "'Inter', 'Poppins', 'Roboto', sans-serif",
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }
}
```

### **Spacing & Sizing:**
```javascript
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
}

const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
}

const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.12)',
  md: '0 2px 8px rgba(0,0,0,0.1)',
  lg: '0 4px 16px rgba(0,0,0,0.12)',
  xl: '0 8px 24px rgba(0,0,0,0.15)',
}
```

---

## **PAGES TO BUILD (50 Pages Total)**

### **PHASE 1: CORE POS SYSTEM (Priority - Build First)**

#### **1. Login Page**
- Research PetPooja's login screen
- Username/Email + Password authentication
- Remember me functionality
- Forgot password flow
- Clean, centered design
- Company logo and branding

#### **2. Main Dashboard / Billing Screen** ⭐ (MOST IMPORTANT)
**CRITICAL LAYOUT - MUST MATCH PETPOOJA:**
```
┌─────────────────────────────────────────────────────┐
│ [Logo] [New Order] [Bill Search]    [Icons] [User]  │ Top Nav
├─────────────────────────────────────────────────────┤
│ Table: X | User: Y          Date: Z                 │ Info Bar
├─────────┬───────────────────────────┬───────────────┤
│ CATEGOR │   MENU ITEMS GRID        │  ORDER CART   │
│ IES     │   (Search + Cards)       │  (Right Side) │
│ (Left)  │                          │               │
│ • Fast  │  [Item] [Item] [Item]    │  [Dine In]    │
│   Food  │  [Item] [Item] [Item]    │  Quick Icons  │
│ • Bever │  [Item] [Item] [Item]    │               │
│ • Burg  │                          │  Items List   │
│ [Scroll]│  [Scrollable]            │  with Qty     │
│         │                          │               │
│         │                          │  Payment      │
│         │                          │  Total        │
│         │                          │  Buttons      │
└─────────┴───────────────────────────┴───────────────┘
```

**Features to Include:**
- Three-column responsive layout
- Category sidebar (fixed, scrollable)
- Menu items grid (searchable, filterable)
- Real-time order cart (right sidebar)
- Service type tabs (Dine-in, Delivery, Pickup)
- Quick actions (Table, Customer, Split, Notes)
- Quantity controls (-, number, +)
- Payment method selection
- Multiple action buttons (Save, Print, KOT, eBill)
- Keyboard shortcuts support
- Smooth animations and transitions

#### **3. Table Management**
- Research PetPooja's table layout interface
- Visual floor plan with drag-drop tables
- Color-coded table status (Available, Occupied, Reserved, Billed)
- Table shapes (round, square, rectangle)
- Multi-floor support
- Table details popup
- Merge/split table functionality
- Transfer orders between tables
- Reservation system
- Real-time status updates

#### **4. Kitchen Display System (KDS)**
- Research PetPooja's KDS interface
- Order cards with status (New, Preparing, Ready)
- Color coding (Red=Urgent, Yellow=Preparing, Green=Ready)
- Timer for each order
- Item-level tracking
- Kitchen station filtering
- Sound and visual alerts
- Mark items ready functionality
- Full-screen mode for kitchen displays
- Auto-refresh orders

#### **5. Menu Management**
- Research PetPooja's menu builder
- Add/Edit/Delete menu items
- Category management
- Item variants (Small, Medium, Large)
- Add-ons and customizations
- Recipe management with ingredients
- Cost calculation and profit margins
- Bulk import/export (CSV, Excel)
- Item images upload
- Short codes for quick billing
- Availability scheduling
- Tax configuration per item

#### **6. Reports Dashboard**
- Research PetPooja's reporting interface
- Sales summary cards
- Interactive charts (line, bar, pie)
- Date range picker
- Multiple report types:
  - Daily/Weekly/Monthly sales
  - Item-wise sales
  - Category-wise sales
  - Payment method breakdown
  - Waiter performance
  - Peak hours analysis
- Export to PDF/Excel
- Print functionality
- Comparison reports (vs previous period)

#### **7. Settings Page**
- Research PetPooja's settings layout
- Restaurant profile setup
- Tax configuration (GST rates)
- Printer settings
- Receipt customization
- Business hours
- Currency settings
- Multi-outlet configuration
- Payment gateway integration
- Notification preferences
- User interface preferences
- Backup and restore

---

### **PHASE 2: OPERATIONAL PAGES**

#### **8. Delivery Management**
- Research PetPooja's delivery interface
- Two-panel layout (Orders | Delivery Personnel)
- Order status tracking
- Delivery person assignment
- Live tracking with maps
- Platform integration display (Zomato, Swiggy)
- Customer details and address
- Delivery timeline
- Contact options (Call, SMS)

#### **9. Online Orders Integration**
- Platform aggregation dashboard
- Accept/Reject orders
- Auto-sync with delivery platforms
- QR code ordering system
- Own website integration
- Real-time menu sync
- Order notifications

#### **10. Customer Management (CRM)**
- Customer database with search
- Customer profiles with history
- Order history per customer
- Contact management
- Birthday/Anniversary tracking
- Customer preferences
- Address management
- Customer segments (VIP, Regular, New)

#### **11. Loyalty Program Management**
- Points system configuration
- Tier management (Silver, Gold, Platinum)
- Points earning rules
- Redemption options
- Member cards generation
- Loyalty reports
- Birthday/Anniversary rewards

#### **12. Inventory Management**
- Research PetPooja's inventory system
- Stock tracking real-time
- Low stock alerts
- Item-wise stock levels
- Category-based organization
- Stock adjustment functionality
- Multi-unit support (kg, liter, piece)
- Expiry date tracking
- Stock movement history

#### **13. Purchase Orders**
- Create/Edit purchase orders
- Supplier selection
- Item selection from inventory
- Quantity and pricing
- PO approval workflow
- Goods received note (GRN)
- Invoice matching
- Payment tracking

#### **14. Supplier Management**
- Supplier database
- Contact information
- Payment terms
- Purchase history
- Outstanding payments
- Supplier ratings
- Category-wise suppliers

#### **15. Staff Management**
- Employee database
- Role assignment
- Contact details
- Document management
- Performance tracking
- Commission setup

#### **16. Attendance & Shifts**
- Clock in/out system
- Shift scheduling calendar
- Attendance reports
- Late/Early tracking
- Leave management
- Overtime calculation

#### **17. Reservations Management**
- Reservation calendar
- Table booking
- Customer information
- Party size tracking
- Special requests
- Confirmation notifications
- Waitlist management

---

### **PHASE 3: FINANCIAL PAGES**

#### **18. Expenses Management**
- Daily expense entry
- Category-wise expenses
- Vendor payments
- Petty cash management
- Receipt uploads
- Expense reports

#### **19. Payment Settlement**
- Day-end closing
- Cash reconciliation
- Card settlement
- UPI settlement
- Discrepancy reporting
- Bank deposit entry

#### **20. Accounting & Books**
- Ledger management
- Journal entries
- Trial balance
- P&L statement
- Balance sheet

#### **21. Tax Reports (GST)**
- GSTR-1 preparation
- GSTR-3B data
- HSN/SAC mapping
- Tax summary
- Export for filing

#### **22. Invoice Management**
- Generate invoices
- Invoice templates
- Invoice history
- Payment tracking
- Email/SMS invoices

#### **23. Day End Settlement**
- Cash count
- Sales summary
- Payment breakdown
- Expense summary
- Variance report
- Closing balance

---

### **PHASE 4: ADVANCED FEATURES**

#### **24. Offers & Promotions**
- Discount management
- BOGO offers
- Happy hour setup
- Day-specific offers
- Category discounts

#### **25. Coupon Management**
- Generate coupons
- Validity period
- Usage limits
- Minimum order value
- Redemption tracking

#### **26. Feedback Management**
- Feedback collection
- Rating system
- Review management
- Response system
- Sentiment analysis

#### **27. Analytics Dashboard**
- Advanced metrics
- Predictive analytics
- Customer behavior
- Sales forecasting
- Trend analysis

#### **28-33. Detailed Reports**
- Sales reports (detailed)
- Item performance
- Customer analytics
- Kitchen performance
- Wastage management
- Recipe costing

#### **34. Multi-Location Dashboard**
- Outlet comparison
- Consolidated reports
- Inter-outlet transfers
- Centralized menu control

#### **35. User Roles & Permissions**
- Role definition
- Granular permissions
- Access control
- Permission templates

#### **36. Audit Logs**
- System activity tracking
- User action logs
- Change history
- Security logs

#### **37. Notifications Center**
- All notifications
- Mark read/unread
- Filter by type
- Notification settings

#### **38. Help & Support**
- Documentation
- Video tutorials
- FAQs
- Contact support
- Ticket system

#### **39. User Profile**
- Personal information
- Change password
- Preferences
- Activity history

#### **40. System Backup & Restore**
- Manual backup
- Scheduled backups
- Restore functionality
- Export data

---

### **ADDITIONAL MODULES (41-50)**

#### **41. QR Code Management**
- Table QR generation
- Menu QR codes
- Payment QR
- Bulk generation

#### **42. Waiting List Management**
- Queue management
- SMS notifications
- Estimated wait time
- Priority customers

#### **43. Event Booking**
- Event calendar
- Venue booking
- Catering packages
- Advance payments

#### **44. Gift Card Management**
- Issue gift cards
- Track balances
- Redemption
- Expiry management

#### **45. Commission Management**
- Waiter commission
- Delivery commission
- Calculation rules
- Payment tracking

#### **46. Printer Configuration**
- Printer setup
- KOT printers
- Bill printers
- Station-wise printers
- Test print

#### **47. Email/SMS Templates**
- Template builder
- Variable placeholders
- Preview functionality
- Send test

#### **48. Marketing Campaigns**
- SMS campaigns
- Email campaigns
- WhatsApp campaigns
- Campaign analytics

#### **49. Integration Settings**
- Zomato API
- Swiggy API
- Payment gateways
- Accounting software
- API key management

#### **50. Database Management**
- View collections
- Data export
- Data cleanup
- System health

---

## **MONGODB DATA STRUCTURES**

### **Create the following collections with proper schemas:**

1. **users** - User authentication and profiles
2. **menuItems** - Menu items with variants and add-ons
3. **categories** - Menu categories
4. **orders** - Customer orders with items
5. **tables** - Restaurant tables
6. **customers** - Customer profiles and history
7. **inventory** - Stock items
8. **stockMovements** - Inventory transactions
9. **purchaseOrders** - Purchase orders to suppliers
10. **suppliers** - Supplier information
11. **employees** - Staff details
12. **attendance** - Staff attendance records
13. **shifts** - Shift schedules
14. **deliveries** - Delivery orders
15. **deliveryPersonnel** - Delivery staff
16. **kot** - Kitchen order tickets
17. **payments** - Payment transactions
18. **expenses** - Daily expenses
19. **reservations** - Table reservations
20. **loyalty** - Loyalty program data
21. **coupons** - Promotional coupons
22. **feedback** - Customer feedback
23. **settings** - System settings
24. **notifications** - System notifications
25. **auditLogs** - Activity logs

---

## **KEY FEATURES TO IMPLEMENT**

### **Real-time Updates:**
- Use WebSocket/Socket.io for:
  - New orders to KDS
  - Table status changes
  - Stock updates
  - Delivery status updates

### **Responsive Design:**
- Desktop: Full three-column layout
- Tablet: Collapsible sidebar
- Mobile: Bottom navigation, single column

### **Keyboard Shortcuts:**
- Implement throughout the application
- Show shortcuts on hover (tooltips)
- Configurable shortcuts

### **Offline Support:**
- Service worker for PWA
- Local storage for critical data
- Sync when online

### **Performance:**
- Lazy loading for pages
- Image optimization
- Virtualized lists for large data
- Debounced search
- Pagination for large datasets

### **Security:**
- JWT authentication
- Role-based access control
- Input sanitization
- XSS protection
- CSRF protection

### **Print Functionality:**
- KOT printing (thermal)
- Bill printing (thermal + A4)
- Report printing
- Custom templates

### **Internationalization (i18n):**
- Multi-language support
- Currency formatting
- Date/Time formatting
- RTL support ready

---

## **UI/UX GUIDELINES**

### **Consistency:**
- Use same button styles throughout
- Consistent spacing and alignment
- Standard modal sizes
- Uniform color usage
- Same icon set everywhere

### **Feedback:**
- Loading states for all async operations
- Success/Error toast notifications
- Confirmation dialogs for destructive actions
- Progress indicators for long operations
- Skeleton loaders for content

### **Accessibility:**
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Color contrast compliance (WCAG AA)

### **Animations:**
- Smooth transitions (200-300ms)
- Hover effects on interactive elements
- Page transition animations
- Micro-interactions (button clicks, toggles)
- Loading animations

### **Empty States:**
- Friendly messages for empty lists
- Call-to-action buttons
- Helpful illustrations
- Guide users on next steps

### **Error Handling:**
- Clear error messages
- Suggested solutions
- Retry options
- Fallback UI

---

## **DEVELOPMENT APPROACH**

### **Step 1: Setup**
1. Initialize React + TypeScript project
2. Install all dependencies
3. Setup Tailwind CSS
4. Configure folder structure
5. Create design system components

### **Step 2: Core Components**
Build reusable components:
- Button (primary, secondary, danger, etc.)
- Input (text, number, password, etc.)
- Select/Dropdown
- Modal/Dialog
- Tabs
- Card
- Badge
- Table
- Pagination
- DatePicker
- Toast/Notification

### **Step 3: Build Pages (In Order)**
**MUST RESEARCH PETPOOJA BEFORE EACH PAGE**
1. Start with Login page
2. Then Main Billing Screen (spend most time here)
3. Then other core pages (Phase 1)
4. Then operational pages (Phase 2)
5. Then financial pages (Phase 3)
6. Finally advanced features (Phase 4)

### **Step 4: Testing**
- Test each page thoroughly
- Check responsive behavior
- Test all interactions
- Verify data flows
- Performance testing

---

## **DELIVERABLES**

### **Code Quality:**
- Clean, well-commented code
- Reusable components
- Proper file organization
- Consistent naming conventions
- Type safety (if TypeScript)

### **Documentation:**
- README with setup instructions
- Component documentation
- API endpoint documentation
- Database schema documentation
- User guide

### **Features:**
- All 50 pages fully functional (UI only, no backend)
- Responsive design working on all devices
- Smooth animations and transitions
- Sample/mock data populated
- All interactions working

---

## **CRITICAL SUCCESS FACTORS**

1. ✅ **RESEARCH PETPOOJA** before building each page
2. ✅ **Match their layout** structure but improve aesthetics
3. ✅ **Single-window application** - no page reloads
4. ✅ **Professional, modern UI** - clean and minimalist
5. ✅ **Smooth animations** - everything feels polished
6. ✅ **Responsive design** - works on all devices
7. ✅ **MongoDB-ready** - proper data structures
8. ✅ **Reusable components** - DRY principle
9. ✅ **Performance optimized** - fast and smooth
10. ✅ **Accessible** - WCAG compliant

---

## **FINAL NOTES**

- **DO NOT** skip the research phase for any page
- **DO NOT** use placeholder/dummy UI - make it production-ready
- **DO NOT** hardcode values - use constants and configs
- **DO** make it better than PetPooja in every aspect
- **DO** focus on user experience and smooth interactions
- **DO** ensure everything is pixel-perfect and polished

---

**START WITH PHASE 1 (Core POS System) and build them one by one after researching PetPooja's implementation of each feature.**