# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- React 18+
- TypeScript
- Ant Design 5
- [Routing: React Router / Next.js / etc.]
- [Data: REST / GraphQL / etc.]
- [State: Zustand / Redux / React Query / etc.]

## Design System: Ant Design 5

This project uses Ant Design 5 — an enterprise-grade React UI library with a comprehensive component set, token-based theming, and built-in accessibility. Components are imported from `antd` and customized through the design token system via `ConfigProvider`, not CSS overrides.

### Component Usage

Always use Ant Design components when available. Never build custom versions of components that already exist in the library.

**Layout & Structure:**
- `Layout` / `Layout.Header` / `Layout.Sider` / `Layout.Content` / `Layout.Footer` — page scaffolding
- `Card` — content containers (not raw `<div>` with borders)
- `Divider` — visual separators (not `<hr>` or border hacks)
- `Space` — inline element spacing (preferred over manual margin)
- `Flex` — flexbox layout wrapper (Ant Design 5.10+)
- `Grid` (`Row` / `Col`) — responsive column layouts (24-column system)
- `Tabs` — switching between views in the same context
- `Collapse` — expandable content panels
- `Splitter` — adjustable split layouts

**Forms & Input:**
- `Form` + `Form.Item` — form layout, validation, and submission (not raw `<form>`)
- `Input` / `Input.Search` / `Input.TextArea` / `Input.Password` — text inputs
- `InputNumber` — numeric input with stepper
- `Select` — dropdowns with search, multi-select, tags
- `Checkbox` / `Checkbox.Group` — multi-selection toggles
- `Radio` / `Radio.Group` — single-selection toggles
- `Switch` — boolean toggles
- `Slider` — range input
- `DatePicker` / `RangePicker` — date and date range selection
- `TimePicker` — time selection
- `Upload` — file upload with drag-and-drop
- `Transfer` — dual-listbox selection
- `Cascader` — hierarchical selection
- `TreeSelect` — tree-based selection
- `ColorPicker` — color selection (Ant Design 5.5+)

**Feedback & Overlay:**
- `Modal` — dialogs and confirmations (not custom modals)
- `Modal.confirm()` / `Modal.warning()` — imperative confirmation dialogs
- `message` — transient toast notifications (imperative API)
- `notification` — rich notification popups (imperative API)
- `Tooltip` — hover hints
- `Popover` — contextual floating content
- `Popconfirm` — lightweight inline confirmation
- `Alert` — inline status messages (success, info, warning, error)
- `Result` — full-page outcome states (success, error, 404, 403)
- `Spin` — loading spinners
- `Progress` — progress bars and circles
- `Skeleton` — loading placeholders
- `Drawer` — slide-out panels

**Navigation:**
- `Menu` — sidebar and top navigation (supports nested items, groups, icons)
- `Breadcrumb` — hierarchical location
- `Pagination` — page navigation (also built into `Table`)
- `Steps` — multi-step workflows
- `Dropdown` — action menus on click or hover
- `Anchor` — scroll-to anchor navigation

**Data Display:**
- `Table` — tabular data with built-in sort, filter, pagination, row selection, expandable rows
- `List` — vertical item lists
- `Descriptions` — key-value detail display (not custom grids)
- `Badge` — status indicators and counts
- `Tag` — labels and categories
- `Avatar` / `Avatar.Group` — user images with fallback
- `Statistic` — highlighted numbers and metrics
- `Timeline` — chronological event display
- `Tree` — hierarchical data display
- `Empty` — empty state placeholder
- `Image` — image display with preview
- `Calendar` — full-page calendar view
- `Segmented` — iOS-style segmented control

**Actions:**
- `Button` — primary actions. Types: `primary`, `default`, `dashed`, `text`, `link`
- `FloatButton` — floating action button (FAB)

### Spacing

Ant Design uses an **8px grid system**. All spacing should be multiples of 8.

- **Page padding:** `24px` or `32px` (`padding: token.paddingLG` or `token.paddingXL`)
- **Card padding:** `24px` (default Card body padding)
- **Section gaps:** `24px` or `32px`
- **Form field gaps:** `16px` or `24px` (controlled by `Form` `layout` prop)
- **Inline element gaps:** `8px` (`<Space size="small">`) or `16px` (`<Space size="middle">`)
- **Tight spacing (tags, badges):** `4px` or `8px`
- **Button groups:** Use `<Space>` with `size="small"` (8px)
- **Card grids:** Use `<Row gutter={[16, 16]}>` or `gutter={[24, 24]}`

Token references for custom styled-components:

```tsx
const { token } = theme.useToken();

token.paddingXS   // 8px
token.paddingSM   // 12px
token.padding     // 16px
token.paddingLG   // 24px
token.paddingXL   // 32px
token.marginXS    // 8px
token.marginSM    // 12px
token.margin      // 16px
token.marginLG    // 24px
token.marginXL    // 32px
```

Never use arbitrary pixel values. Stick to the 8px grid via tokens.

### Color System

Use Ant Design's **design tokens**, not raw hex values. Customize via `ConfigProvider` theme.

**Core semantic tokens:**

```
colorPrimary              — brand color, primary buttons, active states
colorSuccess              — success feedback
colorWarning              — warning feedback
colorError                — error feedback, destructive actions
colorInfo                 — informational feedback
colorTextBase             — primary text
colorText                 — standard text (slightly lighter)
colorTextSecondary        — secondary/description text
colorTextTertiary         — disabled or placeholder text
colorBgContainer          — card/surface backgrounds
colorBgLayout             — page-level background
colorBgElevated           — elevated surfaces (dropdowns, popovers)
colorBorder               — standard borders
colorBorderSecondary      — subtle borders
colorFill                 — subtle fills (hover states)
colorFillSecondary        — lighter fills
```

Usage in components and custom styles:

```tsx
const { token } = theme.useToken();

// In style objects
const style = {
  color: token.colorText,
  backgroundColor: token.colorBgContainer,
  border: `1px solid ${token.colorBorder}`,
};

// For primary emphasis
{ color: token.colorPrimary }

// For secondary text
{ color: token.colorTextSecondary }
```

Never use raw hex/rgb values. Always reference tokens.

### Typography

Ant Design provides a `Typography` component with semantic variants:

```tsx
import { Typography } from 'antd';
const { Title, Text, Paragraph, Link } = Typography;

// Page titles
<Title level={1}>Page Title</Title>         // 38px bold
<Title level={2}>Section Heading</Title>    // 30px bold
<Title level={3}>Card Title</Title>         // 24px bold
<Title level={4}>Subsection</Title>         // 20px bold
<Title level={5}>Small Heading</Title>      // 16px bold

// Body text
<Text>Default body text</Text>              // 14px (base)
<Text type="secondary">Helper text</Text>   // 14px, muted
<Text type="success">Success text</Text>
<Text type="warning">Warning text</Text>
<Text type="danger">Error text</Text>
<Text strong>Bold text</Text>
<Text code>Inline code</Text>

// Paragraphs (adds margin-bottom)
<Paragraph>Long-form content goes here.</Paragraph>

// Links
<Link href="/path">Linked text</Link>
```

Token references for custom styles:

```tsx
token.fontSizeSM   // 12px — captions, small labels
token.fontSize     // 14px — base body text
token.fontSizeLG   // 16px — emphasized body text
token.fontSizeXL   // 20px — subheadings
```

Always use `Typography` components or tokens. Never hardcode font sizes.

### Dark Mode

Ant Design 5 handles dark mode via the **algorithm** system in `ConfigProvider`:

```tsx
import { ConfigProvider, theme } from 'antd';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          // Token overrides apply to both modes
        },
      }}
    >
      <AppContent />
    </ConfigProvider>
  );
}
```

Rules:
- Never hardcode colors in styles — always use `theme.useToken()` or semantic component props
- The `darkAlgorithm` auto-generates dark versions of all tokens
- You can combine algorithms: `[theme.darkAlgorithm, theme.compactAlgorithm]`
- Test both modes — if something looks wrong, you're using a raw color

### File Structure

```
src/
├── app/ or pages/            # Route-level pages
│   ├── layout.tsx            # Root layout with ConfigProvider
│   └── [feature]/
│       └── index.tsx
├── components/
│   ├── common/               # Shared composed components
│   │   ├── PageHeader.tsx
│   │   ├── DataTable.tsx
│   │   └── FormModal.tsx
│   └── [feature]/            # Feature-specific components
│       ├── UserList.tsx
│       └── UserForm.tsx
├── hooks/                    # Custom hooks
├── services/                 # API calls
├── theme/
│   ├── config.ts             # ConfigProvider theme token overrides
│   └── tokens.ts             # Custom extended tokens (if needed)
├── types/                    # TypeScript types and interfaces
└── utils/                    # Shared utility functions
```

### Naming Conventions

- **Component files:** `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Component names:** `PascalCase` (e.g., `UserProfile`)
- **Hook files:** `camelCase.ts` prefixed with `use` (e.g., `useUserData.ts`)
- **Utility files:** `camelCase.ts` (e.g., `formatDate.ts`)
- **Type files:** `camelCase.ts` or `PascalCase.ts` (e.g., `user.ts`, `UserTypes.ts`)
- **Theme files:** `camelCase.ts` in `theme/` directory
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_PAGE_SIZE`)

### Patterns

**Forms:** Always use `Form` + `Form.Item` with validation rules:

```tsx
const [form] = Form.useForm();

<Form
  form={form}
  layout="vertical"
  onFinish={(values) => handleSubmit(values)}
  initialValues={{ role: 'user' }}
>
  <Form.Item
    name="email"
    label="Email"
    rules={[
      { required: true, message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' },
    ]}
  >
    <Input placeholder="you@example.com" />
  </Form.Item>

  <Form.Item name="role" label="Role">
    <Select
      options={[
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ]}
    />
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">Save</Button>
  </Form.Item>
</Form>
```

**Tables with sort, filter, and pagination:**

```tsx
const columns: ColumnsType<User> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => (
      <Tag color={status === 'active' ? 'green' : 'default'}>{status}</Tag>
    ),
  },
  {
    title: 'Actions',
    render: (_, record) => (
      <Space>
        <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
        <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.id)}>
          <Button type="link" danger>Delete</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

<Table
  columns={columns}
  dataSource={users}
  rowKey="id"
  pagination={{ pageSize: 20, showSizeChanger: true, showTotal: (total) => `${total} items` }}
/>
```

**Pro Components (admin UIs):** For complex admin scenarios, use `@ant-design/pro-components`:

```tsx
import { ProTable, ProForm, ProFormText, ProLayout, PageContainer } from '@ant-design/pro-components';

// ProTable — advanced table with built-in search form, toolbar, and request handling
<ProTable
  columns={columns}
  request={async (params) => {
    const data = await fetchUsers(params);
    return { data: data.list, total: data.total, success: true };
  }}
  rowKey="id"
  search={{ labelWidth: 'auto' }}
  toolBarRender={() => [
    <Button key="add" type="primary">Add User</Button>,
  ]}
/>

// ProForm — forms with layout presets and automatic submission
<ProForm onFinish={async (values) => await saveUser(values)}>
  <ProFormText name="name" label="Name" rules={[{ required: true }]} />
  <ProFormText name="email" label="Email" rules={[{ type: 'email' }]} />
</ProForm>
```

**Loading states:** Use `Skeleton` components matching the shape of content. Use `Spin` for action-triggered loading.

**Empty states:** Use `<Empty>` component or `<Result status="404" />` for missing data — never a blank screen.

**Responsive:** Use `<Row>` / `<Col>` with responsive props: `<Col xs={24} sm={12} lg={8}>`.

### Theme Customization

Always customize through `ConfigProvider`, not CSS overrides:

```tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#5b21b6',
      borderRadius: 8,
      fontFamily: "'Inter', sans-serif",
    },
    components: {
      Button: {
        colorPrimary: '#5b21b6',
        algorithm: true,
      },
      Card: {
        paddingLG: 32,
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

### Anti-Patterns — Do NOT

- Install other component libraries alongside Ant Design (no MUI, Chakra, ShadCN)
- Use native HTML elements when an Ant Design component exists (`<button>` -> `<Button>`, `<select>` -> `<Select>`)
- Override Ant Design styles with raw CSS or `!important` — customize via `ConfigProvider` tokens
- Use `style={{}}` with hardcoded colors — use `theme.useToken()` tokens
- Use `message.success()` or `notification.open()` outside of React context (use `App.useApp()` hook)
- Nest `Form.Item` inside `Form.Item` without proper `name` path (use array paths for nested fields)
- Use `Table` `onChange` and `pagination` props simultaneously in conflicting ways
- Skip the `rowKey` prop on `Table` (causes React key warnings and bugs)
- Create custom modals, tooltips, or dropdowns when Ant Design provides them
- Use `moment` for dates — Ant Design 5 uses `dayjs` by default
- Hardcode breakpoints — use the Grid system's responsive props

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Components are functional, using hooks
- Use `Form.useForm()` for form instance management
- Use `theme.useToken()` for accessing design tokens in custom components
- Use `App.useApp()` for `message`, `notification`, and `modal` imperative APIs
- Keep components small and focused — one job per component
- Colocate related files (component + its types + its hooks)
- [Prefer server components / client-only — depends on framework]

## Notes

[Any project-specific context]
