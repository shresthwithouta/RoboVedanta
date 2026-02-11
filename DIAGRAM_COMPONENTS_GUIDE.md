# 📊 Reusable Diagram Components Guide

## Overview

Created scalable, reusable visualization components in `src/components/ui/Diagrams.jsx` that can be used across all pages for consistent, premium design.

---

## Components

### 1. **ProgressFlow**

Shows step-by-step progression (horizontal or vertical).

**Use Cases**: Learning journeys, process flows, timelines

```jsx
import { ProgressFlow } from "@/components/ui/Diagrams";

<ProgressFlow
  variant="horizontal" // or "vertical"
  steps={[
    { label: "Jigyasa", sublabel: "Grade 6-7", number: 1 },
    { label: "Samvedana", sublabel: "Grade 7-8", number: 2 },
    { label: "Rachana", sublabel: "Grade 8-9", number: 3 },
    { label: "Bodh", sublabel: "Grade 9-10", number: 4 },
    { label: "Udaan", sublabel: "Grade 11-12", number: 5 },
  ]}
/>;
```

---

### 2. **SkillBar**

Animated progress bar for single skill.

**Use Cases**: Individual skill levels, completion percentages

```jsx
import { SkillBar } from "@/components/ui/Diagrams";

<SkillBar
  label="Programming Proficiency"
  percentage={85}
  delay={0.2}
  showPercentage={true}
/>;
```

---

### 3. **MultiLevelSkillChart**

Shows skill progression across multiple levels.

**Use Cases**: Skill development over time, comparative progress

```jsx
import { MultiLevelSkillChart } from "@/components/ui/Diagrams";
import { TrendingUp } from "lucide-react";

<MultiLevelSkillChart
  levelCount={5}
  skills={[
    {
      name: "Computational Thinking",
      levels: [20, 40, 60, 80, 95],
      icon: <TrendingUp size={18} className="text-accent-500" />,
    },
    {
      name: "Programming",
      levels: [15, 35, 55, 75, 90],
      icon: <TrendingUp size={18} className="text-accent-500" />,
    },
  ]}
/>;
```

---

### 4. **ProcessStep**

Individual step in a process flow.

**Use Cases**: Step-by-step guides, workflows

```jsx
import { ProcessStep } from "@/components/ui/Diagrams";
import { Lightbulb } from "lucide-react";

<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  <ProcessStep
    number={1}
    title="Ideate"
    description="Identify problems and brainstorm solutions"
    icon={<Lightbulb size={32} />}
    delay={0}
  />
  <ProcessStep
    number={2}
    title="Design"
    description="Plan architecture and logic"
    icon={<Code size={32} />}
    delay={0.1}
  />
</div>;
```

---

### 5. **ComparisonCard**

Side-by-side comparison layout.

**Use Cases**: CBSE vs ICSE, Before vs After, Feature comparisons

```jsx
import { ComparisonCard } from "@/components/ui/Diagrams";
import { CheckCircle2 } from "lucide-react";

<ComparisonCard
  left={{
    title: "CBSE Alignment",
    items: [
      "Skill Subject: AI & Robotics",
      "Coding Standards (Classes 6-12)",
      "NEP 2020 Compliant",
    ],
    icon: (
      <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
    ),
  }}
  right={{
    title: "ICSE Alignment",
    items: [
      "Computer Applications Syllabus",
      "Project Work Requirements",
      "Internal Assessment Ready",
    ],
    icon: (
      <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
    ),
  }}
/>;
```

---

### 6. **StatCard**

Animated statistic display.

**Use Cases**: Key metrics, achievements, numbers

```jsx
import { StatCard } from "@/components/ui/Diagrams";

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <StatCard value="120+" label="Projects" variant="default" delay={0} />
  <StatCard value="5" label="Levels" variant="elevated" delay={0.1} />
  <StatCard value="CBSE" label="Aligned" variant="accent" delay={0.2} />
</div>;
```

**Variants**: `default`, `elevated`, `accent`

---

## Design Features

All components include:

- ✅ **Framer Motion animations** - Smooth entrance effects
- ✅ **Golden accent colors** - Matches brand theme
- ✅ **Hover effects** - Interactive feedback
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Scroll-triggered animations** - Appears when in viewport
- ✅ **Customizable delays** - Stagger animations

---

## Where to Use

### Programs Page

- ProgressFlow: Show program progression
- StatCard: Display program statistics
- ComparisonCard: Compare simulation vs hardware

### Schools Page

- MultiLevelSkillChart: Show student skill development
- StatCard: School partnership numbers
- ProcessStep: Implementation process

### About Page

- ProgressFlow: Company timeline/milestones
- StatCard: Company achievements
- SkillBar: Team expertise levels

### Contact Page

- ProcessStep: How to get started
- StatCard: Response time, support hours

---

## Customization

All components accept:

- `className` prop for additional styling
- `delay` prop for animation timing
- Theme colors from `globals.css`

Example:

```jsx
<ProgressFlow className="my-12 max-w-4xl mx-auto" steps={mySteps} />
```

---

## Benefits

1. **Consistency**: Same visual language across all pages
2. **Scalability**: Easy to add new pages with professional diagrams
3. **Maintainability**: Update once, changes reflect everywhere
4. **Performance**: Optimized animations with Framer Motion
5. **Accessibility**: Semantic HTML and proper contrast ratios

---

## Next Steps

Use these components when building:

- `/programs` page
- `/schools` page
- `/about` page
- `/contact` page

This ensures a cohesive, premium experience throughout the website! 🚀
